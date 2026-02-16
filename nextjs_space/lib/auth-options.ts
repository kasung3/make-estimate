import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';
import { checkRateLimit } from './rate-limiter';

// Login rate limits
const LOGIN_RATE_PER_EMAIL = {
  windowMs: 60 * 1000,
  maxRequests: 10,
  blockDurationMs: 5 * 60 * 1000, // 5 minute block
};

const LOGIN_RATE_PER_IP = {
  windowMs: 60 * 1000,
  maxRequests: 20,
  blockDurationMs: 5 * 60 * 1000,
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();

        // Rate limit by email
        const emailRate = checkRateLimit(`login_email:${email}`, LOGIN_RATE_PER_EMAIL);
        if (!emailRate.allowed) {
          console.warn(`[LOGIN_RATE_LIMITED] Email: ${email}`);
          throw new Error('Too many login attempts. Please try again in 5 minutes.');
        }

        // Rate limit by IP
        const ip = (req as any)?.headers?.['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
        const ipRate = checkRateLimit(`login_ip:${ip}`, LOGIN_RATE_PER_IP);
        if (!ipRate.allowed) {
          console.warn(`[LOGIN_RATE_LIMITED] IP: ${ip}`);
          throw new Error('Too many login attempts from this location. Please try again later.');
        }

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            memberships: {
              include: { company: true },
            },
          },
        });

        if (!user) {
          // Constant-time: hash a dummy password to prevent timing attacks
          await bcrypt.hash('dummy-password-for-timing', 12);
          return null;
        }

        // Check if user is blocked
        if (user.isBlocked) {
          throw new Error('Your account has been suspended. Please contact support.');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // Update lastLoginAt timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        }).catch(err => console.error('Failed to update lastLoginAt:', err));

        const membership = user?.memberships?.[0];
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          companyId: membership?.companyId ?? null,
          companyName: membership?.company?.name ?? null,
          role: membership?.role ?? 'MEMBER',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.companyId = (user as any).companyId;
        token.companyName = (user as any).companyName;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).id = token.id;
        (session.user as any).companyId = token.companyId;
        (session.user as any).companyName = token.companyName;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours - sessions expire after 1 day
    updateAge: 60 * 60,   // Refresh token every 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
};

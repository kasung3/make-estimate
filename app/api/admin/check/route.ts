import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { isPlatformAdmin } from '@/lib/billing';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ isAdmin: false });
    }
    return NextResponse.json({ isAdmin: isPlatformAdmin(session.user.email) });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}

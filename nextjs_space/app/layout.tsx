import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { MetaPixelProvider } from '@/components/meta-pixel-provider';
import { GoogleAnalyticsProvider, GoogleTagManagerNoScript } from '@/components/google-analytics';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

const siteUrl = 'https://makeestimate.com';
const ogImageUrl = `${siteUrl}/og/og-makeestimate.png`;

export const metadata: Metadata = {
  title: 'MakeEstimate — Fast BOQs, Professional PDFs',
  description: 'Create professional Bills of Quantities in minutes. No Excel, no spreadsheets — just fast estimation with clean PDF exports.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'MakeEstimate',
    title: 'Create BOQs in Minutes | MakeEstimate',
    description: 'Fast BOQs, professional PDFs—no Excel. Create professional Bills of Quantities in minutes with clean PDF exports.',
    url: siteUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'MakeEstimate - Create BOQs in Minutes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create BOQs in Minutes | MakeEstimate',
    description: 'Fast BOQs, professional PDFs—no Excel. Create professional Bills of Quantities in minutes.',
    images: [ogImageUrl],
  },
  metadataBase: new URL(process.env.SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <GoogleAnalyticsProvider />
        <AuthProvider>
          <Suspense fallback={null}>
            <MetaPixelProvider>{children}</MetaPixelProvider>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}

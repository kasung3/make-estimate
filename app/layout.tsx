import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { MetaPixelProvider } from '@/components/meta-pixel-provider';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'MakeEstimate — Fast BOQs, Professional PDFs',
  description: 'Create professional Bills of Quantities in minutes. No Excel, no spreadsheets — just fast estimation with clean PDF exports.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'MakeEstimate — Fast BOQs, Professional PDFs',
    description: 'Create professional Bills of Quantities in minutes. No Excel, no spreadsheets — just fast estimation with clean PDF exports.',
    images: ['/og-image.png'],
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* External scripts removed for self-hosted deployment */}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Suspense fallback={null}>
            <MetaPixelProvider>{children}</MetaPixelProvider>
          </Suspense>
        </AuthProvider>
      </body>
    </html>
  );
}

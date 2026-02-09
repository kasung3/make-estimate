'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export function MarketingFooter() {
  const [year, setYear] = useState<number>(2026);
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-b from-white to-purple-50/50 border-t border-purple-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-lavender-500 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold gradient-text">
                MakeEstimate
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {year} MakeEstimate. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

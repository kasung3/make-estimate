import Link from 'next/link';
import { FileText } from 'lucide-react';

export function MarketingFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center shadow-sm">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                MakeEstimate
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MakeEstimate. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/pricing"
              className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm text-gray-600 hover:text-cyan-600 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

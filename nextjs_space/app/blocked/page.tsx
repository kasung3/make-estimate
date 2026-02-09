'use client';

import { useSession, signOut } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, LogOut, Mail } from 'lucide-react';

function BlockedContent() {
  const { data: session } = useSession() || {};
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <ShieldX className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-800">Account Blocked</CardTitle>
          <CardDescription className="text-red-600">
            Your account has been blocked from accessing this platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reason && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>Reason:</strong> {reason}
              </p>
            </div>
          )}
          
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-3">
              If you believe this is an error, please contact support.
            </p>
            <a
              href="mailto:support@makeestimate.com"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <Mail className="w-4 h-4 mr-2" />
              support@makeestimate.com
            </a>
          </div>

          {session?.user && (
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Logged in as: <strong>{session.user.email}</strong>
              </p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function BlockedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <BlockedContent />
    </Suspense>
  );
}

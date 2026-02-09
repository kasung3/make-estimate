import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

// Redirect old /app/admin URL to new /app/glorand URL for security
export default function AdminPageRedirect() {
  redirect('/app/glorand');
}

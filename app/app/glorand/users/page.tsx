import { redirect } from 'next/navigation';

export default function UsersAdminPage() {
  redirect('/app/glorand?tab=users');
}

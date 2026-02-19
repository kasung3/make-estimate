import { redirect } from 'next/navigation';

export default function PlansAdminPage() {
  redirect('/app/glorand?tab=plans');
}

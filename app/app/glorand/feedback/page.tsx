import { redirect } from 'next/navigation';

export default function FeedbackAdminPage() {
  redirect('/app/glorand?tab=feedback');
}

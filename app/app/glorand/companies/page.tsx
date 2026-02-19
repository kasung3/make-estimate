import { redirect } from 'next/navigation';

export default function CompaniesAdminPage() {
  redirect('/app/glorand?tab=companies');
}

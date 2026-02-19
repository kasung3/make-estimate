import { redirect } from 'next/navigation';

export default function CouponsAdminPage() {
  redirect('/app/glorand?tab=coupons');
}

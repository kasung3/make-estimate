import { redirect } from 'next/navigation';

export default function BoqRedirect({ params }: { params: { id: string } }) {
  redirect(`/app/boq/${params.id}`);
}

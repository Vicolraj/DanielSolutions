import { redirect } from 'next/navigation';
import { getDefaultProfileSlug } from '@/lib/profile';

export default async function HomePage() {
  const slug = await getDefaultProfileSlug();
  redirect(`/${slug}`);
}

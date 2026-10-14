import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const profiles = await prisma.profile.findMany({
    select: { slug: true, updatedAt: true }
  });

  const routes: MetadataRoute.Sitemap = [{ url: `${baseUrl}/`, lastModified: new Date() }];

  for (const profile of profiles) {
    routes.push(
      { url: `${baseUrl}/${profile.slug}`, lastModified: profile.updatedAt },
      { url: `${baseUrl}/${profile.slug}/projects`, lastModified: profile.updatedAt },
      { url: `${baseUrl}/${profile.slug}/testimonials`, lastModified: profile.updatedAt }
    );
  }

  return routes;
}

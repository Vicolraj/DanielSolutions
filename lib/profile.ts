import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

export type ProfileWithContent = Prisma.ProfileGetPayload<{
  include: {
    projects: { include: { images: true } };
    testimonials: true;
  };
}>;

const getProfileBySlugCached = unstable_cache(
  async (slug: string) => {
    return prisma.profile.findUnique({
      where: { slug },
      include: {
        projects: {
          include: {
            images: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        testimonials: {
          orderBy: { order: 'asc' }
        }
      }
    });
  },
  ['profile-by-slug'],
  {
    revalidate: 60,
    tags: ['profiles', 'projects', 'testimonials']
  }
);

export async function getProfileBySlug(slug: string) {
  return getProfileBySlugCached(slug);
}

export async function getDefaultProfileSlug() {
  const profile = await prisma.profile.findFirst({
    select: { slug: true },
    orderBy: { createdAt: 'asc' }
  });

  return profile?.slug ?? 'danielsolutions';
}

export function asRecord(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {} as Record<string, string>;
  }
  return value as Record<string, string>;
}

export function asArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }
  return value.map((item) => String(item));
}

export function asStats(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as Array<{ label: string; value: string }>;
  }
  return value.map((item) => {
    const row = item as { label?: string; value?: string };
    return {
      label: row.label ?? '',
      value: row.value ?? ''
    };
  });
}

'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { cloudinary } from '@/lib/cloudinary';

function refreshProfile(slug: string) {
  revalidateTag('profiles');
  revalidateTag('projects');
  revalidateTag('testimonials');
  revalidatePath('/');
  revalidatePath(`/${slug}`);
  revalidatePath(`/${slug}/projects`);
  revalidatePath(`/${slug}/testimonials`);
}

const profileSchema = z.object({
  profileId: z.string(),
  displayName: z.string().min(2),
  role: z.string().min(2),
  headline: z.string().min(2),
  bio: z.string().min(2),
  email: z.string().email(),
  location: z.string().optional(),
  phone: z.string().optional(),
  accentColor: z.string().min(4),
  slug: z.string().min(2)
});

export async function updateProfileAction(formData: FormData) {
  const payload = profileSchema.parse({
    profileId: formData.get('profileId'),
    displayName: formData.get('displayName'),
    role: formData.get('role'),
    headline: formData.get('headline'),
    bio: formData.get('bio'),
    email: formData.get('email'),
    location: formData.get('location')?.toString() || undefined,
    phone: formData.get('phone')?.toString() || undefined,
    accentColor: formData.get('accentColor'),
    slug: formData.get('slug')
  });

  await prisma.profile.update({
    where: { id: payload.profileId },
    data: {
      displayName: payload.displayName,
      role: payload.role,
      headline: payload.headline,
      bio: payload.bio,
      email: payload.email,
      location: payload.location,
      phone: payload.phone,
      accentColor: payload.accentColor,
      slug: payload.slug
    }
  });

  refreshProfile(payload.slug);
}

export async function updateSiteContentAction(formData: FormData) {
  const profileId = String(formData.get('profileId'));
  const slug = String(formData.get('slug'));
  const skills = String(formData.get('skills')).split('\n').map((item) => item.trim()).filter(Boolean);

  await prisma.profile.update({
    where: { id: profileId },
    data: {
      heroText: {
        firstName: String(formData.get('heroFirstName')),
        lastName: String(formData.get('heroLastName')),
        lineOne: String(formData.get('heroLineOne')),
        lineTwo: String(formData.get('heroLineTwo')),
        subtext: String(formData.get('heroSubtext')),
        primaryCta: String(formData.get('heroPrimaryCta')),
        secondaryCta: String(formData.get('heroSecondaryCta')),
        imageAlt: String(formData.get('heroImageAlt'))
      },
      contactText: {
        eyebrow: String(formData.get('contactEyebrow')),
        titleLineOne: String(formData.get('contactTitleLineOne')),
        titleLineTwo: String(formData.get('contactTitleLineTwo')),
        body: String(formData.get('contactBody')),
        emailButton: String(formData.get('contactEmailButton')),
        githubButton: String(formData.get('contactGithubButton')),
        linkedinButton: String(formData.get('contactLinkedinButton')),
        backgroundWord: String(formData.get('contactBackgroundWord'))
      },
      footerText: {
        tagline: String(formData.get('footerTagline')),
        bottomLeft: String(formData.get('footerBottomLeft')),
        bottomRight: String(formData.get('footerBottomRight'))
      },
      navLabels: {
        work: String(formData.get('navWork')),
        stack: String(formData.get('navStack')),
        testimonials: String(formData.get('navTestimonials')),
        contact: String(formData.get('navContact')),
        hire: String(formData.get('navHire')),
        moreProjects: String(formData.get('navMoreProjects')),
        moreReviews: String(formData.get('navMoreReviews'))
      },
      sectionTitles: {
        workEyebrow: String(formData.get('sectionWorkEyebrow')),
        workTitleStart: String(formData.get('sectionWorkTitleStart')),
        workTitleEnd: String(formData.get('sectionWorkTitleEnd')),
        stackEyebrow: String(formData.get('sectionStackEyebrow')),
        stackTitleStart: String(formData.get('sectionStackTitleStart')),
        stackTitleEnd: String(formData.get('sectionStackTitleEnd')),
        testimonialEyebrow: String(formData.get('sectionTestimonialEyebrow')),
        testimonialTitle: String(formData.get('sectionTestimonialTitle')),
        projectPageTitle: String(formData.get('sectionProjectPageTitle')),
        testimonialPageTitle: String(formData.get('sectionTestimonialPageTitle'))
      },
      skills
    }
  });

  refreshProfile(slug);
}

const projectSchema = z.object({
  profileId: z.string(),
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(2),
  year: z.coerce.number().int(),
  description: z.string().min(2),
  longDescription: z.string().min(2),
  role: z.string().min(2),
  tools: z.string().min(2),
  liveUrl: z.string().optional(),
  caseStudyUrl: z.string().optional(),
  featured: z.boolean(),
  imageUrl: z.string().url().optional(),
  imagePublicId: z.string().optional(),
  imageAlt: z.string().optional(),
  slugForRefresh: z.string()
});

export async function createProjectAction(formData: FormData) {
  const payload = projectSchema.parse({
    profileId: formData.get('profileId'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    category: formData.get('category'),
    year: formData.get('year'),
    description: formData.get('description'),
    longDescription: formData.get('longDescription'),
    role: formData.get('role'),
    tools: formData.get('tools'),
    liveUrl: formData.get('liveUrl')?.toString() || undefined,
    caseStudyUrl: formData.get('caseStudyUrl')?.toString() || undefined,
    featured: formData.get('featured') === 'on',
    imageUrl: formData.get('imageUrl')?.toString() || undefined,
    imagePublicId: formData.get('imagePublicId')?.toString() || undefined,
    imageAlt: formData.get('imageAlt')?.toString() || undefined,
    slugForRefresh: String(formData.get('slugForRefresh'))
  });

  const lastProject = await prisma.project.findFirst({
    where: { profileId: payload.profileId },
    orderBy: { order: 'desc' },
    select: { order: true }
  });

  await prisma.project.create({
    data: {
      profileId: payload.profileId,
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      year: payload.year,
      description: payload.description,
      longDescription: payload.longDescription,
      role: payload.role,
      tools: payload.tools.split(',').map((item) => item.trim()).filter(Boolean),
      liveUrl: payload.liveUrl,
      caseStudyUrl: payload.caseStudyUrl,
      featured: payload.featured,
      order: (lastProject?.order ?? 0) + 1,
      placeholder: true,
      images: payload.imageUrl
        ? {
            create: [
              {
                url: payload.imageUrl,
                publicId: payload.imagePublicId || '',
                alt: payload.imageAlt || payload.title,
                order: 0,
                isCover: true
              }
            ]
          }
        : undefined
    }
  });

  refreshProfile(payload.slugForRefresh);
}

export async function deleteProjectAction(formData: FormData) {
  const projectId = String(formData.get('projectId'));
  const slug = String(formData.get('slugForRefresh'));

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { images: true }
  });

  if (!project) {
    return;
  }

  await prisma.project.delete({ where: { id: projectId } });

  await Promise.all(
    project.images
      .filter((image) => image.publicId)
      .map(async (image) => {
        try {
          await cloudinary.uploader.destroy(image.publicId);
        } catch {
          return null;
        }
      })
  );

  refreshProfile(slug);
}

export async function createTestimonialAction(formData: FormData) {
  const profileId = String(formData.get('profileId'));
  const slug = String(formData.get('slugForRefresh'));
  const type = String(formData.get('type')) === 'IMAGE' ? 'IMAGE' : 'TEXT';

  const last = await prisma.testimonial.findFirst({
    where: { profileId },
    orderBy: { order: 'desc' },
    select: { order: true }
  });

  await prisma.testimonial.create({
    data: {
      profileId,
      type,
      authorName: String(formData.get('authorName')),
      authorRole: String(formData.get('authorRole')),
      content: type === 'TEXT' ? String(formData.get('content')) : null,
      imageUrl: type === 'IMAGE' ? String(formData.get('imageUrl') || '') : null,
      imagePublicId: type === 'IMAGE' ? String(formData.get('imagePublicId') || '') : null,
      order: (last?.order ?? 0) + 1,
      showOnHome: formData.get('showOnHome') === 'on'
    }
  });

  refreshProfile(slug);
}

export async function deleteTestimonialAction(formData: FormData) {
  const testimonialId = String(formData.get('testimonialId'));
  const slug = String(formData.get('slugForRefresh'));
  const testimonial = await prisma.testimonial.findUnique({ where: { id: testimonialId } });

  if (!testimonial) {
    return;
  }

  await prisma.testimonial.delete({ where: { id: testimonialId } });

  if (testimonial.imagePublicId) {
    try {
      await cloudinary.uploader.destroy(testimonial.imagePublicId);
    } catch {
      // ignore cleanup failures
    }
  }

  refreshProfile(slug);
}

export async function updatePasswordAction(formData: FormData) {
  const userId = String(formData.get('userId'));
  const password = String(formData.get('password'));

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.update({ where: { id: userId }, data: { passwordHash } });
}

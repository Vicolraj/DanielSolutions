import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { asArray, asRecord, asStats, getProfileBySlug } from '@/lib/profile';
import { Nav } from '@/components/portfolio/Nav';
import { HeroSection } from '@/components/portfolio/HeroSection';
import { Marquee } from '@/components/portfolio/Marquee';
import { WorkSection } from '@/components/portfolio/WorkSection';
import { TechStackSection } from '@/components/portfolio/TechStackSection';
import { TestimonialWall } from '@/components/portfolio/TestimonialWall';
import { ContactSection } from '@/components/portfolio/ContactSection';
import { FooterSection } from '@/components/portfolio/FooterSection';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile) {
    return {};
  }

  return {
    title: `${profile.displayName} | ${profile.role}`,
    description: profile.headline,
    openGraph: {
      title: `${profile.displayName} | ${profile.role}`,
      description: profile.headline,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${profile.slug}`,
      images: profile.avatarUrl ? [{ url: profile.avatarUrl, alt: profile.displayName }] : undefined
    }
  };
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  const hero = asRecord(profile.heroText);
  const navLabels = asRecord(profile.navLabels);
  const sectionTitles = asRecord(profile.sectionTitles);
  const skills = asArray(profile.skills);
  const stats = asStats(profile.stats);
  const contactText = asRecord(profile.contactText);
  const footerText = asRecord(profile.footerText);
  const socials = asRecord(profile.socials);

  const featuredProjects = profile.projects.filter((project) => project.featured).slice(0, 6);
  const projects = featuredProjects.length ? featuredProjects : profile.projects.slice(0, 6);
  const homeTestimonials = profile.testimonials.filter((item) => item.showOnHome).slice(0, 6);

  return (
    <section>
      <Nav slug={profile.slug} brand={profile.displayName} labels={navLabels} />
      <HeroSection slug={profile.slug} hero={hero} stats={stats} />
      <Marquee skills={skills} />
      <WorkSection
        projects={projects}
        titleStart={sectionTitles.workTitleStart}
        titleEnd={sectionTitles.workTitleEnd}
        eyebrow={sectionTitles.workEyebrow}
        moreProjectsLabel={navLabels.moreProjects}
        slug={profile.slug}
        liveSiteLabel={navLabels.liveSite}
        caseStudyLabel={navLabels.caseStudy}
      />
      <TechStackSection
        skills={skills}
        titleStart={sectionTitles.stackTitleStart}
        titleEnd={sectionTitles.stackTitleEnd}
        eyebrow={sectionTitles.stackEyebrow}
      />
      <TestimonialWall
        testimonials={homeTestimonials.map((item) => ({
          id: item.id,
          type: item.type,
          authorName: item.authorName,
          authorRole: item.authorRole,
          content: item.content,
          imageUrl: item.imageUrl,
          showOnHome: item.showOnHome
        }))}
        title={sectionTitles.testimonialTitle}
        eyebrow={sectionTitles.testimonialEyebrow}
        moreLabel={navLabels.moreReviews}
        slug={profile.slug}
      />
      <ContactSection contactText={contactText} socials={socials} />
      <FooterSection brand={profile.displayName} footerText={footerText} navLabels={navLabels} socials={socials} />
    </section>
  );
}

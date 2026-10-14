import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { asRecord, getProfileBySlug } from '@/lib/profile';
import { Nav } from '@/components/portfolio/Nav';
import { WorkSection } from '@/components/portfolio/WorkSection';
import { FooterSection } from '@/components/portfolio/FooterSection';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return {};
  }

  const sectionTitles = asRecord(profile.sectionTitles);

  return {
    title: `${profile.displayName} | ${sectionTitles.projectPageTitle}`,
    description: profile.headline,
    openGraph: {
      title: `${profile.displayName} | ${sectionTitles.projectPageTitle}`,
      description: profile.headline
    }
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  const navLabels = asRecord(profile.navLabels);
  const sectionTitles = asRecord(profile.sectionTitles);
  const footerText = asRecord(profile.footerText);
  const socials = asRecord(profile.socials);

  return (
    <section>
      <Nav slug={profile.slug} brand={profile.displayName} labels={navLabels} />
      <div style={{ paddingTop: '84px' }}>
        <WorkSection
          projects={profile.projects}
          titleStart={sectionTitles.projectPageTitle}
          titleEnd={sectionTitles.workTitleEnd}
          eyebrow={sectionTitles.workEyebrow}
          moreProjectsLabel={navLabels.moreProjects}
          slug={profile.slug}
          showMoreButton={false}
        />
      </div>
      <FooterSection brand={profile.displayName} footerText={footerText} navLabels={navLabels} socials={socials} />
    </section>
  );
}

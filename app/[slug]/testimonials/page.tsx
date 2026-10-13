import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { asRecord, getProfileBySlug } from '@/lib/profile';
import { Nav } from '@/components/portfolio/Nav';
import { TestimonialWall } from '@/components/portfolio/TestimonialWall';
import { FooterSection } from '@/components/portfolio/FooterSection';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    return {};
  }

  const sectionTitles = asRecord(profile.sectionTitles);

  return {
    title: `${profile.displayName} | ${sectionTitles.testimonialPageTitle}`,
    description: profile.headline,
    openGraph: {
      title: `${profile.displayName} | ${sectionTitles.testimonialPageTitle}`,
      description: profile.headline
    }
  };
}

export default async function TestimonialsPage({ params }: { params: Promise<{ slug: string }> }) {
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
        <TestimonialWall
          testimonials={profile.testimonials.map((item) => ({
            id: item.id,
            type: item.type,
            authorName: item.authorName,
            authorRole: item.authorRole,
            content: item.content,
            imageUrl: item.imageUrl,
            showOnHome: item.showOnHome
          }))}
          title={sectionTitles.testimonialPageTitle}
          eyebrow={sectionTitles.testimonialEyebrow}
          moreLabel={navLabels.moreReviews}
          slug={profile.slug}
          showMore={false}
        />
      </div>
      <FooterSection brand={profile.displayName} footerText={footerText} navLabels={navLabels} socials={socials} />
    </section>
  );
}

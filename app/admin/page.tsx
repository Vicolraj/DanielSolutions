import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdminSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { asArray, asRecord } from '@/lib/profile';
import {
  createProjectAction,
  createTestimonialAction,
  deleteProjectAction,
  deleteTestimonialAction,
  updatePasswordAction,
  updateProfileAction,
  updateSiteContentAction
} from '@/app/admin/actions';
import { SystemStatusCard } from '@/components/admin/SystemStatusCard';
import { AdminForm } from '@/components/admin/AdminForm';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ profile?: string }> }) {
  const adminUserId = await requireAdminSession();
  const { profile: requestedProfile } = await searchParams;

  const profiles = await prisma.profile.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      projects: { include: { images: true }, orderBy: { order: 'asc' } },
      testimonials: { orderBy: { order: 'asc' } }
    }
  });

  if (!profiles.length) {
    return <main className="admin-layout">No profiles found.</main>;
  }

  const activeProfile =
    profiles.find((item) => item.id === requestedProfile || item.slug === requestedProfile) ?? profiles[0];

  const heroText = asRecord(activeProfile.heroText);
  const contactText = asRecord(activeProfile.contactText);
  const footerText = asRecord(activeProfile.footerText);
  const navLabels = asRecord(activeProfile.navLabels);
  const sectionTitles = asRecord(activeProfile.sectionTitles);
  const skills = asArray(activeProfile.skills);

  return (
    <main className="admin-layout">
      <header className="admin-header admin-card">
        <div>
          <h1 className="work-title">Admin panel</h1>
          <p className="admin-muted">Manage content for each profile.</p>
        </div>
        <div className="admin-header-actions">
          <form
            action={async (formData) => {
              'use server';
              const target = String(formData.get('profileId'));
              redirect(`/admin?profile=${target}`);
            }}
          >
            <select name="profileId" defaultValue={activeProfile.id} className="admin-select">
              {profiles.map((profile) => (
                <option value={profile.id} key={profile.id}>
                  {profile.displayName}
                </option>
              ))}
            </select>
            <button className="btn btn-ghost" type="submit">
              Switch profile
            </button>
          </form>
          <Link href={`/${activeProfile.slug}`} className="btn btn-ghost">
            View site
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="btn btn-primary" type="submit">
              Logout
            </button>
          </form>
        </div>
      </header>

      <section className="admin-grid">
        <SystemStatusCard />

        <article className="admin-card">
          <h2>Profile</h2>
          <AdminForm action={updateProfileAction}>
            <input type="hidden" name="profileId" value={activeProfile.id} />
            <input type="hidden" name="slug" value={activeProfile.slug} />
            <label className="admin-field"><span>Display name</span><input name="displayName" defaultValue={activeProfile.displayName} required /></label>
            <label className="admin-field"><span>Slug</span><input name="slug" defaultValue={activeProfile.slug} required /></label>
            <label className="admin-field"><span>Role</span><input name="role" defaultValue={activeProfile.role} required /></label>
            <label className="admin-field"><span>Headline</span><input name="headline" defaultValue={activeProfile.headline} required /></label>
            <label className="admin-field"><span>Bio</span><textarea name="bio" defaultValue={activeProfile.bio} rows={4} required /></label>
            <label className="admin-field"><span>Email</span><input name="email" type="email" defaultValue={activeProfile.email} required /></label>
            <label className="admin-field"><span>Location</span><input name="location" defaultValue={activeProfile.location ?? ''} /></label>
            <label className="admin-field"><span>Phone</span><input name="phone" defaultValue={activeProfile.phone ?? ''} /></label>
            <label className="admin-field"><span>Accent color</span><input name="accentColor" defaultValue={activeProfile.accentColor} required /></label>
          </AdminForm>
        </article>

        <article className="admin-card">
          <h2>Site content</h2>
          <AdminForm action={updateSiteContentAction}>
            <input type="hidden" name="profileId" value={activeProfile.id} />
            <input type="hidden" name="slug" value={activeProfile.slug} />
            <label className="admin-field"><span>Hero first name</span><input name="heroFirstName" defaultValue={heroText.firstName} /></label>
            <label className="admin-field"><span>Hero last name</span><input name="heroLastName" defaultValue={heroText.lastName} /></label>
            <label className="admin-field"><span>Hero line one</span><input name="heroLineOne" defaultValue={heroText.lineOne} /></label>
            <label className="admin-field"><span>Hero line two</span><input name="heroLineTwo" defaultValue={heroText.lineTwo} /></label>
            <label className="admin-field"><span>Hero subtext</span><textarea name="heroSubtext" defaultValue={heroText.subtext} rows={4} /></label>
            <label className="admin-field"><span>Hero primary button</span><input name="heroPrimaryCta" defaultValue={heroText.primaryCta} /></label>
            <label className="admin-field"><span>Hero secondary button</span><input name="heroSecondaryCta" defaultValue={heroText.secondaryCta} /></label>
            <label className="admin-field"><span>Hero image alt</span><input name="heroImageAlt" defaultValue={heroText.imageAlt} /></label>

            <label className="admin-field"><span>Work section eyebrow</span><input name="sectionWorkEyebrow" defaultValue={sectionTitles.workEyebrow} /></label>
            <label className="admin-field"><span>Work title start</span><input name="sectionWorkTitleStart" defaultValue={sectionTitles.workTitleStart} /></label>
            <label className="admin-field"><span>Work title end</span><input name="sectionWorkTitleEnd" defaultValue={sectionTitles.workTitleEnd} /></label>
            <label className="admin-field"><span>Stack eyebrow</span><input name="sectionStackEyebrow" defaultValue={sectionTitles.stackEyebrow} /></label>
            <label className="admin-field"><span>Stack title start</span><input name="sectionStackTitleStart" defaultValue={sectionTitles.stackTitleStart} /></label>
            <label className="admin-field"><span>Stack title end</span><input name="sectionStackTitleEnd" defaultValue={sectionTitles.stackTitleEnd} /></label>
            <label className="admin-field"><span>Testimonials eyebrow</span><input name="sectionTestimonialEyebrow" defaultValue={sectionTitles.testimonialEyebrow} /></label>
            <label className="admin-field"><span>Testimonials title</span><input name="sectionTestimonialTitle" defaultValue={sectionTitles.testimonialTitle} /></label>
            <label className="admin-field"><span>Projects page title</span><input name="sectionProjectPageTitle" defaultValue={sectionTitles.projectPageTitle} /></label>
            <label className="admin-field"><span>Testimonials page title</span><input name="sectionTestimonialPageTitle" defaultValue={sectionTitles.testimonialPageTitle} /></label>

            <label className="admin-field"><span>Nav work label</span><input name="navWork" defaultValue={navLabels.work} /></label>
            <label className="admin-field"><span>Nav stack label</span><input name="navStack" defaultValue={navLabels.stack} /></label>
            <label className="admin-field"><span>Nav testimonials label</span><input name="navTestimonials" defaultValue={navLabels.testimonials} /></label>
            <label className="admin-field"><span>Nav contact label</span><input name="navContact" defaultValue={navLabels.contact} /></label>
            <label className="admin-field"><span>Nav hire label</span><input name="navHire" defaultValue={navLabels.hire} /></label>
            <label className="admin-field"><span>More projects button label</span><input name="navMoreProjects" defaultValue={navLabels.moreProjects} /></label>
            <label className="admin-field"><span>More reviews button label</span><input name="navMoreReviews" defaultValue={navLabels.moreReviews} /></label>

            <label className="admin-field"><span>Contact eyebrow</span><input name="contactEyebrow" defaultValue={contactText.eyebrow} /></label>
            <label className="admin-field"><span>Contact title line one</span><input name="contactTitleLineOne" defaultValue={contactText.titleLineOne} /></label>
            <label className="admin-field"><span>Contact title line two</span><input name="contactTitleLineTwo" defaultValue={contactText.titleLineTwo} /></label>
            <label className="admin-field"><span>Contact body</span><textarea name="contactBody" defaultValue={contactText.body} rows={3} /></label>
            <label className="admin-field"><span>Contact email button</span><input name="contactEmailButton" defaultValue={contactText.emailButton} /></label>
            <label className="admin-field"><span>Contact GitHub button</span><input name="contactGithubButton" defaultValue={contactText.githubButton} /></label>
            <label className="admin-field"><span>Contact LinkedIn button</span><input name="contactLinkedinButton" defaultValue={contactText.linkedinButton} /></label>
            <label className="admin-field"><span>Contact background word</span><input name="contactBackgroundWord" defaultValue={contactText.backgroundWord} /></label>

            <label className="admin-field"><span>Footer tagline</span><input name="footerTagline" defaultValue={footerText.tagline} /></label>
            <label className="admin-field"><span>Footer left text</span><input name="footerBottomLeft" defaultValue={footerText.bottomLeft} /></label>
            <label className="admin-field"><span>Footer right text</span><input name="footerBottomRight" defaultValue={footerText.bottomRight} /></label>

            <label className="admin-field"><span>Skills (one per line)</span><textarea name="skills" defaultValue={skills.join('\n')} rows={8} /></label>
          </AdminForm>
        </article>

        <article className="admin-card">
          <h2>Projects</h2>
          <AdminForm action={createProjectAction}>
            <input type="hidden" name="profileId" value={activeProfile.id} />
            <input type="hidden" name="slugForRefresh" value={activeProfile.slug} />
            <label className="admin-field"><span>Title</span><input name="title" required /></label>
            <label className="admin-field"><span>Slug</span><input name="slug" required /></label>
            <label className="admin-field"><span>Category</span><input name="category" defaultValue="website" required /></label>
            <label className="admin-field"><span>Year</span><input name="year" type="number" defaultValue={new Date().getFullYear()} required /></label>
            <label className="admin-field"><span>Description</span><textarea name="description" rows={3} required /></label>
            <label className="admin-field"><span>Long description</span><textarea name="longDescription" rows={4} required /></label>
            <label className="admin-field"><span>Role</span><input name="role" required /></label>
            <label className="admin-field"><span>Tools (comma separated)</span><input name="tools" required /></label>
            <label className="admin-field"><span>Live URL</span><input name="liveUrl" /></label>
            <label className="admin-field"><span>Case study URL</span><input name="caseStudyUrl" /></label>
            <label className="admin-field"><span>Cover image URL</span><input name="imageUrl" /></label>
            <label className="admin-field"><span>Cover image public ID</span><input name="imagePublicId" /></label>
            <label className="admin-field"><span>Cover image alt text</span><input name="imageAlt" /></label>
            <label className="admin-check"><input name="featured" type="checkbox" /> Featured on home</label>
          </AdminForm>

          <div className="admin-list">
            {activeProfile.projects.map((project) => (
              <div className="admin-list-item" key={project.id}>
                <div>
                  <strong>{project.title}</strong>
                  <p className="admin-muted">{project.category} · {project.year} · {project.tools.join(', ')}</p>
                </div>
                <form action={deleteProjectAction}>
                  <input type="hidden" name="projectId" value={project.id} />
                  <input type="hidden" name="slugForRefresh" value={activeProfile.slug} />
                  <button className="btn btn-ghost" type="submit">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <h2>Testimonials</h2>
          <AdminForm action={createTestimonialAction}>
            <input type="hidden" name="profileId" value={activeProfile.id} />
            <input type="hidden" name="slugForRefresh" value={activeProfile.slug} />
            <label className="admin-field">
              <span>Type</span>
              <select name="type" defaultValue="TEXT">
                <option value="TEXT">Text</option>
                <option value="IMAGE">Image</option>
              </select>
            </label>
            <label className="admin-field"><span>Author name</span><input name="authorName" required /></label>
            <label className="admin-field"><span>Author role</span><input name="authorRole" required /></label>
            <label className="admin-field"><span>Content (text testimonial)</span><textarea name="content" rows={4} /></label>
            <label className="admin-field"><span>Image URL (image testimonial)</span><input name="imageUrl" /></label>
            <label className="admin-field"><span>Image public ID</span><input name="imagePublicId" /></label>
            <label className="admin-check"><input type="checkbox" name="showOnHome" defaultChecked /> Show on home</label>
          </AdminForm>

          <div className="admin-list">
            {activeProfile.testimonials.map((testimonial) => (
              <div className="admin-list-item" key={testimonial.id}>
                <div>
                  <strong>{testimonial.authorName}</strong>
                  <p className="admin-muted">{testimonial.type} · {testimonial.authorRole}</p>
                </div>
                <form action={deleteTestimonialAction}>
                  <input type="hidden" name="testimonialId" value={testimonial.id} />
                  <input type="hidden" name="slugForRefresh" value={activeProfile.slug} />
                  <button className="btn btn-ghost" type="submit">Delete</button>
                </form>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-card">
          <h2>Settings</h2>
          <AdminForm action={updatePasswordAction}>
            <input type="hidden" name="userId" value={adminUserId} />
            <label className="admin-field"><span>New password</span><input name="password" type="password" required minLength={8} /></label>
          </AdminForm>
        </article>
      </section>
    </main>
  );
}

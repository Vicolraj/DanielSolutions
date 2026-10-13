import Link from 'next/link';
import { ProjectCarousel } from '@/components/portfolio/ProjectCarousel';

type Project = {
  id: string;
  title: string;
  description: string;
  year: number;
  category: string;
  tools: string[];
  liveUrl: string | null;
  caseStudyUrl: string | null;
  images: Array<{ id: string; url: string; alt: string; order: number; isCover: boolean }>;
};

const tagClasses: Record<string, string> = {
  website: 'tag-rust',
  animation: 'tag-blue',
  component: 'tag-purple'
};

type Props = {
  projects: Project[];
  titleStart: string;
  titleEnd: string;
  eyebrow: string;
  moreProjectsLabel: string;
  slug: string;
  showMoreButton?: boolean;
  liveSiteLabel: string;
  caseStudyLabel: string;
};

export function WorkSection({ projects, titleStart, titleEnd, eyebrow, moreProjectsLabel, slug, showMoreButton = true, liveSiteLabel, caseStudyLabel }: Props) {
  return (
    <section id="work">
      <div className="work-header reveal">
        <div>
          <div className="section-label">{eyebrow}</div>
          <h2 className="work-title">
            {titleStart}
            <br />
            <em>{titleEnd}</em>
          </h2>
        </div>
      </div>

      <div className="catalog">
        {projects.map((item, i) => (
          <div className="card-item reveal" style={{ transitionDelay: `${i * 0.05}s` }} key={item.id}>
            <div className="card-canvas-wrap">
              <ProjectCarousel images={item.images} title={item.title} />
              <div className="card-overlay">
                {item.liveUrl ? (
                  <a href={item.liveUrl} target="_blank" rel="noreferrer" className="overlay-btn overlay-btn-primary">
                    {liveSiteLabel}
                  </a>
                ) : null}
                {item.caseStudyUrl ? (
                  <a href={item.caseStudyUrl} target="_blank" rel="noreferrer" className="overlay-btn overlay-btn-ghost">
                    {caseStudyLabel}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="card-body">
              <div className="card-tags">
                <span className={`tag ${tagClasses[item.category] ?? 'tag-warm'}`}>{item.category}</span>
                {item.tools.slice(0, 3).map((tool) => (
                  <span className="tag tag-warm" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
              <div className="card-title">{item.title}</div>
              <div className="card-desc">{item.description}</div>
              <div className="card-meta">
                <div className="card-year">{item.year}</div>
                <div className="card-arrow">↗</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showMoreButton ? (
        <div className="work-more-wrap">
          <Link className="btn btn-primary" href={`/${slug}/projects`}>
            {moreProjectsLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}

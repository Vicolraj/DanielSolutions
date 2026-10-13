// import { useState } from 'react';
import { PROJECTS, type ProjectItem } from '../../data';
import './styles/work.css';

const tagClasses: Record<string, string> = {
  rust: 'tag-rust',
  warm: 'tag-warm',
  green: 'tag-green',
  blue: 'tag-blue',
  purple: 'tag-purple',
};

// const FILTERS = [
//   { key: 'all', label: 'All' },
//   { key: 'website', label: 'Websites' },
//   { key: 'animation', label: 'Animation' },
//   { key: 'component', label: 'Components' },
// ];

export default function Work() {

  // const [filter, setFilter] = useState('all');


  // const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const filtered = PROJECTS;

  return (
    <section id="work">
      <div className="work-header reveal">
        <div>
          <div className="section-label">Selected Work</div>
          <h2 className="work-title">
            Things I've<br />
            <em>built.</em>
          </h2>
        </div>
        {/*<div className="filter-pills">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`pill ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>*/}
      </div>

      <div className="catalog">
        {filtered.map((item, i) => (
          <ProjectCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ item, index }: { item: ProjectItem; index: number }) {
  return (
    <div
      className="card-item reveal"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      <div className="card-canvas-wrap" style={{ background: `${item.accentColor}08` }}>
        <div className="card-placeholder">
          <img src={item.placeholder} alt={item.title} />
        </div>
        <div className="card-overlay">
          {item.link && (
            <a href={item.link} target="_blank" rel="noreferrer" className="overlay-btn overlay-btn-primary">
              Live Site ↗
            </a>
          )}
          {item.github && (
            <a href={item.github} target="_blank" rel="noreferrer" className="overlay-btn overlay-btn-ghost">
              GitHub →
            </a>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="card-tags">
          {item.tags.map(([t, c]) => (
            <span key={t} className={`tag ${tagClasses[c] || 'tag-warm'}`}>{t}</span>
          ))}
        </div>
        <div className="card-title">{item.title}</div>
        <div className="card-desc">{item.desc}</div>
        <div className="card-meta">
          <div className="card-year">{item.year}</div>
          <div className="card-arrow">↗</div>
        </div>
      </div>
    </div>
  );
}

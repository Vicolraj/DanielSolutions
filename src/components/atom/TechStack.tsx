import { TECH_STACK } from '../../data';
import './styles/tech.css';

export default function TechStack() {
  return (
    <section id="tech">
      <div className="reveal">
        <div className="section-label">Tools of the Trade</div>
        <h2 className="tech-section-title">
          My <em>stack.</em>
        </h2>
      </div>

      <div className="tech-groups">
        {TECH_STACK.map((group, gi) => (
          <div key={group.group} className={`tech-group reveal reveal-delay-${gi + 1}`}>
            <div className="tech-group-label">{group.group}</div>
            <div className="tech-items">
              {group.items.map(item => (
                <span key={item} className="tech-chip">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

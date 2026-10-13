import './styles/marquee.css';

const ITEMS = [
  'React', 'TypeScript', 'C# .NET', 'Blazor', 'Rive',
  'Three.js', 'Framer Motion', 'Next.js', 'SQL Server', 'Figma',
  'Node.js', 'Firebase', 'TailwindCSS', 'AWS', 'Vercel',
];

export default function Marquee() {
  return (
    <div className="marquee-outer" aria-hidden="true">
      <div className="marquee-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

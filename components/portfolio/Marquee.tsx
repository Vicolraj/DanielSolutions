type Props = {
  skills: string[];
};

export function Marquee({ skills }: Props) {
  const items = skills.length ? skills : ['AWS', 'TypeScript', 'Next.js'];

  return (
    <div className="marquee-outer" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="marquee-item">
            {item} <span className="marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

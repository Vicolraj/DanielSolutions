type Props = {
  brand: string;
  footerText: Record<string, string>;
  navLabels: Record<string, string>;
  socials: Record<string, string>;
};

export function FooterSection({ brand, footerText, navLabels, socials }: Props) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">{brand}</div>
          <p className="footer-tagline">{footerText.tagline}</p>
        </div>

        <div className="footer-links">
          <a href="#work">{navLabels.work}</a>
          <a href="#tech">{navLabels.stack}</a>
          <a href="#testimonials">{navLabels.testimonials}</a>
          <a href="#contact">{navLabels.contact}</a>
          <a href={socials.github} target="_blank" rel="noreferrer">
            {navLabels.github}
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{footerText.bottomLeft}</span>
        <span>{footerText.bottomRight}</span>
      </div>
    </footer>
  );
}

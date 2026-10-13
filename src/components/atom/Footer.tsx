import './styles/footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">Vicolraj</div>
          <p className="footer-tagline">Fullstack Developer. Built on the web.</p>
        </div>

        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#tech">Stack</a>
          <a href="#contact">Contact</a>
          <a href="https://github.com/vicolraj" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Victor Raji</span>
        <span>React · TypeScript · Rive · GSAP · Framer Motion · Three.js · Expressjs </span>
      </div>
    </footer>
  );
}

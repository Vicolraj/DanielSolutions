import { useEffect, useState } from 'react';
import "./styles/nav.css"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}

      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">
        Vicolraj
      </a>

      <button
        className={`nav-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <span className="hamburger" />
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        <button className="nav-cancel" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
        <a href="#work" onClick={() => setOpen(false)}>Work</a>
        <a href="#tech" onClick={() => setOpen(false)}>Stack</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        <button className="nav-cta" onClick={() => setOpen(false)}>Hire Me →</button>
      </div>
      </nav>
    </>
  );
}

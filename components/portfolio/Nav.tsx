'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  slug: string;
  brand: string;
  labels: Record<string, string>;
};

export function Nav({ slug, brand, labels }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <Link href={`/${slug}`} className="nav-logo">
          {brand}
        </Link>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="hamburger" />
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <button className="nav-cancel" onClick={() => setOpen(false)} aria-label="Close menu">
            ×
          </button>
          <a href="#work" onClick={() => setOpen(false)}>
            {labels.work}
          </a>
          <a href="#tech" onClick={() => setOpen(false)}>
            {labels.stack}
          </a>
          <a href="#testimonials" onClick={() => setOpen(false)}>
            {labels.testimonials}
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            {labels.contact}
          </a>
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
            {labels.hire}
          </a>
        </div>
      </nav>
    </>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import TextType from '@/components/animation/TextType/TextType';

type Props = {
  slug: string;
  hero: Record<string, string>;
  stats: Array<{ label: string; value: string }>;
};

export function HeroSection({ slug, hero, stats }: Props) {
  return (
    <section className="hero-section">
      <div className="heroBg" />

      <div className="hero-left">
        <h1 className="hero-title">
          {hero.firstName}
          <br />
          <em>{hero.lastName}</em>
          <br />
          {hero.lineOne}
          <br />
          {hero.lineTwo}
        </h1>

        <div className="hero-sub">
          <TextType
            text={hero.subtext}
            typingSpeed={7}
            pauseDuration={1500}
            loop={false}
            showCursor
            cursorCharacter=""
            deletingSpeed={0}
            cursorBlinkDuration={0.5}
          />
        </div>

        <motion.div className="hero-actions" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <a href={`/${slug}/projects`} className="btn btn-primary">
            {hero.primaryCta}
          </a>
          <a href="#contact" className="btn btn-ghost">
            {hero.secondaryCta}
          </a>
        </motion.div>

        <div className="hero-stats">
          {stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-name-bg">{hero.firstName}</div>
        <Image src="/images/laptop.webp" alt={hero.imageAlt} width={800} height={560} priority />
      </div>
    </section>
  );
}

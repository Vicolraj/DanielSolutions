'use client';

import Image from 'next/image';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import { useMemo, useState } from 'react';

type Testimonial = {
  id: string;
  type: 'TEXT' | 'IMAGE';
  authorName: string;
  authorRole: string;
  content: string | null;
  imageUrl: string | null;
  showOnHome: boolean;
};

type Props = {
  testimonials: Testimonial[];
  title: string;
  eyebrow: string;
  moreLabel: string;
  slug: string;
  showMore?: boolean;
};

function noteRotation(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 10) - 5;
}

export function TestimonialWall({ testimonials, title, eyebrow, moreLabel, slug, showMore = true }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const imageTestimonials = useMemo(() => testimonials.filter((item) => item.type === 'IMAGE' && item.imageUrl), [testimonials]);

  const openImage = (id: string) => {
    const index = imageTestimonials.findIndex((item) => item.id === id);
    setLightboxIndex(index >= 0 ? index : null);
  };

  return (
    <section id="testimonials" className="testimonial-section">
      <div className="work-header reveal">
        <div>
          <div className="section-label">{eyebrow}</div>
          <h2 className="work-title">{title}</h2>
        </div>
      </div>

      <div className="testimonial-wall">
        {testimonials.map((item) => (
          <article
            className="testimonial-note"
            key={item.id}
            style={{ transform: `rotate(${noteRotation(item.id)}deg)` }}
          >
            <span className="note-tape" aria-hidden="true" />
            <span className="note-corner" aria-hidden="true" />
            {item.type === 'TEXT' ? (
              <>
                <p className="note-content">{item.content}</p>
                <p className="note-author">{item.authorName}</p>
                <p className="note-role">{item.authorRole}</p>
              </>
            ) : item.imageUrl ? (
              <button className="note-image-btn" onClick={() => openImage(item.id)}>
                <div className="note-image-wrap">
                  <Image src={item.imageUrl} alt={item.authorName} fill sizes="(max-width: 768px) 100vw, 33vw" loader={cloudinaryLoader} />
                </div>
                <p className="note-author">{item.authorName}</p>
                <p className="note-role">{item.authorRole}</p>
              </button>
            ) : null}
          </article>
        ))}
      </div>

      {showMore ? (
        <div className="work-more-wrap">
          <a className="btn btn-primary" href={`/${slug}/testimonials`}>
            {moreLabel}
          </a>
        </div>
      ) : null}

      {lightboxIndex !== null && imageTestimonials[lightboxIndex] ? (
        <div className="lightbox" role="dialog" aria-modal="true">
          <button className="modal-close" onClick={() => setLightboxIndex(null)} aria-label="Close">
            ×
          </button>
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + imageTestimonials.length) % imageTestimonials.length))}
            aria-label="Previous image"
          >
            ←
          </button>
          <div className="lightbox-inner">
            <Image
              src={imageTestimonials[lightboxIndex].imageUrl || ''}
              alt={imageTestimonials[lightboxIndex].authorName}
              width={960}
              height={720}
              loader={cloudinaryLoader}
            />
          </div>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={() => setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % imageTestimonials.length))}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  );
}

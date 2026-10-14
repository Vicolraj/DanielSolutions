'use client';

import Image from 'next/image';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import { useMemo, useRef, useState } from 'react';

type ProjectImage = {
  id: string;
  url: string;
  alt: string;
  order: number;
  isCover: boolean;
};

type Props = {
  images: ProjectImage[];
  title: string;
};

export function ProjectCarousel({ images, title }: Props) {
  const ordered = useMemo(
    () => [...images].sort((a, b) => Number(b.isCover) - Number(a.isCover) || a.order - b.order),
    [images]
  );
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!ordered.length) {
    return <div className="card-placeholder" aria-label={title} />;
  }

  const hasMultiple = ordered.length > 1;

  const goNext = () => setIndex((prev) => (prev + 1) % ordered.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + ordered.length) % ordered.length);

  return (
    <div
      className="project-carousel"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = end - touchStartX.current;
        if (Math.abs(delta) > 40) {
          if (delta < 0) goNext();
          if (delta > 0) goPrev();
        }
        touchStartX.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') goNext();
        if (event.key === 'ArrowLeft') goPrev();
      }}
      tabIndex={0}
    >
      <div className="project-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {ordered.map((image) => (
          <div className="project-carousel-slide" key={image.id}>
            <Image
              src={image.url}
              alt={image.alt || title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              loading="lazy"
              loader={cloudinaryLoader}
            />
          </div>
        ))}
      </div>

      {hasMultiple ? (
        <>
          <button className="carousel-arrow carousel-arrow-left" aria-label="Previous image" onClick={goPrev}>
            ←
          </button>
          <button className="carousel-arrow carousel-arrow-right" aria-label="Next image" onClick={goNext}>
            →
          </button>
          <div className="carousel-dots" role="tablist" aria-label="Project images">
            {ordered.map((image, dotIndex) => (
              <button
                key={image.id}
                type="button"
                className={`carousel-dot ${dotIndex === index ? 'active' : ''}`}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to image ${dotIndex + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

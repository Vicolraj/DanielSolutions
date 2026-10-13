import type { ImageLoaderProps } from 'next/image';

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.includes('res.cloudinary.com')) {
    return src;
  }

  const transform = `f_auto,q_${quality || 'auto'},w_${width}`;
  return src.replace('/upload/', `/upload/${transform}/`);
}

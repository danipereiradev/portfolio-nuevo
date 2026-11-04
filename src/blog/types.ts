import type { ReactNode } from 'react';

export const BLOG_PATH = '/blog';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  category: string;
  content: ReactNode;
  /** Preguntas frecuentes: se muestran al final y van al JSON-LD (FAQPage). */
  faq?: { q: string; a: string }[];
  /** Minutos de lectura aproximados */
  readingMinutes?: number;
};

export const getPostPath = (slug: string) => `${BLOG_PATH}/${slug}`;

export const formatPostDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

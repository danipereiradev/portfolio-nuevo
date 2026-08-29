import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { BlogPostCard } from '../components/BlogPostCard';
import HeroCta from '../components/HeroCta';
import RevealOnScroll from '../components/RevealOnScroll';
import { BLOG_PATH, getPostPath, posts } from '../blog/posts';
import { SITE_WEB_PATH } from '../config/contact';

const SITE_URL = 'https://36web.es';

const Blog = () => {
  usePageMeta(BLOG_PATH);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Blog',
              item: `${SITE_URL}${BLOG_PATH}/`,
            },
          ],
        },
        {
          '@type': 'Blog',
          name: 'Blog de 36web',
          url: `${SITE_URL}${BLOG_PATH}/`,
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: `${SITE_URL}${getPostPath(post.slug)}/`,
            datePublished: post.date,
          })),
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-blog', jsonLd);

  return (
    <>
      <section className='page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]'>
        <div className='container mx-auto flex flex-col gap-page-gap'>
          <header className='page-title-block max-w-3xl'>
            <h1 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Blog
            </h1>
            <p className='text-lg text-ink-dark md:text-xl'>
              Ideas, novedades y guías sobre desarrollo web, posicionamiento SEO
              y marketing digital para ayudarte con tu proyecto.
            </p>
          </header>
          <div className='mx-auto grid w-full grid-cols-1 items-stretch gap-page-gap lg:grid-cols-3'>
            {posts.map((post, index) => (
              <RevealOnScroll key={post.slug} className='h-full' delayMs={index * 90}>
                <BlogPostCard post={post} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <HeroCta
        title='Pide presupuesto de diseño web'
        description={
          <>
            Cuéntanos qué haces y qué tiene que hacer la página. Te devolvemos{' '}
            <strong className='font-extrabold'>propuesta</strong>{' '}
            <strong className='font-extrabold'>en el mismo día</strong>, con
            precio y plazos. Si no encaja, lo dices y no pasa nada.
          </>
        }
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de diseño web'
        formDescription='Propuesta en el mismo día. Sin compromiso.'
        formSectionInfo='Blog índice CTA'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default Blog;

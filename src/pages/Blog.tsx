import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import Hero from '../components/Hero';
import { BlogPostCard } from '../components/BlogPostCard';
import HeroCta from '../components/HeroCta';
import { BLOG_PATH, getPostPath, posts } from '../blog/posts';
import { SITE_WEB_PATH } from '../config/contact';

const SITE_URL = 'https://pereiraweb.es';

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
          name: 'Blog de PereiraWeb',
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
      <Hero
        title='Blog'
        description={
          <>
            <strong className='font-bold'>Ideas</strong>,{' '}
            <strong className='font-bold'>Novedades</strong> y{' '}
            <strong className='font-bold'>Guias</strong> sobre desarrollo web,{' '}
            <strong className='font-bold'>Posicionamiento SEO</strong> y{' '}
            <strong className='font-bold'>Marketing digital</strong> para
            ayudarte con tu proyecto.
          </>
        }
        buttonText='CONTACTA AHORA'
        buttonHref='#contacto'
        backgroundUrl='/img/web-design-charlesdeluvio.webp'
        hasButton={false}
        hasBackground
        hasReviewBadge={false}
      />

      <section className='page-section'>
        <div className='container mx-auto'>
          <div className='mx-auto grid w-full grid-cols-1 gap-page-gap lg:grid-cols-3'>
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <HeroCta
        title='Pide presupuesto de diseño web'
        description='Cuéntanos qué haces y qué tiene que hacer la página. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de diseño web'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo='Blog índice CTA'
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default Blog;

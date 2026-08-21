import { useMemo } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { ServiceBreadcrumb } from '../components/ServiceOnPage';
import { BlogPostCard } from '../components/BlogPostCard';
import { BLOG_PATH, getPostPath, posts } from '../blog/posts';

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
    <section className='page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <ServiceBreadcrumb
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Blog' },
          ]}
        />

        <div className='page-title-block mx-auto max-w-3xl text-center'>
          <h1 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Blog
          </h1>
          <p className='text-lg text-ink-dark md:text-xl'>
            Diseño web, tecnologías para crear una página y lo que cuesta
            montarla. Sin plantillas de 79 € ni humo.
          </p>
        </div>

        <div className='mx-auto grid w-full grid-cols-1 gap-page-gap lg:grid-cols-3'>
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;

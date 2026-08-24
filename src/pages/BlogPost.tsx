import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { BlogArticle } from '../components/BlogArticle';
import { BlogPostCard } from '../components/BlogPostCard';
import HeroCta from '../components/HeroCta';
import {
  BLOG_PATH,
  getPostBySlug,
  getPostPath,
  getRelatedPosts,
} from '../blog/posts';
import { SITE_WEB_PATH } from '../config/contact';

const SITE_URL = 'https://pereiraweb.es';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const path = post ? getPostPath(post.slug) : BLOG_PATH;
  const related = slug ? getRelatedPosts(slug, 3) : [];

  usePageMeta(path);

  const jsonLd = useMemo(() => {
    if (!post) return { '@context': 'https://schema.org', '@type': 'WebPage' };

    const url = `${SITE_URL}${getPostPath(post.slug)}/`;

    return {
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
            {
              '@type': 'ListItem',
              position: 3,
              name: post.title,
              item: url,
            },
          ],
        },
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          image: `${SITE_URL}${post.image}`,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: post.author,
          },
          publisher: {
            '@type': 'ProfessionalService',
            name: '36web',
            url: `${SITE_URL}/`,
          },
          mainEntityOfPage: url,
          articleSection: post.category,
        },
      ],
    };
  }, [post]);

  useJsonLd('jsonld-blog-post', jsonLd);

  if (!post) {
    return <Navigate to={BLOG_PATH} replace />;
  }

  return (
    <>
      <BlogArticle post={post} />

      {related.length > 0 ? (
        <section className='page-section bg-surface-muted'>
          <div className='container mx-auto flex flex-col gap-page-gap'>
            <div className='page-title-block max-w-3xl'>
              <h2 className='text-2xl font-extrabold text-ink-dark md:text-4xl'>
                Otras entradas que podrían interesarte
              </h2>
            </div>
            <div className='grid grid-cols-1 gap-page-gap lg:grid-cols-3'>
              {related.map((item) => (
                <BlogPostCard key={item.slug} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <HeroCta
        title='Pide presupuesto de diseño web'
        description='Cuéntanos qué haces y qué tiene que hacer la página. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='VER DISEÑO WEB'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
        formTitle='Presupuesto de diseño web'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo={`Blog: ${post.slug}`}
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default BlogPost;

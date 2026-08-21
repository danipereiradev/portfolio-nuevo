import { ServiceBreadcrumb } from './ServiceOnPage';
import { formatPostDate, type BlogPost } from '../blog/types';
import { BLOG_PATH } from '../blog/types';

export const BlogFigure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) => (
  <figure>
    <div className='overflow-hidden rounded-lg'>
      <img src={src} alt={alt} className='aspect-[4/3] w-full object-cover' />
    </div>
    {caption ? <figcaption>{caption}</figcaption> : null}
  </figure>
);

export const BlogArticle = ({ post }: { post: BlogPost }) => (
  <article className='page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]'>
    <div className='container mx-auto flex max-w-3xl flex-col gap-page-gap'>
      <ServiceBreadcrumb
        align='start'
        items={[
          { label: 'Inicio', href: '/' },
          { label: 'Blog', href: BLOG_PATH },
          { label: post.title },
        ]}
      />

      <header className='page-title-block'>
        <p className='text-sm font-bold uppercase tracking-wide text-accent'>
          {post.category}
          <span className='mx-2 text-ink-light'>·</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span className='mx-2 text-ink-light'>·</span>
          {post.author}
        </p>
        <h1 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
          {post.title}
        </h1>
        <p className='text-lg text-ink-dark md:text-xl'>{post.description}</p>
      </header>

      <div className='overflow-hidden rounded-lg'>
        <img
          src={post.image}
          alt={post.imageAlt}
          className='aspect-[16/5] w-full object-cover'
        />
      </div>

      <div className='blog-prose'>{post.content}</div>
    </div>
  </article>
);

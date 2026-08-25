import { formatPostDate, getPostPath, type BlogPost } from '../blog/posts';

export const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <a
    href={getPostPath(post.slug)}
    className='group relative block h-full overflow-hidden rounded-lg shadow-xl'
  >
    <img
      src={post.image}
      alt={post.imageAlt}
      width={800}
      height={600}
      className='aspect-[4/3] w-full object-cover'
      loading='lazy'
      decoding='async'
    />
    <div className='absolute inset-0 bg-gradient-to-t from-ink-dark via-ink-dark/75 to-ink-dark/25' />
    <div className='absolute inset-x-4 bottom-5 z-10 flex flex-col items-center text-center'>
      <time
        dateTime={post.date}
        className='text-sm font-extrabold uppercase tracking-wide text-brand md:text-base'
      >
        {formatPostDate(post.date)}
      </time>
      <h3 className='mt-2 text-2xl font-extrabold text-white md:text-3xl'>
        {post.title}
      </h3>
      <span className='mt-2 block h-1 w-10 bg-brand' />
      <span className='mt-3 inline-block text-sm font-extrabold uppercase tracking-wide text-brand-light underline decoration-2 underline-offset-4 group-hover:text-white md:text-base'>
        Leer más
      </span>
    </div>
  </a>
);

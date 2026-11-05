import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useJsonLd } from '../hooks/useJsonLd';
import { CONTACT_PATH, buildWhatsAppUrl } from '../config/contact';
import {
  BLOG_PATH,
  getPostBySlug,
  getPostPath,
  getRelatedPosts,
  posts,
  type BlogPost,
} from '../blog/posts';
import { SpanishOnlyNotice, usePrefs } from './prefs';
import { formatDate } from './i18n/content';
import BgDigit from './BgDigit';

const SITE_URL = 'https://36web.es';

function Meta({ post }: { post: BlogPost }) {
  const { lang, t } = usePrefs();
  const cat = post.category === 'Diseño web' ? t('Diseño web', 'Web design') : post.category;
  return (
    <>
      {cat} · <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      {post.readingMinutes ? <> · {post.readingMinutes} min</> : null}
    </>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  const { t } = usePrefs();
  return (
    <a
      href={getPostPath(post.slug)}
      className='rd-card group flex h-full flex-col overflow-hidden'
    >
      <div className='aspect-[3/2] overflow-hidden bg-black'>
        <img
          src={post.image}
          alt={post.imageAlt}
          loading='lazy'
          className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${
            post.image.startsWith('/img/portfolio') ? 'object-contain' : 'object-cover'
          }`}
        />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='rd-eyebrow mb-3'>
          <Meta post={post} />
        </p>
        <h3 className='text-2xl font-extrabold uppercase leading-tight'>
          {post.title}
        </h3>
        <p className='mt-3 text-sm leading-relaxed text-white/60'>{post.description}</p>
        <span className='mt-auto pt-6 text-xs font-bold uppercase tracking-[0.16em] text-white/60 group-hover:text-[#e1f56e]'>
          {t('Leer artículo', 'Read article')} →
        </span>
      </div>
    </a>
  );
}

function Cta({ text }: { text: string }) {
  const { t } = usePrefs();
  return (
    <section className='px-5 py-24 md:px-8'>
      <div className='mx-auto flex max-w-[1320px] flex-col gap-8 rounded-[1.75rem] bg-[#e1f56e] px-7 py-14 text-[#0b0c0a] md:flex-row md:items-center md:justify-between md:px-14'>
        <div>
          <p className='font-mono text-xs uppercase tracking-[0.2em]'>// let&apos;s build</p>
          <h2 className='rd-h2 mt-4 max-w-[16ch] !text-[clamp(1.9rem,4vw,3.4rem)]'>{text}</h2>
        </div>
        <div className='flex flex-wrap gap-3'>
          <a href={CONTACT_PATH} className='inline-flex items-center gap-2 rounded-full bg-[#0b0c0a] px-7 py-4 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3346c1]'>
            {t('Hablemos', 'Let’s talk')} ↗
          </a>
          <a href={buildWhatsAppUrl()} target='_blank' rel='noopener noreferrer' className='inline-flex items-center rounded-full border border-[#0b0c0a]/30 px-7 py-4 text-xs font-bold uppercase tracking-[0.14em]'>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export function BlogIndex() {
  usePageMeta(BLOG_PATH);
  const { t, lang } = usePrefs();
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const first = sorted[0];

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: '36blog', item: `${SITE_URL}${BLOG_PATH}/` },
          ],
        },
        {
          '@type': 'Blog',
          name: '36blog',
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
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)] isolate'>
        <BgDigit d='3' side='right' />
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto grid max-w-[1320px] gap-10 px-5 pb-20 pt-20 md:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end'>
          <div>
            <p className='rd-eyebrow mb-6'>{t('Blog · Ideas para crecer', 'Blog · Ideas to grow')}</p>
            <h1 className='rd-h1'>
              36<span className='rd-mark'>BLOG.</span>
            </h1>
          </div>
          <div>
            <p className='text-lg leading-relaxed text-white/65'>
              {t('Guías claras sobre diseño web, tiendas online, SEO y marketing para negocios que quieren más clientes, sin tecnicismos.', 'Clear guides on web design, online stores, SEO and marketing for businesses that want more customers — no jargon.')}
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <a href={CONTACT_PATH} className='rd-btn'>{t('Pide una revisión gratis', 'Get a free review')} ↗</a>
              {first ? (
                <a href={getPostPath(first.slug)} className='rd-btn-ghost'>{t('Último artículo', 'Latest article')}</a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-[1320px] px-5 pb-20 pt-4 md:px-8'>
        <dl className='grid gap-px overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/10 sm:grid-cols-3'>
          {[
            [t('Artículos', 'Articles'), String(posts.length), t('Guías prácticas, sin relleno', 'Practical guides, no filler')],
            [t('Último', 'Latest'), first ? formatDate(first.date, lang) : '—', first ? t(first.category, first.category === 'Diseño web' ? 'Web design' : first.category) : ''],
            [t('Temas', 'Topics'), t('Web · SEO · Ventas', 'Web · SEO · Sales'), t('Para negocios, no para técnicos', 'For business owners, not techies')],
          ].map(([k, v, d]) => (
            <div key={k} className='bg-[#0b0c0a] p-6'>
              <dt className='font-mono text-xs text-[#e1f56e]'>{k}</dt>
              <dd className='mt-4 text-2xl font-black uppercase'>{v}</dd>
              <dd className='mt-2 text-sm text-white/55'>{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className='rd-light relative isolate overflow-hidden'>
        <BgDigit d='6' side='left' />
        <div className='mx-auto max-w-[1320px] px-5 py-20 md:px-8'>
          <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {sorted.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      <Cta text={t('¿Prefieres que te lo hagamos?', 'Rather have us do it for you?')} />
      <SpanishOnlyNotice message='Our articles are currently available in Spanish only.' />
    </main>
  );
}

export default function BlogPostV2() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const path = post ? getPostPath(post.slug) : BLOG_PATH;
  const related = slug ? getRelatedPosts(slug, 3) : [];
  usePageMeta(path);
  const { t } = usePrefs();

  const jsonLd = useMemo(() => {
    if (!post) return { '@context': 'https://schema.org', '@type': 'WebPage' };
    const url = `${SITE_URL}${getPostPath(post.slug)}/`;
    const image = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '36blog', item: `${SITE_URL}${BLOG_PATH}/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'es-ES',
        author: { '@type': 'Organization', name: '36web', url: `${SITE_URL}/` },
        publisher: { '@type': 'ProfessionalService', name: '36web', url: `${SITE_URL}/` },
        mainEntityOfPage: url,
        articleSection: post.category,
      },
    ];
    if (post.faq?.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: post.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    }
    return { '@context': 'https://schema.org', '@graph': graph };
  }, [post]);
  useJsonLd('jsonld-blog-post', jsonLd);

  if (!post) return <Navigate to={BLOG_PATH} replace />;

  return (
    <main className='rd rd-page'>
      <section className='relative overflow-hidden pt-[var(--site-header-h)] isolate'>
        <BgDigit d='3' side='right' />
        <div className='rd-grid-bg pointer-events-none absolute inset-0' />
        <div className='relative mx-auto max-w-[1100px] px-5 pb-14 pt-16 md:px-8'>
          <a href={BLOG_PATH} className='rd-eyebrow inline-flex items-center gap-2 !text-white/50 hover:!text-[#e1f56e]'>
            ← 36blog
          </a>
          <p className='rd-eyebrow mb-6 mt-10'>
            <Meta post={post} />
          </p>
          <h1 className='text-[clamp(2.2rem,5vw,4.2rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]'>
            {post.title}
          </h1>
          <p className='mt-7 max-w-3xl text-lg leading-relaxed text-white/65'>{post.description}</p>
        </div>
      </section>

      <div className='mx-auto max-w-[1100px] px-5 md:px-8'>
        <div className='overflow-hidden rounded-[1.5rem] border border-white/10 bg-black'>
          <img src={post.image} alt={post.imageAlt} className='aspect-[16/7] w-full object-cover' />
        </div>
      </div>

      <section className='rd-light -mt-24 pt-24'>
        <div className='mx-auto grid max-w-[1100px] gap-10 px-5 pb-20 pt-14 md:px-8 lg:grid-cols-[1fr_260px]'>
          <article className='rd-prose rounded-[1.5rem] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] md:p-12'>
            {post.content}
            {post.faq?.length ? (
              <>
                <h2>{t('Preguntas frecuentes', 'FAQ')}</h2>
                <div className='rd-faq'>
                  {post.faq.map((f) => (
                    <details key={f.q}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </>
            ) : null}
          </article>
          <aside className='lg:sticky lg:top-28 lg:self-start'>
            <div className='rounded-[1.25rem] bg-[#0e0e0c] p-6 text-[#ffffff]'>
              <p className='font-mono text-[11px] uppercase tracking-[0.2em] text-brand-light'>{t('// revisión gratis', '// free review')}</p>
              <p className='mt-3 text-lg font-extrabold uppercase leading-tight'>{t('¿Tu web necesita una revisión?', 'Does your website need a check-up?')}</p>
              <p className='mt-3 text-sm text-[#ffffff]/60'>{t('La revisamos y te decimos qué arreglaríamos. Sin compromiso.', 'We review it and tell you what we’d fix. No strings attached.')}</p>
              <a href={CONTACT_PATH} className='mt-5 inline-flex rounded-full bg-[#e1f56e] px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0b0c0a] hover:bg-white'>
                {t('Pedir revisión', 'Request a review')} ↗
              </a>
            </div>
          </aside>
        </div>
      </section>

      {related.length ? (
        <section className='mx-auto max-w-[1320px] px-5 pt-24 md:px-8'>
          <p className='rd-eyebrow mb-5'>{t('Sigue leyendo', 'Keep reading')}</p>
          <h2 className='rd-h2 mb-10'>
            {t('Más del', 'More from the')} <span className='rd-mark'>36blog.</span>
          </h2>
          <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ) : null}

      <Cta text={t('¿Hablamos de tu web?', 'Shall we talk about your website?')} />
      <SpanishOnlyNotice message='This article is currently available in Spanish only.' />
    </main>
  );
}

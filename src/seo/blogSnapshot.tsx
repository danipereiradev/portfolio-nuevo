/**
 * HTML estático del blog para `scripts/prerender-meta.mjs`.
 * Deja el artículo completo (y el listado de artículos) en el HTML inicial,
 * para que Google lo lea sin tener que ejecutar React.
 */
import { renderToStaticMarkup } from 'react-dom/server';
import { posts, getPostBySlug, BLOG_PATH, getPostPath, formatPostDate } from '../blog/posts';

const SITE_URL = 'https://36web.es';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const BLOG_POST_SLUGS = posts.map((p) => p.slug);

/** Cuerpo del artículo: H1, fecha, contenido completo y preguntas frecuentes. */
export const buildBlogPostBodyHtml = (slug: string): string | null => {
  const post = getPostBySlug(slug);
  if (!post) return null;
  const body = renderToStaticMarkup(<>{post.content}</>);
  const faq = post.faq?.length
    ? `<section><h2>Preguntas frecuentes</h2>${post.faq
        .map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`)
        .join('')}</section>`
    : '';
  return `<main class="page-section" style="padding-top:7.5rem"><article class="container mx-auto">
<p><a href="${BLOG_PATH}/">36blog</a> · ${escapeHtml(post.category)}</p>
<h1>${escapeHtml(post.title)}</h1>
<p><time datetime="${post.date}">${escapeHtml(formatPostDate(post.date))}</time> · ${escapeHtml(post.author)}</p>
${body}
${faq}
</article></main>`;
};

/** Listado del blog con enlaces a cada artículo (enlazado interno). */
export const buildBlogIndexHtml = (): string => {
  const items = posts
    .map(
      (p) =>
        `<li><a href="${getPostPath(p.slug)}/"><h2>${escapeHtml(p.title)}</h2></a><p>${escapeHtml(p.description)}</p></li>`,
    )
    .join('');
  return `<main class="page-section" style="padding-top:7.5rem"><div class="container mx-auto">
<h1>36blog: diseño web, SEO y marketing para negocios</h1>
<ul>${items}</ul>
</div></main>`;
};

/** Mismo JSON-LD que pone BlogV2 en cliente (mismo id, así no se duplica). */
export const buildBlogPostJsonLd = (slug: string) => {
  const post = getPostBySlug(slug);
  if (!post) return null;
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
};

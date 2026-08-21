export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const ServiceBreadcrumb = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label='Migas de pan' className='w-full'>
    <ol className='flex flex-wrap items-center justify-center gap-2 text-sm text-ink-medium md:justify-start'>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={item.label} className='flex items-center gap-2'>
            {index > 0 ? <span aria-hidden='true'>/</span> : null}
            {item.href && !isLast ? (
              <a href={item.href} className='hover:text-link'>
                {item.label}
              </a>
            ) : (
              <span className='font-semibold text-ink-dark'>{item.label}</span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

type IncludeItem = {
  title: string;
  description: string;
};

export const ServiceIncludes = ({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: IncludeItem[];
}) => (
  <section className='page-section bg-surface-muted'>
    <div className='container mx-auto flex flex-col gap-page-gap'>
      <div className='page-title-block mx-auto max-w-3xl text-center'>
        <h2 className='text-2xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
          {title}
        </h2>
        <p className='text-lg text-ink-dark md:text-xl'>{intro}</p>
      </div>
      <div className='grid gap-page-gap md:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => (
          <article
            key={item.title}
            className='rounded-2xl border-2 border-ink-dark bg-white p-content-pad'
          >
            <h3 className='mb-heading-gap text-lg font-bold text-ink-dark md:text-xl'>
              {item.title}
            </h3>
            <p className='text-base leading-relaxed text-ink-medium md:text-lg'>
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  </section>
);


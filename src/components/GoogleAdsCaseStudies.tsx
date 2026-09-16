import RevealOnScroll from './RevealOnScroll';

type CaseStudy = {
  name: string;
  sector: string;
  campaign: string;
  period: string;
  story: string;
  kpis: { label: string; value: string }[];
  spend: string;
  spendLabel: string;
  result: string;
  resultLabel: string;
  chartLabel: string;
  chartValues: number[];
  chartTicks: string[];
  featured?: boolean;
};

const featuredCase: CaseStudy = {
  name: 'Nosotros mismos',
  sector: '36web · Agencia de diseño web',
  campaign: 'Búsqueda',
  period: '12 semanas',
  story:
    'Estás leyendo esto porque un anuncio te ha traído. No es un caso de un cliente: es esta campaña. Palabras de “página web”, “diseño web” y “tienda online”, landing que pide el teléfono y negativas para no pagar curiosos. El mismo trabajo que hacemos para ti.',
  kpis: [
    { label: 'Coste por lead', value: '19,80 €' },
    { label: 'Leads', value: '54' },
    { label: 'Proyectos cerrados', value: '8' },
  ],
  spend: '1.070 €',
  spendLabel: 'Gasto en Google',
  result: '8 proyectos',
  resultLabel: 'Cierres atribuidos',
  chartLabel: 'Leads por semana',
  chartValues: [2, 3, 3, 4, 4, 5, 5, 6, 5, 6, 5, 6],
  chartTicks: ['1', '6', '12'],
  featured: true,
};

const cases: CaseStudy[] = [
  {
    name: 'Camisetas Ahora',
    sector: 'Tienda de camisetas personalizadas',
    campaign: 'Búsqueda + Shopping',
    period: '12 semanas',
    story:
      'Vendían por Instagram y por quien ya les conocía. Montamos Shopping y búsqueda para “camiseta personalizada” y variantes. El clic caía en una ficha que pedía el pedido, no en la home.',
    kpis: [
      { label: 'ROAS', value: '4,2×' },
      { label: 'Coste por pedido', value: '6,80 €' },
      { label: 'Pedidos', value: '241' },
    ],
    spend: '1.640 €',
    spendLabel: 'Gasto en Google',
    result: '6.890 €',
    resultLabel: 'Ventas atribuidas',
    chartLabel: 'Pedidos por semana',
    chartValues: [9, 14, 16, 19, 22, 24, 28, 31, 27, 33, 36, 42],
    chartTicks: ['1', '6', '12'],
  },
  {
    name: 'Micolet',
    sector: 'Moda de segunda mano',
    campaign: 'Búsqueda',
    period: '12 semanas',
    story:
      'Había tráfico. Faltaban compras. Recortamos palabras que no convertían, subimos las que ya buscaban talla y marca, y medimos la compra, no el clic. El coste por pedido bajó mientras subían los pedidos.',
    kpis: [
      { label: 'ROAS', value: '5,1×' },
      { label: 'Coste por compra', value: '5,40 €' },
      { label: 'Compras', value: '518' },
    ],
    spend: '2.800 €',
    spendLabel: 'Gasto en Google',
    result: '14.280 €',
    resultLabel: 'Ventas atribuidas',
    chartLabel: 'Compras por semana',
    chartValues: [18, 22, 26, 29, 33, 36, 41, 44, 47, 52, 58, 62],
    chartTicks: ['1', '6', '12'],
  },
];

const BarChart = ({
  values,
  ticks,
  label,
  featured = false,
}: {
  values: number[];
  ticks: string[];
  label: string;
  featured?: boolean;
}) => {
  const max = Math.max(...values);

  return (
    <figure className='mt-6'>
      <figcaption className='mb-3 text-sm font-extrabold uppercase tracking-wide text-ink-medium'>
        {label}
      </figcaption>
      <div
        className={`flex items-end gap-1 md:gap-1.5 ${
          featured ? 'h-44 md:h-52' : 'h-36 md:h-40'
        }`}
        role='img'
        aria-label={`${label}: de ${values[0]} a ${values[values.length - 1]}`}
      >
        {values.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className={`min-w-0 flex-1 rounded-sm ${
              index === values.length - 1 ? 'bg-brand' : 'bg-accent'
            }`}
            style={{ height: `${Math.max(8, (value / max) * 100)}%` }}
          />
        ))}
      </div>
      <div className='mt-2 flex justify-between text-xs font-bold text-ink-medium'>
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </figure>
  );
};

const CaseCard = ({ item }: { item: CaseStudy }) => {
  const featured = Boolean(item.featured);

  return (
    <article
      className={`flex h-full flex-col rounded-lg border-2 border-ink-dark p-content-pad ${
        featured ? 'bg-brand-light' : 'bg-white'
      }`}
    >
      <p
        className={`text-sm font-extrabold uppercase tracking-wide ${
          featured ? 'text-ink-dark' : 'text-accent'
        }`}
      >
        {featured ? 'Caso destacado · ' : ''}
        {item.campaign} · {item.period}
      </p>
      <h3
        className={`mt-2 font-extrabold text-ink-dark ${
          featured
            ? 'text-3xl md:text-4xl lg:text-5xl'
            : 'text-2xl md:text-3xl'
        }`}
      >
        {item.name}
      </h3>
      <p className='mt-1 text-base font-bold text-ink-medium'>{item.sector}</p>
      <p
        className={`mt-4 leading-relaxed text-ink-dark ${
          featured ? 'text-lg md:text-xl' : 'text-base md:text-lg'
        }`}
      >
        {item.story}
      </p>

      <dl
        className={`mt-6 grid grid-cols-3 gap-2 border-y-2 border-ink-dark py-4 ${
          featured ? 'md:py-5' : ''
        }`}
      >
        {item.kpis.map((kpi) => (
          <div key={kpi.label} className='text-center'>
            <dt className='text-xs font-extrabold uppercase tracking-wide text-ink-medium md:text-sm'>
              {kpi.label}
            </dt>
            <dd
              className={`mt-1 font-display font-extrabold text-ink-dark ${
                featured
                  ? 'text-2xl md:text-3xl lg:text-4xl'
                  : 'text-xl md:text-2xl'
              }`}
            >
              {kpi.value}
            </dd>
          </div>
        ))}
      </dl>

      <BarChart
        values={item.chartValues}
        ticks={item.chartTicks}
        label={item.chartLabel}
        featured={featured}
      />

      <dl className='mt-6 space-y-2 text-base md:text-lg'>
        <div className='flex justify-between gap-4'>
          <dt className='text-ink-medium'>{item.spendLabel}</dt>
          <dd className='font-extrabold'>{item.spend}</dd>
        </div>
        <div className='flex justify-between gap-4'>
          <dt className='text-ink-medium'>{item.resultLabel}</dt>
          <dd className='font-extrabold text-accent'>{item.result}</dd>
        </div>
      </dl>
    </article>
  );
};

const GoogleAdsCaseStudies = () => (
  <section id='casos' className='page-section bg-surface-muted'>
    <div className='container mx-auto flex flex-col gap-page-gap'>
      <div className='page-title-block mx-auto max-w-5xl text-center'>
        <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
          El primer caso eres tú, leyendo esto.
        </h2>
        <p className='text-xl text-ink-dark md:text-2xl'>
          Esta landing es una campaña de Google Ads.{' '}
          <strong className='font-extrabold'>
            Si has llegado, el producto funciona
          </strong>
          . Abajo, otras dos cuentas.
        </p>
      </div>

      <RevealOnScroll>
        <CaseCard item={featuredCase} />
      </RevealOnScroll>

      <div className='grid items-stretch gap-page-gap lg:grid-cols-2'>
        {cases.map((item, index) => (
          <RevealOnScroll key={item.name} className='h-full' delayMs={index * 90}>
            <CaseCard item={item} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  </section>
);

export default GoogleAdsCaseStudies;

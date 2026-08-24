const rows = [
  {
    label: 'Precio',
    us: 'Desde 400 € + IVA. El número concreto va por escrito, según alcance.',
    ia: 'Más barato, a veces gratis. Sale rápido y sirve para probar.',
  },
  {
    label: 'Tu tiempo',
    us: 'Unas 2–4 h tuyas: nos cuentas el caso, mandas textos y fotos, y revisas. El resto lo montamos.',
    ia: 'El primer diseño sale en 1–2 h. Publicarla de verdad (dominio, móvil, textos, formulario, cookies): 20–40 h. Si no has montado una web antes, puede irse a 70 h.',
  },
  {
    label: 'Google',
    us: 'Estructura, móvil y una base razonable para Google.',
    ia: 'Puede verse bien. Posicionar no lo hace sola. Sumar Search Console, títulos y sitemap: otras 3–6 h.',
  },
  {
    label: 'Si algo se rompe',
    us: 'WhatsApp, teléfono o el chat. Te atiende quien la montó.',
    ia: 'Tú. Un tutorial, un foro, o volver a generar. Cada susto: 2–5 h, o empezar de cero.',
  },
  {
    label: 'De quién es',
    us: 'Tuya. Dominio, hosting y archivos a tu nombre.',
    ia: 'Depende de la herramienta. A veces se queda el servicio.',
  },
  {
    label: 'Cuándo encaja',
    us: 'La web tiene que traerte consultas o ventas.',
    ia: 'Un experimento, un evento, o estar online ya y sin presupuesto de tiempo.',
  },
];

const CompareVsAi = () => {
  return (
    <section className='page-section bg-surface'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <h2 className='text-2xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Con nosotros o con una IA
          </h2>
          <p className='text-base text-ink-medium md:text-lg lg:text-xl'>
            La IA vale para probar. No es una chapuza: es otra herramienta. Si
            la web tiene que traerte clientes, hace falta alguien que responda.
          </p>
        </div>

        <div className='hidden overflow-hidden rounded-lg border-2 border-ink-dark md:block'>
          <table className='w-full text-left'>
            <thead>
              <tr className='bg-accent text-white'>
                <th className='w-[18%] px-content-pad py-content-pad text-left text-sm font-extrabold uppercase tracking-wide'>
                  <span className='sr-only'>Criterio</span>
                </th>
                <th className='w-[41%] px-content-pad py-content-pad text-lg font-extrabold'>
                  36web
                </th>
                <th className='w-[41%] px-content-pad py-content-pad text-lg font-extrabold'>
                  Una web con IA
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.label}
                  className={
                    index % 2 === 0 ? 'bg-white' : 'bg-surface-muted'
                  }
                >
                  <th className='px-content-pad py-content-pad align-top text-base font-extrabold text-ink-dark'>
                    {row.label}
                    <span className='mt-2 block h-1 w-10 bg-brand' />
                  </th>
                  <td className='px-content-pad py-content-pad text-base font-medium text-ink-dark'>
                    {row.us}
                  </td>
                  <td className='px-content-pad py-content-pad text-base text-ink-gray'>
                    {row.ia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col gap-page-gap md:hidden'>
          {rows.map((row) => (
            <article
              key={row.label}
              className='rounded-lg border-2 border-ink-dark bg-white p-content-pad'
            >
              <h3 className='text-lg font-extrabold text-ink-dark'>
                {row.label}
              </h3>
              <span className='mb-content-gap mt-2 block h-1 w-10 bg-brand' />
              <p className='mb-heading-gap text-sm font-bold uppercase tracking-wide text-accent'>
                36web
              </p>
              <p className='mb-content-gap text-base font-medium text-ink-dark'>
                {row.us}
              </p>
              <p className='mb-heading-gap text-sm font-bold uppercase tracking-wide text-ink-medium'>
                Una web con IA
              </p>
              <p className='text-base text-ink-gray'>{row.ia}</p>
            </article>
          ))}
        </div>

        <p className='mx-auto max-w-3xl text-center text-base text-ink-medium md:text-lg'>
          Si con IA te llega, adelante. Si quieres precio cerrado, la web a tu
          nombre y a alguien al teléfono, pídenos propuesta.
        </p>
      </div>
    </section>
  );
};

export default CompareVsAi;

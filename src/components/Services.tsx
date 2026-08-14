import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const mainServices = [
    {
      title: t('services.webdesign.title'),
      description: t('services.webdesign.desc'),
      link: '/web-profesional-a-medida',
      image: '/img/theme-photos-CGpifH3FjOA-unsplash.jpg',
      imageAlt: 'Mock de web a medida — Hoy Viajamos',
      cta: 'Ver web a medida',
    },
    {
      title: t('services.wordpress.title'),
      description: t('services.wordpress.desc'),
      link: '/web-profesional-a-medida',
      image: '/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg',
      imageAlt: 'Mock de web a medida — Hoy Viajamos',
      cta: 'Ver web a medida',
    },
    {
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.desc'),
      link: '/tiendas-online',
      image: '/img/sumup-ShB9pI4mpRg-unsplash.jpg',
      imageAlt: 'Mock de tienda online — Camisetas Ahora',
      cta: 'Ver tiendas online',
    },
    {
      title: t('services.seo.title'),
      description: t('services.seo.desc'),
      link: '/web-profesional-a-medida',
      image: '/img/portfolio/mock-viajamos.png',
      imageAlt: 'Mock de web a medida — Hoy Viajamos',
      cta: 'Ver web a medida',
    },
    {
      title: t('services.maintenance.title'),
      description: t('services.maintenance.desc'),
      link: '/mantenimiento-web',
      image: '/img/portfolio/mock-carper.webp',
      imageAlt: 'Mock de web en mantenimiento — Carper Sonido',
      cta: 'Ver mantenimiento',
    },
  ];

  return (
    <section id='services' className='relative py-20 md:py-24 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='max-w-3xl mx-auto text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight'>
            {t('services.title')}
          </h2>
          <p className='text-xl md:text-2xl text-black leading-relaxed'>
            {t('services.description')}
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto'>
          {mainServices.map((service) => (
            <article
              key={service.link}
              className='bg-ink-dark text-neutral-300 shadow-xl rounded-2xl overflow-hidden flex flex-col '
            >
              <a
                href={service.link}
                className='block bg-gray-100'
                tabIndex={-1}
                aria-hidden='true'
              >
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  width={800}
                  height={600}
                  className='w-full aspect-[4/3] object-cover '
                  loading='lazy'
                  decoding='async'
                />
              </a>

              <div className='p-5 md:p-6 flex flex-col flex-1 text-center'>
                <h3 className='text-xl md:text-2xl font-bold text-neutral-300  mb-2'>
                  {service.title}
                </h3>
                <p className='text-sm md:text-base text-neutral-300  leading-relaxed mb-5 flex-1'>
                  {service.description}
                </p>
                {/* <a
                  href={service.link}
                  className='inline-flex self-start text-sm font-bold text-ink-dark border-2 border-ink-dark bg-accent px-4 py-2 rounded-lg shadow-[3px_3px_0_0_#1a1a1a] hover:shadow-[1px_1px_0_0_#1a1a1a] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
                >
                  {service.cta}
                </a> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

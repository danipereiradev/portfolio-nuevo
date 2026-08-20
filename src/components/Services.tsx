import { useLanguage } from '../contexts/LanguageContext';
import Button from './Button';

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
      title: t('services.ecommercePlantilla.title'),
      description: t('services.ecommercePlantilla.desc'),
      link: '/tiendas-online-woocommerce',
      image: '/img/sumup-ShB9pI4mpRg-unsplash.jpg',
      imageAlt: 'Mock de tienda online — Camisetas Ahora',
      cta: 'Ver tiendas online',
    },
    /* {
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
    {
      title: t('services.branding.title'),
      description: t('services.branding.desc'),
      link: '/diseó-grafico-branding',
      image: '/img/portfolio/mock-carper.webp',
      imageAlt: 'Mock de web en mantenimiento — Carper Sonido',
      cta: 'Ver mantenimiento',
    }, */
  ];

  return (
    <section id='services' className='page-section bg-surface-muted'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
            {t('services.title')}
          </h2>
          <p className='text-xl md:text-2xl text-black'>
            {t('services.description')}
          </p>
        </div>
        <div className='mx-auto grid grid-cols-1 gap-page-gap md:grid-cols-2 lg:grid-cols-4'>
          {mainServices.map((service) => (
            <article
              key={service.link}
              className='bg-surface-muted shadow-xl rounded-2xl overflow-hidden flex flex-col'
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

              <div className='page-card-body text-center'>
                <h3 className='flex-grow text-2xl font-bold md:text-3xl'>
                  {service.title}
                </h3>
                <p className='flex-1 text-md leading-relaxed md:text-lg'>
                  {service.description}
                </p>
                <Button>Ver mas</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import { useLanguage } from '../contexts/LanguageContext';
import { SITE_SHOP_PATH, SITE_WEB_PATH } from '../config/contact';

const Services = () => {
  const { t } = useLanguage();

  const mainServices = [
    {
      title: t('services.webdesign.title'),
      link: SITE_WEB_PATH,
      image: '/img/theme-photos-CGpifH3FjOA-unsplash.jpg',
      imageAlt: 'Mock de web a medida — Hoy Viajamos',
    },
    {
      title: t('services.wordpress.title'),
      link: SITE_WEB_PATH,
      image: '/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg',
      imageAlt: 'Mock de web a medida — Hoy Viajamos',
    },
    {
      title: t('services.ecommerce.title'),
      link: SITE_SHOP_PATH,
      image: '/img/sumup-ShB9pI4mpRg-unsplash.jpg',
      imageAlt: 'Mock de tienda online — Camisetas Ahora',
    },
    {
      title: t('services.ecommercePlantilla.title'),
      link: SITE_SHOP_PATH,
      image: '/img/sumup-ShB9pI4mpRg-unsplash.jpg',
      imageAlt: 'Mock de tienda online — Camisetas Ahora',
    },
  ];

  return (
    <section id='services' className='page-section bg-surface-muted'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {t('services.title')}
          </h2>
          <p className='text-xl md:text-2xl text-ink-dark'>
            {t('services.description')}
          </p>
        </div>
        <div className='mx-auto grid grid-cols-1 gap-page-gap md:grid-cols-2 lg:grid-cols-4'>
          {mainServices.map((service) => (
            <a
              key={service.title}
              href={service.link}
              className='group relative block overflow-hidden rounded-2xl shadow-xl'
            >
              <img
                src={service.image}
                alt={service.imageAlt}
                width={800}
                height={600}
                className='aspect-[4/3] w-full object-cover'
                loading='lazy'
                decoding='async'
              />
              <div className='absolute inset-0 bg-ink-dark/55 transition-colors duration-300 group-hover:bg-ink-dark/40' />
              <h3 className='absolute inset-x-4 bottom-6 z-10 text-center text-2xl font-extrabold text-white md:text-3xl'>
                {service.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

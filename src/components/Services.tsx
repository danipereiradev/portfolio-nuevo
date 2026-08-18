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
    <section
      id='services'
      className='bg-gray-50 flex items-center text-center md:text-start gap-8  py-8 px-4 md:min-h-[100vh] md:px-8'
    >
      <div className='mx-auto flex flex-col gap-12 container'>
        <div className='mx-auto text-center flex flex-col gap-8'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
            {t('services.title')}
          </h2>
          <p className='text-xl md:text-2xl text-black'>
            {t('services.description')}
          </p>
        </div>
        <div className='grid md:grid-cols-4 gap-12 md:gap-12 mx-auto md:pt-24'>
          {mainServices.map((service) => (
            <article
              key={service.link}
              className='bg-[#f4f4f4] shadow-xl rounded-2xl overflow-hidden flex flex-col'
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

              <div className='p-5 md:p-6 flex flex-col flex-1 text-center gap-4'>
                <h3 className='text-2xl md:text-3xl font-bold mb-2 flex-grow'>
                  {service.title}
                </h3>
                <p className='text-md md:text-lg leading-relaxed mb-5 flex-1'>
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

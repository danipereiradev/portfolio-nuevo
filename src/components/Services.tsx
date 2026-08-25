import type { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import {
  SITE_MAINTENANCE_LABEL,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_LABEL,
  SITE_SHOP_PATH,
  SITE_WEB_LABEL,
  SITE_WEB_PATH,
} from '../config/contact';

interface ServicesProps {
  description: ReactNode;
}

const Services = ({ description }: ServicesProps) => {
  const { t } = useLanguage();

  const mainServices = [
    {
      title: SITE_WEB_LABEL,
      link: SITE_WEB_PATH,
      image: '/img/theme-photos-CGpifH3FjOA-unsplash.jpg',
      imageAlt: 'Diseño web a medida',
    },
    {
      title: SITE_SHOP_LABEL,
      link: SITE_SHOP_PATH,
      image: '/img/sumup-ShB9pI4mpRg-unsplash.jpg',
      imageAlt: 'Tienda online',
    },
    {
      title: SITE_MAINTENANCE_LABEL,
      link: SITE_MAINTENANCE_PATH,
      image: '/img/justin-morgan-wordpress.jpg',
      imageAlt: 'Mantenimiento web',
    },
  ];

  return (
    <section
      id='services'
      className='page-section scroll-mt-24 bg-surface-muted'
    >
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
            En que podemos ayudarte
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {t('services.title')}
          </h2>
          <p className='text-xl md:text-2xl text-ink-dark'>{description}</p>
        </div>
        <div className='mx-auto grid w-full grid-cols-1 items-stretch gap-page-gap md:grid-cols-3'>
          {mainServices.map((service, index) => (
            <RevealOnScroll
              key={service.title}
              className='h-full'
              delayMs={index * 90}
            >
              <a
                href={service.link}
                className='group relative block h-full overflow-hidden rounded-lg shadow-xl'
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
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

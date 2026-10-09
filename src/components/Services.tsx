import type { ReactNode } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import RevealOnScroll from './RevealOnScroll';
import {
  SITE_APPS_LABEL,
  SITE_APPS_PATH,
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
      image: '/img/services/paginas-web.png',
      imageAlt: 'Diseño web',
    },
    {
      title: SITE_SHOP_LABEL,
      link: SITE_SHOP_PATH,
      image: '/img/services/tiendas-online.png',
      imageAlt: 'Tiendas online',
    },
    {
      title: SITE_APPS_LABEL,
      link: SITE_APPS_PATH,
      image: '/img/services/aplicaciones.png',
      imageAlt: 'Desarrollo de aplicaciones web y móviles',
    },
    {
      title: SITE_MAINTENANCE_LABEL,
      link: SITE_MAINTENANCE_PATH,
      image: '/img/services/mantenimiento-web.png',
      imageAlt: 'Mantenimiento web',
    },
  ];

  return (
    <section id='services' className='page-section bg-white'>
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
        <div className='mx-auto grid w-full grid-cols-1 items-stretch gap-page-gap md:grid-cols-2 lg:grid-cols-4'>
          {mainServices.map((service, index) => (
            <RevealOnScroll
              key={service.title}
              className='h-full min-w-0'
              delayMs={index * 90}
            >
              <a
                href={service.link}
                className='group relative flex h-full min-w-0 flex-col rounded-lg bg-white'
              >
                <span className='flex w-full min-w-0 items-center justify-center overflow-hidden'>
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width={800}
                    height={600}
                    className='aspect-[4/3] w-full bg-white object-cover md:object-contain md:p-content-pad lg:w-[130%] lg:max-w-none lg:shrink-0 lg:p-0'
                    loading='lazy'
                    decoding='async'
                  />
                </span>
                <h3 className='z-20 px-content-pad pb-content-pad text-center text-2xl font-extrabold text-ink-dark md:text-3xl lg:text-2xl'>
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

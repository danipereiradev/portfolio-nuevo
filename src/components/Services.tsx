import React from 'react';
import {
  Globe,
  ShoppingCart,
  Palette,
  Settings,
  Search,
  Code2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Globe className='w-8 h-8' />,
      title: t('services.corporate.title'),
      description: t('services.corporate.desc'),
      link: '/paginas-web-empresas',
    },
    {
      icon: <ShoppingCart className='w-8 h-8' />,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.desc'),
      link: '/tiendas-online',
    },
    {
      icon: <Settings className='w-8 h-8' />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.desc'),
      link: '/mantenimiento-web',
    },
    {
      icon: <Code2 className='w-8 h-8' />,
      title: t('services.custom.title'),
      description: t('services.custom.desc'),
      link: '/desarrollo-aplicaciones-web',
    },
    {
      icon: <Palette className='w-8 h-8' />,
      title: t('services.design.title'),
      description: t('services.design.desc'),
      link: '/diseno-web',
    },
    {
      icon: <Search className='w-8 h-8' />,
      title: t('services.seo.title'),
      description: t('services.seo.desc'),
      link: '/posicionamiento-web-seo',
    },
  ];

  return (
    <section id='services' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            {t('services.title')}
            <span className='block text-2xl text-accent font-normal mt-2'>
              {t('services.subtitle')}
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            {t('services.description')}
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className='bg-white p-8 rounded-lg border border-gray-200 hover:border-accent transition-colors duration-200 text-center group'
            >
              <div className='text-gray-900 mb-4 flex justify-center group-hover:text-accent transition-colors'>
                {service.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors'>
                {service.title}
              </h3>
              <p className='text-gray-600 leading-relaxed'>{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

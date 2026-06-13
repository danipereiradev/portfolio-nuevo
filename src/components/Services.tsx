import React from 'react';
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Palette,
  Code,
  Rocket,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Palette className='w-8 h-8' />,
      title: 'Diseño Web',
      description:
        'Creamos diseños web modernos y atractivos que reflejan tu marca y captan la atención de tus clientes.',
      link: '/diseno-web',
    },
    {
      icon: <Globe className='w-8 h-8' />,
      title: t('services.corporate.title'),
      description:
        'Páginas web corporativas profesionales para empresas que necesitan fortalecer su presencia digital.',
      link: '/paginas-web-empresas',
    },
    {
      icon: <ShoppingCart className='w-8 h-8' />,
      title: t('services.ecommerce.title'),
      description:
        'Tiendas online completas con pasarela de pago, gestión de productos y todo lo necesario para vender online.',
      link: '/tiendas-online',
    },
    {
      icon: <Smartphone className='w-8 h-8' />,
      title: t('services.webapp.title'),
      description:
        'Desarrollo de aplicaciones web y móviles a medida para proyectos únicos y startups.',
      link: '/aplicaciones-web',
    },
    {
      icon: <Rocket className='w-8 h-8' />,
      title: 'Posicionamiento SEO',
      description:
        'Optimización SEO para mejorar tu visibilidad en Google y atraer más clientes a tu negocio.',
      link: '/seo',
    },
    {
      icon: <Code className='w-8 h-8' />,
      title: t('services.frontend.title'),
      description: t('services.frontend.desc'),
      link: '/contacto',
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
              className='bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center group'
            >
              <div className='w-16 h-16 bg-white border-2 border-black rounded-xl flex items-center justify-center text-black mb-6 transition-all duration-300 mx-auto group-hover:border-accent group-hover:text-accent'>
                {service.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4 group-hover:text-accent transition-colors'>
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

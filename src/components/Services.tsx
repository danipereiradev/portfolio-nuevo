import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BrowserGraphic,
  CartGraphic,
  ShieldGraphic,
} from './decor/ServiceGraphics';
import GlowBackdrop from './decor/GlowBackdrop';

const Services = () => {
  const { t } = useLanguage();

  const mainServices = [
    {
      graphic: <BrowserGraphic />,
      title: t('services.corporate.title'),
      description: t('services.corporate.desc'),
      link: '/web-autonomos-pymes',
    },
    {
      graphic: <CartGraphic />,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.desc'),
      link: '/tiendas-online',
    },
    {
      graphic: <ShieldGraphic />,
      title: t('services.maintenance.title'),
      description: t('services.maintenance.desc'),
      link: '/mantenimiento-web',
    },
  ];

  return (
    <section id='services' className='relative py-20 overflow-hidden'>
      <GlowBackdrop />

      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-white mb-4 max-w-4xl mx-auto'>
            {t('services.title')}
          </h2>
          <p className='text-xl text-white/70 max-w-3xl mx-auto'>
            {t('services.description')}
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto'>
          {mainServices.map((service, index) => (
            <div
              key={index}
              className='rounded-xl bg-ink-dark border-2 border-white/15 hover:border-accent shadow-[6px_6px_0_0_rgba(20,184,166,0.25)] hover:shadow-[3px_3px_0_0_rgba(20,184,166,0.5)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200 p-6 md:p-8 flex flex-col'
            >
              {service.graphic}

              <h3 className='text-2xl font-bold text-white mt-5 mb-3'>
                {service.title}
              </h3>
              <p className='text-white/80 text-base leading-relaxed mb-6'>
                {service.description}
              </p>

              <div className='mt-auto'>
                <Link
                  to={service.link}
                  className='inline-flex text-sm font-bold text-white border-2 border-white/30 rounded-lg px-5 py-2.5 shadow-[3px_3px_0_0_rgba(255,255,255,0.25)] hover:bg-white hover:text-ink-dark hover:border-white hover:shadow-[1px_1px_0_0_rgba(255,255,255,0.25)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
                >
                  Ver servicio
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

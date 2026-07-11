import { Check } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import Button from './Button';

const AuditoriaPlans = () => {
  const { openModal } = useContactModal();

  const plans = [
    {
      name: 'Mini auditoría',
      price: '59',
      description:
        'Para detectar errores rápidos antes de lanzar campañas o invertir más en tráfico.',
      features: [
        'Vídeo de 10-15 minutos',
        'Revisión de una sección clave',
        'Revisión móvil o escritorio',
        '10 mejoras concretas',
        'Entrega en 48h',
      ],
      cta: 'Solicitar mini auditoría',
      recommended: false,
    },
    {
      name: 'Auditoría ecommerce',
      price: '179',
      description:
        'La opción recomendada para tiendas que reciben visitas pero no consiguen suficientes ventas.',
      features: [
        'Vídeo de 30-45 minutos',
        'Revisión móvil y escritorio',
        'Home, producto, carrito y checkout',
        'Revisión de confianza y claridad',
        'Lista priorizada de mejoras',
        'Recomendaciones de UX y conversión',
      ],
      cta: 'Solicitar auditoría',
      recommended: true,
    },
    {
      name: 'Auditoría + implementación',
      price: '469',
      pricePrefix: 'Desde ',
      description:
        'Para tiendas WooCommerce, Shopify o PrestaShop que quieren detectar problemas y aplicar mejoras.',
      features: [
        'Todo lo incluido en la auditoría ecommerce',
        'Propuesta de mejoras técnicas/visuales',
        'Ajustes básicos en WooCommerce, Shopify o PrestaShop',
        'Revisión responsive',
        'Correcciones según alcance acordado',
      ],
      cta: 'Quiero mejorar mi tienda',
      recommended: false,
    },
  ];

  return (
    <section id='planes' className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Planes de auditoría ecommerce
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl p-8 border flex flex-col relative ${
                plan.recommended ? 'border-accent' : 'border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1.5 rounded-full text-sm font-semibold'>
                  DESTACADO
                </div>
              )}

              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  {plan.name}
                </h3>
                <p className='text-gray-600 mb-6'>{plan.description}</p>
                <div className='flex flex-col items-start gap-1'>
                  <div className='flex items-baseline gap-2'>
                    {plan.pricePrefix && (
                      <span className='text-xl text-gray-600'>{plan.pricePrefix}</span>
                    )}
                    <span className='text-5xl font-bold text-accent'>
                      {plan.price}
                    </span>
                    <span className='text-xl text-gray-600'>€</span>
                  </div>
                  <span className='text-xs text-gray-400'>IVA incluido</span>
                </div>
              </div>

              <ul className='space-y-3 mb-8 flex-grow'>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700 text-sm'>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className='mt-auto'>
                <Button onClick={openModal} variant='primary' fullWidth>
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuditoriaPlans;

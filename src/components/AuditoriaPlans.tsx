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
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6'>
            Planes de auditoría ecommerce
          </h2>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 border-2 flex flex-col relative transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] ${
                plan.recommended
                  ? 'bg-ink-dark text-white border-accent shadow-[7px_7px_0_0_#0d9488] hover:shadow-[3px_3px_0_0_#0d9488]'
                  : 'bg-white border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] hover:shadow-[3px_3px_0_0_#1a1a1a]'
              }`}
            >
              {plan.recommended && (
                <span className='absolute -top-4 left-8 bg-accent text-ink-dark border-2 border-ink-dark text-xs font-bold uppercase tracking-wide px-3 py-1 rotate-[-2deg]'>
                  Destacado
                </span>
              )}

              <div className='mb-6'>
                <h3
                  className={`text-2xl font-bold mb-4 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`mb-6 text-base ${plan.recommended ? 'text-white/80' : 'text-gray-700'}`}
                >
                  {plan.description}
                </p>
                <div className='flex flex-col items-start gap-1'>
                  <div className='flex items-baseline gap-2'>
                    {plan.pricePrefix && (
                      <span
                        className={`text-xl ${plan.recommended ? 'text-white/70' : 'text-gray-600'}`}
                      >
                        {plan.pricePrefix}
                      </span>
                    )}
                    <span className='text-5xl font-extrabold text-accent'>
                      {plan.price}
                    </span>
                    <span
                      className={`text-xl ${plan.recommended ? 'text-white/70' : 'text-gray-600'}`}
                    >
                      €
                    </span>
                  </div>
                  <span
                    className={`text-xs ${plan.recommended ? 'text-white/50' : 'text-gray-400'}`}
                  >
                    IVA incluido
                  </span>
                </div>
              </div>

              <ul className='space-y-3 mb-8 flex-grow'>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span
                      className={`text-sm ${plan.recommended ? 'text-white/90' : 'text-gray-800'}`}
                    >
                      {feature}
                    </span>
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

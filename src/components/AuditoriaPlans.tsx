import { Check, Star } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

const AuditoriaPlans = () => {
  const { openModal } = useContactModal();

  const plans = [
    {
      name: 'Mini auditoría',
      price: '49',
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
      price: '149',
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
      price: 'Desde 390',
      description:
        'Para tiendas WordPress/WooCommerce que quieren detectar problemas y aplicar mejoras.',
      features: [
        'Todo lo incluido en la auditoría ecommerce',
        'Propuesta de mejoras técnicas/visuales',
        'Ajustes básicos en WordPress/WooCommerce',
        'Revisión responsive',
        'Correcciones según alcance acordado',
      ],
      cta: 'Quiero mejorar mi tienda',
      recommended: false,
    },
  ];

  return (
    <section className='py-20 bg-gray-50'>
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
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.recommended
                  ? 'ring-2 ring-accent transform md:-translate-y-4'
                  : ''
              }`}
            >
              {plan.recommended && (
                <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2'>
                  <Star className='w-4 h-4 fill-current' />
                  Recomendado
                </div>
              )}

              <div className='text-center mb-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                  {plan.name}
                </h3>
                <div className='mb-4'>
                  <span className='text-5xl font-bold text-accent'>
                    {plan.price}
                  </span>
                  {plan.price !== 'Desde 390' && (
                    <span className='text-xl text-gray-600'> €</span>
                  )}
                  {plan.price === 'Desde 390' && (
                    <span className='text-xl text-gray-600'> €</span>
                  )}
                </div>
                <p className='text-gray-600'>{plan.description}</p>
              </div>

              <ul className='space-y-4 mb-8'>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span className='text-gray-700'>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={openModal}
                className='w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-semibold transition-colors duration-200'
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuditoriaPlans;

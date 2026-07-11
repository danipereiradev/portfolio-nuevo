import { Check, Wallet } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useSectionView } from '../hooks/useSectionView';
import { trackPricingCtaClick, trackViewPricing } from '../utils/analytics';
import Button from './Button';

const Pricing = () => {
  const { openModal } = useContactModal();
  const sectionRef = useSectionView<HTMLElement>(trackViewPricing);

  const plans = [
    {
      id: 'webpage',
      name: 'Web profesional',
      idealFor: 'Autónomos, marcas personales y pequeños negocios',
      description:
        'Para empresas, autónomos y negocios que necesitan una web clara, responsive y profesional para presentar sus servicios y captar contactos.',
      path: '/paginas-web-empresas',
      deliveryTime: '2-3 semanas',
      cta: 'Solicitar propuesta',
      features: [
        'Diseño responsive adaptado a móviles',
        'Hasta 6 páginas o secciones',
        'Formulario de contacto funcional',
        'Optimización SEO básica',
        'Integración Google Analytics',
        'Certificado SSL (https seguro)',
        'Hosting primer año incluido',
        'Formación uso y gestión',
        'Hasta 2 revisiones incluidas',
      ],
      recommended: false,
    },
    {
      id: 'ecommerce',
      name: 'Tienda online',
      idealFor: 'Negocios que quieren vender online y emprendedores',
      description:
        'Para proyectos que necesitan vender productos o servicios online con una estructura cuidada, escalable y fácil de gestionar.',
      path: '/tiendas-online',
      deliveryTime: '4-6 semanas',
      cta: 'Solicitar propuesta',
      features: [
        'Hasta 50 productos cargados',
        'Pasarela de pago (Stripe/Redsys)',
        'Gestión de pedidos e inventario',
        'Sistema de envíos y zonas',
        'Carrito con cupones descuento',
        'Diseño responsive profesional',
        'Panel administración español',
        'Optimización SEO e-commerce',
        'Integración redes sociales',
        'Formación completa incluida',
        'Hasta 2 revisiones incluidas',
      ],
      recommended: true,
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento web',
      idealFor: 'Webs ya publicadas que necesitan soporte continuo',
      description:
        'Para webs ya publicadas que necesitan soporte, pequeños cambios, revisión técnica, mejoras de contenido o acompañamiento mensual.',
      path: '/mantenimiento-web',
      deliveryTime: 'Servicio mensual',
      cta: 'Solicitar propuesta',
      features: [
        'Modificaciones incluidas cada mes',
        'Actualizaciones de seguridad mensuales',
        'Backups automáticos semanales',
        'Monitoreo uptime 24/7',
        'Soporte técnico prioritario',
        'Optimización de rendimiento',
        'Protección contra malware',
        'Renovación certificado SSL',
        'Informes mensuales de actividad',
        'Gestión de dominio y hosting',
      ],
      recommended: false,
    },
  ];

  return (
    <section id='pricing' ref={sectionRef} className='py-20 bg-gray-50'>
      <div className='mx-auto w-full max-w-screen-2xl px-6'>
        <div className='text-center mb-12 max-w-3xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Presupuesto claro antes de empezar
          </h2>
          <p className='text-lg text-gray-600 mb-3'>
            Cada proyecto tiene necesidades distintas. Por eso preparamos una
            propuesta personalizada según el alcance, funcionalidades,
            contenidos y objetivos de la web.
          </p>
          <p className='text-sm text-gray-500'>
            Antes de empezar, recibirás una propuesta clara con qué incluye
            el proyecto, plazos, forma de trabajo y opciones de pago
            disponibles.
          </p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl p-8 border flex flex-col relative ${
                plan.recommended ? 'border-accent' : 'border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-6 py-1.5 rounded-full text-sm font-semibold'>
                  Más solicitado
                </div>
              )}

              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                  {plan.name}
                </h3>
                <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3'>
                  Ideal para: {plan.idealFor}
                </p>
                <p className='text-gray-600 mb-4'>{plan.description}</p>
                <span className='text-sm text-gray-500'>
                  Entrega: {plan.deliveryTime}
                </span>
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
                <Button
                  href={plan.path}
                  onClick={() => trackPricingCtaClick(plan.name, plan.cta)}
                  variant='primary'
                  fullWidth
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 text-center'>
          <Wallet className='w-6 h-6 text-accent mx-auto mb-4' />
          <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
            Opciones de pago flexible
          </h3>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Según el tipo de proyecto, podemos trabajar con pago único, pago
            fraccionado o plan mensual. Todo queda definido en la propuesta
            antes de empezar, para que tengas claro el alcance, los plazos y
            las condiciones.
          </p>
        </div>

        <div className='text-center mt-16'>
          <div className='bg-white border border-gray-200 rounded-xl p-8 max-w-4xl mx-auto'>
            <h3 className='text-2xl md:text-3xl font-bold text-black mb-4'>
              ¿No sabes qué necesitas exactamente?
            </h3>
            <p className='text-gray-700 mb-6'>
              También preparamos propuestas para landing pages, páginas de
              presentación o webs más sencillas. Cuéntanos qué necesitas y
              te preparamos una propuesta ajustada a tu proyecto.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                onClick={() => {
                  trackPricingCtaClick(
                    'Presupuesto ajustado',
                    'Solicitar propuesta',
                  );
                  openModal();
                }}
                variant='ghost'
                className='!bg-black !text-white hover:!bg-accent hover:!text-white'
              >
                Solicitar propuesta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

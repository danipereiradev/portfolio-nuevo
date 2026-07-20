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
      id: 'web360',
      name: 'Web Profesional 360',
      idealFor: 'Autónomos, pymes y negocios locales que quieren precio y proceso claros',
      description:
        'Dos packs de alcance definido, con precio claro desde el principio: una web profesional lista para funcionar, sin procesos eternos ni presupuestos ambiguos.',
      path: '/web-profesional-360',
      deliveryTime: '2-3 semanas',
      cta: 'Solicitar propuesta',
      features: [
        'Dos packs de alcance definido, desde 1.090 € + IVA',
        'Diseño adaptado a tu negocio, móvil y escritorio',
        'SEO técnico y SEO local básico',
        'Formulario de contacto y botón de WhatsApp',
        'Certificado SSL y analítica configurada',
        'Publicación y conexión de tu dominio',
        'Mantenimiento opcional desde 60 €/mes + IVA',
        'Dos rondas de cambios incluidas',
      ],
      recommended: true,
    },
    {
      id: 'webpage',
      name: 'Web a Medida',
      idealFor: 'Proyectos con funcionalidades, estructura o integraciones específicas',
      description:
        'Para empresas que necesitan un desarrollo con alcance personalizado: funcionalidades especiales, integraciones externas, áreas privadas o arquitectura propia.',
      path: '/web-autonomos-pymes',
      deliveryTime: 'Según el alcance del proyecto',
      cta: 'Solicitar propuesta',
      features: [
        'Diseño y arquitectura adaptados al proyecto',
        'Funcionalidades y flujos a medida',
        'Integraciones con herramientas externas',
        'Áreas privadas o paneles internos',
        'Estructura técnica pensada para escalar',
        'Formulario, contacto y analítica configurados',
        'Certificado SSL (https seguro)',
        'Acompañamiento durante todo el desarrollo',
        'Rondas de revisión acordadas según el proyecto',
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
      recommended: false,
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
    <section
      id='pricing'
      ref={sectionRef}
      className='relative py-20 bg-white overflow-hidden'
    >
      <div className='mx-auto w-full max-w-screen-2xl px-6 relative z-10'>
        <div className='text-center mb-12 max-w-3xl mx-auto'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6'>
            Presupuesto claro antes de empezar
          </h2>
          <p className='text-lg md:text-xl text-gray-700 font-medium mb-3'>
            Cada proyecto tiene necesidades distintas. Por eso preparamos una
            propuesta personalizada según el alcance, funcionalidades,
            contenidos y objetivos de la web.
          </p>
          <p className='text-base text-gray-500'>
            Antes de empezar, recibirás una propuesta clara con qué incluye
            el proyecto, plazos, forma de trabajo y opciones de pago
            disponibles.
          </p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 pt-4'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl p-8 border-2 flex flex-col relative transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] ${
                plan.recommended
                  ? 'bg-ink-dark text-white border-accent shadow-[7px_7px_0_0_#0d9488] hover:shadow-[3px_3px_0_0_#0d9488]'
                  : 'bg-white border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] hover:shadow-[3px_3px_0_0_#1a1a1a]'
              }`}
            >
              {plan.recommended && (
                <div className='absolute -top-4 left-8 bg-accent text-ink-dark px-5 py-1.5 border-2 border-white text-sm font-bold rotate-[-2deg]'>
                  Más solicitado
                </div>
              )}

              <div className='mb-6'>
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-gray-900'}`}
                >
                  {plan.name}
                </h3>
                <p className='text-sm font-bold text-accent uppercase tracking-wide mb-3'>
                  Ideal para: {plan.idealFor}
                </p>
                <p
                  className={`text-base mb-4 ${plan.recommended ? 'text-white/80' : 'text-gray-700'}`}
                >
                  {plan.description}
                </p>
                <span
                  className={`text-sm font-medium ${plan.recommended ? 'text-white/50' : 'text-gray-500'}`}
                >
                  Entrega: {plan.deliveryTime}
                </span>
              </div>

              <ul className='space-y-3 mb-8 flex-grow'>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span
                      className={`text-base ${plan.recommended ? 'text-white/90' : 'text-gray-800'}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='mt-auto'>
                <Button
                  href={plan.path}
                  onClick={() => trackPricingCtaClick(plan.name, plan.cta)}
                  variant='primary'
                  fullWidth
                  className={
                    plan.recommended
                      ? '!bg-accent !text-ink-dark'
                      : '!bg-ink-dark !text-white hover:!bg-accent hover:!text-ink-dark'
                  }
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch'>
          <div className='bg-white border-2 border-ink-dark rounded-xl p-8 text-center shadow-[6px_6px_0_0_#1a1a1a] flex flex-col'>
            <Wallet className='w-6 h-6 text-accent mx-auto mb-4' />
            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              Opciones de pago flexible
            </h3>
            <p className='text-lg text-gray-700 font-medium max-w-2xl mx-auto'>
              Según el tipo de proyecto, podemos trabajar con pago único, pago
              fraccionado o plan mensual. Todo queda definido en la propuesta
              antes de empezar, para que tengas claro el alcance, los plazos y
              las condiciones.
            </p>
          </div>

          <div className='bg-ink-dark border-2 border-ink-dark rounded-xl p-8 text-center shadow-[6px_6px_0_0_rgba(20,184,166,0.5)] flex flex-col'>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              ¿No sabes qué necesitas exactamente?
            </h3>
            <p className='text-lg text-white/80 font-medium mb-6'>
              También preparamos propuestas para landing pages, páginas de
              presentación o webs más sencillas. Cuéntanos qué necesitas y
              te preparamos una propuesta ajustada a tu proyecto.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center mt-auto'>
              <Button
                onClick={() => {
                  trackPricingCtaClick(
                    'Presupuesto ajustado',
                    'Solicitar propuesta',
                  );
                  openModal();
                }}
                variant='primary'
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

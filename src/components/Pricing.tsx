import { Check, ArrowRight } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useSectionView } from '../hooks/useSectionView';
import {
  trackPricingCtaClick,
  trackViewPricing,
  trackPricingSinglePayment,
  trackPricingSplitPayment,
  trackPricingMonthlyPlan,
} from '../utils/analytics';
import Button from './Button';

type PaymentType = 'single' | 'split' | 'monthly';

const Pricing = () => {
  const { openModal } = useContactModal();
  const sectionRef = useSectionView<HTMLElement>(trackViewPricing);

  const handlePaymentOptionClick = (planName: string, type: PaymentType) => {
    if (type === 'single') trackPricingSinglePayment(planName);
    if (type === 'split') trackPricingSplitPayment(planName);
    if (type === 'monthly') trackPricingMonthlyPlan(planName);
    openModal(planName);
  };

  const pricingPlans = [
    {
      id: 'webpage',
      name: 'Página Web',
      idealFor: 'Autónomos, marcas personales y pequeños negocios',
      description:
        'Presencia digital profesional para tu negocio o proyecto personal',
      price: '969',
      pricePrefix: 'Desde ',
      monthlyPrice: '129',
      path: '/paginas-web-empresas',
      deliveryTime: '2-3 semanas',
      cta: 'Quiero mi web',
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
      name: 'Tienda Online',
      idealFor: 'Negocios que quieren vender online y emprendedores',
      description:
        'Solución e-commerce completa para vender tus productos online',
      price: '1.799',
      pricePrefix: 'Desde ',
      monthlyPrice: '249',
      path: '/tiendas-online',
      deliveryTime: '4-6 semanas',
      cta: 'Quiero mi tienda online',
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
      id: 'mobileapp',
      name: 'App Móvil',
      idealFor: 'Startups y empresas que necesitan una app a medida',
      description: 'Aplicación móvil nativa o híbrida para iOS y Android',
      price: '3.599',
      pricePrefix: 'Desde ',
      path: '/desarrollo-aplicaciones-web',
      deliveryTime: '8-12 semanas',
      cta: 'Quiero mi app',
      features: [
        'Desarrollo iOS y Android',
        'Diseño UI/UX personalizado',
        'Base de datos en la nube',
        'Sistema de notificaciones push',
        'Panel de administración web',
        'Autenticación de usuarios',
        'Integración con APIs',
        'Publicación en App Store y Google Play',
        'Mantenimiento 3 meses incluido',
        'Soporte técnico continuo',
        'Hasta 3 revisiones incluidas',
      ],
      recommended: false,
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento Web',
      idealFor: 'Webs ya publicadas que necesitan soporte continuo',
      description:
        'Mantén tu web segura, actualizada y funcionando perfectamente',
      price: '60',
      priceSuffix: '/mes',
      path: '/mantenimiento-web',
      deliveryTime: 'Servicio mensual',
      cta: 'Contratar mantenimiento',
      features: [
        '2 horas de modificaciones incluidas',
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
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Servicios de Desarrollo Web
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Precios transparentes y adaptados al mercado español. Cada proyecto
            es personalizable según tus necesidades.
          </p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col relative ${
                plan.recommended ? 'ring-2 ring-accent' : ''
              }`}
            >
              {plan.recommended && (
                <div className='absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-accent to-accent-hover text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg'>
                  DESTACADO
                </div>
              )}

              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                  {plan.name}
                </h3>
                <p className='text-xs font-semibold text-accent uppercase tracking-wide mb-3'>
                  Ideal para: {plan.idealFor}
                </p>
                <p className='text-gray-600 mb-6'>{plan.description}</p>
                <div className='flex flex-col items-start gap-1'>
                  <div className='flex items-baseline gap-2 flex-wrap'>
                    {plan.pricePrefix && (
                      <span className='text-xl text-gray-600'>
                        {plan.pricePrefix}
                      </span>
                    )}
                    <span className='text-5xl font-bold text-accent'>
                      {plan.price}
                    </span>
                    <span className='text-xl text-gray-600'>€</span>
                    {plan.priceSuffix && (
                      <span className='text-xl text-gray-600'>
                        {plan.priceSuffix}
                      </span>
                    )}
                  </div>
                  <span className='text-xs text-gray-400'>IVA incluido</span>
                  {plan.monthlyPrice && (
                    <span className='text-xs text-gray-500 mt-1'>
                      Para proyectos estándar en pago único.
                    </span>
                  )}
                  <span className='text-sm text-gray-500 mt-2'>
                    Entrega: {plan.deliveryTime}
                  </span>
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

              {plan.monthlyPrice ? (
                <div className='mt-auto'>
                  <p className='text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'>
                    Formas de pago
                  </p>
                  <div className='space-y-2'>
                    <button
                      onClick={() =>
                        handlePaymentOptionClick(plan.name, 'single')
                      }
                      className='w-full text-left rounded-lg border border-gray-200 px-4 py-2.5 hover:border-accent hover:bg-accent/5 transition-colors'
                    >
                      <span className='block text-sm font-semibold text-gray-900'>
                        Pago único
                      </span>
                      <span className='block text-xs text-gray-500'>
                        Desde {plan.price}€ IVA incluido
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handlePaymentOptionClick(plan.name, 'split')
                      }
                      className='w-full text-left rounded-lg border border-gray-200 px-4 py-2.5 hover:border-accent hover:bg-accent/5 transition-colors'
                    >
                      <span className='block text-sm font-semibold text-gray-900'>
                        Pago dividido
                      </span>
                      <span className='block text-xs text-gray-500'>
                        50% al empezar y 50% al publicar
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handlePaymentOptionClick(plan.name, 'monthly')
                      }
                      className='w-full text-left rounded-lg border-2 border-accent bg-accent/5 px-4 py-2.5 hover:bg-accent/10 transition-colors'
                    >
                      <span className='block text-sm font-semibold text-gray-900'>
                        Plan mensual
                      </span>
                      <span className='block text-xs text-gray-500'>
                        Desde {plan.monthlyPrice}€/mes durante 12 meses
                      </span>
                    </button>
                  </div>
                  <p className='text-[11px] text-gray-400 leading-snug mt-3'>
                    El plan mensual incluye soporte y mantenimiento básico
                    durante los 12 meses. Condiciones finales según alcance del
                    proyecto.
                  </p>
                </div>
              ) : (
                <div className='mt-auto'>
                  <Button
                    href={plan.path}
                    onClick={() => trackPricingCtaClick(plan.name)}
                    variant='primary'
                    fullWidth
                  >
                    {plan.cta}
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className='text-center text-xs text-gray-500 max-w-2xl mx-auto mt-6'>
          Todos los precios incluyen IVA salvo que se indique lo contrario. El
          plan mensual incluye soporte y mantenimiento básico durante el periodo
          contratado; condiciones finales según el alcance del proyecto.
        </p>

        <div className='text-center mt-24'>
          <div className='bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300'>
            <h3 className='text-2xl md:text-3xl font-bold text-black mb-4'>
              ¿Presupuesto más ajustado?
            </h3>
            <p className='text-xl text-black mb-2 font-semibold'>
              Tengo soluciones desde{' '}
              <span className='text-[120%] font-bold text-accent'>359€</span>
            </p>
            <p className='text-gray-700 mb-6'>
              Landing pages sencillas, páginas de presentación o webs básicas
              ideales para empezar. Cuéntame qué necesitas y buscaré la mejor
              opción que se ajuste a tu presupuesto.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                onClick={() => {
                  trackPricingCtaClick('Presupuesto ajustado');
                  openModal();
                }}
                variant='ghost'
                className='!bg-black !text-white hover:!bg-accent hover:!text-white !shadow-lg'
              >
                Recibir propuesta en 2h
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

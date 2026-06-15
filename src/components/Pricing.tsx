import { useState } from 'react';
import {
  Check,
  ArrowRight,
  Globe,
  ShoppingCart,
  Smartphone,
  ChevronDown,
  Settings,
} from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import Button from './Button';

const Pricing = () => {
  const { openModal } = useContactModal();
  const [openAccordion, setOpenAccordion] = useState<{
    [key: string]: number | null;
  }>({});

  const toggleAccordion = (planId: string, index: number) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [planId]: prev[planId] === index ? null : index,
    }));
  };

  const getAdditionalInfo = (planId: string) => {
    let numRevisiones = 2;
    if (planId === 'webpage') numRevisiones = 2;
    else if (planId === 'ecommerce') numRevisiones = 2;
    else if (planId === 'mobileapp') numRevisiones = 3;
    else if (planId === 'maintenance') numRevisiones = 0;

    const infoItems = [];

    if (numRevisiones > 0) {
      infoItems.push({
        icon: '',
        title: `Hasta ${numRevisiones} ${
          numRevisiones === 1 ? 'revisión incluida' : 'revisiones incluidas'
        }`,
        description: `Entiendo que durante el desarrollo pueden surgir ajustes o cambios de perspectiva. Por eso, incluyo hasta ${numRevisiones} ${
          numRevisiones === 1
            ? 'ronda de revisión completa'
            : 'rondas de revisiones completas'
        } sin coste adicional. Esto te permite refinar el diseño, modificar contenidos o ajustar funcionalidades para lograr el resultado perfecto. Las revisiones adicionales se cotizarán por separado según la complejidad.`,
      });
    }

    return infoItems;
  };

  const pricingPlans = [
    {
      id: 'webpage',
      icon: <Globe className='w-8 h-8' />,
      name: 'Página Web',
      description:
        'Presencia digital profesional para tu negocio o proyecto personal',
      price: '969',
      originalPrice: null,
      popular: false,
      color: 'from-ink-dark to-ink-gray',
      path: '/paginas-web-empresas',
      features: [
        'Diseño responsive adaptado a móviles',
        'Hasta 6 páginas o secciones',
        'Formulario de contacto funcional',
        'Optimización SEO básica',
        'Integración Google Analytics',
        'Certificado SSL (https seguro)',
        'Hosting primer año incluido',
        'Formación uso y gestión',
      ],
      deliveryTime: '2-3 semanas',
      bestFor: 'Autónomos, pequeños negocios, profesionales, portfolios',
    },
    {
      id: 'ecommerce',
      icon: <ShoppingCart className='w-8 h-8' />,
      name: 'Tienda Online',
      description:
        'Solución e-commerce completa para vender tus productos online',
      price: '1799',
      originalPrice: null,
      popular: false,
      color: 'from-ink-dark to-ink-gray',
      path: '/tiendas-online',
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
      ],
      deliveryTime: '4-6 semanas',
      bestFor: 'Negocios que quieren vender online, emprendedores, retailers',
    },
    {
      id: 'mobileapp',
      icon: <Smartphone className='w-8 h-8' />,
      name: 'App Móvil',
      description: 'Aplicación móvil nativa o híbrida para iOS y Android',
      price: '3599',
      originalPrice: null,
      popular: false,
      color: 'from-ink-dark to-ink-gray',
      path: '/desarrollo-aplicaciones-web',
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
      ],
      deliveryTime: '8-12 semanas',
      bestFor: 'Startups, empresas innovadoras, proyectos con alta inversión',
    },
    {
      id: 'maintenance',
      icon: <Settings className='w-8 h-8' />,
      name: 'Mantenimiento Web',
      description:
        'Mantén tu web segura, actualizada y funcionando perfectamente',
      price: '69',
      priceType: '/mes',
      originalPrice: null,
      popular: false,
      color: 'from-ink-dark to-ink-gray',
      path: '/mantenimiento-web',
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
      deliveryTime: 'Servicio mensual',
      bestFor: 'Negocios que ya tienen web y necesitan tranquilidad',
    },
  ];

  return (
    <section
      id='pricing'
      className='py-20 bg-gradient-to-br from-gray-50 to-ink-light/20'
    >
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Servicios de Desarrollo Web
            <span className='block text-2xl text-ink-gray font-normal mt-2'>
              Elige el tipo de proyecto que necesitas
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Precios transparentes y adaptados al mercado español. Cada proyecto
            es personalizable según tus necesidades.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1600px] mx-auto'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className='relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col'
            >
              {plan.id !== 'maintenance' && (
                <div className='absolute top-8 -left-10 bg-accent text-white px-12 py-1 transform -rotate-45 text-xs font-bold shadow-md z-10'>
                  Pago flexible
                </div>
              )}

              <div className='p-8 flex flex-col flex-1'>
                <div className='text-center mb-8'>
                  <div className='w-16 h-16 bg-white border-2 border-black rounded-xl flex items-center justify-center text-black mb-4 mx-auto transition-transform duration-200'>
                    {plan.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {plan.description}
                  </p>
                </div>

                <div className='text-center mb-8'>
                  <div className='flex flex-col items-center mb-2'>
                    <span className='text-lg text-gray-600 font-medium mb-1'>
                      Desde
                    </span>
                    <div className='flex items-center gap-2'>
                      <span className='text-4xl font-bold text-gray-900'>
                        €{parseInt(plan.price).toLocaleString('es-ES')}
                      </span>
                      {plan.priceType && (
                        <span className='text-xl text-gray-600 font-medium'>
                          {plan.priceType}
                        </span>
                      )}
                    </div>
                    <span className='text-xs text-gray-400 mt-1'>IVA incluido</span>
                  </div>
                  <p className='text-sm text-gray-500 mb-4'>
                    {plan.priceType
                      ? 'Suscripción mensual'
                      : 'Precio orientativo del proyecto'}
                  </p>

                  <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                    <p className='text-sm font-semibold text-gray-700'>
                      Tiempo de entrega: {plan.deliveryTime}
                    </p>
                  </div>

                  <div className='bg-gray-50 rounded-lg p-3'>
                    <p className='text-xs text-gray-800'>
                      <strong>Ideal para:</strong> {plan.bestFor}
                    </p>
                  </div>
                </div>

                <div className='mb-8'>
                  <h4 className='font-semibold text-gray-900 mb-4 text-center'>
                    Todo incluido:
                  </h4>
                  <ul className='space-y-3'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-start gap-3'>
                        <Check className='w-5 h-5 text-green-500 mt-0.5 flex-shrink-0' />
                        <span className='text-gray-600 text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='mt-auto'>
                  {getAdditionalInfo(plan.id).length > 0 && (
                    <div className='mb-6'>
                      <div className='space-y-2'>
                        {getAdditionalInfo(plan.id).map((item, index) => (
                          <div
                            key={index}
                            className='border border-gray-200 rounded-lg overflow-hidden'
                          >
                            <button
                              onClick={() => toggleAccordion(plan.id, index)}
                              className='w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200'
                            >
                              <span className='text-xs font-medium text-gray-700 text-left'>
                                {item.title}
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                                  openAccordion[plan.id] === index
                                    ? 'rotate-180'
                                    : ''
                                }`}
                              />
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                openAccordion[plan.id] === index
                                  ? 'max-h-96'
                                  : 'max-h-0'
                              }`}
                            >
                              <div className='px-4 py-3 bg-white'>
                                <p className='text-xs text-gray-600 leading-relaxed'>
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button href={plan.path} variant='primary' fullWidth>
                    Más información
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
                onClick={() => openModal()}
                variant='ghost'
                className='!bg-black !text-white hover:!bg-accent hover:!text-white !shadow-lg'
              >
                Consultar Opciones
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

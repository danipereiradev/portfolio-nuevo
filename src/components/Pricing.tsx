import { useState } from 'react';
import {
  Check,
  Star,
  ArrowRight,
  Globe,
  ShoppingCart,
  Smartphone,
  ChevronDown,
  Zap,
} from 'lucide-react';

const Pricing = () => {
  const [openAccordion, setOpenAccordion] = useState<{
    [key: string]: number | null;
  }>({});

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleAccordion = (planId: string, index: number) => {
    setOpenAccordion((prev) => ({
      ...prev,
      [planId]: prev[planId] === index ? null : index,
    }));
  };

  const getAdditionalInfo = (planId: string) => {
    let numRevisiones = 2; // Por defecto
    if (planId === 'lowcost') numRevisiones = 0;
    else if (planId === 'corporate') numRevisiones = 1;

    const infoItems = [
      {
        icon: '💳',
        title: 'Pago flexible: 50% al inicio, 50% a la entrega',
        description:
          'Para facilitar tu inversión, dividimos el pago en dos partes: un 50% al comenzar el proyecto (que nos permite reservar tu espacio en la agenda y empezar a trabajar) y el 50% restante a la entrega final del proyecto completado y aprobado. Así gestionas mejor tu presupuesto sin comprometer la calidad.',
      },
      {
        icon: '✅',
        title: 'Garantía de satisfacción del 100%',
        description:
          'Tu satisfacción es mi prioridad. Me comprometo a entregar un proyecto que cumpla con tus expectativas y requisitos. Si algo no te convence durante el desarrollo, lo ajustamos hasta que estés completamente satisfecho. Además, incluyo un período de garantía post-entrega para corregir cualquier error técnico sin coste adicional.',
      },
    ];

    // Solo añadir revisiones si numRevisiones > 0
    if (numRevisiones > 0) {
      infoItems.push({
        icon: '🔄',
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
      id: 'lowcost',
      icon: <Zap className='w-8 h-8' />,
      name: 'Landing Page Express',
      description:
        'Solución rápida y económica ideal para emprendedores y lanzamientos',
      price: '350',
      originalPrice: '500',
      popular: false,
      color: 'from-orange-500 to-yellow-500',
      features: [
        '1-2 secciones personalizadas',
        'Diseño responsivo',
        'Formulario de contacto básico',
        'Certificado SSL incluido',
        'Entrega ultra-rápida',
      ],
      deliveryTime: '1 semana',
      bestFor:
        'Emprendedores, eventos, lanzamientos rápidos, presupuesto limitado',
    },
    {
      id: 'corporate',
      icon: <Globe className='w-8 h-8' />,
      name: 'Página Web Autónomos y Pymes',
      description:
        'Perfecta para empresas que buscan establecer su presencia digital profesional',
      price: '750',
      originalPrice: '950',
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Diseño responsivo profesional',
        'Hasta 5 secciones incluidas',
        'Formulario de contacto avanzado',
        'Optimización SEO ON PAGE',
        'Integración con Google Analytics',
        'Certificado SSL incluido',
        'Entrega en formato responsive',
      ],
      deliveryTime: '2 semanas',
      bestFor:
        'Empresas establecidas, profesionales independientes, consultorías',
    },
    {
      id: 'ecommerce',
      icon: <ShoppingCart className='w-8 h-8' />,
      name: 'Tienda Online',
      description:
        'Solución completa para vender productos online con todas las funcionalidades necesarias',
      price: '1250',
      originalPrice: '1650',
      popular: true,
      color: 'from-green-500 to-emerald-500',
      features: [
        'Hasta 50 productos incluidos',
        'Sistema de pagos seguro (Stripe/PayPal)',
        'Gestión completa de inventario',
        'Panel de administración intuitivo',
        'Carrito de compra avanzado',
        'Configuración de envíos',
        'Sistema de cupones y descuentos',
        'Integración con redes sociales',
        'Optimización SEO ON PAGE',
        'Estadísticas básicas de ventas',
      ],
      deliveryTime: '2-4 semanas',
      bestFor: 'Tiendas físicas expandiéndose online, emprendedores, retailers',
    },
    {
      id: 'webapp',
      icon: <Smartphone className='w-8 h-8' />,
      name: 'Aplicación Web o Móvil',
      description:
        'Desarrollo a medida para proyectos únicos con funcionalidades específicas',
      price: '3200',
      originalPrice: '3800',
      popular: false,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Desarrollo 100% personalizado',
        'Base de datos avanzada',
        'Panel de administración completo',
        'Autenticación de usuarios',
        'API REST personalizada',
        'Integración con servicios externos',
        'Optimización SEO ON PAGE',
        'Funcionalidades específicas',
        'Backup automático de datos',
      ],
      deliveryTime: '8-16 semanas',
      bestFor:
        'Startups, proyectos innovadores, empresas con necesidades específicas',
    },
  ];

  return (
    <section
      id='pricing'
      className='py-20 bg-gradient-to-br from-gray-50 to-blue-50'
    >
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Planes y Precios
            <span className='block text-2xl text-blue-600 font-normal mt-2'>
              Precios competitivos y transparentes
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Desde €350 puedes tener tu presencia digital profesional. Sin costes
            ocultos, con garantía de satisfacción y entrega puntual.
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden ${
                plan.popular ? 'ring-4 ring-green-200' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className='absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-bl-2xl font-semibold text-sm flex items-center gap-1'>
                  <Star className='w-4 h-4 fill-current' />
                  Más Popular
                </div>
              )}

              <div className='p-8'>
                {/* Header */}
                <div className='text-center mb-8'>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-200`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                    {plan.name}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className='text-center mb-8'>
                  <div className='flex items-center justify-center gap-2 mb-2'>
                    <span className='text-4xl font-bold text-gray-900'>
                      {parseInt(plan.price) > 999
                        ? `€${plan.price.slice(0, 1)},${plan.price.slice(1)}`
                        : `€${plan.price}`}
                    </span>
                    <div className='flex flex-col'>
                      <span className='text-sm text-gray-500 line-through'>
                        €{plan.originalPrice}
                      </span>
                      <span className='text-xs text-green-600 font-semibold'>
                        Ahorras €
                        {parseInt(plan.originalPrice) - parseInt(plan.price)}
                      </span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500 mb-4'>
                    Precio final del proyecto completo
                  </p>

                  <div className='bg-gray-50 rounded-lg p-3 mb-4'>
                    <p className='text-sm font-semibold text-gray-700'>
                      ⏱️ Tiempo de entrega: {plan.deliveryTime}
                    </p>
                  </div>

                  <div className='bg-blue-50 rounded-lg p-3'>
                    <p className='text-xs text-blue-800'>
                      <strong>Ideal para:</strong> {plan.bestFor}
                    </p>
                  </div>
                </div>

                {/* Features */}
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

                {/* CTA Button */}
                <button
                  onClick={scrollToContact}
                  className={`w-full bg-gradient-to-r ${plan.color} text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 group`}
                >
                  Solicitar Presupuesto
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' />
                </button>

                {/* Accordion - Additional Info */}
                <div className='mt-6'>
                  <h5 className='text-sm font-semibold text-gray-700 mb-3 text-center'>
                    Condiciones incluidas:
                  </h5>
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
                          <div className='flex items-center gap-2'>
                            <span className='text-lg'>{item.icon}</span>
                            <span className='text-xs font-medium text-gray-700 text-left'>
                              {item.title}
                            </span>
                          </div>
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
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='text-center mt-24'>
          <div className='bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border-2 border-orange-200'>
            <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
              ¿Tienes un presupuesto por debajo de €350?
            </h3>
            <p className='text-xl text-gray-700 mb-2 font-semibold'>
              ¡No te vayas! Hablemos 💬
            </p>
            <p className='text-gray-600 mb-6'>
              Siempre hay opciones. Cuéntame tu proyecto y encontraremos una
              solución que se ajuste a tus posibilidades. Sin compromiso.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={scrollToContact}
                className='bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200'
              >
                Cuéntame tu Proyecto
              </button>
              <a
                href='https://wa.me/34644669828'
                target='_blank'
                rel='noopener noreferrer'
                className='border-2 border-green-500 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2'
              >
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                </svg>
                WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

import {
  Check,
  Star,
  ArrowRight,
  Globe,
  ShoppingCart,
  Smartphone,
} from 'lucide-react';

const Pricing = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const pricingPlans = [
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
        'Hasta 5 páginas incluidas',
        'Formulario de contacto avanzado',
        'Optimización SEO básica',
        'Integración con Google Analytics',
        'Certificado SSL incluido',
        '1 mes de soporte técnico',
        'Entrega en formato responsive',
      ],
      deliveryTime: '1-2 semanas',
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
        'Estadísticas básicas de ventas',
        '2 meses de soporte técnico',
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
        'Funcionalidades específicas',
        'Backup automático de datos',
        'Hosting incluido 6 meses',
        '3 meses de soporte técnico',
      ],
      deliveryTime: '4-8 semanas',
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
            Desde €750 puedes tener tu presencia digital profesional. Sin costes
            ocultos, con garantía de satisfacción y entrega puntual.
          </p>
        </div>

        <div className='grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden ${
                plan.popular ? 'ring-4 ring-green-200 scale-105' : ''
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
                        : plan.price}
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

                {/* Additional Info */}
                <div className='mt-6 text-center'>
                  <p className='text-xs text-gray-500'>
                    💳 Pago flexible: 50% al inicio, 50% a la entrega
                    <br />
                    ✅ Garantía de satisfacción del 100%
                    <br />
                    🔄 Hasta 2 revisiones incluidas
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='text-center mt-24'>
          <div className='bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto'>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              ¿Tienes un presupuesto más ajustado?
            </h3>
            <p className='text-gray-600 mb-6'>
              También ofrecemos soluciones básicas desde €350 para landing pages
              y sitios web sencillos. Cuéntame tu proyecto y encontraremos la
              mejor opción para tu presupuesto.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={scrollToContact}
                className='bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200'
              >
                Consultar Opciones Económicas
              </button>
              <a
                href='https://wa.me/34644669828'
                target='_blank'
                rel='noopener noreferrer'
                className='border-2 border-green-500 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-200'
              >
                Consulta por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

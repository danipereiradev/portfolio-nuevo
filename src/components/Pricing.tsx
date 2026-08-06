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
      idealFor:
        'autónomos, pymes y negocios locales que quieren una web profesional con precio y proceso claros',
      description:
        'Una web completa, adaptada a tu negocio y lista para recibir clientes, sin presupuestos ambiguos ni procesos interminables.',
      path: '/web-profesional-360',
      deliveryTime: 'Lista en 2–3 semanas',
      price: '1.090 € + IVA',
      priceNote: 'Pago único o fraccionado',
      cta: 'Ver qué incluye',
      features: [
        'Diseño adaptado a la imagen de tu negocio',
        'Preparada para móvil, tablet y ordenador',
        'Entre 4 y 6 páginas o secciones principales',
        'Adaptación de tus textos, imágenes, colores y logo',
        'Formulario de contacto y botón de WhatsApp',
        'Preparada para aparecer en Google y búsquedas locales',
        'Publicación de la web con tu propio dominio',
        'Dos rondas de cambios incluidas',
        'Mantenimiento opcional por 60 €/mes + IVA',
      ],
      recommended: true,
    },
    {
      id: 'webpage',
      name: 'Web a Medida',
      idealFor: 'negocios que necesitan algo más que una web informativa.',
      description:
        'Diseñamos una solución adaptada a tu forma de trabajar cuando necesitas funciones especiales, conexión con otras herramientas o una zona privada para clientes o equipo.',
      path: '/web-a-medida',
      deliveryTime: 'Plazo y precio según las necesidades del proyecto',
      cta: 'Saber más',
      features: [
        'Diseño completamente adaptado a tu negocio',
        'Funciones especiales desarrolladas para tu proyecto',
        'Reservas, calculadoras, formularios avanzados o procesos personalizados',
        'Conexión con programas y herramientas que ya utilizas',
        'Zonas privadas para clientes, empleados o colaboradores',
        'Paneles para consultar o gestionar información',
        'Web segura, rápida y preparada para crecer',
        'Acompañamiento durante todo el proyecto',
        'Revisiones acordadas antes de empezar',
      ],
      recommended: false,
    },
    {
      id: 'ecommerce',
      name: 'Tienda online',
      idealFor:
        'negocios y emprendedores que quieren vender productos por internet.',
      description:
        'Creamos una tienda preparada para mostrar tus productos, cobrar online, recibir pedidos y gestionar las ventas de forma sencilla.',
      path: '/tiendas-online',
      deliveryTime: 'Lista en 4–6 semanas',
      cta: 'Ver qué incluye',
      features: [
        'Hasta 50 productos añadidos a la tienda',
        'Pagos seguros con tarjeta',
        'Panel sencillo para gestionar productos y pedidos',
        'Control de existencias para saber qué productos quedan disponibles',
        'Configuración de gastos y zonas de envío',
        'Carrito de compra y cupones de descuento',
        'Diseño adaptado a móvil, tablet y ordenador',
        'Preparada para aparecer en Google',
        'Enlaces y conexión con tus redes sociales',
        'Formación para aprender a gestionar la tienda',
        'Dos rondas de cambios incluidas',
      ],
      recommended: false,
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento web',
      idealFor:
        'negocios que ya tienen una web y quieren mantenerla actualizada, segura y funcionando correctamente.',
      description:
        'Nos ocupamos del cuidado técnico de tu web y de pequeños cambios mensuales para que no tengas que preocuparte por errores, actualizaciones o problemas de seguridad.',
      path: '/mantenimiento-web',
      deliveryLabel: 'Servicio',
      deliveryTime: 'Atención y mantenimiento mensual',
      cta: 'Ver planes de mantenimiento',
      features: [
        'Pequeños cambios en textos, imágenes y contenidos',
        'Actualizaciones para mantener la web segura',
        'Copias de seguridad periódicas',
        'Revisión de que la web siga online y funcionando',
        'Comprobación del formulario de contacto',
        'Mejoras básicas para que cargue correctamente',
        'Protección frente a amenazas y archivos maliciosos',
        'Soporte técnico cuando tengas un problema',
        'Ayuda con el dominio y el alojamiento de la web',
        'Resumen mensual de las tareas realizadas',
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
            Siempre trabajamos con precio cerrado y sin letras pequeñas
          </h2>
          <p className='text-lg md:text-xl text-gray-700 font-medium mb-3'>
            Cada web es diferente. Antes de darte un precio, hablamos contigo
            para entender qué necesitas, qué debe incluir y qué quieres
            conseguir con ella.
          </p>
          <p className='text-base text-gray-500'>
            Antes de empezar tendrás por escrito el precio final, los plazos, la
            forma de trabajo, lo que está incluido y las opciones de pago. Sin
            sorpresas a mitad del proyecto.
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
                {'price' in plan && plan.price ? (
                  <div className='space-y-1'>
                    <p
                      className={`text-3xl md:text-4xl font-extrabold tracking-tight ${
                        plan.recommended ? 'text-accent' : 'text-gray-900'
                      }`}
                    >
                      {plan.price}
                    </p>
                    {'priceNote' in plan && plan.priceNote ? (
                      <p
                        className={`text-sm font-semibold ${
                          plan.recommended ? 'text-white/80' : 'text-gray-700'
                        }`}
                      >
                        {plan.priceNote}
                      </p>
                    ) : null}
                    <p
                      className={`text-sm font-medium ${
                        plan.recommended ? 'text-white/50' : 'text-gray-500'
                      }`}
                    >
                      {plan.deliveryTime}
                    </p>
                  </div>
                ) : (
                  <span
                    className={`text-sm font-medium ${plan.recommended ? 'text-white/50' : 'text-gray-500'}`}
                  >
                    {'deliveryLabel' in plan && plan.deliveryLabel
                      ? plan.deliveryLabel
                      : 'Entrega'}
                    : {plan.deliveryTime}
                  </span>
                )}
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
            <p className='text-lg text-gray-700 font-medium max-w-2xl mx-auto mb-4'>
              Puedes pagar el proyecto de una vez o dividirlo en varios pagos,
              según el tipo de web. Antes de empezar dejaremos por escrito
              cuánto vas a pagar, cuándo se realiza cada pago y qué incluye el
              proyecto.
            </p>
            <a
              href='/condiciones-del-proyecto'
              className='text-sm font-semibold text-accent hover:underline'
            >
              Ver condiciones del proyecto
            </a>
          </div>

          <div className='bg-ink-dark border-2 border-ink-dark rounded-xl p-8 text-center shadow-[6px_6px_0_0_rgba(20,184,166,0.5)] flex flex-col'>
            <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
              ¿No sabes qué necesitas exactamente?
            </h3>
            <p className='text-lg text-white/80 font-medium mb-6'>
              No pasa nada. Cuéntanos qué tienes en mente y te diremos qué
              opción encaja mejor. También hacemos landing pages, webs sencillas
              de presentación y proyectos con un alcance más reducido.
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
                Cuéntanos tu idea
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

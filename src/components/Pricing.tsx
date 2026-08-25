import { Check, Wallet } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';
import { useSectionView } from '../hooks/useSectionView';
import { trackPricingCtaClick, trackViewPricing } from '../utils/analytics';
import { SITE_MAINTENANCE_PATH, SITE_WEB_PATH, SITE_WEB_LABEL } from '../config/contact';
import Button from './Button';

const Pricing = () => {
  const { openModal } = useContactModal();
  const sectionRef = useSectionView<HTMLElement>(trackViewPricing);

  const plans = [
    {
      id: 'webpage',
      name: SITE_WEB_LABEL,
      formPlanName: SITE_WEB_LABEL,
      idealFor: 'si tu negocio necesita más que una página de visita.',
      description:
        'Reservas, calculadoras, zona de clientes, conexión con lo que ya usas… lo montamos a tu medida.',
      path: SITE_WEB_PATH,
      deliveryTime: 'El plazo lo marcamos según el alcance',
      cta: 'Solicitar presupuesto',
      features: [
        'Diseño propio, no plantilla genérica',
        'Funciones hechas para tu caso',
        'Reservas, formularios avanzados o procesos propios',
        'Conexión con herramientas que ya usas',
        'Zonas privadas si las necesitas',
        'Paneles para consultar o gestionar datos',
        'Móvil, HTTPS y base lista para crecer',
        'Hablas con quien construye la web',
        'Rondas de cambios acordadas al inicio',
      ],
      recommended: true,
    },
    {
      id: 'ecommerce',
      name: 'Tienda online',
      formPlanName: 'Tienda Online',
      idealFor: 'si vendes productos y quieres cobrar por internet.',
      description:
        'Catálogo, carrito, tarjeta, envíos y un panel para que tú gestiones pedidos.',
      path: '/tiendas-online',
      deliveryTime: 'Suele ser 4–6 semanas, según el catálogo',
      cta: 'Solicitar presupuesto',
      features: [
        'Productos cargados según lo acordado',
        'Pago con tarjeta',
        'Panel para productos y pedidos',
        'Control de stock',
        'Gastos y zonas de envío',
        'Carrito y cupones',
        'Bien en móvil',
        'Lista para que Google la indexe',
        'Enlaces a tus redes',
        'Te enseñamos a gestionarla',
        'Rondas de cambios en la propuesta',
      ],
      recommended: false,
    },
    {
      id: 'maintenance',
      name: 'Mantenimiento web',
      formPlanName: 'Mantenimiento Web',
      idealFor: 'si ya tienes web y no quieres pelearte con ella cada mes.',
      description:
        'Actualizaciones, copias, cambios de textos y fotos, y alguien a quien escribir cuando falla algo.',
      path: SITE_MAINTENANCE_PATH,
      deliveryTime: 'Cuota mensual según el plan',
      cta: 'Solicitar presupuesto',
      features: [
        'Cambios pequeños de textos e imágenes',
        'Actualizaciones de seguridad',
        'Copias periódicas',
        'Comprobar que sigue online',
        'Revisar el formulario de contacto',
        'Arreglos básicos de carga',
        'Vigilancia ante amenazas',
        'Soporte cuando tengas un problema',
        'Ayuda con dominio y hosting',
        'Resumen mensual de lo hecho',
      ],
      recommended: false,
    },
  ];

  const handleQuoteCta = (planName: string, ctaText: string) => {
    trackPricingCtaClick(planName, ctaText);
    openModal(planName);
  };

  return (
    <section
      id='pricing'
      ref={sectionRef}
      className='relative py-20 bg-surface overflow-hidden'
    >
      <div className='container relative z-10 mx-auto'>
        <div className='mx-auto mb-12 max-w-5xl text-center'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-ink-dark mb-6'>
            Cuéntanos el proyecto y te pasamos números
          </h2>
          <p className='text-lg md:text-xl text-ink-gray font-medium mb-3'>
            No hay tarifa única en la web: depende de páginas, funciones y
            contenidos. Primero entendemos qué necesitas.
          </p>
          <p className='text-base text-ink-medium'>
            Luego te llega una propuesta con plazos, lo incluido y el precio. Si
            no encaja, te lo decimos.
          </p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 items-stretch gap-8 md:gap-10 pt-4'>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`h-full rounded-lg p-8 border-2 flex flex-col relative transition-all duration-200 hover:translate-x-[3px] hover:translate-y-[3px] ${
                plan.recommended
                  ? 'bg-ink-dark text-white border-accent shadow-[7px_7px_0_0_var(--color-accent-hover)] hover:shadow-[3px_3px_0_0_var(--color-accent-hover)]'
                  : 'bg-surface border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] hover:shadow-[3px_3px_0_0_#1a1a1a]'
              }`}
            >
              {plan.recommended && (
                <div className='absolute -top-4 left-8 bg-accent text-ink-dark px-5 py-1.5 border-2 border-white text-sm font-bold rotate-[-2deg]'>
                  Más solicitado
                </div>
              )}

              <div className='mb-6'>
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.recommended ? 'text-white' : 'text-ink-dark'}`}
                >
                  {plan.name}
                </h3>
                <p className='text-sm font-bold text-accent uppercase tracking-wide mb-3'>
                  Ideal si: {plan.idealFor}
                </p>
                <p
                  className={`text-base mb-4 ${plan.recommended ? 'text-white/80' : 'text-ink-gray'}`}
                >
                  {plan.description}
                </p>
                <p
                  className={`text-sm font-medium ${
                    plan.recommended ? 'text-white/50' : 'text-ink-medium'
                  }`}
                >
                  {plan.deliveryTime}
                </p>
                <p
                  className={`mt-3 text-lg font-extrabold ${
                    plan.recommended ? 'text-accent' : 'text-ink-dark'
                  }`}
                >
                  Presupuesto a medida
                </p>
              </div>

              <ul className='space-y-3 mb-8 flex-grow'>
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className='flex items-start gap-3'>
                    <Check className='w-5 h-5 text-accent flex-shrink-0 mt-0.5' />
                    <span
                      className={`text-base ${plan.recommended ? 'text-white/90' : 'text-ink-gray'}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className='mt-auto flex flex-col items-center space-y-3'>
                <Button
                  onClick={() => handleQuoteCta(plan.formPlanName, plan.cta)}
                  variant='primary'
                  fullWidth
                >
                  {plan.cta}
                </Button>
                <a
                  href={plan.path}
                  onClick={() =>
                    trackPricingCtaClick(plan.name, 'Ver más detalles')
                  }
                  className={`block text-center text-sm font-semibold hover:underline ${
                    plan.recommended ? 'text-accent' : 'text-ink-medium'
                  }`}
                >
                  Ver más detalles
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 grid md:grid-cols-2 gap-8   mx-auto items-stretch'>
          <div className='bg-surface border-2 border-ink-dark rounded-lg p-8 text-center shadow-[6px_6px_0_0_#1a1a1a] flex flex-col'>
            <Wallet className='w-6 h-6 text-accent mx-auto mb-4' />
            <h3 className='text-2xl md:text-3xl font-bold text-ink-dark mb-4'>
              Opciones de pago flexible
            </h3>
            <p className='text-lg text-ink-gray font-medium max-w-2xl mx-auto mb-4'>
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

          <div className='bg-ink-dark border-2 border-ink-dark rounded-lg p-8 text-center shadow-[6px_6px_0_0_var(--color-accent)] flex flex-col'>
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

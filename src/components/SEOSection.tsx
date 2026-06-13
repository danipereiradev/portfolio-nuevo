import { TrendingUp, Globe, Users, Zap } from 'lucide-react';

const SEOSection = () => {
  const benefits = [
    {
      icon: <Globe className='w-6 h-6' />,
      title: 'Visibilidad 24/7',
      description: 'Tu negocio disponible las 24 horas',
    },
    {
      icon: <Users className='w-6 h-6' />,
      title: 'Más Clientes',
      description: 'Atrae nuevos clientes potenciales',
    },
    {
      icon: <TrendingUp className='w-6 h-6' />,
      title: 'Crecimiento',
      description: 'Impulsa las ventas de tu empresa',
    },
    {
      icon: <Zap className='w-6 h-6' />,
      title: 'Competitividad',
      description: 'Destaca frente a tu competencia',
    },
  ];

  return (
    <section className='py-16'>
      <div className='container mx-auto px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            ¿Por Qué Deberías Tener Presencia en Internet?
          </h2>

          <div className='text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto'>
            <p>
              En 2025, tener una{' '}
              <strong className='font-semibold text-gray-900'>
                página web profesional
              </strong>{' '}
              ya no es una opción: es una herramienta clave para cualquier
              empresa, autónomo o negocio que quiera{' '}
              <strong className='font-semibold text-gray-900'>
                captar clientes online
              </strong>
              , generar confianza y vender más. Un{' '}
              <strong className='font-semibold text-gray-900'>
                diseño web profesional
              </strong>{' '}
              rápido, responsive y{' '}
              <strong className='font-semibold text-gray-900'>
                optimizado para SEO
              </strong>{' '}
              permite que tus clientes te encuentren en Google, entiendan lo que
              ofreces y contacten contigo de forma sencilla.
            </p>

            <p className='mt-4'>
              Creamos{' '}
              <strong className='font-semibold text-gray-900'>
                páginas web a medida
              </strong>{' '}
              para empresas que necesitan una presencia digital sólida, moderna
              y preparada para convertir visitas en oportunidades reales de
              negocio. Desarrollamos{' '}
              <strong className='font-semibold text-gray-900'>
                webs corporativas
              </strong>
              ,{' '}
              <strong className='font-semibold text-gray-900'>
                tiendas online
              </strong>
              , landing pages y soluciones personalizadas pensadas para mejorar
              la{' '}
              <strong className='font-semibold text-gray-900'>
                experiencia del usuario
              </strong>
              , la velocidad de carga, la estructura SEO y la conversión.
            </p>

            <p className='mt-4'>
              Cada proyecto se diseña con un objetivo claro: ayudarte a
              conseguir más visibilidad, más contactos y más clientes. Por eso
              trabajamos cada web desde una estrategia completa que combina{' '}
              <strong className='font-semibold text-gray-900'>
                diseño web
              </strong>
              ,{' '}
              <strong className='font-semibold text-gray-900'>
                posicionamiento SEO
              </strong>
              , usabilidad, rendimiento y una comunicación clara de tus
              servicios.
            </p>

            <p className='mt-4'>
              Una{' '}
              <strong className='font-semibold text-gray-900'>
                web profesional optimizada para SEO
              </strong>{' '}
              funciona como un comercial activo las 24 horas: muestra tu
              negocio, transmite confianza, responde a las necesidades de tus
              clientes y facilita que te soliciten información, presupuesto o
              compra. Si quieres hacer crecer tu negocio en España, invertir en
              una página web bien diseñada es invertir en una herramienta real
              de captación y crecimiento.
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-6 mt-12'>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className='bg-white place-items-center p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group'
              >
                <div className='bg-white border-2 border-black w-12 h-12 rounded-lg flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform duration-200'>
                  {benefit.icon}
                </div>
                <h3 className='font-bold text-gray-900 mb-2'>
                  {benefit.title}
                </h3>
                <p className='text-gray-600 text-sm'>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;

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
    <section className='py-16 bg-gradient-to-r from-blue-50 to-purple-50'>
      <div className='container mx-auto px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
            ¿Por Qué Deberías Tener Presencia en Internet?
          </h2>

          <div className='text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto'>
            <p>
              En 2025, una <strong>página web profesional</strong> es esencial
              para cualquier negocio. Un buen <strong>diseño web</strong> no
              solo mejora tu presencia online, sino que atrae más clientes a
              través de <strong>Google</strong> y genera oportunidades de
              negocio reales.
            </p>
            <p className='mt-4'>
              La transformación digital ya no es opcional. Un sitio web
              responsive y optimizado mejora la experiencia de tus visitantes y
              aumenta las conversiones. El <strong>posicionamiento SEO</strong>{' '}
              es clave para que tu empresa sea encontrada por clientes en{' '}
              <strong>Madrid</strong>,<strong> Barcelona</strong>,{' '}
              <strong>Valencia</strong> y toda España.
            </p>
            <p className='mt-4'>
              Tanto si necesitas una <strong>tienda online</strong> para vender
              24/7, una web corporativa para tu empresa, o una aplicación
              personalizada, un desarrollo profesional marca la diferencia.
              Invertir en tu presencia digital es invertir en el futuro de tu
              negocio.
            </p>
          </div>

          <div className='grid md:grid-cols-4 gap-6 mt-12'>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className='bg-white place-items-center p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group'
              >
                <div className='bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200'>
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

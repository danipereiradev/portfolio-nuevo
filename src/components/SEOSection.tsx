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
              En 2025, tener una <strong>página web profesional</strong> es
              fundamental para cualquier negocio en España. El{' '}
              <strong>diseño web</strong> y <strong>desarrollo web</strong> de
              calidad no solo mejora tu <strong>presencia online</strong>, sino
              que también aumenta la <strong>visibilidad en Google</strong> y
              genera más <strong>clientes potenciales</strong>. Una{' '}
              <strong>web corporativa</strong> optimizada con{' '}
              <strong>SEO</strong> te posiciona como líder en tu sector,
              mientras que un <strong>e-commerce</strong> bien desarrollado
              puede multiplicar tus ventas.
            </p>
            <p className='mt-4'>
              La <strong>transformación digital</strong> ya no es opcional: es
              una necesidad para competir en el mercado actual. Un{' '}
              <strong>sitio web responsive</strong> y{' '}
              <strong>optimizado para móviles</strong> mejora la experiencia del
              usuario y aumenta las conversiones. El{' '}
              <strong>posicionamiento web</strong> en buscadores como Google es
              clave para que tu <strong>empresa online</strong> sea encontrada
              por clientes en <strong>Madrid</strong>,{' '}
              <strong>Barcelona</strong>,<strong>Valencia</strong>,{' '}
              <strong>Sevilla</strong>, <strong>Bilbao</strong> y todas las{' '}
              <strong>comunidades autónomas de España</strong>.
            </p>
            <p className='mt-4'>
              Un <strong>programador web</strong> experimentado puede crear una{' '}
              <strong>tienda online</strong> que genere ventas 24/7, implementar{' '}
              <strong>marketing digital</strong> efectivo y desarrollar{' '}
              <strong>aplicaciones web</strong> personalizadas. La{' '}
              <strong>usabilidad web</strong> y el <strong>diseño UX/UI</strong>{' '}
              profesional son elementos diferenciadores que convierten
              visitantes en clientes. Invertir en{' '}
              <strong>desarrollo web profesional</strong> es invertir en el
              futuro de tu negocio en la era digital.
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

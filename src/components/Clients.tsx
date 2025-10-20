import { Star, Award, TrendingUp, Users } from 'lucide-react';

const Clients = () => {
  const clients = [
    { name: 'Banco Santander Alemania', sector: 'Servicios Financieros' },
    { name: 'Ferrovial', sector: 'Construcción y Servicios' },
    { name: 'Acciona', sector: 'Energía e Infraestructuras' },
    { name: 'Xacobeo 21/22', sector: 'Turismo y Cultura' },
  ];

  const stats = [
    {
      icon: <Users className='w-8 h-8' />,
      number: '50+',
      label: 'Clientes Satisfechos',
    },
    {
      icon: <Award className='w-8 h-8' />,
      number: '50+',
      label: 'Proyectos Completados',
    },
    {
      icon: <Star className='w-8 h-8' />,
      number: '4.8⭐',
      label: 'Valoración Media',
    },
    {
      icon: <TrendingUp className='w-8 h-8' />,
      number: '+10',
      label: 'Años de Experiencia',
    },
  ];

  // Duplicamos los clientes para el efecto infinito
  const duplicatedClients = [...clients, ...clients];

  return (
    <section
      id='clients'
      className='py-20 bg-gray-900 text-white overflow-hidden'
    >
      <div className='container mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 text-center'>
            Proyectos en los que he Participado
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto text-center'>
            He colaborado en proyectos diversos, desde startups hasta grandes
            corporaciones, aportando mi experiencia en desarrollo web y
            soluciones digitales
          </p>
        </div>

        {/* Grid estático para móvil y tablet */}
        <div className='lg:hidden mb-20'>
          <div className='grid grid-cols-2 gap-4'>
            {clients.map((client, index) => (
              <div
                key={index}
                className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 min-h-[140px] flex flex-col items-center justify-center'
              >
                <h3 className='text-lg font-bold text-white mb-2'>
                  {client.name}
                </h3>
                <p className='text-gray-400 text-xs'>{client.sector}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Horizontal Scroll - Solo para laptop/desktop */}
        <div className='hidden lg:block relative mb-20'>
          <div className='overflow-hidden'>
            <div className='flex animate-scroll-infinite'>
              {duplicatedClients.map((client, index) => (
                <div
                  key={index}
                  className='flex-shrink-0 w-80 mx-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300 hover:-translate-y-2'
                >
                  <h3 className='text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200'>
                    {client.name}
                  </h3>
                  <p className='text-gray-400 text-sm'>{client.sector}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays para efecto fade */}
          <div className='absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-gray-900 to-transparent pointer-events-none z-10'></div>
          <div className='absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10'></div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center group'>
              <div className='bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-200'>
                {stat.icon}
              </div>
              <div className='text-3xl md:text-4xl font-bold text-white mb-2'>
                {stat.number}
              </div>
              <p className='text-gray-400'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

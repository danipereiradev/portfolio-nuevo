import { Star, Award, Calendar, Users } from 'lucide-react';

const Clients = () => {
  const clients = [
    { name: 'Inditex', sector: 'Moda y Retail' },
    { name: 'Red Acoge', sector: 'ONG Social' },
    { name: 'Xacobeo 21/22', sector: 'Turismo y Cultura' },
    { name: 'Banco Santander Alemania', sector: 'Servicios Financieros' },
    { name: 'Ferrovial', sector: 'Construcción y Servicios' },
    { name: 'Acciona', sector: 'Energía e Infraestructuras' },
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
      number: '4.8',
      label: 'Valoración Media',
    },
    {
      icon: <Calendar className='w-8 h-8' />,
      number: '+12',
      label: 'Años de Experiencia',
    },
  ];

  return (
    <section id='clients' className='py-20 text-white overflow-hidden relative'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: 'url(/img/cta-background.webp)',
        }}
      >
        <div className='absolute inset-0 bg-black/75'></div>
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 text-center'>
            Proyectos en los que Hemos Participado
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto text-center'>
            Hemos colaborado en proyectos diversos, desde startups hasta
            grandes corporaciones, aportando nuestra experiencia en
            desarrollo web y soluciones digitales a través de varias
            consultoras tecnológicas tanto nacionales como internacionales
          </p>
        </div>

        <div className='mb-20'>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto'>
            {clients.map((client, index) => (
              <div
                key={index}
                className='border border-white/15 rounded-lg p-4 lg:p-6 text-center min-h-[120px] lg:min-h-[140px] flex flex-col items-center justify-center'
              >
                <h3 className='text-base lg:text-lg font-bold text-white mb-2'>
                  {client.name}
                </h3>
                <p className='text-gray-400 text-xs'>{client.sector}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='text-accent mx-auto mb-3 flex justify-center'>
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

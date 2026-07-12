import { Star, Award, Calendar, Users } from 'lucide-react';
import GlowBackdrop from './decor/GlowBackdrop';

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
      <GlowBackdrop />

      <span
        aria-hidden='true'
        className='pointer-events-none select-none absolute -top-6 right-0 text-[9rem] md:text-[13rem] font-extrabold text-white/5 leading-none z-0'
      >
        04
      </span>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <span className='inline-block bg-white/10 text-accent text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-accent/60 rotate-[-1deg] mb-5'>
            Trayectoria
          </span>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-center'>
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
                className='bg-ink-dark border-2 border-white/20 hover:border-accent rounded-lg p-4 lg:p-6 text-center min-h-[120px] lg:min-h-[140px] flex flex-col items-center justify-center shadow-[4px_4px_0_0_rgba(20,184,166,0.2)] hover:shadow-[2px_2px_0_0_rgba(20,184,166,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200'
              >
                <h3 className='text-base lg:text-lg font-bold text-white mb-2'>
                  {client.name}
                </h3>
                <p className='text-gray-400 text-sm'>{client.sector}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='text-center bg-white/[0.03] border-2 border-white/15 rounded-lg py-6 px-3 shadow-[4px_4px_0_0_rgba(255,255,255,0.08)]'
            >
              <div className='text-accent mx-auto mb-3 flex justify-center'>
                {stat.icon}
              </div>
              <div className='text-3xl md:text-4xl font-extrabold text-white mb-2'>
                {stat.number}
              </div>
              <p className='text-gray-400 text-sm'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

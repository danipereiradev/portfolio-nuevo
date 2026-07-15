import { Star, Award, Calendar, Users } from 'lucide-react';
import GlowBackdrop from './decor/GlowBackdrop';

const Clients = () => {
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
      number: '5.0',
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

      <div className='container mx-auto px-6 relative z-10'>
        <div className='text-center mb-16'>
          <span className='inline-block bg-white/10 text-accent text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-accent/60 rotate-[-1deg] mb-5'>
            Trayectoria
          </span>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-4 text-center'>
            Más de 12 años de experiencia en desarrollo web
          </h2>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto text-center'>
            Hemos trabajado en proyectos de distintos tamaños y sectores,
            combinando dirección técnica senior con procesos claros y trato
            directo en cada encargo.
          </p>
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

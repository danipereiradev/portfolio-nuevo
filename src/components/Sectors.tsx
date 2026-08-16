import {
  Stethoscope,
  Smile,
  Scale,
  Brain,
  Hammer,
  GraduationCap,
  Dumbbell,
  Sparkles,
  UtensilsCrossed,
  Store,
} from 'lucide-react';

export const Sectors = () => {
  const sectors = [
    {
      icon: Stethoscope,
      title: 'Clínicas y salud',
      description: 'Servicios, equipo, horarios y cómo contactar.',
    },
    {
      icon: Smile,
      title: 'Dentistas',
      description: 'Tratamientos y pedir cita sin laberinto.',
    },
    {
      icon: Brain,
      title: 'Psicólogos',
      description: 'Especialidades y un primer contacto sencillo.',
    },
    {
      icon: Scale,
      title: 'Abogados',
      description: 'Áreas de práctica y contacto discreto.',
    },
    {
      icon: Hammer,
      title: 'Reformas y oficios',
      description: 'Trabajos, zona y pedir presupuesto.',
    },
    {
      icon: GraduationCap,
      title: 'Academias',
      description: 'Cursos, horarios e inscripción.',
    },
    {
      icon: Dumbbell,
      title: 'Gimnasios',
      description: 'Actividades, horarios y altas.',
    },
    {
      icon: Sparkles,
      title: 'Estética',
      description: 'Tratamientos y reserva de cita.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Hostelería',
      description: 'Carta, dónde estás y cómo llamar.',
    },
    {
      icon: Store,
      title: 'Autónomos y pymes',
      description: 'Una web que diga qué haces y cómo te escriben.',
    },
  ];

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-6'>
        <div className='text-center mb-12    mx-auto'>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
            ¿Para quién es?
          </h2>
          <p className='text-base md:text-lg text-gray-600'>
            Autónomos, pymes y negocios locales. Da igual la ciudad: trabajamos
            online.
          </p>
        </div>
        <div className='   mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.title}
                className='bg-white rounded-xl border-2 border-ink-dark p-5 shadow-[4px_4px_0_0_#1a1a1a]'
              >
                <Icon className='w-7 h-7 text-accent mb-3' />
                <h3 className='text-lg font-bold text-gray-900 mb-1'>
                  {sector.title}
                </h3>
                <p className='text-sm text-gray-600'>{sector.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

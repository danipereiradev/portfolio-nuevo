import { Mail } from 'lucide-react';

interface Team {
  fullName: string;
  description: string;
  role: string;
  link: string[];
  imageUrl: string;
  mail: string;
}

type TeamMembers = Team[];

export const Team = () => {
  const teamMembers: TeamMembers = [
    {
      fullName: 'Dani Pereira',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrollador frontend',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/dani-pereira-pereiraweb.jpg',
      mail: 'dpereira@pereiraweb.es',
    },
    {
      fullName: 'Cris trujillo',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Diseñadora gráfica',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/portfolio/dani-pensando.png',
      mail: 'trujillo@pereiraweb.es',
    },
    {
      fullName: 'Sergi Cerdá',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrollador fullstack',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/dani-pereira-pereiraweb.jpg',
      mail: 'scerda@pereiraweb.es',
    },
    {
      fullName: 'Karen',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrolladora web',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/portfolio/dani-pensando.png',
      mail: 'karen@pereiraweb.es',
    },
  ];

  return (
    <section className='container mx-auto flex flex-col md:gap-24 items-center justify-center md:px-12 px-6 py-20 md:py-24    '>
      <div className=' p-4 text-center'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight'>
          Quienes estamos detrás de pereiraweb y a que nos dedicamos
        </h2>
        <p className='text-xl md:text-2xl text-black leading-relaxed mt-4'>
          Aquí estamos para que pongas cara a las personas con las que vas a
          trabajar codo con codo. Todos tenemos una larga trayectoria en el
          sector del desarrollo de software y marketing digital. Si tienes
          tiempo puedes echar un vistazo a nuestras carreras en linkedin.
        </p>
      </div>
      <div className='grid grid-cols-4 gap-4 text-center'>
        {teamMembers.map((member: Team) => {
          return (
            <article key={member.fullName} className=''>
              <img
                className='rounded-t-xl'
                src={member.imageUrl}
                alt='charles-deluvio'
              />

              <div className='member-info bg-[#141414] p-4 text-white text-lg rounded-b-xl'>
                <h3 className='text-2xl'>{member.fullName}</h3>
                <span className='text-accent'>{member.role}</span>
                <p className='text-base mt-4'>{member.description}</p>
                {/* <span className='text-accent text-sm italic'>
                  "Volvería a trabajar con el sin ninguna duda"
                </span> */}
                <div className='flex gap-2 justify-center items-center mt-4'>
                  <Mail width={20} className='text-accent' />
                  <a href='/'>{member.mail}</a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

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
    /* {
      fullName: 'Dani Pereira',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrollo web y Marketing digital',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/dani.png',
      mail: 'dpereira@pereiraweb.es',
    },
     */
    {
      fullName: 'Sergi Cerdá',
      description:
        '+5 años construyendo software, su meta en los próximos 5 es dar forma contigo a las herramientas que funcionen.',
      role: 'Desarrollador web fullstack',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/sergi.png',
      mail: 'scerda@pereiraweb.es',
    },
    {
      fullName: 'Cristina Recio',
      description:
        '+10 años en diseño gráfico y dirección de arte especializada en branding. Combina pensamiento estratégico con sensibilidad visual.',
      role: 'Diseñadora gráfica UX/UI',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/cristina.jpg',
      mail: 'trujillo@pereiraweb.es',
    },

    /* {
      fullName: 'Karen',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Diseño web wordpress',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/cristina.jpg',
      mail: 'karen@pereiraweb.es',
    }, */
  ];

  return (
    <section className='container mx-auto flex flex-col md:flex-row md:gap-24 items-center justify-center md:px-12 px-6 py-20 md:py-24'>
      <div className=' p-4 md:w-1/2'>
        <span className='bg-accent text-white text-md py-2 px-4 rounded-2xl'>
          CONOCE A TU FUTURO EQUIPO
        </span>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 leading-tight mt-4'>
          Desarrollamos webs pensado en la escalabilidad y el crecimiento de tu
          negocio.
        </h2>
        <p className='text-xl md:text-2xl text-black leading-relaxed'>
          En Pereiraweb somos directos: una web lenta o con errores es una fuga
          constante de dinero. Por eso, nuestra metodología en el desarrollo de
          tiendas online combina la arquitectura técnica más avanzada con un
          enfoque obsesivo en la conversión (CRO).
          <br />
          <br />
          Como Agencia de Ecommerce, analizamos tu modelo de negocio para elegir
          la tecnología que mejor se adapte a tus necesidades, desde Shopify
          hasta desarrollos a medida.
        </p>
      </div>
      <div className='grid grid-cols-2 mx-auto text-center justify-evenly md:w-1/2'>
        {teamMembers.map((member: Team) => {
          return (
            <article key={member.fullName} className='max-w-[333px]'>
              <img
                className='rounded-t-xl grayscale h-[333px] w-full object-cover'
                src={member.imageUrl}
                alt='charles-deluvio'
              />

              <div className='member-info bg-[#141414] p-4 text-white text-lg rounded-b-xl md:min-h-[200px]'>
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

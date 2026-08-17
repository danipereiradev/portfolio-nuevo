import { Mail } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useRef, useState } from 'react';

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
      fullName: 'Sergi Cerdá',
      description:
        '+5 años construyendo software, su meta en los próximos 5 es dar forma contigo a las herramientas que funcionen.',
      role: 'Desarrollador web fullstack',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/sergi.png',
      mail: 's.cerda@pereiraweb.es',
    },
    {
      fullName: 'Cristina Recio',
      description:
        '+10 años en diseño gráfico y dirección de arte especializada en branding. Combina pensamiento estratégico con sensibilidad visual.',
      role: 'Diseñadora gráfica UX/UI',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/cristina.jpg',
      mail: 'c.recio@pereiraweb.es',
    },
    {
      fullName: 'Dani Pereira',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrollo web y Marketing digital',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/dani.png',
      mail: 'hola@pereiraweb.es',
    },

    {
      fullName: 'Karen',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Diseño web wordpress',
      link: ['link1', 'link2'],
      imageUrl: 'public/img/team/cristina.jpg',
      mail: 'karen@pereiraweb.es',
    },
  ];

  return (
    <section className='container mx-auto flex flex-col md:flex-row md:gap-24 items-center justify-center md:px-12 px-6 py-20 md:py-24'>
      <div className=' p-4 md:w-1/2'>
        <span className='bg-accent text-white text-md py-2 px-4 rounded-2xl'>
          CONOCE A TU FUTURO EQUIPO
        </span>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 leading-tight mt-4'>
          Una agencia joven pero con más de una década de experiencia y un
          equipo top.
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
      <div className='md:w-1/2 scroll-smooth'>
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          speed={1000}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={2}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {teamMembers.map((member: Team) => {
            return (
              <SwiperSlide>
                <article
                  key={member.fullName}
                  className=' cursor-grab text-center'
                >
                  <img
                    className='rounded-t-xl grayscale h-[333px] w-full object-cover'
                    src={member.imageUrl}
                    alt='charles-deluvio'
                  />

                  <div className='member-info bg-[#f4f4f4] p-4 text-black text-start text-lg rounded-b-xl md:min-h-[200px]'>
                    <h3 className='text-2xl font-bold'>{member.fullName}</h3>
                    <span className='text-accent font-bold'>{member.role}</span>
                    <p className='text-base mt-4'>{member.description}</p>
                    {/* <span className='text-accent text-sm italic'>
                  "Volvería a trabajar con el sin ninguna duda"
                </span> */}
                    <div className='flex gap-2 text-start items-center mt-4 font-bold'>
                      <Mail width={20} className='text-accent' />
                      <a href='/'>{member.mail}</a>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

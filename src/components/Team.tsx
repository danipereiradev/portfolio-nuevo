import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Team {
  fullName: string;
  description: string;
  role: string;
  link: string[];
  imageUrl: string;
  mail: string;
}

type TeamMembers = Team[];

interface TeamProps {
  label: string;
  title: string;
  paragraphs: string[];
}

export const Team = ({ label, title, paragraphs }: TeamProps) => {
  const teamMembers: TeamMembers = [
    {
      fullName: 'Sergi Cerdá',
      description:
        '+5 años construyendo software, su meta en los próximos 5 es dar forma contigo a las herramientas que funcionen.',
      role: 'Desarrollador web fullstack',
      link: ['link1', 'link2'],
      imageUrl: '/img/team/sergi.png',
      mail: 's.cerda@pereiraweb.es',
    },
    {
      fullName: 'Cristina Recio',
      description:
        '+10 años en diseño gráfico y dirección de arte especializada en branding. Combina pensamiento estratégico con sensibilidad visual.',
      role: 'Diseñadora gráfica UX/UI',
      link: ['link1', 'link2'],
      imageUrl: '/img/team/cristina.jpg',
      mail: 'c.recio@pereiraweb.es',
    },
    {
      fullName: 'Dani Pereira',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrollo web y Marketing digital',
      link: ['link1', 'link2'],
      imageUrl: '/img/team/dani.png',
      mail: 'hola@pereiraweb.es',
    },

    {
      fullName: 'Karen',
      description:
        '+12 años de experiencia en Web y SEO. Frontend con Typescript. Clientes como Inditex y Banco Santander.',
      role: 'Diseño web wordpress',
      link: ['link1', 'link2'],
      imageUrl: '/img/team/cristina.jpg',
      mail: 'karen@pereiraweb.es',
    },
  ];

  return (
    <section className='mx-auto flex flex-col md:flex-row items-center text-center md:text-start gap-8  py-8 px-4 md:min-h-[100vh] md:px-8'>
      <div className='md:w-1/2 flex flex-col items-center md:items-start gap-4 md:pr-8'>
        <span className='text-accent font-extrabold underline text-md rounded-2xl'>
          {label}
        </span>
        <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
          {title}
        </h2>
        {paragraphs?.map((para: string) => {
          return (
            <p className='text-lg md:text-xl text-black md:text-justify'>
              {para}
            </p>
          );
        })}
      </div>
      <div className='md:w-1/2 scroll-smooth w-full'>
        <Swiper
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          speed={1000}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
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
                    <div className='flex gap-4 items-start mt-4'>
                      <Mail width={20} className='text-accent' />

                      <LinkedinIcon width={20} className='text-accent' />

                      <GithubIcon width={20} className='text-accent' />
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

import type { ReactNode } from 'react';
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
  linkedin?: string;
  github?: string;
  imageUrl?: string;
  mail: string;
}

const memberInitials = (fullName: string) =>
  fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

type TeamMembers = Team[];

interface TeamProps {
  label: string;
  title: string;
  paragraphs: ReactNode[];
}

export const Team = ({ label, title, paragraphs }: TeamProps) => {
  const teamMembers: TeamMembers = [
    {
      fullName: 'Sergio Cerdá',
      description:
        'Más de 5 años desarrollando software, aplicaciones web y móviles. Convierte ideas en herramientas digitales pensadas para funcionar de verdad.',
      role: 'Desarrollo Web y App',
      linkedin: 'https://www.linkedin.com/in/sergio-cerda-hervas/',
      github: 'https://github.com/sergio-cravas',
      imageUrl: '/img/team/sergi.png',
      mail: 's.cerda@36web.es',
    },
    {
      fullName: 'Cristina Recio',
      description:
        'Más de 10 años en diseño gráfico y dirección de arte especializada en branding. Combina pensamiento estratégico con sensibilidad visual.',
      role: 'Diseñadora gráfica UX/UI',
      linkedin: 'https://www.linkedin.com/in/cristina-recio/',
      imageUrl: '/img/team/cristina.jpg',
      mail: 'c.recio@36web.es',
    },
    {
      fullName: 'Dani Pereira',
      description:
        'Más de 12 años de experiencia en web y SEO. Frontend con TypeScript. Clientes como Inditex y Banco Santander.',
      role: 'Desarrollo Web y Marketing digital',
      github: 'https://github.com/danipereiradev',
      imageUrl: '/img/team/dani.png',
      mail: 'hola@36web.es',
    },

    {
      fullName: 'Karen Montero',
      description:
        'Especializada en diseño y desarrollo web con WordPress, con especial atención a la experiencia de usuario y al diseño UX/UI.',
      role: 'Desarrollo Web',
      linkedin: 'https://www.linkedin.com/in/karenmonrose/',
      imageUrl: '',
      mail: 'k.montero@36web.es',
    },
  ];

  return (
    <section className='page-section'>
      <div className='container mx-auto flex flex-col items-center gap-page-gap text-center lg:flex-row lg:text-start'>
        <div className='page-title-block w-full items-center lg:w-1/2 lg:items-start'>
          <span className='text-accent font-extrabold underline text-md rounded-lg'>
            {label}
          </span>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {title}
          </h2>
          {paragraphs?.map((para, index) => (
            <p
              key={index}
              className='text-lg md:text-xl text-ink-dark lg:text-justify'
            >
              {para}
            </p>
          ))}
        </div>
        <div className='w-full lg:w-1/2'>
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
            loop
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
                    {member.imageUrl ? (
                      <div className='overflow-hidden rounded-t-xl'>
                        <img
                          className='h-[333px] w-full object-cover grayscale'
                          src={member.imageUrl}
                          alt={member.fullName}
                        />
                      </div>
                    ) : (
                      <div
                        className='flex h-[333px] w-full items-center justify-center rounded-t-xl bg-accent-light'
                        aria-hidden='true'
                      >
                        <span className='text-5xl font-extrabold text-accent md:text-6xl'>
                          {memberInitials(member.fullName)}
                        </span>
                      </div>
                    )}

                    <div className='member-info rounded-b-xl bg-surface-muted p-content-pad text-start text-lg text-ink-dark md:min-h-[200px]'>
                      <h3 className='text-2xl font-bold text-accent'>
                        {member.fullName}
                      </h3>
                      <span className='font-bold text-ink-dark'>
                        {member.role}
                      </span>
                      <p className='mt-heading-gap text-base'>
                        {member.description}
                      </p>
                      <div className='mt-text-gap flex items-start gap-content-gap'>
                        <a
                          href={`mailto:${member.mail}`}
                          aria-label={`Enviar email a ${member.fullName}`}
                          className='text-accent transition-colors hover:text-accent-hover'
                        >
                          <Mail width={20} />
                        </a>
                        {member.linkedin ? (
                          <a
                            href={member.linkedin}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`LinkedIn de ${member.fullName}`}
                            className='text-accent transition-colors hover:text-accent-hover'
                          >
                            <LinkedinIcon width={20} />
                          </a>
                        ) : null}
                        {member.github ? (
                          <a
                            href={member.github}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`GitHub de ${member.fullName}`}
                            className='text-accent transition-colors hover:text-accent-hover'
                          >
                            <GithubIcon width={20} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

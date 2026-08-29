import type { ReactNode } from 'react';
import { GithubIcon, LinkedinIcon, Mail } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Team {
  fullName: string;
  description: ReactNode;
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
  compact?: boolean;
}

const compactOrder = ['Cristina Recio', 'Dani Pereira', 'Sergio Cerdá'];

export const Team = ({
  label,
  title,
  paragraphs,
  compact = false,
}: TeamProps) => {
  const teamMembers: TeamMembers = [
    {
      fullName: 'Sergio Cerdá',
      description: (
        <>
          Más de 5 años desarrollando software,{' '}
          <strong className='font-extrabold'>
            aplicaciones web y móviles
          </strong>
          . Convierte ideas en herramientas digitales pensadas para funcionar de
          verdad.
        </>
      ),
      role: 'Responsable de desarrollo de apps',
      linkedin: 'https://www.linkedin.com/in/sergio-cerda-hervas/',
      github: 'https://github.com/sergio-cravas',
      imageUrl: '/img/team/sergi.webp',
      mail: 's.cerda@36web.es',
    },
    {
      fullName: 'Cristina Recio',
      description: (
        <>
          Más de 10 años en diseño gráfico,{' '}
          <strong className='font-extrabold'>
            dirección de arte y branding
          </strong>
          . Combina pensamiento estratégico con{' '}
          <strong className='font-extrabold'>sensibilidad visual</strong>.
        </>
      ),
      role: 'Responsable de diseño y branding',
      linkedin: 'https://www.linkedin.com/in/cristina-recio/',
      imageUrl: '/img/team/cristina.jpg',
      mail: 'c.recio@36web.es',
    },
    {
      fullName: 'Dani Pereira',
      description: (
        <>
          Más de 12 años{' '}
          <strong className='font-extrabold'>
            desarrollando webs y posicionando webs
          </strong>
          .{' '}
          <strong className='font-extrabold'>Máster en marketing digital</strong>
          . Ha trabajado para{' '}
          <strong className='font-extrabold'>
            grandes empresas de banca y retail
          </strong>
          .
        </>
      ),
      role: 'Responsable de diseño web y marketing digital',
      github: 'https://github.com/danipereiradev',
      imageUrl: '/img/team/dani.webp',
      mail: 'hola@36web.es',
    },
    // Hasta que tenga foto, no la mostramos.
    // {
    //   fullName: 'Karen Montero',
    //   description: (
    //     <>
    //       Especializada en{' '}
    //       <strong className='font-extrabold'>diseño y desarrollo</strong> web
    //       con WordPress, con especial atención a la experiencia de usuario y al{' '}
    //       <strong className='font-extrabold'>diseño UX/UI</strong>.
    //     </>
    //   ),
    //   role: 'Desarrolladora web',
    //   linkedin: 'https://www.linkedin.com/in/karenmonrose/',
    //   imageUrl: '',
    //   mail: 'k.montero@36web.es',
    // },
  ];

  return (
    <section className='page-section'>
      <div className='container mx-auto flex flex-col items-center gap-page-gap text-center lg:flex-row lg:text-start'>
        <RevealOnScroll className='page-title-block w-full items-center lg:w-1/2 lg:items-start'>
          <span className='text-accent font-extrabold underline text-md rounded-lg'>
            {label}
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {title}
          </h2>
          {paragraphs?.map((para, index) => (
            <p
              key={index}
              className='text-xl md:text-2xl text-ink-dark lg:text-justify'
            >
              {para}
            </p>
          ))}
        </RevealOnScroll>
        <RevealOnScroll className='w-full lg:w-1/2' delayMs={120}>
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
          >
            {(compact
              ? [...teamMembers].sort(
                  (a, b) =>
                    compactOrder.indexOf(a.fullName) -
                    compactOrder.indexOf(b.fullName),
                )
              : teamMembers
            ).map((member: Team) => {
              const displayName = compact
                ? member.fullName.split(' ')[0]
                : member.fullName;

              return (
                <SwiperSlide key={member.fullName}>
                  <article className='cursor-grab text-center'>
                    {member.imageUrl ? (
                      <div className='overflow-hidden rounded-t-xl'>
                        <img
                          className='h-[333px] w-full object-cover object-top grayscale'
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

                    <div
                      className={`member-info flex flex-col rounded-b-xl bg-surface-muted p-content-pad text-start text-lg text-ink-dark ${
                        compact ? 'min-h-[9.75rem]' : 'min-h-[13.5rem]'
                      }`}
                    >
                      <h3 className='text-2xl font-bold text-accent'>
                        {displayName}
                      </h3>
                      <p className='mt-1 text-base font-bold leading-snug text-ink-dark md:text-lg'>
                        {member.role}
                      </p>
                      {compact ? null : (
                        <>
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
                        </>
                      )}
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </RevealOnScroll>
      </div>
    </section>
  );
};

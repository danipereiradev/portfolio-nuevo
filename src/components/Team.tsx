import type { ReactNode } from 'react';
import { Mail } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface Team {
  fullName: string;
  description: ReactNode;
  role: string;
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

  const members = compact
    ? [...teamMembers].sort(
        (a, b) =>
          compactOrder.indexOf(a.fullName) - compactOrder.indexOf(b.fullName),
      )
    : teamMembers;

  return (
    <section className='page-section'>
      <div className='container mx-auto flex flex-col items-center gap-page-gap text-center'>
        <RevealOnScroll className='page-title-block mx-auto w-full max-w-5xl items-center'>
          <span className='text-accent font-extrabold underline text-md rounded-lg'>
            {label}
          </span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>
            {title}
          </h2>
          {paragraphs?.map((para, index) => (
            <p
              key={index}
              className='text-xl md:text-2xl text-ink-dark'
            >
              {para}
            </p>
          ))}
        </RevealOnScroll>
        <RevealOnScroll className='w-full' delayMs={120}>
          <div
            className={`grid grid-cols-1 gap-4 md:grid-cols-3`}
          >
            {members.map((member: Team) => {
              const displayName = compact
                ? member.fullName.split(' ')[0]
                : member.fullName;

              return (
                <article key={member.fullName} className='text-center'>
                  {member.imageUrl ? (
                    <div className='overflow-hidden rounded-t-xl'>
                      <img
                        className='h-[333px] w-full object-cover object-top grayscale'
                        src={member.imageUrl}
                        alt={member.fullName}
                        width={400}
                        height={333}
                        loading='lazy'
                        decoding='async'
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
                      <p className='mt-heading-gap text-base'>
                        {member.description}
                      </p>
                    )}
                    <a
                      href={`mailto:${member.mail}`}
                      className='mt-text-gap flex items-center gap-2 text-accent transition-colors hover:text-accent-hover'
                    >
                      <Mail width={20} className='shrink-0' aria-hidden />
                      <span className='break-all text-base font-bold'>
                        {member.mail}
                      </span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

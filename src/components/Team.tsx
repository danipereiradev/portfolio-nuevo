import type { ReactNode } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';

interface TeamMember {
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

interface TeamProps {
  label: string;
  title: string;
  paragraphs: ReactNode[];
}

const memberOrder = [
  'Cristina Recio',
  'Dani Pereira',
  'Sergio Cerdá',
  'Karen Montero',
];

export const Team = ({ label, title, paragraphs }: TeamProps) => {
  const teamMembers: TeamMember[] = [
    {
      fullName: 'Sergio Cerdá',
      description: (
        <>
          Más de 5 años desarrollando software,{' '}
          <strong className='font-extrabold'>aplicaciones web y móviles</strong>
          . Convierte ideas en herramientas digitales pensadas para funcionar de
          verdad.
        </>
      ),
      role: 'Desarrollo de apps',
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
      role: 'Diseño y branding',
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
          <strong className='font-extrabold'>
            Máster en marketing digital
          </strong>
          . Ha trabajado para{' '}
          <strong className='font-extrabold'>
            grandes empresas de banca y retail
          </strong>
          .
        </>
      ),
      role: 'Diseño web y marketing digital',
      imageUrl: '/img/team/dani.webp',
      mail: 'hola@36web.es',
    },
    {
      fullName: 'Karen Montero',
      description: (
        <>
          Especializada en{' '}
          <strong className='font-extrabold'>diseño y desarrollo</strong> web
          con WordPress, con especial atención a la experiencia de usuario y al{' '}
          <strong className='font-extrabold'>diseño UX/UI</strong>.
        </>
      ),
      role: 'Desarrollo web WordPress',
      mail: 'k.montero@36web.es',
    },
  ];

  const members = [...teamMembers].sort(
    (a, b) => memberOrder.indexOf(a.fullName) - memberOrder.indexOf(b.fullName),
  );

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
            <p key={index} className='text-xl md:text-2xl text-ink-dark'>
              {para}
            </p>
          ))}
        </RevealOnScroll>
        <RevealOnScroll className='w-full' delayMs={120}>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            {members.map((member) => (
              <article
                key={member.fullName}
                className='group relative aspect-[4/5] overflow-hidden rounded-xl bg-ink-dark'
              >
                {member.imageUrl ? (
                  <img
                    className='absolute inset-0 h-full w-full object-cover object-top grayscale brightness-75'
                    src={member.imageUrl}
                    alt={member.fullName}
                    width={480}
                    height={600}
                    loading='lazy'
                    decoding='async'
                  />
                ) : (
                  <span className='absolute inset-0 flex items-center justify-center bg-accent text-5xl font-extrabold text-white'>
                    {memberInitials(member.fullName)}
                  </span>
                )}
                <div className='absolute inset-x-2.5 bottom-2.5 flex h-[7.75rem] flex-col rounded-lg border border-white/15 bg-accent/10 px-3 py-2.5 text-left text-white backdrop-blur-md'>
                  <div className='flex items-start justify-between gap-2'>
                    <h3 className='truncate text-sm font-extrabold leading-tight md:text-base'>
                      {member.fullName}
                    </h3>
                    <a
                      href={`mailto:${member.mail}`}
                      className='mt-0.5 shrink-0 text-white/80 transition-opacity hover:text-white'
                      aria-label={`Escribir a ${member.fullName}`}
                    >
                      <ArrowUpRight className='h-4 w-4' aria-hidden />
                    </a>
                  </div>
                  <p className='mt-0.5 truncate text-xs font-semibold text-white/90'>
                    {member.role}
                  </p>
                  <p className='mt-1 line-clamp-2 text-xs leading-snug text-white/85'>
                    {member.description}
                  </p>
                  <a
                    href={`mailto:${member.mail}`}
                    className='mt-auto inline-flex items-center gap-1.5 truncate text-[11px] font-bold text-white/90 transition-opacity hover:text-white'
                  >
                    <Mail className='h-3.5 w-3.5 shrink-0' aria-hidden />
                    <span className='truncate'>{member.mail}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

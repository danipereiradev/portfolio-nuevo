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
  const teamMembers: Team[] = [
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
      role: 'Responsable de desarrollo WordPress',
      mail: 'k.montero@36web.es',
    },
  ];

  const members = [...teamMembers].sort(
    (a, b) => memberOrder.indexOf(a.fullName) - memberOrder.indexOf(b.fullName),
  );

  const checkerboardMosaic = [
    ...members.map((member, i) => ({
      kind: (i % 2 === 0 ? 'photo' : 'bio') as 'photo' | 'bio',
      member,
    })),
    ...members.map((member, i) => ({
      kind: (i % 2 === 0 ? 'bio' : 'photo') as 'photo' | 'bio',
      member,
    })),
  ];

  const mosaicTile = (
    tile: { kind: 'photo' | 'bio'; member: Team },
    prefix: string,
  ) => {
    const isMobile = prefix === 'm';

    if (tile.kind === 'photo') {
      return (
        <article
          key={`${prefix}-${tile.member.fullName}-photo`}
          className={`group relative aspect-square overflow-hidden bg-accent-light ${
            isMobile ? 'rounded-xl' : ''
          }`}
        >
          {tile.member.imageUrl ? (
            <img
              className='absolute inset-0 h-full w-full object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0'
              src={tile.member.imageUrl}
              alt={tile.member.fullName}
              width={400}
              height={400}
              loading='lazy'
              decoding='async'
            />
          ) : (
            <span className='flex h-full items-center justify-center text-4xl font-extrabold text-accent'>
              {memberInitials(tile.member.fullName)}
            </span>
          )}
        </article>
      );
    }

    return (
      <article
        key={`${prefix}-${tile.member.fullName}-bio`}
        className={`flex aspect-square flex-col items-center justify-center bg-[#f4f4f4] px-3 py-4 text-center text-ink-dark md:px-8 md:py-6 ${
          isMobile ? 'rounded-xl' : ''
        }`}
      >
        <h3 className='text-base font-bold leading-tight md:text-2xl'>
          {tile.member.fullName.split(' ')[0]}
        </h3>
        <p className='mt-1 text-[11px] font-medium leading-snug text-ink-dark/80 md:text-base'>
          {tile.member.role}
        </p>
        {isMobile ? null : (
          <p className='mt-3 line-clamp-4 text-sm leading-relaxed'>
            {tile.member.description}
          </p>
        )}
        <a
          href={`mailto:${tile.member.mail}`}
          className='mt-2 flex items-center gap-1.5 text-[11px] font-bold text-ink-dark transition-opacity hover:opacity-70 md:mt-4 md:gap-2 md:text-sm'
        >
          <Mail width={16} className='shrink-0' aria-hidden />
          <span className='break-all'>{tile.member.mail}</span>
        </a>
      </article>
    );
  };

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
          <div className='flex flex-col gap-3 md:hidden'>
            {members.map((member) => (
              <div
                key={`m-${member.fullName}`}
                className='grid grid-cols-2 gap-2'
              >
                {mosaicTile({ kind: 'photo', member }, 'm')}
                {mosaicTile({ kind: 'bio', member }, 'm')}
              </div>
            ))}
          </div>
          <div className='hidden overflow-hidden rounded-xl md:grid md:grid-cols-4'>
            {checkerboardMosaic.map((tile) => mosaicTile(tile, 'd'))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

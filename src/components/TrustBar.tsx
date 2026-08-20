import {
  BadgeCheck,
  Handshake,
  MessagesSquare,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

const defaultTrustPoints: { icon: LucideIcon; text: string }[] = [
  { icon: BadgeCheck, text: '100% satisfacción' },
  { icon: Handshake, text: 'Soporte y Trato 1-a-1' },
  { icon: TrendingUp, text: 'Webs que venden' },
  { icon: MessagesSquare, text: 'Consultoría incluida' },
];

const TrustBar = () => {
  return (
    <section className='border-y border-ink-light bg-surface-muted px-page-x'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 md:divide-x-2 md:divide-ink-light'>
        {defaultTrustPoints.map((point) => {
          const Icon = point.icon;
          return (
            <div
              key={point.text}
              className='flex flex-col items-center justify-center gap-3 border-b border-ink-light py-page-compact text-center last:border-b-0 md:border-b-0'
            >
              <span className='rounded-lg bg-accent p-3 text-white'>
                <Icon className='h-5 w-5' />
              </span>
              <span className='block h-1 w-10 bg-brand' />
              <p className='text-base font-bold text-ink-dark md:text-lg'>
                {point.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustBar;

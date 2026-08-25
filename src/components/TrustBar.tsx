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

interface TrustBarProps {
  points?: { icon: LucideIcon; text: string }[];
  deliveryText?: string;
  hidePaymentPoint?: boolean;
  animate?: boolean;
}

const TrustBar = ({
  points = defaultTrustPoints,
  animate = true,
}: TrustBarProps) => {
  return (
    <section className='border-y border-ink-light bg-surface-muted'>
      <div
        className={`container mx-auto grid grid-cols-2 md:grid-cols-4 md:divide-x-2 md:divide-ink-light ${
          animate ? 'trustbar-enter' : ''
        }`}
      >
        {points.map((point, index) => {
          const Icon = point.icon;
          return (
            <div
              key={point.text}
              className={`flex flex-col items-center justify-center gap-2 px-3 py-6 text-center md:gap-3 md:py-page-compact ${
                index % 2 === 0
                  ? 'border-r border-ink-light md:border-r-0'
                  : ''
              } ${
                index < 2 ? 'border-b border-ink-light md:border-b-0' : ''
              }`}
            >
              <span className='rounded-lg bg-accent p-2.5 text-white md:p-3'>
                <Icon className='h-5 w-5' />
              </span>
              <span className='block h-1 w-8 bg-brand md:w-10' />
              <p className='max-w-[11rem] text-sm font-bold leading-snug text-ink-dark sm:text-base md:max-w-none md:text-lg'>
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

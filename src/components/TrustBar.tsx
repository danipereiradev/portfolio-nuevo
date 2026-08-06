import {
  Award,
  Building2,
  Wallet,
  Clock,
  Send,
  MapPin,
  FileCheck,
} from 'lucide-react';

const trustPoints = [
  { icon: Award, text: 'RESEÑAS VERIFICADAS' },
  { icon: Building2, text: 'TRABAJAMOS EN TODA ESPAÑA' },
  { icon: FileCheck, text: 'PRECIOS CERRADOS' },
  { icon: Wallet, text: 'FACILIDAD DE PAGO' },
  { icon: Clock, text: 'ENTREGA 2-3 SEMANAS' },
  { icon: Send, text: 'RESPUESTA RÁPIDA' },
  { icon: MapPin, text: 'ATENCIÓN ONLINE' },
];

const TrustPointCard = ({
  icon: Icon,
  text,
}: {
  icon: (typeof trustPoints)[number]['icon'];
  text: string;
}) => (
  <div className='flex h-full min-h-[3.25rem] items-center gap-2.5 rounded-lg border-2 border-white/15 bg-white/[0.04] px-3 py-3 shadow-[3px_3px_0_0_rgba(20,184,166,0.2)] transition-all duration-200 hover:border-accent hover:shadow-[3px_3px_0_0_rgba(20,184,166,0.55)] md:px-4'>
    <Icon className='h-4 w-4 flex-shrink-0 text-accent md:h-5 md:w-5' />
    <p className='text-xs font-bold leading-snug text-white md:text-sm'>
      {text}
    </p>
  </div>
);

const TrustBar = () => {
  return (
    <section className='relative overflow-hidden border-b-2 border-white/10 bg-black py-10 md:py-12'>
      <div className='mx-auto w-full max-w-5xl px-6'>
        {/* Móvil: 2 columnas, último centrado */}
        <div className='grid grid-cols-2 gap-3 md:hidden'>
          {trustPoints.map((point, index) => {
            const isLastOdd =
              index === trustPoints.length - 1 && trustPoints.length % 2 !== 0;
            return (
              <div
                key={point.text}
                className={
                  isLastOdd
                    ? 'col-span-2 mx-auto w-full max-w-[calc(50%-0.375rem)]'
                    : undefined
                }
              >
                <TrustPointCard icon={point.icon} text={point.text} />
              </div>
            );
          })}
        </div>

        {/* Tablet: 3 + 3 + 1 centrado */}
        <div className='hidden md:block lg:hidden'>
          <div className='grid grid-cols-3 gap-3'>
            {trustPoints.slice(0, 6).map((point) => (
              <TrustPointCard
                key={point.text}
                icon={point.icon}
                text={point.text}
              />
            ))}
          </div>
          <div className='mx-auto mt-3 w-full max-w-[calc((100%-1.5rem)/3)]'>
            <TrustPointCard
              icon={trustPoints[6].icon}
              text={trustPoints[6].text}
            />
          </div>
        </div>

        {/* Desktop: 4 arriba + 3 centrados abajo */}
        <div className='hidden lg:flex lg:flex-col lg:gap-4'>
          <div className='grid grid-cols-4 gap-4'>
            {trustPoints.slice(0, 4).map((point) => (
              <TrustPointCard
                key={point.text}
                icon={point.icon}
                text={point.text}
              />
            ))}
          </div>
          <div className='mx-auto grid w-full max-w-3xl grid-cols-3 gap-4'>
            {trustPoints.slice(4).map((point) => (
              <TrustPointCard
                key={point.text}
                icon={point.icon}
                text={point.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

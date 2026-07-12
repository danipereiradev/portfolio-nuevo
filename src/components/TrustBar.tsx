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
  { icon: Award, text: '+12 años de experiencia' },
  { icon: Building2, text: 'Estudio web en Madrid' },
  { icon: FileCheck, text: 'Presupuesto cerrado antes de empezar' },
  { icon: Wallet, text: 'Pago único, fraccionado o mensual' },
  { icon: Clock, text: 'Entrega en 2-3 semanas' },
  { icon: Send, text: 'Respuesta en 2h' },
  { icon: MapPin, text: 'Proyectos en toda España' },
];

const TrustBar = () => {
  return (
    <section className='relative bg-black py-10 md:py-12 overflow-hidden border-b-2 border-white/10'>
      <div className='mx-auto w-full max-w-screen-2xl px-6'>
        <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className='flex items-center gap-2.5 px-4 py-3 max-w-[220px] sm:max-w-none border-2 border-white/15 hover:border-accent rounded-lg bg-white/[0.04] shadow-[3px_3px_0_0_rgba(20,184,166,0.2)] hover:shadow-[3px_3px_0_0_rgba(20,184,166,0.55)] transition-all duration-200'
              >
                <Icon className='w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0' />
                <p className='text-xs md:text-sm font-bold text-white leading-snug sm:whitespace-nowrap'>
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;

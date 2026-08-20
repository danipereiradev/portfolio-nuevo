import {
  Award,
  Building2,
  FileCheck,
  type LucideIcon,
  Lightbulb,
} from 'lucide-react';

const defaultTrustPoints: { icon: LucideIcon; text: string }[] = [
  { icon: Award, text: '100% satisfacción' },
  { icon: Building2, text: 'Soporte y Trato 1-a-1' },
  { icon: FileCheck, text: 'Webs que venden' },
  { icon: Lightbulb, text: 'Consultoría incluida' },
];

const RenderIcon = (Icon: LucideIcon) => {
  return <Icon width={150} className='text-black' />;
};

const TrustBar = () => {
  return (
    <section className='border-b border-ink-light bg-brand-light px-page-x text-ink-dark'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4'>
        {defaultTrustPoints.map((point, index) => {
          return (
            <div
              key={point.text}
              className={`flex flex-col items-center justify-center gap-1 py-page-compact text-center text-xl ${
                index === defaultTrustPoints.length - 1
                  ? ''
                  : 'border-b border-ink-dark/20 md:border-b-0 md:border-r'
              }`}
            >
              {RenderIcon(point.icon)}
              {point.text}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustBar;

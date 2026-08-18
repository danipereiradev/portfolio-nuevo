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
    <section className=' bg-gray-50 border-b border-b-gray-300 text-black grid grid-cols-1 md:grid-cols-4 md:min-h-[10vh] min-h-[20vh]'>
      {defaultTrustPoints.map((point, index) => {
        return (
          <div
            key={point.text}
            className={`flex flex-col my-auto items-center text-center gap-1 justify-start ${index === defaultTrustPoints.length - 1 ? '' : 'border-r border-r-gray-300'}  text-xl p-4`}
          >
            {RenderIcon(point.icon)}
            {point.text}
          </div>
        );
      })}
    </section>
  );
};

export default TrustBar;

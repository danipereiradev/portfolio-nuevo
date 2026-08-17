import {
  Award,
  Building2,
  FileCheck,
  type LucideIcon,
  Lightbulb,
} from 'lucide-react';

const defaultTrustPoints: { icon: LucideIcon; text: string }[] = [
  { icon: Award, text: '100% de clientes satisfechos' },
  { icon: Building2, text: 'Soporte y trato directo 1-a-1' },
  { icon: FileCheck, text: 'Proyectos enfocados en vender' },
  { icon: Lightbulb, text: 'Consultoría inicial estratégica incluida' },
];

const RenderIcon = (Icon: LucideIcon) => {
  return <Icon width={50} />;
};

const TrustBar = () => {
  return (
    <section className=' text-black grid grid-cols-2 md:grid-cols-4 border-b-2 border-b-gay-500 min-h-[10vh]'>
      {defaultTrustPoints.map((point) => {
        return (
          <div
            key={point.text}
            className='flex items-center py-4 px-2 border-r border-r-gray-300 justify-center text-xl'
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

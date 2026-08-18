import {
  Award,
  Building2,
  FileCheck,
  type LucideIcon,
  Lightbulb,
} from 'lucide-react';

const defaultTrustPoints: { icon: LucideIcon; text: string }[] = [
  { icon: Award, text: '100% de clientes satisfechos' },
  { icon: Building2, text: 'Soporte y Trato 1-a-1' },
  { icon: FileCheck, text: 'Proyectos enfocados a vender' },
  { icon: Lightbulb, text: 'Consultoría inicial incluida' },
];

const RenderIcon = (Icon: LucideIcon) => {
  return <Icon width={50} />;
};

const TrustBar = () => {
  return (
    <section className=' text-black grid grid-cols-1 md:grid-cols-4 md:min-h-[10vh] min-h-[20vh]'>
      {defaultTrustPoints.map((point) => {
        return (
          <div
            key={point.text}
            className='flex items-center md:justify-center  border-b border-b-gray-300 md:border-r md:border-r-gray-300  text-xl p-4'
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

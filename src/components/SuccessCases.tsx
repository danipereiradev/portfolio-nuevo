import Button from './Button';

interface SuccessCasesProps {
  company: string;
  title: string;
  description: string;
  images: string[];
  reverse?: boolean;
  link?: string;
}
export const SuccessCases = ({
  company,
  title,
  description,
  images,
  reverse,
  link,
}: SuccessCasesProps) => {
  return (
    <section
      className={`container mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:gap-24 items-center justify-center md:px-12 px-6 py-20 md: py-8`}
    >
      <div className='md:w-1/2 p-4'>
        <span className='bg-accent text-white text-md py-2 px-4 rounded-lg'>
          CASO DE EXITO
        </span>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 mb-12 leading-tight '>
          {title}
          <span className='text-accent'>{company}</span>{' '}
        </h2>
        <p className='text-xl md:text-2xl text-black leading-relaxed'>
          {description}
        </p>
        <Button className='mt-4'>Ir al caso</Button>
      </div>
      <div className='overflow-hidden rounded-lg md:w-1/2'>
        <img
          className='aspect-[4/3] w-full object-cover'
          src={images[0]}
          alt='charles-deluvio'
        />
      </div>
    </section>
  );
};

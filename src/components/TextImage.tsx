import Button from './Button';

interface TextImageProps {
  label: string;
  title: string;
  paragraphs: string[];
}

export const TextImage = ({ label, title, paragraphs }: TextImageProps) => {
  return (
    <section className='mx-auto flex flex-col-reverse md:flex-row-reverse items-center md:h-[100vh] text-center md:text-start gap-8 py-8 px-4 md:py-0 md:px-8'>
      <div className='md:w-1/2 flex flex-col items-center md:items-start gap-4 md:pl-8'>
        <span className='text-accent font-extrabold underline text-md rounded-2xl'>
          {label}
        </span>
        <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900'>
          {title}
        </h2>
        {paragraphs?.map((para: string) => {
          return (
            <p className='text-lg md:text-xl text-black md:text-justify'>
              {para}
            </p>
          );
        })}
        <Button className='text-white mt-4'>Saber más</Button>
      </div>
      <div className='md:w-1/2'>
        <img
          className='rounded-2xl'
          src='/img/web-design-charlesdeluvio.webp'
          alt='charles-deluvio'
        />
      </div>
    </section>
  );
};

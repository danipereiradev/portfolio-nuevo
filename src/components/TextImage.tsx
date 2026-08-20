import Button from './Button';

interface TextImageProps {
  label: string;
  title: string;
  paragraphs: string[];
}

export const TextImage = ({ label, title, paragraphs }: TextImageProps) => {
  return (
    <section className='page-section'>
      <div className='container mx-auto flex flex-col-reverse items-center gap-page-gap text-center lg:flex-row-reverse lg:text-start'>
        <div className='page-title-block w-full items-center lg:w-1/2 lg:items-start'>
          <span className='text-md rounded-2xl font-extrabold text-accent underline'>
            {label}
          </span>
          <h2 className='text-2xl font-extrabold text-gray-900 md:text-4xl lg:text-5xl'>
            {title}
          </h2>
          {paragraphs?.map((para: string) => {
            return (
              <p className='text-lg text-black md:text-xl lg:text-justify'>
                {para}
              </p>
            );
          })}
          <Button className='mt-text-gap text-white'>Saber más</Button>
        </div>
        <div className='w-full lg:w-1/2'>
          <img
            className='w-full rounded-2xl'
            src='/img/web-design-charlesdeluvio.webp'
            alt='charles-deluvio'
          />
        </div>
      </div>
    </section>
  );
};

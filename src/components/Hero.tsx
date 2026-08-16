import Button from './Button';

import { ContactFormHero } from './ContactFormHero';
import ReactPlayer from 'react-player';

interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundUrl: string;
  heroType: 'form' | 'video';
  videoUrl?: string;
}

const Hero = ({
  title,
  description,
  buttonText,
  backgroundUrl,
  heroType,
  videoUrl,
}: HeroProps) => {
  console.log(backgroundUrl);
  return (
    <section
      id='hero'
      style={{
        backgroundImage: `url(${backgroundUrl})`,
      }}
      className='relative  bg-no-repeat bg-center bg-cover flex items-center justify-between overflow-hidden text-ink-dark pt-[var(--site-header-h)] pb-14  md:pb-0 md:min-h-[700px]'
    >
      <div
        style={{
          backgroundImage: 'url("public/img/hero-bg-texture.avif")',
        }}
        className='bg-no-repeat bg-center bg-cover opacity-50 absolute w-full inset-0'
      ></div>

      <div className='flex md:flex-row flex-col hero-container mx-auto md:justify-center items-center text-center md:text-start container px-8'>
        <div className='mt-12 md:mt-0 md:w-1/2 z-10 p-4 my-8'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6'>
            {title}
          </h1>
          <p className='text-xl md:text-2xl text-black'>{description}</p>
          <Button className='mx-auto mt-4 md:mx-0'>{buttonText}</Button>
        </div>
        {heroType === 'form' ? (
          <ContactFormHero
            title='Nosotros te llamamos!'
            description='Envíanos tus datos y nosotros te contactamos'
            page='homepage'
          />
        ) : (
          <div className='flex justify-end items-center md:w-1/2 z-10 '>
            <ReactPlayer width={450} controls src={videoUrl} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

import Button from './Button';

import { ContactFormHero } from './ContactFormHero';

const Hero = () => {
  return (
    <section
      id='hero'
      style={{
        backgroundImage: 'url("/img/hero-bg-texture.avif")',
      }}
      className='relative bg-no-repeat bg-center bg-cover flex items-center justify-between overflow-hidden text-ink-dark pt-[var(--site-header-h)] pb-14 min-h-[70vh] md:pb-0 md:min-h-[100svh]'
    >
      <div className='bg-white opacity-50 absolute w-full inset-0'></div>

      <div className='flex md:flex-row flex-col hero-container mx-auto md:justify-center items-center text-center md:text-start container px-8'>
        <div className='mt-12 md:mt-0 md:w-1/2 z-10 p-4 my-8'>
          <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6'>
            Agencia de diseño web y marketing digital
          </h1>
          <p className='text-xl md:text-2xl text-black'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            quia veritatis voluptatibus, dicta id reprehenderit deserunt culpa
            corporis corrupti accusantium.
          </p>
          <Button className='mx-auto mt-4 md:mx-0'>LLÁMANOS</Button>
        </div>
        <ContactFormHero
          title='Nosotros te llamamos!'
          description='Envíanos tus datos y nosotros te contactamos'
          page='homepage'
        />
      </div>
    </section>
  );
};

export default Hero;

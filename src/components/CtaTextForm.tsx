import { ContactFormHero } from './ContactFormHero';

export const CtaTextForm = () => {
  return (
    <section className='container mx-auto flex flex-col md:flex-row-reverse md:gap-24 items-center justify-center md:px-12 px-6 py-20 md:py-24 md:min-h-[100vh]'>
      <div className='md:w-1/2 p-4'>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 leading-tight '>
          Desarrollamos webs pensado en la escalabilidad y el crecimiento de tu
          negocio.
        </h2>
        <p className='text-xl md:text-2xl text-black leading-relaxed'>
          En Pereiraweb somos directos: una web lenta o con errores es una fuga
          constante de dinero. Por eso, nuestra metodología en el desarrollo de
          tiendas online combina la arquitectura técnica más avanzada con un
          enfoque obsesivo en la conversión (CRO).
        </p>
        <img
          className='rounded-2xl'
          src='/img/web-design-charlesdeluvio.webp'
          alt='charles-deluvio'
        />
      </div>

      {/* <ContactFormHero /> */}
    </section>
  );
};

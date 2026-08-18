import { ContactFormHero } from './ContactFormHero';

export const CtaTextForm = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/img/hero-bg-texture.avif")',
      }}
      className='relative bg-no-repeat bg-center bg-cover'
    >
      <div className='bg-white opacity-50 absolute w-full inset-0'></div>
      <section className='container  mx-auto flex flex-col md:flex-row md:gap-24 items-center justify-center md:px-12 px-6 py-20 md: py-8    '>
        <ContactFormHero
          title='¿Ponemos tu proyecto en marcha?'
          description='Déjanos tus datos y organizamos una reunión de 15/20 minutos'
          page='CTA-HOME'
        />
        <div className='mt-12 md:mt-0 md:w-1/2 z-10 p-4 my-8'>
          {/* <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight '>
            Desarrollamos webs pensado en la escalabilidad y el crecimiento de
            tu negocio.
          </h2>
          <p className='text-xl md:text-2xl text-black leading-relaxed'>
            En Pereiraweb somos directos: una web lenta o con errores es una
            fuga constante de dinero. Por eso, nuestra metodología en el
            desarrollo de tiendas online combina la arquitectura técnica más
            avanzada con un enfoque obsesivo en la conversión (CRO).
          </p> */}

          <h2 className='text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6'>
            ¿Empezamos a montar tu proyecto?
          </h2>

          <div className='flex gap-4 mt-4'>
            <img
              className='rounded-2xl'
              src='/img/fikret-tozak-rfNLa1HL7eY-unsplash.jpg'
              alt='charles-deluvio'
            />
          </div>
        </div>
      </section>
    </div>
  );
};

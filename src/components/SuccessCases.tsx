import Button from './Button';

export const SuccessCases = () => {
  return (
    <section className='container mx-auto flex flex-col md:flex-row-reverse md:gap-24 items-center justify-center md:px-12 px-6 py-20 md:py-24    '>
      <div className='md:w-1/2 p-4'>
        <span className='bg-accent text-white text-md py-2 px-4 rounded-xl'>
          CASOS DE EXITO
        </span>
        <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-4 mb-12 leading-tight '>
          El caso de éxito de{' '}
          <span className='text-accent'>chicxsdelacalle</span> nuestro primer
          proyecto como pereiraweb
        </h2>
        <p className='text-xl md:text-2xl text-black leading-relaxed'>
          Te mostramos las estadisticas de la tienda online de chicxsdelacalle
          antes y después de montar su tienda online con pereiraweb. Desde sus
          ventas anuales en los diferentes años y su tráfico orgánico en
          google..
        </p>
        <Button className='text-white mt-4'>Ir al caso</Button>
      </div>
      <div className='md:w-1/2'>
        <img
          className='rounded-xl'
          src='/img/portfolio/mock-chicxs.png'
          alt='charles-deluvio'
        />
      </div>
    </section>
  );
};

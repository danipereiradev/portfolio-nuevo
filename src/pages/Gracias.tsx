import { usePageMeta } from '../hooks/usePageMeta';
import Button from '../components/Button';
import { FORM_THANKS_PATH } from '../config/contact';

const Gracias = () => {
  usePageMeta(FORM_THANKS_PATH);

  return (
    <section className='page-hero-compact'>
      <div className='container mx-auto max-w-2xl text-center'>
        <div className='page-title-block'>
          <h1 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Mensaje enviado
          </h1>
          <p className='text-lg text-ink-dark md:text-xl'>
            Hemos recibido tu mensaje. Te escribimos o te llamamos en breve
            para hablar de tu proyecto.
          </p>
        </div>
        <Button href='/' className='mt-8'>
          Volver al inicio
        </Button>
      </div>
    </section>
  );
};

export default Gracias;

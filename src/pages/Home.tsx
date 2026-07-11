import { useEffect } from 'react';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Pricing from '../components/Pricing';
import SEOProcess from '../components/SEOProcess';
import SEOFAQ from '../components/SEOFAQ';
import { usePageMeta } from '../hooks/usePageMeta';
import { globalFaqs } from '../data/globalFaqs';

const processSteps = [
  {
    number: '1',
    title: 'Nos cuentas qué necesitas',
    description:
      'Analizamos tu negocio, tus objetivos, tus referencias y las necesidades reales del proyecto.',
  },
  {
    number: '2',
    title: 'Preparamos una propuesta',
    description:
      'Recibes una propuesta clara con alcance, plazos, precio cerrado y opciones de pago.',
  },
  {
    number: '3',
    title: 'Diseñamos y desarrollamos',
    description:
      'Construimos la web cuidando estructura, diseño, rendimiento, adaptación móvil y facilidad de uso.',
  },
  {
    number: '4',
    title: 'Publicamos y acompañamos',
    description:
      'Publicamos el proyecto y te acompañamos en los primeros pasos para que puedas usarlo con seguridad.',
  },
];

const Home = () => {
  usePageMeta('/');

  // Permite llegar directamente a una sección vía ancla en la URL
  // (ej. /#portfolio desde un enlace del footer en otra página). El scroll
  // nativo del navegador no funciona de forma fiable en esta SPA porque el
  // elemento con ese id todavía no existe cuando la página carga.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;

    const timeoutId = setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Pricing />
      <div id='proceso' className='scroll-mt-24'>
        <SEOProcess
          title='Un proceso claro desde el primer mensaje'
          steps={processSteps}
        />
      </div>
      <Portfolio />
      <Clients />
      <Testimonials />
      <div id='faq' className='scroll-mt-24'>
        <SEOFAQ title='Preguntas Frecuentes' faqs={globalFaqs} />
      </div>
      <ContactForm />
    </>
  );
};

export default Home;

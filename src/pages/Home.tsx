import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import SEOSection from '../components/SEOSection';
import ContactForm from '../components/ContactForm';
import Pricing from '../components/Pricing';
import { usePageMeta } from '../hooks/usePageMeta';

const Home = () => {
  usePageMeta({
    title: 'Desarrollo Web para Autónomos y Pymes desde 969€ | Dani Pereira',
    description:
      'Diseño y desarrollo de páginas web profesionales para autónomos y pequeños negocios. Web desde 969€ IVA incluido, entrega en 2-3 semanas y plan mensual disponible desde 129€/mes. +12 años de experiencia.',
    path: '/',
  });

  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Pricing />
      <Portfolio />
      <Clients />
      <Testimonials />
      <SEOSection />
      <ContactForm />
    </>
  );
};

export default Home;

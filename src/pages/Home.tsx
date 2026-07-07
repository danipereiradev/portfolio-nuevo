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
    title: 'Diseño y Desarrollo Web Freelance | Dani Pereira',
    description:
      'Desarrollo páginas web, tiendas online y aplicaciones web para autónomos, pymes y marcas. Webs profesionales desde 969€ IVA incluido y mantenimiento desde 60€/mes.',
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

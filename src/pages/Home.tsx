import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import SEOSection from '../components/SEOSection';
import ContactForm from '../components/ContactForm';
import Pricing from '../components/Pricing';

const Home = () => {
  return (
    <>
      <Hero />
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


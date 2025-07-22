import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Clients from './components/Clients';
import Testimonials from './components/Testimonials';
import SEOSection from './components/SEOSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Pricing from './components/Pricing';

function App() {
  return (
    <LanguageProvider>
      <div className='min-h-screen bg-white'>
        <Header />
        <Hero />
        <Services />
        <Pricing />
        <Portfolio />
        <Clients />
        <Testimonials />
        <SEOSection />
        <ContactForm />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

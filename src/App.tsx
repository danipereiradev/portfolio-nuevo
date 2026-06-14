import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTopButton from './components/BackToTopButton';
import ContactFormModal from './components/ContactFormModal';
import Home from './pages/Home';
import DisenoWeb from './pages/DisenoWeb';
import PaginasWebEmpresas from './pages/PaginasWebEmpresas';
import TiendasOnline from './pages/TiendasOnline';
import AplicacionesWeb from './pages/AplicacionesWeb';
import ServicioSEO from './pages/ServicioSEO';
import MantenimientoWeb from './pages/MantenimientoWeb';
import Contacto from './pages/Contacto';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname !== '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-white overflow-x-hidden'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/diseno-web' element={<DisenoWeb />} />
        <Route path='/paginas-web-empresas' element={<PaginasWebEmpresas />} />
        <Route path='/tiendas-online' element={<TiendasOnline />} />
        <Route path='/desarrollo-aplicaciones-web' element={<AplicacionesWeb />} />
        <Route path='/posicionamiento-web-seo' element={<ServicioSEO />} />
        <Route path='/mantenimiento-web' element={<MantenimientoWeb />} />
        <Route path='/contacto' element={<Contacto />} />
      </Routes>

      <Footer />

      {isLandingPage && <WhatsAppButton />}

      <BackToTopButton />

      <ContactFormModal />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ContactModalProvider>
        <AppContent />
      </ContactModalProvider>
    </LanguageProvider>
  );
}

export default App;

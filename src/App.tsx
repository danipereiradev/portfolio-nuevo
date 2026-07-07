import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import LandingHeader from './components/LandingHeader';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTopButton from './components/BackToTopButton';
import MobileStickyCTA from './components/MobileStickyCTA';
import ContactFormModal from './components/ContactFormModal';
import Home from './pages/Home';
import DisenoWeb from './pages/DisenoWeb';
import PaginasWebEmpresas from './pages/PaginasWebEmpresas';
import TiendasOnline from './pages/TiendasOnline';
import AplicacionesWeb from './pages/AplicacionesWeb';
import ServicioSEO from './pages/ServicioSEO';
import MantenimientoWeb from './pages/MantenimientoWeb';
import AuditoriaEcommerce from './pages/AuditoriaEcommerce';
import WebAutonomosPymes from './pages/WebAutonomosPymes';
import Contacto from './pages/Contacto';
import Gracias from './pages/Gracias';
import NotFound from './pages/NotFound';

const MINIMAL_NAV_ROUTES = ['/web-autonomos-pymes'];

function AppContent() {
  const location = useLocation();
  const isAdsLanding = MINIMAL_NAV_ROUTES.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-white overflow-x-hidden pb-16 md:pb-0'>
      {isAdsLanding ? <LandingHeader /> : <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/diseno-web' element={<DisenoWeb />} />
        <Route path='/paginas-web-empresas' element={<PaginasWebEmpresas />} />
        <Route path='/tiendas-online' element={<TiendasOnline />} />
        <Route path='/desarrollo-aplicaciones-web' element={<AplicacionesWeb />} />
        <Route path='/posicionamiento-web-seo' element={<ServicioSEO />} />
        <Route path='/mantenimiento-web' element={<MantenimientoWeb />} />
        <Route path='/auditoria-ecommerce' element={<AuditoriaEcommerce />} />
        <Route path='/web-autonomos-pymes' element={<WebAutonomosPymes />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/gracias' element={<Gracias />} />

        {/* Redirecciones de URLs antiguas/duplicadas a la ruta canónica */}
        <Route
          path='/landing-express'
          element={<Navigate to='/web-autonomos-pymes' replace />}
        />
        <Route
          path='/tienda-online'
          element={<Navigate to='/tiendas-online' replace />}
        />

        {/* Cualquier otra ruta no existente devuelve una 404 real */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />

      <WhatsAppButton />

      <BackToTopButton />

      <MobileStickyCTA />

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

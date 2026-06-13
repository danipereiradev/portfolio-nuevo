import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-white'>
      {/* Header condicional - mismo componente pero sin navMenu en landings */}
      <Header showNavMenu={!isLandingPage} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/diseno-web' element={<DisenoWeb />} />
        <Route path='/paginas-web-empresas' element={<PaginasWebEmpresas />} />
        <Route path='/tiendas-online' element={<TiendasOnline />} />
        <Route path='/aplicaciones-web' element={<AplicacionesWeb />} />
        <Route path='/seo' element={<ServicioSEO />} />
        <Route path='/mantenimiento-web' element={<MantenimientoWeb />} />
        <Route path='/contacto' element={<Contacto />} />
      </Routes>

      {/* Footer - mismo para todas las páginas */}
      <Footer />

      {/* WhatsApp Button - Solo en landings */}
      {isLandingPage && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;

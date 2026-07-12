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
import TiendasOnline from './pages/TiendasOnline';
import MantenimientoWeb from './pages/MantenimientoWeb';
import WebAutonomosPymes from './pages/WebAutonomosPymes';
import Contacto from './pages/Contacto';
import SobreElEstudio from './pages/SobreElEstudio';
import Gracias from './pages/Gracias';
import NotFound from './pages/NotFound';

const MINIMAL_NAV_ROUTES = ['/web-autonomos-pymes'];

// Quita la barra final (salvo en la raíz "/"), para que la detección de la
// landing de Ads no falle si la URL llega con "/" al final (p. ej.
// "/web-autonomos-pymes/" servida directamente como carpeta por el hosting).
const normalizePathname = (pathname: string): string =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

function AppContent() {
  const location = useLocation();
  const isAdsLanding = MINIMAL_NAV_ROUTES.includes(
    normalizePathname(location.pathname),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-white overflow-x-hidden pb-16 md:pb-0'>
      {isAdsLanding ? <LandingHeader /> : <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tiendas-online' element={<TiendasOnline />} />
        <Route path='/mantenimiento-web' element={<MantenimientoWeb />} />
        <Route path='/web-autonomos-pymes' element={<WebAutonomosPymes />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/sobre-el-estudio' element={<SobreElEstudio />} />
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
        <Route
          path='/about'
          element={<Navigate to='/sobre-el-estudio' replace />}
        />
        <Route
          path='/about-me'
          element={<Navigate to='/sobre-el-estudio' replace />}
        />
        <Route
          path='/sobre-mi'
          element={<Navigate to='/sobre-el-estudio' replace />}
        />
        <Route path='/contact' element={<Navigate to='/contacto' replace />} />

        {/* Páginas de servicio eliminadas: solo quedan las 3 landings
            principales (web-autonomos-pymes, tiendas-online,
            mantenimiento-web). El resto redirige a la landing más afín. */}
        <Route
          path='/paginas-web-empresas'
          element={<Navigate to='/web-autonomos-pymes' replace />}
        />
        <Route
          path='/diseno-web'
          element={<Navigate to='/web-autonomos-pymes' replace />}
        />
        <Route
          path='/desarrollo-aplicaciones-web'
          element={<Navigate to='/web-autonomos-pymes' replace />}
        />
        <Route
          path='/posicionamiento-web-seo'
          element={<Navigate to='/web-autonomos-pymes' replace />}
        />
        <Route
          path='/auditoria-ecommerce'
          element={<Navigate to='/tiendas-online' replace />}
        />

        {/* Cualquier otra ruta no existente devuelve una 404 real */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer minimal={isAdsLanding} />

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

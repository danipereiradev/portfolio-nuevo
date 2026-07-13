import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTopButton from './components/BackToTopButton';
import MobileStickyCTA from './components/MobileStickyCTA';
import ContactFormModal from './components/ContactFormModal';
import Home from './pages/Home';
import TiendasOnline from './pages/TiendasOnline';
import MantenimientoWeb from './pages/MantenimientoWeb';
import WebAutonomosPymes from './pages/WebAutonomosPymes';
import PaginasWebEmpresas from './pages/PaginasWebEmpresas';
import DisenoWeb from './pages/DisenoWeb';
import AplicacionesWeb from './pages/AplicacionesWeb';
import ServicioSEO from './pages/ServicioSEO';
import AuditoriaEcommerce from './pages/AuditoriaEcommerce';
import Contacto from './pages/Contacto';
import SobreElEstudio from './pages/SobreElEstudio';
import Gracias from './pages/Gracias';
import NotFound from './pages/NotFound';

function AppContent() {
  // La navegación entre páginas se hace con <a> normales (recarga real),
  // así que el navegador ya coloca el scroll donde corresponde (arriba, o
  // en el ancla si la URL lleva "#id") sin necesidad de forzarlo con JS.
  // Esto solo sigue afectando a las redirecciones internas de rutas
  // antiguas (<Navigate>) y a la página 404, que no necesitan reset de
  // scroll porque ya llegan desde una carga de página completa.

  return (
    <div className='min-h-screen bg-white overflow-x-hidden pb-16 md:pb-0'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tiendas-online' element={<TiendasOnline />} />
        <Route path='/mantenimiento-web' element={<MantenimientoWeb />} />
        <Route path='/web-autonomos-pymes' element={<WebAutonomosPymes />} />
        <Route path='/paginas-web-empresas' element={<PaginasWebEmpresas />} />
        <Route path='/diseno-web' element={<DisenoWeb />} />
        <Route
          path='/desarrollo-aplicaciones-web'
          element={<AplicacionesWeb />}
        />
        <Route path='/posicionamiento-web-seo' element={<ServicioSEO />} />
        <Route path='/auditoria-ecommerce' element={<AuditoriaEcommerce />} />
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

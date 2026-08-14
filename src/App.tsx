import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
/* import WhatsAppButton from './components/WhatsAppButton'; */
import BackToTopButton from './components/BackToTopButton';
import MobileStickyCTA from './components/MobileStickyCTA';
import ContactFormModal from './components/ContactFormModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import Home from './pages/Home';
import TiendasOnline from './pages/TiendasOnline';
import MantenimientoWeb from './pages/MantenimientoWeb';
import WebProfesionalAMedida from './pages/WebProfesionalAMedida';
import WebProfesional from './pages/WebProfesional';
import Contacto from './pages/Contacto';
import SobreElEstudio from './pages/SobreElEstudio';
import CondicionesDelProyecto from './pages/CondicionesDelProyecto';
import Faq from './pages/Faq';
import Gracias from './pages/Gracias';
import LegalDocument from './pages/LegalDocument';
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
        <Route
          path='/web-profesional-a-medida'
          element={<WebProfesionalAMedida />}
        />
        <Route path='/web-profesional' element={<WebProfesional />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/sobre-el-estudio' element={<SobreElEstudio />} />
        <Route
          path='/condiciones-del-proyecto'
          element={<CondicionesDelProyecto />}
        />
        <Route path='/preguntas-frecuentes' element={<Faq />} />
        <Route path='/ia' element={<Navigate to='/' replace />} />
        <Route path='/gracias' element={<Gracias />} />
        <Route
          path='/politica-de-privacidad'
          element={
            <LegalDocument page='privacy' path='/politica-de-privacidad' />
          }
        />
        <Route
          path='/terminos-y-condiciones'
          element={
            <LegalDocument page='terms' path='/terminos-y-condiciones' />
          }
        />
        <Route
          path='/politica-de-cookies'
          element={<LegalDocument page='cookies' path='/politica-de-cookies' />}
        />
        <Route
          path='/aviso-legal'
          element={<LegalDocument page='legal' path='/aviso-legal' />}
        />

        {/* Redirecciones de URLs antiguas/duplicadas a la ruta canónica */}
        <Route
          path='/web-profesional-360'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/web-profesional-negocios'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/web-a-medida'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/web-autonomos-pymes'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/landing-express'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/web-start'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/paginas-web-empresas'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/diseno-web'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/desarrollo-aplicaciones-web'
          element={<Navigate to='/web-profesional-a-medida' replace />}
        />
        <Route
          path='/posicionamiento-web-seo'
          element={<Navigate to='/' replace />}
        />
        <Route
          path='/auditoria-ecommerce'
          element={<Navigate to='/tiendas-online' replace />}
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

      {/* <WhatsAppButton /> */}

      <BackToTopButton />

      <MobileStickyCTA />

      <ContactFormModal />

      <ExitIntentPopup />
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

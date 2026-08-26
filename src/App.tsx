import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useScrollToHash } from './hooks/useScrollToHash';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import CrispChat from './components/CrispChat';
import LandingWeb from './pages/LandingWeb';
import LandingShop from './pages/LandingShop';
import LandingMaintenance from './pages/LandingMaintenance';
import DisenoWeb from './pages/DisenoWeb';
import TiendasOnline from './pages/TiendasOnline';
import MantenimientoWeb from './pages/MantenimientoWeb';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import LegalDocument from './pages/LegalDocument';
import Maintenance from './pages/Maintenance';
import Pago from './pages/Pago';
import PagoGracias from './pages/PagoGracias';
import {
  isMaintenanceActive,
  isMaintenancePreviewPath,
} from './config/maintenance';
import {
  ADS_LANDING_PATH,
  ADS_LANDING_PATH_N,
  ADS_MAINTENANCE_LANDING_PATH,
  ADS_SHOP_LANDING_PATH,
  ABOUT_PATH,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_PATH,
  SITE_WEB_PATH,
  SITE_WEB_PATH_ASCII,
} from './config/contact';
import { BLOG_PATH } from './blog/posts';

function isPaymentPath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return path === '/pago' || path.startsWith('/pago/');
}

function AppContent() {
  useScrollToHash();
  const { pathname } = useLocation();

  if (isPaymentPath(pathname)) {
    return (
      <>
        <Header hideNav />
        <Routes>
          <Route path='/pago/gracias' element={<PagoGracias />} />
          <Route path='/pago/:id' element={<Pago />} />
          <Route path='*' element={<Pago />} />
        </Routes>
      </>
    );
  }

  return (
    <div className='relative min-h-screen overflow-x-hidden bg-surface-base pb-16 md:pb-0'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={ABOUT_PATH} element={<Nosotros />} />
        <Route path={SITE_WEB_PATH} element={<DisenoWeb />} />
        <Route
          path={SITE_WEB_PATH_ASCII}
          element={<Navigate to={SITE_WEB_PATH} replace />}
        />
        <Route path={SITE_SHOP_PATH} element={<TiendasOnline />} />
        <Route
          path='/tienda-online'
          element={<Navigate to={SITE_SHOP_PATH} replace />}
        />
        <Route path={SITE_MAINTENANCE_PATH} element={<MantenimientoWeb />} />
        <Route path={BLOG_PATH} element={<Blog />} />
        <Route path={`${BLOG_PATH}/:slug`} element={<BlogPost />} />
        <Route path={ADS_LANDING_PATH} element={<LandingWeb />} />
        <Route
          path={ADS_LANDING_PATH_N}
          element={<Navigate to={ADS_LANDING_PATH} replace />}
        />
        <Route path={ADS_SHOP_LANDING_PATH} element={<LandingShop />} />
        <Route
          path='/landing-tienda-online'
          element={<Navigate to={ADS_SHOP_LANDING_PATH} replace />}
        />
        <Route
          path={ADS_MAINTENANCE_LANDING_PATH}
          element={<LandingMaintenance />}
        />
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
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

      <Footer />
      <ContactFormModal />
      <CrispChat />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();

  if (isMaintenanceActive || isMaintenancePreviewPath(pathname)) {
    return <Maintenance />;
  }

  return (
    <LanguageProvider>
      <ContactModalProvider>
        <AppContent />
      </ContactModalProvider>
    </LanguageProvider>
  );
}

export default App;

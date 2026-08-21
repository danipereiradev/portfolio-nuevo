import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import CrispChat from './components/CrispChat';
import LandingWeb from './pages/LandingWeb';
import DisenoWeb from './pages/DisenoWeb';
import TiendasOnline from './pages/TiendasOnline';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Home from './pages/Home';
import LegalDocument from './pages/LegalDocument';
import Maintenance from './pages/Maintenance';
import {
  isMaintenanceActive,
  isMaintenancePreviewPath,
} from './config/maintenance';
import {
  ADS_LANDING_PATH,
  ADS_LANDING_PATH_ASCII,
  SITE_SHOP_PATH,
  SITE_WEB_PATH,
  SITE_WEB_PATH_ASCII,
} from './config/contact';
import { BLOG_PATH } from './blog/posts';

function AppContent() {
  return (
    <div className='relative min-h-screen overflow-x-hidden bg-surface-base pb-16 md:pb-0'>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
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
        <Route path={BLOG_PATH} element={<Blog />} />
        <Route path={`${BLOG_PATH}/:slug`} element={<BlogPost />} />
        <Route path={ADS_LANDING_PATH} element={<LandingWeb />} />
        <Route
          path={ADS_LANDING_PATH_ASCII}
          element={<Navigate to={ADS_LANDING_PATH} replace />}
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
      <ExitIntentPopup />
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

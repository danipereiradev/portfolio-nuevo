import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useScrollToHash } from './hooks/useScrollToHash';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactFormModal from './components/ContactFormModal';
import CrispChat from './components/CrispChat';
import {
  isMaintenanceActive,
  isMaintenancePreviewPath,
} from './config/maintenance';
import {
  ADS_LANDING_PATH,
  ADS_LANDING_PATH_N,
  ADS_LAUNCH_LANDING_PATH,
  ADS_MAINTENANCE_LANDING_PATH,
  ADS_SHOP_LANDING_PATH,
  ABOUT_PATH,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_PATH,
  SITE_WEB_PATH,
  SITE_WEB_PATH_N,
} from './config/contact';
import { BLOG_PATH } from './blog/posts';
import {
  isPaymentOrThankYouPath,
  THANK_YOU_PAGES,
  type ThankYouVariant,
} from './config/payments';

const Home = lazy(() => import('./pages/Home'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const DisenoWeb = lazy(() => import('./pages/DisenoWeb'));
const TiendasOnline = lazy(() => import('./pages/TiendasOnline'));
const MantenimientoWeb = lazy(() => import('./pages/MantenimientoWeb'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const LandingWeb = lazy(() => import('./pages/LandingWeb'));
const LandingWebProfesional = lazy(
  () => import('./pages/LandingWebProfesional'),
);
const LandingShop = lazy(() => import('./pages/LandingShop'));
const LandingMaintenance = lazy(() => import('./pages/LandingMaintenance'));
const CondicionesDelProyecto = lazy(
  () => import('./pages/CondicionesDelProyecto'),
);
const LegalDocument = lazy(() => import('./pages/LegalDocument'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Pago = lazy(() => import('./pages/Pago'));
const PagoGracias = lazy(() => import('./pages/PagoGracias'));

const PageFallback = () => (
  <main
    className='min-h-[50vh] bg-surface-base'
    aria-busy='true'
    aria-live='polite'
  />
);

function AppContent() {
  useScrollToHash();
  const { pathname } = useLocation();

  if (isPaymentOrThankYouPath(pathname)) {
    return (
      <>
        <Header hideNav />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {(Object.keys(THANK_YOU_PAGES) as ThankYouVariant[]).map(
              (variant) => (
                <Route
                  key={variant}
                  path={THANK_YOU_PAGES[variant].path}
                  element={<PagoGracias variant={variant} />}
                />
              ),
            )}
            <Route path='/pago/:id' element={<Pago />} />
            <Route path='*' element={<Pago />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  return (
    <div className='relative min-h-svh bg-surface-base pb-16 md:pb-0'>
      <Header />

      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path={ABOUT_PATH} element={<Nosotros />} />
          <Route path={SITE_WEB_PATH} element={<DisenoWeb />} />
          <Route
            path={SITE_WEB_PATH_N}
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
          <Route
            path={ADS_LAUNCH_LANDING_PATH}
            element={<LandingWebProfesional />}
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
            path='/condiciones-del-proyecto'
            element={<CondicionesDelProyecto />}
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
      </Suspense>

      <Footer />
      <ContactFormModal />
      <CrispChat />
    </div>
  );
}

function App() {
  const { pathname } = useLocation();

  if (isMaintenanceActive || isMaintenancePreviewPath(pathname)) {
    return (
      <Suspense
        fallback={
          <main className='min-h-screen bg-ink-dark' aria-busy='true' />
        }
      >
        <Maintenance />
      </Suspense>
    );
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

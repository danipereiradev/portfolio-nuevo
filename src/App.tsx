import Breadcrumbs from './components/Breadcrumbs';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useScrollToHash } from './hooks/useScrollToHash';
import { useLandingScrollDepth } from './hooks/useLandingScrollDepth';
import { LanguageProvider } from './contexts/LanguageContext';
import { ContactModalProvider } from './contexts/ContactModalContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MeasurementConsent from './components/MeasurementConsent';
import ContactFormModal from './components/ContactFormModal';
import BackToTopButton from './components/BackToTopButton';
import WhatsAppButton from './components/WhatsAppButton';
import {
  isMaintenanceActive,
  isMaintenancePreviewPath,
} from './config/maintenance';
import {
  ADS_LANDING_PATH,
  ADS_LANDING_PATH_N,
  ADS_LAUNCH_LANDING_PATH,
  ADS_CUSTOM_WEB_LANDING_PATH,
  ADS_REAL_ESTATE_LANDING_PATH,
  ADS_MAINTENANCE_LANDING_PATH,
  ADS_MAINTENANCE_INFRA_LANDING_PATH,
  ADS_GOOGLE_ADS_LANDING_PATH,
  ADS_SHOP_LANDING_PATH,
  ABOUT_PATH,
  CONTACT_PATH,
  FORM_THANKS_PATH,
  SITE_MAINTENANCE_PATH,
  SITE_SHOP_PATH,
  SITE_APPS_PATH,
  SITE_WEB_PATH,
  SITE_WEB_PATH_N,
  PORTFOLIO_PATH,
  TALENT_PATH,
} from './config/contact';
import { BLOG_PATH } from './blog/posts';
import {
  isPaymentOrThankYouPath,
  THANK_YOU_PAGES,
  type ThankYouVariant,
} from './config/payments';

const LandingWebPsicologos = lazy(() => import('./pages/LandingWebPsicologos'));
const LandingWebAMedida = lazy(() => import('./pages/LandingWebAMedida'));
const TranquilidadCondiciones = lazy(() => import("./pages/TranquilidadCondiciones"));
const LandingTranquilidadDigital = lazy(() => import('./pages/LandingTranquilidadDigital'));
const Home = lazy(() => import('./pages/Home'));
const DisenoWeb = lazy(() => import('./pages/DisenoWeb'));
const DisenoWebLocal = lazy(() => import('./pages/DisenoWebLocal'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const TiendasOnline = lazy(() => import('./pages/TiendasOnline'));
const Aplicaciones = lazy(() => import('./pages/Aplicaciones'));
const MantenimientoWeb = lazy(() => import('./pages/MantenimientoWeb'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const LandingWebInmobiliarias = lazy(() => import('./pages/LandingWebInmobiliarias'));
const LandingShop = lazy(() => import('./pages/LandingShop'));
const LandingMaintenance = lazy(() => import('./pages/LandingMaintenance'));
const LandingGoogleAds = lazy(() => import('./pages/LandingGoogleAds'));
const LandingMaintenanceInfra = lazy(
  () => import('./pages/LandingMaintenanceInfra'),
);
const CondicionesDelProyecto = lazy(
  () => import('./pages/CondicionesDelProyecto'),
);
const LegalDocument = lazy(() => import('./pages/LegalDocument'));
const TrabajaConNosotros = lazy(() => import('./pages/TrabajaConNosotros'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Gracias = lazy(() => import('./pages/Gracias'));
const Maintenance = lazy(() => import('./pages/Maintenance'));
const Pago = lazy(() => import('./pages/Pago'));
const PagoGracias = lazy(() => import('./pages/PagoGracias'));
const SuscripcionGracias = lazy(() => import('./pages/SuscripcionGracias'));

const hasVisibleLaunchBootHero = () =>
  typeof document !== 'undefined' &&
  Boolean(document.querySelector('[data-lcp-boot-hero]:not([hidden])'));

const PageFallback = () => (
  <main
    className={`${
      hasVisibleLaunchBootHero()
        ? 'min-h-0'
        : 'min-h-[calc(100svh-var(--site-header-h))]'
    } bg-surface-base`}
    aria-busy='true'
    aria-live='polite'
  />
);

function AppContent() {
  useScrollToHash();
  useLandingScrollDepth();
  const { pathname } = useLocation();

  if (isPaymentOrThankYouPath(pathname)) {
    return (
      <>
        <Header hideNav />
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path='/pago/gracias/tranquilidad-digital' element={<SuscripcionGracias />} />
            {(Object.keys(THANK_YOU_PAGES) as ThankYouVariant[]).map(
              (variant) => (
                <Route
                  key={variant}
                  path={THANK_YOU_PAGES[variant].path}
                  element={<PagoGracias variant={variant} />}
                />
              ),
            )}
            <Route path='/pago/tranquilidad-digital' element={<TranquilidadCondiciones />} />
            <Route path='/pago/:id' element={<Pago />} />
            <Route path='*' element={<Pago />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  return (
    <>
      <div
        className={`relative bg-surface-base ${
          hasVisibleLaunchBootHero() ? '' : 'min-h-svh'
        }`}
      >
        <Header />
        <Breadcrumbs />

        <div className='overflow-x-clip'>
          <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/landing-web-psicologos' element={<LandingWebPsicologos />} />
            <Route path={ADS_CUSTOM_WEB_LANDING_PATH} element={<LandingWebAMedida />} />
            <Route path='/tranquilidad-digital' element={<LandingTranquilidadDigital />} />
            <Route path={ABOUT_PATH} element={<Nosotros />} />
            <Route path={SITE_WEB_PATH} element={<DisenoWeb />} />
            <Route
              path={`${SITE_WEB_PATH}/:ciudad`}
              element={<DisenoWebLocal />}
            />
            <Route
              path={SITE_WEB_PATH_N}
              element={<Navigate to={SITE_WEB_PATH} replace />}
            />
            <Route path={SITE_SHOP_PATH} element={<TiendasOnline />} />
            <Route path={SITE_APPS_PATH} element={<Aplicaciones />} />
            <Route
              path='/tienda-online'
              element={<Navigate to={SITE_SHOP_PATH} replace />}
            />
            <Route path={SITE_MAINTENANCE_PATH} element={<MantenimientoWeb />} />
            <Route path={BLOG_PATH} element={<Blog />} />
            <Route path={`${BLOG_PATH}/:slug`} element={<BlogPost />} />
            <Route
              path={ADS_LANDING_PATH}
              element={<Navigate to={ADS_CUSTOM_WEB_LANDING_PATH} replace />}
            />
            <Route
              path={ADS_LANDING_PATH_N}
              element={<Navigate to={ADS_CUSTOM_WEB_LANDING_PATH} replace />}
            />
            <Route
              path={ADS_LAUNCH_LANDING_PATH}
              element={<Navigate to={ADS_CUSTOM_WEB_LANDING_PATH} replace />}
            />
            <Route path={ADS_REAL_ESTATE_LANDING_PATH} element={<LandingWebInmobiliarias />} />
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
              path={ADS_GOOGLE_ADS_LANDING_PATH}
              element={<LandingGoogleAds />}
            />
            <Route
              path={ADS_MAINTENANCE_INFRA_LANDING_PATH}
              element={<LandingMaintenanceInfra />}
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
            <Route path={TALENT_PATH} element={<TrabajaConNosotros />} />
            <Route path={PORTFOLIO_PATH} element={<PortfolioPage />} />
            <Route path={CONTACT_PATH} element={<Contacto />} />
            <Route path={FORM_THANKS_PATH} element={<Gracias />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
      <ContactFormModal />
      <BackToTopButton />
      <WhatsAppButton />
    </div>
    </>
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
        <MeasurementConsent />
      </ContactModalProvider>
    </LanguageProvider>
  );
}

export default App;

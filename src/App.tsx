import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HeaderLanding from './components/HeaderLanding';
import FooterLanding from './components/FooterLanding';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import LandingExpress from './pages/LandingExpress';
import LandingAutonomos from './pages/LandingAutonomos';
import LandingTienda from './pages/LandingTienda';
import LandingApp from './pages/LandingApp';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname !== '/';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className='min-h-screen bg-white'>
      {/* Header condicional */}
      {isLandingPage ? <HeaderLanding /> : <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/landing-express' element={<LandingExpress />} />
        <Route path='/web-autonomos-pymes' element={<LandingAutonomos />} />
        <Route path='/tienda-online' element={<LandingTienda />} />
        <Route path='/aplicacion-web' element={<LandingApp />} />
      </Routes>

      {/* Footer condicional */}
      {isLandingPage ? <FooterLanding /> : <Footer />}

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

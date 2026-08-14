import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import ThankYouPlaySection from '../components/ThankYouPlaySection';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackThankYouView,
} from '../utils/analytics';
import { buildWhatsAppUrl } from '../config/contact';
import {
  clearFormSubmissionSuccess,
  hasFormSubmissionSuccess,
  shouldTrackThankYouView,
} from '../config/formSubmission';

const WHATSAPP_URL = buildWhatsAppUrl(
  'Hola, acabo de enviar el formulario de contacto y quiero comentar algo más sobre mi proyecto.',
);

/**
 * Página de confirmación tras enviar el formulario de contacto.
 *
 * Solo es accesible si existe un token de sesión escrito tras un envío
 * confirmado por Formspree. Visitas directas, bots o recargas sin token
 * se redirigen a inicio para no inflar conversiones de URL de destino.
 */
const Gracias = () => {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!hasFormSubmissionSuccess()) {
      navigate('/', { replace: true });
      return;
    }

    setAllowed(true);

    if (shouldTrackThankYouView()) {
      trackThankYouView();
    }

    // Tras un breve delay invalidamos el token: una recarga ya no cuenta
    // como nueva conversión. El delay evita el doble mount de StrictMode.
    const clearTimer = window.setTimeout(() => {
      clearFormSubmissionSuccess();
    }, 2500);

    const title = 'Gracias, hemos recibido tu mensaje | PereiraWeb';
    const description =
      'Hemos recibido tu mensaje. Te responderemos muy rápido.';

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    let robotsMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, follow');

    document.querySelector('link[rel="canonical"]')?.remove();

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.remove();
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute('content', description);

    return () => {
      window.clearTimeout(clearTimer);
      robotsMeta?.remove();
    };
  }, [navigate]);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('GraciasPage', 'Escríbenos por WhatsApp');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  if (!allowed) {
    return null;
  }

  return (
    <section className='min-h-[70vh] flex items-center justify-center px-6 py-24 text-center content-container'>
      <div className='max-w-lg mx-auto'>
        <div className='flex justify-center mb-6'>
          <div className='bg-accent rounded-2xl p-4 border-2 border-ink-dark shadow-[4px_4px_0_0_#1a1a1a]'>
            <CheckCircle2 className='w-14 h-14 text-white' />
          </div>
        </div>

        <h1 className='text-3xl md:text-5xl font-extrabold text-gray-900 mb-4'>
          Mensaje recibido
        </h1>

        <p className='text-gray-600 mb-2'>
          Lo miramos y te respondemos{' '}
          <span className='font-semibold text-gray-900'>pronto</span> con la
          propuesta o con lo que haga falta preguntarte.
        </p>

        <p className='text-gray-600 mb-8'>
          Revisa bandeja de entrada y spam. Si quieres ir más rápido, WhatsApp
          también vale.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={handleWhatsAppClick} variant='primary'>
            <MessageCircle className='w-4 h-4' />
            Escríbenos por WhatsApp
          </Button>
          <Button href='/#portfolio' variant='ghost'>
            Ver trabajos
          </Button>
        </div>

        <ThankYouPlaySection />
      </div>
    </section>
  );
};

export default Gracias;

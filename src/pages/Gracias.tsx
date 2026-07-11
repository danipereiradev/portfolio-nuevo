import { useEffect } from 'react';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import ThankYouPlaySection from '../components/ThankYouPlaySection';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { buildWhatsAppUrl } from '../config/contact';

const WHATSAPP_URL = buildWhatsAppUrl(
  'Hola, acabo de enviar el formulario de contacto y quiero comentar algo más sobre mi proyecto.',
);

/**
 * Página de confirmación tras enviar el formulario de contacto.
 *
 * Tiene ruta propia (/gracias) para poder usarse como "URL de destino" de
 * conversión en Google Ads/Analytics, además de servir de confirmación
 * visual clara para el usuario. Se marca como noindex: no aporta valor en
 * buscadores y no queremos que nadie llegue aquí "en frío" desde Google.
 */
const Gracias = () => {
  useEffect(() => {
    const title = 'Gracias, hemos recibido tu mensaje | PereiraWeb';
    const description =
      'Hemos recibido tu mensaje. Te responderemos en un máximo de 2 horas.';

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
      robotsMeta?.remove();
    };
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('GraciasPage', 'Escríbenos por WhatsApp');
    trackGoogleAdsWhatsAppConversion(WHATSAPP_URL);
  };

  return (
    <section className='min-h-[70vh] flex items-center justify-center px-6 py-24 text-center content-container'>
      <div className='max-w-lg mx-auto'>
        <div className='flex justify-center mb-6'>
          <div className='bg-green-100 rounded-full p-4'>
            <CheckCircle2 className='w-14 h-14 text-green-600' />
          </div>
        </div>

        <h1 className='text-3xl md:text-5xl font-bold text-gray-900 mb-4'>
          Gracias, hemos recibido tu mensaje
        </h1>

        <p className='text-gray-600 mb-2'>
          Revisaremos la información y te responderemos en un plazo máximo
          de <span className='font-semibold text-gray-900'>2 horas</span>{' '}
          con tu propuesta.
        </p>

        <p className='text-gray-600 mb-8'>
          Revisa tu bandeja de entrada (y la carpeta de spam) por si acaso. Si
          quieres avanzar más rápido, también puedes escribirnos directamente
          por WhatsApp.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={handleWhatsAppClick} variant='primary'>
            <MessageCircle className='w-4 h-4' />
            Escríbenos por WhatsApp
          </Button>
          <Button to='/#portfolio' variant='ghost'>
            Ver trabajos
          </Button>
        </div>

        <ThankYouPlaySection />
      </div>
    </section>
  );
};

export default Gracias;

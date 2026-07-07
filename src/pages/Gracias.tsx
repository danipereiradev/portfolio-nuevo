import { useEffect } from 'react';
import { CheckCircle2, Home as HomeIcon, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import { trackWhatsAppClick } from '../utils/analytics';

const WHATSAPP_URL =
  'https://wa.me/34644669828?text=Hola,%20acabo%20de%20enviar%20el%20formulario%20de%20presupuesto';

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
    const title = 'Gracias por tu solicitud | Dani Pereira';
    const description =
      'Hemos recibido tu solicitud de presupuesto. Te responderemos en menos de 24 horas.';

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
    trackWhatsAppClick('GraciasPage', 'Escribir por WhatsApp');
    window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
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
          ¡Gracias! Solicitud enviada
        </h1>

        <p className='text-gray-600 mb-2'>
          He recibido tu solicitud correctamente. Te responderé en un plazo
          máximo de <span className='font-semibold text-gray-900'>24 horas</span>{' '}
          con tu propuesta.
        </p>

        <p className='text-gray-600 mb-8'>
          Revisa tu bandeja de entrada (y la carpeta de spam) por si acaso. Si
          prefieres una respuesta más rápida, también puedes escribirme
          directamente por WhatsApp.
        </p>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={handleWhatsAppClick} variant='primary'>
            <MessageCircle className='w-4 h-4' />
            Escribir por WhatsApp
          </Button>
          <Button to='/' variant='ghost'>
            <HomeIcon className='w-4 h-4' />
            Volver al inicio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gracias;

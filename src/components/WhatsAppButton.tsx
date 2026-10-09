import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
  trackMaintenanceWhatsAppClick,
  trackPhoneClick,
} from '../utils/analytics';
import {
  buildWhatsAppUrl,
  getWhatsAppMessageForPath,
  isAdsMaintenanceLandingPath,
  isHomePath,
  isAdsLaunchLandingPath,
  isLegalPath,
  isFormThanksPath,
  PHONE_TEL_LINK,
  ADS_CUSTOM_WEB_LANDING_PATH,
} from '../config/contact';

function CustomWebContactBar() {
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const update = () => setEditing(Boolean(document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')));
    document.addEventListener('focusin', update);
    document.addEventListener('focusout', update);
    return () => {
      document.removeEventListener('focusin', update);
      document.removeEventListener('focusout', update);
    };
  }, []);
  const url = buildWhatsAppUrl(getWhatsAppMessageForPath(ADS_CUSTOM_WEB_LANDING_PATH));
  return (
    <>
      <style>{`@media (max-width: 767px) { body { padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px)); } }`}</style>
      <nav aria-label='Contactar con 36WEB' hidden={editing} className={`${editing ? 'hidden' : 'flex'} md:hidden fixed bottom-0 inset-x-0 z-40 gap-3 border-t border-gray-200 bg-white px-4 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]`} style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}>
        <a href={url} target='_blank' rel='noopener noreferrer' onClick={(event) => {
          event.preventDefault();
          trackWhatsAppClick('CustomWebMobileBar');
          trackGoogleAdsWhatsAppConversion(url);
        }} className='flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-[#128C4A] px-3 py-3 font-bold text-white'>
          <MessageCircle className='h-5 w-5' aria-hidden='true' /> WhatsApp
        </a>
        <a href={PHONE_TEL_LINK} onClick={() => trackPhoneClick('CustomWebMobileBar')} className='flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border-2 border-accent px-3 py-3 font-bold text-accent'>
          <Phone className='h-5 w-5' aria-hidden='true' /> Llamar
        </a>
      </nav>
    </>
  );
}

const WhatsAppButton = () => {
  const { pathname } = useLocation();

  if (pathname.replace(/\/$/, '') === ADS_CUSTOM_WEB_LANDING_PATH.replace(/\/$/, '')) {
    return <CustomWebContactBar />;
  }

  if (
    isHomePath(pathname) ||
    isLegalPath(pathname) ||
    isFormThanksPath(pathname)
  )
    return null;

  const message = getWhatsAppMessageForPath(pathname);
  const whatsappUrl = buildWhatsAppUrl(message);

  const openWhatsApp = () => {
    trackWhatsAppClick('LandingMobileBubble', message);
    if (isAdsMaintenanceLandingPath(pathname)) {
      trackMaintenanceWhatsAppClick('LandingMobileBubble');
    }
    trackGoogleAdsWhatsAppConversion(whatsappUrl);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-40 ${isAdsLaunchLandingPath(pathname) ? '' : 'md:hidden'}`}>
      <a
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        onClick={(e) => {
          e.preventDefault();
          openWhatsApp();
        }}
        className='flex rounded-full bg-[#25D366] p-4 text-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:bg-[#20bd5a]'
        aria-label='Escríbenos por WhatsApp'
      >
        <svg
          className='h-6 w-6'
          fill='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;

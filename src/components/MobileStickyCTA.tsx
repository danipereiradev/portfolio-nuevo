import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { trackWhatsAppClick } from '../utils/analytics';
import {
  ADS_WHATSAPP_MESSAGE,
  DEFAULT_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';

const MobileStickyCTA = () => {
  const { pathname } = useLocation();
  const isAdsLanding = pathname === '/web-autonomos-pymes';
  const whatsappUrl = buildWhatsAppUrl(
    isAdsLanding ? ADS_WHATSAPP_MESSAGE : DEFAULT_WHATSAPP_MESSAGE,
  );

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      onClick={() => trackWhatsAppClick('MobileStickyBar')}
      className='md:hidden fixed bottom-0 left-0 right-0 z-40 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2 py-3 font-semibold text-sm shadow-[0_-4px_12px_rgba(0,0,0,0.15)]'
      aria-label='Presupuesto por WhatsApp'
    >
      <MessageCircle className='w-5 h-5' />
      Presupuesto por WhatsApp
    </a>
  );
};

export default MobileStickyCTA;

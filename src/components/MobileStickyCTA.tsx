import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

const WHATSAPP_URL =
  'https://wa.me/34644669828?text=Hola,%20quiero%20pedir%20presupuesto%20para%20mi%20web';

const MobileStickyCTA = () => {
  return (
    <a
      href={WHATSAPP_URL}
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

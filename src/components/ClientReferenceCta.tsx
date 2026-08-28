import Button from './Button';
import {
  buildWhatsAppUrl,
  CLIENT_REFERENCE_WHATSAPP_MESSAGE,
} from '../config/contact';
import { trackContactClientReference } from '../utils/analytics';

const ClientReferenceCta = () => {
  const href = buildWhatsAppUrl(CLIENT_REFERENCE_WHATSAPP_MESSAGE);

  return (
    <aside className='w-full max-w-md rounded-lg bg-surface-muted p-content-pad text-center md:text-left'>
      <p className='text-lg font-extrabold text-ink-dark md:text-xl'>
        ¿Quieres preguntarle tú mismo?
      </p>
      <p className='mt-text-gap text-base text-ink-dark md:text-lg'>
        Juanvi ha autorizado que futuros clientes contacten con nosotros para
        conocer de primera mano cómo fue su experiencia trabajando con 36web.
      </p>
      <p className='mt-text-gap text-sm text-ink-medium md:text-base'>
        Nos escribes primero. Si el contacto es real y Juanvi está disponible,
        te ponemos en un grupo.
      </p>
      <Button
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        variant='ghost'
        className='mt-content-gap !mx-auto border-2 border-ink-dark bg-white hover:!bg-ink-dark hover:!text-white md:!mx-0'
        onClick={() => trackContactClientReference()}
      >
        Hablar con un cliente
      </Button>
    </aside>
  );
};

export default ClientReferenceCta;

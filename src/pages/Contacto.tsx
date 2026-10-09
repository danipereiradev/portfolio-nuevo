import { useMemo } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import ContactPageForm from '../components/ContactPageForm';
import { useJsonLd } from '../hooks/useJsonLd';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  BUSINESS_HOURS_LABEL,
  CONTACT_EMAIL,
  CONTACT_PATH,
  PHONE_DISPLAY,
  PHONE_TEL_LINK,
  buildWhatsAppUrl,
  CONTACT_PAGE_WHATSAPP_MESSAGE,
} from '../config/contact';
import {
  trackEmailClick,
  trackPhoneClick,
  trackWhatsAppClick,
} from '../utils/analytics';

const SITE_URL = 'https://36web.es';

const Contacto = () => {
  usePageMeta(CONTACT_PATH);
  const whatsappUrl = buildWhatsAppUrl(CONTACT_PAGE_WHATSAPP_MESSAGE);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Inicio',
              item: `${SITE_URL}/`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Contacto',
              item: `${SITE_URL}${CONTACT_PATH}/`,
            },
          ],
        },
        {
          '@type': 'ContactPage',
          name: 'Contacto | 36web',
          url: `${SITE_URL}${CONTACT_PATH}/`,
          description:
            'Cuéntanos tu proyecto. Te respondemos con una propuesta, con precio y plazos por escrito.',
        },
      ],
    }),
    [],
  );

  useJsonLd('jsonld-contacto', jsonLd);

  return (
    <section className='page-section pt-[calc(var(--site-header-h)+var(--page-hero-offset)+1rem)]'>
      <div className='container mx-auto flex max-w-5xl flex-col items-center gap-page-gap'>
        <aside className='flex w-full max-w-2xl flex-col items-center gap-6 text-center'>
          <div className='page-title-block'>
            <h1 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
              Hablemos de tu proyecto
            </h1>
            <p className='text-lg text-ink-dark md:text-xl'>
              Formulario, email, teléfono o WhatsApp. Te respondemos con una
              propuesta. Sin compromiso.
            </p>
          </div>
          <ul className='space-y-4 text-ink-dark'>
            <li>
              <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => trackEmailClick('ContactPage')}
                className='inline-flex items-center gap-2 font-semibold hover:text-accent'
              >
                <Mail className='h-5 w-5 text-accent' />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
                Teléfono
              </p>
              <a
                href={PHONE_TEL_LINK}
                onClick={() => trackPhoneClick('ContactPage')}
                className='inline-flex items-center gap-2 font-semibold hover:text-accent'
              >
                <Phone className='h-5 w-5 text-accent' />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
                WhatsApp
              </p>
              <a
                href={whatsappUrl}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() =>
                  trackWhatsAppClick(
                    'ContactPage',
                    CONTACT_PAGE_WHATSAPP_MESSAGE,
                  )
                }
                className='inline-flex items-center gap-2 font-semibold hover:text-accent'
              >
                <MessageCircle className='h-5 w-5 text-accent' />
                Escríbenos por WhatsApp
              </a>
            </li>
            <li>
              <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>
                Horario
              </p>
              <p className='font-semibold'>{BUSINESS_HOURS_LABEL}</p>
            </li>
          </ul>
        </aside>
        <div className='w-full md:w-1/2'>
          <ContactPageForm />
        </div>
      </div>
    </section>
  );
};

export default Contacto;

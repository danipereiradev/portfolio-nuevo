import { MessageCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import FloatingRobot from '../components/decor/FloatingRobot';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Button from '../components/Button';
import { useContactModal } from '../contexts/ContactModalContext';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import { IA_PAGE_WHATSAPP_MESSAGE, buildWhatsAppUrl } from '../config/contact';

const IA_WHATSAPP_URL = buildWhatsAppUrl(IA_PAGE_WHATSAPP_MESSAGE);
const IA_PLAN = 'Web con IA';

const realities = [
  {
    title: 'No son minutos. Son horas… y luego días.',
    text: 'Un pantallazo sale rápido. Una web publicada, con dominio, formularios que funcionan y móvil decente, casi nunca. La IA acelera el borrador; no sustituye dejarla lista de verdad.',
  },
  {
    title: 'Sin criterio técnico, es difícil saber qué pedir.',
    text: 'Sin base de desarrollo, es fácil aceptar respuestas que “parecen” correctas. Un cambio rompe otro. El chat avanza, pero no sabes si vas bien o estás parcheando a ciegas.',
  },
  {
    title: 'Diseño genérico y poco creíble.',
    text: 'Muchas webs solo con prompts se parecen: tipografías típicas, bloques vacíos. En un negocio se nota. Y arreglarlo a base de más IA suele alargar el lío.',
  },
  {
    title: 'SEO, velocidad, seguridad y legal no salen solos.',
    text: 'Metadatos, rendimiento, formularios, cookies, privacidad… la IA ayuda si sabes qué pedir. Si no, queda bonita en el portátil y floja en Google, móvil y confianza.',
  },
  {
    title: 'Publicar ≠ tener una web que vende.',
    text: 'Hace falta mensaje claro, qué ofreces y cómo contactarte. Eso se decide; no se improvisa con un prompt. Si se decide mal al inicio, se paga después en tiempo y cambios.',
  },
  {
    title: 'El atajo caro: llamar cuando ya está roto.',
    text: 'Pasa a menudo: semanas de idas y venidas y acabas llamando a alguien… con una base difícil de aprovechar. Pagas el proyecto y el tiempo perdido.',
  },
];

const whenItMakesSense = [
  'Probar ideas, bocetos o textos iniciales.',
  'Aprender sin prisa ni presión comercial.',
  'Usarla junto a alguien que sepa revisar, publicar y mantener.',
];

const whenItDoesNot = [
  'Necesitas clientes de verdad este mes.',
  'No quieres convertirte en mini-desarrollador.',
  'El negocio necesita claridad y que no se rompa al tocar una cosa.',
];

const Ia = () => {
  usePageMeta('/ia');
  const { openModal } = useContactModal();

  const openHelpForm = () => openModal(IA_PLAN);

  const handleWhatsAppHelp = () => {
    trackWhatsAppClick('IaPageHelp', 'Web con IA');
    trackGoogleAdsWhatsAppConversion(IA_WHATSAPP_URL);
  };

  return (
    <>
      <section className='relative flex items-center justify-center overflow-hidden pt-[var(--site-header-h)] pb-14 min-h-[65vh] md:pb-0 md:min-h-[100svh]'>
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: "url('/img/web-design-charlesdeluvio.webp')",
          }}
          aria-hidden='true'
        />
        <div className='absolute inset-0 bg-ink-dark/60' aria-hidden='true' />

        <FloatingRobot
          variant='happy'
          tilt={-8}
          className='absolute top-28 right-4 sm:right-8 lg:right-[8%] z-0 opacity-40 sm:opacity-70 hidden sm:block'
        />

        <div className='relative z-10 w-full mx-auto max-w-screen-2xl px-6'>
          <div className='max-w-2xl md:max-w-3xl mx-auto text-center'>
            <p className='text-accent font-mono text-sm md:text-base font-semibold tracking-tight mb-5'>
              ¿Vas a crear tu web con IA?
            </p>
            <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight'>
              «¿Para qué pagar si lo hago en minutos con la IA?»
            </h1>
            <p className='text-base md:text-xl text-white/85 leading-relaxed mx-auto max-w-2xl'>
              Buena pregunta. La IA saca un primer diseño en minutos. Dejarla
              publicada, usable y lista para que te escriban es otra historia.
            </p>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-5'>
              ¿Ya hay una web empezada con IA?
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium leading-relaxed mb-4'>
              Puede que exista una primera versión, pero todavía falten ajustes
              de diseño, móvil, formularios, dominio, velocidad o publicación.
            </p>
            <p className='text-base md:text-lg text-gray-700 font-medium leading-relaxed mb-8'>
              Revisamos lo hecho, te decimos qué se salva y te ayudamos a
              terminar una web usable de verdad.
            </p>
            <div className='flex flex-col sm:flex-row justify-center gap-4'>
              <Button
                onClick={openHelpForm}
                variant='primary'
                className='text-sm md:text-base'
              >
                Empecé mi web con IA y necesito ayuda para terminarla
              </Button>
              <Button
                type='button'
                onClick={handleWhatsAppHelp}
                variant='ghost'
                className='!bg-ink-dark !text-white hover:!bg-black text-sm md:text-base'
              >
                <MessageCircle className='w-5 h-5' />
                Hablar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-gray-50 border-y-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-5'>
              PereiraWeb no está en contra de la IA
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium leading-relaxed mb-4'>
              En el estudio también se utiliza. Acelera borradores, ayuda a
              pensar opciones y ahorra tiempo cuando se sabe qué pedir y qué
              revisar. El problema no es la herramienta.
            </p>
            <p className='text-base md:text-lg text-gray-700 font-medium leading-relaxed'>
              El problema es creer que, sin criterio de diseño y desarrollo, una
              web de negocio se resuelve con un chat y un clic en publicar.
            </p>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto mb-12 text-center'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-4'>
              Lo que conviene tener claro antes de empezar
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium'>
              Si se va a hacer con IA sin experiencia técnica, al menos conviene
              ir con los ojos abiertos.
            </p>
          </div>

          <div className='max-w-3xl mx-auto space-y-10'>
            {realities.map((item, index) => (
              <div key={item.title}>
                <p className='text-accent font-bold text-sm uppercase tracking-wide mb-2'>
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-3'>
                  {item.title}
                </h3>
                <p className='text-base md:text-lg text-gray-700 leading-relaxed'>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-gray-50 border-y-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center mb-12'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-4'>
              El guion que se repite
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium'>
              No siempre. Pero lo bastante a menudo como para contarlo.
            </p>
          </div>

          <ol className='max-w-3xl mx-auto space-y-6'>
            {[
              '«En 10 minutos tengo la home.»',
              '«Solo falta el formulario… y el móvil… y el dominio.»',
              '«He tocado una cosa y se ha roto otra.»',
              '«Llevo una semana y aún no está como la imaginaba.»',
              '«Al final tendré que llamar a alguien.»',
            ].map((line, index) => (
              <li key={line} className='flex gap-4 items-start'>
                <span className='flex-shrink-0 w-10 h-10 rounded-full bg-ink-dark text-white flex items-center justify-center font-bold border-2 border-ink-dark shadow-[3px_3px_0_0_#14b8a6]'>
                  {index + 1}
                </span>
                <p className='text-base md:text-xl text-gray-800 font-medium pt-2'>
                  {line}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16'>
            <div>
              <h2 className='text-2xl md:text-3xl font-extrabold text-gray-900 mb-6'>
                Cuando sí tiene sentido
              </h2>
              <ul className='space-y-4 text-base md:text-lg text-gray-700'>
                {whenItMakesSense.map((item) => (
                  <li key={item} className='flex gap-3'>
                    <span className='text-accent font-bold flex-shrink-0'>
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className='text-2xl md:text-3xl font-extrabold text-gray-900 mb-6'>
                Cuando suele salir caro
              </h2>
              <ul className='space-y-4 text-base md:text-lg text-gray-700'>
                {whenItDoesNot.map((item) => (
                  <li key={item} className='flex gap-3'>
                    <span className='text-accent font-bold flex-shrink-0'>
                      ·
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-gray-50 border-y-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-5'>
              Entonces, ¿por qué pagar por una web?
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium leading-relaxed mb-4'>
              No se paga por “escribir código a mano como si fuera 2012”. Se
              paga por criterio: estructura, mensaje, diseño, publicación, base
              técnica y un resultado que no haya que pelear cada semana.
            </p>
            <p className='text-base md:text-lg text-gray-700 font-medium leading-relaxed'>
              La IA puede formar parte del proceso. Lo que no debería ser es el
              único plan cuando el negocio depende de esa web.
            </p>
          </div>
        </div>
      </section>

      <SEOCTAFinal
        title='Si quieres una web hecha, no solo generada'
        subtitle='Cuéntanos el caso. Te diremos si encaja un plan, un proyecto a medida… o si aún te conviene seguir por tu cuenta.'
        buttonText='Empecé mi web con IA y necesito ayuda para terminarla'
        onButtonClick={openHelpForm}
        secondaryButtonText='Hablar por WhatsApp'
        onSecondaryButtonClick={handleWhatsAppHelp}
      />
    </>
  );
};

export default Ia;

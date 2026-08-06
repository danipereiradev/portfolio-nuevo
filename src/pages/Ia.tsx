import { MessageCircle } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import GlowBackdrop from '../components/decor/GlowBackdrop';
import FloatingRobot from '../components/decor/FloatingRobot';
import SEOCTAFinal from '../components/SEOCTAFinal';
import Button from '../components/Button';
import { useContactModal } from '../contexts/ContactModalContext';
import {
  trackWhatsAppClick,
  trackGoogleAdsWhatsAppConversion,
} from '../utils/analytics';
import {
  IA_PAGE_WHATSAPP_MESSAGE,
  buildWhatsAppUrl,
} from '../config/contact';

const IA_WHATSAPP_URL = buildWhatsAppUrl(IA_PAGE_WHATSAPP_MESSAGE);
const IA_PLAN = 'Web con IA';

const realities = [
  {
    title: 'No son minutos. Son horas… y luego días.',
    text: 'Generar un primer pantallazo puede ser rápido. Tener una web publicada, con dominio, formularios que funcionen, móvil bien resuelto y sin errores raros, casi nunca lo es. La IA acelera el borrador; no sustituye el trabajo de dejarla lista de verdad.',
  },
  {
    title: 'Sin criterio técnico, es difícil saber qué pedir.',
    text: 'Sin base de desarrollo, es fácil aceptar respuestas que “parecen” correctas. Un cambio pequeño rompe otro. Se pide un arreglo y aparecen tres nuevos. El chat avanza, pero sin criterio técnico no hay forma clara de saber si el proyecto va bien o se está parcheando a ciegas.',
  },
  {
    title: 'Diseño genérico y poco creíble.',
    text: 'Muchas webs hechas solo con prompts se parecen entre sí: tipografías tipicas, bloques genéricos, textos vacíos. Para un negocio que necesita transmitir confianza, eso se nota. Y corregirlo “a base de más IA” suele alargar el proceso en vez de resolverlo.',
  },
  {
    title: 'SEO, velocidad, seguridad y legal no salen solos.',
    text: 'Metadatos, rendimiento, formularios seguros, cookies, privacidad, estructura indexable… la IA puede ayudar si se sabe qué pedir y qué revisar. Si no, la web queda “bonita en el portátil” y floja donde importa: Google, móvil, confianza y conversión.',
  },
  {
    title: 'Publicar no es lo mismo que tener una web que vende.',
    text: 'Una web útil ordena el mensaje, deja claro qué ofrece el negocio, facilita el contacto y está pensada para el cliente final. Eso no se improvisa con un prompt. Se decide. Y si no se decide bien al principio, se paga después en tiempo, cambios y frustración.',
  },
  {
    title: 'El atajo caro: contratar cuando ya está roto.',
    text: 'No pasa en todos los casos, pero sí en muchos: tras semanas de idas y venidas, se acaba llamando a un profesional… con una base difícil de aprovechar. Entonces no solo se paga el proyecto: también el tiempo perdido intentando ahorrarlo.',
  },
];

const whenItMakesSense = [
  'Probar ideas, bocetos o textos iniciales.',
  'Aprender y experimentar sin prisa ni presión comercial.',
  'Usarla junto a un equipo que sepa revisar, publicar y mantener.',
];

const whenItDoesNot = [
  'Se necesita una web para captar clientes de verdad este mes.',
  'No hay tiempo ni ganas de convertirse en mini-desarrollador.',
  'El negocio necesita confianza, claridad y que no se rompa al cambiar una cosa.',
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
      <section className='relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 pb-16'>
        <GlowBackdrop />

        <FloatingRobot
          variant='happy'
          tilt={-8}
          className='absolute top-24 -left-6 sm:top-28 sm:left-0 lg:left-[7%] z-0 opacity-50 sm:opacity-70 lg:opacity-100'
        />
        <FloatingRobot
          variant='glitch'
          tilt={9}
          float='slower'
          className='absolute bottom-10 -right-6 sm:bottom-14 sm:right-0 lg:right-[7%] z-0 opacity-50 sm:opacity-70 lg:opacity-100'
        />

        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
            Tu web con IA
          </span>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight'>
            «¿Para qué pagar si lo hago en minutos con la IA?»
          </h1>
          <p className='text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
            Buena pregunta. Esta página no va contra la inteligencia artificial.
            Explica lo que suele pasar cuando se monta una web sin conocimiento
            técnico… y se descubre que no eran minutos.
          </p>
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
              En PereiraWeb se revisa lo hecho, se indica qué se puede aprovechar
              y se ayuda a convertirlo en una web profesional y lista para
              trabajar.
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
                Cuándo sí tiene sentido
              </h2>
              <ul className='space-y-4 text-base md:text-lg text-gray-700'>
                {whenItMakesSense.map((item) => (
                  <li key={item} className='flex gap-3'>
                    <span className='text-accent font-bold flex-shrink-0'>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className='text-2xl md:text-3xl font-extrabold text-gray-900 mb-6'>
                Cuándo suele salir caro
              </h2>
              <ul className='space-y-4 text-base md:text-lg text-gray-700'>
                {whenItDoesNot.map((item) => (
                  <li key={item} className='flex gap-3'>
                    <span className='text-accent font-bold flex-shrink-0'>·</span>
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
        title='Si se busca una web hecha, no solo generada'
        subtitle='Cuéntanos el caso. Desde PereiraWeb se indica con claridad si encaja un pack, un proyecto a medida… o si aún conviene experimentar por cuenta propia.'
        buttonText='Empecé mi web con IA y necesito ayuda para terminarla'
        onButtonClick={openHelpForm}
        secondaryButtonText='Hablar por WhatsApp'
        onSecondaryButtonClick={handleWhatsAppHelp}
      />
    </>
  );
};

export default Ia;

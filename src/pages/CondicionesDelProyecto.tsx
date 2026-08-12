import { usePageMeta } from '../hooks/usePageMeta';
import GlowBackdrop from '../components/decor/GlowBackdrop';
import SEOProcess from '../components/SEOProcess';
import SEOCTAFinal from '../components/SEOCTAFinal';
import { useContactModal } from '../contexts/ContactModalContext';

const processSteps = [
  {
    number: '1',
    title: 'Briefing y propuesta',
    description:
      'Nos cuentas qué necesitas. Te mandamos precio, plazos y forma de trabajo por escrito.',
  },
  {
    number: '2',
    title: 'Arranque',
    description:
      'Aceptas, pagas el inicial y bloqueamos fechas. Si faltan textos, te ayudamos a ordenarlos.',
  },
  {
    number: '3',
    title: 'Diseño y desarrollo',
    description:
      'Montamos estructura, diseño, textos e imágenes según lo acordado. Vas viendo avances.',
  },
  {
    number: '4',
    title: 'Revisiones',
    description:
      'Afinamos dentro de las rondas incluidas. Cosas nuevas fuera de alcance van aparte.',
  },
  {
    number: '5',
    title: 'Pago final y publicación',
    description:
      'Pago restante, dominio conectado y web online.',
  },
];

const CondicionesDelProyecto = () => {
  usePageMeta('/condiciones-del-proyecto');
  const { openModal } = useContactModal();

  return (
    <>
      <section className='relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 pb-16'>
        <GlowBackdrop />
        <div className='relative z-10 text-center max-w-4xl mx-auto px-6 py-4'>
          <span className='inline-block bg-accent text-ink-dark text-xs md:text-sm font-bold uppercase tracking-wide px-4 py-1.5 border-2 border-white/80 rotate-[-2deg] mb-6 shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]'>
            Condiciones del proyecto
          </span>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight'>
            Cómo trabajamos contigo
          </h1>
          <p className='text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
            Pagos, revisiones, plazos y publicación. Lo que suele regir el
            trabajo, sin letra pequeña a mitad de camino.
          </p>
        </div>
      </section>

      <SEOProcess
        title='El proceso, paso a paso'
        steps={processSteps}
      />

      <section className='py-16 md:py-20 bg-gray-50 border-y-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center'>
              Pagos
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium text-center mb-10'>
              La forma de pago queda definida en la propuesta antes de empezar.
              En la mayoría de proyectos web trabajamos así:
            </p>
            <ul className='space-y-4 text-base md:text-lg text-gray-700'>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  <strong className='text-gray-900'>Pago inicial del 50%</strong>{' '}
                  del presupuesto para arrancar el proyecto.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  <strong className='text-gray-900'>Segundo pago del 50%</strong>{' '}
                  restante antes de la publicación definitiva.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  En proyectos a medida o de mayor alcance, el fraccionamiento
                  puede adaptarse a hitos si así se acuerda en la propuesta.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center'>
              Revisiones y cambios
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium text-center mb-10'>
              Las rondas de cambios sirven para afinar el diseño y los
              contenidos dentro del alcance acordado.
            </p>
            <ul className='space-y-4 text-base md:text-lg text-gray-700'>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  En cada propuesta se indican las{' '}
                  <strong className='text-gray-900'>
                    rondas de cambios incluidas
                  </strong>{' '}
                  sobre el diseño.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  En proyectos a medida, el número de revisiones se define según
                  el alcance en la propuesta.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  Los cambios de alcance (nuevas páginas, funcionalidades o
                  rediseños fuera de lo acordado) se presupuestan aparte.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-gray-50 border-y-2 border-ink-dark/10'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center'>
              Plazos y contenidos
            </h2>
            <p className='text-base md:text-lg text-gray-700 font-medium text-center mb-10'>
              El calendario real depende del alcance y de cuándo tengamos la
              información necesaria para avanzar.
            </p>
            <ul className='space-y-4 text-base md:text-lg text-gray-700'>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  El plazo se acuerda según cuándo nos entregues los contenidos
                  (textos, imágenes, datos de contacto, logo, etc.).
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  Si no cuentas con tiempo para prepararlos, nosotros nos
                  encargamos de organizarlos o redactarlos dentro del alcance
                  que acordemos.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  Los retrasos en la entrega de materiales por parte del cliente
                  pueden desplazar la fecha de publicación prevista.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className='py-16 md:py-20 bg-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center'>
              Publicación
            </h2>
            <ul className='space-y-4 text-base md:text-lg text-gray-700'>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  La publicación definitiva se hace tras el pago final y la
                  validación de la última revisión incluida.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  Nos encargamos de dejar la web online, conectar el dominio
                  cuando aplique y entregarte lo necesario para usarla.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-accent font-bold flex-shrink-0'>·</span>
                <span>
                  El mantenimiento posterior es opcional y se contrata aparte,
                  salvo que se incluya expresamente en la propuesta.
                </span>
              </li>
            </ul>
            <p className='mt-10 text-sm md:text-base text-gray-500 text-center leading-relaxed'>
              Estas condiciones resumen la forma habitual de trabajo. El detalle
              concreto de cada proyecto queda recogido en la propuesta
              comercial. Para el marco legal de contratación, consulta los{' '}
              <a
                href='/terminos-y-condiciones'
                className='text-accent hover:underline font-medium'
              >
                términos y condiciones
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <SEOCTAFinal
        title='¿Empezamos?'
        subtitle='Cuéntanos el proyecto y te mandamos propuesta con alcance, plazos y condiciones.'
        buttonText='Solicitar propuesta'
        onButtonClick={() => openModal()}
      />
    </>
  );
};

export default CondicionesDelProyecto;

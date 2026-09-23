import RevealOnScroll from './RevealOnScroll';
import { trackLocalWebDemoClick } from '../utils/analytics';
import type { LocalWebDemo } from '../data/localWebDemos';

const LocalWebDemos = ({
  ciudad,
  demos,
}: {
  ciudad: string;
  demos: LocalWebDemo[];
}) => {
  if (demos.length === 0) return null;

  const gridClass =
    demos.length <= 2
      ? 'mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-page-gap md:grid-cols-2'
      : 'mx-auto grid grid-cols-1 items-start gap-page-gap md:grid-cols-2 lg:grid-cols-3';

  return (
    <section id='demos' className='page-section'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
            Webs de ejemplo
          </span>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Así puede quedar tu web en {ciudad}
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>
            Ejemplos reales de cómo podría verse tu web. Entra y navega cada
            diseño.
          </p>
        </div>

        <div className={gridClass}>
          {demos.map((demo, index) => (
            <RevealOnScroll key={demo.href} delayMs={index * 90}>
              <a
                href={demo.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={`Ver la web de ejemplo ${demo.title}`}
                onClick={() => trackLocalWebDemoClick(demo.title, ciudad)}
                className='flex flex-col items-center gap-4'
              >
                <img
                  src={demo.image}
                  alt={demo.title}
                  width={1254}
                  height={1254}
                  className='w-full object-contain'
                  loading='lazy'
                  decoding='async'
                />
                <h3 className='text-center text-xl font-extrabold text-ink-dark md:text-2xl'>
                  {demo.title}
                </h3>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalWebDemos;

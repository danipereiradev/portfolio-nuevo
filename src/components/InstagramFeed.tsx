import { Instagram } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import Button from './Button';
import {
  INSTAGRAM_EMBED_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
} from '../config/contact';
import { trackExternalLink } from '../utils/analytics';

const InstagramFeed = () => {
  return (
    <section id='instagram' className='page-section'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <RevealOnScroll className='page-title-block mx-auto max-w-5xl text-center'>
          <span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>
            Instagram
          </span>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>
            Síguenos en Instagram
          </h2>
          <p className='text-xl text-ink-dark md:text-2xl'>
            Trabajos, procesos y clientes. Lo último está en @{INSTAGRAM_HANDLE}.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={90}>
          <div className='mx-auto w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl'>
            <iframe
              title={`Últimas publicaciones de @${INSTAGRAM_HANDLE} en Instagram`}
              src={INSTAGRAM_EMBED_URL}
              className='h-[28rem] w-full border-0 md:h-[32rem] lg:h-[36rem]'
              loading='lazy'
              referrerPolicy='strict-origin-when-cross-origin'
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={160}>
          <Button
            href={INSTAGRAM_URL}
            target='_blank'
            rel='noopener noreferrer'
            variant='primary'
            className='mt-0'
            onClick={() =>
              trackExternalLink(INSTAGRAM_URL, `Seguir @${INSTAGRAM_HANDLE}`)
            }
          >
            <Instagram className='h-5 w-5' />
            Seguir @{INSTAGRAM_HANDLE}
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default InstagramFeed;

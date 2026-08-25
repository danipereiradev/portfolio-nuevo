import { useEffect, useState } from 'react';

const snippets = [
  {
    text: '"Se nota que disfrutan lo que hacen y que se implican de verdad en cada proyecto"',
    name: 'Juanvi Raga | hoyviajamosweb.com',
  },
  {
    text: '"Profesional… muy profesional. Un trabajo bien hecho en toda su extensión"',
    name: 'Victor Raposo | oalicornio.com',
  },
  {
    text: '"Siempre que necesito algo, me atiende al momento. Nunca me he quedado tirada"',
    name: 'Irene Ibáñez | camisetas-ahora.com',
  },
  {
    text: '"Estoy muy contento con el resultado. Volvería a trabajar con él sin ninguna duda"',
    name: 'Bruno Tomás | elviajedeloselefantes.com',
  },
  {
    text: '"Profesionalidad y eficacia siempre. Muchas gracias"',
    name: 'Ingrid Martín-Macho | flamingoplugs',
  },
];

function TestimonialsSingle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;

    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % snippets.length);
    }, 4000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <blockquote
      aria-live='polite'
      className='relative mt-2 grid w-full min-w-0 text-left'
    >
      {snippets.map((snippet, i) => {
        const isActive = i === index;

        return (
          <div
            key={snippet.name}
            className={`col-start-1 row-start-1 w-full min-w-0 transition-opacity duration-500 ease-in-out ${
              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={!isActive}
          >
            <p className='mt-2 w-full break-words text-lg font-semibold italic leading-snug text-gray-900'>
              {snippet.text}
            </p>

            <footer className='mt-2 flex min-w-0 items-center gap-3'>
              <span className='h-px w-6 shrink-0 bg-accent' aria-hidden='true' />
              <cite className='min-w-0 break-words not-italic text-sm font-semibold text-gray-600'>
                {snippet.name}
              </cite>
            </footer>
          </div>
        );
      })}
    </blockquote>
  );
}

export default TestimonialsSingle;

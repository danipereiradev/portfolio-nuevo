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

const FADE_MS = 500;

function TestimonialsSingle() {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const snippet = snippets[index];

  useEffect(() => {
    let timeoutId = 0;

    const intervalId = window.setInterval(() => {
      setIsVisible(false);
      timeoutId = window.setTimeout(() => {
        setIndex((current) => (current + 1) % snippets.length);
        setIsVisible(true);
      }, FADE_MS);
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <blockquote className='relative mt-2 min-h-[7.5rem] w-full min-w-0 overflow-hidden rounded-xl text-left'>
      <div
        className={`w-full min-w-0 transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
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
    </blockquote>
  );
}

export default TestimonialsSingle;

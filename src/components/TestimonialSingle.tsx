import { useEffect, useState } from 'react';

const snippets = [
  {
    text: '"Se nota que disfrutan lo que hacen y que se implican de verdad en cada proyecto"',
    name: 'Juanvi Raga de hoyviajamosweb.com',
  },
  {
    text: '"Profesional… muy profesional. Un trabajo bien hecho en toda su extensión"',
    name: 'Victor Raposo de casa rural oalicornio.com',
  },
  {
    text: '"Siempre que necesito algo, me atiende al momento. Nunca me he quedado tirada"',
    name: 'Irene Ibáñez de camisetas-ahora.com',
  },
  {
    text: '"Estoy muy contento con el resultado. Volvería a trabajar con él sin ninguna duda"',
    name: 'Bruno Tomás de elviajedeloselefantes.com',
  },
  {
    text: '"Profesionalidad y eficacia siempre. Muchas gracias"',
    name: 'Ingrid Martín-Macho de flamingoplugs',
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
    <blockquote className='relative mt-2 min-h-[11rem] rounded-xl py-5 pl-7 pr-5 text-left'>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <p className='mt-2 text-lg font-semibold italic leading-snug text-gray-900'>
          {snippet.text}
        </p>

        <footer className='mt-2 flex items-center gap-3'>
          <span className='h-px w-6 bg-accent' aria-hidden='true' />
          <cite className='not-italic text-sm font-semibold text-gray-600'>
            {snippet.name}
          </cite>
        </footer>
      </div>
    </blockquote>
  );
}

export default TestimonialsSingle;

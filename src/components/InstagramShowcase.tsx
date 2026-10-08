import { ArrowUpRight, Instagram } from 'lucide-react';
import Button from './Button';
import { INSTAGRAM_URL } from '../config/contact';

const posts = [
  { image: 'camisetas-carrusel', url: 'https://www.instagram.com/36web.es/p/DeOodHkjG1r/', alt: 'Carrusel del proyecto Camisetas Ahora: diseño y desarrollo de su tienda online', label: 'Así lo hicimos' },
  { image: 'camisetas-proyecto', url: 'https://www.instagram.com/36web.es/p/DeOoKOgDPIp/', alt: 'Camisetas Ahora: una tienda con su propia personalidad', label: 'El proyecto' },
  { image: 'camisetas-resena', url: 'https://www.instagram.com/36web.es/p/DeOn5nzjBfR/', alt: 'La opinión de Irene, de Camisetas Ahora, sobre nuestro trabajo', label: 'Lo que cuenta Irene' },
];

export default function InstagramShowcase() {
  return (
    <section id='instagram' className='page-section' aria-labelledby='instagram-title'>
      <div className='container mx-auto flex flex-col items-center gap-page-gap'>
        <div className='page-title-block mx-auto max-w-4xl text-center'>
          <span className='text-md uppercase font-extrabold text-accent underline'>36web en Instagram</span>
          <h2 id='instagram-title' className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>Detrás de cada proyecto hay mucho que contar.</h2>
          <p className='text-lg text-ink-dark'>Para Camisetas Ahora creamos una tienda con WooCommerce y un tema propio, diseñado especialmente para ellas. Así quedó y así lo vivieron.</p>
        </div>
        <div className='grid w-full grid-cols-3 gap-1.5 sm:gap-4'>
          {posts.map((post) => (
            <a key={post.image} href={post.url} target='_blank' rel='noopener noreferrer' className='group block min-w-0 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent' aria-label={`${post.label} en Instagram (se abre en otra pestaña)`}>
              <img src={`/img/instagram/${post.image}.jpg`} alt={post.alt} width={720} height={900} loading='lazy' decoding='async' className='aspect-[4/5] w-full rounded-lg object-contain' />
              <span className='mt-3 hidden items-center justify-between gap-2 sm:flex font-bold text-ink-dark group-hover:underline'>{post.label}<ArrowUpRight className='h-5 w-5 shrink-0' aria-hidden='true' /></span>
            </a>
          ))}
        </div>
        <Button href={INSTAGRAM_URL} target='_blank' rel='noopener noreferrer'><Instagram className='mr-2 h-5 w-5' aria-hidden='true' />Síguenos en Instagram</Button>
      </div>
    </section>
  );
}

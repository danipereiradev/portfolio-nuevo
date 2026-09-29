import { useState } from 'react';
import Button from './Button';
type Project = { id: string; name: string; sector: string; url?: string; image?: string };
// Solo proyectos reales con portada de escritorio, tableta y móvil.
// No añadir portadas antiguas de un único monitor ni demos sectoriales.
const projects: Project[] = [
  {id:'beachvans',name:'Beachvans',sector:'Viajes y aventura',image:'/img/portfolio/new/beachvans.webp'},
  {id:'vidal',name:'Clínica Vidal',sector:'Salud',image:'/img/portfolio/new/clinica-vidal.webp'},
  {id:'camisetas',name:'Camisetas Ahora',sector:'Tienda online',image:'/img/portfolio/new/camisetas.webp'},
  {id:'hatena',name:'Hatena',sector:'Clínica veterinaria',image:'/img/portfolio/new/hatena.webp',url:'https://hatena.es'},
  {id:'carper',name:'Carper Sonido',sector:'Sonido profesional',image:'/img/portfolio/new/carper.webp',url:'https://carpersonido.com'},
  {id:'alicornio',name:'O Alicornio',sector:'Turismo rural',image:'/img/portfolio/new/casa-rural-oalicornio.webp',url:'https://oalicornio.com'},
  {id:'hoyviajamos',name:'Hoy Viajamos',sector:'Viajes',image:'/img/portfolio/new/hoyviajamos.webp',url:'https://hoyviajamosweb.com'},
  {id:'elefantes',name:'El Viaje de los Elefantes',sector:'Viajes',image:'/img/portfolio/new/elefantes.webp',url:'https://elviajedeloselefantes.com'},
  {id:'silly',name:'Silly',sector:'Diseño web',image:'/img/portfolio/new/silly.webp'},
  {id:'mcauto',name:'McAuto Lleida Classic',sector:'Eventos y motor',url:'https://mcautoclassic.com/'},
  {id:'somatica',name:'Psicoterapia Somática',sector:'Salud y bienestar',url:'https://psicoterapiasomatica.es/'},
  {id:'itzalak',name:'Itzalak Psicología',sector:'Psicología',url:'https://itzalakpsicologia.com/'},
  {id:'noma',name:'Noma Abogados',sector:'Servicios jurídicos',url:'https://nomaabogados.com/'},
  {id:'mhin',name:'MH Projects',sector:'Servicios inmobiliarios',url:'https://mhinprojects.com/'},
  {id:'obrador',name:'L’Obrador de Ponent',sector:'Alimentación artesanal',url:'https://lobradordeponent.com/'},
  {id:'noemi',name:'Noemí Bonet Psicología',sector:'Psicología deportiva',url:'https://noemibonetpsicologia.com/'},
];
export default function PortfolioAMedida() {
 const [selection] = useState(() => { const shuffled = [...projects]; for (let i = shuffled.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; } return shuffled.slice(0, 6); });
 return <section id='portfolio' className='page-section'><div className='container mx-auto flex flex-col gap-page-gap'>
  <div className='page-title-block mx-auto max-w-5xl text-center'><span className='text-md uppercase rounded-lg font-extrabold text-accent underline'>Portfolio</span><h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>Proyectos de nuestro equipo</h2><p className='text-xl md:text-2xl text-ink-dark'>Negocios distintos. Identidades propias. Explora las webs y descubre el cuidado detrás de cada diseño.</p></div>
  <div className='grid grid-cols-1 gap-page-gap md:grid-cols-2 lg:grid-cols-3'>{selection.map(p=><article key={p.id} className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink-dark bg-white'>
    <a href={p.url || p.image} target='_blank' rel='noopener noreferrer' data-ads-outbound='allow' aria-label={`Visitar ${p.name}`} className='relative block aspect-[3/2] overflow-hidden bg-[radial-gradient(ellipse_at_bottom,#707070,#111_75%)]'>
      {p.image ? <img src={p.image} alt={`Web de ${p.name}`} className='h-full w-full object-contain' loading='lazy' width='1536' height='1024' /> : <>
      <div className='absolute left-[30%] top-[4%] h-[84%] w-[68%] rounded-[4%] border-2 border-zinc-400 bg-black p-[1.3%] shadow-xl'><img src={`/img/portfolio/equipo/${p.id}-desktop.png`} alt={`Web de ${p.name} en escritorio`} className='h-full w-full object-cover object-top' loading='lazy' width='1440' height='1000' /></div>
      <div className='absolute bottom-[5%] left-[3%] h-[71%] w-[30%] rounded-[7%] border-2 border-zinc-400 bg-black p-[1.2%] shadow-xl'><img src={`/img/portfolio/equipo/${p.id}-mobile.png`} alt='' className='h-full w-full rounded-sm object-cover object-top' loading='lazy' width='390' height='844' /></div>
      <div className='absolute bottom-[4%] left-[29%] h-[57%] w-[16%] rounded-[12%] border-2 border-zinc-400 bg-black p-[.6%] shadow-xl'><img src={`/img/portfolio/equipo/${p.id}-mobile.png`} alt='' className='h-full w-full rounded-[8%] object-cover object-top' loading='lazy' width='390' height='844' /></div>
      </>}
    </a><div className='flex flex-1 flex-col items-center gap-3 p-content-pad text-center'><p className='text-sm font-extrabold uppercase tracking-wide text-accent'>{p.sector}</p><h3 className='text-xl font-extrabold text-ink-dark md:text-2xl'>{p.name}</h3><a href={p.url || p.image} target='_blank' rel='noopener noreferrer' data-ads-outbound='allow' className='mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-extrabold uppercase text-white hover:bg-accent-hover'>{p.url ? 'Visitar web' : 'Ver proyecto'}</a></div>
  </article>)}</div><div className='text-center'><Button href='#contacto'>Hablemos de tu proyecto</Button></div>
 </div></section>;
}

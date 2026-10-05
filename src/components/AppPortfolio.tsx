import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { APP_PROJECTS, appImage, type AppProject } from '../data/appProjects';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { trackPortfolioClick } from '../utils/analytics';
import Button from './Button';

/** Las capturas se muestran completas, en el dispositivo para el que se diseñaron. */
export function AppProjectVisual({ project }: { project: AppProject }) {
  if ('illustration' in project) return <img src={appImage(project.images[0])} alt='Recreación con IA de un asistente educativo. Contenido ficticio.' width={1254} height={1254} loading='lazy' className='aspect-square h-auto w-full object-contain' />;
  const isTv = project.id === 'score-padel';
  return (
    <div className='relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-accent-light p-6' aria-hidden='true'>
      {isTv ? (
        <>
          <img src={appImage(project.images[3])} alt='' width={1536} height={864} loading='lazy' className='absolute left-[6%] top-[20%] w-[86%] rounded-lg border-[6px] border-ink-dark shadow-xl' />
          <img src={appImage(project.images[0])} alt='' width={804} height={1748} loading='lazy' className='absolute bottom-[8%] right-[8%] w-[26%] rounded-xl border-4 border-ink-dark shadow-xl' />
        </>
      ) : (
        project.images.slice(0, 3).map((file, index) => (
          <img key={file} src={appImage(file)} alt='' width={project.id === 'onygo' ? 378 : 804} height={project.id === 'onygo' ? 864 : 1748} loading='lazy'
            className={`absolute w-[30%] rounded-xl border-4 border-ink-dark shadow-xl ${index === 0 ? 'left-[5%] top-[19%] -rotate-6' : index === 1 ? 'left-[35%] top-[10%] z-10' : 'right-[5%] top-[19%] rotate-6'}`} />
        ))
      )}
    </div>
  );
}

function AppGallery({ project, onClose }: { project: AppProject; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(true);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % project.images.length);
      if (event.key === 'ArrowLeft') setIndex((i) => (i + project.images.length - 1) % project.images.length);
      if (event.key === 'Tab') {
        const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-app-gallery] button'));
        const first = buttons[0]; const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); previous?.focus(); };
  }, [onClose, project.images.length]);
  return (
    <div data-app-gallery role='dialog' aria-modal='true' aria-label={`${'illustration' in project ? 'Recreación de' : 'Capturas de'} ${project.name}`} className='fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-black/90 p-4' onClick={onClose}>
      <button ref={closeRef} onClick={onClose} aria-label='Cerrar capturas' className='absolute right-4 top-4 z-10 rounded-lg bg-white p-3 text-ink-dark'><X /></button>
      <img src={appImage(project.images[index])} alt={`${project.name}: ${'illustration' in project ? 'recreación con contenido ficticio' : `captura ${index + 1} de ${project.images.length}`}`} className='max-h-[75svh] max-w-full object-contain' onClick={(event) => event.stopPropagation()} />
      {project.images.length > 1 && <div className='flex items-center gap-4 text-white' onClick={(event) => event.stopPropagation()}>
        <button aria-label='Captura anterior' className='rounded-lg border p-3' onClick={() => setIndex((index + project.images.length - 1) % project.images.length)}><ChevronLeft /></button>
        <p aria-live='polite'>{project.name} · {index + 1} / {project.images.length}</p>
        <button aria-label='Captura siguiente' className='rounded-lg border p-3' onClick={() => setIndex((index + 1) % project.images.length)}><ChevronRight /></button>
      </div>}
    </div>
  );
}

export default function AppPortfolio({ id = 'portfolio', showCta = true }: { id?: string; showCta?: boolean }) {
  const [selected, setSelected] = useState<AppProject | null>(null);
  const open = (project: AppProject) => { trackPortfolioClick(project.name); setSelected(project); };
  return (
    <section id={id} className='page-section'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-5xl text-center'>
          <span className='text-md rounded-lg font-extrabold uppercase text-accent underline'>Portfolio</span>
          <h2 className='text-3xl font-extrabold text-ink-dark md:text-4xl lg:text-5xl'>Aplicaciones en las que ha trabajado nuestro equipo</h2>
          <p className='text-xl text-ink-dark md:text-2xl'>Movilidad, deporte, juegos y educación. Proyectos distintos para que veas lo que podemos hacer.</p>
        </div>
        <div className='grid grid-cols-1 items-stretch gap-page-gap md:grid-cols-2'>
          {APP_PROJECTS.map((project) => (
            <article key={project.id} className='flex h-full flex-col overflow-hidden rounded-lg border-2 border-ink-dark bg-white'>
              <button onClick={() => open(project)} aria-label={`Ver capturas de ${project.name}`}><AppProjectVisual project={project} /></button>
              <div className='flex flex-1 flex-col items-center gap-3 p-content-pad text-center'>
                <p className='text-sm font-extrabold uppercase tracking-wide text-accent'>{project.sector}</p>
                <h3 className='text-xl font-extrabold text-ink-dark md:text-2xl'>{project.name}</h3>
                <p className='text-base leading-snug text-ink-dark md:text-lg'>{project.description}</p>
                <p className='text-base leading-snug text-ink-dark md:text-lg'><strong>Nuestro trabajo: </strong>{project.contribution}</p>
                <p className='text-sm text-ink-dark'>{project.technologies}</p>
                <button onClick={() => open(project)} className='mt-auto inline-flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-extrabold uppercase text-white hover:bg-accent-hover md:text-base'>Ver capturas</button>
                {'url' in project && <a href={project.url} target='_blank' rel='noopener noreferrer' className='inline-flex min-h-11 items-center font-bold text-link underline'>{project.linkLabel}</a>}
              </div>
            </article>
          ))}
        </div>
        {showCta && <Button href='#contacto'>PEDIR PROPUESTA</Button>}
      </div>
      {selected && <AppGallery project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

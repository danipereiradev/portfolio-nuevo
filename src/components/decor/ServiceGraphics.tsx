/**
 * Pequeñas composiciones visuales abstractas (solo CSS) asociadas a cada
 * servicio. Sustituyen al icono genérico centrado por una escena breve con
 * más personalidad e identidad de estudio digital.
 */

export const BrowserGraphic = () => (
  <div className='relative h-24 w-full'>
    <div className='absolute left-0 top-2 w-[78%] rounded-lg border border-white/10 bg-white/5 overflow-hidden'>
      <div className='flex items-center gap-1 px-2 py-1.5 border-b border-white/10'>
        <span className='w-1.5 h-1.5 rounded-full bg-white/30' />
        <span className='w-1.5 h-1.5 rounded-full bg-white/30' />
        <span className='w-1.5 h-1.5 rounded-full bg-accent/70' />
      </div>
      <div className='p-2.5 space-y-1.5'>
        <div className='h-2 w-2/3 rounded bg-white/25' />
        <div className='h-1.5 w-full rounded bg-white/10' />
        <div className='h-1.5 w-4/5 rounded bg-white/10' />
      </div>
    </div>
    <div className='absolute right-1 bottom-0 w-16 h-14 rounded-lg bg-accent/15 border border-accent/30 rotate-6' />
  </div>
);

export const CartGraphic = () => (
  <div className='relative h-24 w-full'>
    <div className='absolute left-1 top-1 grid grid-cols-2 gap-1.5'>
      <div className='w-9 h-9 rounded-md bg-white/10 border border-white/15' />
      <div className='w-9 h-9 rounded-md bg-accent/20 border border-accent/40' />
      <div className='w-9 h-9 rounded-md bg-white/10 border border-white/15' />
      <div className='w-9 h-9 rounded-md bg-white/10 border border-white/15' />
    </div>
    <div className='absolute right-1 bottom-1 w-20 rounded-lg border border-white/15 bg-white/5 px-2 py-1.5 rotate-[-4deg]'>
      <div className='h-1.5 w-full rounded bg-white/20 mb-1' />
      <div className='flex justify-between'>
        <div className='h-1.5 w-6 rounded bg-white/10' />
        <div className='h-1.5 w-6 rounded bg-accent/60' />
      </div>
    </div>
  </div>
);

export const ShieldGraphic = () => (
  <div className='relative h-24 w-full flex items-center'>
    <div className='relative w-14 h-16'>
      <div className='absolute inset-0 rounded-t-full rounded-b-lg bg-accent/15 border border-accent/40' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='w-3 h-3 rounded-full border-2 border-accent/70' />
      </div>
    </div>
    <div className='ml-4 flex-1 space-y-1.5'>
      <div className='h-1.5 w-full rounded bg-white/15' />
      <div className='h-1.5 w-3/4 rounded bg-white/10' />
      <div className='h-1.5 w-1/2 rounded bg-white/10' />
    </div>
  </div>
);

export const NodesGraphic = () => (
  <div className='relative h-24 w-full'>
    <svg
      viewBox='0 0 200 100'
      className='absolute inset-0 w-full h-full'
      fill='none'
    >
      <line
        x1='30'
        y1='30'
        x2='100'
        y2='60'
        stroke='rgba(255,255,255,0.15)'
        strokeWidth='1.5'
      />
      <line
        x1='100'
        y1='60'
        x2='170'
        y2='25'
        stroke='rgba(255,255,255,0.15)'
        strokeWidth='1.5'
      />
      <line
        x1='100'
        y1='60'
        x2='150'
        y2='80'
        stroke='rgba(20,184,166,0.5)'
        strokeWidth='1.5'
      />
      <circle cx='30' cy='30' r='7' fill='rgba(255,255,255,0.15)' />
      <circle
        cx='100'
        cy='60'
        r='9'
        fill='rgba(20,184,166,0.3)'
        stroke='rgba(20,184,166,0.7)'
      />
      <circle cx='170' cy='25' r='6' fill='rgba(255,255,255,0.12)' />
      <circle cx='150' cy='80' r='6' fill='rgba(20,184,166,0.25)' />
    </svg>
  </div>
);

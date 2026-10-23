import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import RevealOnScroll from './RevealOnScroll';
import { SITE_WEB_PATH, SITE_SHOP_PATH, SITE_MAINTENANCE_PATH, SITE_APPS_PATH, TRANQUILIDAD_DIGITAL_PATH } from '../config/contact';

interface ServicesProps { description: ReactNode; }

export default function Services({ description }: ServicesProps) {
  const alternatives = [
    { title: 'Web con pago único', link: SITE_WEB_PATH, image: '/img/services/paginas-web.png', description: 'Un proyecto cerrado, con alcance y presupuesto acordados. Tú decides después si necesitas mantenimiento.' },
    { title: 'Tiendas online a medida', link: SITE_SHOP_PATH, image: '/img/services/tiendas-online.png', description: 'Catálogo, compra y funciones específicas según tu negocio. Proyecto independiente, fuera de la suscripción.' },
    { title: 'Ya tengo web: mantenimiento', link: SITE_MAINTENANCE_PATH, image: '/img/services/mantenimiento-web.png', description: 'Conserva tu web y delega su cuidado técnico. También trabajamos con webs creadas por otras empresas.' },
  ];
  return (
    <section id='services' className='page-section bg-white'>
      <div className='container mx-auto flex flex-col gap-page-gap'>
        <div className='page-title-block mx-auto max-w-3xl text-center'>
          <span className='font-extrabold text-accent'>Webs para pequeños negocios</span>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink-dark'>Creamos tu web. Y seguimos a tu lado.</h2>
          <p className='text-xl text-ink-dark'>{description}</p>
        </div>
        <RevealOnScroll>
          <a href={TRANQUILIDAD_DIGITAL_PATH} className='group grid items-center gap-6 rounded-3xl border-2 border-accent/20 bg-accent/5 p-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:p-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent'>
            <img src='/img/services/tranquilidad-digital.webp' alt='Acompañamiento personal para cuidar la web de tu negocio' width={1448} height={1086} className='mx-auto w-full max-w-sm rounded-2xl object-contain' loading='lazy' />
            <div className='text-center md:text-left'>
              <p className='mb-2 font-bold text-accent'>Web y acompañamiento por suscripción</p>
              <h3 className='text-3xl md:text-4xl font-extrabold'>Tranquilidad Digital</h3>
              <p className='my-4 text-lg max-w-2xl'>Tu web a medida, dominio, alojamiento y mantenimiento, con una persona de referencia. Para profesionales y negocios que quieren delegar su web.</p>
              <p className='text-2xl font-bold'>Desde 59,90 € + IVA/mes</p>
              <p className='mt-2 font-semibold'>0 € de alta · Sin permanencia · Tu web en propiedad tras 12 cuotas pagadas</p>
              <span className='mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 font-bold text-white group-hover:underline'>Conocer Tranquilidad Digital <ArrowRight className='h-5 w-5 shrink-0' aria-hidden='true' /></span>
            </div>
          </a>
        </RevealOnScroll>
        <div>
          <h3 className='mb-6 text-center text-2xl font-bold'>¿Necesitas otra forma de trabajar?</h3>
          <div className='grid gap-6 md:grid-cols-3'>
            {alternatives.map((service) => (
              <a key={service.link} href={service.link} className='group flex flex-col rounded-2xl border border-gray-200 p-5 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent'>
                <img src={service.image} alt='' width={800} height={600} loading='lazy' decoding='async' className='mx-auto h-36 w-full object-contain' />
                <h4 className='mt-4 text-xl font-bold group-hover:text-accent'>{service.title}</h4>
                <p className='mt-3'>{service.description}</p>
                <span className='mt-auto pt-5 text-accent font-bold underline'>Ver opciones →</span>
              </a>
            ))}
          </div>
        </div>
        <p className='text-center text-sm'>¿Tu proyecto necesita una aplicación o una integración especial? <a href={SITE_APPS_PATH} className='font-bold text-accent underline'>Estudiamos desarrollos a medida por separado.</a></p>
      </div>
    </section>
  );
}

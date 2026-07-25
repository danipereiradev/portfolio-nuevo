// Mapa de ubicación reutilizable (Contacto y Sobre el Estudio). Usa el
// embed público de Google Maps (sin API key) centrado en la dirección real
// del estudio, con un enlace de texto al perfil de Google Business "Dani
// Pereira Web" (reseñas, valoraciones) como alternativa accesible al iframe.
const ADDRESS_QUERY = 'Calle Condega 7, 28850 Torrejón de Ardoz, Madrid';

const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS_QUERY,
)}&output=embed`;

const MAPS_LINK_HREF = 'https://share.google/iaNUEdGmuuy15EqLQ';

interface LocationMapProps {
  className?: string;
}

const LocationMap = ({ className = '' }: LocationMapProps) => {
  return (
    <div className={className}>
      {/* El embed gratuito de Google Maps (sin API key) añade su propia barra
          superior con un enlace "Abrir en Google Maps". Al ser contenido de
          otro dominio no se puede editar ni ocultar con CSS/JS desde aquí, así
          que se recorta visualmente: el iframe se renderiza más alto de lo
          visible y se desplaza hacia arriba dentro de un contenedor con
          overflow oculto, para que esa barra quede fuera del área visible. */}
      <div className='rounded-xl overflow-hidden border-2 border-ink-dark shadow-[7px_7px_0_0_#1a1a1a] h-64 md:h-80'>
        <iframe
          title='Ubicación de PereiraWeb: Calle Condega 7, Torrejón de Ardoz, Madrid'
          src={MAPS_EMBED_SRC}
          className='w-full h-[301px] md:h-[365px] -mt-[45px]'
          style={{ border: 0 }}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />
      </div>
      <p className='text-center text-sm text-gray-500 mt-3'>
        <a
          href={MAPS_LINK_HREF}
          target='_blank'
          rel='noopener noreferrer'
          className='text-accent hover:underline font-medium'
        >
          Ver perfil, valoraciones y reseñas en Google Maps
        </a>
      </p>
    </div>
  );
};

export default LocationMap;

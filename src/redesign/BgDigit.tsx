/**
 * Cifra de fondo (el 3 o el 6 de 36web), grande y difuminada.
 * El contenedor necesita `relative isolate overflow-hidden` para que quede
 * detrás del contenido y no se salga de la sección.
 */
export default function BgDigit({ d, side = 'right' }: { d: '3' | '6'; side?: 'left' | 'right' }) {
  return (
    <span aria-hidden='true' className={`rd-bgdigit rd-bgdigit--${side}`}>
      {d}
    </span>
  );
}

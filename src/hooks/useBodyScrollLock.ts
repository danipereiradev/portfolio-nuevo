import { useEffect } from 'react';

// Bloquea el scroll del body mientras un modal/overlay está abierto.
//
// Nota: se usa "overflow: hidden" en vez del truco de "position: fixed"
// con top negativo. Ese truco puede provocar que elementos "fixed"
// anidados (como el botón de cerrar de un modal) se posicionen respecto al
// body desplazado en vez del viewport real en algunos navegadores móviles,
// dejándolos fuera de pantalla cuando se abre el modal tras hacer scroll.
// "overflow: hidden" evita el scroll del fondo sin tocar el sistema de
// coordenadas de los elementos fixed.
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const { style } = document.body;
    const previousOverflow = style.overflow;

    style.overflow = 'hidden';

    return () => {
      style.overflow = previousOverflow;
    };
  }, [isLocked]);
};

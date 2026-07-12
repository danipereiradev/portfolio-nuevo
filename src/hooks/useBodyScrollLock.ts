import { useEffect } from 'react';

// Bloquea el scroll del body mientras un modal/overlay está abierto.
//
// Por qué hace falta algo más que "overflow: hidden" en el body:
// en móvil (sobre todo iOS Safari), un simple overflow:hidden no impide
// el scroll táctil del fondo. Cuando el usuario llega al final del
// contenido del modal, el gesto de scroll "encadena" y sigue moviendo la
// página de detrás, que se ve a través del overlay semitransparente
// durante el rebote (sensación de scroll infinito con elementos
// "transparentándose"). Fijar el body en su posición actual evita ese
// scroll chaining en todos los navegadores.
export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previousStyle = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    return () => {
      body.style.position = previousStyle.position;
      body.style.top = previousStyle.top;
      body.style.left = previousStyle.left;
      body.style.right = previousStyle.right;
      body.style.width = previousStyle.width;
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
};

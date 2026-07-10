import { Component, type ReactNode } from 'react';

interface GameErrorBoundaryProps {
  children: ReactNode;
}

interface GameErrorBoundaryState {
  hasError: boolean;
}

/**
 * Aísla el minijuego Snake del resto de la página. Si algo falla dentro del
 * juego (por ejemplo, un navegador sin soporte de canvas), el error se
 * queda contenido aquí: el mensaje de agradecimiento y la cuenta atrás
 * siguen funcionando con normalidad.
 */
class GameErrorBoundary extends Component<
  GameErrorBoundaryProps,
  GameErrorBoundaryState
> {
  state: GameErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className='text-sm text-gray-400 text-center py-6'>
          El minijuego no está disponible en este momento, ¡pero tu solicitud
          ya está en camino!
        </p>
      );
    }

    return this.props.children;
  }
}

export default GameErrorBoundary;

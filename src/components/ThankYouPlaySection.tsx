import ThankYouCountdown from './ThankYouCountdown';
import SnakeGame from './SnakeGame';
import GameErrorBoundary from './GameErrorBoundary';

/**
 * Bloque "extra" de la página /gracias: cuenta atrás + minijuego Snake.
 * Es intencionalmente secundario en la jerarquía visual (tipografía más
 * pequeña, colores más neutros) respecto al mensaje de confirmación
 * principal, y no dispara ningún evento de tracking: es puramente
 * decorativo/experiencial.
 */
const ThankYouPlaySection = () => {
  return (
    <div className='mt-12 pt-10 border-t border-gray-200'>
      <div className='max-w-md mx-auto text-center mb-6'>
        <h2 className='text-lg md:text-xl font-bold text-gray-900 mb-2'>
          Te responderé en un máximo de 2 horas
        </h2>
        <p className='text-sm text-gray-600'>
          Mientras tanto, aquí tienes un pequeño reto para hacer la espera más
          divertida.
        </p>
        <p className='text-xs text-gray-400 mt-1'>
          Si sales de la página o la recargas, el contador se reinicia.
        </p>
      </div>

      <div className='mb-8'>
        <ThankYouCountdown />
      </div>

      <p className='text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3'>
        Snake mini
      </p>

      <GameErrorBoundary>
        <SnakeGame />
      </GameErrorBoundary>
    </div>
  );
};

export default ThankYouPlaySection;

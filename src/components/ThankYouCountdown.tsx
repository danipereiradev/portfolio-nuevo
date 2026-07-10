import { useEffect, useState } from 'react';

// Duración de la cuenta atrás. Para cambiarla, ajusta solo este número
// (horas). Se reinicia automáticamente si el usuario recarga la página: es
// intencional, no se persiste en localStorage.
const COUNTDOWN_HOURS = 2;
const COUNTDOWN_MS = COUNTDOWN_HOURS * 60 * 60 * 1000;

const pad = (value: number) => value.toString().padStart(2, '0');

const formatDuration = (ms: number) => {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

/**
 * Cuenta atrás visual de "tiempo máximo de respuesta". Puramente decorativa
 * a nivel de negocio: no lee ni escribe nada del formulario, no depende de
 * ningún backend y no dispara ningún tracking.
 */
const ThankYouCountdown = () => {
  const [remainingMs, setRemainingMs] = useState(COUNTDOWN_MS);

  useEffect(() => {
    const targetTime = Date.now() + COUNTDOWN_MS;

    const tick = () => {
      setRemainingMs(Math.max(0, targetTime - Date.now()));
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const isFinished = remainingMs <= 0;

  return (
    <div className='text-center'>
      <div
        role='timer'
        aria-label='Tiempo máximo de respuesta restante'
        className='inline-flex items-baseline gap-1 font-mono text-3xl md:text-4xl font-bold tracking-widest text-gray-900 bg-white border-2 border-gray-200 rounded-xl px-5 py-3 shadow-sm'
      >
        {formatDuration(remainingMs)}
      </div>
      <p className='mt-2 text-xs text-gray-500'>
        {isFinished
          ? 'Debería estar respondiéndote en cualquier momento.'
          : 'Horas : Minutos : Segundos'}
      </p>
    </div>
  );
};

export default ThankYouCountdown;

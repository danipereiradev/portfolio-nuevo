import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

// --- Ajustes rápidos del juego ---
// Nº de casillas por lado del tablero (tablero siempre cuadrado).
const GRID_SIZE = 16;
// Velocidad del juego: milisegundos entre cada movimiento. Más bajo = más
// rápido. 180ms es un ritmo tranquilo, pensado para no frustrar.
const TICK_MS = 180;
// Color de la serpiente. Debe coincidir con el "accent" de
// tailwind.config.js (verde corporativo) para mantener la identidad visual.
const SNAKE_COLOR = '#14b8a6';
// Color de la comida (negro, tal y como se pidió).
const FOOD_COLOR = '#111827';
// Fondo del tablero de juego.
const BOARD_BG = '#ffffff';

type Point = { x: number; y: number };

const createInitialSnake = (): Point[] => {
  const start = Math.floor(GRID_SIZE / 2);
  return [
    { x: start, y: start },
    { x: start - 1, y: start },
    { x: start - 2, y: start },
  ];
};

const getRandomFreeCell = (snake: Point[]): Point => {
  let cell: Point;
  do {
    cell = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((segment) => segment.x === cell.x && segment.y === cell.y));
  return cell;
};

interface DirButtonProps {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
  className?: string;
}

const DirButton = ({ label, onPress, children, className = '' }: DirButtonProps) => (
  <button
    type='button'
    aria-label={label}
    onPointerDown={(e) => {
      e.preventDefault();
      onPress();
    }}
    className={`touch-none flex items-center justify-center aspect-square bg-gray-100 hover:bg-gray-200 active:bg-accent/20 rounded-lg border-2 border-black text-gray-700 transition-colors ${className}`}
  >
    {children}
  </button>
);

/**
 * Minijuego Snake muy simple, pensado como detalle decorativo en /gracias.
 * Implementado con canvas 2D "a mano" (sin librerías de juegos) para que
 * sea ligero. No lee ni envía ningún dato: es puramente local al navegador.
 *
 * La partida NO se mueve sola: espera a la primera pulsación/toque de
 * dirección antes de arrancar el bucle de movimiento. Así el jugador
 * siempre tiene tiempo de orientarse antes de que la serpiente empiece a
 * moverse (si no, con un tablero pequeño podía "estrellarse" sola contra la
 * pared en menos de un segundo, antes de que a nadie le diera tiempo a
 * reaccionar).
 */
const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const snakeRef = useRef<Point[]>(createInitialSnake());
  const directionRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirectionRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>(getRandomFreeCell(snakeRef.current));
  const cellSizeRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const cellSize = cellSizeRef.current;
    if (!cellSize) return;

    ctx.fillStyle = BOARD_BG;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const food = foodRef.current;
    ctx.fillStyle = FOOD_COLOR;
    ctx.fillRect(
      food.x * cellSize + 1,
      food.y * cellSize + 1,
      cellSize - 2,
      cellSize - 2,
    );

    ctx.fillStyle = SNAKE_COLOR;
    snakeRef.current.forEach((segment) => {
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2,
      );
    });
  };

  const stopLoop = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = () => {
    directionRef.current = nextDirectionRef.current;

    const snake = snakeRef.current;
    const head = snake[0];
    const dir = directionRef.current;
    const newHead: Point = { x: head.x + dir.x, y: head.y + dir.y };

    const hitWall =
      newHead.x < 0 ||
      newHead.x >= GRID_SIZE ||
      newHead.y < 0 ||
      newHead.y >= GRID_SIZE;
    const hitSelf = snake.some(
      (segment) => segment.x === newHead.x && segment.y === newHead.y,
    );

    if (hitWall || hitSelf) {
      stopLoop();
      setIsGameOver(true);
      return;
    }

    const ateFood =
      newHead.x === foodRef.current.x && newHead.y === foodRef.current.y;

    const newSnake = [newHead, ...snake];
    if (ateFood) {
      setScore((prev) => prev + 1);
      foodRef.current = getRandomFreeCell(newSnake);
    } else {
      newSnake.pop();
    }
    snakeRef.current = newSnake;

    draw();
  };

  const resetGame = () => {
    const initialSnake = createInitialSnake();
    snakeRef.current = initialSnake;
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    foodRef.current = getRandomFreeCell(initialSnake);
    setScore(0);
    setIsGameOver(false);

    hasStartedRef.current = false;
    setHasStarted(false);
    stopLoop();
    draw();
  };

  // El bucle de movimiento solo arranca con la primera pulsación/toque de
  // dirección del jugador, nunca antes.
  const startLoopIfNeeded = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    setHasStarted(true);
    stopLoop();
    intervalRef.current = window.setInterval(tick, TICK_MS);
  };

  const requestDirection = (next: Point) => {
    if (isGameOver) return;
    const dir = directionRef.current;
    // Evita invertir la dirección exactamente sobre sí misma.
    if (next.x === -dir.x && next.y === -dir.y) return;
    nextDirectionRef.current = next;
    startLoopIfNeeded();
  };

  // Ajusta la resolución del canvas al ancho real disponible, para que el
  // tablero sea nítido y responsive tanto en desktop como en móvil.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const size = Math.floor(canvas.clientWidth);
      if (size > 0 && canvas.width !== size) {
        canvas.width = size;
        canvas.height = size;
        cellSizeRef.current = size / GRID_SIZE;
        draw();
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetGame();
    return stopLoop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          requestDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          requestDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          requestDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          requestDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameOver]);

  return (
    <div className='w-full max-w-[300px] sm:max-w-[340px] mx-auto'>
      <div className='flex items-center justify-between mb-2 px-1'>
        <span className='font-mono text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide'>
          Puntos: <span className='text-accent'>{score}</span>
        </span>
        <button
          type='button'
          onClick={resetGame}
          className='font-mono text-xs sm:text-sm font-bold text-gray-500 hover:text-accent transition-colors uppercase tracking-wide'
        >
          Reiniciar
        </button>
      </div>

      <div className='relative'>
        <canvas
          ref={canvasRef}
          className='block w-full aspect-square rounded-lg border-[3px] border-black bg-white'
          style={{ imageRendering: 'pixelated' }}
          role='img'
          aria-label={`Minijuego Snake. Puntuación actual: ${score}`}
        />

        {!hasStarted && !isGameOver && (
          <div className='absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg px-4'>
            <p className='font-mono text-xs sm:text-sm font-bold text-gray-700 text-center leading-relaxed'>
              Pulsa una flecha
              <br />
              para empezar
            </p>
          </div>
        )}

        {isGameOver && (
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90 rounded-lg'>
            <p className='font-mono text-sm sm:text-base font-bold text-gray-900'>
              Game Over
            </p>
            <p className='font-mono text-xs text-gray-600'>Puntos: {score}</p>
            <button
              type='button'
              onClick={resetGame}
              className='font-mono text-xs sm:text-sm font-bold bg-accent text-white px-4 py-2 rounded-lg border-2 border-black shadow-[3px_3px_0_0_#000] hover:bg-accent-hover hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150'
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>

      {/* D-pad táctil: pensado sobre todo para móvil, pero visible siempre
          por comodidad (también sirve con ratón). */}
      <div className='grid grid-cols-3 gap-1.5 mt-3 max-w-[150px] mx-auto'>
        <div />
        <DirButton label='Arriba' onPress={() => requestDirection({ x: 0, y: -1 })}>
          <ArrowUp className='w-4 h-4' />
        </DirButton>
        <div />

        <DirButton label='Izquierda' onPress={() => requestDirection({ x: -1, y: 0 })}>
          <ArrowLeft className='w-4 h-4' />
        </DirButton>
        <DirButton label='Abajo' onPress={() => requestDirection({ x: 0, y: 1 })}>
          <ArrowDown className='w-4 h-4' />
        </DirButton>
        <DirButton label='Derecha' onPress={() => requestDirection({ x: 1, y: 0 })}>
          <ArrowRight className='w-4 h-4' />
        </DirButton>

        <div />
        <p className='col-span-3 text-center text-[10px] text-gray-400 mt-1 hidden sm:block'>
          Flechas o WASD para moverte
        </p>
      </div>
    </div>
  );
};

export default SnakeGame;

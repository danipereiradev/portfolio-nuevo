import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, Zap, Circle } from 'lucide-react';

const SimonGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [showingSequence, setShowingSequence] = useState(false);

  const colors = [
    { bg: 'bg-red-500', active: 'bg-red-300' },
    { bg: 'bg-blue-500', active: 'bg-blue-300' },
    { bg: 'bg-green-500', active: 'bg-green-300' },
    { bg: 'bg-yellow-500', active: 'bg-yellow-300' }
  ];

  // Mostrar secuencia
  const showSequence = useCallback(async () => {
    setShowingSequence(true);
    setIsPlayerTurn(false);
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveButton(sequence[i]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveButton(null);
    }
    
    setShowingSequence(false);
    setIsPlayerTurn(true);
  }, [sequence]);

  // Iniciar juego
  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  // Reiniciar juego
  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
    setIsPlayerTurn(false);
    setActiveButton(null);
    setShowingSequence(false);
  };

  // Manejar click del jugador
  const handlePlayerClick = (buttonIndex: number) => {
    if (!isPlayerTurn || showingSequence) return;

    setActiveButton(buttonIndex);
    setTimeout(() => setActiveButton(null), 200);

    const newPlayerSequence = [...playerSequence, buttonIndex];
    setPlayerSequence(newPlayerSequence);

    // Verificar si es correcto
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      // Error - Game Over
      setGameOver(true);
      setIsPlayerTurn(false);
      return;
    }

    // Si completó la secuencia correctamente
    if (newPlayerSequence.length === sequence.length) {
      setScore(score + 1);
      setPlayerSequence([]);
      
      // Añadir nuevo elemento a la secuencia
      setTimeout(() => {
        const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
        setSequence(nextSequence);
      }, 1000);
    }
  };

  // Efecto para mostrar secuencia cuando cambia
  useEffect(() => {
    if (sequence.length > 0 && isPlaying && !gameOver) {
      showSequence();
    }
  }, [sequence, isPlaying, gameOver, showSequence]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¿Una partidita a Simon Dice?
        </h2>
        <p className="text-gray-600">
          Mientras esperas mi respuesta, ¡divirtámonos un poco! 🎮
        </p>
      </div>

      {/* Puntuación */}
      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
          <Trophy className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-blue-900">Puntuación: {score}</span>
        </div>
        {isPlaying && (
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
            <Zap className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-900">
              {showingSequence ? 'Observa...' : isPlayerTurn ? '¡Tu turno!' : 'Preparando...'}
            </span>
          </div>
        )}
      </div>

      {/* Botones del juego */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handlePlayerClick(index)}
            disabled={!isPlayerTurn || showingSequence}
            className={`
              aspect-square rounded-2xl border-4 border-gray-300 transition-all duration-200 transform
              ${activeButton === index ? color.active : color.bg}
              ${isPlayerTurn && !showingSequence ? 'hover:scale-105 hover:shadow-lg cursor-pointer' : 'cursor-not-allowed'}
              ${activeButton === index ? 'scale-95 shadow-inner' : 'shadow-lg'}
              disabled:opacity-50
            `}
          >
            <Circle className="w-8 h-8 text-white mx-auto opacity-70" />
          </button>
        ))}
      </div>

      {/* Controles */}
      <div className="flex gap-4 justify-center">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
          >
            <Zap className="w-5 h-5" />
            Empezar Juego
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Reiniciar
          </button>
        )}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
          <h3 className="font-bold text-red-900 mb-2">¡Game Over!</h3>
          <p className="text-red-700 text-sm mb-3">
            Conseguiste {score} {score === 1 ? 'punto' : 'puntos'}. ¡No está mal!
          </p>
          <button
            onClick={startGame}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
          >
            Jugar de Nuevo
          </button>
        </div>
      )}

      {/* Instrucciones */}
      {!isPlaying && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">¿Cómo jugar?</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Observa la secuencia de colores</li>
            <li>• Repite la secuencia haciendo clic</li>
            <li>• Cada ronda añade un color más</li>
            <li>• ¡Intenta llegar lo más lejos posible!</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SimonGame;
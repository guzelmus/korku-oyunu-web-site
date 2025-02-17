import React, { useEffect, useState } from 'react';
import { Ghost } from 'lucide-react';
import { Player } from './components/Player';
import { Monster } from './components/Monster';
import { Book } from './components/Book';
import { GameOver } from './components/GameOver';
import { Victory } from './components/Victory';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const {
    playerPosition,
    monsterPosition,
    books,
    collectedBooks,
    gameOver,
    victory,
    handleKeyPress,
    restartGame,
    lastDirection
  } = useGameLogic();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  if (gameOver) {
    return <GameOver onRestart={restartGame} booksCollected={collectedBooks} />;
  }

  if (victory) {
    return <Victory onRestart={restartGame} />;
  }

  const distance = Math.sqrt(
    Math.pow(playerPosition.x - monsterPosition.x, 2) + 
    Math.pow(playerPosition.y - monsterPosition.y, 2)
  );

  const heartbeatIntensity = Math.max(0, Math.min(1, 1 - distance / 10));

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div 
        className={`relative w-[800px] h-[600px] bg-[#111] border-4 border-gray-700 overflow-hidden pixel-art shadow-[0_0_50px_rgba(255,0,0,${heartbeatIntensity})]`}
        style={{
          animation: heartbeatIntensity > 0.5 ? 'heartbeat 1s infinite' : 'none'
        }}
      >
        {/* Vignette Effect */}
        <div className="absolute inset-0 vignette pointer-events-none"></div>

        {/* Game UI */}
        <div className="absolute top-4 left-4 text-white pixel-text z-10 bg-black/50 p-2 rounded">
          <div className="flex items-center gap-2">
            <span className="text-blue-400">📚</span>
            <span>Books: {collectedBooks}/10</span>
          </div>
        </div>

        {/* Game Grid */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(15,1fr)]">
          {/* Walls and Room Layout */}
          <div className="absolute inset-0 bg-[#1a1a1a] pixel-walls"></div>
          
          {/* Books */}
          {books.map((book, index) => (
            <Book key={index} position={book} />
          ))}

          {/* Player */}
          <Player position={playerPosition} direction={lastDirection} />

          {/* Monster */}
          <Monster position={monsterPosition} playerPosition={playerPosition} />

          {/* Ambient Light */}
          <div 
            className="absolute rounded-full bg-gradient-radial from-yellow-500/20 to-transparent pointer-events-none"
            style={{
              width: '200px',
              height: '200px',
              left: `${playerPosition.x * 40 - 80}px`,
              top: `${playerPosition.y * 40 - 80}px`,
              transition: 'all 0.1s ease-out'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import { Skull } from 'lucide-react';

interface GameOverProps {
  onRestart: () => void;
  booksCollected: number;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart, booksCollected }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center pixel-text bg-[#111] p-12 rounded-lg border-2 border-red-800 shadow-[0_0_50px_rgba(255,0,0,0.3)]">
        <Skull className="w-20 h-20 text-red-500 mx-auto mb-8 animate-pulse" />
        <h1 className="text-red-500 text-4xl mb-4 animate-[textGlow_2s_ease-in-out_infinite]">GAME OVER</h1>
        <p className="text-gray-400 mb-4">The monster caught you!</p>
        <p className="text-blue-400 mb-8">Books collected: {booksCollected}/10</p>
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-red-900 text-white hover:bg-red-800 transition-colors rounded-lg shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:shadow-[0_0_30px_rgba(255,0,0,0.5)]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
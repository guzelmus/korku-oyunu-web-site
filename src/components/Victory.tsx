import React from 'react';
import { Trophy } from 'lucide-react';

interface VictoryProps {
  onRestart: () => void;
}

export const Victory: React.FC<VictoryProps> = ({ onRestart }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center pixel-text bg-[#111] p-12 rounded-lg border-2 border-green-800 shadow-[0_0_50px_rgba(0,255,0,0.2)]">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-8 animate-bounce" />
        <h1 className="text-green-500 text-4xl mb-4 animate-[textGlow_2s_ease-in-out_infinite]">YOU ESCAPED!</h1>
        <p className="text-gray-300 mb-8">You collected all the books and survived!</p>
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-green-900 text-white hover:bg-green-800 transition-colors rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
import React from 'react';
import { Ghost } from 'lucide-react';

interface MonsterProps {
  position: { x: number; y: number };
  playerPosition: { x: number; y: number };
}

export const Monster: React.FC<MonsterProps> = ({ position, playerPosition }) => {
  const dx = playerPosition.x - position.x;
  const dy = playerPosition.y - position.y;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return (
    <div
      className="absolute w-[40px] h-[40px] flex items-center justify-center text-red-500 transition-all duration-200"
      style={{
        left: `${position.x * 40}px`,
        top: `${position.y * 40}px`,
        transform: `rotate(${angle}deg)`,
        filter: 'drop-shadow(0 0 12px rgba(239, 68, 68, 0.7))',
      }}
    >
      <Ghost className="w-7 h-7 animate-[pulse_2s_ease-in-out_infinite]" />
      <div className="absolute w-32 h-32 bg-gradient-radial from-red-500/20 to-transparent rounded-full -z-10 animate-[pulse_4s_ease-in-out_infinite]"></div>
    </div>
  );
};
import React from 'react';
import { User } from 'lucide-react';

interface PlayerProps {
  position: { x: number; y: number };
  direction: string;
}

export const Player: React.FC<PlayerProps> = ({ position, direction }) => {
  const getRotation = () => {
    switch (direction) {
      case 'right': return 'rotate-0';
      case 'left': return 'rotate-180';
      case 'up': return '-rotate-90';
      case 'down': return 'rotate-90';
      default: return 'rotate-0';
    }
  };

  return (
    <div
      className={`absolute w-[40px] h-[40px] flex items-center justify-center text-yellow-400 transition-all duration-100 ${getRotation()}`}
      style={{
        left: `${position.x * 40}px`,
        top: `${position.y * 40}px`,
        filter: 'drop-shadow(0 0 8px rgba(234, 179, 8, 0.5))',
      }}
    >
      <User className="w-6 h-6" />
    </div>
  );
};
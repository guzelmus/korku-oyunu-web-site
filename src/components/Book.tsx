import React from 'react';
import { BookOpen } from 'lucide-react';

interface BookProps {
  position: { x: number; y: number };
}

export const Book: React.FC<BookProps> = ({ position }) => {
  return (
    <div
      className="absolute w-[40px] h-[40px] flex items-center justify-center text-blue-400 animate-[float_3s_ease-in-out_infinite]"
      style={{
        left: `${position.x * 40}px`,
        top: `${position.y * 40}px`,
        filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.5))',
      }}
    >
      <BookOpen className="w-5 h-5" />
    </div>
  );
};
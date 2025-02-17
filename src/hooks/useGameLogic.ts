import { useState, useCallback, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

const GRID_WIDTH = 20;
const GRID_HEIGHT = 15;
const INITIAL_BOOKS = 10;
const MONSTER_SPEED = 600; // Lower = faster

export const useGameLogic = () => {
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 1, y: 1 });
  const [monsterPosition, setMonsterPosition] = useState<Position>({ x: 18, y: 13 });
  const [books, setBooks] = useState<Position[]>([]);
  const [collectedBooks, setCollectedBooks] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [lastDirection, setLastDirection] = useState('right');

  // Initialize books in random positions
  const initializeBooks = useCallback(() => {
    const newBooks: Position[] = [];
    while (newBooks.length < INITIAL_BOOKS) {
      const position = {
        x: Math.floor(Math.random() * (GRID_WIDTH - 2)) + 1,
        y: Math.floor(Math.random() * (GRID_HEIGHT - 2)) + 1,
      };
      
      // Ensure books don't overlap with player or monster starting positions
      if (
        !newBooks.some(book => book.x === position.x && book.y === position.y) &&
        !(position.x === 1 && position.y === 1) &&
        !(position.x === 18 && position.y === 13)
      ) {
        newBooks.push(position);
      }
    }
    return newBooks;
  }, []);

  // Initialize game state
  useEffect(() => {
    setBooks(initializeBooks());
  }, [initializeBooks]);

  // Monster AI with improved pathfinding
  useEffect(() => {
    if (gameOver || victory) return;

    const moveMonster = setInterval(() => {
      setMonsterPosition(prev => {
        const dx = playerPosition.x - prev.x;
        const dy = playerPosition.y - prev.y;
        
        // Calculate distance
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Increase speed when closer to player
        const speedMultiplier = Math.max(0.5, Math.min(1.5, 2 - distance / 10));
        
        // Move monster towards player with some randomness
        const randomFactor = Math.random() * 0.3; // Add some unpredictability
        const moveX = Math.sign(dx) * (Math.random() > randomFactor ? 1 : 0);
        const moveY = Math.sign(dy) * (Math.random() > randomFactor ? 1 : 0);
        
        const newX = prev.x + moveX;
        const newY = prev.y + moveY;
        
        // Ensure monster stays within bounds
        return {
          x: Math.max(0, Math.min(GRID_WIDTH - 1, newX)),
          y: Math.max(0, Math.min(GRID_HEIGHT - 1, newY))
        };
      });
    }, MONSTER_SPEED);

    return () => clearInterval(moveMonster);
  }, [playerPosition, gameOver, victory]);

  // Check collisions with improved detection
  useEffect(() => {
    // Check monster collision with more precise hitbox
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - monsterPosition.x, 2) + 
      Math.pow(playerPosition.y - monsterPosition.y, 2)
    );

    if (distance < 1.2) { // Slightly larger collision radius
      setGameOver(true);
    }

    // Check book collection
    const bookIndex = books.findIndex(
      book => book.x === playerPosition.x && book.y === playerPosition.y
    );

    if (bookIndex !== -1) {
      const newBooks = [...books];
      newBooks.splice(bookIndex, 1);
      setBooks(newBooks);
      setCollectedBooks(prev => {
        const newCount = prev + 1;
        if (newCount >= INITIAL_BOOKS) {
          setVictory(true);
        }
        return newCount;
      });
    }
  }, [playerPosition, monsterPosition, books]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameOver || victory) return;

    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (event.key) {
        case 'ArrowUp':
          newY = Math.max(0, prev.y - 1);
          setLastDirection('up');
          break;
        case 'ArrowDown':
          newY = Math.min(GRID_HEIGHT - 1, prev.y + 1);
          setLastDirection('down');
          break;
        case 'ArrowLeft':
          newX = Math.max(0, prev.x - 1);
          setLastDirection('left');
          break;
        case 'ArrowRight':
          newX = Math.min(GRID_WIDTH - 1, prev.x + 1);
          setLastDirection('right');
          break;
      }

      return { x: newX, y: newY };
    });
  }, [gameOver, victory]);

  const restartGame = useCallback(() => {
    setPlayerPosition({ x: 1, y: 1 });
    setMonsterPosition({ x: 18, y: 13 });
    setBooks(initializeBooks());
    setCollectedBooks(0);
    setGameOver(false);
    setVictory(false);
    setLastDirection('right');
  }, [initializeBooks]);

  return {
    playerPosition,
    monsterPosition,
    books,
    collectedBooks,
    gameOver,
    victory,
    handleKeyPress,
    restartGame,
    lastDirection,
  };
};
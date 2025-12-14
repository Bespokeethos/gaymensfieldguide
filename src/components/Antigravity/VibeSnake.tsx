'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { InteractiveContainer } from './InteractiveContainer';
import { Play, RefreshCw, Cpu } from 'lucide-react';

const GRID_SIZE = 20;
const SPEED = 100;

interface VibeSnakeProps {
  topic?: string;
  tokenName?: string;
}

export function VibeSnake({ topic = "CONTEXT_WINDOW", tokenName = "TOKENS" }: VibeSnakeProps) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 }); // Start static
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // Initialize random food
  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isPlaying]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    // Don't move if no direction set (start of game)
    if (direction.x === 0 && direction.y === 0) return;

    const moveSnake = setInterval(() => {
      setSnake((prev) => {
        const newHead = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };

        // Check Wall Collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setHighScore(h => Math.max(h, score));
          return prev;
        }

        // Check Self Collision
        if (prev.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
            setGameOver(true);
            setHighScore(h => Math.max(h, score));
            return prev;
        }

        const newSnake = [newHead, ...prev];

        // Check Food
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(moveSnake);
  }, [direction, food, gameOver, isPlaying, generateFood, score]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection({ x: 1, y: 0 }); // Start moving right
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  return (
    <InteractiveContainer title={`${topic}_SIMULATOR`} type="game">
      <div className="flex flex-col items-center font-mono">
        <div className="flex justify-between w-full max-w-[300px] mb-4 text-xs text-zinc-400">
           <div className="flex items-center gap-2">
             <Cpu size={14} />
             <span>{tokenName}: {score}</span>
           </div>
           <div>HI-SCORE: {highScore}</div>
        </div>

        <div 
          className="relative bg-zinc-950 border border-zinc-800"
          style={{ 
            width: 300, 
            height: 300, 
            display: 'grid', 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
          }}
        >
            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:15px_15px]" />

            {!isPlaying && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10">
                    <button 
                        onClick={startGame}
                        className="flex items-center gap-2 bg-neon-green text-black px-4 py-2 font-bold hover:bg-green-400 transition-colors"
                    >
                        <Play size={16} /> INITIALIZE_MODEL
                    </button>
                    <p className="text-[10px] text-zinc-500 mt-2">USE ARROW KEYS</p>
                </div>
            )}

            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/40 z-10 backdrop-blur-sm">
                    <p className="text-neon-red font-black text-xl mb-2">CONTEXT_LIMIT_REACHED</p>
                    <p className="text-white text-sm mb-4">HALLUCINATION DETECTED</p>
                    <button 
                        onClick={startGame}
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 font-bold hover:bg-zinc-200 transition-colors"
                    >
                        <RefreshCw size={16} /> REBOOT_SYSTEM
                    </button>
                </div>
            )}

            {/* Render Game Objects (Manual approach for simplicity vs mapping full grid) */}
             {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                 const x = i % GRID_SIZE;
                 const y = Math.floor(i / GRID_SIZE);
                 
                 const isSnake = snake.some(s => s.x === x && s.y === y);
                 const isHead = snake[0].x === x && snake[0].y === y;
                 const isFood = food.x === x && food.y === y;

                 let bgClass = "transparent";
                 if (isHead) bgClass = "bg-neon-green";
                 else if (isSnake) bgClass = "bg-green-800";
                 else if (isFood) bgClass = "bg-banana-500 animate-pulse";

                 return (
                     <div key={i} className={`${bgClass} rounded-sm`} />
                 );
             })}
        </div>
        
        <div className="mt-4 text-[10px] text-zinc-600">
           EAT TOKENS TO EXPAND CONTEXT WINDOW. AVOID WALLS.
        </div>
      </div>
    </InteractiveContainer>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Trophy, Award, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LeaderboardEntry } from '../types';
import { audio } from '../audio';

interface MiniGameProps {
  isOpen: boolean;
  onClose: () => void;
  onGameWon: () => void;
}

interface GameObject {
  id: number;
  x: number; // percentage (0-100)
  y: number; // pixels from top
  type: 'coffee' | 'crystal' | 'bug';
  speed: number;
}

export default function MiniGame({ isOpen, onClose, onGameWon }: MiniGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [playerPosition, setPlayerPosition] = useState(50); // percentage (0-100)
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasWonBefore, setHasWonBefore] = useState(false);

  const gameLoopRef = useRef<any>(null);
  const objectIdRef = useRef(0);
  const playAreaRef = useRef<HTMLDivElement>(null);

  // Load Leaderboard from LocalStorage
  useEffect(() => {
    const stored = localStorage.getItem('kashi_universe_arcade');
    if (stored) {
      try {
        setLeaderboard(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default leaderboards
      const defaults = [
        { name: 'KASHI_AI', score: 140, date: '2026-07-17' },
        { name: 'FLUTTER_PRO', score: 110, date: '2026-07-16' },
        { name: 'HUMAN_VISITOR', score: 50, date: '2026-07-15' }
      ];
      localStorage.setItem('kashi_universe_arcade', JSON.stringify(defaults));
      setLeaderboard(defaults);
    }
  }, []);

  // Keyboard controls for the player
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setPlayerPosition(p => Math.max(5, p - 8));
        audio.playArcadeBeep('jump');
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setPlayerPosition(p => Math.min(95, p + 8));
        audio.playArcadeBeep('jump');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver]);

  // Main Game Loops
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    // Time countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    // Spawner interval
    const spawnInterval = setInterval(() => {
      const types: ('coffee' | 'crystal' | 'bug')[] = ['coffee', 'coffee', 'crystal', 'bug', 'bug'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      
      const newObj: GameObject = {
        id: objectIdRef.current++,
        x: 10 + Math.random() * 80,
        y: -20,
        type: chosenType,
        speed: 4 + Math.random() * 4
      };
      
      setGameObjects(prev => [...prev, newObj]);
    }, 600);

    // Animation & Collision Loop
    const updateGame = () => {
      setGameObjects(prev => {
        const heightLimit = playAreaRef.current?.clientHeight || 280;
        const hitZoneY = heightLimit - 40; // Robot vertical height

        return prev
          .map(obj => ({ ...obj, y: obj.y + obj.speed }))
          .filter(obj => {
            // Check collision
            const distanceX = Math.abs(obj.x - playerPosition);
            const isCollidingY = obj.y >= hitZoneY - 10 && obj.y <= hitZoneY + 15;
            
            if (isCollidingY && distanceX < 12) {
              // Trigger score additions
              if (obj.type === 'coffee') {
                setScore(s => s + 10);
                audio.playArcadeBeep('score');
              } else if (obj.type === 'crystal') {
                setScore(s => s + 25);
                audio.playArcadeBeep('score');
              } else {
                setScore(s => Math.max(0, s - 15));
                audio.playArcadeBeep('gameover');
              }
              return false; // remove object
            }
            
            // Filter out items that fell past screen
            return obj.y < heightLimit + 20;
          });
      });

      gameLoopRef.current = requestAnimationFrame(updateGame);
    };

    gameLoopRef.current = requestAnimationFrame(updateGame);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, playerPosition]);

  const startGame = () => {
    audio.playClick();
    setScore(0);
    setTimeLeft(20);
    setPlayerPosition(50);
    setGameObjects([]);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const endGame = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    audio.playArcadeBeep('gameover');

    // Save leaderboard if they beat human score
    const userScore = score;
    const isNewHighScore = userScore >= 100;
    
    if (isNewHighScore) {
      onGameWon();
      setHasWonBefore(true);
    }

    // Update local leaderboard list
    const newEntry: LeaderboardEntry = {
      name: 'VISITOR',
      score: userScore,
      date: new Date().toISOString().split('T')[0]
    };
    
    setLeaderboard(prev => {
      const updated = [...prev, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      localStorage.setItem('kashi_universe_arcade', JSON.stringify(updated));
      return updated;
    });
  };

  const movePlayerLeft = () => {
    setPlayerPosition(p => Math.max(5, p - 12));
    audio.playArcadeBeep('jump');
  };

  const movePlayerRight = () => {
    setPlayerPosition(p => Math.min(95, p + 12));
    audio.playArcadeBeep('jump');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md bg-slate-900 border-4 border-pink-500 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.3)] relative font-mono flex flex-col crt-screen"
          >
            {/* Header / Arcade Top */}
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-4 py-3 border-b-2 border-pink-500 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="text-xl">🕹️</span>
                <span className="font-display font-bold tracking-widest text-sm">KASHI ARCADE CABINET</span>
              </div>
              <button
                onClick={() => {
                  audio.playClick();
                  onClose();
                }}
                className="p-1 rounded bg-slate-900/60 hover:bg-slate-900 text-white cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cabinet CRT Screen Area */}
            <div className="p-4 bg-slate-950 flex-1 flex flex-col gap-4">
              <div className="text-center">
                <p className="text-slate-400 text-xs">AI Robot Companion Says:</p>
                <p className="text-pink-400 font-bold text-sm mt-0.5">"Beat my 100 Points score in 20 seconds!"</p>
              </div>

              {/* Game Stage */}
              <div
                ref={playAreaRef}
                className="h-72 w-full bg-slate-900/60 border-2 border-slate-800 rounded-xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* CRT flicker scanlines */}
                <div className="scanline" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/40 pointer-events-none" />

                {!isPlaying && !isGameOver ? (
                  /* Start Screen Overlay */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 z-20 p-6 text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-pink-400 mb-2"
                    >
                      <Trophy size={44} className="mx-auto" />
                    </motion.div>
                    <span className="font-display text-white font-bold tracking-widest text-lg">ROBOT'S REACTION TEST</span>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      Catch <span className="text-amber-400 font-bold">Coffee ☕ (+10)</span> and <span className="text-cyan-400 font-bold">Crystals 💠 (+25)</span>.<br />
                      Avoid <span className="text-red-500 font-bold">Bugs 👾 (-15)</span>. Move with <span className="text-cyan-400 font-bold">A/D Keys</span> or screen buttons.
                    </p>
                    <button
                      onClick={startGame}
                      className="mt-5 px-6 py-2.5 bg-pink-500 hover:bg-pink-600 border border-pink-400 rounded-xl text-white font-bold cursor-pointer text-sm tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.4)] transition-all"
                    >
                      <Play size={14} fill="white" /> INSERT COIN & START
                    </button>
                  </div>
                ) : isGameOver ? (
                  /* Game Over Screen Overlay */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/95 z-20 p-6 text-center">
                    {score >= 100 ? (
                      <div className="text-emerald-400 animate-bounce mb-1">
                        <Sparkles size={40} className="mx-auto" />
                      </div>
                    ) : (
                      <div className="text-rose-500 mb-1">
                        👾
                      </div>
                    )}
                    <span className="font-display font-bold tracking-widest text-lg text-white">
                      {score >= 100 ? 'MISSION ACCOMPLISHED!' : 'SYSTEM DEFEATED'}
                    </span>
                    <p className="text-slate-400 text-xs mt-1">Your Score: <span className="text-pink-400 font-bold text-lg">{score}</span></p>
                    
                    {score >= 100 ? (
                      <p className="text-[11px] text-emerald-400 mt-2">
                        🎉 Awesome! You beat the robot assistant.<br />
                        Kashi's "Coffee Lover" Achievement Unlocked! 🏆
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-500 mt-2">
                        You needed 100 points to win. Try again!
                      </p>
                    )}

                    <div className="flex gap-3 mt-5">
                      <button
                        onClick={startGame}
                        className="px-4 py-2 bg-pink-500 hover:bg-pink-600 border border-pink-400 rounded-lg text-white font-bold cursor-pointer text-xs flex items-center gap-1 shadow-md transition-all"
                      >
                        <RotateCcw size={12} /> PLAY AGAIN
                      </button>
                      <button
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 font-bold cursor-pointer text-xs transition-all"
                      >
                        CLOSE CABINET
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Live Game Screen */
                  <>
                    {/* Game Hud */}
                    <div className="flex justify-between items-center p-3 bg-slate-950/80 border-b border-slate-800/50 z-10 text-white text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold">SCORE:</span>
                        <span className="text-pink-400 font-bold text-sm tracking-wider">{score}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 font-bold">TIME:</span>
                        <span className={`font-bold text-sm tracking-wider ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                          {timeLeft}s
                        </span>
                      </div>
                    </div>

                    {/* Stage Entities Area */}
                    <div className="flex-1 relative">
                      {/* Game Objects */}
                      {gameObjects.map(obj => (
                        <div
                          key={obj.id}
                          style={{ left: `${obj.x}%`, top: `${obj.y}px` }}
                          className="absolute -translate-x-1/2 text-2xl filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)] pointer-events-none select-none"
                        >
                          {obj.type === 'coffee' ? '☕' : obj.type === 'crystal' ? '💠' : '👾'}
                        </div>
                      ))}

                      {/* Player (The sliding robot) */}
                      <div
                        style={{ left: `${playerPosition}%` }}
                        className="absolute bottom-2 -translate-x-1/2 flex flex-col items-center"
                      >
                        {/* Little jet trail */}
                        <div className="w-1.5 h-3 bg-gradient-to-b from-cyan-400 to-transparent rounded-full mb-0.5 animate-pulse" />
                        
                        {/* Animated robot sprite */}
                        <div className="w-10 h-10 bg-slate-800 border-2 border-pink-500 rounded-lg shadow-[0_0_10px_rgba(236,72,153,0.3)] flex items-center justify-center relative">
                          {/* Face screen */}
                          <div className="w-7 h-5 bg-slate-950 rounded flex items-center justify-around px-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
                          </div>
                          {/* Antennas */}
                          <div className="absolute top-[-4px] w-1 h-1.5 bg-pink-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Physical Arcade Console Buttons Overlay */}
              <div className="bg-slate-900 border-t border-slate-800 p-2 rounded-xl flex items-center justify-between">
                {/* Joystick / Controls Label */}
                <div className="flex gap-2.5">
                  <button
                    onClick={movePlayerLeft}
                    disabled={!isPlaying}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-pink-500 rounded-xl text-pink-400 hover:text-pink-300 transition-colors cursor-pointer select-none active:scale-95 disabled:opacity-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={movePlayerRight}
                    disabled={!isPlaying}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-pink-500 rounded-xl text-pink-400 hover:text-pink-300 transition-colors cursor-pointer select-none active:scale-95 disabled:opacity-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Score Log */}
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">TOP LEADERBOARD</span>
                  <div className="text-[11px] text-slate-300 space-y-0.5 mt-1 font-mono">
                    {leaderboard.slice(0, 3).map((entry, idx) => (
                      <div key={idx} className="flex justify-between gap-4">
                        <span>{idx+1}. {entry.name}</span>
                        <span className="text-pink-500 font-bold">{entry.score} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

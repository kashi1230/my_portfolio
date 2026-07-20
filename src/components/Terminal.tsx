import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { TerminalLog } from '../types';
import { audio } from '../audio';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSecretUnlocked?: () => void;
}

export default function Terminal({ isOpen, onClose, onSecretUnlocked = () => {} }: TerminalProps) {
  const [logs, setLogs] = useState<TerminalLog[]>([
    { text: 'KASHI-CORE OS v1.0.4 initialized.', type: 'success' },
    { text: "Type 'help' to see available security protocols.", type: 'output' }
  ]);
  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [hackerMode, setHackerMode] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom of logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, hackerMode]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    audio.playClick();
    const newLogs = [...logs, { text: `kashi-core:~ visitor$ ${input}`, type: 'input' as const }];
    setInput('');

    // Command Parser
    setTimeout(() => {
      switch (cmd) {
        case 'help':
          setLogs([
            ...newLogs,
            { text: 'Available Command Matrix:', type: 'output' },
            { text: '  projects  - View core engineered apps inside the folders', type: 'success' },
            { text: '  resume    - Retrieve memory log summary of Kashi', type: 'success' },
            { text: '  skills    - Print orbital technologies power index', type: 'success' },
            { text: '  contact   - Display communication bridges', type: 'success' },
            { text: '  secret    - Execute restricted core bypass sequence', type: 'error' },
            { text: '  clear     - Wipe local screen terminal buffer', type: 'output' }
          ]);
          break;

        case 'clear':
          setLogs([]);
          break;

        case 'projects':
          setLogs([
            ...newLogs,
            { text: '⚡ RETRIEVING ENGINEERED VAULT LOGS...', type: 'output' },
            { text: '📁 Project 01: ShareOWheels - 3D Mobile phone ride rental simulator (Flutter/React/Map)', type: 'success' },
            { text: '📁 Project 02: Co-Agent - Multi-channel AI automated agent console (Node/OpenAI/Auth)', type: 'success' },
            { text: '📁 Project 03: BrainSync - AI Knowledge graphs & learning systems', type: 'success' },
            { text: '📁 Project 04: EcoSphere - Gamified climate actions and Web3 offsetting', type: 'success' }
          ]);
          break;

        case 'resume':
          setLogs([
            ...newLogs,
            { text: '--- MEMORY CREDENTIALS ---', type: 'output' },
            { text: 'Name: Kashi Chourey', type: 'success' },
            { text: 'Specialty: Mobile Apps (Flutter), Backend APIs, Architectures', type: 'success' },
            { text: 'Total Dev Score: Elite Power Level 96%', type: 'success' },
            { text: 'Bio: Crafting futuristic UI and scalable high-performance backends.', type: 'output' }
          ]);
          break;

        case 'skills':
          setLogs([
            ...newLogs,
            { text: '🌌 ORBITAL SYSTEMS INDEX:', type: 'output' },
            { text: 'Flutter & Dart: 98% [██████████]', type: 'success' },
            { text: 'NodeJS & Express: 94% [█████████ ]', type: 'success' },
            { text: 'ReactJS & NextJS: 88% [████████  ]', type: 'success' },
            { text: 'Firebase & Firestore: 92% [█████████ ]', type: 'success' },
            { text: 'MySQL & MongoDB: 85% [████████  ]', type: 'success' },
            { text: 'PHP & Laravel: 80% [████████  ]', type: 'success' },
            { text: 'AI Model Integration: 90% [█████████ ]', type: 'success' }
          ]);
          break;

        case 'contact':
          setLogs([
            ...newLogs,
            { text: '🛰️ SECURE BRIDGES OPENED:', type: 'output' },
            { text: '  Email    : kashichourey284@gmail.com', type: 'success' },
            { text: '  GitHub   : github.com/kashichourey', type: 'success' },
            { text: '  LinkedIn : linkedin.com/in/kashichourey', type: 'success' },
            { text: '  WhatsApp : +91 (Kashi Developer Line)', type: 'success' }
          ]);
          break;

        case 'secret':
          audio.playThunder();
          setHackerMode(true);
          setLogs([
            ...newLogs,
            { text: '⚠️ CRITICAL WARNING: BYPASS PROTOCOLS ACTIVATED.', type: 'error' },
            { text: 'Injecting kernel modules...', type: 'output' },
            { text: 'Overriding local storage buffer...', type: 'output' },
            { text: 'Achievement unlocked: Found Hidden Project 🏆', type: 'success' },
            { text: 'Entering Core Cyber-Matrix mode...', type: 'success' }
          ]);
          onSecretUnlocked();
          // Reset hacker mode sequence after 8 seconds
          setTimeout(() => {
            setHackerMode(false);
          }, 8000);
          break;

        default:
          audio.playError();
          setLogs([
            ...newLogs,
            { text: `Error: command '${cmd}' not recognized.`, type: 'error' },
            { text: "Type 'help' to audit directory structure.", type: 'output' }
          ]);
          break;
      }
    }, 200);
  };

  const handleKeyPress = () => {
    audio.playType();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            className={`bg-black border-2 ${
              hackerMode ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.5)]' : 'border-slate-800 shadow-2xl'
            } rounded-xl overflow-hidden font-mono text-sm crt-screen flex flex-col ${
              isMaximized ? 'w-full h-full' : 'w-full max-w-2xl h-[450px]'
            }`}
          >
            {/* Terminal Header */}
            <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between border-b border-slate-900">
              <div className="flex items-center gap-2 text-slate-400">
                <TerminalIcon size={14} className={hackerMode ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'} />
                <span className="text-xs font-bold tracking-widest uppercase">
                  {hackerMode ? 'BYPASS_KERNEL@kashi-core' : 'kashi-core:~ terminal'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    audio.playClick();
                    setIsMaximized(!isMaximized);
                  }}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Maximize"
                >
                  {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                </button>
                <button
                  onClick={() => {
                    audio.playClick();
                    onClose();
                  }}
                  className="p-1 rounded bg-red-950/40 hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  title="Close Terminal"
                >
                  <X size={12} />
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div
              className={`flex-1 p-4 overflow-y-auto space-y-2 select-text ${
                hackerMode ? 'text-emerald-400 bg-black' : 'text-slate-300'
              } relative`}
              onClick={() => inputRef.current?.focus()}
            >
              <div className="scanline"></div>

              {/* Hacker Falling Code Matrices Animation Overlay */}
              {hackerMode && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1),transparent)] pointer-events-none overflow-hidden opacity-40">
                  <div className="flex justify-around text-[10px] whitespace-pre font-bold text-emerald-400 animate-pulse-slow">
                    <div>101011010111<br />0010100101<br />01100110101<br />1101101010</div>
                    <div>011010101111<br />1001011010<br />00110010101<br />1010101011</div>
                    <div>110010100101<br />0110101111<br />10101001010<br />0010110101</div>
                    <div>101011010101<br />0110100110<br />11010110011<br />1101011011</div>
                  </div>
                </div>
              )}

              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    log.type === 'input'
                      ? 'text-cyan-400 font-semibold'
                      : log.type === 'error'
                      ? 'text-red-500 font-bold'
                      : log.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-slate-300'
                  }`}
                >
                  {log.text}
                </div>
              ))}

              <div ref={bottomRef} />
            </div>

            {/* Terminal Input Footer */}
            <form onSubmit={handleCommandSubmit} className="bg-slate-950 p-2 border-t border-slate-900 flex items-center">
              <span className="text-cyan-400 font-bold px-2">kashi-core:~ visitor$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 py-1"
                placeholder="Type 'help'..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <button
                type="submit"
                className="p-1 px-3 rounded bg-cyan-950 text-cyan-400 hover:bg-cyan-900/60 border border-cyan-800/40 font-bold hover:text-cyan-300 cursor-pointer transition-colors text-xs flex items-center gap-1"
              >
                EXECUTE <CornerDownLeft size={10} />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

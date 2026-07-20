import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Award,
  Terminal as TerminalIcon,
  Gamepad2,
  FolderOpen,
  User,
  History,
  FolderDot,
  Cpu,
  Mail,
  Moon,
  Sun,
  Github,
  Linkedin,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  Volume2,
  VolumeX,
  RefreshCcw,
  Coffee as CoffeeIcon,
  Database,
  Globe,
  Bot,
  Compass
} from 'lucide-react';

import avatarImg from './assets/avatar.jpg';
import { MemoryCrystal, ProjectFolder, SectionType } from './types';
import { audio } from './audio';
import CompanionRobot from './components/CompanionRobot';
import Terminal from './components/Terminal';
import PhoneSimulator from './components/PhoneSimulator';
import CoAgentSimulator from './components/CoAgentSimulator';

export default function App() {
  // Navigation & Sections
  const [currentSection, setCurrentSection] = useState<SectionType>('intro');
  const [hasEntered, setHasEntered] = useState(false);
  const [dimensionBreak, setDimensionBreak] = useState(false);

  // Robot Scan animation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanTargetCoords, setScanTargetCoords] = useState({ x: 0, y: 0 });
  const [nextSection, setNextSection] = useState<SectionType | null>(null);
  const [nextProjectId, setNextProjectId] = useState<string | null>(null);

  // Trigger scanning animation sequence
  const triggerFolderOpen = (
    section: SectionType,
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
    projectId?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // If entering first time, initialize audio
    if (!hasEntered) {
      audio.init();
      audio.setMute(false);
      setSoundEnabled(true);
      setHasEntered(true);
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const folderX = rect.left + rect.width / 2;
    const folderY = rect.top + rect.height / 2;

    setScanTargetCoords({ x: folderX, y: folderY });
    setNextSection(section);
    if (projectId !== undefined) {
      setNextProjectId(projectId);
    } else {
      setNextProjectId(null);
    }
    setIsScanning(true);
  };

  // Controller for scan animation duration and actual state transition
  useEffect(() => {
    if (isScanning && nextSection) {
      // Short delay for scan audio
      const audioTimer = setTimeout(() => {
        audio.playScan();
      }, 100);

      const transitionTimer = setTimeout(() => {
        // Complete the state change
        setCurrentSection(nextSection);
        if (nextProjectId) {
          setActiveProjectFolder(nextProjectId);
        } else {
          setActiveProjectFolder(null);
        }
        
        audio.playSuccess();
        setIsScanning(false);
      }, 1500);

      return () => {
        clearTimeout(audioTimer);
        clearTimeout(transitionTimer);
      };
    }
  }, [isScanning, nextSection, nextProjectId]);

  // Hidden Terminal
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Cyber Night Mode (Rain, Lightning)
  const [cyberNight, setCyberNight] = useState(false);
  const [lightningActive, setLightningActive] = useState(false);

  // Sound States
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Stats Counters
  const [coffeeClicks, setCoffeeClicks] = useState(0);

  // Robot Dance Konami State
  const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
  const [robotDancing, setRobotDancing] = useState(false);



  // Rocket spaceship contact states
  const [isRocketLaunching, setIsRocketLaunching] = useState(false);
  const [rocketY, setRocketY] = useState(0);

  // Project Folder States
  const [projectFolders, setProjectFolders] = useState<ProjectFolder[]>([
    { id: 'shareowheels', title: 'SHAREOWHEELS', tagline: 'Mobile Mobility & Parking Portal', description: 'shareOwheels is a modern, feature-rich cross-platform mobile application designed to make daily commuting and long-distance travel smart, affordable, and eco-friendly. Built using Flutter and GetX, the app connects drivers and passengers for ride-sharing while offering a unique QR-based smart parking resolution system.', glowingColor: 'cyan', opened: false },
    { id: 'co_agent', title: 'CO-AGENT AI', tagline: 'AI Lead Recovery Ecosystem', description: 'co-agent.ai is a modern, AI-driven lead recovery and sales automation ecosystem designed for small businesses and freelancers. When a customer calls and the call is missed, the system immediately activates, auto-replying with an SMS containing a digital portfolio or visiting card link to keep the client engaged and boost conversion rates.', glowingColor: 'pink', opened: false }
  ]);
  const [activeProjectFolder, setActiveProjectFolder] = useState<string | null>(null);

  // Memory Crystal timeline states
  const [memoryCrystals, setMemoryCrystals] = useState<MemoryCrystal[]>([
    {
      id: 'mc1',
      role: 'Junior Software Engineer',
      company: 'SCREENBROS SERVICES PRIVATE LIMITED',
      duration: 'JULY 2024 - PRESENT',
      description: [
        'Developing and maintaining multiple high-performance mobile applications using Flutter and Dart.',
        'Integrating advanced features like device locking protocols and real-time syncing via FCM.',
        'Optimizing backend connectivity with Node.js and MongoDB for scalable data handling.',
        'Implementing robust local storage solutions using SQLite and Hive for offline-first user experiences.'
      ],
      color: 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.6)]',
      details: 'Engineered cross-platform high-performance apps, local storage engines, and secure sync pipelines.',
      shattered: false
    },
    {
      id: 'mc2',
      role: 'Intern Flutter Developer',
      company: 'SCREENBROS SERVICES PRIVATE LIMITED',
      duration: 'JANUARY 2024 - JUNE 2024',
      description: [
        'Built cross-platform B2B solutions and administrative retailer panels.',
        'Worked extensively on API integration and UI responsiveness.',
        'Gained hands-on experience with Node.js and PHP CodeIgniter for backend modules.',
        'Focused on writing clean, maintainable code following OOP principles.'
      ],
      color: 'bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)]',
      details: 'Developed clean, responsive user interfaces and integrated multiple APIs for administrative controls.',
      shattered: false
    }
  ]);

  // Orbiting Skills Satellites config
  const skillSatellites = [
    { name: 'Flutter', desc: 'Core platform for premium responsive apps (BLoC/GetX/Clean Architecture).', percent: 98, color: 'text-cyan-400 border-cyan-400/30' },
    { name: 'Firebase', desc: 'Realtime database, serverless triggers, Auth systems, and analytics.', percent: 92, color: 'text-amber-500 border-amber-500/30' },
    { name: 'NodeJS', desc: 'Asynchronous event-driven APIs (Express, TSX, fast clustering systems).', percent: 94, color: 'text-emerald-500 border-emerald-500/30' },
    { name: 'MySQL', desc: 'Highly indexed schema layout, complex query optimizations, and DML caching.', percent: 85, color: 'text-blue-500 border-blue-500/30' },
    { name: 'ReactJS', desc: 'Modern responsive SPAs (Hooks, Tailwind, high-end motion animations).', percent: 88, color: 'text-indigo-400 border-indigo-400/30' },
    { name: 'PHP', desc: 'Secure backend architectures, server integrations, and MVC systems.', percent: 80, color: 'text-violet-400 border-violet-400/30' },
    { name: 'AI Models', desc: 'Intelligent prompt engineering, SDK setups (Google GenAI), and agents.', percent: 90, color: 'text-rose-400 border-rose-400/30' }
  ];
  const [activeSkill, setActiveSkill] = useState<typeof skillSatellites[0] | null>(null);

  // EcoSphere interactive planting simulator
  const [forestSize, setForestSize] = useState(0);
  const [offsetSaved, setOffsetSaved] = useState(0.0);

  // Keyboard Konami Code & Mute shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Sound and Mute global toggles on standard keypresses
      if (e.key === 'm' || e.key === 'M') {
        const isMuted = audio.toggleMute();
        setSoundEnabled(!isMuted);
      }

      // Listening to Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A (or ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a)
      const codeKey = e.key.toLowerCase();
      let codeMapValue = '';
      if (e.key === 'ArrowUp') codeMapValue = 'u';
      else if (e.key === 'ArrowDown') codeMapValue = 'd';
      else if (e.key === 'ArrowLeft') codeMapValue = 'l';
      else if (e.key === 'ArrowRight') codeMapValue = 'r';
      else if (codeKey === 'b') codeMapValue = 'b';
      else if (codeKey === 'a') codeMapValue = 'a';
      else return;

      const updatedProgress = [...konamiProgress, codeMapValue].slice(-10);
      setKonamiProgress(updatedProgress);

      const konamiSequence = 'uuddlrlrba';
      if (updatedProgress.join('') === konamiSequence) {
        audio.playSuccess();
        setRobotDancing(true);
        // Dance party ends after 15 seconds
        setTimeout(() => {
          setRobotDancing(false);
        }, 15000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress]);

  // Cyber Night Lightning Strike Generator
  useEffect(() => {
    if (!cyberNight) {
      setLightningActive(false);
      return;
    }

    const lightningInterval = setInterval(() => {
      if (Math.random() > 0.65) {
        audio.playThunder();
        setLightningActive(true);
        setTimeout(() => {
          setLightningActive(false);
          // Small second flash (double strike!)
          if (Math.random() > 0.5) {
            setTimeout(() => {
              setLightningActive(true);
              setTimeout(() => setLightningActive(false), 80);
            }, 150);
          }
        }, 120);
      }
    }, 9000);

    return () => clearInterval(lightningInterval);
  }, [cyberNight]);

  // Sections navigation click logger
  const navigateToSection = (section: SectionType) => {
    audio.playClick();
    setCurrentSection(section);
  };

  // Sound toggle from top header
  const handleToggleSoundGlobal = () => {
    const isMuted = audio.toggleMute();
    setSoundEnabled(!isMuted);
    if (!isMuted) {
      audio.playSuccess();
    }
  };



  // Handle Home Screen glowing folder clicking
  const handleOpenKashiLandFolder = () => {
    audio.playScan();
    setDimensionBreak(true);
    
    // Screen breaks dimensions, and opens Lab
    setTimeout(() => {
      setDimensionBreak(false);
      navigateToSection('about');
    }, 1800);
  };

  // About Lab: Stats clicking increments Coffee index
  const handleCoffeeStatsClick = () => {
    audio.playClick();
    const nextCount = coffeeClicks + 1;
    setCoffeeClicks(nextCount);
  };

  // Experience: click memory crystal to shatter it
  const handleShatterCrystal = (id: string) => {
    setMemoryCrystals(prev =>
      prev.map(mc => {
        if (mc.id === id && !mc.shattered) {
          audio.playExplode();
          return { ...mc, shattered: true };
        }
        return mc;
      })
    );
  };

  // Projects: click mechanical project folder
  const handlePullProjectFolder = (id: string) => {
    audio.playScan();
    
    // Mark folder as opened state
    setProjectFolders(prev =>
      prev.map(f => {
        if (f.id === id) {
          return { ...f, opened: true };
        }
        return f;
      })
    );

    setActiveProjectFolder(id);
  };

  // Contact: Launch spaceship social bridges
  const handleLaunchRocketSpaceship = (url: string) => {
    audio.playRocketLaunch();
    setIsRocketLaunching(true);
    
    // Spaceship motor shake feedback
    let counter = 0;
    const interval = setInterval(() => {
      setRocketY(y => y - 12);
      counter++;
      if (counter > 30) {
        clearInterval(interval);
        window.open(url, '_blank', 'referrer');
        // Reset rocket back in bay after a while
        setTimeout(() => {
          setIsRocketLaunching(false);
          setRocketY(0);
        }, 3000);
      }
    }, 30);
  };

  return (
    <div className={`min-h-screen ${cyberNight ? 'relative' : 'bg-slate-950'} text-slate-100 overflow-x-hidden flex flex-col font-sans transition-colors duration-1000`}>
      
      {/* Cyber Rain Overlays - Night Mode */}
      {cyberNight && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${0.8 + Math.random() * 0.6}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Cyber lightning screen shake and flashes */}
      {lightningActive && (
        <div className="absolute inset-0 bg-white z-40 pointer-events-none opacity-30 transition-opacity duration-75" />
      )}

      {/* Top HUD Floating Control Bar */}
      {hasEntered && currentSection !== 'intro' && (
        <header className="fixed top-6 right-6 left-6 z-40 flex justify-between items-center pointer-events-none">
          {/* Left space logo/nav tag */}
          <div className="pointer-events-auto flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg bg-slate-900 border border-cyan-500/30 hover:border-cyan-400/80 flex items-center justify-center shadow-lg cursor-pointer transition-colors" 
              onClick={(e) => triggerFolderOpen('intro', e)}
              title="Reset System to Welcome Gate"
            >
              <span className="text-sm font-display font-black text-cyan-400">K</span>
            </div>
            <div className="bg-slate-900/95 border border-slate-800 rounded-full px-4 py-1.5 text-[10px] font-mono tracking-widest text-slate-400 flex items-center gap-2 shadow-lg select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>
                C:\KASHI_OS\{currentSection === 'skills' ? 'RESUME' : currentSection.toUpperCase()}
                {currentSection === 'projects' && activeProjectFolder ? '\\' + activeProjectFolder.toUpperCase() : ''}
              </span>
            </div>
          </div>

          {/* Right toggle controls */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Global Sound Switcher */}
            <button
              onClick={handleToggleSoundGlobal}
              className="p-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 cursor-pointer shadow-lg transition-all"
              title="Toggle Audio Synthesizer"
            >
              {soundEnabled ? <Volume2 size={15} className="text-cyan-400 animate-bounce" /> : <VolumeX size={15} />}
            </button>

            {/* Cyber Night Mode Rain Toggle */}
            <button
              onClick={() => {
                audio.playClick();
                setCyberNight(!cyberNight);
              }}
              className={`p-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-blue-400/50 hover:bg-slate-800 cursor-pointer shadow-lg transition-all ${cyberNight ? 'text-blue-400 border-blue-400/40' : 'text-slate-400'}`}
              title="Toggle Cyber City Night Rain"
            >
              {cyberNight ? <Moon size={15} className="animate-pulse" /> : <Sun size={15} />}
            </button>

            {/* HUD Terminal launcher shortcut */}
            <button
              onClick={() => {
                audio.playClick();
                setIsTerminalOpen(true);
              }}
              className="p-2 rounded-full bg-slate-900/90 border border-slate-800 hover:border-yellow-400/50 hover:bg-slate-800 text-slate-400 hover:text-yellow-400 cursor-pointer shadow-lg transition-all"
              title="Open Shell Terminal (~)"
            >
              <TerminalIcon size={15} />
            </button>
          </div>
        </header>
      )}

      {/* Persistent global space navigation removed - replaced by breadcrumbs and folder navigation */}

      {/* Main viewport area */}
      <main className="flex-1 flex flex-col justify-center items-center relative min-h-screen">
        <AnimatePresence mode="wait">
          
          {currentSection === 'intro' && (
            /* ==============================================================
               STAGE 0: WELCOME TO KASHI'S LAND (WELCOME SCREEN)
               ============================================================== */
            <motion.section
              key="intro"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-slate-950 flex flex-col justify-between items-center p-8 text-cyan-400 font-mono crt-screen overflow-hidden"
            >
              <div className="scanline"></div>
              
              {/* Starfield overlay effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.06),transparent_70%)] pointer-events-none" />

              {/* Top Bar Status Details */}
              <div className="w-full max-w-4xl flex justify-between items-center text-[10px] text-slate-500 border-b border-slate-900 pb-3 z-10">
                <span className="flex items-center gap-1.5 font-bold tracking-widest text-cyan-400">
                  <TerminalIcon size={12} className="animate-pulse" />
                  KASHI-LAND-CORE v2.0
                </span>
                <span className="font-mono tracking-wider">HOST: SECURE // IP: 127.0.0.1</span>
              </div>

              {/* Main Welcome Container */}
              <div className="flex-1 flex flex-col justify-center items-center text-center z-10 max-w-2xl px-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4"
                >
                  <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 uppercase">
                    SYSTEM SECURE // TERMINAL READY
                  </span>
                  
                  {/* Huge glowing title in Space Grotesk */}
                  <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    WELCOME TO<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] glow-blue">
                      KASHI'S LAND
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-400 font-mono max-w-md mx-auto leading-relaxed border-t border-slate-900 pt-4 mt-2">
                    A cosmic developer universe compiling high-performance mobile systems and scalable backend architectures.
                  </p>
                </motion.div>
              </div>

              {/* Bottom Side File Folder Node */}
              <div className="w-full flex flex-col items-center justify-end pb-8 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col items-center gap-3.5"
                >
                  {/* Pulse instruction text */}
                  <span className="text-[10px] sm:text-xs text-slate-500 font-mono tracking-widest uppercase animate-pulse">
                    SELECT PORTAL NODE TO DEPLOY DATA
                  </span>

                  {/* The Glowing Folder Icon (Welcome Node) */}
                  <motion.div
                    id="welcome-folder-node"
                    onClick={(e) => triggerFolderOpen('about', e)}
                    className="group bg-slate-900/90 hover:bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-5 px-8 text-center cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all box-glow-blue flex items-center gap-4 select-none relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Left neon bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-l-2xl group-hover:bg-emerald-400 transition-colors" />
                    
                    <div className="text-cyan-400 group-hover:text-emerald-400 transition-colors animate-pulse">
                      <FolderOpen size={28} />
                    </div>
                    
                    <div className="text-left font-mono">
                      <span className="text-[9px] text-slate-500 block uppercase tracking-wider font-bold">NODE: ROOT_SECTOR</span>
                      <span className="font-display font-black text-white text-sm tracking-widest block uppercase">
                        kashis_land.dat
                      </span>
                    </div>

                    <span className="text-[10px] text-emerald-400 font-bold ml-4 border-l border-slate-800 pl-4 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">
                      [ RUN ]
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
          )}

          {currentSection === 'about' && (
            /* ==============================================================
               STAGE 2: PROFILE PORTAL & DIRECT PROTOCOLS ("ABOUT CORE")
               ============================================================== */
            <motion.section
              key="about"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="w-full max-w-5xl px-6 py-12 md:py-20 flex flex-col items-center select-none"
            >
              {/* Core Header */}
              <div className="text-center mb-8 md:mb-12">
                <span className="text-xs font-mono text-cyan-400 tracking-widest font-bold uppercase block">
                  SYSTEM CORE: INDEX_01
                </span>
                <h2 className="font-display font-black text-3xl md:text-5xl text-white mt-1 uppercase tracking-tight">
                  BIOMETRIC IDENTITY
                </h2>
              </div>

              {/* Profile details grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
                {/* Left: Avatar & Floating stats panel */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/40 border border-slate-850 rounded-3xl p-6 box-glow-blue">
                  <div className="w-full aspect-square max-w-[280px] mx-auto rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className="scanline" />
                    
                    {/* Floating Avatar Image */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                      }}
                      className="w-36 h-36 border-2 border-cyan-500/40 rounded-full flex items-center justify-center relative shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-950/90 overflow-hidden p-1"
                    >
                      <div className="absolute inset-1.5 border border-cyan-400/20 rounded-full animate-ping z-10 pointer-events-none" />
                      <img 
                        src={avatarImg} 
                        alt="Kashi Chourey Profile" 
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/avatar.jpg';
                        }}
                      />
                    </motion.div>

                    <div className="absolute top-3 left-3 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                      SYSTEM ID // #AUTH_01
                    </div>
                    <div className="absolute bottom-3 right-3 text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                      CORE: LIVE
                    </div>
                  </div>

                  {/* Fuel click Depot inside avatar frame */}
                  <div
                    onClick={handleCoffeeStatsClick}
                    className="mt-6 p-4 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-amber-500/40 rounded-2xl flex justify-between items-center cursor-pointer transition-all active:scale-98"
                  >
                    <div className="flex items-center gap-2">
                      <CoffeeIcon size={16} className="text-amber-500 animate-pulse" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">COFFEE CHARGE DEPOT</span>
                    </div>
                    <span className="text-amber-400 font-bold text-xs font-mono">
                      {coffeeClicks >= 5 ? '∞ LEVEL MAXED!' : `${coffeeClicks} / 5 INJECTIONS`}
                    </span>
                  </div>
                </div>

                {/* Right: Direct protocol nodes list */}
                <div className="lg:col-span-7 bg-slate-900/30 p-6 rounded-3xl border border-slate-855 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-4">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">IDENTITY LOG</span>
                      <h3 className="font-display font-black text-white text-2xl md:text-3xl tracking-tight">KASHI CHOUREY</h3>
                      <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase block mt-1">
                        🛠️ Junior Software Engineer // Flutter Developer
                      </span>
                    </div>

                    <p className="text-xs md:text-sm text-slate-400 font-mono leading-relaxed">
                      Crafting digital excellence at top-tier firms in India. Experienced in building robust, highly responsive B2B/B2C mobile architectures (Flutter & Dart) and setting up secure, event-driven server backends (Node.js & Express).
                    </p>

                    {/* Protocol grids nodes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 font-mono text-xs">
                      <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-xl flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">📡 PROFESSIONAL NODE</span>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400 mt-1 font-bold flex items-center gap-1 cursor-pointer">
                          Kashi Chourey <Linkedin size={10} />
                        </a>
                      </div>

                      <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-xl flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">💻 GIT SOURCE</span>
                        <a href="https://github.com/kashi1230" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400 mt-1 font-bold flex items-center gap-1 cursor-pointer">
                          @kashi1230 <Github size={10} />
                        </a>
                      </div>

                      <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-xl flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">📞 MOBILE SECURE</span>
                        <span className="text-white mt-1 font-bold">+91 96857 16342</span>
                      </div>

                      <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-xl flex flex-col">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">📍 GRID LOCATION</span>
                        <span className="text-white mt-1 font-bold">Itarsi, MP, India</span>
                      </div>

                      <div className="p-3 bg-slate-950/70 border border-slate-850 rounded-xl flex flex-col sm:col-span-2">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">📧 IDENTITY NODE / SSL</span>
                        <a href="mailto:kashichourey284@gmail.com" className="text-emerald-400 hover:text-cyan-400 mt-1 font-bold block truncate cursor-pointer">
                          kashichourey284@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subfolder Navigation Title */}
              <div className="w-full max-w-5xl border-t border-slate-900 pt-10 mt-12 mb-6 flex flex-col items-center">
                <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-1">
                  DEPLOY ARCHIVES DIRECTORY
                </span>
                <h3 className="font-display font-black text-white text-lg tracking-wider uppercase">
                  DIRECTORY FILE SECTORS
                </h3>
              </div>

              {/* 3 Folder Icons at bottom */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mt-4 z-10">
                {/* 1. Projects Folder */}
                <motion.div
                  onClick={(e) => triggerFolderOpen('projects', e)}
                  className="group p-5 bg-slate-900/60 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 rounded-2xl flex flex-col justify-between h-48 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.06)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all box-glow-blue text-center relative"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-400 group-hover:bg-cyan-300 transition-colors rounded-l-2xl" />
                  <div className="text-cyan-400 mx-auto group-hover:scale-110 transition-transform">
                    <FolderDot size={32} />
                  </div>
                  <div className="font-mono">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">DIRECTORY: VAULT_01</span>
                    <h4 className="font-display font-black text-white text-md tracking-widest uppercase mt-0.5">PROJECT VAULT</h4>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest group-hover:underline">
                    ACCESS LOCK &gt;
                  </span>
                </motion.div>

                {/* 2. Resume Folder */}
                <motion.div
                  onClick={(e) => triggerFolderOpen('skills', e)}
                  className="group p-5 bg-slate-900/60 hover:bg-slate-900 border border-pink-500/30 hover:border-pink-400 rounded-2xl flex flex-col justify-between h-48 cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.06)] hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all box-glow-pink text-center relative"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-pink-400 group-hover:bg-pink-300 transition-colors rounded-l-2xl" />
                  <div className="text-pink-400 mx-auto group-hover:scale-110 transition-transform">
                    <FolderDot size={32} />
                  </div>
                  <div className="font-mono">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">DIRECTORY: RESUME_02</span>
                    <h4 className="font-display font-black text-white text-md tracking-widest uppercase mt-0.5">RESUME NODES</h4>
                  </div>
                  <span className="text-[9px] font-mono text-pink-400 uppercase tracking-widest group-hover:underline">
                    ACCESS LOCK &gt;
                  </span>
                </motion.div>

                {/* 3. Experience Folder */}
                <motion.div
                  onClick={(e) => triggerFolderOpen('experience', e)}
                  className="group p-5 bg-slate-900/60 hover:bg-slate-900 border border-yellow-500/30 hover:border-yellow-400 rounded-2xl flex flex-col justify-between h-48 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.06)] hover:shadow-[0_0_25px_rgba(234,179,8,0.3)] transition-all box-glow-yellow text-center relative"
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-yellow-400 group-hover:bg-yellow-300 transition-colors rounded-l-2xl" />
                  <div className="text-yellow-400 mx-auto group-hover:scale-110 transition-transform">
                    <FolderDot size={32} />
                  </div>
                  <div className="font-mono">
                    <span className="text-[8px] text-slate-500 uppercase tracking-widest block font-bold">DIRECTORY: HISTORY_03</span>
                    <h4 className="font-display font-black text-white text-md tracking-widest uppercase mt-0.5">EXPERIENCE LOGS</h4>
                  </div>
                  <span className="text-[9px] font-mono text-yellow-400 uppercase tracking-widest group-hover:underline">
                    ACCESS LOCK &gt;
                  </span>
                </motion.div>
              </div>
            </motion.section>
          )}

          {currentSection === 'experience' && (
            /* ==============================================================
               STAGE 3: TIMELINE & MEMORY CRYSTALS ("MEMORY LOGS")
               ============================================================== */
            <motion.section
              key="experience"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl px-6 py-20 flex flex-col items-center select-none"
            >
              {/* Back Button */}
              <div className="w-full max-w-2xl mb-8 flex justify-start">
                <button
                  onClick={(e) => triggerFolderOpen('about', e)}
                  className="px-4 py-2 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-400 hover:text-cyan-400 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  &lt; BACK TO IDENTITY
                </button>
              </div>

              <div className="text-center mb-10">
                <span className="text-xs font-mono text-yellow-400 tracking-widest font-bold uppercase block">SECTOR 03: MEMORY BUFFER</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-white mt-1 uppercase tracking-tight">EXPERIENCE LOGS</h2>
              </div>

              {/* Timeline Container rising upwards */}
              <div className="relative border-l-2 border-slate-800 pl-8 md:pl-12 space-y-12 max-w-2xl font-mono">
                {memoryCrystals.map((crystal) => (
                  <div key={crystal.id} className="relative">
                    
                    {/* Memory Crystal Bullet Node */}
                    <div className="absolute left-[-42px] md:left-[-58px] top-1 z-10">
                      <motion.div
                        onClick={() => handleShatterCrystal(crystal.id)}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-slate-955 flex items-center justify-center cursor-pointer transition-colors ${
                          crystal.shattered ? 'bg-slate-950 text-slate-700' : crystal.color + ' text-white animate-pulse'
                        }`}
                        title="Click to shatter crystal"
                      >
                        {crystal.shattered ? '💥' : '💎'}
                      </motion.div>
                    </div>

                    <div className="flex justify-between items-center flex-wrap gap-2 text-xs mb-1">
                      <span className="text-slate-500 font-bold tracking-wider">{crystal.duration}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10px]">
                        {crystal.company}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-base md:text-lg tracking-tight mb-2 uppercase">
                      {crystal.role}
                    </h3>

                    {/* Shattered state logic layout */}
                    <AnimatePresence mode="wait">
                      {!crystal.shattered ? (
                        <motion.div
                          key="unshattered"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="p-4 bg-slate-900/30 rounded-xl border border-slate-800/80 text-xs text-slate-400 cursor-pointer hover:border-cyan-500/30 text-center py-6"
                          onClick={() => handleShatterCrystal(crystal.id)}
                        >
                          <span className="text-yellow-400 font-bold block animate-bounce">💎 CRYSTAL SECURED</span>
                          <span className="text-[10px] block mt-1">Tap this crystal to shatter its shell and access memory logs!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="shattered"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 space-y-2 text-xs leading-relaxed text-slate-300 animate-pulse-once"
                        >
                          <span className="text-[9px] text-yellow-400 block font-bold tracking-widest uppercase">--- INTEGRITY AUDIT: SHATTERED ---</span>
                          <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                            {crystal.description.map((bullet, idx) => (
                              <li key={idx}>{bullet}</li>
                            ))}
                          </ul>
                          <div className="pt-2.5 border-t border-slate-900 mt-2 text-cyan-400 text-[11px] leading-relaxed">
                            💡 <strong>Core Project Info:</strong> {crystal.details}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {currentSection === 'projects' && (
            /* ==============================================================
               STAGE 4: VAULT & 4 GLOWING FOLDERS ("PROJECT VAULT")
               ============================================================== */
            <motion.section
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-6xl px-6 py-20 flex flex-col items-center select-none"
            >
              {/* Back Button (Only show when not in detail view) */}
              {!activeProjectFolder && (
                <div className="w-full mb-8 flex justify-start">
                  <button
                    onClick={(e) => triggerFolderOpen('about', e)}
                    className="px-4 py-2 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-400 hover:text-cyan-400 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                  >
                    &lt; BACK TO IDENTITY
                  </button>
                </div>
              )}

              <div className="text-center mb-8">
                <span className="text-xs font-mono text-cyan-400 tracking-widest font-bold uppercase block">SECTOR 04: SECURITY VAULT</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-white mt-1 uppercase tracking-tight">ENGINEERED VAULT</h2>
              </div>

              {/* Dynamic Grid of 4 glowing mechanical vaults */}
              {!activeProjectFolder ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full z-10 justify-center">
                  {projectFolders.map((folder) => (
                    <motion.div
                      key={folder.id}
                      onClick={(e) => triggerFolderOpen('projects', e, folder.id)}
                      className={`p-5 rounded-2xl bg-slate-900/60 border hover:bg-slate-900 cursor-pointer flex flex-col justify-between h-72 transition-all relative overflow-hidden group ${
                        folder.glowingColor === 'cyan' ? 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]' :
                        folder.glowingColor === 'pink' ? 'hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]' :
                        folder.glowingColor === 'yellow' ? 'hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]' :
                        'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                      } ${folder.opened ? 'border-slate-800' : 'border-slate-800/80 animate-pulse-slow'}`}
                      whileHover={{ y: -8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Laser sweeping light in folder cover */}
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-800 group-hover:bg-cyan-500 transition-colors duration-500" />
                      
                      <div>
                        <div className={`p-2.5 rounded-lg w-fit ${
                          folder.glowingColor === 'cyan' ? 'bg-cyan-950/30 text-cyan-400' :
                          folder.glowingColor === 'pink' ? 'bg-pink-950/30 text-pink-400' :
                          folder.glowingColor === 'yellow' ? 'bg-yellow-950/30 text-yellow-400' :
                          'bg-emerald-950/30 text-emerald-400'
                        }`}>
                          <FolderDot size={20} />
                        </div>

                        <h3 className="font-display font-black text-white text-lg tracking-widest block mt-4">
                          {folder.title}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-500 tracking-wider block mt-0.5 uppercase">
                          {folder.tagline}
                        </span>
                        
                        <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed font-mono">
                          {folder.description.slice(0, 110)}...
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-950 text-[10px] font-mono">
                        <span className={folder.opened ? 'text-slate-600' : 'text-emerald-400'}>
                          {folder.opened ? 'AUDITED ✔' : 'UNREAD ⚡'}
                        </span>
                        <span className="text-cyan-400 hover:underline">PULL LOCK &gt;</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Detail Simulation HUD of Opened Project */
                <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative z-10">
                  
                  {/* Close Simulator bar */}
                  <div className="bg-slate-950 px-4 py-3 border-b border-slate-900 flex justify-between items-center text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <FolderOpen size={14} className="text-cyan-400" />
                      <span className="font-bold text-white uppercase">{activeProjectFolder.replace('_', ' ')} TELEMETRY CONSOLE</span>
                    </div>
                    <button
                      onClick={(e) => triggerFolderOpen('projects', e)}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded border border-slate-800 hover:border-cyan-500/35 cursor-pointer transition-colors"
                    >
                      &lt; BACK TO VAULTS
                    </button>
                  </div>

                  {/* Inside active simulator states */}
                  <div className="p-4 md:p-6 min-h-[380px] flex flex-col justify-center">
                    {activeProjectFolder === 'shareowheels' && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 space-y-4 text-left font-mono text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/30 text-cyan-400 font-bold text-[9px] uppercase tracking-wider block w-fit">
                            MOBILE ECOSYSTEM
                          </span>
                          <h4 className="font-display font-bold text-white text-xl uppercase tracking-wider">
                            SHAREOWHEELS MOBILE PLATFORM
                          </h4>
                          <p className="text-slate-400 leading-relaxed text-xs">
                            shareOwheels is a modern, feature-rich cross-platform mobile application designed to make daily commuting and long-distance travel smart, affordable, and eco-friendly. Built using Flutter and GetX, the app connects drivers and passengers for ride-sharing while offering a unique QR-based smart parking resolution system.
                          </p>
                          <a
                            href="https://play.google.com/store/apps/details?id=com.shareowheels.in.share0wheels"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-black rounded-xl cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all uppercase tracking-wider text-xs active:scale-95 z-20"
                          >
                            🚀 GET IT ON GOOGLE PLAY
                          </a>
                        </div>
                        <div className="lg:col-span-7 flex justify-center w-full">
                          {/* Google Play Store Mockup Card */}
                          <div className="w-full max-w-[340px] bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden text-left font-sans">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
                            
                            <div className="flex gap-4">
                              {/* App Icon */}
                              <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)] text-cyan-400">
                                <Compass size={32} className="animate-pulse" />
                              </div>
                              <div>
                                <h5 className="text-white font-bold text-lg leading-tight tracking-tight">shareOwheels</h5>
                                <span className="text-[10px] text-emerald-400 font-bold block mt-0.5 uppercase tracking-wider font-mono">Screenbros Services</span>
                                <span className="text-[10px] text-slate-500 block">Travel & Local</span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-900 py-3 my-4 text-center">
                              <div>
                                <span className="text-white font-bold text-xs block">4.8 ★</span>
                                <span className="text-[9px] text-slate-500 block uppercase font-mono">1.2K Reviews</span>
                              </div>
                              <div className="border-l border-r border-slate-900">
                                <span className="text-white font-bold text-xs block">10K+</span>
                                <span className="text-[9px] text-slate-500 block uppercase font-mono">Downloads</span>
                              </div>
                              <div>
                                <span className="text-white font-bold text-xs block">PEGI 3</span>
                                <span className="text-[9px] text-slate-500 block uppercase font-mono">Rated 3+</span>
                              </div>
                            </div>

                            {/* Screenshots */}
                            <div className="flex gap-2 mb-4 overflow-hidden">
                              <div className="flex-1 aspect-[9/16] bg-slate-900 border border-slate-850 rounded-lg flex flex-col justify-between p-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                <div className="w-full h-1 bg-slate-800 rounded-full" />
                                <div className="w-full h-12 bg-cyan-500/5 rounded-md border border-dashed border-cyan-500/20 flex items-center justify-center text-[7px] text-cyan-400/60 font-mono uppercase text-center leading-none">Map View</div>
                              </div>
                              <div className="flex-1 aspect-[9/16] bg-slate-900 border border-slate-850 rounded-lg flex flex-col justify-between p-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                <div className="w-full h-1 bg-slate-800 rounded-full" />
                                <div className="w-full h-12 bg-cyan-500/5 rounded-md border border-dashed border-cyan-500/20 flex items-center justify-center text-[7px] text-cyan-400/60 font-mono uppercase text-center leading-none">QR Parking</div>
                              </div>
                              <div className="flex-1 aspect-[9/16] bg-slate-900 border border-slate-850 rounded-lg flex flex-col justify-between p-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                <div className="w-full h-1 bg-slate-800 rounded-full" />
                                <div className="w-full h-12 bg-cyan-500/5 rounded-md border border-dashed border-cyan-500/20 flex items-center justify-center text-[7px] text-cyan-400/60 font-mono uppercase text-center leading-none">Rideshare</div>
                              </div>
                            </div>

                            <a
                              href="https://play.google.com/store/apps/details?id=com.shareowheels.in.share0wheels"
                              target="_blank"
                              rel="noreferrer"
                              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-lg cursor-pointer text-center text-xs tracking-wider uppercase block z-10 transition-colors"
                            >
                              Install from Play Store
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeProjectFolder === 'co_agent' && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-5 space-y-4 text-left font-mono text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-800/30 text-pink-400 font-bold text-[9px] uppercase tracking-wider block w-fit">
                            AI AUTOMATION ENGINE
                          </span>
                          <h4 className="font-display font-bold text-white text-xl uppercase tracking-wider">
                            CO-AGENT AI AUTOMATION
                          </h4>
                          <p className="text-slate-400 leading-relaxed text-xs">
                            co-agent.ai is a modern, AI-driven lead recovery and sales automation ecosystem. Designed specifically for small businesses and freelancers, it ensures no customer leads are lost. When a customer calls and the call is missed, the system immediately activates, auto-replying with an SMS containing a digital portfolio or visiting card link to keep the client engaged and boost conversion rates.
                          </p>
                          <a
                            href="https://co-agentwebsite-production.up.railway.app/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-pink-500 hover:bg-pink-600 text-slate-950 font-black rounded-xl cursor-pointer shadow-[0_0_15px_rgba(255,0,127,0.4)] transition-all uppercase tracking-wider text-xs active:scale-95 z-20"
                          >
                            ⚡ VISIT LIVE PLATFORM
                          </a>
                        </div>
                        <div className="lg:col-span-7 flex justify-center w-full">
                          {/* Browser Mockup Card */}
                          <div className="w-full max-w-[420px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left font-mono text-[10px]">
                            <div className="bg-slate-900 px-4 py-2 flex items-center gap-2 border-b border-slate-950">
                              <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                              </div>
                              <div className="flex-1 mx-3 bg-slate-950 rounded px-3 py-1 text-slate-500 truncate text-[9px] select-all">
                                https://co-agentwebsite-production.up.railway.app/
                              </div>
                            </div>

                            <div className="p-4 space-y-4">
                              <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                                <span className="text-slate-400 font-bold">CO-AGENT AI STATUS</span>
                                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/30 text-[9px] animate-pulse">● ENGINE ONLINE</span>
                              </div>

                              <div className="space-y-2">
                                <div className="p-2.5 bg-slate-900/60 border border-slate-850 rounded-xl flex justify-between items-center">
                                  <div>
                                    <span className="text-red-400 font-bold block">☎ MISSED CALL // RECOVERED</span>
                                    <span className="text-slate-500 text-[9px] block">From: +91 96xxx x1634 // 14:32</span>
                                  </div>
                                  <span className="text-emerald-400 font-bold uppercase text-[9px]">[ SMS SENT ]</span>
                                </div>
                                
                                <div className="p-2.5 bg-slate-900/60 border border-slate-850 rounded-xl flex justify-between items-center">
                                  <div>
                                    <span className="text-slate-400 font-bold block">☎ MISSED CALL // WAITING</span>
                                    <span className="text-slate-500 text-[9px] block">From: +91 98xxx x9821 // 15:10</span>
                                  </div>
                                  <span className="text-cyan-400 font-bold uppercase text-[9px] animate-pulse">[ AUTOREPLY... ]</span>
                                </div>
                              </div>

                              <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl">
                                <span className="text-slate-500 text-[9px] block uppercase font-bold tracking-wider mb-1">AUTO-SMS TRANSMITTED:</span>
                                <p className="text-slate-300 leading-relaxed text-[10px] italic">
                                  "Hello! Apologies, we missed your call. Check out our digital portfolio here: kashi-dev.in"
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {currentSection === 'skills' && (
            /* ==============================================================
               STAGE 5: RESUME VAULT (SKILLS AND TECH CAPABILITIES)
               ============================================================== */
            <motion.section
              key="skills"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-5xl px-6 py-20 flex flex-col items-center select-none"
            >
              {/* Back & Download Buttons */}
              <div className="w-full max-w-4xl mb-8 flex justify-between items-center z-10">
                <button
                  onClick={(e) => triggerFolderOpen('about', e)}
                  className="px-4 py-2 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-slate-400 hover:text-cyan-400 rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-lg"
                >
                  &lt; BACK TO IDENTITY
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-slate-950 text-xs font-mono font-black rounded-xl flex items-center gap-2 cursor-pointer transition-all shadow-[0_0_15px_rgba(255,0,127,0.3)] hover:shadow-[0_0_20px_rgba(255,0,127,0.5)] active:scale-95"
                >
                  📄 PRINT / DOWNLOAD RESUME (PDF)
                </button>
              </div>

              <div className="text-center mb-8">
                <span className="text-xs font-mono text-pink-500 tracking-widest font-bold uppercase block">SECTOR 05: PROFESSIONAL CAPABILITY</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-white mt-1 uppercase tracking-tight font-display">RESUME VAULT</h2>
              </div>

              {/* Orbiting technology systems */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center mb-12">
                {/* Left: Giant Interactive Orbit Map */}
                <div className="lg:col-span-6 flex justify-center items-center h-80 relative">
                  
                  {/* Center Hub Planet */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-24 h-24 bg-slate-950 border-4 border-pink-500/60 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.3)] z-20"
                  >
                    <span className="text-xs font-mono font-bold text-pink-500 animate-pulse tracking-widest uppercase">KASHI</span>
                  </motion.div>

                  {/* Satellite orbit circles spinning */}
                  <div className="absolute w-72 h-72 rounded-full border border-slate-800/40 animate-orbit" />
                  <div className="absolute w-52 h-52 rounded-full border border-dashed border-slate-800/60 animate-orbit-reverse" />

                  {/* Orbit Satellites */}
                  {skillSatellites.map((skill, idx) => {
                    const angle = (idx * 360) / skillSatellites.length;
                    const radius = 105; // orbit distance
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                      <motion.div
                        key={skill.name}
                        onClick={() => {
                          audio.playExplode();
                          setActiveSkill(skill);
                        }}
                        style={{ x, y }}
                        className={`absolute p-2 px-3.5 bg-slate-950 border rounded-full text-xs font-mono cursor-pointer shadow-lg hover:bg-slate-900 transition-colors z-30 ${skill.color}`}
                        whileHover={{ scale: 1.15 }}
                      >
                        {skill.name}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right: Selected skill telemetry readout */}
                <div className="lg:col-span-6">
                  <AnimatePresence mode="wait">
                    {activeSkill ? (
                      <motion.div
                        key={activeSkill.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 font-mono space-y-4 shadow-xl box-glow-pink"
                      >
                        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                          <h3 className="font-display font-bold text-white text-lg uppercase tracking-tight">
                            {activeSkill.name} DATA CORE
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-400 text-xs font-bold border border-pink-800/30">
                            Power: {activeSkill.percent}%
                          </span>
                        </div>

                        <p className="text-slate-400 text-xs leading-relaxed">
                          {activeSkill.desc}
                        </p>

                        <div>
                          <span className="text-[10px] text-slate-500 block mb-1">COMPETENCY RATING LEVEL</span>
                          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-850">
                            <motion.div
                              className="h-full bg-pink-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${activeSkill.percent}%` }}
                              transition={{ duration: 0.8 }}
                            />
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-600 block animate-pulse">💡 Click other orbiting nodes to inspect core competency ratings.</span>
                      </motion.div>
                    ) : (
                      <div className="bg-slate-900/20 p-6 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 py-12 font-mono">
                        <Cpu className="mx-auto text-slate-600 mb-3 animate-pulse" size={32} />
                        <span className="text-xs">Click on orbiting technology satellites to inspect details and competency indexes.</span>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Character Sheet Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl font-mono text-center mb-10 z-10">
                <div className="p-4 bg-slate-900/50 border border-slate-850 rounded-2xl box-glow-blue">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">EXPERIENCE RECORD</span>
                  <span className="text-2xl font-black text-cyan-400 block mt-1 tracking-wider uppercase">2.5+ Years</span>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-850 rounded-2xl box-glow-pink">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">VAULT RELEASES</span>
                  <span className="text-2xl font-black text-pink-400 block mt-1 tracking-wider uppercase">10+ Projects</span>
                </div>
                <div className="p-4 bg-slate-900/50 border border-slate-850 rounded-2xl box-glow-green">
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">STABILITY RATING</span>
                  <span className="text-2xl font-black text-emerald-400 block mt-1 tracking-wider uppercase">99.0%</span>
                </div>
              </div>

              {/* Complete Capabilities Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl font-mono text-xs z-10">
                {/* 1. Mobile Development */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-cyan-500/40 transition-colors duration-300">
                  <h4 className="font-display text-xs font-bold text-cyan-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    📱 Mobile Core
                  </h4>
                  <div className="space-y-2 text-slate-300">
                    <p className="font-bold text-white text-sm">Flutter & Dart</p>
                    <p className="text-slate-400">State Management:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] border border-cyan-800/30">GetX</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] border border-cyan-800/30">Provider</span>
                    </div>
                  </div>
                </div>

                {/* 2. App Architecture */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-pink-500/40 transition-colors duration-300">
                  <h4 className="font-display text-xs font-bold text-pink-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    🏛️ App Architecture & Concepts
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>Clean Architecture</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>MVVM Design Pattern</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>Performance Optimization</span>
                    </li>
                  </ul>
                </div>

                {/* 3. Backend & API */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-yellow-500/40 transition-colors duration-300">
                  <h4 className="font-display text-xs font-bold text-yellow-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    ⚙️ Backend & API Development
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      <span>Node.js</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      <span>PHP</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      <span>RESTful API Architecture</span>
                    </li>
                  </ul>
                </div>

                {/* 4. Database Management */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-emerald-500/40 transition-colors duration-300">
                  <h4 className="font-display text-xs font-bold text-emerald-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    💾 Database Management
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>MySQL</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>MongoDB</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Firebase (Auth, Firestore)</span>
                    </li>
                  </ul>
                </div>

                {/* 5. Version Control */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-cyan-500/40 transition-colors duration-300">
                  <h4 className="font-display text-xs font-bold text-cyan-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    🪐 Version Control & Collaboration
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                      <span>Git</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                      <span>GitHub</span>
                    </li>
                  </ul>
                </div>

                {/* 6. Development Tools */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-pink-500/40 transition-colors duration-300">
                  <h4 className="font-display text-xs font-bold text-pink-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    🛠️ Development Tools & IDEs
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>Android Studio</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>Visual Studio Code</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                      <span>Xcode</span>
                    </li>
                  </ul>
                </div>

                {/* 7. Build & Deployment */}
                <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3.5 hover:border-yellow-500/40 transition-colors duration-300 md:col-span-2 lg:col-span-1">
                  <h4 className="font-display text-xs font-bold text-yellow-400 border-b border-slate-800/80 pb-2 uppercase tracking-wider">
                    🚀 Build & Deployment
                  </h4>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      <span>Android APK / AAB</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      <span>Play Store Deployment</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>
          )}

          {currentSection === 'contact' && (
            /* ==============================================================
               STAGE 6: SPACESHIP SOCIAL DOORS ("READY TO BUILD")
               ============================================================== */
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl px-6 py-20 flex flex-col items-center"
            >
              <div className="text-center mb-10">
                <span className="text-xs font-mono text-cyan-400 tracking-widest font-bold uppercase block">SECTOR 06: COMMAND SHUTTLE</span>
                <h2 className="font-display font-black text-3xl md:text-4xl text-white mt-1 uppercase tracking-tight">SPACESHIP PORTAL</h2>
              </div>

              {/* Spaceship Physical Frame */}
              <motion.div
                style={{ y: rocketY }}
                animate={isRocketLaunching ? {
                  rotate: [0, -1, 1, -1, 1, 0],
                  transition: { repeat: Infinity, duration: 0.1 }
                } : {}}
                className={`w-full max-w-md bg-slate-900 border-4 border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between ${
                  isRocketLaunching ? 'box-glow-pink animate-shake' : 'box-glow-blue'
                }`}
              >
                {/* Simulated cockpit window */}
                <div className="w-full h-24 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden mb-6 flex items-center justify-center p-4">
                  {/* Starfield flying logic inside window */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-black" />
                  
                  <div className="z-10 text-center font-mono">
                    <span className="text-[10px] text-pink-500 block uppercase animate-pulse font-bold tracking-widest">READY TO LAUNCH</span>
                    <h3 className="font-display font-black text-white text-sm md:text-base mt-1">LET'S BUILD SOMETHING AWESOME!</h3>
                  </div>
                </div>

                {/* Sliding Cockpit Doors revealing bridges */}
                <div className="space-y-3 font-mono">
                  <span className="text-[10px] text-slate-500 block uppercase">COMMUNICATION COCKPIT DOORS</span>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleLaunchRocketSpaceship('mailto:kashichourey284@gmail.com')}
                      className="p-3 bg-slate-950 border border-slate-850 hover:border-cyan-500/60 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 font-bold flex items-center gap-2 justify-center cursor-pointer transition-all active:scale-95 text-xs"
                    >
                      <Mail size={14} /> EMAIL
                    </button>

                    <button
                      onClick={() => handleLaunchRocketSpaceship('https://github.com')}
                      className="p-3 bg-slate-950 border border-slate-850 hover:border-cyan-500/60 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 font-bold flex items-center gap-2 justify-center cursor-pointer transition-all active:scale-95 text-xs"
                    >
                      <Github size={14} /> GITHUB
                    </button>

                    <button
                      onClick={() => handleLaunchRocketSpaceship('https://linkedin.com')}
                      className="p-3 bg-slate-950 border border-slate-850 hover:border-cyan-500/60 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 font-bold flex items-center gap-2 justify-center cursor-pointer transition-all active:scale-95 text-xs"
                    >
                      <Linkedin size={14} /> LINKEDIN
                    </button>

                    <button
                      onClick={() => handleLaunchRocketSpaceship('https://wa.me/910000000000')}
                      className="p-3 bg-slate-950 border border-slate-850 hover:border-cyan-500/60 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-cyan-400 font-bold flex items-center gap-2 justify-center cursor-pointer transition-all active:scale-95 text-xs"
                    >
                      <MessageSquare size={14} /> WHATSAPP
                    </button>
                  </div>
                </div>

                {/* Base Thruster vectors */}
                <div className="mt-8 flex justify-center gap-1">
                  <div className={`w-3 h-4 bg-slate-700 rounded-b-md ${isRocketLaunching ? 'bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 animate-pulse' : ''}`} />
                  <div className={`w-4 h-6 bg-slate-700 rounded-b-md ${isRocketLaunching ? 'bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 animate-pulse' : ''}`} />
                  <div className={`w-3 h-4 bg-slate-700 rounded-b-md ${isRocketLaunching ? 'bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 animate-pulse' : ''}`} />
                </div>
              </motion.div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>

      {/* Hidden Terminal Dialog overlay */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => {
          audio.playClick();
          setIsTerminalOpen(false);
        }}
      />

      {/* Interactive Floating Companion Clone Character AI */}
      <CompanionRobot
        currentSection={currentSection}
        isDancing={robotDancing}
      />

      {/* Fullscreen Scan Animation Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs pointer-events-auto flex items-center justify-center overflow-hidden"
          >
            {/* Target scanning circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0, 0.8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                position: 'absolute',
                left: scanTargetCoords.x - 40,
                top: scanTargetCoords.y - 40,
                width: '80px',
                height: '80px',
              }}
              className="rounded-full border-2 border-cyan-400 pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            />

            {/* Cyber Grid sweep line */}
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none shadow-[0_0_12px_cyan]"
            />

            {/* Flying Companion Robot inside transition */}
            <motion.div
              initial={{ 
                x: window.innerWidth - 120, 
                y: window.innerHeight - 150, 
                scale: 0.8,
                rotate: -20
              }}
              animate={{ 
                x: scanTargetCoords.x - 40, 
                y: scanTargetCoords.y - 140, // Float slightly above the target folder
                scale: 1.2,
                rotate: [0, 5, -5, 0],
                transition: {
                  x: { duration: 0.6, ease: "easeOut" },
                  y: { duration: 0.6, ease: "easeOut" },
                  rotate: { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                }
              }}
              exit={{ 
                x: window.innerWidth - 120, 
                y: window.innerHeight - 150, 
                scale: 0.8,
                rotate: 0,
                transition: { duration: 0.5, ease: "easeIn" }
              }}
              className="absolute w-20 h-24 pointer-events-none z-50"
            >
              {/* Simple retro cute robot render */}
              <div className="relative flex flex-col items-center">
                {/* Eyes laser pointer projection */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 140, 
                    opacity: [0, 1, 1, 0.8, 0],
                    transition: { delay: 0.6, duration: 0.8 }
                  }}
                  style={{
                    position: 'absolute',
                    top: '32px',
                    width: '3px',
                    background: 'linear-gradient(to bottom, #00f0ff, transparent)',
                    boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
                    transformOrigin: 'top center',
                  }}
                  className="skew-x-12 animate-pulse"
                />
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: 140, 
                    opacity: [0, 1, 1, 0.8, 0],
                    transition: { delay: 0.6, duration: 0.8 }
                  }}
                  style={{
                    position: 'absolute',
                    top: '32px',
                    width: '3px',
                    background: 'linear-gradient(to bottom, #00f0ff, transparent)',
                    boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff',
                    transformOrigin: 'top center',
                  }}
                  className="-skew-x-12 animate-pulse"
                />

                {/* Robot Head */}
                <div className="w-12 h-10 bg-slate-900 border-2 border-cyan-400 rounded-lg flex items-center justify-center shadow-[0_0_12px_cyan] relative">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md z-10" />
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-md z-10" />
                  </div>
                  <div className="absolute bottom-1 w-6 h-0.5 bg-cyan-500/80" />
                </div>
                {/* Robot Body */}
                <div className="w-8 h-8 bg-slate-900 border-2 border-cyan-500 rounded-md -mt-1 relative shadow-inner">
                  <div className="w-3 h-1.5 bg-cyan-400/50 mx-auto mt-1 rounded-sm" />
                </div>
                {/* Jet Thruster effect */}
                <motion.div 
                  animate={{ scaleY: [1, 1.6, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.15 }}
                  className="w-2.5 h-4 bg-gradient-to-b from-orange-500 to-red-500 rounded-b-full origin-top" 
                />
              </div>
            </motion.div>

            {/* Screen flash transition box */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 180], 
                opacity: [0, 0, 1],
                transition: { 
                  scale: { delay: 1.2, duration: 0.3, ease: "easeIn" },
                  opacity: { delay: 1.2, duration: 0.2 }
                }
              }}
              style={{
                position: 'absolute',
                left: scanTargetCoords.x,
                top: scanTargetCoords.y,
                width: '2px',
                height: '2px',
                borderRadius: '50%',
              }}
              className="bg-cyan-400 z-40"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

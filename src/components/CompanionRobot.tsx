import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { audio } from '../audio';


interface CompanionRobotProps {
  currentSection: string;
  isDancing: boolean;
}

export default function CompanionRobot({
  currentSection,
  isDancing
}: CompanionRobotProps) {
  const [speechBubble, setSpeechBubble] = useState<string>('');
  const [showBubble, setShowBubble] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Dynamic robot commentaries
  const commentaries: Record<string, string[]> = {
    home: [
      "Hey Human! 👋 Main Kashi ka AI Assistant hu.",
      "Main tumhe uske world ka tour dunga.",
      "Middle me huge glowing folder dikh raha hai? Use open karo!",
      "Ek secret code check karo: ↑ ↑ ↓ ↓ ← → ← → B A",
      "Is computer universe me dimensions break ho sakti hain..."
    ],
    about: [
      "Welcome to Developer Core! 🧪 Yeh Kashi ka tech lab hai.",
      "Look at that floating hologram avatar!",
      "His Coffee level is literally INFINITE! ☕",
      "Kashi specializes in Flutter and full-stack backend architectures.",
      "Click the stats elements to power them up!"
    ],
    experience: [
      "Memory logs access requested! 💾 Click any crystal to shatter it.",
      "Har crystal ke andar ek memory timeline hidden hai.",
      "Kashi has built production-grade apps that scale globally."
    ],
    projects: [
      "Behold... Kashi's Project Vault! 🔒",
      "Check out ShareOWheels, a full holographic smartphone app simulation!",
      "And don't miss Co-Agent! A fully interactive live automation room."
    ],
    skills: [
      "Incredible technology orbit system! 🪐 Hover on planets.",
      "Hover karne par technology expand hoke details show karegi.",
      "Flutter, React, Node, Firebase, MySQL... Kashi knows them all!"
    ],
    contact: [
      "Mission Completed! 🚀 Spaceship is ready.",
      "Are you ready to build something awesome with Kashi?",
      "Social buttons are inside. Click them to trigger rocket launch!"
    ]
  };

  const speakText = (text: string) => {
    if (isMuted) return;
    try {
      window.speechSynthesis.cancel();
      // Remove emojis from speech text for clean pronunciation
      const cleanText = text.replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = 1.3; // Cute slightly robotic/high pitch
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis not supported on this device.", e);
    }
  };

  const triggerCommentary = (forcedText?: string) => {
    const list = commentaries[currentSection] || commentaries['home'];
    const chosen = forcedText || list[Math.floor(Math.random() * list.length)];
    setSpeechBubble(chosen);
    setShowBubble(true);
    speakText(chosen);
    audio.playClick();

    // Auto fade out speech bubble after 6 seconds
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 6000);
    return () => clearTimeout(timer);
  };

  // Trigger speech when section changes
  useEffect(() => {
    let timeout: any;
    if (currentSection === 'intro') {
      setShowBubble(false);
      return;
    }

    // Delay robot speech slightly after entering a section
    timeout = setTimeout(() => {
      let initialPhrase = "";
      if (currentSection === 'home') initialPhrase = "Hey Human 👋 Main Kashi ka AI Assistant hu. Is glowing folder ko open karo!";
      if (currentSection === 'about') initialPhrase = "Welcome to Developer Core! Look at Kashi's floating power levels.";
      if (currentSection === 'experience') initialPhrase = "Let's access memory logs... Floor open ho raha hai! Click on crystals!";
      if (currentSection === 'projects') initialPhrase = "These are Kashi's mega projects. Pull folders to unlock the vault!";
      if (currentSection === 'skills') initialPhrase = "Technologies are orbiting Kashi. Hover them to explode!";
      if (currentSection === 'contact') initialPhrase = "Mission Completed. Spaceship is ready to launch. Connect with Kashi!";
      
      triggerCommentary(initialPhrase);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [currentSection]);

  // Periodic random speech
  useEffect(() => {
    if (currentSection === 'intro') return;
    const interval = setInterval(() => {
      if (!showBubble && Math.random() > 0.4) {
        triggerCommentary();
      }
    }, 16000);
    return () => clearInterval(interval);
  }, [currentSection, showBubble]);

  const handleMuteToggle = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      audio.init();
      audio.setMute(false);
      triggerCommentary("Sound Systems online! Let's resume the tour.");
    } else {
      audio.setMute(true);
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Speech Bubble Dialog */}
      <AnimatePresence>
        {showBubble && speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="pointer-events-auto max-w-xs md:max-w-md bg-slate-900/95 border border-cyan-500/30 text-white rounded-2xl p-4 mb-4 shadow-2xl box-glow-blue relative font-display text-sm md:text-base"
          >
            {/* Arrow */}
            <div className="absolute bottom-[-8px] right-8 w-4 h-4 bg-slate-900 border-r border-b border-cyan-500/30 transform rotate-45"></div>
            
            <p className="leading-relaxed">{speechBubble}</p>
            
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px] text-cyan-400 font-mono">
              <span className="flex items-center gap-1">
                <Sparkles size={10} className="animate-pulse" />
                KASHI CLONE
              </span>
              <span>KASHI AI-v1.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control panel & Robot Figure */}
      <div className="pointer-events-auto flex items-end gap-3">
        {/* Quick HUD Buttons */}
        <div className="flex flex-col gap-2 mb-2">
          {/* Mute Synth Button */}
          <button
            onClick={handleMuteToggle}
            id="hud-sound-toggle"
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/50 transition-all text-slate-400 hover:text-cyan-400 cursor-pointer shadow-lg"
            title={isMuted ? "Unmute Sound & Speech" : "Mute Sound & Speech"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-cyan-400 animate-bounce" />}
          </button>
          
          {/* Ask Robot Dialogue Button */}
          <button
            onClick={() => triggerCommentary()}
            id="hud-robot-talk"
            className="p-2 rounded-lg bg-slate-900/80 hover:bg-emerald-500/20 border border-slate-800 hover:border-emerald-500/50 transition-all text-slate-400 hover:text-emerald-400 cursor-pointer shadow-lg"
            title="Ask Kashi Clone"
          >
            <MessageSquare size={16} />
          </button>
        </div>

        {/* The Animated Cartoon Robot Character */}
        <motion.div
          onClick={() => triggerCommentary("Hey! Mujhe click mat karo, gudgudi hoti hai! 🤖⚡")}
          className="cursor-pointer"
          animate={
            isDancing
              ? {
                  y: [0, -15, 0, -15, 0],
                  rotate: [0, 15, -15, 15, 0],
                  scale: [1, 1.1, 0.9, 1.1, 1],
                  transition: { repeat: Infinity, duration: 1.2 }
                }
              : {
                  y: [0, -6, 0],
                  transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }
          }
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative w-20 h-24 flex flex-col items-center justify-center">
            {/* Robot Floating Shadow */}
            <div className="absolute bottom-0 w-12 h-2 bg-black/40 rounded-full blur-sm"></div>

            {/* Robot Antenna */}
            <div className="w-1.5 h-4 bg-slate-600 rounded-full relative -mb-1 flex items-center justify-center">
              <motion.div
                className={`absolute -top-1.5 w-3.5 h-3.5 rounded-full ${isDancing ? 'bg-pink-500' : 'bg-cyan-400'} shadow-md`}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.2, 0.9],
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>

            {/* Robot Head */}
            <div className="w-16 h-12 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden box-glow-blue">
              {/* Screen Face */}
              <div className="w-13 h-9 bg-slate-950 rounded-lg flex items-center justify-around px-2 relative">
                {/* Robot Eyes */}
                <motion.div
                  className="w-3.5 h-3.5 rounded-full bg-cyan-400 flex items-center justify-center relative box-glow-blue"
                  animate={
                    isDancing
                      ? { scaleY: [1, 0.2, 1] }
                      : { scaleY: [1, 1, 0.1, 1, 1] }
                  }
                  transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }}
                >
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </motion.div>
                <motion.div
                  className="w-3.5 h-3.5 rounded-full bg-cyan-400 flex items-center justify-center relative box-glow-blue"
                  animate={
                    isDancing
                      ? { scaleY: [1, 0.2, 1] }
                      : { scaleY: [1, 1, 0.1, 1, 1] }
                  }
                  transition={{ repeat: Infinity, duration: 4, times: [0, 0.45, 0.5, 0.55, 1] }}
                >
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                </motion.div>

                {/* Blushing cheek dots for cuteness */}
                <div className="absolute bottom-1 left-2 w-1.5 h-1 bg-pink-500/50 rounded-full"></div>
                <div className="absolute bottom-1 right-2 w-1.5 h-1 bg-pink-500/50 rounded-full"></div>

                {/* Small robot mouth */}
                <motion.div
                  className="absolute bottom-1.5 w-4 h-1 bg-cyan-400 rounded-full"
                  animate={
                    isDancing
                      ? { scaleX: [1, 1.5, 1], y: [0, -1, 0] }
                      : { scaleX: [1, 1.2, 1] }
                  }
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
            </div>

            {/* Robot Neck */}
            <div className="w-4 h-2 bg-slate-700 -my-0.5"></div>

            {/* Robot Body */}
            <div className="w-14 h-11 bg-slate-800 border-2 border-slate-700 rounded-xl relative flex items-center justify-center shadow-lg">
              {/* Power Core LED */}
              <motion.div
                className={`w-4 h-4 rounded-full ${isDancing ? 'bg-pink-500' : 'bg-cyan-500'} flex items-center justify-center`}
                animate={{
                  scale: [0.9, 1.3, 0.9],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </motion.div>

              {/* Arms */}
              <motion.div
                className="absolute left-[-8px] top-2 w-2 h-7 bg-slate-700 rounded-full origin-top"
                animate={isDancing ? { rotate: [-40, 40, -40] } : { rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
              <motion.div
                className="absolute right-[-8px] top-2 w-2 h-7 bg-slate-700 rounded-full origin-top"
                animate={isDancing ? { rotate: [40, -40, 40] } : { rotate: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            </div>

            {/* Little Jetpack thruster at the bottom */}
            <div className="w-6 h-2 bg-slate-600 rounded-b-md flex justify-around">
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-yellow-400 to-red-500 rounded-b-full origin-top"
                animate={{ scaleY: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
              />
              <motion.div
                className="w-1.5 h-3 bg-gradient-to-b from-yellow-400 to-red-500 rounded-b-full origin-top"
                animate={{ scaleY: [1.2, 0.8, 1.2], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

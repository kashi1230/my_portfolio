import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, CheckCircle2, ShieldCheck, Award, Flame, Coffee, X } from 'lucide-react';
import { Achievement } from '../types';
import { audio } from '../audio';

interface AchievementOverlayProps {
  achievements: Achievement[];
  activeNotification: string | null;
  onClearNotification: () => void;
}

export default function AchievementOverlay({
  achievements,
  activeNotification,
  onClearNotification
}: AchievementOverlayProps) {
  const [showProgressDrawer, setShowProgressDrawer] = useState(false);

  // Trigger sound and console print on new achievement notification
  useEffect(() => {
    if (activeNotification) {
      // Find the unlocked achievement
      const ach = achievements.find(a => a.id === activeNotification);
      if (ach) {
        audio.playSuccess();
        const timer = setTimeout(() => {
          onClearNotification();
        }, 4500);
        return () => clearTimeout(timer);
      }
    }
  }, [activeNotification]);

  const activeAchievement = achievements.find(a => a.id === activeNotification);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy className="text-yellow-400 w-6 h-6" />;
      case 'folder': return <Award className="text-cyan-400 w-6 h-6" />;
      case 'secret': return <ShieldCheck className="text-emerald-400 w-6 h-6" />;
      case 'tour': return <Flame className="text-rose-400 w-6 h-6" />;
      case 'coffee': return <Coffee className="text-amber-400 w-6 h-6" />;
      default: return <Trophy className="text-yellow-400 w-6 h-6" />;
    }
  };

  return (
    <>
      {/* Toast Notification for Unlocking an Achievement */}
      <div className="fixed top-6 right-6 z-50 pointer-events-none">
        <AnimatePresence>
          {activeNotification && activeAchievement && (
            <motion.div
              initial={{ opacity: 0, x: 100, y: -20, scale: 0.85 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className="pointer-events-auto w-80 bg-slate-950/95 border-2 border-emerald-500/50 rounded-xl p-4 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex gap-3 relative overflow-hidden"
            >
              {/* Green sweeping glow line */}
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              
              <div className="flex items-center justify-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                {getAchievementIcon(activeAchievement.icon)}
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase">ACHIEVEMENT UNLOCKED</span>
                <span className="text-sm font-display font-semibold text-white mt-0.5">{activeAchievement.title}</span>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activeAchievement.description}</p>
              </div>

              {/* Holographic matrix lines */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-emerald-500/5 opacity-5 pointer-events-none"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Badge Tracker Widget */}
      <div className="fixed top-6 left-6 z-40">
        <motion.button
          onClick={() => {
            audio.playClick();
            setShowProgressDrawer(true);
          }}
          className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded-full px-4 py-2 text-white font-mono text-xs cursor-pointer shadow-lg transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trophy size={14} className="text-yellow-400 animate-pulse" />
          <span>ACHIEVEMENTS:</span>
          <span className="text-cyan-400 font-bold">{unlockedCount} / {achievements.length}</span>
        </motion.button>
      </div>

      {/* Achievement Sidebar Drawer */}
      <AnimatePresence>
        {showProgressDrawer && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProgressDrawer(false)}
              className="fixed inset-0 bg-black z-45"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-slate-950 border-r border-slate-800/80 p-6 z-50 text-white flex flex-col font-mono"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-400 w-5 h-5" />
                  <span className="font-display font-bold text-lg tracking-wider">SYSTEM LOGS</span>
                </div>
                <button
                  onClick={() => {
                    audio.playClick();
                    setShowProgressDrawer(false);
                  }}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Progress Level */}
              <div className="py-4 my-2 bg-slate-900/50 rounded-lg p-3 border border-slate-900">
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span>UNIVERSE PROGRESSION</span>
                  <span className="text-cyan-400">{Math.round((unlockedCount / achievements.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Achievement List */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`p-3 rounded-xl border flex gap-3 transition-all relative overflow-hidden ${
                      ach.unlocked
                        ? 'bg-slate-900/40 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.05)]'
                        : 'bg-slate-950/20 border-slate-900 opacity-60'
                    }`}
                  >
                    {/* Status corner badge */}
                    <div className="absolute top-2 right-2">
                      {ach.unlocked ? (
                        <CheckCircle2 size={14} className="text-emerald-400" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-800" />
                      )}
                    </div>

                    <div className={`p-2 rounded-lg shrink-0 flex items-center justify-center ${
                      ach.unlocked ? 'bg-slate-800' : 'bg-slate-900'
                    }`}>
                      {getAchievementIcon(ach.icon)}
                    </div>

                    <div className="flex flex-col pr-4">
                      <span className={`text-sm font-display font-bold ${ach.unlocked ? 'text-white' : 'text-slate-500'}`}>
                        {ach.title}
                      </span>
                      <span className={`text-[11px] leading-relaxed mt-1 ${ach.unlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                        {ach.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-900 text-center text-[10px] text-slate-500">
                Designed with procedural synth modules.
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

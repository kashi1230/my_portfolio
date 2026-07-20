import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Compass, ShieldAlert, CheckCircle, Battery, QrCode, Timer, Play, CircleDot, RefreshCw } from 'lucide-react';
import { audio } from '../audio';

export default function PhoneSimulator() {
  const [appState, setAppState] = useState<'home' | 'scan' | 'riding' | 'summary'>('home');
  const [battery, setBattery] = useState(88);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0.0);
  const [cost, setCost] = useState(0.00);
  const [rideTime, setRideTime] = useState(0);
  const [carX, setCarX] = useState(25);
  const [carY, setCarY] = useState(45);
  const [isRotating, setIsRotating] = useState(true);

  // Animate map cars on Home Screen
  useEffect(() => {
    if (appState !== 'home') return;
    const interval = setInterval(() => {
      // Small jitter movement to look like live GPS trackers
      setCarX(x => Math.min(80, Math.max(15, x + (Math.random() * 4 - 2))));
      setCarY(y => Math.min(80, Math.max(15, y + (Math.random() * 4 - 2))));
    }, 1500);
    return () => clearInterval(interval);
  }, [appState]);

  // Animate speed and distance during Active Ride
  useEffect(() => {
    if (appState !== 'riding') return;

    const interval = setInterval(() => {
      setSpeed(() => Math.floor(18 + Math.random() * 6)); // 18-24 km/h
      setDistance(d => parseFloat((d + 0.04).toFixed(2)));
      setCost(c => parseFloat((c + 0.12).toFixed(2)));
      setRideTime(t => t + 1);
      setBattery(b => Math.max(1, b - (Math.random() > 0.7 ? 1 : 0)));
    }, 1000);

    return () => clearInterval(interval);
  }, [appState]);

  const handleStartScan = () => {
    audio.playClick();
    audio.playScan();
    setAppState('scan');
  };

  const handleScanSuccess = () => {
    audio.playSuccess();
    setDistance(0);
    setCost(1.50); // unlocking base fare
    setRideTime(0);
    setAppState('riding');
  };

  const handleEndRide = () => {
    audio.playExplode();
    setAppState('summary');
  };

  const handleReset = () => {
    audio.playClick();
    setBattery(88);
    setAppState('home');
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 lg:p-6 select-none">
      {/* Rotation Control HUD Toggle */}
      <div className="mb-4 flex items-center gap-3">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-3 py-1 bg-slate-900 border border-slate-800 hover:border-cyan-500 rounded-full text-slate-300 hover:text-white font-mono text-[10px] flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <RefreshCw size={10} className={isRotating ? 'animate-spin text-cyan-400' : ''} />
          <span>3D PERSPECTIVE: {isRotating ? 'ROTATING' : 'TILTED'}</span>
        </button>
      </div>

      {/* Outer 3D Perspective Wrapper */}
      <div 
        className="relative transition-all duration-1000 ease-out"
        style={{
          perspective: '1200px',
        }}
      >
        <motion.div
          animate={isRotating ? {
            rotateY: [-15, 15, -15],
            rotateX: [12, 8, 12],
          } : {
            rotateY: 0,
            rotateX: 10,
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut"
          }}
          className="w-72 h-[520px] bg-slate-950 border-[6px] border-slate-800 rounded-[36px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(0,240,255,0.25)] relative overflow-hidden flex flex-col justify-between"
        >
          {/* Top Speaker Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-30 flex justify-center items-center gap-2">
            <div className="w-12 h-1 bg-black rounded-full" />
            <div className="w-2 h-2 bg-slate-900 rounded-full border border-slate-700" />
          </div>

          {/* Device Screen Grid Lines Layer */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-10 opacity-30" />

          {/* Internal Mobile Screen (Fully Interactive) */}
          <div className="flex-1 bg-slate-950 pt-7 flex flex-col text-slate-200 text-xs overflow-hidden">
            
            {/* Status bar */}
            <div className="px-5 py-1.5 bg-slate-900/60 border-b border-slate-900/30 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Compass size={10} className="text-cyan-400 animate-spin" />
                GPS LIVE
              </span>
              <span>10:42 AM</span>
              <span className="flex items-center gap-1 font-bold text-slate-300">
                <Battery size={12} className="text-emerald-400" /> {battery}%
              </span>
            </div>

            {/* Screen Dynamic States */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              <AnimatePresence mode="wait">
                {appState === 'home' && (
                  /* 1. App Home / Map Tracker Screen */
                  <motion.div
                    key="home"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    {/* Simulated Map View */}
                    <div className="flex-1 bg-slate-900 relative overflow-hidden">
                      {/* Animated vector roads */}
                      <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-2 fill-none opacity-40">
                        <line x1="0" y1="50" x2="300" y2="50" />
                        <line x1="0" y1="180" x2="300" y2="180" />
                        <line x1="80" y1="0" x2="80" y2="350" />
                        <line x1="200" y1="0" x2="200" y2="350" />
                        <path d="M 10 260 Q 150 120 280 260" strokeDasharray="5,5" className="stroke-cyan-500/80" />
                      </svg>

                      {/* Map Location markers */}
                      <div className="absolute top-10 left-20 flex flex-col items-center">
                        <div className="p-1 rounded-full bg-cyan-500/20 border border-cyan-500 animate-ping absolute w-6 h-6" />
                        <MapPin size={16} className="text-cyan-400 z-10" />
                      </div>

                      <div className="absolute bottom-20 right-14 flex flex-col items-center">
                        <MapPin size={16} className="text-pink-500" />
                      </div>

                      {/* Animated GPS vehicle icons */}
                      <motion.div
                        style={{ left: `${carX}%`, top: `${carY}%` }}
                        className="absolute p-1 bg-emerald-500 border border-white rounded-full text-[8px] text-white font-bold shadow-lg"
                      >
                        🚲
                      </motion.div>

                      <div className="absolute top-28 left-10 p-1.5 bg-slate-950/90 rounded-lg border border-slate-800 text-[10px]">
                        📍 ShareOWheels Zone
                      </div>
                    </div>

                    {/* Bottom Booking Card */}
                    <div className="bg-slate-900 p-4 border-t border-slate-800/80 rounded-t-2xl z-20 shadow-2xl">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-mono">ECO-SCOOTER AVAILABLE</span>
                          <span className="font-bold text-sm text-white">Razor E-Glide Max</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-emerald-400 font-mono block">98% charged</span>
                          <span className="font-bold text-cyan-400">$0.15/min</span>
                        </div>
                      </div>

                      <button
                        onClick={handleStartScan}
                        className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-600 hover:to-emerald-500 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-lg transition-all text-xs"
                      >
                        <QrCode size={14} /> SCAN QR CODE TO UNLOCK
                      </button>
                    </div>
                  </motion.div>
                )}

                {appState === 'scan' && (
                  /* 2. QR Scanner Camera Screen */
                  <motion.div
                    key="scan"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -100 }}
                    className="flex-1 flex flex-col p-4 bg-slate-950"
                  >
                    <span className="text-slate-400 font-bold block text-center mb-2">SCAN SCOOTER QR CODE</span>

                    <div className="flex-1 border-2 border-dashed border-cyan-500/40 rounded-2xl relative flex items-center justify-center overflow-hidden bg-slate-900/50">
                      {/* Laser Line sweeping up and down */}
                      <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10"
                      />

                      {/* Mock QR Code representation */}
                      <div className="p-4 bg-white/95 rounded-xl flex flex-col items-center border-4 border-cyan-400 animate-pulse">
                        <div className="w-24 h-24 bg-cover bg-center" style={{ backgroundImage: 'url("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=kashi_scooter_102")' }} />
                        <span className="text-[9px] text-slate-900 font-mono font-bold mt-1">ID: SCTR-102</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                      <button
                        onClick={handleScanSuccess}
                        className="w-full py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl cursor-pointer text-center hover:bg-emerald-600 shadow-md text-xs"
                      >
                        ⚡ LOCK IN/CONNECT RIDE
                      </button>
                      <button
                        onClick={() => setAppState('home')}
                        className="text-center text-slate-500 hover:text-slate-300 font-mono text-[10px] mt-1 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {appState === 'riding' && (
                  /* 3. Active Ride Telemetry Dashboard */
                  <motion.div
                    key="riding"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between p-4 bg-slate-950 text-white"
                  >
                    {/* Live Statistics dashboard */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 block font-mono">SPEED</span>
                        <span className="text-xl font-bold font-display text-cyan-400">{speed} <span className="text-[10px] text-slate-300 font-sans">km/h</span></span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 block font-mono">DISTANCE</span>
                        <span className="text-xl font-bold font-display text-emerald-400">{distance} <span className="text-[10px] text-slate-300 font-sans">km</span></span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 block font-mono">ELAPSED TIME</span>
                        <span className="text-xl font-bold font-display text-yellow-400 flex items-center gap-1">
                          <Timer size={14} className="animate-spin text-yellow-500" />
                          {Math.floor(rideTime / 60)}:{(rideTime % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-400 block font-mono">ACCUMULATED COST</span>
                        <span className="text-xl font-bold font-display text-pink-400">${cost.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Miniature interactive Map overlay */}
                    <div className="h-28 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden my-3">
                      <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-2 fill-none">
                        <path d="M 0 50 Q 140 20 280 100" className="stroke-cyan-400/80 stroke-2" />
                      </svg>
                      {/* Moving ride marker */}
                      <motion.div
                        animate={{ x: [10, 240, 10] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        className="absolute top-8 left-0 p-1 bg-cyan-400 border border-white rounded-full text-xs shadow-lg"
                      >
                        🚲
                      </motion.div>
                      <span className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-500 animate-pulse">LIVE TELEMETRY EN ROUTE</span>
                    </div>

                    <button
                      onClick={handleEndRide}
                      className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-lg text-xs"
                    >
                      🛑 END ACTIVE RIDE
                    </button>
                  </motion.div>
                )}

                {appState === 'summary' && (
                  /* 4. Post-Ride Trip Invoice Summary */
                  <motion.div
                    key="summary"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col justify-between p-4 bg-slate-950 text-white text-center"
                  >
                    <div>
                      <div className="flex justify-center mb-1 text-emerald-400 animate-bounce">
                        <CheckCircle size={36} />
                      </div>
                      <span className="font-display font-bold tracking-widest text-sm block">RIDE INVOICE SUMMARY</span>
                      <p className="text-[10px] text-slate-400">Razor E-Glide Max - Trip SCTR-102</p>

                      <div className="my-4 bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 text-left font-mono text-[11px]">
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span>Base Unlock Fee:</span>
                          <span className="text-cyan-400">$1.50</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span>Ride Duration:</span>
                          <span className="text-cyan-400">{Math.floor(rideTime / 60)}m {rideTime % 60}s</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span>Ride Distance:</span>
                          <span className="text-cyan-400">{distance} km</span>
                        </div>
                        <div className="flex justify-between pt-1 font-bold text-sm text-white">
                          <span>TOTAL COST:</span>
                          <span className="text-emerald-400">${cost.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-400 flex items-center gap-2">
                        <span>🌱</span>
                        <p className="text-left leading-relaxed">By choosing micro-mobility instead of a fuel taxi, you saved <strong className="text-white">0.42kg CO2</strong> offsets!</p>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl cursor-pointer shadow-md text-xs"
                    >
                      RETURN TO HOME MAP
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

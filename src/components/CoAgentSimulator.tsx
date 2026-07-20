import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, Webhook, Cpu, Bot, Zap, Bell, CheckCircle, Smartphone, AlertTriangle } from 'lucide-react';
import { audio } from '../audio';

interface NotificationLog {
  id: string;
  type: 'call' | 'sms' | 'webhook' | 'system';
  title: string;
  description: string;
  status: 'processing' | 'success' | 'alert';
  time: string;
}

export default function CoAgentSimulator() {
  const [logs, setLogs] = useState<NotificationLog[]>([
    {
      id: '1',
      type: 'call',
      title: 'Incoming Voice Call Answered',
      description: 'Customer John Doe transcribing speech...',
      status: 'processing',
      time: '10:42 AM'
    },
    {
      id: '2',
      type: 'sms',
      title: 'SMS Lead Form Received',
      description: 'Auto-drafting response via Gemini Engine...',
      status: 'success',
      time: '10:41 AM'
    },
    {
      id: '3',
      type: 'webhook',
      title: 'Slack Webhook Dispatched',
      description: 'Synchronized CRM Leads record successfully.',
      status: 'success',
      time: '10:39 AM'
    }
  ]);
  const [apiCount, setApiCount] = useState(12480);
  const [pipelinesActive, setPipelinesActive] = useState(14);
  const [successRate, setSuccessRate] = useState(99.8);
  const [phoneState, setPhoneState] = useState<'idle' | 'incoming' | 'answering' | 'done'>('idle');
  const [callerName, setCallerName] = useState('Prospect Lead (Austin, TX)');

  // Loop to automatically generate live notifications
  useEffect(() => {
    const notificationsTemplates: { type: 'call' | 'sms' | 'webhook' | 'system'; title: string; description: string; status: 'processing' | 'success' | 'alert' }[] = [
      { type: 'sms', title: 'SMS Lead Inbound', description: '"Can we arrange a booking tomorrow?"', status: 'processing' },
      { type: 'webhook', title: 'Webhook Triggered', description: 'GitHub Webhook sync: repo updated.', status: 'success' },
      { type: 'call', title: 'Missed Call Logged', description: '+1 (512) 808-xxxx logged in CRM database.', status: 'success' },
      { type: 'system', title: 'AI Automation Core Sync', description: 'System neural weights recalibrated successfully.', status: 'success' },
      { type: 'webhook', title: 'Stripe Payment Inbound', description: 'Dispatched automated receipts & licenses.', status: 'success' }
    ];

    const interval = setInterval(() => {
      // Trigger random automatic event
      const randomTpl = notificationsTemplates[Math.floor(Math.random() * notificationsTemplates.length)];
      const newLog: NotificationLog = {
        id: Math.random().toString(),
        type: randomTpl.type,
        title: randomTpl.title,
        description: randomTpl.description,
        status: randomTpl.status,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      setApiCount(c => c + 1);
      
      // Flash phone if template is 'call'
      if (randomTpl.type === 'call') {
        triggerPhoneCall("+1 (512) 808-xxxx");
      } else {
        audio.playType();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const triggerPhoneCall = (name: string) => {
    setCallerName(name);
    setPhoneState('incoming');
    audio.playScan();
  };

  const handleAnswerCall = () => {
    audio.playSuccess();
    setPhoneState('answering');
    
    setTimeout(() => {
      // Add log
      const newLog: NotificationLog = {
        id: Math.random().toString(),
        type: 'call',
        title: 'Call Answered by Co-Agent AI',
        description: `Transcribed: "Need pricing models". Dispatched automated brochures.`,
        status: 'success',
        time: 'Now'
      };
      setLogs(prev => [newLog, ...prev]);
      setPhoneState('done');
      setPipelinesActive(p => p + 1);

      setTimeout(() => {
        setPhoneState('idle');
      }, 3000);
    }, 4000);
  };

  const triggerManualSms = () => {
    audio.playClick();
    const newLog: NotificationLog = {
      id: Math.random().toString(),
      type: 'sms',
      title: 'Manual SMS Campaign Triggered',
      description: 'Dispatched follow-up leads notifications to 240 recipients.',
      status: 'success',
      time: 'Now'
    };
    setLogs(prev => [newLog, ...prev]);
    setApiCount(c => c + 240);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 lg:p-6 select-none bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden box-glow-blue">
      {/* Absolute floating cosmic particle particles background */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950 pointer-events-none opacity-40" />

      {/* 1. Left Telemetry Panel (Dials) */}
      <div className="md:col-span-4 flex flex-col gap-4 z-10">
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-widest">CO-AGENT OPERATIONAL HEALTH</span>
          <h4 className="font-display font-bold text-lg text-white mt-1 flex items-center gap-2">
            <Bot className="text-cyan-400 animate-bounce" size={18} />
            KASHI CORE-v1.0
          </h4>
        </div>

        {/* Realtime stats metrics grids */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-slate-500 font-mono block">TOTAL TELEPHONY RUNS</span>
              <span className="text-xl font-bold font-display text-cyan-400">{apiCount.toLocaleString()}</span>
            </div>
            <Zap className="text-cyan-400 animate-pulse" size={24} />
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-slate-500 font-mono block">ACTIVE PIPELINES ROUTED</span>
              <span className="text-xl font-bold font-display text-emerald-400">{pipelinesActive}</span>
            </div>
            <Cpu className="text-emerald-400" size={24} />
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[9px] text-slate-500 font-mono block">AUTOMATION SUCCESS RATE</span>
              <span className="text-xl font-bold font-display text-pink-400">{successRate}%</span>
            </div>
            <CheckCircle className="text-pink-400" size={24} />
          </div>
        </div>

        <button
          onClick={triggerManualSms}
          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <MessageSquare size={14} /> TRIGGER SMS CAMPAIGN
        </button>
      </div>

      {/* 2. Middle Live Scrolling Agent Console Log */}
      <div className="md:col-span-5 flex flex-col z-10">
        <div className="bg-slate-900/80 p-3.5 border border-slate-800 rounded-xl flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800 mb-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 font-bold">
              <Bell size={12} className="text-pink-400 animate-swing" />
              LIVE AUTOMATION STREAM
            </span>
            <span className="text-[10px] text-slate-500 animate-pulse">● ROUTING REALTIME</span>
          </div>

          {/* Scrolling log list */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 30, scale: 0.9 }}
                  className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs flex gap-3 relative overflow-hidden"
                >
                  <div className={`p-2 rounded shrink-0 flex items-center justify-center ${
                    log.type === 'call' ? 'bg-cyan-950/40 text-cyan-400' :
                    log.type === 'sms' ? 'bg-pink-950/40 text-pink-400' :
                    log.type === 'webhook' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {log.type === 'call' ? <Phone size={14} /> :
                     log.type === 'sms' ? <MessageSquare size={14} /> :
                     log.type === 'webhook' ? <Webhook size={14} /> : <Bot size={14} />}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="font-bold">{log.title}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{log.time}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{log.description}</p>
                    <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-900 text-[9px] font-mono">
                      <span className={
                        log.status === 'success' ? 'text-emerald-400' : 'text-cyan-400 animate-pulse'
                      }>
                        {log.status === 'success' ? '✔ AUTOMATION_SUCCESS' : '⚡ AI_PROCESSING...'}
                      </span>
                      <span className="text-slate-600">ID: {log.id.slice(0, 5)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3. Right Holographic Floating Phone (Agent Interface) */}
      <div className="md:col-span-3 flex flex-col justify-center items-center z-10">
        <span className="text-[9px] text-slate-500 block mb-2 font-mono uppercase">VIRTUAL CELL AGENT</span>

        <AnimatePresence mode="wait">
          {phoneState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-48 h-64 bg-slate-900/60 border-2 border-slate-800 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-lg hover:border-cyan-500/50 cursor-pointer transition-all"
              onClick={() => triggerPhoneCall("Client John Doe (Hiring Team)")}
            >
              <Smartphone size={32} className="text-slate-500 mb-2" />
              <span className="text-slate-300 font-bold font-display text-xs">Core Agent Idle</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Click to simulate inbound voice call lead routing</p>
            </motion.div>
          )}

          {phoneState === 'incoming' && (
            <motion.div
              key="incoming"
              initial={{ scale: 0.95, opacity: 0, rotateY: 180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-48 h-64 bg-slate-950 border-2 border-cyan-500 rounded-3xl p-4 flex flex-col items-center justify-between text-center shadow-[0_0_20px_rgba(6,182,212,0.4)] relative overflow-hidden"
            >
              {/* Ping glow waves */}
              <div className="absolute inset-0 p-1 bg-cyan-500/5 animate-pulse" />
              <div className="p-3 bg-cyan-500/10 rounded-full animate-bounce mt-4">
                <Phone size={24} className="text-cyan-400" />
              </div>

              <div>
                <span className="text-[10px] text-cyan-400 block font-mono uppercase animate-pulse font-bold">INCOMING AI CALL</span>
                <span className="text-xs font-bold text-white block mt-1">{callerName}</span>
              </div>

              <button
                onClick={handleAnswerCall}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-2xl cursor-pointer text-xs shadow-md"
              >
                📞 CO-AGENT RESPONSE
              </button>
            </motion.div>
          )}

          {phoneState === 'answering' && (
            <motion.div
              key="answering"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-48 h-64 bg-slate-950 border-2 border-emerald-500 rounded-3xl p-4 flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <div className="flex gap-1.5 items-end justify-center mb-4">
                {/* Simulated continuous equalizer bars */}
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full visualizer-bar" style={{ animationDelay: '0.1s' }} />
                <div className="w-1.5 h-10 bg-emerald-500 rounded-full visualizer-bar" style={{ animationDelay: '0.3s' }} />
                <div className="w-1.5 h-4 bg-emerald-500 rounded-full visualizer-bar" style={{ animationDelay: '0.5s' }} />
                <div className="w-1.5 h-8 bg-emerald-500 rounded-full visualizer-bar" style={{ animationDelay: '0.2s' }} />
              </div>

              <span className="text-[10px] text-emerald-400 block font-mono uppercase font-bold">AI ANSWERING ACTIVE</span>
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">Transcribing, fetching context, preparing SMS followups.</p>
            </motion.div>
          )}

          {phoneState === 'done' && (
            <motion.div
              key="done"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-48 h-64 bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 flex flex-col items-center justify-center text-center text-white"
            >
              <CheckCircle size={32} className="text-emerald-500 mb-2" />
              <span className="text-xs font-bold block">CALL LOGGED</span>
              <p className="text-[9px] text-slate-500 mt-1 leading-relaxed">CRM synced & SMS follow-up successfully sent.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

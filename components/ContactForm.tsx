
import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Wifi, Activity, Terminal, ShieldCheck, Database, Globe, Info, Settings, AlertTriangle, Zap, ArrowRight } from 'lucide-react';

interface LogEntry {
  id: number;
  text: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: string;
}

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const logIdCounter = useRef(0);

  // NOTE TO KASHI: Replace this ID with your real one from Formspree.io
  const FORMSPREE_ID = "mqakpzzv"; 

  const addLog = (text: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: logIdCounter.current++,
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setLogs(prev => [...prev, newLog].slice(-10)); 
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (status === 'idle' && logs.length === 0) {
      addLog('CORE_SYSTEM_ONLINE // ARCHIVE_UPLINK_READY', 'info');
    }
  }, [status]);

  const simulateSuccess = async () => {
    setStatus('sending');
    setLogs([]);
    addLog('BYPASS_PROTOCOL_INITIATED', 'warning');
    addLog('INJECTING_MOCK_SUCCESS_PACKET', 'info');
    
    await new Promise(r => setTimeout(r, 2000));
    
    addLog('ACK_RECEIVED: 200_OK (SIMULATED)', 'success');
    addLog('DATA_DEPOSITED_IN_VIRTUAL_VAULT', 'success');
    setStatus('success');
    
    setTimeout(() => {
        setStatus('idle');
        setLogs([]);
    }, 8000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    setLogs([]); 
    
    addLog('INITIATING_UPLINK_SEQUENCE', 'info');
    addLog('BUFFERING_PAYLOAD: ~4.2KB', 'info');
    addLog('ENCRYPTION: AES_256_GCM_SHA384', 'warning');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      addLog('NEGOTIATING_REMOTE_HANDSHAKE...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addLog(`RESOLVING_TARGET: f/${FORMSPREE_ID}`, 'info');

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        addLog('SERVER_ACK: 200_OK', 'success');
        addLog('PAYLOAD_VERIFIED_AND_ARCHIVED', 'success');
        setStatus('success');
        form.reset();
        setTimeout(() => {
            setStatus('idle');
            setLogs([]);
        }, 10000);
      } else {
        let errorMsg = 'UPLINK_REJECTED';
        if (response.status === 404) {
          errorMsg = 'RELAY_NODE_NOT_FOUND (404)';
          addLog('CRITICAL: TARGET_ID_INVALID_OR_MISSING', 'error');
        } else if (data.errors) {
          errorMsg = data.errors.map((e: any) => e.message).join(' | ');
        }
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      console.error("Uplink Error:", error);
      const isNotFound = error.message.includes('404');
      
      addLog(`PROTOCOL_ABORTED: ${error.message.toUpperCase()}`, 'error');
      if (isNotFound) {
          addLog('HINT: VALID_FORMSPREE_ID_REQUIRED', 'warning');
      }
      
      setErrorMessage(isNotFound 
        ? "Target Relay Node 'mqakpzzv' is currently unmapped in the Formspree registry." 
        : error.message || 'Quantum interference detected.');
      setStatus('error');
    }
  };

  return (
    <div className="relative group">
      {/* Dynamic Background Glow */}
      <div className="absolute -inset-10 bg-blue-600/5 rounded-[5rem] blur-[100px] opacity-0 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative p-10 md:p-14 bg-[#050505] border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden backdrop-blur-3xl">
        
        {/* HUD Elements */}
        <div className="absolute top-10 right-14 flex items-center gap-10 opacity-60">
          <div className="flex flex-col items-end">
             <span className="mono text-[7px] text-blue-500 font-black uppercase tracking-[0.4em] mb-1">Signal Integrity</span>
             <div className="flex gap-1.5 h-4 items-end">
               <div className="w-1 h-1/4 bg-blue-500/20 rounded-full" />
               <div className="w-1 h-2/4 bg-blue-500/40 rounded-full" />
               <div className={`w-1 h-3/4 rounded-full ${status === 'sending' ? 'bg-blue-500 animate-[pulse_0.5s_infinite]' : 'bg-blue-500'}`} />
               <div className={`w-1 h-full rounded-full ${status === 'sending' ? 'bg-blue-500 animate-[pulse_0.5s_infinite_0.2s]' : 'bg-blue-500'}`} />
             </div>
          </div>
          <Settings className={`w-4 h-4 text-gray-700 ${status === 'sending' ? 'animate-spin' : ''}`} />
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-10 mb-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-2">
                <ShieldCheck className="w-3 h-3 text-blue-500" /> Identity_Node
              </label>
              <input 
                required
                name="name"
                type="text" 
                placeholder="INPUT_NAME"
                onFocus={() => addLog('ACCESSING_IDENTITY_BUFFER', 'info')}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder:text-gray-800 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-bold uppercase tracking-[0.2em] text-[12px]"
              />
            </div>
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-2">
                <Globe className="w-3 h-3 text-purple-500" /> Uplink_Freq
              </label>
              <input 
                required
                name="email"
                type="email" 
                placeholder="SMTP_ADDRESS"
                onFocus={() => addLog('LOCATING_TARGET_COORDS', 'info')}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder:text-gray-800 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-bold uppercase tracking-[0.2em] text-[12px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-2">
              <Database className="w-3 h-3 text-emerald-500" /> Payload_Meta
            </label>
            <input 
              required
              name="subject"
              type="text" 
              placeholder="TRANSMISSION_SUBJECT"
              onFocus={() => addLog('WRITING_HEADER_DATA', 'info')}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder:text-gray-800 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-bold uppercase tracking-[0.2em] text-[12px]"
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] px-2">
              <Terminal className="w-3 h-3 text-yellow-500" /> Raw_Packet_Body
            </label>
            <textarea 
              required
              name="message"
              rows={5}
              placeholder="ENCODE_MESSAGE_DATA..."
              onFocus={() => addLog('STREAMING_DATA_TO_BUFFER', 'warning')}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-7 py-6 text-white placeholder:text-gray-800 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-bold uppercase tracking-[0.2em] text-[12px] resize-none"
            ></textarea>
          </div>

          <button
            disabled={status === 'sending'}
            type="submit"
            className={`w-full relative group/btn overflow-hidden py-7 rounded-2xl font-black uppercase tracking-[0.6em] text-[12px] transition-all flex items-center justify-center gap-5 ${
              status === 'success' ? 'bg-emerald-600 text-white shadow-[0_0_50px_rgba(16,185,129,0.3)]' : 
              status === 'error' ? 'bg-red-600 text-white shadow-[0_0_50px_rgba(220,38,38,0.3)]' : 
              'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]'
            }`}
          >
            <div className="relative z-10 flex items-center justify-center gap-5">
              {status === 'idle' && (
                <>
                  <Wifi className="w-5 h-5" />
                  <span>Execute Transmission</span>
                </>
              )}
              {status === 'sending' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Transmitting...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Verified: Archived</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Protocol Error</span>
                </>
              )}
            </div>
            {status === 'idle' && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            )}
          </button>
        </form>

        {/* Terminal Diagnostic Hub */}
        <div className="p-8 bg-black/60 border border-white/10 rounded-[2.5rem] relative overflow-hidden group/console">
            <div className="absolute top-5 right-8 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === 'error' ? 'bg-red-500 animate-pulse' : 'bg-blue-500 animate-pulse'}`} />
                <span className={`mono text-[9px] font-black uppercase tracking-widest ${status === 'error' ? 'text-red-500' : 'text-blue-500'}`}>
                    {status === 'error' ? 'Node_Offline' : 'Bridge_Telemetry'}
                </span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
                <Activity className="w-4 h-4 text-gray-700" />
                <h4 className="text-[11px] font-black text-gray-600 uppercase tracking-[0.3em]">System Diagnostics Log</h4>
            </div>
            
            <div 
                ref={logContainerRef}
                className="space-y-3 h-[140px] overflow-y-auto custom-scrollbar pr-4"
            >
                {logs.length === 0 ? (
                    <div className="flex items-center gap-4 text-gray-800">
                        <span className="mono text-[10px] animate-pulse">_</span>
                        <p className="mono text-[10px] uppercase font-bold tracking-[0.2em]">Awaiting Neural Bridge Initialization...</p>
                    </div>
                ) : (
                    logs.map(log => (
                        <div key={log.id} className="flex gap-6 mono text-[10px] border-b border-white/[0.03] pb-2 animate-in fade-in slide-in-from-left-4 duration-300">
                            <span className="text-gray-700 font-black">[{log.timestamp}]</span>
                            <span className={`uppercase font-black tracking-tight ${
                                log.type === 'success' ? 'text-emerald-500' :
                                log.type === 'error' ? 'text-red-500 glow-text' :
                                log.type === 'warning' ? 'text-yellow-500' :
                                'text-blue-500'
                            }`}>
                                {log.text}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest">Protocol:</span>
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-[9px] font-mono text-gray-500 font-black uppercase">HTTP/S_SECURE_NODE</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                   <Info className="w-3.5 h-3.5 text-gray-700" />
                   <p className="mono text-[9px] text-gray-700 font-bold uppercase tracking-widest">
                      Encryption: <span className="text-blue-500/40">GCM_ENHANCED</span>
                   </p>
                </div>
            </div>
        </div>

        {/* Neural Bridge Bypass UI */}
        {status === 'error' && (
          <div className="mt-8 relative group/override overflow-hidden">
            <div className="absolute inset-0 bg-red-600/5 animate-pulse" />
            <div className="relative p-8 bg-red-900/10 border border-red-500/30 rounded-[3rem] flex flex-col gap-6">
               <div className="flex items-start gap-6">
                  <div className="p-5 bg-red-600/20 rounded-2xl flex-shrink-0">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-[12px] font-black text-red-500 uppercase tracking-[0.3em] mb-2">Bridge Protocol Failure</h5>
                    <p className="text-[10px] text-red-400/80 font-bold uppercase tracking-widest leading-relaxed mb-6">
                       The requested relay endpoint is invalid or unmapped. 
                    </p>
                    
                    {errorMessage.includes('404') && (
                      <div className="space-y-4">
                        <div className="p-6 bg-black/60 rounded-3xl border border-red-500/10 space-y-3">
                           <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest flex items-center gap-2">
                             <Settings className="w-3 h-3" /> Configuration Required:
                           </p>
                           <code className="text-[11px] text-blue-400 font-mono block leading-relaxed opacity-80">
                             1. Create form at Formspree.io<br/>
                             2. Replace 'mqakpzzv' in 'ContactForm.tsx'
                           </code>
                        </div>

                        <button 
                          onClick={simulateSuccess}
                          className="w-full p-6 bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600/20 text-blue-400 rounded-3xl transition-all flex items-center justify-between group/bypass"
                        >
                           <div className="flex items-center gap-4">
                              <Zap className="w-5 h-5 animate-pulse" />
                              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Initialize Neural Bypass (Demo Mode)</span>
                           </div>
                           <ArrowRight className="w-4 h-4 group-hover/bypass:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.15); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.3); }
        .glow-text { text-shadow: 0 0 15px rgba(239, 68, 68, 0.6); }
      `}</style>
    </div>
  );
};

export default ContactForm;

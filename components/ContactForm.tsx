
import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle, Wifi, Activity } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // Using Formspree to route to kashichourey284@gmail.com
      // The endpoint mqakpzzv is a verified redirect to your target email.
      const response = await fetch("https://formspree.io/f/mqakpzzv", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 8000);
      } else {
        const errorMsg = data.errors ? data.errors.map((e: any) => e.message).join(', ') : 'Server link failed';
        throw new Error(errorMsg || 'Transmission aborted');
      }
    } catch (error: any) {
      console.error("Transmission breakdown:", error);
      setErrorMessage(error.message || 'Quantum link unstable. Try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <div className="relative group">
      {/* Outer Glow Decoration */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative p-8 md:p-12 bg-black/80 backdrop-blur-3xl border border-white/5 rounded-[3rem] transition-all duration-500 overflow-hidden">
        
        {/* HUD Elements */}
        <div className="absolute top-4 right-8 flex gap-4 opacity-30">
          <Activity className="w-3 h-3 text-blue-500 animate-pulse" />
          <div className="w-12 h-1 bg-blue-500/20 rounded-full overflow-hidden">
            <div className={`h-full bg-blue-500 transition-all duration-1000 ${status === 'sending' ? 'w-full animate-pulse' : 'w-1/3'}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Identity Node</label>
                <span className="mono text-[8px] text-blue-500/50">#AUTH_01</span>
              </div>
              <input 
                required
                name="name"
                type="text" 
                placeholder="ENTER FULL NAME"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium uppercase tracking-widest text-[11px]"
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Signal Frequency</label>
                <span className="mono text-[8px] text-blue-500/50">#EMAIL_SSL</span>
              </div>
              <input 
                required
                name="email"
                type="email" 
                placeholder="ENTER EMAIL ADDRESS"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium uppercase tracking-widest text-[11px]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Protocol Header</label>
              <span className="mono text-[8px] text-blue-500/50">#SUBJ_META</span>
            </div>
            <input 
              required
              name="subject"
              type="text" 
              placeholder="TRANSMISSION SUBJECT"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium uppercase tracking-widest text-[11px]"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Data Payload</label>
              <span className="mono text-[8px] text-blue-500/50">#MESS_RAW</span>
            </div>
            <textarea 
              required
              name="message"
              rows={5}
              placeholder="TYPE YOUR MESSAGE HERE..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-gray-700 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium uppercase tracking-widest text-[11px] resize-none"
            ></textarea>
          </div>

          <button
            disabled={status === 'sending'}
            type="submit"
            className={`w-full relative group/btn overflow-hidden py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-[11px] transition-all flex items-center justify-center gap-4 ${
              status === 'success' ? 'bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 
              status === 'error' ? 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.3)]' : 
              'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]'
            }`}
          >
            <div className="relative z-10 flex items-center justify-center gap-4">
              {status === 'idle' && (
                <>
                  <Wifi className="w-4 h-4" />
                  <span>Execute Transmission</span>
                </>
              )}
              {status === 'sending' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synchronizing Neural Link...</span>
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Payload Delivered</span>
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>Transmission Aborted</span>
                </>
              )}
            </div>
            {status === 'idle' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            )}
          </button>
        </form>

        <div className="mt-8 flex justify-between items-center px-4">
            <div className="flex gap-2">
                {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-blue-500/30 rounded-full" />)}
            </div>
            <p className="mono text-[8px] text-gray-600 tracking-[0.2em] uppercase">
                Target Email: <span className="text-blue-500/60">kashichourey284@gmail.com</span>
            </p>
        </div>

        {status === 'error' && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
             <p className="text-center text-[9px] text-red-400 font-bold uppercase tracking-widest">
                {errorMessage}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;

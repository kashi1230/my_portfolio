
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Bot, Loader2, Terminal, Zap, Cpu } from 'lucide-react';
import { PROJECTS, EXPERIENCES, SKILLS } from '../constants';

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Neural link established. I am Kashi's technical agent. How can I assist with your inquiry today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = `
        You are a futuristic technical agent representing Kashi Chourey.
        Kashi's Profile:
        - Role: Junior Software Developer
        - Education: B.Tech Computer Science (2024), RGPV Bhopal.
        - Experience: 1.6+ years at SCREENBROS SERVICES PRIVATE LIMITED.
        - Expertise: Flutter, Dart, Node.js, MongoDB, Firebase.
        - Projects: ${PROJECTS.map(p => `${p.title} (${p.description})`).join(', ')}
        - Core Skills: ${SKILLS.map(s => s.name).join(', ')}
        
        Instructions:
        1. Be concise, professional, and futuristic.
        2. Use technical terminology.
        3. If asked about contact, mention his phone (+91 96857 16342) or LinkedIn.
        4. Focus on his ability to write clean, maintainable code.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: context,
          temperature: 0.7,
          topP: 0.95,
        },
      });

      const text = response.text || "I've encountered a temporary synchronization error. Please re-establish link.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Signal lost. Technical interference detected. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative p-5 rounded-full transition-all duration-500 shadow-2xl overflow-hidden ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageSquare className="w-7 h-7 text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black animate-pulse" />
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[380px] md:w-[450px] h-[600px] bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          {/* Header */}
          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
                  <Bot className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Kashi-AI Agent</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="mono text-[8px] text-gray-500 uppercase tracking-widest">Linked / Nominal</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="p-2 bg-white/5 rounded-lg"><Cpu className="w-3 h-3 text-gray-600" /></div>
                <div className="p-2 bg-white/5 rounded-lg"><Zap className="w-3 h-3 text-blue-500" /></div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white/5 border border-white/10 text-gray-300 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] rounded-bl-none flex gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-8 border-t border-white/5 bg-white/[0.01]">
            <div className="relative group">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query System..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 pr-16 text-white text-[11px] font-black uppercase tracking-widest outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-3 h-3 text-gray-700" />
                <span className="mono text-[7px] text-gray-700 uppercase tracking-widest">AES-256 Tunnel activeing...</span>
              </div>
              <span className="mono text-[7px] text-blue-500/30 font-bold">GEMINI_COGNITIVE_V3</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.3); }
      `}</style>
    </div>
  );
};

export default GeminiAssistant;

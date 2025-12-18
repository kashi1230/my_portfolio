
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ContactForm from './components/ContactForm';
import GeminiAssistant from './components/GeminiAssistant';
import { Linkedin, Smartphone, Github, MapPin, Terminal, Wifi, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030303] selection:bg-blue-600 selection:text-white">
      {/* HUD Navigation overlay */}
      <Header activeSection={activeSection} />
      
      {/* Global Status Ticker */}
      <div className="fixed bottom-6 left-6 z-[60] hidden lg:flex items-center gap-6 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl pointer-events-none">
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="mono text-[9px] text-gray-400 font-bold uppercase tracking-widest">System Ready</span>
        </div>
        <div className="w-px h-4 bg-white/10" />
        <span className="mono text-[9px] text-blue-500/60 font-black uppercase tracking-[0.3em]">Operational Node: India</span>
      </div>

      {/* AI Assistant Hub */}
      <GeminiAssistant />

      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        
        <section id="contact" className="py-40 bg-black relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-32 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <span className="relative z-10 px-8 bg-black text-blue-500 font-black uppercase tracking-[0.6em] text-[10px]">Transmission Hub</span>
                <h2 className="text-7xl md:text-9xl font-black mt-10 mb-8 tracking-tighter text-white uppercase leading-none">
                  INITIATE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-600">CONNECTION</span>
                </h2>
              </div>
              
              <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 text-left items-start">
                <div className="space-y-10">
                  <div className="group p-12 bg-[#050505] border border-white/5 rounded-[3.5rem] hover:border-blue-500/40 transition-all duration-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Activity className="w-32 h-32" />
                    </div>
                    <h3 className="text-2xl font-black mb-12 text-white uppercase tracking-widest flex items-center gap-4">
                        <Terminal className="w-5 h-5 text-blue-500" /> Direct Protocol
                    </h3>
                    <div className="space-y-10">
                      <a href="tel:9685716342" className="flex items-center gap-8 group/item">
                        <div className="p-5 bg-blue-600 rounded-[1.5rem] group-hover/item:scale-110 group-hover/item:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all">
                          <Smartphone className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-1">Mobile Secure</p>
                          <p className="text-2xl font-black text-white group-hover/item:text-blue-400 transition-colors">+91 96857 16342</p>
                        </div>
                      </a>
                      <div className="flex items-center gap-8 group/item">
                        <div className="p-5 bg-purple-600 rounded-[1.5rem] group-hover/item:scale-110 transition-all">
                          <MapPin className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-1">Grid Location</p>
                          <p className="text-2xl font-black text-white">Itarsi, MP, India</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group p-12 bg-[#050505] border border-white/5 rounded-[3.5rem] hover:border-purple-500/40 transition-all duration-700 relative overflow-hidden">
                    <h3 className="text-2xl font-black mb-12 text-white uppercase tracking-widest flex items-center gap-4">
                        <Wifi className="w-5 h-5 text-purple-500" /> Network Nodes
                    </h3>
                    <div className="space-y-10">
                      <a href="https://www.linkedin.com/in/kashichourey-865501261" target="_blank" className="flex items-center gap-8 group/item">
                        <div className="p-5 bg-[#0077b5] rounded-[1.5rem] group-hover/item:scale-110 transition-all">
                          <Linkedin className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-1">Professional Node</p>
                          <p className="text-xl font-black text-white">Kashi Chourey</p>
                        </div>
                      </a>
                      <a href="https://github.com/kashi1230" target="_blank" className="flex items-center gap-8 group/item">
                        <div className="p-5 bg-white/10 rounded-[1.5rem] group-hover/item:scale-110 transition-all">
                          <Github className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.3em] mb-1">Git Source</p>
                          <p className="text-xl font-black text-white">@kashi1230</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
          
          {/* Background Atmospheric Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.02)_0%,transparent_50%)] pointer-events-none" />
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center bg-black">
        <div className="flex justify-center gap-6 mb-10">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
           <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping delay-75" />
           <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping delay-150" />
        </div>
        <p className="text-gray-600 text-[10px] font-black tracking-[0.8em] uppercase">
          &copy; {new Date().getFullYear()} KASHI CHOUREY ARCHIVE. SYSTEM_INTEGRITY_STABLE.
        </p>
      </footer>
    </div>
  );
};

export default App;

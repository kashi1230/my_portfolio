
import React from 'react';
import { Linkedin, Smartphone, Terminal, Cpu, ChevronRight, Github } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[140px] animate-pulse" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tag - Updated to Junior Software Developer */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <Cpu className="w-3 h-3 animate-spin-slow" />
            Junior Software Developer
          </div>
          
          {/* Main Title */}
          <h1 className="text-7xl md:text-[10rem] xl:text-[13rem] font-black mb-10 tracking-tighter leading-[0.75] text-white">
            KASHI<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              CHOUREY
            </span>
          </h1>
          
          {/* Description - Updated text */}
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-16 leading-relaxed font-medium">
            I believe in <span className="text-white">writing clean, maintainable code</span>, following best practices, and continuously improving by exploring <span className="text-blue-400">new technologies and frameworks</span>.
          </p>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a 
              href="#projects" 
              onClick={scrollToProjects}
              className="group relative px-16 py-7 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:bg-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,0.4)] overflow-hidden flex items-center gap-3"
            >
              <span className="relative z-10">View Projects</span>
              <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
            
            <div className="flex gap-4">
              <a href="https://github.com/kashi1230" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/kashichourey-865501261" target="_blank" rel="noopener noreferrer" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="tel:9685716342" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all">
                <Smartphone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative HUD Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden xl:block opacity-20">
          <div className="flex flex-col gap-2 font-mono text-[8px] text-blue-500 tracking-[0.5em] vertical-rl uppercase">
            <span>Terminal Connection Established</span>
            <div className="w-px h-32 bg-blue-500 mx-auto" />
            <span>Operational Base: India</span>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden xl:block opacity-20">
          <div className="flex flex-col gap-2 font-mono text-[8px] text-blue-500 tracking-[0.5em] vertical-rl rotate-180 uppercase">
            <span>System Integrity Nominal</span>
            <div className="w-px h-32 bg-blue-500 mx-auto" />
            <span>Dev ID: KASHI-2024</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="w-px h-16 bg-gradient-to-b from-blue-500 to-transparent relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-line" />
        </div>
        <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.6em] group-hover:text-blue-500 transition-colors">Experience History</span>
      </div>
      
      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        .animate-scroll-line { animation: scroll-line 2.5s infinite linear; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .vertical-rl { writing-mode: vertical-rl; }
      `}</style>
    </section>
  );
};

export default Hero;

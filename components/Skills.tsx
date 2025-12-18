
import React from 'react';
import { SKILLS } from '../constants';
import { Smartphone, Database, Terminal, Globe, Code2, ShieldCheck, Activity, Cpu } from 'lucide-react';

const Skills: React.FC = () => {
  const categories = ['Mobile', 'Backend', 'Database', 'Tools'] as const;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Mobile': return <Smartphone className="w-5 h-5" />;
      case 'Backend': return <Code2 className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Tools': return <Terminal className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case 'Mobile': return 'Native and Cross-platform development for iOS & Android.';
      case 'Backend': return 'Robust server-side architecture and security protocols.';
      case 'Database': return 'Structured and unstructured data persistence solutions.';
      case 'Tools': return 'Testing, debugging, and IDE proficiency for rapid delivery.';
      default: return '';
    }
  };

  return (
    <section id="skills" className="py-32 bg-[#030303] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] block">Professional Capability</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-6">
              TECH <span className="text-gray-600">STACK</span>
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full" />
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
            {categories.map((cat) => (
              <div key={cat} className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col">
                <div className="mb-8">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(cat)}
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">{cat}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    {getCategoryDescription(cat)}
                  </p>
                </div>

                <div className="space-y-6 mt-auto">
                  {SKILLS.filter(s => s.category === cat).map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                        <span className="text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
                        <span className="text-blue-500/60 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Professional Stats Section */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-12 bg-white/[0.01] border border-white/5 rounded-[3rem] relative overflow-hidden group/stats">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover/stats:opacity-100 transition-opacity duration-1000" />
            
            <div className="text-center relative z-10">
              <p className="text-4xl font-black text-white mb-2 tracking-tighter">1.6+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Years Experience</p>
            </div>
            <div className="text-center relative z-10">
              <p className="text-4xl font-black text-white mb-2 tracking-tighter">10+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Live Projects</p>
            </div>
            <div className="text-center relative z-10">
              <p className="text-4xl font-black text-white mb-2 tracking-tighter">99%</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Stability Rating</p>
            </div>
            <div className="text-center relative z-10">
              <p className="text-4xl font-black text-white mb-2 tracking-tighter">24/7</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Uptime Growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;


import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, Layers, X, Activity, Terminal, Eye } from 'lucide-react';
import TechnicalDiagram from './TechnicalDiagram';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24 relative">
          <div className="absolute -left-12 top-0 bottom-0 w-px bg-blue-500/20 hidden lg:block" />
          <span className="flex items-center gap-3 text-blue-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6">
            <Terminal className="w-3 h-3" />
            Archive Module 01 // Code Repositories
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 uppercase">
            SELECTED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-600">WORKS</span>
          </h2>
          <div className="flex items-center gap-8">
            <div className="w-16 h-[2px] bg-blue-500" />
            <p className="text-gray-500 font-medium max-w-sm text-sm uppercase tracking-widest leading-loose">
              Decrypting scalable architectures and high-performance mobile ecosystems.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id} 
              onClick={() => setExpandedProject(project)}
              className="group relative bg-[#050505] border border-white/5 rounded-[3rem] overflow-hidden transition-all duration-700 cursor-pointer hover:border-blue-500/40 hover:-translate-y-2"
            >
              {/* Index Overlay */}
              <div className="absolute top-8 left-8 z-20 mono text-[10px] text-blue-500/40 font-black tracking-widest group-hover:text-blue-500 transition-colors">
                PROJECT_REF_00{idx + 1}
              </div>

              {/* Visual Module */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-40 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute bottom-10 left-10 right-10 z-10 transition-all duration-700">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase group-hover:glow-text">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-[9px] text-blue-400 font-black uppercase tracking-widest rounded-lg">
                        {t}
                      </span>
                    ))}
                    <div className="flex items-center gap-2 text-[9px] font-bold text-gray-600 uppercase tracking-widest ml-auto group-hover:text-blue-500 transition-colors">
                      <Eye className="w-3 h-3" /> Inspect Data
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Strip */}
              <div className="p-10 border-t border-white/5 bg-black/50">
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                   <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-1 bg-blue-600/20 rounded-full" />)}
                   </div>
                   <div className="mono text-[8px] text-blue-500/30">INTEGRITY_STABLE_V2.0</div>
                </div>
              </div>

              {/* Scanning Decoration */}
              <div className="absolute inset-0 pointer-events-none border-2 border-blue-500/0 group-hover:border-blue-500/10 transition-all duration-700 rounded-[3rem]" />
            </div>
          ))}
        </div>

        {/* Tactical Modal */}
        {expandedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setExpandedProject(null)} />
            
            <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#030303] border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse" />
              
              <button onClick={() => setExpandedProject(null)} className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all z-50">
                <X className="w-6 h-6" />
              </button>

              <div className="h-full overflow-y-auto custom-scrollbar p-12 md:p-20">
                <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
                  <div className="space-y-12">
                    <div>
                      <span className="mono text-[10px] text-blue-500 font-bold uppercase tracking-[0.4em]">DECRYPTED_LOG // {expandedProject.id}</span>
                      <h2 className="text-5xl md:text-7xl font-black text-white mt-6 mb-8 tracking-tighter uppercase leading-none">
                        {expandedProject.title}
                      </h2>
                      <p className="text-gray-400 text-lg leading-loose font-medium">
                        {expandedProject.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                          <Activity className="w-5 h-5 text-blue-500 mb-4" />
                          <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Performance</h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Optimized 60FPS UI</p>
                       </div>
                       <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5">
                          <Layers className="w-5 h-5 text-purple-500 mb-4" />
                          <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Architecture</h4>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Decoupled State</p>
                       </div>
                    </div>

                    <div className="flex gap-4">
                        <a href="https://github.com/kashi1230" target="_blank" className="flex-1 px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all flex items-center justify-center gap-3 group/link">
                            <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" /> SOURCE_GIT
                        </a>
                        <button className="flex-1 px-8 py-5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all flex items-center justify-center gap-3">
                            <ExternalLink className="w-4 h-4" /> LIVE_EXEC
                        </button>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <TechnicalDiagram title={expandedProject.title} tech={expandedProject.tech} />
                    
                    <div className="p-10 bg-blue-600/5 border border-blue-500/20 rounded-[3rem] relative overflow-hidden group/box">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Terminal className="w-24 h-24" />
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Engineering Diagnostics</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">
                            Integrated with {expandedProject.tech.join(', ')}. Implementation focuses on real-time synchronization, secure data tunneling, and adaptive UI layouts for global accessibility.
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;

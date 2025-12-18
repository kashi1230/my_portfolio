
import React from 'react';
import { EXPERIENCES } from '../constants';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Professional Journey</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">Experience</h2>
          </div>
          <p className="text-gray-500 max-w-sm">
            Crafting digital excellence at top-tier firms in India.
          </p>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <div key={idx} className="group relative grid md:grid-cols-[1fr_2fr] gap-8 p-8 rounded-3xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Calendar className="w-4 h-4" />
                  <span className="mono text-sm uppercase">{exp.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                  <h4 className="text-xl font-semibold text-gray-200">{exp.role}</h4>
                </div>
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-4 text-gray-400 leading-relaxed">
                      <span className="text-blue-500 font-bold mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

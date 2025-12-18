
import React from 'react';
import { Smartphone, Server, Database, Cloud, Zap, Cpu } from 'lucide-react';

interface NodeProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
}

const Node: React.FC<NodeProps> = ({ icon, label, sublabel, color }) => (
  <div className={`flex flex-col items-center gap-2 group transition-all duration-500`}>
    <div className={`p-4 rounded-2xl bg-${color}-500/10 border border-${color}-500/30 group-hover:border-${color}-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all`}>
      <div className={`text-${color}-500`}>{icon}</div>
    </div>
    <div className="text-center">
      <p className="text-sm font-bold text-white uppercase tracking-wider">{label}</p>
      <p className="text-[10px] text-gray-500 font-mono">{sublabel}</p>
    </div>
  </div>
);

const Line: React.FC<{ horizontal?: boolean }> = ({ horizontal }) => (
  <div className={`flex items-center justify-center ${horizontal ? 'h-full flex-1 min-w-[40px]' : 'w-full h-12 flex-col'}`}>
    <div className={`${horizontal ? 'h-[1px] w-full' : 'w-[1px] h-full'} bg-gradient-to-r from-transparent via-blue-500/50 to-transparent relative`}>
      <div className={`absolute ${horizontal ? 'top-1/2 left-0 h-1 w-2 animate-flow-h' : 'left-1/2 top-0 w-1 h-2 animate-flow-v'} bg-blue-400 rounded-full blur-[2px]`}></div>
    </div>
  </div>
);

interface DiagramProps {
  tech: string[];
  title: string;
}

const TechnicalDiagram: React.FC<DiagramProps> = ({ tech, title }) => {
  // Categorize tech
  const frontend = tech.filter(t => ['Flutter', 'Dart', 'Provider', 'GetX'].includes(t)).join(', ');
  const backend = tech.filter(t => ['Node.js', 'Django', 'Java', 'Express', 'Python', 'FastAPI'].includes(t)).join(', ');
  const db = tech.filter(t => ['Firebase', 'MongoDB', 'MySQL', 'SQLite', 'Hive', 'Cloud Firestore'].includes(t)).join(', ');
  const services = tech.filter(t => ['FCM', 'Local Notifications', 'Google APIs', 'REST API', 'Axios'].includes(t)).join(', ');

  return (
    <div className="relative p-10 bg-black/40 rounded-[3rem] border border-white/5 overflow-hidden">
      <style>{`
        @keyframes flow-h {
          0% { left: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes flow-v {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-flow-h { animation: flow-h 2s infinite linear; }
        .animate-flow-v { animation: flow-v 2s infinite linear; }
      `}</style>
      
      <div className="mb-10 text-center">
        <h4 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Technical Data Flow (DFD)</h4>
        <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        {/* Input Layer */}
        <Node icon={<Smartphone className="w-6 h-6" />} label="Client" sublabel={frontend || 'Flutter SDK'} color="blue" />
        
        <Line horizontal />

        {/* Logic Layer */}
        <div className="flex flex-col gap-12">
            <Node icon={<Cpu className="w-6 h-6" />} label="App Logic" sublabel="State Management" color="purple" />
            <div className="flex justify-center h-12">
                <div className="w-[1px] h-full bg-white/10 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                </div>
            </div>
            <Node icon={<Zap className="w-6 h-6" />} label="Services" sublabel={services || 'REST / Push'} color="yellow" />
        </div>

        <Line horizontal />

        {/* Backend & DB Layer */}
        <div className="flex flex-col gap-12">
            <Node icon={<Server className="w-6 h-6" />} label="Engine" sublabel={backend || 'Cloud Instance'} color="emerald" />
            <Line />
            <Node icon={<Database className="w-6 h-6" />} label="Persistence" sublabel={db || 'Data Store'} color="red" />
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none"></div>
    </div>
  );
};

export default TechnicalDiagram;

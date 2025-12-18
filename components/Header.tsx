
import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Code, Terminal, Send, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'experience', label: 'History', icon: Briefcase },
    { id: 'projects', label: 'Code', icon: Code },
    { id: 'skills', label: 'Tech', icon: Terminal },
    { id: 'contact', label: 'Ping', icon: Send },
  ];

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsExpanded(false);
  };

  return (
    <>
      {/* HUD Navigation - Left Sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-8">
        <div className="w-[2px] h-32 bg-white/5 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-blue-500 transition-all duration-300" 
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group relative p-3 transition-all"
            >
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isActive ? 'bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'bg-white/5 group-hover:bg-white/10'
              }`} />
              <Icon className={`w-6 h-6 relative z-10 transition-colors ${
                isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'
              }`} />
              
              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </button>
          );
        })}
        
        <div className="w-[2px] h-32 bg-white/5" />
      </nav>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-6 right-6 z-[110] lg:hidden p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white"
      >
        {isExpanded ? <X /> : <Menu />}
      </button>

      {/* Mobile Menu Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-[105] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 lg:hidden animate-in fade-in duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-4xl font-black tracking-tighter transition-all ${
                activeSection === item.id ? 'text-blue-500 scale-110' : 'text-gray-600 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;

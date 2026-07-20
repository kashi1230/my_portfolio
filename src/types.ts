export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface MemoryCrystal {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  color: string; // Tailwind color classes
  details: string;
  shattered: boolean;
}

export interface ProjectFolder {
  id: string;
  title: string;
  tagline: string;
  description: string;
  glowingColor: string;
  opened: boolean;
}

export type SectionType = 'intro' | 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

export interface TerminalLog {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}


export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: 'Mobile' | 'Backend' | 'Database' | 'Tools';
}

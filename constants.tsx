
import { Project, Experience, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'fashionshop-01',
    title: 'FashionShop',
    description: 'A modern, high-performance e-commerce ecosystem. Features seamless shopping experiences with real-time synchronization and robust offline capabilities.',
    tech: ['Flutter', 'Provider', 'GetX', 'Firebase', 'SQLite', 'Node.js', 'MongoDB', 'Express', 'Axios', 'FCM', 'Local Notifications'],
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'device-lock-02',
    title: 'FinLock Admin Dashboard',
    description: 'An enterprise-grade device management system for finance applications. Allows sales teams to remotely lock, unlock, block, and unblock devices based on payment status.',
    tech: ['Flutter', 'Dart', 'SQLite', 'GetX', 'REST API', 'Robust Integration'],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'web-scraper-03',
    title: 'ScrapeMaster Pro',
    description: 'A sophisticated web scraping tool designed for deep data extraction. It automates the collection of specific data points from complex web structures.',
    tech: ['Python', 'BeautifulSoup', 'Selenium', 'Node.js', 'Puppeteer', 'Cheerio'],
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'erp-hrms-04',
    title: 'Enterprise ERP & HRMS',
    description: 'A full-scale ERP solution with integrated HR management features. Includes real-time employee tracking, attendance automation, and comprehensive reporting.',
    tech: ['Flutter', 'Java', 'GetX', 'Google APIs', 'Location Integration', 'FCM Notifications'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'SCREENBROS SERVICES PRIVATE LIMITED',
    role: 'Junior Software Engineer',
    period: 'July 2024 - Present',
    location: 'Bhopal, India',
    description: [
      'Developing and maintaining multiple high-performance mobile applications using Flutter and Dart.',
      'Integrating advanced features like device locking protocols and real-time syncing via FCM.',
      'Optimizing backend connectivity with Node.js and MongoDB for scalable data handling.',
      'Implementing robust local storage solutions using SQLite and Hive for offline-first user experiences.'
    ]
  },
  {
    company: 'SCREENBROS SERVICES PRIVATE LIMITED',
    role: 'Intern Flutter Developer',
    period: 'January 2024 - June 2024',
    location: 'Bhopal, India',
    description: [
      'Built cross-platform B2B solutions and administrative retailer panels.',
      'Worked extensively on API integration and UI responsiveness.',
      'Gained hands-on experience with Node.js and PHP CodeIgniter for backend modules.',
      'Focused on writing clean, maintainable code following OOP principles.'
    ]
  }
];

export const SKILLS: Skill[] = [
  // Mobile Category
  { name: 'Flutter', level: 95, category: 'Mobile' },
  { name: 'Dart', level: 92, category: 'Mobile' },
  { name: 'Java', level: 85, category: 'Mobile' },
  { name: 'Swift', level: 80, category: 'Mobile' },
  { name: 'GetX/Provider', level: 95, category: 'Mobile' },
  
  // Backend Category
  { name: 'Node.js', level: 88, category: 'Backend' },
  { name: 'Express', level: 90, category: 'Backend' },
  { name: 'Axios', level: 92, category: 'Backend' },
  { name: 'Rate-limiter', level: 82, category: 'Backend' },
  { name: 'Encryption', level: 85, category: 'Backend' },
  { name: 'Decryption', level: 85, category: 'Backend' },
  
  // Database Category
  { name: 'Firebase', level: 90, category: 'Database' },
  { name: 'MongoDB', level: 82, category: 'Database' },
  { name: 'MySQL', level: 85, category: 'Database' },
  { name: 'Cloud Firestore', level: 90, category: 'Database' },
  { name: 'SQLite/Hive', level: 88, category: 'Database' },
  
  // Tools Category
  { name: 'Android Studio', level: 90, category: 'Tools' },
  { name: 'Xcode', level: 85, category: 'Tools' },
  { name: 'Postman', level: 95, category: 'Tools' },
  { name: 'RESTful API', level: 95, category: 'Tools' },
];

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', target: 'home' },
  { name: 'About', target: 'about' },
  { name: 'Projects', target: 'projects' },
  { name: 'Contact', target: 'contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');

  // 스크롤 위치에 따라 현재 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.target));
      const scrollPosition = window.scrollY + window.innerHeight / 3; // 화면 1/3 지점 기준

      sections.forEach((section) => {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <div 
          onClick={(e) => handleScroll(e, 'home')}
          className="text-lg font-bold text-white tracking-widest cursor-pointer hover:text-indigo-400 transition-colors"
        >
          SORANG
        </div>

        <nav>
          <ul className="flex gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={`#${link.target}`}
                  onClick={(e) => handleScroll(e, link.target)}
                  className={`relative py-5 block transition-colors ${
                    activeSection === link.target ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* 활성화된 메뉴 아래에 보라색 밑줄 표시 */}
                  {activeSection === link.target && (
                    <motion.span 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500" 
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}
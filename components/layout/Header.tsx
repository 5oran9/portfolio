// components/layout/Header.tsx

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function Header() {
  const { mode } = useTheme();
  const [activeSection, setActiveSection] = useState('home');

  const isDev = mode === 'dev';

  // 모드 설정
  const navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: isDev ? 'Projects' : 'Works', target: 'projects' },
    { name: 'Contact', target: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.target));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 첫 로드시 active 계산
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // 테마 스타일
  const styles = {
    header: isDev ? 'bg-black/80 border-white/5' : 'bg-white/80 border-black/5',
    logo: isDev ? 'text-white hover:text-indigo-400' : 'text-black hover:text-orange-500',
    linkDefault: isDev ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black',
    linkActive: isDev ? 'text-white' : 'text-black',
    underline: isDev ? 'bg-indigo-500' : 'bg-orange-500',
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-1000 ${styles.header}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-center md:justify-between">
        {/* 로고: 모바일에서는 숨김 (md 이상에서만 표시) */}
        <div
          onClick={(e) => handleScroll(e, 'home')}
          className={`hidden md:block text-lg font-bold tracking-widest cursor-pointer transition-colors duration-300 ${styles.logo}`}
        >
          Portfolio - Sorang Kim
        </div>

        {/* 네비: 모바일 최적화 (폰에서는 간격/글자 줄이고 가운데 정렬) */}
        <nav className="w-full md:w-auto">
          <ul className="flex justify-center md:justify-end gap-4 md:gap-8 text-xs md:text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={`#${link.target}`}
                  onClick={(e) => handleScroll(e, link.target)}
                  className={`relative py-4 md:py-5 block transition-colors duration-300 ${
                    activeSection === link.target ? styles.linkActive : styles.linkDefault
                  }`}
                >
                  {link.name}
                  {activeSection === link.target && (
                    <motion.span
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 w-full h-[2px] ${styles.underline}`}
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

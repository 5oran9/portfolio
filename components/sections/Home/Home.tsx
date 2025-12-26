// components/sections/Home/Home.tsx

'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

import Header from '@/components/layout/Header';
import MessageWidget from '@/components/ui/MessageWidget';
import About from '@/components/sections/About/About';
import Contact from '@/components/sections/Contact/Contact';

import DevHero from './DevHero';
import FilmHero from './FilmHero';
import ProjectCarousel from '../Projects/ProjectCarousel';
import FilmPortfolio from '../Projects/FilmPortfolio';

export default function Home() {
  const { mode } = useTheme();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const mainBg = mode === 'dev' ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f5]';
  const aboutBg =
    mode === 'dev'
      ? 'bg-gradient-to-b from-[#0a0a0a] to-[#111111]'
      : 'bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5]';

  return (
    <main className={`w-full transition-colors duration-1000 ${mainBg}`}>
      <Header />

      <section
        id="home"
        className="relative h-[calc(100vh-80px)] w-full overflow-hidden pt-[80px]"
      >
        <AnimatePresence mode="wait">
          {mode === 'dev' ? <DevHero key="dev" /> : <FilmHero key="film" />}
        </AnimatePresence>
      </section>

      <div id="about" className={`relative transition-colors duration-1000 ${aboutBg}`}>
        <About />
      </div>

      <div id="projects" className="relative">
        <AnimatePresence mode="wait">
          {mode === 'dev' ? <ProjectCarousel key="dev-proj" /> : <FilmPortfolio key="film-proj" />}
        </AnimatePresence>
      </div>

      <div id="contact" className="relative">
        <Contact />
      </div>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-24 right-6 z-40 w-14 h-14 flex items-center justify-center backdrop-blur-md rounded-full shadow-xl transition-all duration-300 group
              ${mode === 'dev'
                ? 'bg-white/10 border border-white/20 text-white hover:bg-white hover:text-indigo-600'
                : 'bg-black/5 border border-black/10 text-black hover:bg-black hover:text-white'
              }`}
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <MessageWidget />
    </main>
  );
}

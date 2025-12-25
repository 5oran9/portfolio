'use client';

import { useState } from 'react';
import Hero3D from '@/components/canvas/Hero3D';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Header from '@/components/layout/Header';
import MessageWidget from '@/components/ui/MessageWidget';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  
  const [showTopBtn, setShowTopBtn] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setShowTopBtn(true);
    } else {
      setShowTopBtn(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-[#0a0a0a]">
      
      <Header />
      
      {/* 1. Hero */}
      <section id="home" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Hero3D />
        </div>

        <div className="z-10 text-center text-white space-y-6 select-none pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-indigo-200"
          >
            SORANG KIM
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 font-light tracking-wide"
          >
            Interactive Developer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-6 pointer-events-auto"
          >
            <button className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white hover:bg-white/10 hover:scale-105 hover:border-indigo-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              Explore Universe
            </button>
          </motion.div>
        </div>

        <motion.div 
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/50 tracking-[0.2em] uppercase">Scroll</span>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-16 bg-gradient-to-b from-indigo-500 to-transparent" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. About */}
      <div id="about" className="relative bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
        <About />
      </div>

      {/* 3. Projects */}
      <div id="projects" className="relative bg-[#050505]">
        <Projects />
      </div>

      {/* 4. Contact */}
      <div id="contact" className="relative">
        <Contact />
      </div>

      {/* 🔥 Scroll To Top Button (수정됨!) */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            // 크기(w-14 h-14), 중앙정렬(flex), 위치(bottom-22), 스타일(MessageWidget과 동일하게) 수정
            className="fixed bottom-24 right-6 z-40 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg hover:bg-white hover:text-black transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <svg 
              className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 문의 위젯 (우측 하단 고정) */}
      <MessageWidget />

    </main>
  );
}
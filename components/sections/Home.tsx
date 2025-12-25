// components/sections/Home.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

import Hero3D from '@/components/canvas/Hero3D';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Header from '@/components/layout/Header';
import MessageWidget from '@/components/ui/MessageWidget';
import ProjectCarousel from './Projects/ProjectCarousel'; 

export default function Home() {
  const { scrollY } = useScroll();

  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]); 
  const scrollBlur = useTransform(scrollY, [0, 500], ["0px", "10px"]);

  const [showTopBtn, setShowTopBtn] = useState(false);

  // 새로고침 시 스크롤 맨 위로 초기화
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // 스크롤 이벤트 최적화: 버벅임 방지
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowTopBtn(scrollPosition > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-[#0a0a0a]">
      
      <Header />
      
      {/* 1. Hero Section */}
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
        </div>

        {/* ✨ Scroll Indicator (선 위쪽, 글자 아래쪽) */}
        <motion.div 
          style={{ 
            opacity: scrollOpacity,
            filter: scrollBlur 
          }}
          className="absolute bottom-15 z-10 flex flex-col items-center gap-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-3"
          >
            {/* 1. 움직이는 선 (위) - 길이 h-16으로 적절하게 조절 */}
            <div className="w-[1px] h-16 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="w-full h-1/2 bg-gradient-to-b from-transparent via-indigo-400 to-transparent"
              />
            </div>

            {/* 2. 텍스트 (아래) */}
            <span className="text-sm font-medium text-white/60 tracking-[0.3em] uppercase drop-shadow-md">
              Scroll Down
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. About Section */}
      <div id="about" className="relative bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
        <About />
      </div>

      {/* 3. Projects Section (ProjectCarousel 적용됨) */}
      <div id="projects" className="relative bg-[#050505]">
        <ProjectCarousel />
      </div>

      {/* 4. Contact Section */}
      <div id="contact" className="relative">
        <Contact />
      </div>

      {/* Scroll To Top Button - 색상 변경 및 애니메이션 최적화 */}
      <AnimatePresence mode="wait">
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 w-14 h-14 flex items-center justify-center bg-white-600/80 backdrop-blur-md border border-indigo-400/30 rounded-full text-white shadow-xl hover:bg-white hover:text-indigo-600 transition-all duration-300 group"
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

      <MessageWidget />

    </main>
  );
}
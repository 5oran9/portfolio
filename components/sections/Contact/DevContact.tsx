// components/sections/Contact/DevContact.tsx

'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function DevContact() {
  const [toast, setToast] = useState<string | null>(null);
  const { toggleMode } = useTheme();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied!');
      window.setTimeout(() => setToast(null), 1200);
    } catch {
      /* ignore */
    }
  };

  const handleSwitchToFilm = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    toggleMode();
  };

  const viewport = {
    once: false,
    amount: 0.2,
    margin: '-10% 0px',
  } as const;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const textItem: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#050505] to-[#000000] text-center overflow-hidden pt-32">
      {/* 배경 장식 (느리게 회전하는 부유물 효과) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none bg-indigo-600/10" 
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative z-10 max-w-4xl mx-auto space-y-12 pb-20"
      >
        <motion.h2 variants={textItem} className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          Let's work {" "}
          <span className="relative inline-block text-indigo-500">
            together.
            {/* 하단 텍스트 밑줄 애니메이션 */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
              className="absolute -bottom-2 left-0 h-[2px] bg-indigo-500/30"
            />
          </span>
        </motion.h2>

        <motion.p variants={textItem} className="text-xl font-light text-gray-400">
          데이터의 흐름을 읽고, 감각적인 경험을 설계합니다.
          <br />
          언제든 편하게 연락주세요.
        </motion.p>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
          {/* Phone Card */}
          <motion.button
            variants={cardItem}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => copyToClipboard('010-5523-1494')}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 backdrop-blur-sm transition-all duration-300 group overflow-hidden relative"
          >
            <div className="p-8 min-h-[156px] flex flex-col items-center justify-center relative z-10">
              <div className="mb-4 text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-lg md:text-xl font-bold tracking-wide text-white group-hover:translate-y-[-2px] transition-transform duration-300">010-5523-1494</p>
              <p className="mt-2 text-sm text-gray-500 opacity-60 group-hover:opacity-100 transition-opacity">Tap to copy</p>
            </div>
          </motion.button>

          {/* Email Card */}
          <motion.button
            variants={cardItem}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => copyToClipboard('sorang.lab@gmail.com')}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 backdrop-blur-sm transition-all duration-300 group overflow-hidden relative"
          >
            <div className="p-8 min-h-[156px] flex flex-col items-center justify-center relative z-10">
              <div className="mb-4 text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-all duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg md:text-xl font-bold tracking-wide text-white break-all group-hover:translate-y-[-2px] transition-transform duration-300">sorang.lab@gmail.com</p>
              <p className="mt-2 text-sm text-gray-500 opacity-60 group-hover:opacity-100 transition-opacity">Tap to copy</p>
            </div>
          </motion.button>
        </motion.div>

        {/* View Portfolio Button with Glow Effect */}
        <motion.div variants={textItem} className="flex justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSwitchToFilm}
            className="relative cursor-pointer px-10 py-4 rounded-full bg-indigo-500 text-white font-bold transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10">View Film Portfolio</span>
            {/* 내부 광원 효과 */}
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
            />
          </motion.button>
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-6 left-0 w-full text-center text-sm text-gray-500 font-light">
        <p>© 2025 Sorang Kim. All rights reserved.</p>
      </footer>

      {/* Toast Notification (디자인 개선) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%', scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 10, x: '-50%', scale: 0.95 }}
            className="fixed bottom-12 left-1/2 z-50"
          >
            <div className="px-6 py-2.5 rounded-full border border-white/20 bg-indigo-600/90 text-white text-sm font-bold backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
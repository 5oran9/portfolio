// components/sections/Contact/FilmContact.tsx

'use client';

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  Variants,
} from 'framer-motion';
import { useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function FilmContact() {
  const [toast, setToast] = useState<string | null>(null);
  const { toggleMode } = useTheme();
  const reduceMotion = useReducedMotion();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied!');
      window.setTimeout(() => setToast(null), 1200);
    } catch {
      /* ignore */
    }
  };

  const handleSwitchToDev = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    toggleMode();
  };

  // =========================
  // Doughy blob motion (continuous)
  // =========================
  const t = useMotionValue(0);
  const x = useTransform(t, (v) => Math.sin(v * 0.55) * 22 + Math.sin(v * 0.23) * 14);
  const y = useTransform(t, (v) => Math.cos(v * 0.5) * 16 + Math.sin(v * 0.27) * 12);
  const scaleX = useTransform(t, (v) => 1 + Math.sin(v * 0.7) * 0.035 + Math.sin(v * 0.19) * 0.02);
  const scaleY = useTransform(t, (v) => 1 + Math.cos(v * 0.62) * 0.03 + Math.sin(v * 0.21) * 0.018);
  const rot = useTransform(t, (v) => Math.sin(v * 0.4) * 2.2 + Math.sin(v * 0.13) * 1.2);
  const glowOpacity = useTransform(t, (v) => 0.62 + (Math.sin(v * 0.35) + 1) * 0.12);

  const speedRef = useRef(0.0011);
  useAnimationFrame((_time, delta) => {
    if (reduceMotion) return;
    t.set(t.get() + delta * speedRef.current);
  });

  // =========================
  // Content animations
  // =========================
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
    hidden: { opacity: 0, y: 30, filter: 'blur(12px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardsWrap: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
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
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#f5f5f5] to-[#e5e5e5] text-center overflow-hidden pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative z-10 max-w-4xl mx-auto space-y-12 pb-20"
      >
        <motion.h2 variants={textItem} className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900">
          Let’s work <span className="text-orange-500">together.</span>
        </motion.h2>

        <motion.p variants={textItem} className="text-xl font-light text-gray-600">
          현장의 공기부터 후반의 디테일까지,
          <br />
          감정의 리듬이 흐트러지지 않도록 사운드를 설계합니다.
        </motion.p>

        <motion.div variants={textItem} className="relative w-full max-w-2xl mx-auto">
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: 760,
              height: 320,
              borderRadius: 9999,
              background:
                'radial-gradient(62% 88% at 50% 50%, rgba(255,132,0,0.26) 0%, rgba(255,132,0,0.14) 38%, rgba(255,132,0,0.00) 76%)',
              filter: 'blur(46px)',
              willChange: 'transform, opacity',
              x,
              y,
              rotate: rot,
              scaleX,
              scaleY,
              opacity: reduceMotion ? 0.6 : glowOpacity,
            }}
          />

          <motion.div variants={cardsWrap} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              variants={cardItem}
              onClick={() => copyToClipboard('010-5523-1494')}
              className="cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-orange-200 backdrop-blur-sm transition-all duration-300 group"
            >
              <div className="p-8 min-h-[156px] flex flex-col items-center justify-center">
                <div className="mb-4 text-orange-500 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-bold tracking-wide text-gray-900">010-5523-1494</p>
                <p className="mt-2 text-sm text-gray-500">Tap to copy</p>
              </div>
            </motion.button>

            <motion.button
              variants={cardItem}
              onClick={() => copyToClipboard('5oran9@naver.com')}
              className="cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-orange-200 backdrop-blur-sm transition-all duration-300 group"
            >
              <div className="p-8 min-h-[156px] flex flex-col items-center justify-center">
                <div className="mb-4 text-orange-400 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl font-bold tracking-wide text-gray-900 break-all">5oran9@naver.com</p>
                <p className="mt-2 text-sm text-gray-500">Tap to copy</p>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* View Dev Portfolio Button with Glow & Shine Effect */}
        <motion.div variants={textItem} className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSwitchToDev}
            className="relative cursor-pointer px-10 py-4 rounded-full bg-black text-white font-bold transition-all duration-300 group overflow-hidden"
          >
            <span className="relative z-10">View Dev Portfolio</span>
            {/* 내부 광원 효과 (Shine) */}
            <motion.div 
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg]"
            />
          </motion.button>
        </motion.div>
      </motion.div>

      <footer className="absolute bottom-6 left-0 w-full text-center text-sm text-gray-600">
        <p>© 2025 Sorang Kim. All rights reserved.</p>
      </footer>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 15, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50"
          >
            <div className="px-5 py-2.5 rounded-full border border-orange-200 bg-white/90 text-orange-600 text-sm font-bold shadow-lg backdrop-blur-md">
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
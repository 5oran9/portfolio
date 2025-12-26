// components/sections/Home/DevHero.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import DevHero3D from '@/components/canvas/DevHero3D';
import ScrollIndicator from './ScrollIndicator';

export default function DevHero() {
  const { scrollY } = useScroll();

  // 스크롤에 따른 투명도 및 블러 조절
  const indicatorOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const indicatorBlur = useTransform(scrollY, [0, 520], ['0px', '10px']);

  return (
    <section className="relative h-full w-full overflow-hidden bg-[#050505]">
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <DevHero3D />
      </div>

      {/* CINEMATIC overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,1)_100%)]" />

      {/* center text */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 md:px-10">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">

          {/* 이름 */}
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl md:text-[9.5rem] font-extrabold tracking-tighter text-white leading-none"
            style={{
              textShadow: '0 20px 80px rgba(0,0,0,0.5)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            SORANG KIM
          </motion.h1>

          {/* Interactive Developer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mt-8 md:mt-10"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500/50 to-purple-500/50 opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
              <span
                className="
                  relative inline-flex items-center justify-center
                  rounded-full border border-white/10
                  bg-black/40 px-8 py-2.5
                  text-lg md:text-2xl font-medium tracking-[0.15em]
                  text-indigo-100/90 backdrop-blur-xl
                "
              >
                Interactive Developer
              </span>
            </div>
          </motion.div>

          {/* 미니 라인 */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "circOut" }}
            className="mt-12 h-[1px] w-48 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-0 md:bottom-2 left-0 w-full flex justify-center z-20 pointer-events-none">
        <div className="flex flex-col items-center">
          <ScrollIndicator 
            mode="dev" 
            opacity={indicatorOpacity} 
            blur={indicatorBlur} 
          />
        </div>
      </div>
    </section>
  );
}
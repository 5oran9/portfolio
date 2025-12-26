// components/sections/Home/DevHero.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import DevHero3D from '@/components/canvas/DevHero3D';
import ScrollIndicator from './ScrollIndicator';

export default function DevHero() {
  const { scrollY } = useScroll();

  // 스크롤에 따른 투명도 및 블러 처리
  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scrollBlur = useTransform(scrollY, [0, 500], ["0px", "10px"]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative h-full w-full flex flex-col items-center justify-center"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <DevHero3D />
      </div>

      {/* Text Content */}
      <div className="z-10 text-center space-y-6 select-none pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter bg-gradient-to-r from-indigo-200 via-white to-indigo-200 bg-clip-text text-transparent"
        >
          SORANG KIM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl md:text-2xl tracking-wide text-gray-400"
        >
          Interactive Developer
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <ScrollIndicator mode="dev" opacity={scrollOpacity} blur={scrollBlur} />
    </motion.div>
  );
}
// components/sections/Home/FilmHero.tsx

'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import FilmHero3D from '@/components/canvas/FilmHero3D';
import ScrollIndicator from './ScrollIndicator';

export default function FilmHero() {
  const { scrollY } = useScroll();

  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scrollBlur = useTransform(scrollY, [0, 500], ['0px', '10px']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative h-full w-full flex items-center justify-center"
    >

      <div className="absolute inset-0 z-0 translate-y-10 md:translate-y-5">
        <FilmHero3D />
      </div>

      <div className="relative z-10 text-center select-none pointer-events-none px-6 -translate-y-10 md:-translate-y-28">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-7xl md:text-9xl font-bold tracking-tighter text-gray-900"
        >
          SORANG KIM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 md:mt-12 text-xl md:text-2xl tracking-wide text-orange-600 font-medium"
        >
          Sound Designer for Film & Media
        </motion.p>
      </div>

      <ScrollIndicator mode="film" opacity={scrollOpacity} blur={scrollBlur} />
    </motion.div>
  );
}

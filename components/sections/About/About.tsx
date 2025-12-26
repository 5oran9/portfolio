// components/sections/About/About.tsx

'use client';

import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import DevAbout from './DevAbout';
import FilmAbout from './FilmAbout';

export default function About() {
  const { mode } = useTheme();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        {mode === 'dev' ? <DevAbout /> : <FilmAbout />}
      </motion.div>
    </AnimatePresence>
  );
}

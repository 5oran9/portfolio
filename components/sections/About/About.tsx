// components/sections/About/About.tsx

'use client';

import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import DevAbout from './DevAbout';
import FilmAbout from './FilmAbout';

export default function About() {
  const { mode } = useTheme();

  return (
    <AnimatePresence mode="wait">
      {mode === 'dev' ? (
        <DevAbout key="dev-about" />
      ) : (
        <FilmAbout key="film-about" />
      )}
    </AnimatePresence>
  );
}
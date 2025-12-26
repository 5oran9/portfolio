// components/sections/Contact/Contact.tsx

'use client';

import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import DevContact from './DevContact';
import FilmContact from './FilmContact';

export default function Contact() {
  const { mode } = useTheme();

  return (
    <AnimatePresence mode="wait">
      {mode === 'dev' ? (
        <DevContact key="dev-contact" />
      ) : (
        <FilmContact key="film-contact" />
      )}
    </AnimatePresence>
  );
}
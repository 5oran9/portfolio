// components/sections/Home/ScrollIndicator.tsx

'use client';

import { motion, MotionValue } from 'framer-motion';

interface ScrollIndicatorProps {
  mode: 'dev' | 'film';
  opacity: MotionValue<number>;
  blur: MotionValue<string>;
}

export default function ScrollIndicator({ mode, opacity, blur }: ScrollIndicatorProps) {
  const scrollText = mode === 'dev' ? 'text-white/60' : 'text-black/60';
  const scrollLine = mode === 'dev' ? 'bg-white/10' : 'bg-black/10';
  const scrollIndicator = mode === 'dev' ? 'via-indigo-400' : 'via-orange-500';

  return (
    <motion.div
      style={{ opacity, filter: blur }}
      className="absolute bottom-15 z-10 flex flex-col items-center gap-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex flex-col items-center gap-3"
      >
        <div className={`w-[1px] h-16 rounded-full overflow-hidden relative transition-colors duration-1000 ${scrollLine}`}>
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-full h-1/2 bg-gradient-to-b from-transparent to-transparent transition-colors duration-1000 ${scrollIndicator}`}
          />
        </div>
        <span className={`text-sm font-medium tracking-[0.3em] uppercase drop-shadow-md transition-colors duration-1000 ${scrollText}`}>
          Scroll Down
        </span>
      </motion.div>
    </motion.div>
  );
}
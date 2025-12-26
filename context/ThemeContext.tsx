// context/ThemeContext.tsx

'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Mode = 'dev' | 'film';

interface ThemeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('dev');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('portfolio-mode') as Mode | null;
    if (savedMode) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // 모드 변경 시 로컬 스토리지에 저장
  const toggleMode = () => {
    const newMode = mode === 'dev' ? 'film' : 'dev';
    setMode(newMode);
    localStorage.setItem('portfolio-mode', newMode);
  };

  // Hydration 불일치 방지 (깜빡임 방지용 로딩 처리나 기본값 렌더링)
  if (!mounted) {
    return <div className="min-h-screen bg-[#0a0a0a]" />; // 아주 잠깐의 로딩 상태 (깜빡임 방지)
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <div className={`min-h-screen transition-colors duration-1000 ease-in-out ${mode === 'dev' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f5f5f5] text-black'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
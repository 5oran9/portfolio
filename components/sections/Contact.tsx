'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Contact() {
  const [toast, setToast] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast('Copied!');
      window.setTimeout(() => setToast(null), 1200);
    } catch {
      // 실패 시 조용히 무시
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#050505] to-[#000000] text-center overflow-hidden pt-32">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto space-y-12 pb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          Let's work <span className="text-indigo-500">together.</span>
        </h2>

        <p className="text-gray-400 text-xl font-light">
          데이터의 흐름을 읽고, 감각적인 경험을 설계합니다.
          <br />
          언제든 편하게 연락주세요.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
          {/* Phone */}
          <button
            type="button"
            onClick={() => copyToClipboard('010-5523-1494')}
            className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            aria-label="전화번호 복사"
          >
            <div className="p-8 min-h-[156px] flex flex-col items-center justify-center text-center">
              <div className="mb-4 text-purple-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>

              <p className="w-full text-center text-lg md:text-xl font-bold text-white tracking-wide">
                010-5523-1494
              </p>
            </div>
          </button>

          {/* Email */}
          <button
            type="button"
            onClick={() => copyToClipboard('5oran9@naver.com')}
            className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            aria-label="이메일 복사"
          >
            <div className="p-8 min-h-[156px] flex flex-col items-center justify-center text-center">
              <div className="mb-4 text-indigo-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <p className="w-full text-center text-lg md:text-xl font-bold text-white tracking-wide break-all">
                5oran9@naver.com
              </p>
            </div>
          </button>
        </div>

        <div className="flex justify-center">
          <a
            href="/film"
            className="px-6 py-3 rounded-full bg-indigo-500 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-indigo-500 transition-all duration-300"
            aria-label="필름 포트폴리오 보기"
          >
            View Film Portfolio
          </a>
        </div>
      </motion.div>

      <footer className="absolute bottom-6 left-0 w-full text-center text-gray-600 text-sm">
        <p>© 2025 Sorang Kim. All rights reserved.</p>
      </footer>

      {/* 하단 토스트 (카드 레이아웃에 영향 0) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="px-4 py-2 rounded-full bg-black/60 border border-white/10 text-gray-200 text-sm backdrop-blur-md">
              {toast}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

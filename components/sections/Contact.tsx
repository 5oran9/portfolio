'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    // ✨ 수정 1: pt-32를 추가하여 전체 컨텐츠를 화면 아래쪽으로 쑥 내렸습니다.
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#050505] to-[#000000] text-center overflow-hidden pt-32">
      
      {/* 배경 장식 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        // pb-20은 유지하여 모바일에서 Footer와 겹치지 않게 함
        className="relative z-10 max-w-4xl mx-auto space-y-12 pb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          Let's work <span className="text-indigo-500">together.</span>
        </h2>
        
        <p className="text-gray-400 text-xl font-light">
          데이터의 흐름을 읽고, 감각적인 경험을 설계합니다.<br/>
          언제든 편하게 연락주세요.
        </p>

        {/* 연락처 정보 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto">
          
          {/* ✨ 수정 2: Phone을 먼저 배치 (순서 변경) */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
            <div className="mb-4 text-purple-400">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Phone</h3>
            
            {/* ✨ 수정 3: 폰트 크기 축소 (text-xl -> text-lg) */}
            <p className="text-lg md:text-xl font-bold text-white tracking-wide">010-5523-1494</p>
          </div>

          {/* Email (두 번째로 이동) */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group">
            <div className="mb-4 text-indigo-400">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">Email</h3>
            
            {/* ✨ 수정 3: 폰트 크기 축소 */}
            <p className="text-lg md:text-xl font-bold text-white tracking-wide">5oran9@naver.com</p>
          </div>

        </div>

        {/* 소셜 링크 */}
        <div className="flex justify-center gap-6 mt-8">
            
            {/* GitHub */}
            <a 
              href="https://github.com/5oran9/5oran9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-indigo-500 hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>



        </div>
      </motion.div>

      <footer className="absolute bottom-6 left-0 w-full text-center text-gray-600 text-sm">
        <p>© 2025 Sorang Kim. All rights reserved.</p>
      </footer>

    </section>
  );
}
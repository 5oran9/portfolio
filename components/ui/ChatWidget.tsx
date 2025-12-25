'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* 챗봇 대화창 (열렸을 때) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 relative overflow-hidden"
          >
            {/* 상단 장식 */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
            
            <h3 className="font-bold text-lg mb-2">안녕하세요, 김소랑입니다! 👋</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              포트폴리오를 보시면서 궁금한 점이 있으신가요? 
              아래 버튼으로 바로 연락주세요!
            </p>

            <div className="space-y-2">
              <a href="tel:010-5523-1494" className="block w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors text-center">
                📞 전화 걸기 (010-5523-1494)
              </a>
              <a href="mailto:5oran9@naver.com" className="block w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors text-center">
                ✉️ 메일 보내기
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 챗봇 버튼 (둥둥 떠있는 아이콘) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 hover:scale-110 transition-all duration-300"
      >
        {/* 말풍선 아이콘 */}
        <span className="sr-only">Open Chat</span>
        {isOpen ? (
          // 닫기(X) 아이콘
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          // 메시지 아이콘
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}

        {/* 안 읽은 메시지 알림 점 (닫혀있을 때만) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
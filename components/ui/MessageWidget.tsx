'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MessageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 메일 클라이언트 열기 (제목과 내용 자동 완성)
    const subject = `[Portfolio Inquiry] 안녕하세요, ${formData.name}입니다.`;
    const body = `${formData.message}`;
    window.location.href = `mailto:5oran9@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // 폼 닫기
    setIsOpen(false);
    setFormData({ name: '', message: '' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* 메시지 입력 폼 (열렸을 때) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl shadow-2xl w-[320px] md:w-[360px] relative overflow-hidden backdrop-blur-md"
          >
            {/* 상단 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-white font-bold text-lg">Send a Message</h3>
                <p className="text-gray-400 text-xs mt-1">확인 후 빠르게 회신 드리겠습니다.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="성함 혹은 기업명"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Message</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="문의하실 내용을 남겨주세요."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 text-sm mt-2"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 트리거 버튼 (편지 아이콘) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg hover:bg-white hover:text-black transition-all duration-300"
      >
        {isOpen ? (
          // 닫기 아이콘
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        ) : (
          // 편지(Mail) 아이콘
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        )}
      </button>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  // 간단한 스팸 방지용 허니팟(사람은 보통 안 채움)
  company: string;
};

export default function MessageWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '',
  });

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', message: '', company: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    // 허니팟에 값이 들어오면 봇 가능성 높아서 조용히 종료
    if (formData.company.trim().length > 0) {
      setIsOpen(false);
      resetForm();
      return;
    }

    try {
      setIsSending(true);

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? '메일 전송에 실패했습니다.');
      }

      setToast({ type: 'success', text: '전송 완료! 곧 회신드릴게요.' });
      resetForm();
      setIsOpen(false);
    } catch (err: any) {
      setToast({ type: 'error', text: err?.message ?? '전송 실패. 잠시 후 다시 시도해주세요.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* 간단 토스트 */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className={`px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-sm ${toast.type === 'success'
                ? 'bg-black/50 border-white/10 text-white'
                : 'bg-black/50 border-red-500/30 text-white'
              }`}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#1a1a1a] border border-white/10 p-6 rounded-2xl shadow-2xl w-[320px] md:w-[360px] relative overflow-hidden backdrop-blur-md"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-white font-bold text-lg">Send a Message</h3>
                <p className="text-gray-400 text-xs mt-1">확인 후 빠르게 회신 드리겠습니다.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 허니팟: 숨김 필드 */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="hidden"
              />

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Name</label>
                <input
                  type="text"
                  required
                  placeholder="성함 혹은 기업명"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="reply 받을 이메일"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Phone</label>
                <input
                  type="tel"
                  placeholder="선택 (010-0000-0000)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-gray-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group flex items-center justify-center w-14 h-14 bg-indigo-600 border border-indigo-400/40 rounded-full text-white shadow-lg hover:bg-indigo-500 transition-all duration-300"


        aria-label="Open message form"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
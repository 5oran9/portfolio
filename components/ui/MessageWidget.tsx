// components/ui/MessageWidget.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string; // 허니팟 필드
};

export default function MessageWidget() {
  const { mode } = useTheme(); // ✨ 테마 모드 가져오기
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', message: '', company: '',
  });

  // ✨ 테마별 스타일 정의
  const isDev = mode === 'dev';
  const styles = {
    modalBg: isDev ? 'bg-[#1a1a1a] border-white/10' : 'bg-white border-gray-200',
    title: isDev ? 'text-white' : 'text-gray-900',
    desc: isDev ? 'text-gray-400' : 'text-gray-500',
    inputBg: isDev ? 'bg-black/30 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900',
    inputFocus: isDev ? 'focus:border-indigo-500' : 'focus:border-orange-500',
    submitBtn: isDev 
      ? 'bg-white text-black hover:bg-gray-200' 
      : 'bg-orange-600 text-white hover:bg-orange-700',
    toggleBtn: isDev 
      ? 'bg-indigo-600 border-indigo-400/40 hover:bg-indigo-500' 
      : 'bg-orange-500 border-orange-400/40 hover:bg-orange-600',
    toast: isDev ? 'bg-black/80 border-white/10' : 'bg-white border-gray-200 shadow-xl'
  };

  const resetForm = () => setFormData({ name: '', email: '', phone: '', message: '', company: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

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

      if (!res.ok) throw new Error('메일 전송에 실패했습니다.');

      setToast({ type: 'success', text: '전송 완료! 곧 회신드릴게요.' });
      resetForm();
      setIsOpen(false);
    } catch (err: any) {
      setToast({ type: 'error', text: err?.message ?? '전송 실패. 다시 시도해주세요.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className={`px-4 py-3 rounded-xl border backdrop-blur-md text-sm transition-colors duration-1000 ${styles.toast} ${
              toast.type === 'error' ? 'text-red-500' : isDev ? 'text-white' : 'text-gray-900'
            }`}
          >
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`p-6 rounded-2xl shadow-2xl w-[320px] md:w-[360px] border backdrop-blur-md transition-colors duration-1000 ${styles.modalBg}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className={`font-bold text-lg ${styles.title}`}>Send a Message</h3>
                <p className={`text-xs mt-1 ${styles.desc}`}>확인 후 빠르게 회신 드리겠습니다.</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" tabIndex={-1} autoComplete="off" value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="hidden" />

              {[
                { label: 'Name', type: 'text', key: 'name', ph: '성함 혹은 기업명' },
                { label: 'Email', type: 'email', key: 'email', ph: 'reply 받을 이메일' },
                { label: 'Phone', type: 'tel', key: 'phone', ph: '선택 (010-0000-0000)' },
              ].map((field) => (
                <div key={field.key}>
                  <label className={`block text-xs font-medium mb-1.5 ml-1 ${styles.desc}`}>{field.label}</label>
                  <input
                    type={field.type}
                    required={field.key !== 'phone'}
                    placeholder={field.ph}
                    value={(formData as any)[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all placeholder:text-gray-500/50 ${styles.inputBg} ${styles.inputFocus}`}
                  />
                </div>
              ))}

              <div>
                <label className={`block text-xs font-medium mb-1.5 ml-1 ${styles.desc}`}>Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="문의하실 내용을 남겨주세요."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none transition-all placeholder:text-gray-500/50 resize-none ${styles.inputBg} ${styles.inputFocus}`}
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3 font-bold rounded-xl transition-all active:scale-95 text-sm mt-2 disabled:opacity-60 ${styles.submitBtn}`}
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg transition-all duration-500 border ${styles.toggleBtn}`}
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
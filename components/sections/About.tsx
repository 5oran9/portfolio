'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion'; // Variants 추가!

export default function About() {
  // : Variants 타입을 명시해서 에러 해결
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-10 z-10">
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* 왼쪽: 프로필 사진 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative group"
        >
          {/* 뒤쪽 네온 글로우 효과 */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
          
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            {/* 이미지 경로 주의! public/images/profile.jpg */}
            <Image
              src="/images/profile.jpg"
              alt="Sorang Kim"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        {/* 오른쪽: 텍스트 스토리 */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-white space-y-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm tracking-wider font-medium">
            WHO AM I?
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            From <span className="text-indigo-400">Sound Waves</span><br />
            To <span className="text-purple-400">Code Logic</span>
          </h2>

          <div className="space-y-4 text-gray-300 text-lg font-light leading-relaxed">
            <p>
              안녕하세요! <strong className="text-white font-medium">인터랙티브 개발자 김소랑</strong>입니다.
            </p>
            <p>
              영화 사운드를 디자인하며 보이지 않는 공기의 흐름을 다루던 감각으로, 
              이제는 데이터의 흐름을 지휘하여 사용자에게 닿는 서비스를 만듭니다.
            </p>
            <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-6 bg-white/5 rounded-r-lg italic text-gray-400">
              &quot;문제를 구조로 정리하고,<br/> 
              그 구조를 서비스로 구현합니다.&quot;
            </blockquote>
            <p>
              AI 엔지니어링과 풀스택 개발을 넘나들며, 
              기술적으로 견고하면서도 감각적인 경험을 설계하는 것을 좋아합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {['Sound Design', 'AI Engineering', 'Full Stack', 'Interactive Web'].map((skill) => (
              <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:text-white hover:border-white/30 transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
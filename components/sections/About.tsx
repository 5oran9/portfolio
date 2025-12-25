'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-8 lg:px-20 py-24 bg-[#0a0a0a] text-white">
      
      {/* ✨ 수정됨: 사진 위치 조정
        1. justify-between -> justify-center (양 끝 배치가 아닌 중앙 정렬로 변경하여 사진을 안쪽으로 당김)
        2. lg:gap-28 (텍스트와 사진 사이 간격 적절히 조정)
      */}
      <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-28 mb-24 max-w-7xl mx-auto w-full">
        
        {/* 1. 프로필 사진 (우측 배치, 중앙 쪽으로 당겨짐) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-full overflow-hidden border-4 border-gray-800/50 shadow-2xl group"
        >
          <Image 
            src="/profile_image2.jpg"
            alt="Profile Image"
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out transform scale-105 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay"></div>
        </motion.div>


        {/* 2. 메인 카피 & 소개글 (좌측 배치) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center lg:text-left"
        >
          <span className="px-4 py-1.5 rounded-full border border-indigo-500/50 text-indigo-400 text-sm font-medium bg-indigo-500/10 backdrop-blur-sm inline-block mb-6">
            WHO AM I?
          </span>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            From <span className="text-indigo-500">Sound Waves</span><br />
            To <span className="text-purple-500">Code Logic</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed whitespace-pre-line break-keep">
            안녕하세요! 인터랙티브 개발자 김소랑입니다.
            {"\n\n"}
            영화 사운드를 디자인하며 보이지 않는 공기의 흐름을 다루던 감각으로, 이제는 데이터의 흐름을 지휘하여 사용자에게 닿는 서비스를 만듭니다.
          </p>
        </motion.div>
      </div>


      {/* 하단 영역: 타임라인 (동일 선상 정렬) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">

        {/* 왼쪽: Engineering Journey */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
            Engineering Journey
          </h3>
          
          {/* Timeline Container */}
          <div className="space-y-10 border-l-2 border-gray-800 pl-8 ml-1 relative">
            <div className="relative">
              {/* Timeline Dot */}
              <span className="absolute -left-[39px] top-1.5 w-5 h-5 bg-[#0a0a0a] border-2 border-purple-500 rounded-full"></span>
              
              <span className="text-sm text-purple-400 font-semibold block mb-1 tracking-wide">2025 (Latest)</span>
              <h4 className="text-xl font-bold text-white mb-2">AI Engineer & Full Stack</h4>
              <p className="text-gray-400 text-sm leading-snug">
                멋쟁이사자처럼 AI 엔지니어 심화 (NLP)<br/>
                AI 웹서비스 풀스택 개발자 과정 (Deep Learning)
              </p>
              <ul className="flex flex-wrap gap-2 mt-4">
                <li className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300">NLP</li>
                <li className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300">React</li>
                <li className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300">Python</li>
              </ul>
            </div>
          </div>
        </motion.div>


        {/* 오른쪽: Creative Base */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            Creative Base
          </h3>
          
          {/* Timeline Container (높이 동일하게 시작) */}
          <div className="space-y-10 border-l-2 border-gray-800 pl-8 ml-1 relative">
            <div className="relative">
              {/* Timeline Dot */}
              <span className="absolute -left-[39px] top-1.5 w-5 h-5 bg-[#0a0a0a] border-2 border-indigo-500 rounded-full"></span>
              
              <span className="text-sm text-gray-500 font-semibold block mb-1 tracking-wide">2016 - 2022</span>
              <h4 className="text-xl font-bold text-gray-200 mb-2">Sound & Film & Art Management</h4>
              <p className="text-gray-400 text-sm leading-snug mb-3">
                KAFA 사운드 디자인 과정 수료<br/>
                단국대 영화전공 & 서울예대 예술경영
              </p>
              <ul className="flex flex-wrap gap-2 mt-4">
                <li className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300">Pro Tools</li>
                <li className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300">Premiere</li>
                <li className="px-2.5 py-1 bg-gray-900 border border-gray-700 rounded-md text-xs text-gray-300">PowerPoint</li>
              </ul>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
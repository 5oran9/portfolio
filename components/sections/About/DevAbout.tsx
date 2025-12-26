// components/sections/About/DevAbout.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DevAbout() {
  const subText = 'text-gray-400';
  const pointColor = 'text-indigo-500';
  const pointColor2 = 'text-purple-500';
  const badgeStyle = 'border-indigo-500/50 text-indigo-400 bg-indigo-500/10';
  const skillBadge = 'bg-gray-900 border-gray-700 text-gray-300';

  // 카드/섹션 공통
  const unfoldWrap = {
    hidden: { opacity: 0, y: 26, filter: 'blur(18px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  } as const;

  // 위→아래 펼침
  const unfoldMask = {
    hidden: { scaleY: 0.0 },
    show: { scaleY: 1.0, transition: { duration: 1.05, ease: 'easeOut' } },
  } as const;

  // 내부 요소 좌르륵
  const cascadeParent = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.085,
        delayChildren: 0.1,
      },
    },
  } as const;

  const cascadeItem = {
    hidden: { opacity: 0, y: 14, filter: 'blur(12px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.78, ease: 'easeOut' } },
  } as const;

  const fromLine = {
    hidden: { opacity: 0, x: -80, filter: 'blur(14px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.85, ease: 'easeOut' } },
  } as const;

  const toLine = {
    hidden: { opacity: 0, x: 80, filter: 'blur(14px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut', delay: 0.08 } },
  } as const;

  const fastViewport = {
    once: false,
    amount: 0.15,
    margin: '-10% 0px -10% 0px',
  } as const;

  return (
    <motion.section
      className="min-h-screen flex flex-col justify-center px-8 lg:px-20 py-24 text-white bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeInOut' } }}
    >
      {/* HERO SECTION */}
      <motion.div
        variants={unfoldWrap}
        initial="hidden"
        whileInView="show"
        animate="show" // 첫 로드 시 강제 실행 추가
        viewport={fastViewport}
        className="mb-24 max-w-7xl mx-auto w-full"
      >
        <motion.div variants={unfoldMask} initial="hidden" animate="show" whileInView="show" style={{ transformOrigin: 'top' }} className="overflow-hidden">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-28">
            <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-full overflow-hidden border-4 border-gray-800/50 shadow-2xl group">
              <Image
                src="/profile.jpg"
                alt="Profile"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 transform scale-105 group-hover:scale-110"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay bg-indigo-500/10" />
            </div>

            <motion.div variants={cascadeParent} initial="hidden" animate="show" whileInView="show" className="max-w-2xl text-center lg:text-left">
              <motion.span
                variants={cascadeItem}
                className={`px-4 py-1.5 rounded-full border text-sm font-medium backdrop-blur-sm inline-block mb-6 ${badgeStyle}`}
              >
                WHO AM I?
              </motion.span>

              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                <motion.span variants={fromLine} className="inline-block">
                  From <span className={pointColor}>Sound Waves</span>
                </motion.span>
                <br />
                <motion.span variants={toLine} className="inline-block">
                  To <span className={pointColor2}>Code Logic</span>
                </motion.span>
              </h2>

              <motion.p variants={cascadeItem} className={`text-lg md:text-xl leading-relaxed whitespace-pre-line break-keep ${subText}`}>
                안녕하세요! 인터랙티브 개발자 김소랑입니다.{'\n\n'}
                영화 사운드를 디자인하며 보이지 않는 공기의 흐름을 다루던 감각으로, 이제는 데이터의 흐름을 지휘하여 사용자에게 닿는 서비스를 만듭니다.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* 2컬럼 이력 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto w-full">
        {/* Engineering */}
        <motion.div
          variants={unfoldWrap}
          initial="hidden"
          whileInView="show"
          viewport={fastViewport}
          className="overflow-hidden"
        >
          <motion.div variants={unfoldMask} initial="hidden" whileInView="show" style={{ transformOrigin: 'top' }} className="overflow-hidden">
            <motion.div variants={cascadeParent} initial="hidden" whileInView="show">
              <motion.h3 variants={cascadeItem} className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                Engineering Journey
              </motion.h3>

              <div className="space-y-10 border-l-2 border-gray-800 pl-8 ml-1 relative">
                <div className="relative">
                  <span className="absolute -left-[39px] top-1.5 w-5 h-5 border-2 border-purple-500 rounded-full bg-[#0a0a0a]" />

                  <motion.span variants={cascadeItem} className="text-sm font-semibold block mb-1 tracking-wide text-purple-400">
                    2025 (Latest)
                  </motion.span>

                  <motion.h4 variants={cascadeItem} className="text-xl font-bold mb-2">
                    AI Engineer & Full Stack
                  </motion.h4>

                  <motion.p variants={cascadeItem} className={`text-sm leading-snug ${subText}`}>
                    멋쟁이사자처럼 AI 엔지니어 심화 (NLP)
                    <br />
                    AI 웹서비스 풀스택 개발자 과정 (Deep Learning)
                  </motion.p>

                  <motion.div variants={cascadeItem} className="flex flex-wrap gap-2 mt-4">
                    {['NLP', 'React', 'Python'].map((tech) => (
                      <span key={tech} className={`px-2.5 py-1 border rounded-md text-xs ${skillBadge}`}>
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Creative */}
        <motion.div
          variants={unfoldWrap}
          initial="hidden"
          whileInView="show"
          viewport={fastViewport}
          className="overflow-hidden"
        >
          <motion.div variants={unfoldMask} initial="hidden" whileInView="show" style={{ transformOrigin: 'top' }} className="overflow-hidden">
            <motion.div variants={cascadeParent} initial="hidden" whileInView="show">
              <motion.h3 variants={cascadeItem} className="text-2xl font-bold mb-8 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                Creative Base
              </motion.h3>

              <div className="space-y-10 border-l-2 border-gray-800 pl-8 ml-1 relative">
                <div className="relative">
                  <span className="absolute -left-[39px] top-1.5 w-5 h-5 border-2 border-indigo-500 rounded-full bg-[#0a0a0a]" />

                  <motion.span variants={cascadeItem} className={`text-sm font-semibold block mb-1 tracking-wide ${subText}`}>
                    2016 - 2022
                  </motion.span>

                  <motion.h4 variants={cascadeItem} className="text-xl font-bold mb-2">
                    Sound & Film & Art Management
                  </motion.h4>

                  <motion.p variants={cascadeItem} className={`text-sm leading-snug ${subText}`}>
                    KAFA 사운드 디자인 과정 수료
                    <br />
                    단국대 영화전공 & 서울예대 예술경영
                  </motion.p>

                  <motion.div variants={cascadeItem} className="flex flex-wrap gap-2 mt-4">
                    {['Pro Tools', 'Premiere', 'PowerPoint'].map((tech) => (
                      <span key={tech} className={`px-2.5 py-1 border rounded-md text-xs ${skillBadge}`}>
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// components/sections/About/FilmAbout.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

function Pill({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm bg-white/70 backdrop-blur ${className}`}>
      {children}
    </span>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      {children}
    </div>
  );
}

export default function FilmAbout() {
  const credits = [
    { year: '2024', title: 'Disney+ <나인퍼즐>', role: 'B 녹음팀' },
    { year: '2023', title: 'Netflix <애마>', role: '녹음팀' },
    { year: '2023', title: '<살인자 리포트>', role: '녹음팀' },
  ];

  const education = [
    { year: '2022', school: '한국영화아카데미 KAFA 기술과정 3기', major: 'Sound Design 전공 수료' },
    { year: '2022', school: '단국대학교', major: '영화전공 졸업' },
    { year: '2019', school: '서울예술대학교', major: '예술경영 (영상콘텐츠기획) 졸업' },
  ];

  // 위/아래 스크롤 viewport
  const fastViewport = {
    once: false,
    amount: 0.18,
    margin: '-12% 0px -12% 0px',
  } as const;

  // 전체 덩어리: blur -> clear + y
  const fadeUpBlur = {
    hidden: { opacity: 0, y: 22, filter: 'blur(14px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' } },
  } as const;

  // 위→아래 펼침 마스크
  const unfoldMask = {
    hidden: { scaleY: 0.0 },
    show: { scaleY: 1.0, transition: { duration: 1.05, ease: 'easeOut' } },
  } as const;

  // 내부 요소 좌르륵
  const cascadeParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: 'easeOut' } },
  } as const;

  const chipParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.10 } },
  } as const;

  const chip = {
    hidden: { opacity: 0, y: 10, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
  } as const;

  const rowParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
  } as const;

  const row = {
    hidden: { opacity: 0, y: 12, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: 'easeOut' } },
  } as const;

  // 배경 이미지: 살짝 늦게 스르륵
  const bgImg = {
    hidden: { opacity: 0, x: 24, filter: 'blur(10px)' },
    show: { opacity: 0.44, x: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: 'easeOut' } },
  } as const;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.18, ease: 'easeInOut' } }}
      className="relative min-h-screen w-full overflow-hidden bg-[#f5f5f5] text-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          variants={bgImg}
          initial="hidden"
          whileInView="show"
          viewport={fastViewport}
          className="absolute top-0"
          style={{
            right: 'clamp(12px, 4vw, 90px)',
            width: 'clamp(520px, 55vw, 940px)',
            height: 'clamp(520px, 55vw, 940px)',
          }}
        >
          <Image
            src="/profile.jpg"
            alt="Profile Background"
            fill
            priority
            className="object-contain"
            style={{
              objectPosition: 'right 6%',
              filter: 'contrast(1.08)',
            }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f5f5] via-[#f5f5f5]/80 to-[#f5f5f5]/0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5f5f5]" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        variants={fadeUpBlur}
        initial="hidden"
        whileInView="show"
        viewport={fastViewport}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-16 top-16 w-[400px] h-[400px] rounded-full bg-orange-400/8 blur-[100px]" />
      </motion.div>

      {/* 컨텐츠 전체를 살짝 아래로 내려 무게중심 중앙 */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 lg:px-20 pt-24 pb-24 translate-y-8">
        {/* Hero Section */}
        <motion.div
          variants={fadeUpBlur}
          initial="hidden"
          whileInView="show"
          viewport={fastViewport}
          className="max-w-4xl overflow-hidden"
        >
          {/* 위→아래 펼침 */}
          <motion.div variants={unfoldMask} style={{ transformOrigin: 'top' }} className="overflow-hidden">
            <motion.div variants={cascadeParent} initial="hidden" animate="show">
              <motion.div variants={item}>
                <Pill className="border-black/10 text-gray-800">
                  <span className="text-orange-600 font-semibold">SOUND</span>&nbsp;DESIGNER
                </Pill>
              </motion.div>

              <motion.h2 variants={item} className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                Sound, Atmosphere, and <span className="text-orange-600">Emotional Rhythm</span>
              </motion.h2>

              <motion.p variants={item} className="mt-8 text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-line break-keep">
                안녕하세요! 사운드 디자이너 김소랑입니다.{'\n\n'}
                화면 속 감정이 관객에게 "제대로 닿는 순간"을 만들기 위해
                <br />
                <span className="text-orange-700 font-semibold"> 동시녹음부터 후반 작업</span>까지 놓치지 않습니다.
              </motion.p>

              {/* Chips stagger */}
              <motion.ul variants={chipParent} className="mt-8 flex flex-wrap gap-2">
                {['Pro Tools', '5.1 Mixing', 'Recording', 'Dialogue', 'ADR', 'SFX', 'Ambience'].map((t) => (
                  <motion.li
                    key={t}
                    variants={chip}
                    className="px-3 py-1 rounded-md border border-black/10 bg-white/80 text-sm text-gray-800"
                  >
                    {t}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Education & Credits Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-5 gap-10 max-w-6xl">
          {/* Education */}
          <motion.div
            variants={fadeUpBlur}
            initial="hidden"
            whileInView="show"
            viewport={fastViewport}
            className="md:col-span-3 overflow-hidden"
          >
            <motion.div variants={unfoldMask} style={{ transformOrigin: 'top' }} className="overflow-hidden">
              <motion.div variants={cascadeParent} initial="hidden" animate="show">
                <motion.div variants={item} className="text-sm font-semibold text-orange-700 mb-3">
                  Education
                </motion.div>

                <motion.div variants={item}>
                  <Card>
                    <motion.ul variants={rowParent} className="space-y-3">
                      {education.map((edu, idx) => (
                        <motion.li key={idx} variants={row} className="text-sm text-gray-800">
                          <span className="font-semibold text-orange-600">{edu.year}</span>{' '}
                          <span className="text-gray-900">{edu.school}</span>{' '}
                          <span className="font-semibold text-gray-900">{edu.major}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Credits */}
          <motion.div
            variants={fadeUpBlur}
            initial="hidden"
            whileInView="show"
            viewport={fastViewport}
            className="md:col-span-2 overflow-hidden"
          >
            <motion.div variants={unfoldMask} style={{ transformOrigin: 'top' }} className="overflow-hidden">
              <motion.div variants={cascadeParent} initial="hidden" animate="show">
                <motion.div variants={item} className="text-sm font-semibold text-orange-700 mb-3">
                  Credits
                </motion.div>

                <motion.div variants={item}>
                  <Card>
                    <motion.ul variants={rowParent} className="space-y-3">
                      {credits.map((c, idx) => (
                        <motion.li key={idx} variants={row} className="text-sm text-gray-800">
                          <span className="font-semibold text-orange-600">{c.year}</span>{' '}
                          <span className="font-semibold text-gray-900">{c.title}</span>{' '}
                          <span className="text-gray-700">{c.role}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

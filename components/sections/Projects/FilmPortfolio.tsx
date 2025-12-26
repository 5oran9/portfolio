// components/sections/Projects/FilmPortfolio.tsx

'use client';

import { motion } from 'framer-motion';
import { filmography } from './film_data';

export default function FilmPortfolio() {
  const videoId = 'JEsGlvRoNcE';

  const viewport = {
    once: false,
    amount: 0.18,
    margin: '-12% 0px -12% 0px',
  } as const;

  // 기본: 흐릿 -> 선명 + 살짝 업
  const fadeUpBlur = {
    hidden: { opacity: 0, y: 20, filter: 'blur(14px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: 'easeOut' } },
  } as const;

  // 위→아래 펼침(마스크)
  const unfold = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: 1.05, ease: 'easeOut' } },
  } as const;

  // 컨테이너 stagger
  const stagger = (delay = 0.08, step = 0.08) =>
    ({
      hidden: {},
      show: { transition: { delayChildren: delay, staggerChildren: step } },
    } as const);

  const item = {
    hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: 'easeOut' } },
  } as const;

  const year = {
    hidden: { opacity: 0, x: -10, filter: 'blur(10px)' },
    show: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: 'easeOut' } },
  } as const;

  const videoCard = {
    hidden: { opacity: 0, y: 26, scale: 0.985, filter: 'blur(16px)' },
    show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 1.05, ease: 'easeOut' } },
  } as const;

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: 'easeInOut' } }}
      className="w-full min-h-screen flex items-center justify-center bg-white px-8 md:px-16 select-none py-20"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* [상단 고정] 타이틀 영역 */}
        <motion.div
          variants={fadeUpBlur}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="space-y-3 border-b border-gray-100 pb-8 overflow-hidden"
        >
          {/* 타이틀: 위→아래 펼침 */}
          <motion.div variants={unfold} style={{ transformOrigin: 'top' }} className="overflow-hidden">
            <motion.h2 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Works
            </motion.h2>
          </motion.div>

          <motion.p
            variants={item}
            className="text-base md:text-lg text-orange-600 font-extrabold tracking-widest uppercase"
          >
            Film Sound Portfolio
          </motion.p>
        </motion.div>

        {/* [하단 콘텐츠] 좌측 영상 / 우측 리스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-16 items-start">
          {/* [좌측] Featured Reel 영상 */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <motion.div
              variants={videoCard}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)] bg-black"
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Film Portfolio Reel"
                allowFullScreen
              />
            </motion.div>

            <motion.div
              variants={fadeUpBlur}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="space-y-3 text-left"
            >
              <p className="text-[15px] md:text-[16px] text-gray-500 font-medium leading-relaxed max-w-xl whitespace-normal break-words">
                영화 작업에서 동시녹음·사운드 편집·폴리·앰비언스·5.1 믹싱까지 후반 사운드 전 과정을
                다룹니다. 작품의 리듬과 감정선을 해치지 않도록, 대사 명료도와 공간감을 기준으로
                사운드를 설계했습니다.
              </p>
            </motion.div>
          </div>

          {/* [우측] Filmography 리스트 */}
          <div className="w-full lg:mt-[-150px]">
            <motion.div
              variants={fadeUpBlur}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="flex items-center gap-3 mb-8"
            >
              <span className="text-[12px] font-black tracking-[0.4em] text-gray-900 uppercase whitespace-nowrap">
                Filmography
              </span>
              <div className="h-[1px] flex-1 bg-gray-100" />
            </motion.div>

            {/* 그룹: 한 덩어리씩 촤르륵 */}
            <div className="space-y-10">
              {filmography.map((group, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUpBlur}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  className="grid grid-cols-[65px_1fr] gap-4 overflow-hidden"
                >
                  <motion.div variants={year} className="text-3xl font-black text-gray-200 tabular-nums shrink-0">
                    {group.year}
                  </motion.div>

                  {/* 오른쪽: 위→아래 펼치고, 안쪽은 stagger */}
                  <motion.div variants={unfold} style={{ transformOrigin: 'top' }} className="overflow-hidden">
                    <motion.div variants={stagger(0.06, 0.07)} initial="hidden" whileInView="show" viewport={viewport}>
                      <div className="space-y-4 border-l-2 border-gray-50 pl-6">
                        {group.works.map((work, wIdx) => (
                          <motion.div key={wIdx} variants={item} className="space-y-1">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                              <h4 className="text-[18px] md:text-[19px] font-bold text-gray-800 leading-tight whitespace-pre-line">
                                {work.title}
                              </h4>
                            </div>

                            <p className="text-[12px] md:text-[13px] text-gray-400 font-semibold italic pl-4 leading-snug whitespace-pre-line">
                              {work.info}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

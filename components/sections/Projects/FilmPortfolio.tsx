// components/sections/Projects/FilmPortfolio.tsx

'use client';

import { motion } from 'framer-motion';
import { filmography } from './film_data';

export default function FilmPortfolio() {
  const videoId = 'JEsGlvRoNcE';

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen flex items-center justify-center bg-white px-8 md:px-16 select-none py-20"
    >
      <div className="max-w-7xl w-full flex flex-col gap-16">
        {/* [상단 고정] 타이틀 영역 */}
        <div className="space-y-3 border-b border-gray-100 pb-8">
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 tracking-tighter uppercase leading-none">
            Works
          </h2>
          <p className="text-base md:text-lg text-orange-600 font-extrabold tracking-widest uppercase">
            Film Sound Portfolio
          </p>
        </div>

        {/* [하단 콘텐츠] 좌측 영상 / 우측 리스트 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-16 items-start">
          {/* [좌측] Featured Reel 영상 */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.18)] bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Film Portfolio Reel"
                allowFullScreen
              />
            </div>

            <div className="space-y-3 text-left">
              <p className="text-[15px] md:text-[16px] text-gray-500 font-medium leading-relaxed max-w-xl whitespace-normal break-words">
                영화 작업에서 동시녹음·사운드 편집·폴리·앰비언스·5.1 믹싱까지 후반 사운드 전 과정을
                다룹니다. 작품의 리듬과 감정선을 해치지 않도록, 대사 명료도와 공간감을 기준으로
                사운드를 설계했습니다.
              </p>
              {/* 아래 Sound Design / Directing / Mixing 라벨 제거 */}
            </div>
          </div>

          {/* [우측] Filmography 리스트 */}
          <div className="w-full lg:mt-[-150px]">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[12px] font-black tracking-[0.4em] text-gray-900 uppercase whitespace-nowrap">
                Filmography
              </span>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>

            <div className="space-y-10">
              {filmography.map((group, idx) => (
                <div key={idx} className="grid grid-cols-[65px_1fr] gap-4">
                  <div className="text-3xl font-black text-gray-200 tabular-nums shrink-0">{group.year}</div>

                  <div className="space-y-4 border-l-2 border-gray-50 pl-6">
                    {group.works.map((work, wIdx) => (
                      <div key={wIdx} className="space-y-1">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2"></div>
                          <h4 className="text-[18px] md:text-[19px] font-bold text-gray-800 leading-tight whitespace-pre-line">
                            {work.title}
                          </h4>
                        </div>

                        <p className="text-[12px] md:text-[13px] text-gray-400 font-semibold italic pl-4 leading-snug whitespace-pre-line">
                          {work.info}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

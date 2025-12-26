// components/sections/Projects/ProjectCarousel.tsx

'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { projects } from './dev_data';
import { VisibleProject, Project } from './types';
import ProjectDetail from './ProjectDetail';

const ProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 📐 레이아웃 설정
  const CARD_WIDTH = 380;
  const CARD_HEIGHT = 580;
  const GAP = 450;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // 상세 페이지 이동 시 배경 캐러셀 위치 동기화
  const handlePrevDetail = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;

    setSelectedProject(projects[prevIndex]);
    setActiveIndex(prevIndex);
  };

  const handleNextDetail = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;

    setSelectedProject(projects[nextIndex]);
    setActiveIndex(nextIndex);
  };

  const getVisibleItems = (): VisibleProject[] => {
    const items: VisibleProject[] = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + projects.length) % projects.length;
      items.push({ ...projects[index], position: i });
    }
    return items;
  };

  const visibleProjects = getVisibleItems();

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center py-20 overflow-hidden relative select-none">

      {/* 상세 모달 */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={handlePrevDetail}
          onNext={handleNextDetail}
        />
      )}

      {/* 메인 컨텐츠 (상세 모달 오픈 시 블러) */}
      <div className={`w-full flex flex-col items-center transition-all duration-500 mt-10 ${selectedProject ? 'blur-md scale-95 opacity-40 pointer-events-none' : ''}`}>

        {/* 타이틀 영역 */}
        <div className="text-center mb-10 z-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-indigo-500">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg">
            서비스 구현부터 AI 코어 기술 연구까지
          </p>
        </div>

        {/* 캐러셀 영역 */}
        <div className="relative w-full h-[600px] flex items-center justify-center">

          {/* 왼쪽 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-[5%] md:left-[10%] z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
          >
            <ChevronLeft size={32} />
          </button>

          {/* 카드 컨테이너 */}
          <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
            {visibleProjects.map((item) => {
              const absPosition = Math.abs(item.position);

              let xOffset = 0;
              if (item.position === 0) xOffset = 0;
              else if (item.position === 1) xOffset = GAP;
              else if (item.position === -1) xOffset = -GAP;
              else if (item.position === 2) xOffset = GAP + 430;
              else if (item.position === -2) xOffset = -(GAP + 430);

              let scale = 1;
              let cardStyle = '';

              if (absPosition === 0) {
                scale = 1;
                cardStyle = 'z-30 opacity-100 brightness-100 shadow-[0_0_80px_rgba(0,0,0,0.9)] ring-2 ring-blue-500/50 cursor-pointer';
              } else if (absPosition === 1) {
                scale = 0.95;
                cardStyle = 'z-20 opacity-100 brightness-75 hover:brightness-100 cursor-pointer shadow-xl';
              } else {
                scale = 0.90;
                cardStyle = 'z-10 opacity-100 brightness-50 pointer-events-none';
              }

              return (
                <div
                  key={`${item.id}-${item.position}`}
                  onClick={() => {
                    if (absPosition === 0) {
                      if (!isAnimating) setSelectedProject(item);
                    } else if (absPosition === 1 && !isAnimating) {
                      item.position > 0 ? nextSlide() : prevSlide();
                    }
                  }}
                  className={`
                    absolute flex flex-col
                    rounded-3xl overflow-hidden border border-gray-800 bg-[#111]
                    transition-all duration-700 cubic-bezier(0.25, 0.8, 0.25, 1)
                    ${cardStyle}
                  `}
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translateX(${xOffset}px) scale(${scale})`,
                  }}
                >
                  {/* --- Card Header --- */}
                  <div className={`relative h-[45%] ${item.color} flex items-center justify-center overflow-hidden px-6 text-center`}>
                    <span className="absolute text-[12rem] font-black text-white opacity-10 select-none transform translate-y-8 scale-110 pointer-events-none">
                      {item.abbr}
                    </span>
                    <div className="absolute top-5 right-5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-white/20 text-white shadow-lg">
                      {item.badge}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white z-10 drop-shadow-lg leading-tight break-keep whitespace-pre-line">
                      {item.title}
                    </h2>
                  </div>

                  {/* --- Card Body --- */}
                  <div className="h-[55%] p-8 flex flex-col justify-between bg-[#151515]">
                    <div>
                      <p className="text-blue-400 text-lg font-bold mb-4 leading-snug">
                        {item.subtitle}
                      </p>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-6 whitespace-pre-line">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-gray-800/80 rounded-md text-[11px] font-medium text-gray-300 border border-gray-700/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      className={`w-full mt-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                      ${absPosition === 0
                          ? 'bg-white text-black hover:bg-gray-200 shadow-lg'
                          : 'border border-gray-700 text-gray-600 bg-transparent pointer-events-none'
                        }`}
                    >
                      <FileText size={18} />
                      <span className="text-sm">View Detail</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 오른쪽 버튼 */}
          <button
            onClick={nextSlide}
            className="absolute right-[5%] md:right-[10%] z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
          >
            <ChevronRight size={32} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
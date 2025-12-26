// components/sections/Projects/ProjectCarousel.tsx

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { projects } from './dev_data';
import { VisibleProject, Project } from './types';
import ProjectDetail from './ProjectDetail';

const ProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 모바일 감지
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 카드 크기/간격 (모바일 최적화)
  const CARD_WIDTH = useMemo(() => {
    if (!isMobile) return 380;
    const w = typeof window !== 'undefined' ? window.innerWidth : 360;
    return Math.min(340, w - 48);
  }, [isMobile]);

  const CARD_HEIGHT = useMemo(() => (isMobile ? 520 : 580), [isMobile]);

  const GAP = useMemo(() => (isMobile ? Math.floor(CARD_WIDTH * 0.85) : 450), [isMobile, CARD_WIDTH]);

  const lockAnim = (ms = 600) => {
    setIsAnimating(true);
    window.setTimeout(() => setIsAnimating(false), ms);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    lockAnim(600);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    lockAnim(600);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // id 타입을 Project에서 그대로 가져와서 number/string 충돌 제거
  const goToProject = (projectId: Project['id']) => {
    if (isAnimating) return;
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx < 0 || idx === activeIndex) return;
    lockAnim(600);
    setActiveIndex(idx);
  };

  // 상세 모달 내 prev/next
  const handlePrevDetail = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
    setActiveIndex(prevIndex);
  };

  const handleNextDetail = () => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id);
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

  // -----------------------------
  // Swipe (모바일 전용 UX)
  // -----------------------------
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 45; // px
  const VERTICAL_GUARD = 18;  // 세로 스크롤로 판단되면 무시

  const onTouchStart = (e: React.TouchEvent) => {
    if (selectedProject) return;
    startXRef.current = e.touches[0].clientX;
    startYRef.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (selectedProject) return;
    if (startXRef.current === null || startYRef.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - startXRef.current;
    const dy = endY - startYRef.current;

    startXRef.current = null;
    startYRef.current = null;

    // 세로 스크롤이 더 크면 swipe로 처리하지 않음
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > VERTICAL_GUARD) return;

    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (dx < 0) nextSlide();
    else prevSlide();
  };

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
      <div
        className={`w-full flex flex-col items-center transition-all duration-500 mt-10 ${
          selectedProject ? 'blur-md scale-95 opacity-40 pointer-events-none' : ''
        }`}
      >
        {/* 타이틀 */}
        <div className="text-center mb-10 z-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-indigo-500">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg">서비스 구현부터 AI 코어 기술 연구까지</p>
        </div>

        {/* 캐러셀 */}
        <div
          className="relative w-full h-[600px] flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* 데스크탑만 화살표 표시 */}
          {!isMobile && (
            <button
              onClick={prevSlide}
              className="absolute left-[10%] top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
              aria-label="Previous"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
            {visibleProjects.map((item) => {
              const absPosition = Math.abs(item.position);

              let xOffset = 0;
              if (item.position === 0) xOffset = 0;
              else if (item.position === 1) xOffset = GAP;
              else if (item.position === -1) xOffset = -GAP;
              else if (item.position === 2) xOffset = GAP + (isMobile ? 220 : 430);
              else if (item.position === -2) xOffset = -(GAP + (isMobile ? 220 : 430));

              let scale = 1;
              let cardStyle = '';

              if (absPosition === 0) {
                scale = 1;
                cardStyle =
                  'z-30 opacity-100 brightness-100 shadow-[0_0_80px_rgba(0,0,0,0.9)] ring-2 ring-blue-500/50 cursor-pointer';
              } else if (absPosition === 1) {
                scale = 0.95;
                cardStyle = 'z-20 opacity-100 brightness-75 hover:brightness-100 cursor-pointer shadow-xl';
              } else {
                // 모바일/웹 모두: 잘린 카드도 클릭 가능하게 둠
                scale = 0.9;
                cardStyle = 'z-10 opacity-100 brightness-50 cursor-pointer';
              }

              return (
                <div
                  key={`${item.id}-${item.position}`}
                  onClick={() => {
                    if (isAnimating) return;

                    if (absPosition === 0) {
                      setSelectedProject(item);
                      return;
                    }

                    // 잘린 카드 클릭 → 바로 그 카드로 이동
                    goToProject(item.id);
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
                  {/* Header */}
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

                  {/* Body */}
                  <div className="h-[55%] p-8 flex flex-col justify-between bg-[#151515]">
                    <div>
                      <p className="text-blue-400 text-lg font-bold mb-4 leading-snug">{item.subtitle}</p>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-6 whitespace-pre-line">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-gray-800/80 rounded-md text-[11px] font-medium text-gray-300 border border-gray-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (absPosition === 0) setSelectedProject(item);
                        else goToProject(item.id);
                      }}
                      className={`w-full mt-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300
                      ${
                        absPosition === 0
                          ? 'bg-white text-black hover:bg-gray-200 shadow-lg'
                          : 'border border-gray-700 text-gray-300 bg-transparent hover:bg-white/10'
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

          {/* 데스크탑만 화살표 표시 */}
          {!isMobile && (
            <button
              onClick={nextSlide}
              className="absolute right-[10%] top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
              aria-label="Next"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* 모바일 스와이프 전용 인디케이터 (Dots) */}
          {isMobile && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
              {projects.map((p, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={String(p.id)}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => goToProject(p.id)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'w-8 bg-white/90' : 'w-2 bg-white/30'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;

// components/sections/Projects/ProjectCarousel.tsx

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from './dev_data';
import { VisibleProject, Project } from './types';
import ProjectDetail from './ProjectDetail';
import ProjectCard from './ProjectCards';

const ProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Animation & Viewport
  const fastViewport = { once: false, amount: 0.15, margin: '-10% 0px' } as const;
  const fadeUpBlur = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  } as const;
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };

  // Responsive & Sizes
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const CARD_WIDTH = useMemo(() => {
    if (!isMobile) return 380;
    const w = typeof window !== 'undefined' ? window.innerWidth : 360;
    return Math.min(340, w - 48);
  }, [isMobile]);
  const CARD_HEIGHT = useMemo(() => (isMobile ? 520 : 580), [isMobile]);
  const GAP = useMemo(() => (isMobile ? Math.floor(CARD_WIDTH * 0.85) : 450), [isMobile, CARD_WIDTH]);
  const ANIM_MS = 820;

  // Carousel Logic
  const lockAnim = (ms = ANIM_MS) => {
    setIsAnimating(true);
    window.setTimeout(() => setIsAnimating(false), ms);
  };

  const nextSlide = () => {
    if (isAnimating || selectedProject) return;
    lockAnim();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    if (isAnimating || selectedProject) return;
    lockAnim();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (projectId: Project['id']) => {
    if (isAnimating || selectedProject) return;
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx >= 0 && idx !== activeIndex) { lockAnim(); setActiveIndex(idx); }
  };

  // Autoplay
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);
  useEffect(() => {
    autoplayRef.current = window.setInterval(() => {
      if (!isPaused && !selectedProject && !isAnimating) {
        lockAnim();
        setActiveIndex((prev) => (prev + 1) % projects.length);
      }
    }, 3200);
    return () => { if (autoplayRef.current) window.clearInterval(autoplayRef.current); };
  }, [isPaused, selectedProject, isAnimating]);

  const visibleProjects = useMemo((): VisibleProject[] => {
    const items: VisibleProject[] = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + projects.length) % projects.length;
      items.push({ ...projects[index], position: i });
    }
    return items;
  }, [activeIndex]);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center py-20 overflow-hidden relative select-none">
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onPrev={() => {
            const idx = projects.findIndex(p => p.id === selectedProject.id);
            const prev = (idx - 1 + projects.length) % projects.length;
            setSelectedProject(projects[prev]);
            setActiveIndex(prev);
          }}
          onNext={() => {
            const idx = projects.findIndex(p => p.id === selectedProject.id);
            const next = (idx + 1) % projects.length;
            setSelectedProject(projects[next]);
            setActiveIndex(next);
          }}
        />
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={fastViewport}
        className={`w-full flex flex-col items-center transition-all duration-500 mt-10 ${
          selectedProject ? 'blur-md scale-95 opacity-40 pointer-events-none' : ''
        }`}
      >
        <motion.div variants={fadeUpBlur} className="text-center mb-10 z-20 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-indigo-500">Projects</span>
          </h1>
          <p className="text-gray-400 text-lg">서비스 구현부터 AI 코어 기술 연구까지</p>
        </motion.div>

        <motion.div
          variants={fadeUpBlur}
          className="relative w-full h-[600px] flex items-center justify-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {!isMobile && (
            <button onClick={prevSlide} className="absolute left-[10%] top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:scale-110">
              <ChevronLeft size={32} />
            </button>
          )}

          <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
            {visibleProjects.map((item) => {
              const absPos = Math.abs(item.position);
              let xOffset = 0;
              if (item.position === 1) xOffset = GAP;
              else if (item.position === -1) xOffset = -GAP;
              else if (item.position === 2) xOffset = GAP + (isMobile ? 220 : 430);
              else if (item.position === -2) xOffset = -(GAP + (isMobile ? 220 : 430));

              let scale = absPos === 0 ? 1 : absPos === 1 ? 0.95 : 0.9;
              let extraClasses = absPos === 0 
                ? 'z-30 opacity-100 ring-2 ring-blue-500/50 shadow-2xl' 
                : absPos === 1 ? 'z-20 opacity-100 brightness-75 hover:brightness-100' : 'z-10 opacity-100 brightness-50';

              return (
                <ProjectCard
                  key={String(item.id)}
                  item={item}
                  isCenter={absPos === 0}
                  isAnimating={isAnimating}
                  cardWidth={CARD_WIDTH}
                  cardHeight={CARD_HEIGHT}
                  xOffset={xOffset}
                  scale={scale}
                  extraClasses={extraClasses}
                  animMs={ANIM_MS}
                  onClick={() => absPos === 0 ? setSelectedProject(item) : goToProject(item.id)}
                  onViewDetail={(p) => absPos === 0 ? setSelectedProject(p) : goToProject(p.id)}
                />
              );
            })}
          </div>

          {!isMobile && (
            <button onClick={nextSlide} className="absolute right-[10%] top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black hover:scale-110">
              <ChevronRight size={32} />
            </button>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectCarousel;
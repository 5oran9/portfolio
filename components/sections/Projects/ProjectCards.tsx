// components/sections/Projects/ProjectCards.tsx

'use client';

import React from 'react';
import { FileText } from 'lucide-react';
import { Project, VisibleProject } from './types';

interface ProjectCardProps {
  item: VisibleProject;
  isCenter: boolean;
  isAnimating: boolean;
  cardWidth: number;
  cardHeight: number;
  xOffset: number;
  scale: number;
  extraClasses: string;
  animMs: number;
  onClick: () => void;
  onViewDetail: (item: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  item,
  isCenter,
  isAnimating,
  cardWidth,
  cardHeight,
  xOffset,
  scale,
  extraClasses,
  animMs,
  onClick,
  onViewDetail,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group absolute flex flex-col rounded-3xl overflow-hidden border border-gray-800 bg-[#111] cursor-pointer ${extraClasses}`}
      style={{
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        left: '50%',
        top: '50%',
        transform: `translate3d(calc(-50% + ${xOffset}px), -50%, 0) scale(${scale})`,
        transitionProperty: 'transform, filter, opacity, box-shadow, border-color',
        transitionDuration: `${animMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {/* Header */}
      <div className={`relative h-[45%] ${item.color} flex items-center justify-center overflow-hidden px-6 text-center transition-all duration-500 group-hover:brightness-110`}>
        <span className="absolute text-[12rem] font-black text-white opacity-10 select-none transform translate-y-8 scale-110 pointer-events-none transition-transform duration-700 group-hover:scale-[1.15] group-hover:rotate-3">
          {item.abbr}
        </span>
        <div className="absolute top-5 right-5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-white/20 text-white shadow-lg transition-all duration-300 group-hover:bg-black/35 group-hover:scale-105 group-hover:border-white/30">
          {item.badge}
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white z-10 drop-shadow-lg leading-tight break-keep whitespace-pre-line transition-transform duration-500 group-hover:scale-[1.05]">
          {item.title}
        </h2>
      </div>

      {/* Body */}
      <div className="h-[55%] p-8 flex flex-col justify-between bg-[#151515] transition-colors duration-500 group-hover:bg-[#1a1a1a]">
        <div>
          <p className="text-blue-400 text-lg font-bold mb-4 leading-snug transition-all duration-300 group-hover:text-blue-300 group-hover:translate-x-1">
            {item.subtitle}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-6 whitespace-pre-line transition-all duration-300 group-hover:text-gray-300">
            {item.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 bg-gray-800/80 rounded-md text-[11px] font-medium text-gray-300 border border-gray-700/50 transition-all duration-300 group-hover:bg-gray-700/90 group-hover:border-gray-600/70 group-hover:translate-y-[-2px] group-hover:shadow-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewDetail(item);
          }}
          className={`w-full mt-4 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.99] ${
            isCenter ? 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] hover:translate-y-[-2px]' : 'border border-gray-700 text-gray-300 bg-transparent hover:bg-white/10 hover:border-gray-500 hover:translate-y-[-2px]'
          }`}
        >
          <FileText size={18} className="transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-sm">View Detail</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

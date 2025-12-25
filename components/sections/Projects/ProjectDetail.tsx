import React, { useState } from 'react';
import { X, Calendar, Users, Github, CheckCircle2, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'; 
import { Project } from './types';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose, onPrev, onNext }) => {
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 lg:p-10 animate-in fade-in duration-300">
        
        {/* 배경 클릭 시 닫기 */}
        <div className="absolute inset-0" onClick={onClose}></div>

        {/* ✨ [수정됨] 왼쪽 화살표: 화면 안쪽으로 배치 (left-6 ~ md:left-20) */}
        <button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 md:left-70 top-1/2 -translate-y-1/2 z-[200] p-3 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all backdrop-blur-md border border-white/10 hidden md:block"
        >
          <ChevronLeft size={40} />
        </button>

        {/* ✨ [수정됨] 오른쪽 화살표: 화면 안쪽으로 배치 (right-6 ~ md:right-20) */}
        <button 
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 md:right-70 top-1/2 -translate-y-1/2 z-[200] p-3 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all backdrop-blur-md border border-white/10 hidden md:block"
        >
          <ChevronRight size={40} />
        </button>

        <div className="bg-[#1a1a1a] w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-gray-800 relative z-10">
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            <X size={24} />
          </button>

          {/* Hero Section */}
          <div className={`relative h-64 ${project.color} flex flex-col justify-end p-8 lg:p-12 shrink-0`}>
            <span className="absolute top-[-20px] left-10 text-[12rem] font-black text-white opacity-5 select-none pointer-events-none">
              {project.abbr}
            </span>
            <div className="z-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded text-xs font-bold text-white border border-white/20">
                  {project.badge}
                </span>
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs text-white/70">#{tag}</span>
                ))}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-xl text-white/80 font-medium">{project.subtitle}</p>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-hide">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* --- [왼쪽 컬럼] --- */}
              <div className="lg:col-span-2 space-y-10">
                
                {/* 미디어 섹션 */}
                {project.hasVideo ? (
                  <div className="space-y-6">
                    {project.videoId && (
                      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${project.videoId}?rel=0`}
                          title="YouTube video player 1"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    {project.videoId2 && (
                      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${project.videoId2}?rel=0`}
                          title="YouTube video player 2"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                ) : (
                  project.imageUrl && (
                    <div 
                      className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-700/50 bg-[#222] flex items-center justify-center relative group cursor-zoom-in"
                      onClick={() => setIsImageOpen(true)}
                    >
                      <img 
                        src={project.imageUrl} 
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/20 text-white">
                          <Maximize2 size={24} />
                        </div>
                      </div>
                    </div>
                  )
                )}
                
                {/* Overview */}
                <section>
                  <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-blue-500 pl-4">Overview</h3>
                  <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {project.overview}
                  </p>
                </section>

                {/* Key Features */}
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-[#252525] p-4 rounded-xl">
                        <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* --- [오른쪽 컬럼] --- */}
              <div className="space-y-6">
                
                {/* Links */}
                <div className="space-y-3">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#333] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#444] transition-colors shadow-lg"
                    >
                      <Github size={20} />
                      View GitHub
                    </a>
                  )}

                  {project.githubUrl2 && (
                    <a 
                      href={project.githubUrl2} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#333] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#444] transition-colors shadow-lg"
                    >
                      <Github size={20} />
                      View AI GitHub
                    </a>
                  )}
                </div>

                {/* Project Meta */}
                <div className="bg-[#252525] p-6 rounded-2xl space-y-4 shadow-lg border border-gray-800">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="text-gray-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Period</p>
                      <p className="text-sm">{project.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Users className="text-gray-500" size={20} />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">Team Size</p>
                      <p className="text-sm">{project.team}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">My Role</p>
                    <p className="text-sm text-gray-200 leading-snug">{project.role}</p>
                  </div>
                </div>

                {/* Core Achievement */}
                {project.performance && (
                  <div className="bg-blue-900/20 border border-blue-500/30 p-5 rounded-xl">
                    <h3 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                      🏆 Core Achievement
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {project.performance}
                    </p>
                  </div>
                )}

                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 bg-gray-800 text-gray-300 text-xs font-medium rounded-lg border border-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isImageOpen && project.imageUrl && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
          onClick={() => setIsImageOpen(false)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <X size={40} />
          </button>
          <img 
            src={project.imageUrl} 
            alt={`${project.title} Fullscreen`} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ProjectDetail;
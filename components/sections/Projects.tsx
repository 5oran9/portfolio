'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from '../ui/SpotlightCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  // --- PAGE 1: Service & Product ---
  {
    id: 1,
    title: "SceneList Generator",
    subtitle: "대본 자동 분석 및 씬 리스트 추출 도구",
    desc: "드라마/영화 대본 파일을 업로드하면 AI가 씬 정보(장소, 시간, 등장인물)를 파싱하여 촬영 스케줄표(Call Sheet)용 엑셀 데이터로 변환해주는 자동화 툴입니다.",
    tags: ["Python", "NLP", "Automation"],
    color: "from-indigo-400 to-purple-400",
    status: "Beta"
  },
  {
    id: 2,
    title: "Castaway",
    subtitle: "멀티모달 감정 케어 AI 다이어리",
    desc: "사용자의 일기를 분석해 감정을 추출하고, 그 감정에 맞는 섬의 날씨와 BGM, 오브제를 생성하여 비언어적인 위로를 건네는 모바일 힐링 서비스입니다.",
    tags: ["React Native", "FastAPI", "Multimodal"],
    color: "from-blue-400 to-cyan-300",
    status: null
  },
  {
    id: 3,
    title: "집PT (Zip PT)",
    subtitle: "데이터 기반 개인화 주거 추천 플랫폼",
    desc: "공공 데이터를 활용해 사용자의 라이프스타일(교통, 편의시설, 소음 등)에 딱 맞는 동네를 점수화하여 추천해주는 웹 서비스입니다.",
    tags: ["React", "Flask", "Data Pipeline"],
    color: "from-green-400 to-emerald-300",
    status: "Refactored"
  },
  // --- PAGE 2: Tech & Research ---
  {
    id: 4,
    title: "RLHF LLM Fine-tuning",
    subtitle: "인간 피드백 기반 언어 모델 최적화",
    desc: "오픈소스 LLM(LLaMA)에 LoRA와 PPO 알고리즘을 적용, 인간의 피드백을 반영하여 답변의 정확도와 자연스러움을 높이는 미세 조정(Fine-tuning) 실험을 수행했습니다.",
    tags: ["Pytorch", "RLHF", "LoRA"],
    color: "from-pink-400 to-rose-300",
    status: "Research"
  },
  {
    id: 5,
    title: "Emergency Classification",
    subtitle: "음성/텍스트 멀티모달 긴급도 판별",
    desc: "119 신고 데이터의 음성 파형(Wav2Vec2)과 텍스트(KoELECTRA)를 결합하여 신고자의 위급 상황 등급을 실시간으로 분류하는 딥러닝 모델입니다.",
    tags: ["Multimodal", "Audio Processing", "AI"],
    color: "from-red-400 to-orange-300",
    status: null
  },
  {
    id: 6,
    title: "Flower Map Prototype",
    subtitle: "위치 기반 정보 제공 서비스",
    desc: "기획부터 프론트엔드 구현까지 주도한 초기 프로젝트로, 지도 API를 활용해 개화 시기와 명소 정보를 시각적으로 제공하는 반응형 웹 서비스입니다.",
    tags: ["Javascript", "React", "Prototyping"],
    color: "from-yellow-400 to-amber-300",
    status: null
  }
];

export default function Projects() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(projects.length / 3);

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

  const currentProjects = projects.slice(page * 3, (page + 1) * 3);

  return (
    // h-screen 대신 min-h-screen 사용 -> 내용이 많으면 늘어나고, 적으면 화면 꽉 참
    // py-24로 상하 여백을 줘서 헤더/푸터와 겹치지 않게 함
    <section className="min-h-screen w-full bg-[#0a0a0a] relative flex flex-col justify-center items-center py-24 px-4 md:px-10">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
        
        {/* 1. 헤더 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Selected <span className="text-indigo-500">Works</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              서비스 구현부터 AI 코어 기술 연구까지, 문제 해결의 과정을 담았습니다.
            </p>
          </motion.div>

          {/* 데스크탑 네비게이션 버튼 */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={prevPage} 
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-indigo-500/50"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextPage} 
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-indigo-500/50"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* 2. 프로젝트 카드 영역 */}
        <div className="relative min-h-[500px]"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {currentProjects.map((project) => (
                <SpotlightCard 
                  key={project.id} 
                  className="flex flex-col group border border-white/5 hover:border-indigo-500/50 bg-neutral-900/50 transition-colors duration-300 rounded-2xl overflow-hidden h-full"
                >
                  
                  {/* 이미지 영역: 높이 고정 (h-48 ~ h-64) */}
                  <div className="w-full h-56 bg-gray-800 relative overflow-hidden shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl font-black uppercase tracking-tighter">
                      {project.title.substring(0, 2)}
                    </div>
                    {/* 상태 배지 */}
                    {project.status && (
                      <div className="absolute top-4 right-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-white uppercase tracking-wider shadow-xl">
                        {project.status}
                      </div>
                    )}
                  </div>

                  {/* 텍스트 영역: 남은 공간 채우기 (flex-grow) */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-indigo-300 text-sm font-medium mb-4 truncate">
                      {project.subtitle}
                    </p>
                    
                    {/* 설명글: 줄 수 제한 (line-clamp) */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 md:line-clamp-4 flex-grow">
                      {project.desc}
                    </p>

                    {/* 태그 영역 */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </SpotlightCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. 모바일 네비게이션 (화살표 & 인디케이터) */}
        <div className="flex justify-center items-center gap-6 mt-4 md:hidden">
            <button onClick={prevPage} className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10">
                <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
                {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                    page === idx ? "w-6 bg-indigo-500" : "w-1.5 bg-gray-600"
                    }`}
                />
                ))}
            </div>

             <button onClick={nextPage} className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10">
                <ChevronRight size={20} />
            </button>
        </div>

      </div>
    </section>
  );
}
// types.ts
export interface Project {
  id: number;
  abbr: string; // 카드 배경 텍스트 (예: SC, CA)
  color: string; // 테마 컬러
  badge: string; // 우측 상단 뱃지
  title: string;
  subtitle: string;
  date: string; // 개발 기간
  team: string; // 개발 인원
  role: string; // 내 역할
  tags: string[];
  desc: string; // 카드용 짧은 설명
  overview: string; // 상세 페이지용 긴 설명
  features: string[]; // 주요 기능
  stack: string[]; // 상세 기술 스택
  performance?: string; // 성과 (Optional)
  hasVideo: boolean;
  githubUrl?: string;
  githubUrl2?: string;
  videoId?: string;
  videoId2?: string;
  imageUrl?: string;
}

export interface VisibleProject extends Project {
  position: number;
}
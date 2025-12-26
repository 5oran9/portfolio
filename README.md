# Portfolio

개인 포트폴리오 웹사이트입니다.  
Dev / Film 두 가지 모드를 전환하며 프로젝트와 작업물을 확인할 수 있습니다.

- Live: https://portfolio-59s-projects-c950d578.vercel.app  
- GitHub: https://github.com/5oran9/portfolio

---

## Features

- Dev / Film 모드 전환 (sessionStorage 기반, 세션 단위 유지)
- Projects 캐러셀
  - Desktop: 클릭 / 화살표 네비게이션
  - Mobile: 스와이프 + 인디케이터
- Project Detail 모달
  - Prev / Next 프로젝트 이동
- 반응형 UI
- Framer Motion 기반 애니메이션
- Contact 섹션 (전화번호 / 이메일 탭하여 복사)

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react

---

## Getting Started

```bash
pnpm install
pnpm dev
```

브라우저에서 아래 주소로 확인합니다.

- http://localhost:3000

---

## Environment Variables (optional)

메일 전송 기능을 사용하는 경우에만 설정합니다.

`.env.local`

```bash
RESEND_API_KEY=YOUR_KEY
CONTACT_TO_EMAIL=YOUR_EMAIL
CONTACT_FROM_EMAIL=YOUR_VERIFIED_SENDER
```

---

## Deploy

Vercel로 배포합니다.  
제출 및 공유 시에는 Production URL을 사용합니다.

---

## Project Structure (overview)

- `app/`  
  Next.js App Router

- `components/`  
  섹션 / 레이아웃 / UI 컴포넌트

- `context/ThemeContext.tsx`  
  Dev / Film 모드 상태 관리

- `components/sections/Projects/ProjectCarousel.tsx`  
  Projects 캐러셀 구현

---

## License

Personal portfolio project.

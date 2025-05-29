// 파일 경로: /src/middleware.ts
// 역할: 언어 감지 및 경로 처리 미들웨어
import createMiddleware from 'next-intl/middleware';

// 지원하는 언어 목록
const locales = ['ko', 'en', 'zh'];
const defaultLocale = 'ko';

// next-intl 4.1.0 버전에 맞는 미들웨어 구현
export default createMiddleware({
  // 지원하는 언어 목록
  locales,
  // 기본 언어
  defaultLocale,
  // 로케일 감지 활성화
  localeDetection: true
});

// 미들웨어가 적용될 경로 설정
export const config = {
  // 모든 경로에 미들웨어 적용 (정적 파일 제외)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)']
};

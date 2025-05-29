// src/utils/languageDetection.ts
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NextRouter } from 'next/router';

// App Router의 Router 인터페이스 직접 정의
interface AppRouter {
  push: (path: string) => void;
  pathname: string;
}

/**
 * 브라우저 언어 설정을 감지하여 지원되는 언어로 자동 전환하는 커스텀 훅
 * next-i18next 15.x에서는 localeDetection 옵션이 제거되어 직접 구현 필요
 */
export const useLanguageDetection = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;
  
  useEffect(() => {
    // 이미 언어가 선택되어 있으면 감지하지 않음
    if (localStorage.getItem('selectedLanguage')) {
      return;
    }
    
    // 지원하는 언어 목록
    const supportedLocales = ['ko', 'en', 'zh'];
    
    // 브라우저 언어 감지
    const detectLanguage = () => {
      // 브라우저 언어 설정 가져오기
      const browserLang = navigator.language.split('-')[0];
      
      // 지원하는 언어인지 확인
      const matchedLocale = supportedLocales.find(locale => 
        locale === browserLang || locale.startsWith(browserLang)
      );
      
      // 지원하는 언어면 해당 언어로, 아니면 기본 언어(ko)로 설정
      const targetLocale = matchedLocale || 'ko';
      
      // 현재 언어와 다르면 변경
      if (targetLocale !== locale) {
        router.push({ pathname, query }, asPath, { locale: targetLocale });
        localStorage.setItem('selectedLanguage', targetLocale);
      }
    };
    
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      detectLanguage();
    }
  }, [pathname, asPath, query, locale, router]);
};

/**
 * 언어 변경 함수
 * @param locale 변경할 언어 코드
 * @param router 라우터 인스턴스 (Pages Router 또는 App Router)
 */
export const changeLanguage = (locale: string, router: NextRouter | AppRouter) => {
  // Pages Router와 App Router 모두 지원하기 위한 타입 체크
  if ('asPath' in router && 'query' in router) {
    // Pages Router
    const pagesRouter = router as NextRouter;
    const { pathname, asPath, query } = pagesRouter;
    localStorage.setItem('selectedLanguage', locale);
    pagesRouter.push({ pathname, query }, asPath, { locale });
  } else {
    // App Router
    const appRouter = router as AppRouter;
    const pathname = window.location.pathname;
    const segments = pathname.split('/');
    segments[1] = locale; // 첫 번째 세그먼트는 로케일
    
    const newPath = segments.join('/');
    appRouter.push(newPath);
    localStorage.setItem('selectedLanguage', locale);
  }
};

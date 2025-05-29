'use client';

import { useState, useEffect } from 'react';

// 쿠키 동의 배너 컴포넌트
export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      // 쿠키 동의 여부 확인
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setShowConsent(true);
      }
    }
  }, []);

  // 쿠키 사용 동의
  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowConsent(false);
    
    // 동의 후 GA 활성화
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  // 쿠키 사용 거부
  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setShowConsent(false);
    
    // 거부 시 GA 비활성화
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
  };

  // 동의 배너가 표시되지 않아야 하는 경우
  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="mb-4 md:mb-0">
          이 웹사이트는 사용자 경험 개선을 위해 쿠키를 사용합니다. 
          통계 분석을 위한 쿠키 사용에 동의하시겠습니까?
        </p>
        <div className="flex gap-4">
          <button
            onClick={acceptCookies}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            동의
          </button>
          <button
            onClick={declineCookies}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            거부
          </button>
        </div>
      </div>
    </div>
  );
}

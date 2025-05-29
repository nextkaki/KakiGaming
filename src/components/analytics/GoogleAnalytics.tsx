'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

// GA4 측정 ID를 받아 Google Analytics를 설정하는 컴포넌트
export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // GA_MEASUREMENT_ID가 없거나 gtag가 로드되지 않은 경우 실행하지 않음
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    // 현재 URL 생성 (경로 + 쿼리 파라미터)
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // 페이지 변경 시 이벤트 전송
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return (
    <>
      {/* Google Analytics 스크립트 로드 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      
      {/* Google Analytics 초기화 스크립트 */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// 파일 경로: /src/app/[locale]/not-found.tsx
// 역할: 다국어 지원 404 페이지
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('common');
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-purple-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('notFound.title')}</h2>
        <p className="text-gray-600 mb-8">{t('notFound.message')}</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-colors"
        >
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
}

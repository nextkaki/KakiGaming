'use client';

import Link from "next/link";
import GameCard from "@/components/ui/GameCard";
import AdContainer from "@/components/ui/AdContainer";
import UpdatesSection from "@/components/ui/UpdatesSection";
import { getLatestUpdates } from "@/app/utils/githubApi";
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import { Suspense } from 'react';

// 서버 컴포넌트에서 데이터 가져오기
export async function generateMetadata() {
  // 이 함수는 빌드 시간에 실행되며, 메타데이터 생성과 함께 
  // 최신 업데이트 데이터를 미리 가져와 캐싱합니다
  await getLatestUpdates();
  return { title: 'KakiGaming' };
}

// 최신 업데이트 데이터를 가져오는 서버 컴포넌트
async function UpdatesSectionWrapper() {
  // 최신 업데이트 데이터 가져오기 (ISR 방식으로 1시간마다 재검증)
  const updates = await getLatestUpdates(5);
  
  return <UpdatesSection updates={updates} title="최신 업데이트 소식" />;
}

export default function Home() {
    const t = useTranslations('common');
    const pathname = usePathname();
    const params = useParams();
    const locale = params.locale as string || pathname.split('/')[1] || 'ko';
    
    return (
        <div>
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg p-8 mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{t('home.hero.title')}</h1>
                <p className="text-xl mb-6">{t('home.hero.description')}</p>
            </div>

            {/* 최신 업데이트 섹션 */}
            <Suspense fallback={<div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-lg p-6 mb-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">최신 업데이트 소식</h2>
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
                        <div className="h-4 bg-white bg-opacity-20 rounded"></div>
                        <div className="h-4 bg-white bg-opacity-20 rounded w-5/6"></div>
                    </div>
                </div>
            </div>}>
                <UpdatesSectionWrapper />
            </Suspense>

            {/* 게임 카드 섹션 */}
            <h2 className="text-2xl font-bold mb-4">{t('home.popular_games')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <GameCard 
                    title={t('header.diablo4')} 
                    imageSrc="/images/diablo4.jpg" 
                    href={`/${locale}/diablo4`} 
                />
                <GameCard 
                    title={t('header.torchlight')} 
                    imageSrc="/images/torchlight.jpg" 
                    href={`/${locale}/torchlight`} 
                />
                <GameCard 
                    title={t('header.poe')} 
                    imageSrc="/images/poe1.jpg" 
                    href={`/${locale}/poe1`} 
                />
                <GameCard 
                    title={t('header.poe2')} 
                    imageSrc="/images/poe2.jpg" 
                    href={`/${locale}/poe2`} 
                />
            </div>

            {/* 유틸리티 섹션 */}
            <h2 className="text-2xl font-bold mb-4">{t('home.use_tool')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl text-gray-950 font-bold mb-2">{t('torchlight.tools.mp_calculator.title')}</h3>
                    <p className="text-gray-600 mb-4">{t('torchlight.tools.mp_calculator.description')}</p>
                    <Link href={`/${locale}/torchlight/mp-calculator`} className="text-purple-600 font-medium hover:text-purple-800">
                        {t('home.use_tool')} &rarr;
                    </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl text-gray-950 font-bold mb-2">{t('torchlight.tools.cooltime_calculator.title')}</h3>
                    <p className="text-gray-600 mb-4">{t('torchlight.tools.cooltime_calculator.description')}</p>
                    <Link href={`/${locale}/torchlight/cooltime-calculator`} className="text-purple-600 font-medium hover:text-purple-800">
                        {t('home.use_tool')} &rarr;
                    </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl text-gray-950 font-bold mb-2">{t('diablo4.tools.rune_price.title')}</h3>
                    <p className="text-gray-600 mb-4">{t('diablo4.tools.rune_price.description')}</p>
                    <Link href={`/${locale}/diablo4/rune-price`} className="text-purple-600 font-medium hover:text-purple-800">
                        {t('home.check_price')} &rarr;
                    </Link>
                </div>
            </div>

            {/* 광고 배너 */}
            <AdContainer size="horizontal" className="mb-8" />
        </div>
    );
}

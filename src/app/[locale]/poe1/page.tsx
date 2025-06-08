'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import AdContainer from '@/components/ui/AdContainer';

export const metadata = {
    title: '패스 오브 엑자일 가이드 | KakiGaming',
    description: '패스 오브 엑자일 관련 가이드와 유용한 링크를 제공합니다.',
};

export default function PoePage() {
    const t = useTranslations('common');
    const params = useParams();
    const locale = params.locale as string || 'ko';

    return (
        <div className="space-y-8">
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-blue-800 to-gray-900 text-white rounded-lg p-8 mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{t('poe.title')}</h1>
                <p className="text-xl mb-6">그라인딩 기어 게임즈가 개발한 인기 액션 RPG 게임입니다. 이 페이지에서는 패스 오브 엑자일과 관련된 다양한 가이드와 정보를 제공합니다.</p>
            </div>

            {/* 가이드 섹션 */}
            <h2 className="text-2xl font-bold mb-4">가이드 및 도구</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl text-gray-950 font-bold mb-2">퀵 링크 모음</h3>
                    <p className="text-gray-600 mb-4">패스 오브 엑자일 플레이에 도움이 되는 유용한 사이트와 도구 모음입니다.</p>
                    <Link href={`/${locale}/poe1/quicklinks`} className="text-blue-600 font-medium hover:text-blue-800">
                        퀵 링크 보기 &rarr;
                    </Link>
                </div>
            </div>

            {/* 광고 배너 */}
            <AdContainer size="horizontal" className="mb-8" />
        </div>
    );
}

'use client';

import Link from "next/link";
import GameCard from "@/components/ui/GameCard";
import AdContainer from "@/components/ui/AdContainer";
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';

// 클라이언트 컴포넌트
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
            <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-lg p-6 mb-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">최신 업데이트 소식</h2>
                <div id="updates-container">
                    {/* 이 부분은 클라이언트 측에서 JavaScript로 업데이트 내용을 로드합니다 */}
                </div>
            </div>

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
            
            {/* 최신 업데이트 데이터 로드 스크립트 */}
            <script dangerouslySetInnerHTML={{
                __html: `
                    document.addEventListener('DOMContentLoaded', async () => {
                        try {
                            const response = await fetch('/api/updates');
                            if (response.ok) {
                                const updates = await response.json();
                                const container = document.getElementById('updates-container');
                                
                                if (updates.length === 0) {
                                    container.innerHTML = '<div class="text-center py-4"><p>최신 업데이트 정보가 없습니다.</p></div>';
                                    return;
                                }
                                
                                // 최대 3개만 표시
                                const displayUpdates = updates.slice(0, 3);
                                
                                let html = '<div class="space-y-3">';
                                displayUpdates.forEach(update => {
                                    html += \`
                                        <div class="bg-black bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition">
                                            <div class="flex justify-between items-center mb-1">
                                                <h3 class="font-medium text-lg">\${update.title}</h3>
                                                <span class="text-xs bg-purple-900 px-2 py-1 rounded-full">\${update.date}</span>
                                            </div>
                                            \${update.description ? \`<p class="text-sm text-gray-200">\${update.description}</p>\` : ''}
                                        </div>
                                    \`;
                                });
                                html += '</div>';
                                
                                container.innerHTML = html;
                            } else {
                                throw new Error('Failed to fetch updates');
                            }
                        } catch (error) {
                            console.error('Error loading updates:', error);
                            
                            // 폴백 데이터 표시
                            const container = document.getElementById('updates-container');
                            container.innerHTML = \`
                                <div class="space-y-3">
                                    <div class="bg-black bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition">
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-medium text-lg">토치라이트 인피니트 MP 봉인 계산기 업데이트</h3>
                                            <span class="text-xs bg-purple-900 px-2 py-1 rounded-full">\${new Date().toISOString().split('T')[0]}</span>
                                        </div>
                                        <p class="text-sm text-gray-200">정확도 향상 및 UI 개선</p>
                                    </div>
                                    <div class="bg-black bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition">
                                        <div class="flex justify-between items-center mb-1">
                                            <h3 class="font-medium text-lg">디아블로 4 시즌 4 룬 가격 정보 추가</h3>
                                            <span class="text-xs bg-purple-900 px-2 py-1 rounded-full">\${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</span>
                                        </div>
                                        <p class="text-sm text-gray-200">최신 시즌 데이터 반영</p>
                                    </div>
                                </div>
                            \`;
                        }
                    });
                `
            }} />
        </div>
    );
}

// 파일 경로: /src/app/[locale]/diablo4/rune-price/page.tsx
// 역할: 다국어 지원 룬 시세 페이지 (기존 /src/app/diablo4/rune-price/page.tsx 대체)
'use client';

import RunePriceSearch from "@/components/calculators/RunePriceSearch";
import { useTranslations } from 'next-intl';



export default function RunePricePage() {
    const t = useTranslations('common');

    return (
        <>
        <div>
            <h1 className="text-3xl font-bold mb-6">{t('diablo4.rune_price.title')}</h1>
            <p className="mb-6">{t('diablo4.rune_price.description')}</p>
            <div className="space-y-4">
                <div className="border-b pb-4">
                    <a href="https://youtu.be/879gcbaRNTc?si=oP2el4sXCPeDpCzo" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-fuchsia-500 transition mr-5">
                        {t('diablo4.rune_price.video_guide' )} &rarr;
                    </a>
                    <a href="https://chromewebstore.google.com/detail/item-data-calculator/gbknoekikpkddocbfknioicbkcoclpnm?hl=ko&utm_source=ext_sidebar" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-fuchsia-500 transition">
                        {t('diablo4.rune_price.extension' )} &rarr;
                    </a>
                </div>
            </div>

            <RunePriceSearch />
        </div>
        </>
    );
}

"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdContainer from "@/components/ui/AdContainer";
import Head from 'next/head';



export const metadata = {
    title: '엘든링: 밤의 통치자 가이드 | KakiGaming',
    description: '엘든링 스핀오프 작품 밤의 통치자에 대한 정보를 제공합니다.',
};


export default function EldenringPage() {
    const t = useTranslations("common");
    const params = useParams();
    const locale = (params.locale as string) || "ko";

    return (
        <>
        <Head>
            <title>엘든링: 밤의 통치자 가이드 | KakiGaming</title>
            <meta name="description" content="엘든링 스핀오프 작품 밤의 통치자에 대한 정보를 제공합니다." />
        </Head>
        <div className="space-y-8">
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-amber-800 to-gray-900 text-white rounded-lg p-8 mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{t("eldenring.title")}</h1>
                <p className="text-xl mb-6">엘든링 밤의 통치자(Elden Ring: Nightreign)는 프롬소프트웨어가 개발한 엘든링의 공식 스핀오프 작품으로,
                    원작의 오픈월드와 액션 RPG 요소에 로그라이트, 멀티플레이 협동,
                    <br/>그리고 새로운 게임 메커니즘을 결합한 실험적인 작품입니다.
                    <br/>이 페이지에서는 엘든링과 관련된 다양한 가이드와 정보를 제공합니다.</p>
            </div>

            {/* 가이드 섹션 */}
            <h2 className="text-2xl font-bold mb-4">가이드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-xl text-gray-950 font-bold mb-2">{t("eldenring.nightlord.title")}</h3>
                    <p className="text-gray-600 mb-4">{t("eldenring.nightlord.description")}</p>
                    <Link href={`/${locale}/eldenring/nightlord`} className="text-amber-600 font-medium hover:text-amber-800">
                        가이드 보기 &rarr;
                    </Link>
                </div>
            </div>

            {/* 광고 배너 */}
            <AdContainer size="horizontal" className="mb-8" />
        </div>
        </>
    );
}

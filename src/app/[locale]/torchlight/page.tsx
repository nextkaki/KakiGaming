// 파일 경로: /src/app/[locale]/torchlight/page.tsx
// 역할: 다국어 지원 토치라이트 페이지 (기존 /src/app/torchlight/page.tsx 대체)
"use client";

import Link from "next/link";
import Image from "next/image";
import AdContainer from "@/components/ui/AdContainer";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Head from 'next/head';



export default function TorchlightPage() {
    const t = useTranslations("common");
    const params = useParams();
    const locale = (params.locale as string) || "ko";

    return (
        <>
            <Head>
                <title>토치라이트 인피니트 가이드 | KakiGaming</title>
                <meta name="description" content="토치라이트 인피니트의 공략과 계산기 정보를 제공합니다." />
            </Head>
        <div>
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <Image src="/images/torchlight-banner.jpg" alt={t("torchlight.title")} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">{t("torchlight.title")}</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl text-gray-950 font-bold mb-4">{t("torchlight.intro_title")}</h2>
                        <p className="text-gray-700 mb-4">{t("torchlight.description")}</p>

                        <a href="https://game.naver.com/lounge/Torchlight_Infinite/home" className="text-purple-600 font-medium hover:text-purple-800" target="_blank" rel="noopener noreferrer">
                            {t("torchlight.official_community")} &rarr;
                        </a>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl text-gray-950 font-bold mb-4">{t("torchlight.tools.title")}</h2>
                        <div className="space-y-4">
                            <div className="border-b pb-4 mb-3">
                                <h3 className="font-bold text-gray-950 text-lg mb-2">{t("torchlight.tools.mp_calculator.title")}</h3>
                                <p className="text-gray-600 mb-2">{t("torchlight.tools.mp_calculator.description")}</p>
                                <Link href={`/${locale}/torchlight/mp-calculator`} className="text-purple-600 font-medium hover:text-purple-800">
                                    {t("torchlight.tools.mp_calculator.use")} &rarr;
                                </Link>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="border-b pb-4 mb-3">
                                <h3 className="font-bold text-gray-950 text-lg mb-2">{t("torchlight.tools.cooltime_calculator.title")}</h3>
                                <p className="text-gray-600 mb-2">{t("torchlight.tools.cooltime_calculator.description")}</p>
                                <Link href={`/${locale}/torchlight/cooltime-calculator`} className="text-purple-600 font-medium hover:text-purple-800">
                                    {t("torchlight.tools.cooltime_calculator.use")} &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <AdContainer size="vertical" className="mb-6" />
                </div>
            </div>
        </div>
        </>
    );
}

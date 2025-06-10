"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import AdContainer from "@/components/ui/AdContainer";

export default function EldenringNightlordClient() {
    const t = useTranslations("common");

    return (
        <div className="space-y-8">
            {/* 히어로 섹션 */}
            <div className="bg-gradient-to-r from-amber-800 to-gray-900 text-white rounded-lg p-8 mb-8 shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{t("eldenring.nightlord.title")}</h1>
                <p className="text-xl mb-6">{t("eldenring.nightlord.intro")}</p>
            </div>

            {/* 소개 섹션 */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-4">초보자를 위한 가이드</h2>
                <div className="prose prose-invert max-w-none">
                    <p className="mb-4">&quot;이런것들이 있구나~&quot; 하고 눈에 익혀두고 배운다 생각하세요. 이런 &apos;구성요소&apos;들이 어떤 역할을 하는지 알게 된다면 &apos;스스로&apos; 동선을 짤 수 있게 됩니다.</p>
                    <div className="bg-gray-700 p-4 rounded-lg mb-6">
                        <p className="font-semibold text-amber-400">💡 가이드 활용 팁</p>
                        <p>
                            이 가이드는 밤의 통치자를 처음 접하는 초보자를 위한 전반적인 흐름과 주요 구성요소를 설명합니다.
                            <br />
                            파티원을 따라다니면서 이 가이드에 소개된 요소들을 확인하고 익히는 것이 좋습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* 착륙 지점 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.landing")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">착륙 지점 확인하기</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    맵을 <span className="text-amber-400">축소</span>해서 넓게 보고 &quot;어디에 뭐가 있구나~&quot; 정도만 눈으로 확인하세요.
                                </li>
                                <li>
                                    어디쯤 내리겠구나 생각하고 착륙 지점 <span className="text-amber-400">인근</span>에는 무엇이 있는지 파악하세요.
                                </li>
                                <li>동선을 어떻게 할지 간단히 계획해보세요.</li>
                                <li>처음에는 파티원들을 따라서 이동하면 됩니다.</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/landing_map.jpg" alt="착륙 지점 맵" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">착륙 지점 맵 예시</p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-semibold text-amber-400 mb-2">중요 포인트</h4>
                                <p>
                                    반드시 <span className="text-amber-400">착륙 지점</span> 인근에 [작은 야영지]가 있습니다. 여기를 사냥하면 [2레벨]을 찍을 수 있는 소량의 <span className="text-amber-400">룬</span>을 획득할 수 있습니다.
                                </p>
                                <p className="mt-2">룬이란? 레벨업 하는데 소모되는 재료입니다.</p>

                                {/* 이미지 컨테이너 추가 */}
                                <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                    <div className="relative w-full h-[200px] overflow-hidden rounded">
                                        {/* 실제 이미지 경로로 교체 필요 */}
                                        <Image src="/images/eldenring/small_camp.jpg" alt="작은 야영지" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
                                <h4 className="font-semibold text-amber-400 mb-2">초보자 목표</h4>
                                <ul className="list-disc pl-5">
                                    <li>[작은 야영지]를 파밍해서 반드시 [2레벨]을 올리는 것을 최우선 목표로 하세요.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 나머지 섹션들... */}

            {/* 광고 배너 */}
            <AdContainer size="horizontal" className="mt-8" />
        </div>
    );
}

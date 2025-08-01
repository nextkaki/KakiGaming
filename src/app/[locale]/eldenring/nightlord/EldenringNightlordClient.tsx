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
                    <p className="mb-4">이런것들이 있구나~ 하고 눈에 익혀두고 배운다 생각하세요. 이런 구성요소들이 어떤 역할을 하는지 알게 된다면 스스로 동선을 짤 수 있게 됩니다.</p>
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
                                    맵을 <span className="text-amber-400">축소</span>해서 넓게 보고 어디에 뭐가 있구나~ 정도만 눈으로 확인하세요.
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

            {/* 레벨업 포인트 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.leveling")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">레벨업 지점 & 회복 지점</h3>
                            <p className="mb-4">지도에서 특별한 표시가 있는 장소에서 레벨업과 회복이 가능합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>레벨업 하는 구성요소입니다.</li>
                                <li>여기서 성배병(물약)을 채우며 레벨업도 할 수 있습니다.</li>
                                <li>사망하면 소지한 룬을 모두 잃어버리게 됩니다. 사망 지점으로 돌아가 시체를 다시 획득해야 하는 불편함이 생길 수 있으니, 기회가 될 때 레벨업을 자주 하세요.</li>
                            </ul>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <div className="bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/levelup_point.jpg" alt="레벨업 지점" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 파밍 지역 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.farming")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">파밍 지역 특징</h3>
                            <p className="mb-4">지도에 특별히 표시된 파밍 지역에서는 효율적으로 자원을 모을 수 있습니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    [파밍] 지역에는 반드시 <span className="text-amber-400">보스</span>가 존재합니다.
                                </li>
                                <li>보스는 아래와 같이 [체력 바]가 표시됩니다.</li>
                                <li>최대한 죽지 않고 파티원을 따라다니세요.</li>
                                <li>보스를 처치하고 보상을 받는 것이 목표입니다.</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/farming_area.jpg" alt="파밍 지역" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-700 p-4 rounded-lg mb-4">
                                <h4 className="font-semibold text-amber-400 mb-2">보스 처치 보상</h4>
                                <p>
                                    [보스]를 처치했다면, <span className="text-amber-400">보상</span>을 반드시 챙기세요:
                                </p>
                                <ul className="list-disc pl-5">
                                    <li>보상 아이템</li>
                                    <li>레벨업 포인트</li>
                                    <li>보스 처치 [룬]</li>
                                </ul>
                                <p className="mt-2 text-sm italic">* 잡몹 무리들이 보스 역할을 할 때도 있습니다.</p>

                                {/* 이미지 컨테이너 추가 */}
                                <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                    <div className="relative w-full h-[200px] overflow-hidden rounded">
                                        {/* 실제 이미지 경로로 교체 필요 */}
                                        <Image src="/images/eldenring/boss_rewards.jpg" alt="보스 처치 보상" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 아이템 & 장비 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.items")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">아이템 선택 가이드</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>공격력이 높은 아이템은 좋습니다.</li>
                                <li>[옵션]이 나에게 맞는 것을 고르세요.</li>
                                <li>
                                    <span className="text-amber-400">사용하지 않더라도 소지해도 효과를 얻습니다</span>
                                </li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/items_equipment.jpg" alt="아이템 및 장비" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">아이템 및 장비 구성요소</p>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-amber-400 mb-2">여백</h4>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 석검열쇠 & 봉인해제 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.keys")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">석검열쇠와 봉인해제</h3>
                            <p className="mb-4">[석검열쇠] 소지 후 [봉인해제]가 가능합니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>보스 소환 장소</li>
                                <li>룬 또는 패시브 스킬 획득 장소</li>
                                <li>중요 아이템 획득 장소</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/stone_key.jpg" alt="석검열쇠" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">석검열쇠 구성요소</p>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-amber-400 mb-2">그 외 구성요소</h4>
                            <ul className="list-disc pl-5">
                                <li>성배병(물약) 최대치 +1 획득</li>
                                <li>기타 사용 물품 획득 가능</li>
                                <li>단석(강화 아이템) 획득 장소</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                {/* flex 컨테이너로 변경, gap 또는 space-x-?를 이용해 간격 조절 */}
                                <div className="flex space-x-2">
                                    {/* 첫 번째 이미지 래퍼: 상대위치, 너비 1/2, 높이는 고정 */}
                                    <div className="relative w-1/2 h-[200px] overflow-hidden rounded">
                                        <Image src="/images/eldenring/map_component1.jpg" alt="구성요소1" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>

                                    {/* 두 번째 이미지 래퍼: 상대위치, 너비 1/2, 높이는 고정 */}
                                    <div className="relative w-1/2 h-[200px] overflow-hidden rounded">
                                        <Image src="/images/eldenring/map_component2.jpg" alt="구성요소2" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                    </div>
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">교회(성배병) / 갱도</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 이동 & 탐험 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.travel")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">이동 시스템</h3>
                            <p className="mb-4">맵에는 특별한 이동 지점이 있습니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>바람 모양 방향으로 이동합니다.</li>
                                <li>멀리 이동할 때 사용합니다.</li>
                                <li>높은 점프를 하게 해주는 곳입니다.</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/travel_point.jpg" alt="영혼매" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">이동 지점 - 영혼매</p>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-amber-400 mb-2">이동 시스템</h4>
                            <p className="mt-2">높은 점프를 하게 해주는 곳입니다.</p>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/crystal_jump.jpg" alt="영맥" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">이동 지점 - 영맥</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 보스 전투 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.boss")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">보스 구분법</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    [빨간색] 테두리가 <span className="text-amber-400">있으면</span> 강력한 보스
                                </li>
                                <li>
                                    [빨간색] 테두리가 <span className="text-amber-400">없으면</span> 약한 보스
                                </li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/boss_types.jpg" alt="보스 유형" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">보스 유형 구성요소</p>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-amber-400 mb-2">아군 부활 시스템</h4>
                            <ul className="list-disc pl-5">
                                <li>아군 [사망] 시 게이지가 표시됩니다.</li>
                                <li>공격해서 게이지를 다 깎으면 부활합니다.</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/revival_gauge.jpg" alt="부활 게이지" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">부활 게이지 구성요소</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 상인 & 대장간 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.merchants")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">상인과 대장간</h3>
                            <p className="mb-4">지도에는 표시되지 않지만 상인이 존재하며 그 옆에는 대장간이 있습니다.</p>
                            <p>아이템을 한번 확인하고, 장비가 안좋으면 [업그레이드]하세요.</p>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/merchant.jpg" alt="상인" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">상인</p>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-amber-400 mb-2">장비 관리 전략</h4>
                            <ul className="list-disc pl-5">
                                <li>내가 쓰는 무기가 [일반]이라면 [파란색]으로 강화</li>
                                <li>룬은 최대한 아껴서 [레벨업] (템 구매 X)</li>
                                <li>쓸만한 무기가 있다면 [구매] (등급&옵션 체크!)</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/blacksmith.jpg" alt="대장간" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">대장간</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 원혼 & 보조 공격 섹션 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-amber-900 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">{t("eldenring.sections.spirits")}</h2>
                </div>
                <div className="p-6 text-white">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-3">원혼 시스템</h3>
                            <p className="mb-4">나를 도와주는 [보조 공격 수단]입니다.</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>비석을 활성화하면 캐릭터 주변에 원혼이 생깁니다.</li>
                                <li>원혼이 [적]을 타겟팅해서 대미지를 부여합니다.</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/spirit_system.jpg" alt="원혼 시스템" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">원혼 시스템 구성요소</p>
                            </div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-amber-400 mb-2">원혼 활용 팁</h4>
                            <ul className="list-disc pl-5">
                                <li>보이면 [활성화] 해주세요.</li>
                                <li>굳이 안해도 상관은 없습니다.</li>
                                <li>이동 & 동선 낭비하지 않는게 좋아요!</li>
                            </ul>

                            {/* 이미지 컨테이너 추가 */}
                            <div className="mt-4 bg-gray-900 p-2 rounded-lg">
                                <div className="relative w-full h-[200px] overflow-hidden rounded">
                                    {/* 실제 이미지 경로로 교체 필요 */}
                                    <Image src="/images/eldenring/spirit_activation.jpg" alt="원혼 활성화" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                                </div>
                                <p className="text-center text-sm mt-2 text-gray-400">원혼 활성화 구성요소</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 결론 섹션 */}
            <div className="bg-gradient-to-r from-amber-800 to-gray-900 text-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">초보자를 위한 핵심 요약</h2>
                <div className="prose prose-invert max-w-none">
                    <p className="mb-4">엘든링 밤의 통치자를 처음 접하는 초보자라면, 이 가이드에서 소개한 주요 구성요소들을 하나씩 익혀가며 게임을 즐기세요. 처음에는 파티원을 따라다니며 관찰하고, 점차 자신만의 동선과 전략을 세워나가는 것이 좋습니다.</p>
                    <div className="bg-black bg-opacity-30 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-amber-400">기억해야 할 핵심 포인트</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>착륙 지점 인근 [작은 야영지]에서 [2레벨] 달성하기</li>
                            <li>레벨업 지점에 자주 방문하기</li>
                            <li>파밍 지역에서 보스 처치하고 보상 받기</li>
                            <li>좋은 장비 찾아 업그레이드하기</li>
                            <li>석검열쇠로 봉인 해제하여 추가 보상 얻기</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 광고 배너 */}
            <AdContainer size="horizontal" className="mb-8" />
        </div>
    );
}

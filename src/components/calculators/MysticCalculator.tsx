"use client";
import { useState, useEffect } from "react";
import styles from "./MysticCalculator.module.css";

interface AttackResult {
    attackNumber: number;
    startingMP: number;
    stanceConsumption: number;
    additionalConsumption: number;
    totalConsumption: number;
    cumulativeConsumption: number;
    baseMithril: number;
    devotionBonus: number;
    totalMithril: number;
    remainingMP: number;
}

interface CalculationResult {
    attacks: AttackResult[];
    totalAttacks: number;
    finalMithril: number;
    devotionTriggers: number;
    success: boolean;
    mithrilPerSecond: number;
    devotionMithrilPerSecond: number;
    mithrilBalance: number;
    warmupTime: number;
    // 새로 추가되는 부분
    sustainedMPAnalysis: {
        mpConsumptionPerAttack: number;
        mpConsumptionPerSecond: number;
        mpConsumptionPer4Second: number;
        mpRecoveryPerAttack: number;
        mpRecoveryPerSecond: number;
        netMPChangePerSecond: number;
        canSustainMP: boolean;
    };
    sustainabilityAnalysis: {
        canSustain: boolean;
        deficit: number;
        attacksNeededFor40: number;
    };
}

interface OptimizationResult {
    maxMP: number;
    additionalConsumptionRate: number;
    totalAttacks: number;
    mithrilPerSecond: number;
    mithrilBalance: number; // 추가
    warmupTime: number;
    score: number;
}

export default function Home() {
    const [maxMP, setMaxMP] = useState<number>(10000);
    const [additionalConsumptionRate, setAdditionalConsumptionRate] = useState<number>(8);
    const [mithrilMax, setMithrilMax] = useState<number>(200);
    const [attacksPerSecond, setAttacksPerSecond] = useState<number>(8);
    const [autoCalculateMithril, setAutoCalculateMithril] = useState<boolean>(true);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [optimizationResults, setOptimizationResults] = useState<OptimizationResult[]>([]);
    const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
    const [devotionMPThreshold, setDevotionMPThreshold] = useState<number>(2800);

    // 최적화 범위 설정
    const [minMP, setMinMP] = useState<number>(7000);
    const [maxMPRange, setMaxMPRange] = useState<number>(25000);
    const [showOptimizationSettings, setShowOptimizationSettings] = useState<boolean>(false);

    // 미스릴 최대치 자동 계산
    useEffect(() => {
        if (autoCalculateMithril) {
            const calculatedMithril = 100 + (maxMP / 1000) * 10;
            setMithrilMax(Number(calculatedMithril.toFixed(2)));
        }
    }, [maxMP, autoCalculateMithril]);

    const calculateMithril = (): CalculationResult => {
        const attacks: AttackResult[] = [];
        let currentMP = maxMP;
        let cumulativeConsumption = 0;
        let totalMithril = 0;
        let devotionTriggers = 0;
        let attackNumber = 1;

        const mpThreshold = maxMP * 0.1; // 10% 기준점

        while (totalMithril < mithrilMax) {
            const startingMP = currentMP;

            // 미스릴의 자세 MP 소모 계산
            let stanceConsumption: number;
            let baseMithril: number;

            if (currentMP >= mpThreshold) {
                // MP 10% 이상일 때: 미봉인된 최대 MP의 10% 소모
                stanceConsumption = Math.min(Math.floor(maxMP * 0.1), currentMP);
                baseMithril = 10;
            } else {
                // MP 10% 미만일 때: 소모량 0, 미스릴 5 획득
                stanceConsumption = 0; // ✅ 소모량 0
                baseMithril = 5;
            }

            // 추가 MP 소모 (극진한 경배) - MP 10% 미만일 때는 소모량 0
            const additionalConsumption = currentMP > 0 && currentMP >= mpThreshold ? Math.floor(currentMP * (additionalConsumptionRate / 100)) : 0;

            // 총 MP 소모
            const totalConsumption = stanceConsumption + additionalConsumption;

            // MP 업데이트
            currentMP = Math.max(0, currentMP - totalConsumption);
            cumulativeConsumption += totalConsumption;

            // 극진한 경배 보너스 확인 (devotionMPThreshold 마다)
            // 누적 소모량 기준으로 총 발동 횟수 계산
            const totalDevotionTriggers = Math.floor(cumulativeConsumption / devotionMPThreshold);
            const newDevotionTriggers = totalDevotionTriggers - devotionTriggers;
            const devotionBonus = newDevotionTriggers * Math.floor(mithrilMax * 0.1);

            // 발동 횟수 업데이트
            devotionTriggers = totalDevotionTriggers;

            // 미스릴 업데이트
            totalMithril += baseMithril + devotionBonus;

            // 결과 저장
            attacks.push({
                attackNumber,
                startingMP,
                stanceConsumption,
                additionalConsumption,
                totalConsumption,
                cumulativeConsumption,
                baseMithril,
                devotionBonus,
                totalMithril,
                remainingMP: currentMP,
            });

            attackNumber++;

            // 무한 루프 방지 (최대 100번 공격)
            if (attackNumber > 100) break;
        }

        // 예열 완료 시간 계산 (총 공격횟수 ÷ 공격속도)
        const warmupTime = (attackNumber - 1) / attacksPerSecond;

        // 예열 단계 초당 미스릴 획득량 계산 (참고용)
        const warmupMithrilPerSecond = totalMithril / warmupTime;

        // === 정토 상태 미스릴 수치 계산 ===
        const devotionMithrilPerTrigger = Math.floor(mithrilMax * 0.1);
        const mpPerDevotionTrigger = devotionMPThreshold; // 사용자 입력값 (기본 2800)

        // 정토 상태에서 지속적인 공격으로 인한 초당 MP 소모 계산
        // MP가 10% 이상일 때만 추가 소모 발생
        const sustainedMPConsumptionPerAttack = maxMP >= maxMP * 0.1 ? maxMP * (additionalConsumptionRate / 100) : 0;
        const sustainedMPConsumptionPerSecond = sustainedMPConsumptionPerAttack * attacksPerSecond;


        // 초당 극진한 경배 발동 횟수
        const devotionTriggersPerSecond = sustainedMPConsumptionPerSecond / mpPerDevotionTrigger;

        // 초당 극진한 경배로 얻는 미스릴
        const devotionMithrilPerSecond = devotionTriggersPerSecond * devotionMithrilPerTrigger;

        // 정토 상태 미스릴 수치 = 극진한 경배 획득 - 초당 소모(40)
        const mithrilBalance = devotionMithrilPerSecond - 40;

        // === 새로 추가: 정토 상태 MP 분석 ===
        const mpRecoveryPerAttack = maxMP * 0.2; // 20% 회복
        // 정토 상태에서는 항상 최대 MP 유지되므로 매 공격마다 최대 MP 기준으로 계산
        const mpConsumptionPerAttack = maxMP >= mpThreshold ? Math.floor(maxMP * (additionalConsumptionRate / 100)) : 0;

        const mpConsumptionPerSecond = mpConsumptionPerAttack * attacksPerSecond;
        const mpConsumptionPerSecond4 = (mpConsumptionPerAttack * attacksPerSecond) * 4;
        const mpRecoveryPerSecond = mpRecoveryPerAttack * attacksPerSecond;
        const netMPChangePerSecond = mpRecoveryPerSecond - mpConsumptionPerSecond;

        // 지속 가능성 분석
        const canSustain = mithrilBalance >= 0; // 수치가 0 이상이면 지속 가능
        const deficit = Math.max(0, -mithrilBalance);

        // 극진한 경배로 미스릴 40 달성에 필요한 공격 횟수
        const mithrilPerDevotionTrigger = Math.floor(mithrilMax * 0.1);
        const devotionTriggersNeededFor40 = Math.ceil(40 / mithrilPerDevotionTrigger);
        const mpNeededFor40 = devotionTriggersNeededFor40 * devotionMPThreshold;

        // 해당 MP를 소모하는데 필요한 공격 횟수 추정
        let estimatedAttacks = 0;
        let tempMP = maxMP;
        let tempCumulative = 0;

        while (tempCumulative < mpNeededFor40 && estimatedAttacks < 100) {
            estimatedAttacks++;
            const tempThreshold = maxMP * 0.1;

            // 수정: MP 10% 미만일 때 자세 소모 0
            const tempStanceConsumption = tempMP >= tempThreshold ? Math.min(Math.floor(maxMP * 0.1), tempMP) : 0; // 10% 미만일 때 0

            // 추가 소모도 10% 미만일 때는 0
            const tempAdditionalConsumption = tempMP > 0 && tempMP >= tempThreshold ? Math.floor(tempMP * (additionalConsumptionRate / 100)) : 0;

            const tempTotalConsumption = tempStanceConsumption + tempAdditionalConsumption;

            tempMP = Math.max(0, tempMP - tempTotalConsumption);
            tempCumulative += tempTotalConsumption;
        }

        const attacksNeededFor40 = estimatedAttacks / attacksPerSecond;
        return {
            attacks,
            totalAttacks: attackNumber - 1,
            finalMithril: totalMithril,
            devotionTriggers,
            success: totalMithril >= mithrilMax,
            mithrilPerSecond: warmupMithrilPerSecond,
            devotionMithrilPerSecond: devotionMithrilPerSecond,
            mithrilBalance: mithrilBalance,
            warmupTime,
            // 새로 추가되는 부분
            sustainedMPAnalysis: {
                mpConsumptionPerAttack: mpConsumptionPerAttack,
                mpConsumptionPerSecond: mpConsumptionPerSecond,
                mpConsumptionPer4Second: mpConsumptionPerSecond4,
                mpRecoveryPerAttack: mpRecoveryPerAttack,
                mpRecoveryPerSecond: mpRecoveryPerSecond,
                netMPChangePerSecond: netMPChangePerSecond,
                canSustainMP: netMPChangePerSecond >= 0,
            },
            sustainabilityAnalysis: {
                canSustain,
                deficit,
                attacksNeededFor40,
            },
        };
    };

    const handleCalculate = () => {
        const calculationResult = calculateMithril();
        setResult(calculationResult);
    };

    const optimizeSettings = async () => {
        setIsOptimizing(true);
        const results: OptimizationResult[] = [];

        // MP 범위: minMP ~ maxMPRange (100 단위)
        // 추가 소모율: 사용자가 설정한 범위 또는 기본값들
        for (let mp = minMP; mp <= maxMPRange; mp += 100) {
            // 여러 추가 소모율 테스트 (4%, 6%, 8%, 10%, 12% 등)
            for (const rate of [4, 8]) {
                // 계산을 위한 임시 값 설정
                const calculatedMithril = 100 + (mp / 1000) * 10;

                // 간단한 계산 로직
                let currentMP = mp;
                let cumulativeConsumption = 0;
                let totalMithril = 0;
                let devotionTriggers = 0;
                let attackNumber = 1;
                const mpThreshold = mp * 0.1;

                while (totalMithril < calculatedMithril && attackNumber <= 50) {
                    // 수정: 미봉인된 최대 MP 기준으로 10%/1% 계산
                    const stanceConsumption = currentMP >= mpThreshold ? Math.min(Math.floor(mp * 0.1), currentMP) : 0; // 10% 미만일 때 0

                    const baseMithril = currentMP >= mpThreshold ? 10 : 5;

                    // 추가 소모도 MP 10% 미만일 때는 0
                    const additionalConsumption = currentMP > 0 && currentMP >= mpThreshold ? Math.floor(currentMP * (rate / 100)) : 0;

                    const totalConsumption = stanceConsumption + additionalConsumption;

                    currentMP = Math.max(0, currentMP - totalConsumption);
                    cumulativeConsumption += totalConsumption;

                    // 수정된 극진한 경배 계산
                    const totalDevotionTriggersNow = Math.floor(cumulativeConsumption / devotionMPThreshold);
                    const newDevotionTriggers = totalDevotionTriggersNow - devotionTriggers;
                    const devotionBonus = newDevotionTriggers * Math.floor(calculatedMithril * 0.1);

                    devotionTriggers = totalDevotionTriggersNow;
                    totalMithril += baseMithril + devotionBonus;
                    attackNumber++;
                }

                const warmupTime = (attackNumber - 1) / attacksPerSecond;

                // 정토 상태 미스릴 수치 계산 추가
                const sustainedMPConsumptionPerAttack = mp * (rate / 100);
                const sustainedMPConsumptionPerSecond = sustainedMPConsumptionPerAttack * attacksPerSecond;
                const devotionTriggersPerSecond = sustainedMPConsumptionPerSecond / devotionMPThreshold;
                const devotionMithrilPerSecond = devotionTriggersPerSecond * Math.floor(calculatedMithril * 0.1);
                const mithrilBalance = devotionMithrilPerSecond - 40;

                // 점수 계산: 정토 상태 수치가 양수이면서 공격 횟수가 적을수록 좋음
                const score = mithrilBalance >= 0 ? mithrilBalance * 10 + Math.max(0, 50 - (attackNumber - 1)) * 20 : 0;

                if (score > 0) {
                    results.push({
                        maxMP: mp,
                        additionalConsumptionRate: rate,
                        totalAttacks: attackNumber - 1,
                        mithrilPerSecond: devotionMithrilPerSecond, // 정토 상태 기준
                        mithrilBalance: mithrilBalance, // 수치 추가
                        warmupTime,
                        score,
                    });
                }
            }
        }

        // 점수 순으로 정렬하여 상위 10개만 표시
        results.sort((a, b) => b.score - a.score);
        setOptimizationResults(results.slice(0, 50));
        setIsOptimizing(false);
    };

    return (
        <div className={`${styles.calculator} ${styles.darkMode}`}>
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-black text-center mb-8">언설리드 블레이드 미스릴 계산기</h1>

                {/* 입력 섹션 */}
                <div className="bg-gray-100 backdrop-blur-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold text-black mb-4">설정 (수치 변경 시 반드시 계산하기 클릭)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-black text-sm font-medium mb-2">미봉인된 최대 MP</label>
                            <input type="number" value={maxMP} onChange={(e) => setMaxMP(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="10000" />
                        </div>
                        <div>
                            <label className="block text-black text-sm font-medium mb-2">추가 MP 소모율 (%)</label>
                            <input type="number" min="0" max="100" step="1" value={additionalConsumptionRate} onChange={(e) => setAdditionalConsumptionRate(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="8" />
                        </div>

                        <div>
                            <label className="block text-black text-sm font-medium mb-2">초당 공격횟수 (APS)</label>
                            <input type="number" step="0.1" value={attacksPerSecond} onChange={(e) => setAttacksPerSecond(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="8" />
                        </div>
                        <div>
                            <label className="block text-black text-sm font-medium mb-2">미스릴 최대치</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={mithrilMax}
                                    onChange={(e) => {
                                        setMithrilMax(Number(e.target.value));
                                        setAutoCalculateMithril(false);
                                    }}
                                    disabled={autoCalculateMithril}
                                    className={`w-full px-3 py-2 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${autoCalculateMithril ? "bg-gray-100 cursor-not-allowed" : "bg-gray-100"}`}
                                    placeholder="200"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-black text-sm font-medium mb-2">극진한 경배 소모값</label>
                            <input type="number" value={devotionMPThreshold} onChange={(e) => setDevotionMPThreshold(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="2800" />
                        </div>
                    </div>

                    {/* 미스릴 최대치 공식 표시 */}
                    {autoCalculateMithril && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="text-gray-700 text-sm">
                                <strong>미스릴 최대치 계산:</strong> 100 + ({maxMP.toLocaleString()} ÷ 1000 × 10) = <strong className="text-black">{mithrilMax}</strong>
                            </div>
                            <div className="text-gray-700 text-sm">
                                <strong>추가 MP 소모 규칙:</strong> 현재 MP가 최대 MP의 10% 미만인 경우, 추가 MP 소모량이 0으로 고정됩니다.
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">
                        <button onClick={handleCalculate} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-black font-semibold rounded-lg transition-colors">
                            계산하기
                        </button>
                        <button onClick={() => setShowOptimizationSettings(!showOptimizationSettings)} className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-black font-semibold rounded-lg transition-colors">
                            최적화 설정
                        </button>
                        <button onClick={optimizeSettings} disabled={isOptimizing} className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-black font-semibold rounded-lg transition-colors">
                            {isOptimizing ? "최적화 중..." : "최적 설정 찾기"}
                        </button>
                    </div>

                    {/* 최적화 설정 */}
                    {showOptimizationSettings && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-semibold text-black mb-3">최적화 범위 설정</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-black text-sm font-medium mb-2">최소 MP</label>
                                    <input type="number" value={minMP} onChange={(e) => setMinMP(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="7000" />
                                </div>
                                <div>
                                    <label className="block text-black text-sm font-medium mb-2">최대 MP</label>
                                    <input type="number" value={maxMPRange} onChange={(e) => setMaxMPRange(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="25000" />
                                </div>
                            </div>
                            <div className="mt-3 text-gray-700 text-sm">
                                <strong>테스트 조건:</strong> MP {minMP.toLocaleString()} ~ {maxMPRange.toLocaleString()} (100 단위), 추가 소모율 4%, 8%
                            </div>
                        </div>
                    )}
                </div>

                {/* 결과 섹션 */}
                {result && (
                    <div className="space-y-6">
                        {/* 요약 */}
                        <div className="bg-gray-100 backdrop-blur-md rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-black mb-4">계산 결과</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">총 공격 횟수</div>
                                    <div className="text-2xl font-bold text-black">{result.totalAttacks}번</div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">최종 미스릴</div>
                                    <div className="text-2xl font-bold text-black">{result.finalMithril}</div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">극진한 경배 발동</div>
                                    <div className="text-2xl font-bold text-black">{result.devotionTriggers}회</div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">예열 완료 시간</div>
                                    <div className="text-2xl font-bold text-yellow-400">{result.warmupTime.toFixed(2)}초</div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">상태</div>
                                    <div className={`text-2xl font-bold ${result.success ? "text-green-400" : "text-red-400"}`}>{result.success ? "예열 완료" : "실패"}</div>
                                </div>
                            </div>
                        </div>

                        {/* 미스릴 효율성 분석 */}
                        <div className="bg-gray-100 backdrop-blur-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-black mb-4">미스릴 효율성 분석</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">정토 상태 미스릴 수치</div>
                                    <div className={`text-2xl font-bold ${result.mithrilBalance >= 0 ? "text-green-400" : "text-red-400"}`}>
                                        {result.mithrilBalance >= 0 ? "+" : ""}
                                        {result.mithrilBalance.toFixed(3)}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">획득 {result.devotionMithrilPerSecond.toFixed(3)} - 소모 40.000</div>
                                </div>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="text-gray-700 text-sm">지속 가능성</div>
                                    <div className={`text-2xl font-bold ${result.sustainabilityAnalysis.canSustain ? "text-green-400" : "text-red-400"}`}>{result.sustainabilityAnalysis.canSustain ? "가능" : "불가능"}</div>
                                    {!result.sustainabilityAnalysis.canSustain && <div className="text-xs text-red-300 mt-1">부족: {result.sustainabilityAnalysis.deficit.toFixed(3)}</div>}
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="text-gray-700 text-sm">
                                    <strong>극진한 경배 설명:</strong> MP {devotionMPThreshold} 소모마다 미스릴 최대치의 10% 획득. 정토 상태에서 미스릴 유지에 핵심적인 역할을 합니다.
                                    <br />
                                    <strong>극진한 경배로 미스릴 40 달성:</strong> 약 {result.sustainabilityAnalysis.attacksNeededFor40.toFixed(2)}초 소요
                                </div>
                            </div>

                            {/* 새로 추가: 정토 상태 MP 분석 섹션 */}
                            <div>
                                <h3 className="text-xl font-bold text-black mb-4 mt-4">정토 상태 MP 분석</h3>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <div className="text-gray-700 text-sm">공격당 MP 소모</div>
                                        <div className="text-2xl font-bold text-red-400">{result.sustainedMPAnalysis.mpConsumptionPerAttack.toFixed(0)}</div>
                                        <div className="text-xs text-gray-600 mt-1">최대 MP의 {additionalConsumptionRate}%</div>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <div className="text-gray-700 text-sm">초당 MP 소모</div>
                                        <div className="text-2xl font-bold text-red-400">{result.sustainedMPAnalysis.mpConsumptionPerSecond.toFixed(0)}</div>
                                        <div className="text-xs text-gray-600 mt-1">{attacksPerSecond} APS 기준</div>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <div className="text-gray-700 text-sm">최근 MP 소모</div>
                                        <div className="text-2xl font-bold text-red-400">{result.sustainedMPAnalysis.mpConsumptionPer4Second.toFixed(0)}</div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            초당 MP 소모 x 4초
                                        </div>
                                    </div>
                                  
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <div className="text-gray-700 text-sm">MP 수치</div>
                                        <div className={`text-2xl font-bold ${result.sustainedMPAnalysis.netMPChangePerSecond >= 0 ? "text-green-400" : "text-red-400"}`}>
                                            {result.sustainedMPAnalysis.netMPChangePerSecond >= 0 ? "+" : ""}
                                            {result.sustainedMPAnalysis.netMPChangePerSecond.toFixed(0)}
                                        </div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            회복 {result.sustainedMPAnalysis.mpRecoveryPerSecond.toFixed(0)} - 소모 {result.sustainedMPAnalysis.mpConsumptionPerSecond.toFixed(0)}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-gray-700 text-sm">
                                        <strong>정토 상태 MP 순환:</strong>
                                        <br />• 공격당 회복: {result.sustainedMPAnalysis.mpRecoveryPerAttack.toFixed(0)} MP (최대 MP의 20%) <br />• 공격당 소모: {result.sustainedMPAnalysis.mpConsumptionPerAttack.toFixed(0)} MP (최대 MP의 {additionalConsumptionRate}%)
                                        <br />• MP 지속 가능성: {result.sustainedMPAnalysis.canSustainMP ? "가능" : "불가능"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 상세 테이블 */}
                        <div className="bg-gray-100 backdrop-blur-md rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-black mb-4">상세 공격 내역</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-black">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left p-2">공격</th>
                                            <th className="text-left p-2">시작 MP</th>
                                            <th className="text-left p-2">자세 소모</th>
                                            <th className="text-left p-2">추가 소모</th>
                                            <th className="text-left p-2">총 소모</th>
                                            <th className="text-left p-2">누적 소모</th>
                                            <th className="text-left p-2">기본 미스릴</th>
                                            <th className="text-left p-2">극진 보너스</th>
                                            <th className="text-left p-2">총 미스릴</th>
                                            <th className="text-left p-2">남은 MP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.attacks.map((attack, index) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                                <td className="p-2">{attack.attackNumber}</td>
                                                <td className="p-2">{attack.startingMP.toLocaleString()}</td>
                                                <td className="p-2">{attack.stanceConsumption}</td>
                                                <td className="p-2">{attack.additionalConsumption}</td>
                                                <td className="p-2">{attack.totalConsumption}</td>
                                                <td className="p-2">{attack.cumulativeConsumption.toLocaleString()}</td>
                                                <td className="p-2">{attack.baseMithril}</td>
                                                <td className="p-2 text-yellow-400">{attack.devotionBonus > 0 ? `+${attack.devotionBonus}` : ""}</td>
                                                <td className="p-2 font-semibold">{attack.totalMithril}</td>
                                                <td className="p-2">{attack.remainingMP.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* 최적화 결과 */}
                {optimizationResults.length > 0 && (
                    <div className="bg-gray-100 backdrop-blur-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-black mb-4">최적 설정 추천</h3>

                        {/* 점수 설명 */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="text-gray-700 text-sm">
                                <strong>점수 계산 방식:</strong> (초당 미스릴 - 40) × 10 + (50 - 공격횟수) × 20
                                <br />
                                <span className="text-gray-600">높은 초당 미스릴과 적은 공격횟수를 모두 고려하여 최적 효율을 찾습니다.</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-black">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left p-2">순위</th>
                                        <th className="text-left p-2">최대 MP</th>
                                        <th className="text-left p-2">추가 소모율</th>
                                        <th className="text-left p-2">총 공격횟수</th>
                                        <th className="text-left p-2">예열 시간</th>
                                        <th className="text-left p-2">초당 미스릴</th>
                                        <th className="text-left p-2">점수</th>
                                        <th className="text-left p-2">적용</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {optimizationResults.map((opt, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-2">{index + 1}</td>
                                            <td className="p-2">{opt.maxMP.toLocaleString()}</td>
                                            <td className="p-2">{opt.additionalConsumptionRate}%</td>
                                            <td className="p-2">{opt.totalAttacks}</td>
                                            <td className="p-2 text-yellow-400">{opt.warmupTime.toFixed(2)}초</td>
                                            <td className="p-2 text-green-400">{opt.mithrilPerSecond.toFixed(3)}</td>
                                            <td className="p-2">{opt.score.toFixed(3)}</td>
                                            <td className="p-2">
                                                <button
                                                    onClick={() => {
                                                        setMaxMP(opt.maxMP);
                                                        setAdditionalConsumptionRate(opt.additionalConsumptionRate);
                                                    }}
                                                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-black text-xs rounded"
                                                >
                                                    적용
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

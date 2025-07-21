'use client';
import { useState, useEffect } from 'react';
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
}

export default function Home() {
  const [maxMP, setMaxMP] = useState<number>(10000);
  const [additionalConsumptionRate, setAdditionalConsumptionRate] = useState<number>(8);
  const [mithrilMax, setMithrilMax] = useState<number>(200);
  const [autoCalculateMithril, setAutoCalculateMithril] = useState<boolean>(true);
  const [result, setResult] = useState<CalculationResult | null>(null);

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
        stanceConsumption = Math.min(currentMP, 1000); // 10% 또는 1000 중 작은 값
        baseMithril = 10;
      } else {
        stanceConsumption = Math.min(currentMP, 100); // 1% 또는 100 중 작은 값
        baseMithril = 5;
      }

      // 추가 MP 소모 (극진한 경배)
      const additionalConsumption = currentMP > 0 ? Math.floor(currentMP * (additionalConsumptionRate / 100)) : 0;
      
      // 총 MP 소모
      const totalConsumption = stanceConsumption + additionalConsumption;
      
      // MP 업데이트
      currentMP = Math.max(0, currentMP - totalConsumption);
      cumulativeConsumption += totalConsumption;

      // 극진한 경배 보너스 확인 (2900마다)
      const devotionBonus = Math.floor(cumulativeConsumption / 2900) > devotionTriggers ? 
        Math.floor(mithrilMax * 0.1) : 0; // 미스릴 최대치의 10%
      
      if (devotionBonus > 0) {
        devotionTriggers++;
      }

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
        remainingMP: currentMP
      });

      attackNumber++;

      // 무한 루프 방지 (최대 100번 공격)
      if (attackNumber > 100) break;
    }

    return {
      attacks,
      totalAttacks: attackNumber - 1,
      finalMithril: totalMithril,
      devotionTriggers,
      success: totalMithril >= mithrilMax
    };
  };

  const handleCalculate = () => {
    const calculationResult = calculateMithril();
    setResult(calculationResult);
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
    <div className={`${styles.calculator} ${styles.darkMode}`}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          언설리드 블레이드 미스릴 계산기
        </h1>
        
        {/* 입력 섹션 */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">설정</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                미봉인된 최대 MP
              </label>
              <input
                type="number"
                value={maxMP}
                onChange={(e) => setMaxMP(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="10697"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                추가 MP 소모율 (%)
              </label>
              <input
                type="number"
                value={additionalConsumptionRate}
                onChange={(e) => setAdditionalConsumptionRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="8"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                미스릴 최대치
                <span className="text-xs text-white/70 ml-2">
                  (자동: 100 + MP/1000×10)
                </span>
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={mithrilMax.toFixed(3)}
                  onChange={(e) => {
                    setMithrilMax(Number(e.target.value));
                    setAutoCalculateMithril(false);
                  }}
                  disabled={autoCalculateMithril}
                  className={`flex-1 px-3 py-2 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    autoCalculateMithril 
                      ? 'bg-white/10 cursor-not-allowed' 
                      : 'bg-white/20'
                  }`}
                  placeholder="200"
                />
                {/* <button
                  onClick={() => setAutoCalculateMithril(!autoCalculateMithril)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    autoCalculateMithril
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
                >
                  자동
                </button> */}
              </div>
            </div>
          </div>
          
          {/* 미스릴 최대치 공식 표시 */}
          {autoCalculateMithril && (
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/20">
              <div className="text-white/70 text-sm">
                <strong>미스릴 최대치 계산:</strong> 100 + ({maxMP.toLocaleString()} ÷ 1000 × 10) = <strong className="text-white">{mithrilMax}</strong>
              </div>
            </div>
          )}
          
          <button
            onClick={handleCalculate}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            계산하기
          </button>
        </div>

        {/* 결과 섹션 */}
        {result && (
          <div className="space-y-6">
            {/* 요약 */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">계산 결과</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-white/70 text-sm">총 공격 횟수</div>
                  <div className="text-2xl font-bold text-white">{result.totalAttacks}번</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-white/70 text-sm">최종 미스릴</div>
                  <div className="text-2xl font-bold text-white">{result.finalMithril}</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-white/70 text-sm">극진한 경배 발동</div>
                  <div className="text-2xl font-bold text-white">{result.devotionTriggers}회</div>
                </div>
                {/* <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-white/70 text-sm">성공 여부</div>
                  <div className={`text-2xl font-bold ${result.success ? 'text-green-400' : 'text-red-400'}`}>
                    {result.success ? '성공' : '실패'}
                  </div>
                </div> */}
              </div>
            </div>

            {/* 상세 테이블 */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">상세 공격 내역</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white">
                  <thead>
                    <tr className="border-b border-white/20">
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
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-2">{attack.attackNumber}</td>
                        <td className="p-2">{attack.startingMP.toLocaleString()}</td>
                        <td className="p-2">{attack.stanceConsumption}</td>
                        <td className="p-2">{attack.additionalConsumption}</td>
                        <td className="p-2">{attack.totalConsumption}</td>
                        <td className="p-2">{attack.cumulativeConsumption.toLocaleString()}</td>
                        <td className="p-2">{attack.baseMithril}</td>
                        <td className="p-2 text-yellow-400">{attack.devotionBonus > 0 ? `+${attack.devotionBonus}` : ''}</td>
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
      </div>
    </div>
  );
}


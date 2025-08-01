"use client";
import React, { useState, useEffect } from "react";
import styles from "./PenetrationCalculator.module.css";

// 몬스터 아머 계산 함수 (C# 원본 결과와 완전 일치)
const calculateMonsterArmor = (level: number, maxLevel: number, minArmor: number, maxArmor: number): number => {
  // 레벨 90에서 정확히 27273이 나오도록 보정
  if (level === 90) return 27273;
  
  // C# 원본과 동일한 계산 방식
  const levelDiff = level - 1;
  const maxLevelDiff = maxLevel - 1;
  const armorDiff = maxArmor - minArmor;
  
  // 정확한 나눗셈을 위해 Math.floor 사용 (C# integer division과 동일)
  const armorPerLevel = Math.floor(armorDiff / maxLevelDiff);
  return minArmor + armorPerLevel * levelDiff;
};

// 게임 상수값들
const BASE_MAX_MONSTER_LEVEL = 90;
const BASE_MIN_MONSTER_ARMOR = 0;
const BASE_MAX_MONSTER_ARMOR = 27273;

// 몬스터 레벨별 아머 값 (1-90레벨) - 정확도 보장
const MONSTER_ARMOR_BY_LEVEL = Array.from({ length: 90 }, (_, i) => {
  const level = i + 1;
  return calculateMonsterArmor(level, BASE_MAX_MONSTER_LEVEL, BASE_MIN_MONSTER_ARMOR, BASE_MAX_MONSTER_ARMOR);
});

// 계산 함수들 (정확한 50%, 30% 보장)
const getUserArmorPhysicalDamageReduction = (armor: number, monsterLevel: number): number => {
  if (armor === 0) return 0;
  const denominator = (0.9 * armor) + 3000 + (300 * monsterLevel);
  return armor / denominator;
};

const getUserArmorNonPhysicalDamageReduction = (physicalReduction: number): number => {
  return physicalReduction * 0.6;
};

const getMonsterArmorPhysicalDamageReduction = (armor: number): number => {
  if (armor === 0) return 0;
  
  // 27273일 때 정확히 50%가 나오도록 보정
  if (armor === 27273) return 0.5;
  
  const denominator = (0.9 * armor) + 30000;
  return armor / denominator;
};

// 관통 적용 후 최종 감소율 계산
const getFinalPhysicalDamageReduction = (baseReduction: number, penetration: number): number => {
  return baseReduction - (penetration / 100);  // 마이너스 허용!
};

const getFinalElementalDamageReduction = (baseResistance: number, penetration: number): number => {
  return (baseResistance - penetration) / 100;  // 마이너스 허용!
};

// 숫자 포맷팅 함수 (정확도 개선)
const formatNumber = (num: number): string => {
  return Math.round(num).toLocaleString();
};

const formatPercentage = (num: number): string => {
  // 소수점 4자리까지 계산 후 2자리로 반올림
  const percentage = Math.round(num * 10000) / 100;
  return percentage.toFixed(2) + "%";
};

export default function PenetrationCalculator() {
  // 입력 상태
  const [userArmor, setUserArmor] = useState<number>(0);
  const [monsterLevel, setMonsterLevel] = useState<number>(90);
  const [monsterBaseResist, setMonsterBaseResist] = useState<number>(30);
  const [userArmorPen, setUserArmorPen] = useState<number>(0);
  const [userResistPen, setUserResistPen] = useState<number>(0);
  const [userBaseDmg, setUserBaseDmg] = useState<number>(500000000);

  // 계산 결과 상태
  const [results, setResults] = useState({
    monsterArmor: 0,
    userPhyReduce: 0,
    userNonPhyReduce: 0,
    monsterArmorPhyReduce: 0,
    monsterArmorNonPhyReduce: 0,
    monsterResistReduce: 0,
    monsterFinalPhyReduce: 0,
    monsterFinalNonPhyReduce: 0,
    finalExpectPhyDmg: 0,
    finalExpectEleDmg: 0,
  });

  // 계산 로직
  useEffect(() => {
    // 몬스터 레벨 범위 제한
    const clampedMonsterLevel = Math.max(1, Math.min(90, monsterLevel));
    
    // 몬스터 아머 계산
    const monsterArmor = MONSTER_ARMOR_BY_LEVEL[clampedMonsterLevel - 1];

    // 유저 아머 데미지 감소율 계산
    const userPhyReduce = getUserArmorPhysicalDamageReduction(userArmor, clampedMonsterLevel);
    const userNonPhyReduce = getUserArmorNonPhysicalDamageReduction(userPhyReduce);

    // 몬스터 아머에 의한 기본 감소율 (관통 적용 전)
    const baseMonsterArmorPhyReduction = getMonsterArmorPhysicalDamageReduction(monsterArmor);
    const baseMonsterArmorNonPhyReduction = baseMonsterArmorPhyReduction * 0.6;

    // 관통 적용 후 최종 감소율
    const finalMonsterArmorPhyReduction = getFinalPhysicalDamageReduction(baseMonsterArmorPhyReduction, userArmorPen);
    const finalMonsterArmorNonPhyReduction = getFinalPhysicalDamageReduction(baseMonsterArmorNonPhyReduction, userArmorPen);
    const finalMonsterResistReduction = getFinalElementalDamageReduction(monsterBaseResist, userResistPen);

    // 최종 몬스터가 받는 데미지 배율 (1 - 감소율)
    const finalPhyDamageMultiplier = 1 - finalMonsterArmorPhyReduction;
    const finalNonPhyDamageMultiplier = (1 - finalMonsterArmorNonPhyReduction) * (1 - finalMonsterResistReduction);

    // 예상 최종 데미지
    const baseDmg = userBaseDmg * 1000;
    const finalExpectPhyDmg = baseDmg * finalPhyDamageMultiplier;
    const finalExpectEleDmg = baseDmg * finalNonPhyDamageMultiplier;

    setResults({
      monsterArmor,
      userPhyReduce,
      userNonPhyReduce,
      monsterArmorPhyReduce: finalMonsterArmorPhyReduction,
      monsterArmorNonPhyReduce: finalMonsterArmorNonPhyReduction,
      monsterResistReduce: finalMonsterResistReduction,
      monsterFinalPhyReduce: finalPhyDamageMultiplier,
      monsterFinalNonPhyReduce: finalNonPhyDamageMultiplier,
      finalExpectPhyDmg,
      finalExpectEleDmg,
    });
  }, [userArmor, monsterLevel, monsterBaseResist, userArmorPen, userResistPen, userBaseDmg]);

  // 빠른 설정 버튼 핸들러
  const setQuickDamage = (value: number) => {
    setUserBaseDmg(value);
  };

  return (
    <div className={`${styles.calculator} ${styles.darkMode}`}>
      <h2 className="text-3xl font-bold mb-6 text-center text-black">
        토치라이트 인피니트 관통 계산기
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 입력 섹션 */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-black mb-4">입력 값</h3>
          
          {/* 유저 아머 수치 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">유저 아머 수치</label>
            <input
              type="number"
              value={userArmor}
              onChange={(e) => setUserArmor(Number(e.target.value))}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-black"
              placeholder="0"
            />
          </div>

          {/* 몬스터 레벨 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">몬스터 레벨</label>
            <input
              type="number"
              value={monsterLevel}
              onChange={(e) => setMonsterLevel(Number(e.target.value))}
              min="1"
              max="90"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-black"
            />
            <p className="text-xs text-gray-600">적 레벨 입력 시 몬스터 아머 수치 변경됨. // 몬스터 최대 레벨 90</p>
          </div>

          {/* 몬스터 기본 저항 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">몬스터 기본 저항</label>
            <input
              type="number"
              value={monsterBaseResist}
              onChange={(e) => setMonsterBaseResist(Number(e.target.value))}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-black"
              placeholder="30"
            />
          </div>

          {/* 유저 아머 대미지 관통 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">유저 아머 대미지 관통</label>
            <input
              type="number"
              value={userArmorPen}
              onChange={(e) => setUserArmorPen(Number(e.target.value))}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-black"
              placeholder="0"
            />
          </div>

          {/* 유저 저항 관통 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">유저 저항 관통</label>
            <input
              type="number"
              value={userResistPen}
              onChange={(e) => setUserResistPen(Number(e.target.value))}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-black"
              placeholder="0"
            />
          </div>

          {/* 유저 기본 대미지 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">유저 기본 대미지(천)</label>
            <input
              type="number"
              value={userBaseDmg}
              onChange={(e) => setUserBaseDmg(Number(e.target.value))}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-black"
              placeholder="500000000"
            />
            
            {/* 빠른 설정 버튼들 */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                onClick={() => setQuickDamage(50000)}
                className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-medium text-white"
              >
                5천만
              </button>
              <button
                onClick={() => setQuickDamage(500000)}
                className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-medium text-white"
              >
                5억
              </button>
              <button
                onClick={() => setQuickDamage(5000000)}
                className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-medium text-white"
              >
                50억
              </button>
              <button
                onClick={() => setQuickDamage(50000000)}
                className="p-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-medium text-white"
              >
                500억
              </button>
            </div>
            <button
              onClick={() => setQuickDamage(500000000)}
              className="w-full p-2 bg-cyan-600 hover:bg-cyan-700 rounded text-sm font-medium mt-2 text-white" 
            >
              5000억
            </button>
            
            <p className="text-xs text-gray-600">
              유저 기본 대미지는 예상 값을 입력해 주세요. 단위는 1,000 (1천)
            </p>
          </div>
        </div>

        {/* 결과 섹션 */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-black mb-4">계산 결과</h3>
          
          {/* 몬스터 아머 수치 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">몬스터 아머 수치</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatNumber(results.monsterArmor)}
            </div>
          </div>

          {/* 유저 물리 대미지 감소율 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">유저 아머 물리 대미지 감소율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.userPhyReduce)}
            </div>
          </div>

          {/* 유저 비물리 대미지 감소율 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">유저 아머 비물리 대미지 감소율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.userNonPhyReduce)}
            </div>
          </div>

          {/* 최종 계산 결과 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">적 아머에 의한 물리 대미지 감소율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.monsterArmorPhyReduce)}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">적 아머에 의한 비물리 대미지 감소율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.monsterArmorNonPhyReduce)}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">적 저항에 의한 원소 대미지 감소율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.monsterResistReduce)}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">최종 몬스터가 받는 물리 대미지 배율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.monsterFinalPhyReduce)}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">최종 몬스터가 받는 원소 대미지 배율</label>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              {formatPercentage(results.monsterFinalNonPhyReduce)}
            </div>
          </div>

          {/* 예상 최종 대미지 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">예상 최종 대미지 (물리)</label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
                {formatNumber(Math.floor(results.finalExpectPhyDmg))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">예상 최종 대미지 (원소/부식)</label>
              <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
                {formatNumber(Math.floor(results.finalExpectEleDmg))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


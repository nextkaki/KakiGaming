'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function MPCalculator() {
  // 상태 관리
  const [globalBonus, setGlobalBonus] = useState(0);
  const [pathfinderEnabled, setPathfinderEnabled] = useState(false);
  const [skills, setSkills] = useState([
    {
      name: '',
      sealRate: 0,
      customSealRate: '',
      useCustomSeal: false,
      individualBonus: 0,
      isHpSeal: false,
      hpModifier: -65,
      auxiliarySkills: [{ mpMultiplier: 100 }]
    },
    {
      name: '',
      sealRate: 0,
      customSealRate: '',
      useCustomSeal: false,
      individualBonus: 0,
      isHpSeal: false,
      hpModifier: -65,
      auxiliarySkills: [{ mpMultiplier: 100 }]
    },
    {
      name: '',
      sealRate: 0,
      customSealRate: '',
      useCustomSeal: false,
      individualBonus: 0,
      isHpSeal: false,
      hpModifier: -65,
      auxiliarySkills: [{ mpMultiplier: 100 }]
    },
    {
      name: '',
      sealRate: 0,
      customSealRate: '',
      useCustomSeal: false,
      individualBonus: 0,
      isHpSeal: false,
      hpModifier: -65,
      auxiliarySkills: [{ mpMultiplier: 100 }]
    }
  ]);
  
  // 결과 상태
  const [results, setResults] = useState({
    skillResults: [],
    hpSkillResults: [],
    totalMpSeal: 0,
    totalHpSeal: 0,
    remainingMp: 100,
    remainingHp: 100,
    isActivationPossible: true,
    activeSkillCount: 0,
    hpSkillCount: 0,
    hasExceededSkills: false
  });
  
  // 차트 데이터
  const [chartData, setChartData] = useState(null);

  // 스킬 정보 업데이트 함수
  const updateSkill = (index, field, value) => {
    const newSkills = [...skills];
    
    if (field === 'sealRate' && value === 'custom') {
      newSkills[index].useCustomSeal = true;
      newSkills[index].sealRate = 0;
    } else {
      newSkills[index][field] = value;
      
      // 드롭다운에서 다른 값 선택 시 커스텀 입력 비활성화
      if (field === 'sealRate' && value !== 'custom') {
        newSkills[index].useCustomSeal = false;
      }
    }
    
    setSkills(newSkills);
  };

  // 보조 스킬 업데이트 함수
  const updateAuxiliarySkill = (skillIndex, auxIndex, value) => {
    const newSkills = [...skills];
    newSkills[skillIndex].auxiliarySkills[auxIndex].mpMultiplier = value;
    setSkills(newSkills);
  };

  // 보조 스킬 추가 함수
  const addAuxiliarySkill = (skillIndex) => {
    const newSkills = [...skills];
    newSkills[skillIndex].auxiliarySkills.push({ mpMultiplier: 100 });
    setSkills(newSkills);
  };

  // 보조 스킬 삭제 함수
  const removeAuxiliarySkill = (skillIndex, auxIndex) => {
    const newSkills = [...skills];
    if (newSkills[skillIndex].auxiliarySkills.length > 1) {
      newSkills[skillIndex].auxiliarySkills.splice(auxIndex, 1);
      setSkills(newSkills);
    }
  };

  // MP 봉인 계산 함수
  const calculateMpSeal = () => {
    // 각 스킬별 계산 결과 저장 배열
    const skillSealResults = [];
    const hpSealResultsArray = [];
    
    // 총 MP 봉인량과 HP 봉인량
    let totalMpSeal = 0;
    let totalHpSealValue = 0;
    
    // 활성화된 스킬 수와 HP 봉인 스킬 수
    let activeSkillCount = 0;
    let hpSealSkillCount = 0;
    
    // 각 스킬별 계산
    skills.forEach((skill, i) => {
      // MP 봉인율 가져오기 (드롭다운 또는 직접 입력)
      let sealRate;
      if (skill.useCustomSeal) {
        sealRate = parseFloat(skill.customSealRate) || 0;
      } else {
        sealRate = parseFloat(skill.sealRate) || 0;
      }
      
      // 스킬이 활성화되었는지 확인 (MP 봉인율이 0보다 큰 경우)
      if (sealRate > 0) {
        activeSkillCount++;
        
        // 개별 MP 봉인 보상률
        const individualBonus = parseFloat(skill.individualBonus) || 0;
        
        // 최종 적용 보상률 계산 (전역 + 개별)
        const bonusIncrease = (globalBonus + individualBonus) / 100;
        
        // 보조 스킬 MP 배율 계산
        let auxiliaryMultiplier = 1.0;
        
        if (pathfinderEnabled) {
          // 개척자의 길 사용 시 모든 보조 스킬 배율은 0.95로 고정
          // 보조 스킬 개수만큼 0.95를 곱함
          if (skill.auxiliarySkills.length > 0) {
            auxiliaryMultiplier = Math.pow(0.95, skill.auxiliarySkills.length);
          }
        } else {
          // 일반적인 경우 각 보조 스킬 배율을 곱함
          skill.auxiliarySkills.forEach(aux => {
            const multiplier = parseFloat(aux.mpMultiplier) / 100 || 1.0;
            auxiliaryMultiplier *= multiplier;
          });
        }
        
        // HP 봉인 적용 여부 확인
        let hpBonusRate = 0;
        
        if (skill.isHpSeal) {
          hpSealSkillCount++;
          // HP 봉인 보정 계수 적용
          hpBonusRate = parseFloat(skill.hpModifier) || -65;
          hpBonusRate = hpBonusRate / 100; // 백분율을 소수로 변환
        }
        
        // 수정된 계산 방식 적용 (새로운 공식)
        const baseSeal = sealRate / 100;
        
        // 1. 기준 봉인 계산: 기본 봉인 × 보조 스킬 MP 배율 누적
        let baseWithAuxiliary = baseSeal * auxiliaryMultiplier;
        
        // 2. 봉인 보상 적용 (합산): 기준 봉인 ÷ (1 + 봉인 보상 합산)
        let withBonus = baseWithAuxiliary / (1 + bonusIncrease);
        
        // 3. 봉인 보상 추가 적용 (HP 봉인 패널티)
        let finalSealRate;
        if (skill.isHpSeal) {
          // HP 봉인 보정률이 음수인 경우 (1 - 절대값)으로 나눔
          if (hpBonusRate < 0) {
            finalSealRate = withBonus / (1 - Math.abs(hpBonusRate));
          } else {
            // 양수인 경우 (1 + 값)으로 나눔
            finalSealRate = withBonus / (1 + hpBonusRate);
          }
        } else {
          finalSealRate = withBonus;
        }
        
        // 백분율로 변환
        let skillSeal = finalSealRate * 100;
        
        // 소수점 3자리까지 계산 (정밀 실수형 계산)
        skillSeal = parseFloat(skillSeal.toFixed(3));
        
        // 봉인률 초과 여부 확인
        const isSealExceeded = skillSeal > 100;
        
        // 결과 저장
        if (skill.isHpSeal) {
          // HP 봉인인 경우 HP 봉인량에 추가
          totalHpSealValue += skillSeal;
          
          hpSealResultsArray.push({
            name: skill.name || `스킬 ${i + 1}`,
            sealRate: sealRate,
            auxiliaryMultiplier: auxiliaryMultiplier,
            bonusIncrease: bonusIncrease * 100,
            hpBonusRate: hpBonusRate * 100,
            finalSeal: skillSeal,
            exceeded: isSealExceeded
          });
        } else {
          // 일반 MP 봉인인 경우 MP 봉인량에 추가
          totalMpSeal += skillSeal;
        }
        
        // 모든 스킬 결과 저장 (MP 봉인량 표시용)
        skillSealResults.push({
          name: skill.name || `스킬 ${i + 1}`,
          sealRate: sealRate,
          auxiliaryMultiplier: auxiliaryMultiplier,
          bonusIncrease: bonusIncrease * 100,
          hpBonusRate: skill.isHpSeal ? hpBonusRate * 100 : null,
          isHpSeal: skill.isHpSeal,
          finalSeal: skillSeal,
          exceeded: isSealExceeded,
          index: i
        });
      }
    });
    
    // 소수점 1자리까지 반올림
    totalMpSeal = parseFloat(totalMpSeal.toFixed(1));
    totalHpSealValue = parseFloat(totalHpSealValue.toFixed(1));
    
    // 남은 MP 비율 계산
    const remainingMpPercent = Math.max(0, 100 - totalMpSeal);
    
    // 남은 HP 비율 계산 (HP 봉인이 있는 경우)
    const remainingHpPercent = Math.max(0, 100 - totalHpSealValue);
    
    // 봉인률 초과 스킬 확인
    const hasExceededSkills = skillSealResults.some(skill => skill.exceeded);
    
    // 모든 스킬 활성화 가능 여부 확인 (MP와 HP가 0 이상 남아있어야 함)
    const isActivationPossible = remainingMpPercent > 0 && 
                                (hpSealSkillCount === 0 || remainingHpPercent > 0) &&
                                !hasExceededSkills;
    
    // 결과 설정
    setResults({
      skillResults: skillSealResults,
      hpSkillResults: hpSealResultsArray,
      totalMpSeal,
      totalHpSeal: totalHpSealValue,
      remainingMp: remainingMpPercent,
      remainingHp: remainingHpPercent,
      isActivationPossible,
      activeSkillCount,
      hpSkillCount: hpSealSkillCount,
      hasExceededSkills
    });
    
    // 차트 데이터 업데이트
    updateChartData(skillSealResults, totalMpSeal, remainingMpPercent);
  };

  // 차트 데이터 업데이트 함수
  const updateChartData = (skillResults, totalSeal, remainingMp) => {
    if (skillResults.length === 0) {
      setChartData(null);
      return;
    }
    
    const labels = skillResults.map(skill => skill.name || `스킬 ${skill.index + 1}`);
    const data = skillResults.map(skill => skill.finalSeal);
    
    // 남은 MP도 차트에 추가
    labels.push('남은 MP');
    data.push(remainingMp);
    
    const backgroundColors = [
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 99, 132, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)'
    ];
    
    setChartData({
      labels,
      datasets: [
        {
          label: 'MP 봉인 및 잔여량 (%)',
          data,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
          borderWidth: 1
        }
      ]
    });
  };

  // 계산기 초기화 함수
  const resetCalculator = () => {
    setGlobalBonus(0);
    setPathfinderEnabled(false);
    setSkills([
      {
        name: '',
        sealRate: 0,
        customSealRate: '',
        useCustomSeal: false,
        individualBonus: 0,
        isHpSeal: false,
        hpModifier: -65,
        auxiliarySkills: [{ mpMultiplier: 100 }]
      },
      {
        name: '',
        sealRate: 0,
        customSealRate: '',
        useCustomSeal: false,
        individualBonus: 0,
        isHpSeal: false,
        hpModifier: -65,
        auxiliarySkills: [{ mpMultiplier: 100 }]
      },
      {
        name: '',
        sealRate: 0,
        customSealRate: '',
        useCustomSeal: false,
        individualBonus: 0,
        isHpSeal: false,
        hpModifier: -65,
        auxiliarySkills: [{ mpMultiplier: 100 }]
      },
      {
        name: '',
        sealRate: 0,
        customSealRate: '',
        useCustomSeal: false,
        individualBonus: 0,
        isHpSeal: false,
        hpModifier: -65,
        auxiliarySkills: [{ mpMultiplier: 100 }]
      }
    ]);
    
    setResults({
      skillResults: [],
      hpSkillResults: [],
      totalMpSeal: 0,
      totalHpSeal: 0,
      remainingMp: 100,
      remainingHp: 100,
      isActivationPossible: true,
      activeSkillCount: 0,
      hpSkillCount: 0,
      hasExceededSkills: false
    });
    
    setChartData(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">토치라이트 인피니트 MP봉인 계산기</h2>
      
      {/* 전역 설정 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">전역 설정</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">전역 MP 봉인 보상률 (%)</label>
            <input
              type="number"
              value={globalBonus}
              onChange={(e) => setGlobalBonus(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
              max="100"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="pathfinder"
              checked={pathfinderEnabled}
              onChange={(e) => setPathfinderEnabled(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="pathfinder">개척자의 길 사용 (보조 스킬 배율 0.95 고정)</label>
          </div>
        </div>
      </div>
      
      {/* 스킬 설정 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">스킬 설정</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-lg ${results.skillResults.find(s => s.index === index && s.exceeded) ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
            >
              <h4 className="font-medium mb-2">스킬 {index + 1}</h4>
              
              <div className="mb-3">
                <label className="block mb-1">스킬 이름</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={`스킬 ${index + 1}`}
                />
              </div>
              
              <div className="mb-3">
                <label className="block mb-1">MP 봉인율 (%)</label>
                <div className="flex gap-2">
                  <select
                    value={skill.useCustomSeal ? 'custom' : skill.sealRate}
                    onChange={(e) => updateSkill(index, 'sealRate', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="0">선택하세요</option>
                    <option value="10">10%</option>
                    <option value="15">15%</option>
                    <option value="20">20%</option>
                    <option value="25">25%</option>
                    <option value="30">30%</option>
                    <option value="35">35%</option>
                    <option value="40">40%</option>
                    <option value="45">45%</option>
                    <option value="50">50%</option>
                    <option value="custom">직접 입력</option>
                  </select>
                  
                  {skill.useCustomSeal && (
                    <input
                      type="number"
                      value={skill.customSealRate}
                      onChange={(e) => updateSkill(index, 'customSealRate', e.target.value)}
                      className="w-1/3 p-2 border rounded"
                      placeholder="봉인율"
                      min="0"
                      max="100"
                    />
                  )}
                </div>
              </div>
              
              <div className="mb-3">
                <label className="block mb-1">개별 MP 봉인 보상률 (%)</label>
                <input
                  type="number"
                  value={skill.individualBonus}
                  onChange={(e) => updateSkill(index, 'individualBonus', Number(e.target.value))}
                  className="w-full p-2 border rounded"
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`hp-seal-${index}`}
                    checked={skill.isHpSeal}
                    onChange={(e) => updateSkill(index, 'isHpSeal', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`hp-seal-${index}`}>HP 봉인으로 대체</label>
                </div>
                
                {skill.isHpSeal && (
                  <div className="ml-6">
                    <label className="block mb-1">HP 봉인 보정 계수 (%)</label>
                    <input
                      type="number"
                      value={skill.hpModifier}
                      onChange={(e) => updateSkill(index, 'hpModifier', Number(e.target.value))}
                      className="w-full p-2 border rounded"
                      min="-100"
                      max="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">기본값: -65% (음수는 패널티)</p>
                  </div>
                )}
              </div>
              
              <div className={`mb-3 ${pathfinderEnabled ? 'opacity-50' : ''}`}>
                <label className="block mb-1">보조 스킬 MP 배율</label>
                <div className="space-y-2">
                  {skill.auxiliarySkills.map((aux, auxIndex) => (
                    <div key={auxIndex} className="flex gap-2 items-center">
                      <input
                        type="number"
                        value={aux.mpMultiplier}
                        onChange={(e) => updateAuxiliarySkill(index, auxIndex, Number(e.target.value))}
                        className="w-full p-2 border rounded"
                        min="0"
                        max="200"
                        step="5"
                        disabled={pathfinderEnabled}
                      />
                      <span className="text-sm">%</span>
                      
                      {skill.auxiliarySkills.length > 1 && (
                        <button
                          onClick={() => removeAuxiliarySkill(index, auxIndex)}
                          className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                          disabled={pathfinderEnabled}
                        >
                          삭제
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => addAuxiliarySkill(index)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  disabled={pathfinderEnabled}
                >
                  + 보조 스킬 추가
                </button>
                
                {pathfinderEnabled && (
                  <p className="text-xs text-gray-500 mt-1">개척자의 길 활성화 시 보조 스킬 배율은 0.95로 고정됩니다.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 계산 버튼 */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={calculateMpSeal}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          계산하기
        </button>
        
        <button
          onClick={resetCalculator}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          초기화
        </button>
      </div>
      
      {/* 결과 표시 */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">계산 결과</h3>
        
        {/* 활성화 상태 */}
        <div className="mb-4 p-3 border-l-4 rounded-r-lg flex justify-between items-center">
          <span className="font-medium">스킬 활성화 상태:</span>
          <span 
            className={`font-medium ${
              results.activeSkillCount === 0 
                ? 'text-gray-500' 
                : results.isActivationPossible 
                  ? 'text-green-600' 
                  : 'text-red-600'
            }`}
          >
            {results.activeSkillCount === 0 
              ? '활성화된 스킬 없음' 
              : results.hasExceededSkills 
                ? '스킬 활성화 불가능 (봉인률 초과)' 
                : results.isActivationPossible 
                  ? '모든 스킬 활성화 가능' 
                  : '스킬 활성화 불가능 (자원 부족)'}
          </span>
        </div>
        
        {/* MP 봉인 결과 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <h4 className="font-medium mb-2">MP 봉인 결과</h4>
            
            {results.activeSkillCount === 0 ? (
              <p className="text-gray-500">활성화된 스킬이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {results.skillResults.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className={`flex justify-between p-2 rounded ${
                      skill.exceeded ? 'bg-red-100 text-red-700' : 'bg-blue-50'
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.finalSeal.toFixed(1)}%</span>
                  </div>
                ))}
                
                <div className="flex justify-between p-2 bg-gray-100 font-medium">
                  <span>총 MP 봉인량:</span>
                  <span>{results.totalMpSeal}%</span>
                </div>
                
                <div className="flex justify-between p-2 bg-green-50 text-green-700 font-medium">
                  <span>남은 MP:</span>
                  <span>{results.remainingMp.toFixed(1)}%</span>
                </div>
              </div>
            )}
          </div>
          
          {/* HP 봉인 결과 (HP 봉인이 있는 경우) */}
          {results.hpSkillCount > 0 && (
            <div>
              <h4 className="font-medium mb-2">HP 봉인 결과</h4>
              
              <div className="space-y-2">
                {results.hpSkillResults.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className={`flex justify-between p-2 rounded ${
                      skill.exceeded ? 'bg-red-100 text-red-700' : 'bg-red-50'
                    }`}
                  >
                    <span>{skill.name}</span>
                    <span className="font-medium">{skill.finalSeal.toFixed(1)}%</span>
                  </div>
                ))}
                
                <div className="flex justify-between p-2 bg-gray-100 font-medium">
                  <span>총 HP 봉인량:</span>
                  <span>{results.totalHpSeal}%</span>
                </div>
                
                <div className="flex justify-between p-2 bg-green-50 text-green-700 font-medium">
                  <span>남은 HP:</span>
                  <span>{results.remainingHp.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 차트 표시 */}
        {chartData && (
          <div className="mt-6 h-64">
            <h4 className="font-medium mb-2">MP 봉인 차트</h4>
            <Bar 
              data={chartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw.toFixed(1)}%`;
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}

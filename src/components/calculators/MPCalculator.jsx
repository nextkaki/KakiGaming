"use client";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
// MPCalculator.jsx
import styles from "./MPCalculator.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MPCalculator() {
    // 상태 관리
    const [globalBonus, setGlobalBonus] = useState(0);
    const [pathfinderEnabled, setPathfinderEnabled] = useState(false);
    const [skills, setSkills] = useState([
        {
            name: "",
            sealRate: 0,
            customSealRate: "",
            useCustomSeal: false,
            individualBonus: 0,
            isHpSeal: false,
            hpModifier: -65,
            auxiliarySkills: [{ mpMultiplier: 100 }],
        },
        {
            name: "",
            sealRate: 0,
            customSealRate: "",
            useCustomSeal: false,
            individualBonus: 0,
            isHpSeal: false,
            hpModifier: -65,
            auxiliarySkills: [{ mpMultiplier: 100 }],
        },
        {
            name: "",
            sealRate: 0,
            customSealRate: "",
            useCustomSeal: false,
            individualBonus: 0,
            isHpSeal: false,
            hpModifier: -65,
            auxiliarySkills: [{ mpMultiplier: 100 }],
        },
        {
            name: "",
            sealRate: 0,
            customSealRate: "",
            useCustomSeal: false,
            individualBonus: 0,
            isHpSeal: false,
            hpModifier: -65,
            auxiliarySkills: [{ mpMultiplier: 100 }],
        },
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
        hasExceededSkills: false,
    });

    // 차트 데이터
    const [chartData, setChartData] = useState(null);

    // 스킬 정보 업데이트 함수
    const updateSkill = (index, field, value) => {
        const newSkills = [...skills];

        if (field === "sealRate" && value === "custom") {
            newSkills[index].useCustomSeal = true;
            newSkills[index].sealRate = 0;
        } else {
            // 입력값이 빈 문자열이거나 '-'인 경우 그대로 유지 (마이너스 입력 중인 상태)
            if (field === "individualBonus" && (value === "" || value === "-")) {
                newSkills[index][field] = value;
            } else {
                newSkills[index][field] = value;
            }

            // 드롭다운에서 다른 값 선택 시 커스텀 입력 비활성화
            if (field === "sealRate" && value !== "custom") {
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
                    skill.auxiliarySkills.forEach((aux) => {
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
                        exceeded: isSealExceeded,
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
                    index: i,
                });
            }
        });

        // 소수점 1자리까지 반올림
        totalMpSeal = parseFloat(totalMpSeal.toFixed(3));
        totalHpSealValue = parseFloat(totalHpSealValue.toFixed(3));

        // 남은 MP 비율 계산
        const remainingMpPercent = Math.max(0, 100 - totalMpSeal);

        // 남은 HP 비율 계산 (HP 봉인이 있는 경우)
        const remainingHpPercent = Math.max(0, 100 - totalHpSealValue);

        // 봉인률 초과 스킬 확인
        const hasExceededSkills = skillSealResults.some((skill) => skill.exceeded);

        // 모든 스킬 활성화 가능 여부 확인 (MP와 HP가 0 이상 남아있어야 함)
        const isActivationPossible = remainingMpPercent > 0 && (hpSealSkillCount === 0 || remainingHpPercent > 0) && !hasExceededSkills;

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
            hasExceededSkills,
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

        const labels = skillResults.map((skill) => skill.name || `스킬 ${skill.index + 1}`);
        const data = skillResults.map((skill) => skill.finalSeal);

        // 남은 MP도 차트에 추가
        labels.push("남은 MP");
        data.push(remainingMp);

        const backgroundColors = ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(153, 102, 255, 0.6)"];

        setChartData({
            labels,
            datasets: [
                {
                    label: "MP 봉인 및 잔여량 (%)",
                    data,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map((color) => color.replace("0.6", "1")),
                    borderWidth: 1,
                },
            ],
        });
    };

    // 계산기 초기화 함수
    const resetCalculator = () => {
        setGlobalBonus(0);
        setPathfinderEnabled(false);
        setSkills([
            {
                name: "",
                sealRate: 0,
                customSealRate: "",
                useCustomSeal: false,
                individualBonus: 0,
                isHpSeal: false,
                hpModifier: -65,
                auxiliarySkills: [{ mpMultiplier: 100 }],
            },
            {
                name: "",
                sealRate: 0,
                customSealRate: "",
                useCustomSeal: false,
                individualBonus: 0,
                isHpSeal: false,
                hpModifier: -65,
                auxiliarySkills: [{ mpMultiplier: 100 }],
            },
            {
                name: "",
                sealRate: 0,
                customSealRate: "",
                useCustomSeal: false,
                individualBonus: 0,
                isHpSeal: false,
                hpModifier: -65,
                auxiliarySkills: [{ mpMultiplier: 100 }],
            },
            {
                name: "",
                sealRate: 0,
                customSealRate: "",
                useCustomSeal: false,
                individualBonus: 0,
                isHpSeal: false,
                hpModifier: -65,
                auxiliarySkills: [{ mpMultiplier: 100 }],
            },
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
            hasExceededSkills: false,
        });

        setChartData(null);
    };

    return (
        <div className={styles.calculator}>
            {/* 전역 설정 */}
            <div className={styles.globalSettings}>
                <h3>전체 설정</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "15px" }}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>캐릭터 MP 봉인 보상률 (%)</label>
                        <input type="number" value={globalBonus} onChange={(e) => setGlobalBonus(Number(e.target.value))} className={styles.formControl} min="-100" max="100" />
                    </div>
                    <div className={styles.formGroup} style={{ display: "flex", alignItems: "center" }}>
                        <input type="checkbox" id="pathfinder" checked={pathfinderEnabled} onChange={(e) => setPathfinderEnabled(e.target.checked)} style={{ marginRight: "10px" }} />
                        <label htmlFor="pathfinder">개척자의 길 사용 (보조 스킬 배율 0.95 고정)</label>
                    </div>
                </div>
            </div>

            {/* 스킬 설정 */}
            <h3>스킬 설정</h3>
            <div className={styles.skillGrid}>
                {skills.map((skill, index) => (
                    <div key={index} className={`${styles.skillCard} ${results.skillResults.find((s) => s.index === index && s.exceeded) ? styles.skillCardWarning : ""}`}>
                        <h4 className={styles.skillTitle}>스킬 {index + 1}</h4>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>스킬 이름</label>
                            <input type="text" value={skill.name} onChange={(e) => updateSkill(index, "name", e.target.value)} className={styles.formControl} placeholder={`스킬 ${index + 1}`} />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>MP 봉인율 (%)</label>
                            <div style={{ display: "flex", gap: "8px" }}>
                                <select value={skill.useCustomSeal ? "custom" : skill.sealRate} onChange={(e) => updateSkill(index, "sealRate", e.target.value)} className={styles.formControl}>
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

                                {skill.useCustomSeal && <input type="number" value={skill.customSealRate} onChange={(e) => updateSkill(index, "customSealRate", e.target.value)} className={styles.formControl} placeholder="봉인율" min="0" max="100" style={{ width: "100px" }} />}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>개별 MP 봉인 보상률 (%)</label>
                            <input
                                type="text"
                                value={skill.individualBonus}
                                onChange={(e) => updateSkill(index, "individualBonus", e.target.value)}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    const parsed = parseFloat(value);
                                    if (!isNaN(parsed)) {
                                        updateSkill(index, "individualBonus", parsed);
                                    }
                                }}
                                className="w-full p-2 border rounded"
                                inputMode="decimal" // 모바일 키패드 숫자 유도
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                                <input type="checkbox" id={`hp-seal-${index}`} checked={skill.isHpSeal} onChange={(e) => updateSkill(index, "isHpSeal", e.target.checked)} style={{ marginRight: "10px" }} />
                                <label htmlFor={`hp-seal-${index}`}>HP 봉인으로 대체</label>
                            </div>

                            {skill.isHpSeal && (
                                <div style={{ marginLeft: "25px" }}>
                                    <label className={styles.formLabel}>HP 봉인 보정 계수 (%)</label>
                                    <input type="number" value={skill.hpModifier} onChange={(e) => updateSkill(index, "hpModifier", Number(e.target.value))} className={styles.formControl} min="-100" max="100" />
                                    <p style={{ fontSize: "12px", color: "#6c757d", marginTop: "4px" }}>기본값: -65% (음수는 패널티)</p>
                                </div>
                            )}
                        </div>

                        <div className={`${styles.formGroup} ${pathfinderEnabled ? styles.disabled : ""}`}>
                            <label className={styles.formLabel}>보조 스킬 MP 배율</label>
                            <div>
                                {skill.auxiliarySkills.map((aux, auxIndex) => (
                                    <div key={auxIndex} className={styles.auxiliaryItem}>
                                        <input type="number" value={aux.mpMultiplier} onChange={(e) => updateAuxiliarySkill(index, auxIndex, Number(e.target.value))} className={`${styles.formControl} ${styles.auxiliaryInput}`} min="0" max="200" step="5" disabled={pathfinderEnabled} />
                                        <span style={{ marginRight: "8px" }}>%</span>

                                        {skill.auxiliarySkills.length > 1 && (
                                            <button onClick={() => removeAuxiliarySkill(index, auxIndex)} className={styles.removeButton} disabled={pathfinderEnabled}>
                                                삭제
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button onClick={() => addAuxiliarySkill(index)} className={styles.addButton} disabled={pathfinderEnabled}>
                                + 보조 스킬 추가
                            </button>

                            {pathfinderEnabled && <p style={{ fontSize: "12px", color: "#6c757d", marginTop: "8px" }}>개척자의 길 활성화 시 보조 스킬 배율은 0.95로 고정됩니다.</p>}
                        </div>
                    </div>
                ))}
            </div>

            {/* 계산 버튼 */}
            <div className={styles.buttonGroup}>
                <button onClick={calculateMpSeal} className={styles.calculateButton}>
                    계산하기
                </button>

                <button onClick={resetCalculator} className={styles.resetButton}>
                    초기화
                </button>
            </div>

            {/* 결과 표시 */}
            <div className={styles.resultsContainer}>
                <h3 className={styles.resultsTitle}>계산 결과</h3>

                {/* 활성화 상태 */}
                <div className={`${styles.statusBar} ${results.activeSkillCount === 0 ? styles.neutral : results.isActivationPossible ? styles.possible : styles.impossible}`}>
                    <span style={{ fontWeight: "500" }}>스킬 활성화 상태:</span>
                    <span style={{ fontWeight: "500" }}>{results.activeSkillCount === 0 ? "활성화된 스킬 없음" : results.hasExceededSkills ? "스킬 활성화 불가능 (봉인률 초과)" : results.isActivationPossible ? "모든 스킬 활성화 가능" : "스킬 활성화 불가능 (자원 부족)"}</span>
                </div>

                {/* MP 봉인 결과 */}
                <div className={styles.resultGrid}>
                    <div>
                        <h4 style={{ marginBottom: "10px" }}>각 스킬별 MP 봉인량</h4>

                        {results.activeSkillCount === 0 ? (
                            <p style={{ color: "#6c757d" }}>활성화된 스킬이 없습니다.</p>
                        ) : (
                            <div>
                                {results.skillResults.map((skill, idx) => (
                                    <div key={idx} className={`${styles.resultItem} ${skill.exceeded ? styles.resultItemWarning : ""}`}>
                                        <span>{skill.name}</span>
                                        <span style={{ fontWeight: "500" }}>{skill.finalSeal.toFixed(3)}%</span>
                                    </div>
                                ))}

                                <div className={styles.totalItem}>
                                    <span>총 MP 봉인량:</span>
                                    <span>{results.totalMpSeal}%</span>
                                </div>

                                <div className={styles.remainingItem}>
                                    <span>남은 MP:</span>
                                    <span>{results.remainingMp.toFixed(3)}%</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* HP 봉인 결과 (HP 봉인이 있는 경우) */}
                    {results.hpSkillCount > 0 && (
                        <div>
                            <h4 style={{ marginBottom: "10px" }}>HP 봉인 결과</h4>

                            <div>
                                {results.hpSkillResults.map((skill, idx) => (
                                    <div key={idx} className={`${styles.resultItem} ${skill.exceeded ? styles.resultItemWarning : ""}`}>
                                        <span>{skill.name}</span>
                                        <span style={{ fontWeight: "500" }}>{skill.finalSeal.toFixed(3)}%</span>
                                    </div>
                                ))}

                                <div className={styles.totalItem}>
                                    <span>총 HP 봉인량:</span>
                                    <span>{results.totalHpSeal}%</span>
                                </div>

                                <div className={styles.remainingItem}>
                                    <span>남은 HP:</span>
                                    <span>{results.remainingHp.toFixed(3)}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* 차트 표시 */}
                {chartData && (
                    <div style={{ marginTop: "20px", height: "300px" }}>
                        <h4 style={{ marginBottom: "10px" }}>MP 봉인 차트</h4>
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                return `${context.label}: ${context.raw.toFixed(3)}%`;
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>

            {/* 계산 방식 안내 */}
            <div className={styles.calculationGuide}>
                <h3 className={styles.calculationGuideTitle}>계산 방식 안내</h3>

                <div className={styles.calculationFormula}>최종 봉인율 = (기본 봉인 × 보조 MP 배율 누적) ÷ (1 + MP 봉인 보상 합산) ÷ (1 - MP 봉인 보상 추가율)</div>

                <h4 style={{ marginTop: "15px", marginBottom: "10px" }}>계산 단계:</h4>
                <ol className={styles.calculationSteps}>
                    <li className={styles.calculationStep}>기준 봉인 계산: 기본 봉인 × 보조 스킬 MP 배율 누적</li>
                    <li className={styles.calculationStep}>봉인 보상 적용: 기준 봉인 ÷ (1 + 봉인 보상 합산)</li>
                    <li className={styles.calculationStep}>봉인 보상 추가 적용: 보상 반영 ÷ (1 - 봉인 보상 추가율)</li>
                </ol>

                <h4 style={{ marginTop: "15px", marginBottom: "10px" }}>항목 설명:</h4>
                <ul style={{ marginLeft: "20px", marginBottom: "15px" }}>
                    <li style={{ marginBottom: "8px" }}>기본 봉인: 스킬 자체 봉인율 (예: 20%)</li>
                    <li style={{ marginBottom: "8px" }}>보조 MP 배율 누적: 개척자 사용 시 0.95 × 0.95 × 0.95 (보조 스킬 개수만큼)</li>
                    <li style={{ marginBottom: "8px" }}>MP 봉인 보상 합산: 전역 + 개별 MP 봉인 보상률 (분모에 적용)</li>
                    <li style={{ marginBottom: "8px" }}>MP 봉인 보상 추가율: HP 봉인 보정 계수 (음수는 봉인량 증가, 양수는 봉인량 감소)</li>
                    <li style={{ marginBottom: "8px" }}>음수 보정률(-65%)은 (1 - 0.65) = 0.35로 나누어 계산 (봉인량 증가)</li>
                </ul>

                <div className={styles.warningBox}>⚠️ 주의: 본 계산식은 소수점 계산으로 인해 실제 게임 내 표시 수치와 일부 다를 수 있으며, 이는 게임 내 수치 표시 로직의 오류일 수 있습니다.</div>
            </div>
        </div>
    );
}

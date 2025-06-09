// app/cooltime/page.tsx
"use client";
import React, { useState } from "react";
import { calcCoolTime, calcRequiredCool } from "@/app/utils/cooltimeUtils";
import { InputBlock, ReadOnlyBlock } from "@/components/calculators/CooltimeBlocks";
import styles from "@/components/calculators/CooltimeBlocks.module.css";



export default function CooltimeCalculatorPage() {
    const [myCool, setMyCool] = useState(0);
    const [refCool, setRefCool] = useState(1);
    const [targetCool, setTargetCool] = useState(0.1);

    const resultCool = calcCoolTime(myCool, refCool);
    const needCool = calcRequiredCool(myCool, refCool, targetCool);
    const needCoolText = needCool > 0 ? "필요" : "불필요";

    //   const frameTable = generateFrameTable();

    const baseTime = 1.0; // 30프레임 기준 쿨타임 시간
    const targetFrame = 30;

    const frameTable = Array.from({ length: targetFrame }, (_, i) => {
        const frame = targetFrame - i;
        const targetCooldownTime = (baseTime * frame) / targetFrame;
        const minCooldownPercentage = (100 * baseTime) / targetCooldownTime - 100;
        const maxCooldownPercentage = minCooldownPercentage + 100.0 / targetFrame;
        return {
            frame,
            timeSec: targetCooldownTime,
            minPercent: minCooldownPercentage,
            maxPercent: maxCooldownPercentage,
        };
    });

    return (
        <>
        <div className={`${styles.calculator} ${styles.darkMode}`}>
            <h2 className={styles.title}>토치라이트 인피니트 쿨타임 계산기</h2>

            <div className={styles.globalSettings}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>나의 쿨타임 회복 속도(%)</label>
                    <InputBlock value={myCool} onChange={setMyCool} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>계산할 스킬 쿨타임(s)</label>
                    <InputBlock value={refCool} onChange={setRefCool} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>(결과) 스킬 쿨타임</label>
                    <ReadOnlyBlock value={resultCool.toFixed(3)} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>목표 스킬 쿨타임(s)</label>
                    <InputBlock value={targetCool} onChange={setTargetCool} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>필요 쿨타임(%)</label>
                    <ReadOnlyBlock value={needCool.toFixed(3)} />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>쿨타임 회복 속도 추가 필요 여부</label>
                    <ReadOnlyBlock value={needCoolText} />
                </div>
            </div>

            <div className={styles.resultsContainer}>
                <h3 className={styles.sectionTitle}>프레임별 쿨타임 정보</h3>
                <div className="overflow-auto">
                    <table className="table-auto w-full border text-sm">
                        <thead>
                            <tr className="bg-gray-800 text-xl">
                                <th className="border px-2">목표 프레임 수</th>
                                <th className="border px-2">쿨타임(초)</th>
                                <th className="border px-2">쿨타임 최소값</th>
                                <th className="border px-2">쿨타임 최대값</th>
                            </tr>
                        </thead>
                        <tbody>
                            {frameTable.map((row) => (
                                <tr key={row.frame}>
                                    <td className="border px-2 text-center text-lg">{row.frame}프레임</td>
                                    <td className="border px-2 text-center text-lg">{row.timeSec.toFixed(3)}초</td>
                                    <td className="border px-2 text-center text-lg">{row.minPercent.toFixed(3)}%</td>
                                    <td className="border px-2 text-center text-lg">{row.maxPercent.toFixed(3)}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="text-lg not-visited:mt-4">
                서버 틱: 0.033초 / 1초: 30프레임 → 1프레임 = 0.033초
                <br />
                클라이언트 적용을 위해 0.034초로 약간의 여유를 두는 것이 안전합니다.
            </div>
        </div>
        </>
    );
}

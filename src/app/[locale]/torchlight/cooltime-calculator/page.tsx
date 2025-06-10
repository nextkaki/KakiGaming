// app/cooltime/page.tsx
import CooltimeCalculator from '@/components/calculators/CooltimeCalculator';

export const metadata = {
    title: "쿨타임 계산기 - 토치라이트 인피니트 | KakiGaming",
    description: "스킬 쿨타임을 계산해 최적의 토치라이트 인피니트 세팅을 찾아보세요.",
};
export default function CooltimeCalculatorPage() {
  return (
    
      <CooltimeCalculator />
  );
}

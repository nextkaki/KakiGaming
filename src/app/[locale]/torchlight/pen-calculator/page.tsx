import PenetrationCalculator from '@/components/calculators/PenetrationCalculator';

export const metadata = {
  title: '관통 계산기 - 토치라이트 인피니트 | KakiGaming',
  description: '토치라이트 인피니트의 관통 계산기로 대미지를 최적화 하세요.',
};

export default function PencalculatorPage() {
  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-6">토치라이트 인피니트 미스릴 계산기</h1>
      <p className="mb-6">
        토치라이트 인피니트의 언설리드 블레이드의 미스릴을 계산하여 최적의 조합을 찾아보세요.
        <br/>
        미-봉인된 최대 MP와 현재 MP 소모율에 따른 최적의 조합을 찾으세요
      </p> */}
      
      <PenetrationCalculator />
    </div>
  );
}

import MPCalculator from '@/components/calculators/MPCalculator';


export default function MPCalculatorPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">토치라이트 인피니트 MP봉인 계산기</h1>
      <p className="mb-6">
        토치라이트 인피니트의 MP봉인 시스템을 계산하여 최적의 스킬 조합을 찾아보세요.
        <br/>
        각 스킬의 봉인율과 보조 스킬 MP 배율을 입력하면 최종 MP 봉인량과 남은 MP를 계산해 드립니다.
      </p>
      
      <MPCalculator />
    </div>
  );
}

import RunePriceSearch from '@/components/calculators/RunePriceSearch';

export const metadata = {
  title: '룬 시세 검색 - 디아블로4 | KakiGaming',
  description: '디아블로4의 룬 시세를 실시간으로 검색하고 비교해보세요.',
};

export default function RunePricePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">디아블로4 룬 시세 검색</h1>
      <p className="mb-6 text-gray-700">
        디아블로4의 룬 시세를 실시간으로 검색하고 비교해보세요.
        룬 이름을 검색하여 현재 거래 가격을 확인할 수 있습니다.
      </p>
      
      <RunePriceSearch />
    </div>
  );
}

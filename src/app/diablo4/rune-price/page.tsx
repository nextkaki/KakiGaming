import RunePriceSearch from "@/components/calculators/RunePriceSearch";

export const metadata = {
    title: "룬 시세 검색 - 디아블로4 | KakiGaming",
    description: "디아블로4의 룬 시세를 실시간으로 검색하고 비교해보세요.",
};

export default function RunePricePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">디아블로4 룬 시세 검색</h1>
            <p className="mb-6">디아블로4의 룬 시세를 실시간으로 검색하고 비교해보세요. 룬 이름을 검색하여 현재 거래 가격을 확인할 수 있습니다.</p>
            <div className="space-y-4">
                <div className="border-b pb-4">
                    <a href="https://youtu.be/879gcbaRNTc?si=oP2el4sXCPeDpCzo" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-fuchsia-500 transition mr-5">
                        사용법(영상) &rarr;
                    </a>
                    <a href="https://chromewebstore.google.com/detail/item-data-calculator/gbknoekikpkddocbfknioicbkcoclpnm?hl=ko&utm_source=ext_sidebar" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-fuchsia-500 transition">
                        확장프로그램 &rarr;
                    </a>
                </div>
            </div>

            <RunePriceSearch />
        </div>
    );
}

import Link from "next/link";
import Image from "next/image";
import AdContainer from "@/components/ui/AdContainer";

export const metadata = {
    title: "토치라이트 인피니트 공략 | KakiGaming",
    description: "토치라이트 인피니트 공략, MP봉인 계산기 등 다양한 정보를 제공합니다.",
};

export default function TorchlightPage() {
    return (
        <div>
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                <Image src="/images/torchlight-banner.jpg" alt="토치라이트 인피니트" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">토치라이트 인피니트</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl text-gray-950 font-bold mb-4">토치라이트 인피니트 소개</h2>
                        <p className="text-gray-700 mb-4">개발/배급: XD Inc. 토치라이트 인피니트는 인기 액션 RPG(ARPG) 시리즈인 '토치라이트'의 최신작으로, 2023년 5월 9일에 출시된 작품입니다. 이 게임은 전작 '토치라이트 2'의 이야기를 이어가며, 어둠에 맞서 레이티스 대륙의 빛을 되찾기 위해 여러 히어로들과 함께 모험을 떠나는 내용을 담고 있습니다.</p>
                        
                        <a href="https://game.naver.com/lounge/Torchlight_Infinite/home" className="text-purple-600 font-medium hover:text-purple-800" target="_blank" rel="noopener noreferrer">
                            공식 라운지 커뮤니티 &rarr;
                        </a>

                        <p className="text-gray-700 mt-4">이 페이지에서는 토치라이트 인피니트의 다양한 공략과 정보, 그리고 MP봉인 계산기 기능을 제공합니다.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl text-gray-950 font-bold mb-4">유용한 도구</h2>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-gray-950 text-lg mb-2">MP봉인 계산기</h3>
                                <p className="text-gray-600 mb-2">토치라이트 인피니트의 MP봉인 시스템을 계산하여 최적의 스킬 조합을 찾아보세요.</p>
                                <Link href="/torchlight/mp-calculator" className="text-purple-600 font-medium hover:text-purple-800">
                                    계산기 사용하기 &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <AdContainer size="vertical" className="mb-6" />

                    {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">최신 업데이트</h3>
            <ul className="space-y-3">
              <li className="border-b pb-3">
                <span className="text-sm text-gray-500">2025.05.20</span>
                <p className="font-medium">MP봉인 계산기 업데이트</p>
              </li>
              <li className="border-b pb-3">
                <span className="text-sm text-gray-500">2025.05.10</span>
                <p className="font-medium">토치라이트 인피니트 페이지 오픈</p>
              </li>
            </ul>
          </div> */}
                </div>
            </div>
        </div>
    );
}

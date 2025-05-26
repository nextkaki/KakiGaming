import Link from 'next/link';
import GameCard from '@/components/ui/GameCard';
import AdContainer from '@/components/ui/AdContainer';

export default function Home() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-lg p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">KakiGaming에 오신 것을 환영합니다</h1>
        <p className="text-xl mb-6">
          디아블로4, 패스 오브 엑자일, 토치라이트 인피니트 등 다양한 게임의 공략과 유틸리티를 제공합니다.
        </p>
        <Link 
          href="/diablo4" 
          className="inline-block bg-white text-purple-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
        >
          시작하기
        </Link>
      </div>
      
      {/* 게임 카드 섹션 */}
      <h2 className="text-2xl font-bold mb-4">인기 게임</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GameCard 
          title="디아블로4" 
          description="최신 시즌 공략 및 룬 시세 검색" 
          imageSrc="/images/diablo4.jpg" 
          href="/diablo4"
        />
        <GameCard 
          title="토치라이트 인피니트" 
          description="MP봉인 계산기 및 빌드 가이드" 
          imageSrc="/images/torchlight.jpg" 
          href="/torchlight"
        />
        <GameCard 
          title="패스 오브 엑자일 1" 
          description="클래스 빌드 및 아이템 정보" 
          imageSrc="/images/poe1.jpg" 
          href="/poe1"
        />
        <GameCard 
          title="패스 오브 엑자일 2" 
          description="초보자 가이드 및 엔드게임 공략" 
          imageSrc="/images/poe2.jpg" 
          href="/poe2"
        />
      </div>
      
      {/* 유틸리티 섹션 */}
      <h2 className="text-2xl font-bold mb-4">유용한 도구</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl text-gray-950 font-bold mb-2">MP봉인 계산기</h3>
          <p className="text-gray-600 mb-4">
            토치라이트 인피니트의 MP봉인 시스템을 계산하여 최적의 스킬 조합을 찾아보세요.
          </p>
          <Link 
            href="/torchlight/mp-calculator" 
            className="text-purple-600 font-medium hover:text-purple-800"
          >
            계산기 사용하기 &rarr;
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h3 className="text-xl text-gray-950 font-bold mb-2">룬 시세 검색</h3>
          <p className="text-gray-600 mb-4">
            디아블로4의 룬 시세를 실시간으로 검색하고 비교해보세요.
          </p>
          <Link 
            href="/diablo4/rune-price" 
            className="text-purple-600 font-medium hover:text-purple-800"
          >
            시세 확인하기 &rarr;
          </Link>
        </div>
      </div>
      
      {/* 광고 배너 */}
      <AdContainer size="horizontal" className="mb-8" />
      
      {/* 최신 업데이트 */}
      {/* <h2 className="text-2xl font-bold mb-4">최신 업데이트</h2> */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <ul className="space-y-4">
          <li className="border-b pb-4">
            <span className="text-sm text-gray-500">2025.05.20</span>
            <h3 className="font-bold">토치라이트 인피니트 MP봉인 계산기 업데이트</h3>
            <p className="text-gray-600">최신 패치에 맞춰 MP봉인 계산기가 업데이트되었습니다.</p>
          </li>
          <li className="border-b pb-4">
            <span className="text-sm text-gray-500">2025.05.15</span>
            <h3 className="font-bold">디아블로4 룬 시세 검색 기능 추가</h3>
            <p className="text-gray-600">실시간 룬 시세를 확인할 수 있는 기능이 추가되었습니다.</p>
          </li>
          <li>
            <span className="text-sm text-gray-500">2025.05.10</span>
            <h3 className="font-bold">KakiGaming 웹사이트 오픈</h3>
            <p className="text-gray-600">게임 공략과 유틸리티를 제공하는 KakiGaming 웹사이트가 오픈했습니다.</p>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import AdContainer from '@/components/ui/AdContainer';

export const metadata = {
  title: '디아블로4 공략 | KakiGaming',
  description: '디아블로4 공략, 룬 시세 검색 등 다양한 정보를 제공합니다.',
};

export default function Diablo4Page() {
  return (
    <div>
      <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
        <Image 
          src="/images/diablo4-banner.jpg" 
          alt="디아블로4" 
          fill 
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">디아블로4</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">디아블로4 소개</h2>
            <p className="text-gray-700 mb-4">
              디아블로4는 블리자드 엔터테인먼트에서 개발한 액션 RPG 게임입니다.
              다양한 클래스와 스킬, 아이템을 활용하여 지옥의 군주들과 맞서 싸우는 게임입니다.
            </p>
            <p className="text-gray-700">
              이 페이지에서는 디아블로4의 다양한 공략과 정보, 그리고 룬 시세 검색 기능을 제공합니다.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">유용한 도구</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-bold text-lg mb-2">룬 시세 검색</h3>
                <p className="text-gray-600 mb-2">
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
          </div>
        </div>
        
        <div>
          <AdContainer size="vertical" className="mb-6" />
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4">최신 업데이트</h3>
            <ul className="space-y-3">
              <li className="border-b pb-3">
                <span className="text-sm text-gray-500">2025.05.15</span>
                <p className="font-medium">룬 시세 검색 기능 추가</p>
              </li>
              <li className="border-b pb-3">
                <span className="text-sm text-gray-500">2025.05.10</span>
                <p className="font-medium">디아블로4 페이지 오픈</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AdContainer from '@/components/ui/AdContainer';
import { useState } from 'react';

// 퀵 링크 아이템 타입 정의
interface QuickLinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
}

export const metadata = {
  title: '패스 오브 엑자일 퀵 링크 모음 | KakiGaming',
  description: '유용한 PoE 관련 사이트와 도구 링크를 한곳에 모았습니다.',
};


export default function PoeQuickLinks() {
  const t = useTranslations('common.poe');
  
  // 카테고리 필터링을 위한 상태
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // 퀵 링크 데이터
  const quickLinks: QuickLinkItem[] = [
    // 공식
    {
      id: 'poe-kakao',
      title: 'PoE 카카오',
      description: '카카오, 패스 오브 엑자일 공식 홈페이지',
      url: 'https://poe.game.daum.net/',
      imageUrl: '/images/poe/poe.jpg',
      category: 'official'
    },
    {
      id: 'poe-official',
      title: 'PoE 영문',
      description: '영문, 패스 오브 엑자일 공식 홈페이지',
      url: 'https://www.pathofexile.com/',
      imageUrl: '/images/poe/poe.jpg',
      category: 'official'
    },
    {
      id: 'poe-sns-x',
      title: 'PoE X(트위터)',
      description: '패스 오브 엑자일 공식 SNS',
      url: 'https://x.com/pathofexile',
      imageUrl: '/images/poe/poe.jpg',
      category: 'official'
    },

    // 빌드 & 가이드
    {
      id: 'poe-ninja',
      title: 'PoE.Ninja',
      description: '인기 빌드, 아이템 가격, 통계 정보를 제공하는 사이트',
      url: 'https://poe.ninja/',
      imageUrl: '/images/poe/poe-ninja.jpg',
      category: 'builds'
    },
    {
      id: 'pob',
      title: 'Path of Building',
      description: '빌드 계획 및 분석을 위한 필수 도구 (Community Fork)',
      url: 'https://github.com/PathOfBuildingCommunity/PathOfBuilding',
      imageUrl: '/images/poe/path-of-building.jpg',
      category: 'builds'
    },
    {
      id: 'maxroll',
      title: 'Maxroll PoE',
      description: '초보자부터 전문가까지 다양한 빌드 가이드와 정보',
      url: 'https://maxroll.gg/path-of-exile',
      imageUrl: '/images/poe/maxroll.jpg',
      category: 'builds'
    },
    {
      id: 'poeplanner',
      title: 'PoE Planner',
      description: '미리 자신만의 트리 조합을 만들어보고 공략을 준비할 수 있는 도구',
      url: 'https://poeplanner.com/',
      imageUrl: '/images/poe/poeplanner.jpg',
      category: 'builds'
    },
    
    // 도구
    {
      id: 'awakened-poe-trade',
      title: 'Awakened PoE Trade',
      description: '아이템 가격 확인을 위한 인기 오버레이 도구',
      url: 'https://github.com/SnosMe/awakened-poe-trade',
      imageUrl: '/images/poe/awakened-poe-trade.jpg',
      category: 'tools'
    },
    {
      id: 'poewatch',
      title: 'PoeWatch',
      description: '아이템 가격 추적 및 통계 정보 제공',
      url: 'https://poe.watch/',
      imageUrl: '/images/poe/poewatch.jpg',
      category: 'tools'
    },

    {
      id: 'filterblade',
      title: 'FilterBlade',
      description: 'Neversink 필터를 커스터마이징할 수 있는 도구',
      url: 'https://www.filterblade.xyz/',
      imageUrl: '/images/poe/filterblade.jpg',
      category: 'tools'
    },
    {
      id: 'craft-of-exile',
      title: 'Craft of Exile',
      description: '아이템 제작 시뮬레이션 및 분석 도구',
      url: 'https://www.craftofexile.com/',
      imageUrl: '/images/poe/craft-of-exile.jpg',
      category: 'tools'
    },
    {
      id: 'poedb',
      title: 'PoEDB',
      description: '게임 데이터베이스 및 아이템 정보',
      url: 'https://poedb.tw/',
      imageUrl: '/images/poe/poedb.jpg',
      category: 'tools'
    },
    {
      id: 'poelab',
      title: 'PoE Lab',
      description: '일일 미궁 레이아웃 정보 제공',
      url: 'https://www.poelab.com/',
      imageUrl: '/images/poe/poelab.jpg',
      category: 'tools'
    },
    {
      id: 'mapsofexile',
      title: 'PoE Atlas',
      description: '아틀라스 지도 및 전략 정보',
      url: 'https://mapsofexile.com/',
      imageUrl: '/images/poe/mapsofexile.jpg',
      category: 'tools'
    },
    {
      id: 'item-translate',
      title: '서미누기 - 한국어 아이템 영어 번역기',
      description: 'POE 한국어 아이템 영어 번역기',
      url: 'https://seominugi.com/poe/item-translate',
      imageUrl: '/images/poe/item-translate.jpg',
      category: 'tools'
    },
    {
      id: 'bulk-tftrove',
      title: 'TFT Bulk Selling Tool',
      description: 'TFT 대량(벌크) 거래를 쉽게 할 수 있도록 도와주는 웹 기반 도구',
      url: 'https://bulk.tftrove.com/',
      imageUrl: '/images/poe/poe-tft.jpg',
      category: 'tools'
    },
    {
      id: 'poe-hub',
      title: 'POE HUB',
      description: '패스 오브 엑자일(Path of Exile) 플레이어를 위한 거래 및 커뮤니티 플랫폼',
      url: 'https://poe-hub.com/en',
      imageUrl: '/images/poe/poe-hub.jpg',
      category: 'tools'
    },
    
    // 커뮤니티 & 정보
    {
      id: 'poe-reddit',
      title: 'PoE Reddit',
      description: '패스 오브 엑자일 레딧 커뮤니티',
      url: 'https://www.reddit.com/r/pathofexile/',
      imageUrl: '/images/poe/poe-reddit.jpg',
      category: 'community'
    },
    {
      id: 'poe-wiki',
      title: 'PoE Wiki',
      description: '커뮤니티에서 관리하는 위키',
      url: 'https://www.poewiki.net/',
      imageUrl: '/images/poe/poe-wiki.jpg',
      category: 'community'
    },
    {
      id: 'poe-tft',
      title: 'PoE TFT',
      description: '디스코드 기반 글로벌 거래 및 커뮤니티 플랫폼',
      url: 'https://forbiddentrove.com/ko/homeko/',
      imageUrl: '/images/poe/poe-tft.jpg',
      category: 'community'
    },
    {
      id: 'grinding-zone',
      title: 'GRINDING.ZONE',
      description: '다양한 유틸리티를 모아둔 웹사이트',
      url: 'https://grinding.zone/',
      imageUrl: '/images/poe/grinding-zone.jpg',
      category: 'community'
    }
   
  ];
  
  // 카테고리 목록
  const categories = [
    { id: 'all', name: '전체' },
    { id: 'official', name: '공식' },
    { id: 'builds', name: '빌드 & 가이드' },
    { id: 'tools', name: '도구' },
    { id: 'community', name: '커뮤니티 & 정보' }
  ];
  
  // 필터링된 링크 목록
  const filteredLinks = activeCategory === 'all' 
    ? quickLinks 
    : quickLinks.filter(link => link.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* 히어로 섹션 */}
      <div className="bg-gradient-to-r from-blue-800 to-gray-900 text-white rounded-lg p-8 mb-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{t('quicklinks.title')}</h1>
        <p className="text-xl mb-6">{t('quicklinks.description')}</p>
      </div>
      
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 퀵 링크 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map(link => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
          >
            <div className="relative h-48 w-full bg-gray-200">
              <Image
                src={link.imageUrl}
                alt={link.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{link.title}</h3>
              <p className="text-gray-600 flex-grow">{link.description}</p>
              <div className="mt-4 flex items-center text-blue-600 font-medium">
                <span>방문하기</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      {/* 광고 배너 */}
      <AdContainer size="horizontal" className="mt-8" />
      
      {/* 추가 정보 섹션 */}
      {/* <div className="bg-gray-100 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">{t('quicklinks.about')}</h2>
        <p className="text-gray-700 mb-4">
          {t('quicklinks.about_description')}
        </p>
        <p className="text-gray-700">
          {t('quicklinks.suggestion')}
        </p>
      </div> */}

    </div>
  );
}

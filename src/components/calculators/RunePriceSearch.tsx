'use client';
import { useState } from 'react';

interface Rune {
  id: string;
  name: string;
  engName: string;
  tier: number;
}


// 룬 데이터
const runeData = [
  { id: 'el', name: '엘(El)', engName: 'el', tier: 1 },
  { id: 'eld', name: '엘드(Eld)', engName: 'eld', tier: 1 },
  { id: 'tir', name: '티르(Tir)', engName: 'tir', tier: 1 },
  { id: 'nef', name: '네프(Nef)', engName: 'nef', tier: 1 },
  { id: 'eth', name: '에드(Eth)', engName: 'eth', tier: 1 },
  { id: 'ith', name: '이드(Ith)', engName: 'ith', tier: 1 },
  { id: 'tal', name: '탈(Tal)', engName: 'tal', tier: 1 },
  { id: 'ral', name: '랄(Ral)', engName: 'ral', tier: 1 },
  { id: 'ort', name: '오르트(Ort)', engName: 'ort', tier: 1 },
  { id: 'thul', name: '툴(Thul)', engName: 'thul', tier: 2 },
  { id: 'amn', name: '암(Amn)', engName: 'amn', tier: 2 },
  { id: 'sol', name: '솔(Sol)', engName: 'sol', tier: 2 },
  { id: 'shael', name: '샤엘(Shael)', engName: 'shael', tier: 2 },
  { id: 'dol', name: '돌(Dol)', engName: 'dol', tier: 2 },
  { id: 'hel', name: '헬(Hel)', engName: 'hel', tier: 2 },
  { id: 'io', name: '이오(Io)', engName: 'io', tier: 2 },
  { id: 'lum', name: '룸(Lum)', engName: 'lum', tier: 3 },
  { id: 'ko', name: '코(Ko)', engName: 'ko', tier: 3 },
  { id: 'fal', name: '팔(Fal)', engName: 'fal', tier: 3 },
  { id: 'lem', name: '렘(Lem)', engName: 'lem', tier: 3 },
  { id: 'pul', name: '풀(Pul)', engName: 'pul', tier: 3 },
  { id: 'um', name: '움(Um)', engName: 'um', tier: 4 },
  { id: 'mal', name: '말(Mal)', engName: 'mal', tier: 4 },
  { id: 'ist', name: '이스트(Ist)', engName: 'ist', tier: 4 },
  { id: 'gul', name: '굴(Gul)', engName: 'gul', tier: 4 },
  { id: 'vex', name: '벡스(Vex)', engName: 'vex', tier: 5 },
  { id: 'ohm', name: '옴(Ohm)', engName: 'ohm', tier: 5 },
  { id: 'lo', name: '로(Lo)', engName: 'lo', tier: 5 },
  { id: 'sur', name: '수르(Sur)', engName: 'sur', tier: 5 },
  { id: 'ber', name: '베르(Ber)', engName: 'ber', tier: 6 },
  { id: 'jah', name: '자(Jah)', engName: 'jah', tier: 6 },
  { id: 'cham', name: '참(Cham)', engName: 'cham', tier: 6 },
  { id: 'zod', name: '조드(Zod)', engName: 'zod', tier: 6 },
];

export default function RunePriceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null);


  // 검색어에 따라 룬 필터링
  const filteredRunes = runeData.filter(rune => 
    rune.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rune.engName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 룬 링크 열기
  const openRuneLink = (rune: Rune) => {
    const url = `https://diablo.trade/listings/items?cursor=1&mode=season%20softcore&rune=${rune.engName}&type=WTB`;
    window.open(url, '_blank' );
    setSelectedRune(rune);
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">디아블로4 룬 시세 검색</h2>
      
      <div className="mb-6">
        <label htmlFor="searchInput" className="block mb-2 font-medium">룬 이름 검색</label>
        <input
          id="searchInput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="룬 이름을 입력하세요 (예: 베르, ber)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">룬 목록</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredRunes.map((rune) => (
            <button
              key={rune.id}
              onClick={() => openRuneLink(rune)}
              className={`p-2 border rounded-lg text-center hover:bg-purple-50 hover:border-purple-300 transition ${
                selectedRune?.id === rune.id ? 'bg-purple-100 border-purple-400' : ''
              }`}
            >
              <div className="font-medium">{rune.name}</div>
              <div className="text-xs text-gray-500">티어 {rune.tier}</div>
            </button>
          ))}
        </div>
        
        {filteredRunes.length === 0 && (
          <p className="text-gray-500 text-center py-4">검색 결과가 없습니다.</p>
        )}
      </div>
      
      {selectedRune && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-2">{selectedRune.name} 시세 정보</h3>
          <p className="text-sm text-gray-600 mb-2">
            외부 사이트에서 최신 시세 정보를 확인하실 수 있습니다.
          </p>
          <p className="text-sm">
            <a 
              href={`https://diablo.trade/listings/items?cursor=1&mode=season%20softcore&rune=${selectedRune.engName}&type=WTB`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800"
            >
              diablo.trade에서 {selectedRune.name} 시세 보기 &rarr;
            </a>
          </p>
        </div>
       )}
    </div>
  );
}

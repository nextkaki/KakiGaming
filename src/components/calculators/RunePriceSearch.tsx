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
  {'id': 'ahu', 'name': '아후(Ahu)', 'engName': 'Ahu', 'tier': 1},
  {'id': 'bac', 'name': '바크(Bac)', 'engName': 'Bac', 'tier': 1},
  {'id': 'lith', 'name': '리트(Lith)', 'engName': 'Lith', 'tier': 1},
  {'id': 'tam', 'name': '탐(Tam)', 'engName': 'Tam', 'tier': 1},
  {'id': 'xol', 'name': '졸(Xol)', 'engName': 'Xol', 'tier': 1},
  {'id': 'yul', 'name': '율(Yul)', 'engName': 'Yul', 'tier': 1},
  {'id': 'feo', 'name': '페오(Feo)', 'engName': 'Feo', 'tier': 1},
  {'id': 'neo', 'name': '네오(Neo)', 'engName': 'Neo', 'tier': 1},
  {'id': 'noc', 'name': '녹(Noc)', 'engName': 'Noc', 'tier': 1},
  {'id': 'poc', 'name': '포크(Poc)', 'engName': 'Poc', 'tier': 1},
  {'id': 'cem', 'name': '쳄(Cem)', 'engName': 'Cem', 'tier': 1},
  {'id': 'cir', 'name': '시르(Cir)', 'engName': 'Cir', 'tier': 1},
  {'id': 'moni', 'name': '모니(Moni)', 'engName': 'Moni', 'tier': 1},
  {'id': 'yax', 'name': '약스(Yax)', 'engName': 'Yax', 'tier': 1},
  {'id': 'zan', 'name': '잔(Zan)', 'engName': 'Zan', 'tier': 1},
  {'id': 'eom', 'name': '에옴(Eom)', 'engName': 'Eom', 'tier': 1},
  {'id': 'jah', 'name': '자(Jah)', 'engName': 'Jah', 'tier': 1},
  {'id': 'ohm', 'name': '오움(Ohm)', 'engName': 'Ohm', 'tier': 1},
  {'id': 'vex', 'name': '벡스(Vex)', 'engName': 'Vex', 'tier': 1},
  {'id': 'xan', 'name': '잔(Xan)', 'engName': 'Xan', 'tier': 1},
  {'id': 'yom', 'name': '욤(Yom)', 'engName': 'Yom', 'tier': 1},
  {'id': 'kry', 'name': '크라이(Kry)', 'engName': 'Kry', 'tier': 1},
  {'id': 'lac', 'name': '라크(Lac)', 'engName': 'Lac', 'tier': 1},
  {'id': 'mot', 'name': '모트(Mot)', 'engName': 'Mot', 'tier': 1},
  {'id': 'ner', 'name': '네르(Ner)', 'engName': 'Ner', 'tier': 1},
  {'id': 'qax', 'name': '콱스(Qax)', 'engName': 'Qax', 'tier': 1},
  {'id': 'qua', 'name': '쿠아(Qua)', 'engName': 'Qua', 'tier': 1},
  {'id': 'que', 'name': '쿠에(Que)', 'engName': 'Que', 'tier': 1},
  {'id': 'thul', 'name': '주울(Thul)', 'engName': 'Thul', 'tier': 1},
  {'id': 'tzic', 'name': '치크(Tzic)', 'engName': 'Tzic', 'tier': 1},
  {'id': 'wat', 'name': '와트(Wat)', 'engName': 'Wat', 'tier': 1},
  {'id': 'xal', 'name': '잘(Xal)', 'engName': 'Xal', 'tier': 1},
  {'id': 'zec', 'name': '제크(Zec)', 'engName': 'Zec', 'tier': 1},
  {'id': 'ceh', 'name': '세흐(Ceh)', 'engName': 'Ceh', 'tier': 1},
  {'id': 'gar', 'name': '가르(Gar)', 'engName': 'Gar', 'tier': 1},
  {'id': 'lum', 'name': '룸(Lum)', 'engName': 'Lum', 'tier': 1},
  {'id': 'tal', 'name': '탈(Tal)', 'engName': 'Tal', 'tier': 1},
  {'id': 'teb', 'name': '테브(Teb)', 'engName': 'Teb', 'tier': 1},
  {'id': 'tec', 'name': '테크(Tec)', 'engName': 'Tec', 'tier': 1},
  {'id': 'ton', 'name': '톤(Ton)', 'engName': 'Ton', 'tier': 1},
  {'id': 'tun', 'name': '툰(Tun)', 'engName': 'Tun', 'tier': 1},
  {'id': 'nagu', 'name': '나구(Nagu)', 'engName': 'Nagu', 'tier': 1},
  {'id': 'igni', 'name': '이그니(Igni)', 'engName': 'Igni', 'tier': 1},
  {'id': 'chac', 'name': '차크(Chac)', 'engName': 'Chac', 'tier': 1},
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

'use client';
import { useState } from 'react';
import styles from './RunePriceSearch.module.css';

// Rune 인터페이스 정의
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
    window.open(url, '_blank');
    setSelectedRune(rune);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>디아블로4 룬 시세 검색</h2>
      
      <div className={styles.searchGroup}>
        <label htmlFor="runeSearch" className={styles.label}>룬 이름 검색</label>
        <input
          id="runeSearch"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="룬 이름을 입력하세요 (예: 베르, Ber)"
          className={styles.input}
        />
      </div>
      
      <div className={styles.runeGrid}>
        {filteredRunes.length > 0 ? (
          filteredRunes.map(rune => (
            <button
              key={rune.id}
              onClick={() => openRuneLink(rune)}
              className={`${styles.runeButton} ${selectedRune?.id === rune.id ? styles.runeButtonSelected : ''}`}
            >
              <div className={styles.runeName}>{rune.name}</div>
              {/* <div className={styles.runeTier}>티어 {rune.tier}</div> */}
            </button>
          ))
        ) : (
          <div className={styles.noResults}>검색 결과가 없습니다.</div>
        )}
      </div>
      
      {selectedRune && (
        <div className={styles.infoBox}>
          <h3 className={styles.infoTitle}>{selectedRune.name} 시세 정보</h3>
          <p className={styles.infoText}>
            선택한 룬의 현재 거래 시세를 확인하려면 아래 링크를 클릭하세요.
            diablo.trade 사이트에서 실시간 거래 정보를 확인할 수 있습니다.
          </p>
          <a
            href={`https://diablo.trade/listings/items?cursor=1&mode=season%20softcore&rune=${selectedRune.engName}&type=WTB`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.infoLink}
          >
            {selectedRune.name} 시세 확인하기
          </a>
        </div>
      )}
    </div>
  );
}

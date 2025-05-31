/**
 * GitHub API를 사용하여 README.md 파일에서 최신 업데이트 소식을 가져오는 유틸리티
 */

// 타입 정의
export interface UpdateItem {
  date: string;
  title: string;
  description?: string;
}

/**
 * GitHub 저장소의 README.md 파일에서 "최신 업데이트 소식" 섹션을 추출합니다.
 * 
 * @param owner GitHub 저장소 소유자 (예: 'nextkaki')
 * @param repo GitHub 저장소 이름 (예: 'KakiGaming')
 * @param branch 브랜치 이름 (기본값: 'main')
 * @returns 최신 업데이트 항목 배열
 */
export async function fetchLatestUpdates(
  owner: string = 'nextkaki',
  repo: string = 'KakiGaming',
  branch: string = 'main'
): Promise<UpdateItem[]> {
  try {
    // GitHub API를 통해 README.md 파일 내용 가져오기
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
    
    // ISR 방식으로 1시간마다 재검증 (GitHub API 쿼터 고려)
    const response = await fetch(url, { 
      next: { 
        revalidate: 3600 // 1시간마다 재검증
      },
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
        'User-Agent': 'KakiGaming-Website'
      }
    });
    
    if (!response.ok) {
      console.error(`GitHub API 오류: ${response.status}`);
      return [];
    }
    
    const content = await response.text();
    
    // "최신 업데이트 소식" 섹션 추출
    return extractUpdateSection(content);
  } catch (error) {
    console.error('GitHub 데이터 가져오기 오류:', error);
    return [];
  }
}

/**
 * README.md 내용에서 "최신 업데이트 소식" 섹션을 추출합니다.
 * 
 * @param content README.md 파일 내용
 * @returns 최신 업데이트 항목 배열
 */
function extractUpdateSection(content: string): UpdateItem[] {
  // "최신 업데이트 소식" 섹션 찾기
  const sectionRegex = /## 최신 업데이트 소식\s*\n([\s\S]*?)(?:\n##|$)/;
  const sectionMatch = content.match(sectionRegex);
  
  if (!sectionMatch || !sectionMatch[1]) {
    return [];
  }
  
  const sectionContent = sectionMatch[1].trim();
  
  // 각 업데이트 항목 추출 (날짜 형식: YYYY-MM-DD 또는 YYYY.MM.DD)
  const updateItems: UpdateItem[] = [];
  const itemRegex = /(?:^|\n)(?:\*|-|\d+\.)\s*(?:\[?(\d{4}[-.]\d{2}[-.]\d{2})\]?)[:\s]+(.*?)(?:\n|$)/g;
  
  let match;
  while ((match = itemRegex.exec(sectionContent)) !== null) {
    const date = match[1].replace(/\./g, '-'); // 날짜 형식 통일
    const titleLine = match[2].trim();
    
    // 제목과 설명 분리 (있는 경우)
    const titleParts = titleLine.split(/[:\-–—]/);
    const title = titleParts[0].trim();
    const description = titleParts.length > 1 ? titleParts.slice(1).join(' ').trim() : undefined;
    
    updateItems.push({ date, title, description });
  }
  
  // 날짜 기준 내림차순 정렬 (최신순)
  return updateItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 최신 업데이트 항목을 가져오되, 오류 발생 시 폴백 데이터를 반환합니다.
 * 
 * @param maxItems 최대 항목 수 (기본값: 5)
 * @returns 최신 업데이트 항목 배열
 */
export async function getLatestUpdates(maxItems: number = 5): Promise<UpdateItem[]> {
  try {
    const updates = await fetchLatestUpdates();
    
    // 업데이트 항목이 없는 경우 폴백 데이터 사용
    if (updates.length === 0) {
      return getFallbackUpdates();
    }
    
    return updates.slice(0, maxItems);
  } catch (error) {
    console.error('최신 업데이트 가져오기 오류:', error);
    return getFallbackUpdates();
  }
}

/**
 * API 오류 또는 데이터 없음 상황에서 사용할 폴백 데이터
 */
function getFallbackUpdates(): UpdateItem[] {
  return [
    {
      date: new Date().toISOString().split('T')[0],
      title: '토치라이트 인피니트 MP 봉인 계산기 업데이트',
      description: '정확도 향상 및 UI 개선'
    },
    {
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      title: '디아블로 4 시즌 4 룬 가격 정보 추가',
      description: '최신 시즌 데이터 반영'
    }
  ];
}

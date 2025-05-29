// 파일 경로: /home/ubuntu/kakigaming_fixed/scripts/convert_messages.js
// 역할: flat 구조의 메시지 파일을 nested 구조로 변환

const fs = require('fs');
const path = require('path');

// 지원하는 언어 목록
const locales = ['ko', 'en', 'zh'];

// 점(.) 표기법의 키를 중첩 객체로 변환하는 함수
function convertFlatToNested(flatObj) {
  const nestedObj = {};
  
  for (const [key, value] of Object.entries(flatObj)) {
    const keys = key.split('.');
    let current = nestedObj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!current[k]) {
        current[k] = {};
      }
      current = current[k];
    }
    
    current[keys[keys.length - 1]] = value;
  }
  
  return nestedObj;
}

// 각 언어별 메시지 파일 변환
locales.forEach(locale => {
  const filePath = path.join(__dirname, '..', 'public', 'locales', locale, 'common.json');
  
  try {
    // 파일 읽기
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const messages = JSON.parse(fileContent);
    
    // flat 구조를 nested 구조로 변환
    const nestedMessages = convertFlatToNested(messages);
    
    // 원본 파일 백업
    fs.writeFileSync(`${filePath}.bak`, fileContent);
    
    // 변환된 내용 저장
    fs.writeFileSync(filePath, JSON.stringify(nestedMessages, null, 2));
    
    console.log(`✅ ${locale}/common.json 변환 완료`);
  } catch (error) {
    console.error(`❌ ${locale}/common.json 변환 실패:`, error);
  }
});

console.log('모든 메시지 파일 변환 완료!');

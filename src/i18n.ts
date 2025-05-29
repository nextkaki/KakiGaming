// src/i18n.ts
import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // 1. locale 값이 없을 경우 기본 로케일(예: 'ko')을 사용하도록 설정합니다.
  const currentLocale = locale || 'ko';

  // 메시지 파일 로드
  const messages = (await import(`../public/locales/${currentLocale}/common.json`)).default;
  
  // 중요: messages를 'common' 네임스페이스로 래핑하여 반환
  return {
    locale: currentLocale,
    messages: {
      common: messages // 'common' 네임스페이스로 래핑
    }
  };
});

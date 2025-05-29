// 구글 애널리틱스 이벤트 추적을 위한 유틸리티 함수

// 타입 정의
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

// 일반 이벤트 추적 함수
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  // 클라이언트 사이드에서만 실행 & gtag가 로드되었는지 확인
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, eventParams);
};

// 메뉴 클릭 추적
export const trackMenuClick = (menuName: string) => {
  trackEvent('menu_click', { menu_name: menuName });
};

// 버튼 클릭 추적
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
  trackEvent('button_click', { 
    button_name: buttonName,
    button_location: buttonLocation || 'unknown'
  });
};

// 페이지 체류 시간 추적 (페이지 이탈 시)
export const trackTimeSpent = (pageName: string, timeInSeconds: number) => {
  trackEvent('time_spent', { 
    page_name: pageName,
    time_seconds: timeInSeconds
  });
};

// 페이지 체류 시간 측정 시작
export const startTimeTracking = (pageName: string): (() => void) => {
  const startTime = new Date().getTime();
  
  // 페이지 이탈 시 체류 시간 측정 및 이벤트 전송
  return () => {
    const endTime = new Date().getTime();
    const timeSpentInSeconds = Math.floor((endTime - startTime) / 1000);
    trackTimeSpent(pageName, timeSpentInSeconds);
  };
};

// 게임 관련 이벤트 추적 (KakiGaming 특화)
export const trackGameInteraction = (gameName: string, actionType: string) => {
  trackEvent('game_interaction', {
    game_name: gameName,
    action_type: actionType
  });
};

// 도구 사용 추적 (KakiGaming 특화)
export const trackToolUsage = (toolName: string, actionType: string) => {
  trackEvent('tool_usage', {
    tool_name: toolName,
    action_type: actionType
  });
};

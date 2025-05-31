import { NextResponse } from 'next/server';
import { getLatestUpdates } from '@/app/utils/githubApi';

/**
 * API 라우트 핸들러 - 최신 업데이트 정보를 JSON으로 반환합니다.
 * 
 * @returns 최신 업데이트 항목 배열을 포함한 JSON 응답
 */
export async function GET() {
  try {
    // githubApi.ts의 getLatestUpdates 함수를 사용하여 데이터 가져오기
    const updates = await getLatestUpdates(5);
    return NextResponse.json(updates);
  } catch (error) {
    console.error('최신 업데이트 가져오기 오류:', error);
    return NextResponse.json([]);
  }
}

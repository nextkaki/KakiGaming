import { Metadata } from "next";
import MainPageClient from "./MainPageClient";

export const metadata: Metadata = {
    title: "KakiGaming - 디아블로4, 패스 오브 엑자일, 토치라이트 인피니트, 엘든 링 공략 & 빌드 가이드",
    description:
        "KakiGaming은 디아블로4, 패스 오브 엑자일(POE), 토치라이트 인피니트, 엘든 링 등 인기 핵앤슬래시 및 액션 RPG 게임의 최신 공략, 캐릭터 빌드, 시즌별 가이드, 아이템 정보, 실시간 룬 시세, MP봉인·쿨타임 계산기 등 다양한 게임 유틸리티를 제공합니다. 초보자부터 고수까지 누구나 쉽게 이해할 수 있는 상세한 공략과 효율적인 게임 플레이를 위한 팁을 만나보세요. KakiGaming에서 원하는 게임 정보를 빠르게 찾아보고, 최고의 게임 경험을 누리세요.",
};

export default function MainPage() {
    return <MainPageClient />;
}

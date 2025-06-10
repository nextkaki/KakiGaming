import { Metadata } from "next";
import EldenringPageClient from "./EldenringPageClient";

export const metadata: Metadata = {
    title: "엘든링: 밤의 통치자 | KakiGaming",
    description: "엘든링 스핀오프 작품 밤의 통치자에 대한 정보를 제공합니다.",
};

export default function EldenringPage() {
    return <EldenringPageClient />;
}

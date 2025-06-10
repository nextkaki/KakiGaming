import { Metadata } from "next";
import TorchlightPageClient from "./TorchlightPageClient";

export const metadata: Metadata = {
    title: "토치라이트 인피니트 가이드 | KakiGaming",
    description: "토치라이트 인피니트의 공략과 계산기 정보를 제공합니다.",
};

export default function TorchlightPage() {
    return <TorchlightPageClient />;
}


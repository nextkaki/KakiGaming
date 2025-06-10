import { Metadata } from "next";
import PoePageClient from "./PoePageClient";

export const metadata: Metadata = {
    title: "패스 오브 엑자일 가이드 | KakiGaming",
    description: "패스 오브 엑자일 관련 가이드와 유용한 링크를 제공합니다.",
};

export default function PoEPage() {
    return <PoePageClient />;
}

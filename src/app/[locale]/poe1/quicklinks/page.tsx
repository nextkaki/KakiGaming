import { Metadata } from "next";
import PoeQuickLinksClient from "./PoeQuickLinksClient";

export const metadata: Metadata = {
    title: "패스 오브 엑자일 퀵 링크 모음 | KakiGaming",
    description: "유용한 PoE 관련 사이트와 도구 링크를 한곳에 모았습니다.",
};

export default function PoeQuickLinksPage() {
    return <PoeQuickLinksClient />;
}

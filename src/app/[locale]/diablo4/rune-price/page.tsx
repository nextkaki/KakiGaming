import { Metadata } from "next";
import RunePriceSearchClient from "./RunePriceSearchClient";

export const metadata: Metadata = {
    title: "디아블로4 룬 시세 검색 | KakiGaming",
    description: "디아블로4 룬 가격을 실시간으로 확인할 수 있는 검색 도구입니다.",
};

export default function RunePricePage() {
    return <RunePriceSearchClient />;
}

import { Metadata } from "next";
import Diablo4PageClient from "./Diablo4PageClient";

export const metadata: Metadata = {
    title: "디아블로4 | KakiGaming",
    description: "디아블로4 관련 정보와 도구를 제공합니다.",
};

export default function Diablo4Page() {
    return <Diablo4PageClient />;
}

import { Metadata } from "next";
import EldenringNightlordClient from "./EldenringNightlordClient";

export const metadata: Metadata = {
    title: "밤의 통치자 초보자 가이드 - 엘든링 | KakiGaming",
    description: "엘든링 밤의 통치자를 처음 플레이하는 유저를 위한 단계별 가이드입니다.",
};

export default function EldenringNightlordPage() {
    return <EldenringNightlordClient />;
}

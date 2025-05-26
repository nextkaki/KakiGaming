import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
    // 컴포넌트 내용
    return (
        <footer className="bg-gray-800 text-white mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">KakiGaming</h3>
                        <p className="text-gray-400">게임 공략과 유틸리티를 제공하는 커뮤니티입니다.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">게임 목록</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/diablo4" className="text-gray-400 hover:text-white">
                                    디아블로4
                                </Link>
                            </li>
                            <li>
                                <Link href="/poe1" className="text-gray-400 hover:text-white">
                                    패스 오브 엑자일 1
                                </Link>
                            </li>
                            <li>
                                <Link href="/poe2" className="text-gray-400 hover:text-white">
                                    패스 오브 엑자일 2
                                </Link>
                            </li>
                            <li>
                                <Link href="/torchlight" className="text-gray-400 hover:text-white">
                                    토치라이트 인피니트
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">유틸리티</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/torchlight/mp-calculator" className="text-gray-400 hover:text-white">
                                    MP봉인 계산기
                                </Link>
                            </li>
                            <li>
                                <Link href="/diablo4/rune-price" className="text-gray-400 hover:text-white">
                                    룬 시세 검색
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} KakiGaming. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

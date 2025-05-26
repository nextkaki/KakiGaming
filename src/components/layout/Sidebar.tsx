import Link from "next/link";
import { FC } from "react";

interface SidebarProps {
    className?: string;
}

const Sidebar: FC<SidebarProps> = ({ className = "" }) => {
    // 컴포넌트 내용
    return (
        <aside className={`${className}`}>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">게임 목록</h3>
                <ul className="space-y-2">
                    <li>
                        <Link href="/diablo4" className="text-gray-700 hover:text-purple-600 block">
                            디아블로4
                        </Link>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li>
                                <Link href="/diablo4/rune-price" className="text-gray-600 hover:text-purple-600 text-sm block">
                                    룬 시세 검색
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/poe1" className="text-gray-700 hover:text-purple-600 block">
                            패스 오브 엑자일 1
                        </Link>
                    </li>
                    <li>
                        <Link href="/poe2" className="text-gray-700 hover:text-purple-600 block">
                            패스 오브 엑자일 2
                        </Link>
                    </li>
                    <li>
                        <Link href="/torchlight" className="text-gray-700 hover:text-purple-600 block">
                            토치라이트 인피니트
                        </Link>
                        <ul className="ml-4 mt-1 space-y-1">
                            <li>
                                <Link href="/torchlight/mp-calculator" className="text-gray-600 hover:text-purple-600 text-sm block">
                                    MP봉인 계산
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">유틸리티</h3>
                <ul className="space-y-2">
                    <li>
                        <Link href="/torchlight/mp-calculator" className="text-gray-700 hover:text-purple-600 block">
                            MP봉인 계산기
                        </Link>
                    </li>
                    <li>
                        <Link href="/diablo4/rune-price" className="text-gray-700 hover:text-purple-600 block">
                            룬 시세 검색
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;

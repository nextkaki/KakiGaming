"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // 클라이언트 사이드에서만 렌더링되도록 처리
    useEffect(() => {
        setMounted(true);
    }, []);

    // 서버 사이드 렌더링 시 기본 구조만 반환
    if (!mounted) {
        return (
            <header className="bg-purple-700 text-white shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-bold">
                                KakiGaming
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <button className="text-white focus:outline-none">☰</button>
                        </div>
                        <nav className="hidden md:flex md:flex-grow justify-center space-x-6">
                            {/* 서버 렌더링 시 간소화된 메뉴 */}
                            <div className="py-2">디아블로4</div>
                            <div className="py-2">패스 오브 엑자일 1</div>
                            <div className="py-2">패스 오브 엑자일 2</div>
                            <div className="py-2">토치라이트 인피니트</div>
                        </nav>
                        <div className="hidden md:block w-[100px]"></div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-purple-700 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold">
                            KakiGaming
                        </Link>
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? "✕" : "☰"}
                        </button>
                    </div>

                    {/* 데스크톱 메뉴 - 가운데 정렬 */}
                    <nav className="hidden md:flex md:flex-grow justify-center space-x-6">
                        <div className="relative group">
                            <Link href="/diablo4" className="py-2 hover:text-purple-200">
                                디아블로4
                            </Link>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                                <div className="py-1">
                                    <Link href="/diablo4/rune-price" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        룬 시세 검색
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <Link href="/poe1" className="py-2 hover:text-purple-200">
                                패스 오브 엑자일 1
                            </Link>
                        </div>

                        <div className="relative group">
                            <Link href="/poe2" className="py-2 hover:text-purple-200">
                                패스 오브 엑자일 2
                            </Link>
                        </div>

                        <div className="relative group">
                            <Link href="/torchlight" className="py-2 hover:text-purple-200">
                                토치라이트 인피니트
                            </Link>
                            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                                <div className="py-1">
                                    <Link href="/torchlight/mp-calculator" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        MP봉인 계산
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* 검색 제거하고 빈 공간으로 대체 */}
                    <div className="hidden md:block w-[100px]"></div>
                </div>

                {/* 모바일 메뉴 - 검색 제거 */}
                {isMenuOpen && (
                    <div className="md:hidden py-4">
                        <Link href="/diablo4" className="block py-2 hover:bg-purple-600">
                            디아블로4
                        </Link>
                        <Link href="/diablo4/rune-price" className="block py-2 pl-4 text-sm hover:bg-purple-600">
                            - 룬 시세 검색
                        </Link>

                        <Link href="/poe1" className="block py-2 hover:bg-purple-600">
                            패스 오브 엑자일 1
                        </Link>

                        <Link href="/poe2" className="block py-2 hover:bg-purple-600">
                            패스 오브 엑자일 2
                        </Link>

                        <Link href="/torchlight" className="block py-2 hover:bg-purple-600">
                            토치라이트 인피니트
                        </Link>
                        <Link href="/torchlight/mp-calculator" className="block py-2 pl-4 text-sm hover:bg-purple-600">
                            - MP봉인 계산
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

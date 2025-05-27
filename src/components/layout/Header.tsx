"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const closeTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseEnter = (menu: string) => {
        if (closeTimeout.current) {
            clearTimeout(closeTimeout.current);
        }
        setHoveredMenu(menu);
    };

    const handleMouseLeave = () => {
        closeTimeout.current = setTimeout(() => {
            setHoveredMenu(null);
        }, 200);
    };

    if (!mounted) return null;

    return (
        <header className="bg-purple-700 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* 왼쪽 로고 */}
                    <div className="shrink-0">
                        <Link href="/" className="text-xl font-bold text-white">
                            KakiGaming
                        </Link>
                    </div>

                    {/* 중앙 메뉴 */}
                    <nav className="hidden md:flex gap-10 text-white items-center">
                        <div className="relative" onMouseEnter={() => handleMouseEnter("diablo4")} onMouseLeave={handleMouseLeave}>
                            <div className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">디아블로4</div>
                            {hoveredMenu === "diablo4" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                                    <Link href="/diablo4/rune-price" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        룬 시세 검색
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="relative h-16 flex items-center px-2">
                            <Link href="/poe1" className="hover:text-purple-200">
                                패스 오브 엑자일 1
                            </Link>
                        </div>

                        <div className="relative h-16 flex items-center px-2">
                            <Link href="/poe2" className="hover:text-purple-200">
                                패스 오브 엑자일 2
                            </Link>
                        </div>

                        <div className="relative" onMouseEnter={() => handleMouseEnter("torchlight")} onMouseLeave={handleMouseLeave}>
                            <div className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">토치라이트 인피니트</div>
                            {hoveredMenu === "torchlight" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10">
                                    <Link href="/torchlight/mp-calculator" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        MP봉인 계산
                                    </Link>
                                    <Link href="/torchlight/cooltime-calculator" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        쿨타임 계산기
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="relative h-16 flex items-center px-2">
                            <a href="https://www.youtube.com/@KakiGameHub" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                <img src="/images/youtube-icon.svg" alt="YouTube" className="h-10 w-10" />
                            </a>
                        </div>
                    </nav>

                    {/* 우측 여백 */}
                    <div className="hidden md:block w-[100px] shrink-0" />

                    {/* 모바일 메뉴 버튼 */}
                    <div className="md:hidden ml-auto">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none text-xl">
                            {isMenuOpen ? "✕" : "☰"}
                        </button>
                    </div>
                </div>

                {/* 모바일 메뉴 */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-1">
                        <Link href="/diablo4" className="block py-2 hover:bg-purple-600 px-4">
                            디아블로4
                        </Link>
                        <Link href="/diablo4/rune-price" className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - 룬 시세 검색
                        </Link>
                        <Link href="/poe1" className="block py-2 hover:bg-purple-600 px-4">
                            패스 오브 엑자일 1
                        </Link>
                        <Link href="/poe2" className="block py-2 hover:bg-purple-600 px-4">
                            패스 오브 엑자일 2
                        </Link>
                        <Link href="/torchlight" className="block py-2 hover:bg-purple-600 px-4">
                            토치라이트 인피니트
                        </Link>
                        <Link href="/torchlight/mp-calculator" className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - MP봉인 계산
                        </Link>
                        <Link href="/torchlight/cooltime-calculator" className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - 쿨타임 계산기
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

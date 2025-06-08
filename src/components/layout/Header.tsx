"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";

const Header = () => {
    const t = useTranslations("common");
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = (params.locale as string) || "ko";

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

    const changeLanguage = (newLocale: string) => {
        // 현재 경로에서 로케일 부분을 추출하여 새 로케일로 변경
        const segments = pathname.split("/");
        segments[1] = newLocale; // 첫 번째 세그먼트는 로케일

        const newPath = segments.join("/");
        router.push(newPath);

        // 선택한 언어 저장
        if (typeof window !== "undefined") {
            localStorage.setItem("selectedLanguage", newLocale);
        }
    };

    if (!mounted) return null;

    return (
        <header className="bg-purple-700 text-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* 왼쪽 로고 */}
                    <div className="shrink-0">
                        <Link href={`/${locale}`} className="text-xl font-bold text-white">
                            KakiGaming
                        </Link>
                    </div>

                    {/* 중앙 메뉴 */}
                    <nav className="hidden md:flex gap-10 text-white items-center">
                        <div className="relative" onMouseEnter={() => handleMouseEnter("diablo4")} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/diablo4`} className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">
                                {t("header.diablo4")}
                            </Link>
                            {hoveredMenu === "diablo4" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                                    <Link href={`/${locale}/diablo4/rune-price`} className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("header.rune_price")}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="relative" onMouseEnter={() => handleMouseEnter("poe")} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/poe1`} className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">
                                {t("header.poe")}
                            </Link>
                            {hoveredMenu === "poe" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                                    {/* <Link href={`/${locale}/poe1`} className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("poe.list_build")}
                                    </Link> */}
                                    <Link href={`/${locale}/poe1/quicklinks`} className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("poe.quicklinks.shorts")}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* <div className="relative h-16 flex items-center px-2">
                            <Link href={`/${locale}/poe2`} className="hover:text-purple-200">
                                {t('header.poe2')}
                            </Link>
                        </div> */}

                        <div className="relative" onMouseEnter={() => handleMouseEnter("torchlight")} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/torchlight`} className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">
                                {t("header.torchlight")}
                            </Link>
                            {hoveredMenu === "torchlight" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                                    <Link href={`/${locale}/torchlight/mp-calculator`} className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("header.mp_calculator")}
                                    </Link>
                                    <Link href={`/${locale}/torchlight/cooltime-calculator`} className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("torchlight.tools.cooltime_calculator.title")}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="relative" onMouseEnter={() => handleMouseEnter("eldenring")} onMouseLeave={handleMouseLeave}>
                            <Link href={`/${locale}/eldenring`} className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">
                                {t("header.eldenring")}
                            </Link>
                            {hoveredMenu === "eldenring" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                                    <Link href={`/${locale}/eldenring/nightlord`} className="block px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("header.nightlord")}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* 언어 선택 드롭다운 */}
                        <div className="relative" onMouseEnter={() => handleMouseEnter("lang")} onMouseLeave={handleMouseLeave}>
                            <div className="h-16 flex items-center px-2 cursor-pointer hover:text-purple-200">{t("header.language")}</div>
                            {hoveredMenu === "lang" && (
                                <div className="absolute top-full mt-1 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10">
                                    <button onClick={() => changeLanguage("ko")} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("header.korean")}
                                    </button>
                                    <button onClick={() => changeLanguage("en")} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("header.english")}
                                    </button>
                                    <button onClick={() => changeLanguage("zh")} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100">
                                        {t("header.chinese")}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="relative h-16 flex items-center px-2">
                            <a href="https://www.youtube.com/@KakiGameHub" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                                <Image src="/images/youtube-icon.svg" alt="YouTube" width={40} height={40} />
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
                        <Link href={`/${locale}/diablo4`} className="block py-2 hover:bg-purple-600 px-4">
                            {t("header.diablo4")}
                        </Link>
                        <Link href={`/${locale}/diablo4/rune-price`} className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("header.rune_price")}
                        </Link>
                        <Link href={`/${locale}/poe1`} className="block py-2 hover:bg-purple-600 px-4">
                            {t("header.poe")}
                        </Link>
                        <Link href={`/${locale}/poe2`} className="block py-2 hover:bg-purple-600 px-4">
                            {t("header.poe2")}
                        </Link>
                        <Link href={`/${locale}/torchlight`} className="block py-2 hover:bg-purple-600 px-4">
                            {t("header.torchlight")}
                        </Link>
                        <Link href={`/${locale}/torchlight/mp-calculator`} className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("header.mp_calculator")}
                        </Link>
                        <Link href={`/${locale}/torchlight/cooltime-calculator`} className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("torchlight.tools.cooltime_calculator.title")}
                        </Link>
                        <Link href={`/${locale}/eldenring`} className="block py-2 hover:bg-purple-600 px-4">
                            {t("header.eldenring")}
                        </Link>
                        <Link href={`/${locale}/eldenring/nightlord`} className="block py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("header.nightlord")}
                        </Link>

                        {/* 모바일 언어 선택 */}
                        <div className="block py-2 hover:bg-purple-600 px-4">{t("header.language")}</div>
                        <button onClick={() => changeLanguage("ko")} className="block w-full text-left py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("header.korean")}
                        </button>
                        <button onClick={() => changeLanguage("en")} className="block w-full text-left py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("header.english")}
                        </button>
                        <button onClick={() => changeLanguage("zh")} className="block w-full text-left py-1 pl-6 text-sm hover:bg-purple-600">
                            - {t("header.chinese")}
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

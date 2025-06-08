'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
    const t = useTranslations('common');
    const params = useParams();
    const pathname = usePathname();
    const locale = (params.locale as string) || 'ko';

    const currentSection = pathname.split('/')[2];
    
    return (
        <div className={`${className}`}>
            <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-white">{t("header.games")}</h2>
                <ul className="space-y-2">
                    <li>
                        <Link href={`/${locale}/diablo4`} className="text-gray-300 hover:text-white transition block py-1">
                            {t("header.diablo4")}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${locale}/poe1`} className="text-gray-300 hover:text-white transition block py-1">
                            {t("header.poe")}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${locale}/torchlight`} className="text-gray-300 hover:text-white transition block py-1">
                            {t("header.torchlight")}
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${locale}/eldenring`} className="text-gray-300 hover:text-white transition block py-1">
                            {t("header.eldenring")}
                        </Link>
                    </li>
                </ul>
                
                {(currentSection === 'diablo4' || currentSection === 'torchlight' || currentSection === 'eldenring' || currentSection === 'poe1') && (
                    <>
                        <h2 className="text-xl font-bold mb-4 mt-8 text-white">{t("header.menu")}</h2>
                        <ul className="space-y-2">
                            {currentSection === 'diablo4' && (
                                <li>
                                    <Link href={`/${locale}/diablo4/rune-price`} className="text-gray-300 hover:text-white transition block py-1">
                                        {t("header.rune_price")}
                                    </Link>
                                </li>
                            )}
                            {currentSection === 'torchlight' && (
                                <>
                                    <li>
                                        <Link href={`/${locale}/torchlight/mp-calculator`} className="text-gray-300 hover:text-white transition block py-1">
                                            {t("header.mp_calculator")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/${locale}/torchlight/cooltime-calculator`} className="text-gray-300 hover:text-white transition block py-1">
                                            {t("torchlight.tools.cooltime_calculator.title")}
                                        </Link>
                                    </li>
                                </>
                            )}
                            {currentSection === 'eldenring' && (
                                <li>
                                    <Link href={`/${locale}/eldenring/nightlord`} className="text-gray-300 hover:text-white transition block py-1">
                                        {t("eldenring.beginner")}
                                    </Link>
                                </li>
                            )}
                            {currentSection === 'poe1' && (
                                <li>
                                    <Link href={`/${locale}/eldenring/nightlord`} className="text-gray-300 hover:text-white transition block py-1">
                                        {t("poe.quicklinks.shorts")}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
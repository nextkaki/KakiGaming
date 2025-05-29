// 파일 경로: /src/components/layout/Sidebar.tsx
// 역할: 다국어 지원 추가
'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
    const t = useTranslations('common');
    const params = useParams();
    const locale = params.locale as string || 'ko';
    
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
                        <Link href={`/${locale}/torchlight`} className="text-gray-300 hover:text-white transition block py-1">
                            {t("header.torchlight")}
                        </Link>
                    </li>
                </ul>
                
                <h2 className="text-xl font-bold mb-4 mt-8 text-white">{t("header.tools")}</h2>
                <ul className="space-y-2">
                    <li>
                        <Link href={`/${locale}/diablo4/rune-price`} className="text-gray-300 hover:text-white transition block py-1">
                            {t("header.rune_price")}
                        </Link>
                    </li>
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
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;

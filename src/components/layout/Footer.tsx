// 파일 경로: /src/components/layout/Footer.tsx
// 역할: 다국어 지원 추가
'use client';

import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("common");
    
    return (
        <footer className="bg-black text-gray-400 py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
                    </div>
                    <div className="text-sm">
                        <p>{t("footer.disclaimer")}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

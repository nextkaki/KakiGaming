// 파일 경로: /src/app/[locale]/layout.tsx
import { ReactNode } from "react";
import "../globals.css"; // 상위 폴더의 globals.css 참조
import { Noto_Sans_KR } from "next/font/google";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";

const notoSansKr = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
    variable: "--font-noto-sans-kr",
});

// 지원하는 언어 목록 정의
export function generateStaticParams() {
    return [{ locale: "ko" }, { locale: "en" }, { locale: "zh" }];
}

// 타입 명시적으로 추가
export default async function LocaleLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
    // params를 await 후 구조분해
    const { locale } = await Promise.resolve(params);

    // 해당 언어의 번역 파일 로드
    let messages;
    try {
        const loadedMessages = (await import(`../../../public/locales/${locale}/common.json`)).default;
        // 중요: 'common' 네임스페이스로 래핑
        messages = {
            common: loadedMessages,
        };
        // console.log('Loaded messages:', JSON.stringify(messages, null, 2)); // 디버깅용
    } catch (e) {
        console.error(e);
        notFound();
    }

    return (
        <html lang={locale} className={notoSansKr.variable}>
            <head>
                {/* Google Analytics */}
                <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-VNF9KXKBDY" />
                <Script
                    id="gtag-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VNF9KXKBDY');
            `,
                    }}
                />
            </head>
            <body className="font-noto bg-[#121212] text-[#f5f5f5]">
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row gap-12">
                            <Sidebar className="w-full md:w-1/5 mb-6 md:mb-0" />
                            <main className="w-full md:w-3/5">{children}</main>
                            <aside className="w-full md:w-1/5 mt-6 md:mt-0">
                                {/* 광고 영역 */}
                                <div className="bg-[#1e1e1e] p-4 rounded-lg shadow h-[600px] flex items-center justify-center border border-dashed border-gray-700">
                                    <p className="text-gray-400">광고 영역</p>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

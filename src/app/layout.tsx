import './globals.css';
import { Noto_Sans_KR } from 'next/font/google';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata = {
  title: 'KakiGaming - 게임 공략 센터',
  description: '디아블로4, 패스 오브 엑자일, 토치라이트 인피니트 등 다양한 게임 공략과 계산기',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body className="font-noto bg-[#121212] text-[#f5f5f5]">
        <Header />
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
          <Sidebar className="w-full md:w-1/5 mb-6 md:mb-0 md:mr-6" />
          <main className="w-full md:w-3/5">{children}</main>
          <aside className="w-full md:w-1/5 mt-6 md:mt-0 md:ml-6">
            {/* 광고 영역 */}
            <div className="bg-[#1e1e1e] p-4 rounded-lg shadow mb-6 h-[600px] flex items-center justify-center border border-dashed border-gray-700">
              <p className="text-gray-400">광고 영역 (300x600)</p>
            </div>
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}

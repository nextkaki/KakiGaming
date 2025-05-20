import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KakiGaming - 게임 공략 센터',
  description: '종합 게임 채널 카키카키 게이밍의 다양한 게임 공략과 계산기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
          <Sidebar className="w-full md:w-1/5 mb-6 md:mb-0 md:mr-6" />
          <main className="w-full md:w-3/5">{children}</main>
          <aside className="w-full md:w-1/5 mt-6 md:mt-0 md:ml-6">
            {/* 광고 영역 */}
            <div className="bg-white p-4 rounded-lg shadow mb-6 h-[600px] flex items-center justify-center border border-dashed border-gray-300">
              <p className="text-gray-400">광고 영역 (300x600)</p>
            </div>
          </aside>
        </div>
        <Footer />
      </body>
    </html>
  );
}

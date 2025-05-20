'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-6">
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

          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="검색..."
                className="bg-purple-600 text-white placeholder-purple-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        </div>

        {/* 모바일 메뉴 */}
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
            
            <div className="mt-4">
              <input
                type="text"
                placeholder="검색..."
                className="w-full bg-purple-600 text-white placeholder-purple-300 rounded-full py-1 px-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

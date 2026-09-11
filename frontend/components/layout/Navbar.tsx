'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut,
  Mic,
  LogIn,
  UserPlus,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { currentLang, setLanguage, currentOption, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-1 shadow-xs transition-transform duration-200 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="UDYAM-SETU" 
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-sans">
                UDYAM-SETU
              </span>
              <span className="text-[8px] sm:text-[9.5px] font-semibold text-slate-500 tracking-normal">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-[13px] font-semibold text-slate-700">
            <Link
              href="/"
              className={`transition-colors py-1.5 border-b-2 ${
                pathname === '/' 
                  ? 'text-[#0d4f3b] border-[#0d4f3b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#0d4f3b]'
              }`}
            >
              {t('home')}
            </Link>

            <Link
              href="/schemes"
              className={`transition-colors py-1.5 border-b-2 ${
                pathname === '/schemes' 
                  ? 'text-[#0d4f3b] border-[#0d4f3b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#0d4f3b]'
              }`}
            >
              {t('schemes')}
            </Link>

            <Link
              href="/calculators/working-capital"
              className={`transition-colors py-1.5 border-b-2 ${
                pathname.startsWith('/calculators') 
                  ? 'text-[#0d4f3b] border-[#0d4f3b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#0d4f3b]'
              }`}
            >
              {t('finance')}
            </Link>

            <Link
              href="/assistant"
              className={`inline-flex items-center gap-1.5 transition-colors py-1.5 border-b-2 ${
                pathname === '/assistant' 
                  ? 'text-[#0d4f3b] border-[#0d4f3b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#0d4f3b]'
              }`}
            >
              <Mic className="w-4 h-4 text-amber-500" />
              <span>{t('aiVoice')}</span>
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg border border-slate-200 hover:border-[#0d4f3b] text-slate-700 hover:text-slate-900 bg-white transition shadow-2xs"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-medium">{currentOption.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as LanguageCode);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 transition ${
                          currentLang === lang.code ? 'bg-emerald-50 text-[#0d4f3b] font-bold' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.nativeName}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Login & Register Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-50 text-[#0d4f3b] border border-emerald-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg hover:bg-emerald-100 transition shadow-xs"
                >
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="max-w-[100px] truncate">{user.name || user.mobile || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition border border-slate-200"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#0d4f3b] px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-slate-200 hover:border-[#0d4f3b] transition bg-white shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('login')}</span>
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1 text-xs font-bold bg-[#0d4f3b] hover:bg-[#093d2d] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-xs hover:shadow transition-all duration-200"
                >
                  <UserPlus className="w-3.5 h-3.5 text-amber-300" />
                  <span>{t('register')}</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden border border-slate-200"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800"
              >
                {t('home')}
              </Link>
              <Link
                href="/schemes"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800"
              >
                {t('schemes')}
              </Link>
              <Link
                href="/calculators/working-capital"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800"
              >
                {t('finance')}
              </Link>
              <Link
                href="/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800 flex items-center gap-1.5 text-amber-700 font-bold"
              >
                <Mic className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('aiVoice')}</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100">
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center text-xs font-bold bg-emerald-50 text-[#0d4f3b] border border-emerald-200 py-2.5 rounded-lg"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2.5 text-xs font-bold text-rose-600 border border-rose-200 bg-rose-50 rounded-lg hover:bg-rose-100"
                  >
                    <LogOut className="w-4 h-4 inline mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-1/2 text-center text-xs font-bold border border-slate-200 text-slate-700 py-2.5 rounded-lg hover:bg-slate-50"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-1/2 text-center text-xs font-bold bg-[#0d4f3b] text-white py-2.5 rounded-lg shadow-sm hover:bg-[#093d2d]"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </header>
  );
}


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Landmark, 
  Languages, 
  User as UserIcon, 
  LogOut, 
  Sparkles, 
  LayoutDashboard,
  FileSearch,
  Store,
  TrendingUp,
  Database,
  Layers,
  Mic,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';

export default function Navbar() {
  const { user, logout, loginAsGuest } = useAuth();
  const { currentLang, setLanguage, currentOption, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const router = useRouter();

  const handleGuestDemo = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & MoSJE Endorsement */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-900 transition">
              <Landmark className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                GramBiz <span className="text-emerald-700 font-extrabold">AI</span>
                <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-sm">PRO</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation with Multilingual Translation */}
          <nav className="hidden lg:flex items-center space-x-4 text-xs font-semibold text-slate-700">
            <Link href="/" className="hover:text-emerald-700 transition">{t('home')}</Link>
            <Link href="/assessment/new" className="hover:text-emerald-700 transition">{t('advisor')}</Link>
            <Link href="/ocr" className="hover:text-emerald-700 transition flex items-center gap-1">
              <FileSearch className="w-3.5 h-3.5 text-emerald-700" />
              {t('ocr')}
            </Link>
            <Link href="/forecast" className="hover:text-emerald-700 transition flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              {t('forecast')}
            </Link>
            <Link href="/mandi" className="hover:text-emerald-700 transition flex items-center gap-1">
              <Store className="w-3.5 h-3.5 text-emerald-700" />
              {t('mandi')}
            </Link>
            <Link href="/compare" className="hover:text-emerald-700 transition flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              {t('compare')}
            </Link>
            <Link href="/assistant" className="text-emerald-800 font-bold hover:text-emerald-900 flex items-center gap-1">
              <Mic className="w-3.5 h-3.5 text-amber-500" />
              {t('voiceAi')}
            </Link>
            <Link href="/admin" className="hover:text-slate-900 transition flex items-center gap-1 text-slate-500">
              <Database className="w-3.5 h-3.5" />
              {t('admin')}
            </Link>
          </nav>

          {/* Right Action Buttons with 8 Languages Dropdown */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* 8-Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 transition shadow-sm bg-white"
              >
                <span>{currentOption.flag}</span>
                <span className="hidden sm:inline">{currentOption.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-slate-400 border-b border-slate-100">
                    Select Language / भाषा चुनें
                  </div>
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as LanguageCode);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                        currentLang === lang.code ? 'bg-emerald-50 text-emerald-900 font-extrabold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center text-[10px] font-black">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate hidden md:inline">{user.name.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                <Link
                  href="/assessment/new"
                  className="text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition whitespace-nowrap"
                >
                  {t('newAssessment')}
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <button
                  onClick={handleGuestDemo}
                  className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline">Try Demo</span>
                </button>

                <Link
                  href="/assessment/new"
                  className="text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg shadow-sm hover:shadow transition whitespace-nowrap"
                >
                  {t('newAssessment')}
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}

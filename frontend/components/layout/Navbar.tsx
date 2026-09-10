'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
  ChevronDown,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';

export default function Navbar() {
  const { user, logout, loginAsGuest } = useAuth();
  const { currentLang, setLanguage, currentOption, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleGuestDemo = () => {
    loginAsGuest();
    setMobileMenuOpen(false);
    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: t('home'), icon: Compass },
    { href: '/assessment/new', label: t('advisor'), icon: Landmark },
    { href: '/ocr', label: t('ocr'), icon: FileSearch },
    { href: '/forecast', label: t('forecast'), icon: TrendingUp },
    { href: '/mandi', label: t('mandi'), icon: Store },
    { href: '/compare', label: t('compare'), icon: Layers },
    { href: '/assistant', label: t('voiceAi'), icon: Mic, highlight: true },
    { href: '/admin', label: t('admin'), icon: Database }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Name: UDYAM-SETU */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="h-10 sm:h-12 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Udyam-Setu Logo" 
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm" 
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                UDYAM-<span className="text-emerald-700">SETU</span>
                <span className="text-[9px] bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded shadow-sm">AI</span>
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wide uppercase truncate max-w-[200px] sm:max-w-xs">
                {t('tagline')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 font-semibold text-xs text-slate-700">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                      : link.highlight
                      ? 'text-emerald-800 font-extrabold hover:bg-emerald-50/80'
                      : 'hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${link.highlight ? 'text-amber-500' : isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Language + Auth Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* 8-Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-slate-800 transition shadow-xs bg-white"
              >
                <span>{currentOption.flag}</span>
                <span className="hidden sm:inline">{currentOption.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Select Language / भाषा चुनें
                  </div>
                  <div className="max-h-64 overflow-y-auto pt-1">
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as LanguageCode);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                          currentLang === lang.code ? 'bg-emerald-50 text-emerald-900 font-black' : 'text-slate-700'
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
                </div>
              )}
            </div>

            {/* Auth / Action CTA */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition shadow-xs"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center text-[10px] font-black">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                <Link
                  href="/assessment/new"
                  className="text-xs font-bold bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {t('newAssessment')}
                </Link>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={handleGuestDemo}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-amber-50 text-amber-950 border border-amber-300/80 hover:bg-amber-100 transition shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Try Demo</span>
                </button>

                <Link
                  href="/assessment/new"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 text-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>{t('newAssessment')}</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 xl:hidden border border-slate-200"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-slate-100 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive 
                        ? 'bg-emerald-100 text-emerald-900 font-bold' 
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-emerald-700" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/assessment/new"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-xs font-bold bg-emerald-800 text-white py-2.5 rounded-xl shadow-sm"
              >
                {t('startAssessment')}
              </Link>
              <button
                onClick={handleGuestDemo}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-bold bg-amber-50 text-amber-950 border border-amber-300 py-2.5 rounded-xl"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Try Demo as Evaluator</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

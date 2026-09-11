'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  LogOut,
  HelpCircle,
  Store,
  TrendingUp,
  FileSearch,
  Mic
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../../context/LanguageContext';

export default function Navbar() {
  const { user, logout, loginAsGuest } = useAuth();
  const { currentLang, setLanguage, currentOption, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
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
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 font-sans">
                  UDYAM-SETU
                </span>
                <span className="text-[10px] font-black bg-[#f59e0b] text-slate-950 px-1.5 py-0.5 rounded shadow-xs">
                  AI
                </span>
              </div>
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
              href="/assessment/new"
              className={`transition-colors py-1.5 border-b-2 ${
                pathname.startsWith('/assessment') 
                  ? 'text-[#0d4f3b] border-[#0d4f3b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#0d4f3b]'
              }`}
            >
              {t('aiAdvisor')}
            </Link>

            <Link
              href="/compare"
              className={`transition-colors py-1.5 border-b-2 ${
                pathname === '/compare' 
                  ? 'text-[#0d4f3b] border-[#0d4f3b] font-bold' 
                  : 'text-slate-600 border-transparent hover:text-[#0d4f3b]'
              }`}
            >
              {t('marketIntelligence')}
            </Link>

            <Link
              href="/#schemes"
              className="text-slate-600 border-b-2 border-transparent hover:text-[#0d4f3b] transition-colors py-1.5"
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

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
                className="flex items-center gap-1 text-slate-600 hover:text-[#0d4f3b] transition py-1.5"
              >
                <span>{t('resources')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {resourcesOpen && (
                <div className="absolute left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
                  <Link
                    href="/#workflow"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0d4f3b]"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('howItWorks')}</span>
                  </Link>
                  <Link
                    href="/mandi"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0d4f3b]"
                  >
                    <Store className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('liveMandi')}</span>
                  </Link>
                  <Link
                    href="/forecast"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0d4f3b]"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('demandForecast')}</span>
                  </Link>
                  <Link
                    href="/ocr"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0d4f3b]"
                  >
                    <FileSearch className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{t('docScanner')}</span>
                  </Link>
                  <Link
                    href="/assistant"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-[#0d4f3b]"
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t('voiceAi')}</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            
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

            {/* Try Demo Button */}
            <button
              onClick={handleGuestDemo}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#fef3c7] text-[#92400e] border border-[#fde68a] hover:bg-[#fde68a] transition shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              <span>{t('tryDemo')}</span>
            </button>

            {/* New Assessment Button */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/assessment/new"
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#0d4f3b] hover:bg-[#093d2d] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                >
                  <span>{t('newAssessment')}</span>
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
              <Link
                href="/assessment/new"
                className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#0d4f3b] hover:bg-[#093d2d] text-white px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200"
              >
                <span>{t('newAssessment')}</span>
              </Link>
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
                href="/assessment/new"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800"
              >
                {t('aiAdvisor')}
              </Link>
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800"
              >
                {t('marketIntelligence')}
              </Link>
              <Link
                href="/#schemes"
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
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 rounded-lg text-slate-800 flex items-center gap-1.5 text-amber-700"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{t('voiceAi')}</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/assessment/new"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-xs font-bold bg-[#0d4f3b] text-white py-2.5 rounded-lg shadow-sm"
              >
                {t('startAssessmentBtn')}
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

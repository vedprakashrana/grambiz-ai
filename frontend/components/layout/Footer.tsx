'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-slate-700 pt-12 pb-8 border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          
          {/* Col 1: Brand & Subtitle & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-lg bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="UDYAM-SETU Logo" 
                  className="h-full w-full object-contain" 
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-tight text-slate-900">
                    UDYAM-SETU
                  </span>
                  <span className="text-[10px] font-black bg-[#f59e0b] text-slate-950 px-1.5 py-0.5 rounded shadow-xs">
                    AI
                  </span>
                </div>
                <span className="text-[9px] font-medium text-slate-500">
                  {t('tagline')}
                </span>
              </div>
            </div>
            <p className="text-xs font-serif italic text-emerald-800 font-semibold pt-1">
              {t('footerTagline')}
            </p>
          </div>

          {/* Col 2: Platform Links (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 mb-3">
              {t('platform')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/assessment/new" className="hover:text-[#0d4f3b] transition-colors">
                  {t('aiAdvisor')}
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#0d4f3b] transition-colors">
                  {t('marketIntelligence')}
                </Link>
              </li>
              <li>
                <Link href="/#schemes" className="hover:text-[#0d4f3b] transition-colors">
                  {t('schemes')}
                </Link>
              </li>
              <li>
                <Link href="/calculators/working-capital" className="hover:text-[#0d4f3b] transition-colors">
                  {t('finance')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-slate-900 mb-3">
              {t('resourcesHeading')}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/#workflow" className="hover:text-[#0d4f3b] transition-colors">
                  {t('howItWorks')}
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-[#0d4f3b] transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-[#0d4f3b] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0d4f3b] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Built for SIH 2026 & Digital India Logo (3 cols) */}
          <div className="lg:col-span-4 flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold block">
                {t('builtFor')}
              </span>
              <h4 className="text-xs font-bold text-slate-900 mb-0.5">
                {t('sih2026')}
              </h4>
              <p className="text-[11px] text-slate-600 leading-tight">
                {t('mosjeMinistry')}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {t('ps2609')}
              </p>
              <p className="text-[10px] text-slate-500">
                {t('agriRuralDev')}
              </p>
            </div>

            {/* Digital India / Viksit Bharat Icon */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#138808] via-white to-[#FF9933] p-0.5 shadow-xs">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-[#000080] text-sm">
                  🇮🇳
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-800 leading-tight">{t('digitalIndia')}</span>
                <span className="text-[9px] font-semibold text-emerald-800">{t('viksitBharat')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 UDYAM-SETU AI. {t('allRightsReserved')}</p>
          <div className="flex items-center space-x-4 text-slate-500 font-normal">
            <Link href="/privacy" className="hover:text-slate-800 transition">{t('privacyPolicy')}</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-slate-800 transition">{t('termsOfUse')}</Link>
            <span>|</span>
            <Link href="/accessibility" className="hover:text-slate-800 transition">{t('accessibility')}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

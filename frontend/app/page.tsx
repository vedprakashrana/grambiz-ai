'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  Store,
  BarChart3,
  Percent,
  Briefcase,
  Coins,
  User,
  Cpu,
  TrendingUp,
  Target,
  Users,
  LayoutGrid,
  AlertTriangle,
  Lightbulb,
  Landmark,
  FileCheck,
  IndianRupee,
  HandCoins,
  Layers,
  Link2,
  Calendar,
  Clock,
  CircleDollarSign,
  FileSpreadsheet,
  ArrowDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Footer from '../components/layout/Footer';

export default function LandingPage() {
  const router = useRouter();
  const { t } = useLanguage();

  const categories = [
    { id: 'dairy', name: t('cat_dairy'), icon: '🐄', color: 'bg-purple-50 text-purple-700' },
    { id: 'poultry', name: t('cat_poultry'), icon: '🐔', color: 'bg-orange-50 text-orange-700' },
    { id: 'fisheries', name: t('cat_fisheries'), icon: '🐟', color: 'bg-cyan-50 text-cyan-700' },
    { id: 'food', name: t('cat_food'), icon: '⚙️', color: 'bg-amber-50 text-amber-700' },
    { id: 'retail', name: t('cat_retail'), icon: '🛒', color: 'bg-indigo-50 text-indigo-700' },
    { id: 'textiles', name: t('cat_textiles'), icon: '👕', color: 'bg-blue-50 text-blue-700' },
    { id: 'tailoring', name: t('cat_tailoring'), icon: '🧵', color: 'bg-fuchsia-50 text-fuchsia-700' },
    { id: 'handicrafts', name: t('cat_handicrafts'), icon: '🏺', color: 'bg-amber-50 text-amber-800' },
    { id: 'repair', name: t('cat_repair'), icon: '🔧', color: 'bg-sky-50 text-sky-700' },
    { id: 'transport', name: t('cat_transport'), icon: '🚐', color: 'bg-yellow-50 text-yellow-700' },
    { id: 'digital', name: t('cat_digital'), icon: '💻', color: 'bg-violet-50 text-violet-700' },
    { id: 'agri_inputs', name: t('cat_agri_inputs'), icon: '🌱', color: 'bg-emerald-50 text-emerald-700' },
    { id: 'wellness', name: t('cat_wellness'), icon: '🪷', color: 'bg-pink-50 text-pink-700' },
    { id: 'education', name: t('cat_education'), icon: '📖', color: 'bg-teal-50 text-teal-700' },
    { id: 'custom', name: t('cat_custom'), icon: '🏪', color: 'bg-rose-50 text-rose-700' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#08382b] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062c22] via-[#094132] to-[#062d23] opacity-95"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Column: Farmer Visual + Script Tagline */}
            <div className="hidden lg:flex lg:col-span-3 flex-col items-center justify-center relative">
              <div className="text-center font-serif italic text-emerald-200/90 font-bold text-sm tracking-wide mb-3 leading-snug">
                {t('heroEmpowerQuote')}
              </div>

              <div className="w-48 h-60 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl relative group">
                <img 
                  src="/farmer-hero.jpg" 
                  alt="Rural Entrepreneur" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062c22]/80 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Middle Column: Hero Content */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Problem Statement Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d4a39] border border-emerald-500/30 text-emerald-200 text-[10.5px] font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-pulse"></span>
                <span>{t('heroBadge')}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight leading-tight sm:leading-[1.15]">
                {t('heroTitlePart1')}{' '}
                <span className="text-[#a3e635]">{t('heroTitlePart2')}</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-emerald-100/85 font-normal max-w-lg leading-relaxed">
                {t('heroSubtitle')}
              </p>

              {/* Action Button */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/assessment/new"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>{t('startAssessmentBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust Indicators Row */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-[10.5px] text-emerald-200/80 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>{t('freeAnalysis')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>{t('basedOnGovtData')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>{t('ruralIndiaFocus')}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>{t('secureReliable')}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Floating Sample Analysis Card */}
            <div className="lg:col-span-4 relative flex flex-col items-center justify-center">
              
              {/* Floating Live Demo Card */}
              <div className="w-full bg-white rounded-2xl p-4 sm:p-5 shadow-2xl text-slate-900 border border-slate-100 relative z-20">
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-wide text-slate-800">
                      {t('sampleAnalysisTitle')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{t('sampleTag')}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t('liveDemoTag')}
                  </span>
                </div>

                {/* Business Idea & Location */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9.5px] text-slate-400 block font-medium">{t('businessIdea')}</span>
                    <div className="flex items-center gap-1 mt-0.5 font-bold text-slate-800 truncate">
                      <Store className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                      <span className="truncate text-[11px]">{t('dairyFarming')}</span>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[9.5px] text-slate-400 block font-medium">{t('location')}</span>
                    <div className="flex items-center gap-1 mt-0.5 font-bold text-slate-800 truncate">
                      <MapPin className="w-3 h-3 text-emerald-700 flex-shrink-0" />
                      <span className="truncate text-[11px]">{t('sampleLocation')}</span>
                    </div>
                  </div>
                </div>

                {/* 4 Green Pill Indicators */}
                <div className="grid grid-cols-4 gap-1 mb-3 text-center">
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
                    <span className="text-xs font-black text-emerald-800 block">87%</span>
                    <span className="text-[8px] text-emerald-700 font-semibold block leading-tight">{t('feasibilityScore')}</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
                    <span className="text-xs font-black text-emerald-800 block">{t('high')}</span>
                    <span className="text-[8px] text-emerald-700 font-semibold block leading-tight">{t('marketDemand')}</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
                    <span className="text-xs font-black text-emerald-800 block">{t('low')}</span>
                    <span className="text-[8px] text-emerald-700 font-semibold block leading-tight">{t('competition')}</span>
                  </div>
                  <div className="p-1 rounded-lg bg-emerald-50 border border-emerald-200/80">
                    <span className="text-xs font-black text-emerald-800 block">7</span>
                    <span className="text-[8px] text-emerald-700 font-semibold block leading-tight">{t('schemesMatched')}</span>
                  </div>
                </div>

                {/* Key Metrics Rows */}
                <div className="space-y-1.5 text-xs border-t border-slate-100 pt-2.5 mb-3.5">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[10.5px]">{t('estFinanceNeed')}</span>
                    <span className="font-bold text-slate-900 text-xs">₹8.5 Lakh</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[10.5px]">{t('potentialMonthlyRevenue')}</span>
                    <span className="font-bold text-slate-900 text-xs">₹1.2 Lakh</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="text-[10.5px]">{t('suggestedArea')}</span>
                    <span className="font-bold text-slate-900 text-xs">{t('gisScanArea')}</span>
                  </div>
                </div>

                {/* View Full Analysis CTA */}
                <Link
                  href="/assessment/new"
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#0d4f3b] hover:bg-[#093d2d] text-white font-bold text-xs shadow-sm transition"
                >
                  <span>{t('viewFullAnalysis')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

              </div>

              {/* Right Slogan Text */}
              <div className="mt-2 text-right self-end pr-2">
                <span className="font-serif italic font-bold text-xs text-amber-300 block">
                  {t('sloganRight1')}
                </span>
                <span className="font-serif italic font-bold text-xs text-emerald-200 block">
                  {t('sloganRight2')}
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS RIBBON (4 White Floating Cards) */}
      <section className="relative -mt-6 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-center gap-3.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">₹1L &rarr; ₹10L</span>
                <span className="text-xs font-semibold text-slate-600 block">{t('typicalProjectRange')}</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-center gap-3.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Percent className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">6.5% &ndash; 8.0%</span>
                <span className="text-xs font-semibold text-slate-600 block">{t('subsidizedSchemes')}</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-center gap-3.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">5km / 10km</span>
                <span className="text-xs font-semibold text-slate-600 block">{t('hyperlocalScan')}</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/80 flex items-center gap-3.5 hover:shadow-md transition">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-slate-900 block leading-tight">100%</span>
                <span className="text-xs font-semibold text-slate-600 block">{t('deterministicAnalysis')}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WORKFLOW PIPELINE: "How UDYAM-SETU AI Works in 4 Steps" */}
      <section id="workflow" className="py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-800 block mb-1">
              {t('workflowTag')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {t('workflowTitle')}
            </h2>
          </div>

          {/* 4 Connected Step Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-200/80 relative flex flex-col justify-between hover:border-emerald-400 hover:shadow-sm transition">
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0d4f3b] text-white text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
                    💡
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{t('step1Title')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('step1Desc')}
                </p>
              </div>
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-200/80 relative flex flex-col justify-between hover:border-emerald-400 hover:shadow-sm transition">
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0d4f3b] text-white text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm">
                    🛢️
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{t('step2Title')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('step2Desc')}
                </p>
              </div>
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-200/80 relative flex flex-col justify-between hover:border-emerald-400 hover:shadow-sm transition">
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0d4f3b] text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <div className="w-7 h-7 rounded-full bg-cyan-50 text-cyan-700 flex items-center justify-center text-sm">
                    🗺️
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{t('step3Title')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('step3Desc')}
                </p>
              </div>
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between hover:border-emerald-400 hover:shadow-sm transition">
              <div>
                <div className="flex items-center gap-2.5 mb-3.5">
                  <span className="w-7 h-7 rounded-full bg-[#0d4f3b] text-white text-xs font-black flex items-center justify-center">
                    4
                  </span>
                  <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-sm">
                    📄
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{t('step4Title')}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {t('step4Desc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SYSTEM ARCHITECTURE & DECISION FLOW (INFOGRAPHIC) */}
      <section className="py-16 bg-[#f1f8f5] px-4 sm:px-6 lg:px-8 border-t border-b border-emerald-900/10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-2 mb-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-100 p-1 flex items-center justify-center">
                <img src="/logo.png" alt="UDYAMSETU Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                UDYAM<span className="text-[#0d4f3b]">SETU</span>
              </span>
            </div>
            <div className="text-xs sm:text-sm font-serif italic text-emerald-800 font-bold">
              From Idea to Impact
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl mx-auto">
              {t('arch_subtitle')}
            </p>
          </div>

          {/* --- DIAGRAM CONTAINER --- */}
          <div className="space-y-6">

            {/* BLOCK 1: USER INPUTS */}
            <div className="relative bg-[#eaf7f1] border-2 border-emerald-300/80 rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#0d4f3b] text-white text-[11px] font-black tracking-wider uppercase px-4 py-1 rounded-full shadow-xs">
                {t('arch_user_inputs')}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-2">
                
                {/* Input 1: Location */}
                <div className="bg-white rounded-xl p-3.5 text-center border border-emerald-100 shadow-2xs hover:shadow-xs transition">
                  <div className="w-8 h-8 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                    <MapPin className="w-4 h-4 fill-emerald-100" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{t('input_location')}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('input_location_sub')}</p>
                </div>

                {/* Input 2: Business Type */}
                <div className="bg-white rounded-xl p-3.5 text-center border border-emerald-100 shadow-2xs hover:shadow-xs transition">
                  <div className="w-8 h-8 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{t('input_business')}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('input_business_sub')}</p>
                </div>

                {/* Input 3: Own Contribution */}
                <div className="bg-white rounded-xl p-3.5 text-center border border-emerald-100 shadow-2xs hover:shadow-xs transition">
                  <div className="w-8 h-8 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                    <Coins className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{t('input_contribution')}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('input_contribution_sub')}</p>
                </div>

                {/* Input 4: Basic Information */}
                <div className="bg-white rounded-xl p-3.5 text-center border border-emerald-100 shadow-2xs hover:shadow-xs transition">
                  <div className="w-8 h-8 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mb-1.5">
                    <User className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{t('input_basic_info')}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t('input_basic_info_sub')}</p>
                </div>

              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center -my-2">
              <div className="w-8 h-8 rounded-full bg-white border border-emerald-300 flex items-center justify-center text-[#0d4f3b] shadow-xs">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* BLOCK 2: AI ANALYSIS ENGINE */}
            <div className="bg-[#eef5fc] border-2 border-sky-300 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#0369a1] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-[#0369a1] tracking-wide uppercase">
                  {t('ai_engine_title')}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {t('ai_engine_desc')}
                </p>
              </div>
            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center -my-2">
              <div className="w-8 h-8 rounded-full bg-white border border-sky-300 flex items-center justify-center text-[#0369a1] shadow-xs">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* THREE CORE OUTPUTS BADGE */}
            <div className="text-center">
              <span className="inline-block bg-[#1e293b] text-white text-[11px] font-black tracking-wider uppercase px-5 py-1.5 rounded-full shadow-sm">
                {t('three_outputs')}
              </span>
            </div>

            {/* BLOCK 3: 3 CORE OUTPUTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {/* Output Column 01: Business Feasibility */}
              <div className="bg-white border-2 border-sky-300 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-1 -right-1 w-12 h-12 bg-sky-100 rounded-bl-3xl flex items-start justify-end pr-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-[#0284c7] text-white text-[11px] font-black flex items-center justify-center">
                    01
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-[#0284c7]" />
                    <h4 className="text-xs font-black text-slate-900 uppercase">
                      {t('out1_title')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    {t('out1_sub')}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <Target className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" />
                      <span>{t('out1_item1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" />
                      <span>{t('out1_item2')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coins className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" />
                      <span>{t('out1_item3')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <LayoutGrid className="w-3.5 h-3.5 text-[#0284c7] flex-shrink-0" />
                      <span>{t('out1_item4')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>{t('out1_item5')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span>{t('out1_item6')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Output Column 02: Scheme & Govt Support */}
              <div className="bg-white border-2 border-emerald-400 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-1 -right-1 w-12 h-12 bg-emerald-100 rounded-bl-3xl flex items-start justify-end pr-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-[#0d4f3b] text-white text-[11px] font-black flex items-center justify-center">
                    02
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Landmark className="w-5 h-5 text-[#0d4f3b]" />
                    <h4 className="text-xs font-black text-slate-900 uppercase">
                      {t('out2_title')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    {t('out2_sub')}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <FileCheck className="w-3.5 h-3.5 text-[#0d4f3b] flex-shrink-0" />
                      <span>{t('out2_item1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#0d4f3b] flex-shrink-0" />
                      <span>{t('out2_item2')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <HandCoins className="w-3.5 h-3.5 text-[#0d4f3b] flex-shrink-0" />
                      <span>{t('out2_item3')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#0d4f3b] flex-shrink-0" />
                      <span>{t('out2_item4')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Coins className="w-3.5 h-3.5 text-[#0d4f3b] flex-shrink-0" />
                      <span>{t('out2_item5')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Link2 className="w-3.5 h-3.5 text-[#0d4f3b] flex-shrink-0" />
                      <span>{t('out2_item6')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Output Column 03: Loan Repayment & Financial Plan */}
              <div className="bg-white border-2 border-purple-300 rounded-2xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -top-1 -right-1 w-12 h-12 bg-purple-100 rounded-bl-3xl flex items-start justify-end pr-2 pt-2">
                  <span className="w-6 h-6 rounded-full bg-[#7c3aed] text-white text-[11px] font-black flex items-center justify-center">
                    03
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-5 h-5 text-[#7c3aed]" />
                    <h4 className="text-xs font-black text-slate-900 uppercase">
                      {t('out3_title')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    {t('out3_sub')}
                  </p>

                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <IndianRupee className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item1')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item2')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Percent className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item3')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item4')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item5')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item6')}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CircleDollarSign className="w-3.5 h-3.5 text-[#7c3aed] flex-shrink-0" />
                      <span>{t('out3_item7')}</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Connecting Arrow */}
            <div className="flex justify-center -my-2">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-700 shadow-xs">
                <ArrowDown className="w-4 h-4" />
              </div>
            </div>

            {/* BLOCK 4: FINAL REPORT */}
            <div className="bg-[#eff6ff] border-2 border-blue-400 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-black text-[#1d4ed8] tracking-wide uppercase">
                  {t('final_report_title')}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {t('final_report_desc')}
                </p>
              </div>
              <Link
                href="/assessment/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold shadow-xs transition"
              >
                <span>{t('startAssessmentBtn')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SUPPORTED RURAL & SEMI-URBAN CATEGORIES (15 CATEGORIES) */}
      <section className="py-12 bg-white px-4 sm:px-6 lg:px-8 border-t border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t('categoriesTitle')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('categoriesSubtitle')}
              </p>
            </div>

            <Link
              href="/assessment/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-[#0d4f3b] hover:bg-emerald-100 text-xs font-bold transition self-start sm:self-auto border border-emerald-200"
            >
              <span>{t('viewAllSectors')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 15 Category Cards Grid (3 rows x 5 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/assessment/new?category=${encodeURIComponent(cat.name)}`}
                className="p-3.5 rounded-xl bg-slate-50/70 hover:bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition flex items-center gap-3 group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base ${cat.color} group-hover:scale-110 transition duration-200`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-[#0d4f3b] transition truncate">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER: "Ready to evaluate your rural enterprise?" */}
      <section className="bg-[#08382b] text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#062c22] via-[#094132] to-[#062d23] opacity-95"></div>
        <div className="absolute top-0 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Cursive right badge */}
          <div className="font-serif italic text-emerald-200 font-bold text-sm tracking-wide">
            {t('ctaQuote1')} <br />
            <span className="text-amber-300">{t('ctaQuote2')}</span>
          </div>

          {/* Banner Title */}
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {t('ctaTitle')}
          </h2>

          {/* Banner Subtitle */}
          <p className="text-xs sm:text-sm text-emerald-100/85 max-w-2xl mx-auto leading-relaxed">
            {t('ctaSubtitle')}
          </p>

          {/* Banner Button */}
          <div className="flex items-center justify-center pt-2">
            <Link
              href="/assessment/new"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
            >
              <span>{t('launchWizardBtn')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  );
}

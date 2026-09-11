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
      
      {/* 1. HERO SECTION - Light Mint / Pastel Aesthetic matching user reference */}
      <section className="relative bg-gradient-to-b from-[#eaf6f0] via-[#f5faf6] to-[#ebf6ef] text-slate-900 pt-10 sm:pt-12 overflow-hidden border-b border-emerald-100/60">
        
        {/* Soft Background Concentric Circles */}
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full border border-emerald-200/50 bg-white/40 pointer-events-none"></div>
        <div className="absolute top-8 left-12 w-48 h-48 rounded-full border border-emerald-200/40 bg-white/30 pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-200/20 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Column (6 cols): Hero Copy & Action */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-black tracking-tight text-slate-900 leading-tight sm:leading-[1.12]">
                Turn Your Business Idea{' '}
                <span className="block mt-1">
                  into a{' '}
                  <span className="relative inline-block text-[#0a3e30]">
                    Fundable Business.
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-400" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-normal max-w-xl leading-relaxed">
                AI-powered business intelligence for rural entrepreneurs. From idea validation to finance, government schemes and a ready-to-use business plan.
              </p>

              {/* Primary Action Button: Start Assessment */}
              <div className="pt-1">
                <Link
                  href="/assessment/new"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#0a3e30] hover:bg-[#072d23] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 group"
                >
                  <span>Start Business Assessment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Trust Indicators Row */}
              <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 text-sm">🍃</span>
                  <span>100% Free Analysis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-700 text-sm">🪙</span>
                  <span>Based on Govt. Data</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  <span>Rural India Focus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Secure &amp; Reliable</span>
                </div>
              </div>

            </div>

            {/* Right Column (6 cols): Floating Sample Analysis Card + Farmer Image & Slogan */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end pt-4 lg:pt-0">
              <div className="relative flex flex-col sm:flex-row items-center sm:items-end justify-center">
                
                {/* Floating Live Demo Card */}
                <div className="w-full max-w-[360px] sm:max-w-[380px] bg-white rounded-3xl p-5 sm:p-5 shadow-2xl text-slate-900 border border-slate-100 relative z-20 flex-shrink-0">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3.5">
                    <h2 className="text-sm font-black tracking-tight text-slate-800">
                      AI Business Analysis
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
                      Live Demo
                    </span>
                  </div>

                  {/* Business Idea & Location */}
                  <div className="grid grid-cols-2 gap-2.5 mb-3.5 text-xs">
                    <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Business Idea</span>
                      <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800">
                        <span className="text-emerald-700 text-base">🌱</span>
                        <span className="text-xs font-bold text-slate-900">Dairy Farming</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-2xl bg-slate-50/80 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">Location</span>
                      <div className="flex items-center gap-1.5 mt-1 font-bold text-slate-800">
                        <MapPin className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <span className="text-xs font-bold text-slate-900 whitespace-nowrap">Dhanbad, Jharkhand</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Green Stat Tiles */}
                  <div className="grid grid-cols-4 gap-1.5 mb-3.5 text-center">
                    <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70">
                      <span className="text-xs font-black text-emerald-800 block">87%</span>
                      <span className="text-[8px] text-emerald-700 font-semibold block leading-tight mt-0.5">Feasibility Score</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70">
                      <span className="text-xs font-black text-emerald-800 block">HIGH</span>
                      <span className="text-[8px] text-emerald-700 font-semibold block leading-tight mt-0.5">Market Demand</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70">
                      <span className="text-xs font-black text-emerald-800 block">LOW</span>
                      <span className="text-[8px] text-emerald-700 font-semibold block leading-tight mt-0.5">Competition</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70">
                      <span className="text-xs font-black text-emerald-800 block">7</span>
                      <span className="text-[8px] text-emerald-700 font-semibold block leading-tight mt-0.5">Schemes Matched</span>
                    </div>
                  </div>

                  {/* Key Metrics Rows */}
                  <div className="space-y-2 text-xs border-t border-slate-100 pt-3 mb-4">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px] flex items-center gap-1.5 font-medium">
                        <span>💼</span> Estimated Finance Need
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs">₹8.5 Lakh</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px] flex items-center gap-1.5 font-medium">
                        <span>💰</span> Potential Monthly Revenue
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs">₹1.2 Lakh</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-[11px] flex items-center gap-1.5 font-medium">
                        <span>📍</span> Suggested Area
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs">5 – 10 km (GIS Scan)</span>
                    </div>
                  </div>

                  {/* View Full Analysis CTA */}
                  <Link
                    href="/assessment/new"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#0a3e30] hover:bg-[#072d23] text-white font-bold text-xs shadow-sm hover:shadow transition-all group"
                  >
                    <span>View Full Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>

                </div>

                {/* Farmer Visual & Slogan on the Right */}
                <div className="relative z-10 mt-6 sm:mt-0 sm:-ml-12 md:-ml-14 flex flex-col items-center sm:items-end flex-shrink-0">
                  
                  {/* Slogan */}
                  <div className="text-center sm:text-right mb-2.5 pr-2 sm:pr-3">
                    <p className="font-serif italic font-extrabold text-[#114636] text-base sm:text-lg leading-[1.18]">
                      Stronger<br />
                      Rural India<br />
                      Brighter<br />
                      Tomorrow
                    </p>
                    <svg className="w-20 h-2.5 text-amber-400 mt-1 ml-auto" viewBox="0 0 90 10" fill="none">
                      <path d="M2 7C25 1.5 65 1.5 88 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Farmer Arch Cutout Image */}
                  <div className="w-56 sm:w-64 md:w-68 h-68 sm:h-76 md:h-80 rounded-t-[110px] sm:rounded-t-[130px] rounded-b-2xl overflow-hidden shadow-lg flex-shrink-0 relative">
                    <img 
                      src="/farmer-hero.jpg" 
                      alt="Rural Entrepreneur" 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Row of 4 White Rounded Stat Cards matching reference */}
          <div className="mt-10 sm:mt-12 mb-8 sm:mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Typical Project Range */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-slate-100/90 flex items-center gap-3.5 sm:gap-4 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#eaf7f0] text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-slate-900 block leading-tight tracking-tight">₹1L – ₹10L</span>
                  <span className="text-xs font-medium text-slate-500 block mt-0.5">Typical Project Range</span>
                </div>
              </div>

              {/* Card 2: Subsidized MoSJE Schemes */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-slate-100/90 flex items-center gap-3.5 sm:gap-4 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#fef7ea] text-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-black">%</span>
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-slate-900 block leading-tight tracking-tight">6.5% – 8.0%</span>
                  <span className="text-xs font-medium text-slate-500 block mt-0.5">Subsidized MoSJE Schemes</span>
                </div>
              </div>

              {/* Card 3: Hyperlocal Market Scan */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-slate-100/90 flex items-center gap-3.5 sm:gap-4 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#eaf7f0] text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-emerald-800 fill-emerald-800/20 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-slate-900 block leading-tight tracking-tight">5km / 10km</span>
                  <span className="text-xs font-medium text-slate-500 block mt-0.5">Hyperlocal Market Scan</span>
                </div>
              </div>

              {/* Card 4: Deterministic Analysis */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-slate-100/90 flex items-center gap-3.5 sm:gap-4 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#eaf7f0] text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <span className="text-lg sm:text-xl font-black text-slate-900 block leading-tight tracking-tight">100%</span>
                  <span className="text-xs font-medium text-slate-500 block mt-0.5">Deterministic Analysis</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Panoramic Rural Landscape & Government Attribution Strip matching reference */}
        <div 
          className="relative w-full border-t border-emerald-200/50 bg-[#eaf5ef] overflow-hidden py-4 sm:py-5 px-4 sm:px-8"
          style={{
            backgroundImage: `url('/rural-strip-clean.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom center',
            backgroundSize: 'cover'
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            {/* Left spacer so the left village trees/cottages/windmill are visible */}
            <div className="hidden md:block w-48 lg:w-72"></div>

            {/* Slogan Center */}
            <div className="text-center">
              <p className="font-serif italic font-bold text-slate-800 text-xs sm:text-sm md:text-base">
                &ldquo;Ideas Today. Stronger Rural India Tomorrow.&rdquo;
              </p>
              <svg className="w-36 sm:w-44 h-2.5 text-amber-400 mx-auto mt-1" viewBox="0 0 160 12" fill="none">
                <path d="M2 10C50 2 110 2 158 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Supported by GoI on Right */}
            <div className="flex items-center gap-3 text-right">
              <img 
                src="/india-emblem.png" 
                alt="Emblem of India" 
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0" 
              />
              <div className="text-left leading-tight">
                <span className="block text-slate-500 text-[10px] font-medium">Supported by</span>
                <span className="font-bold text-slate-900 block text-[11px] sm:text-xs">Ministry of Social Justice &amp; Empowerment</span>
                <span className="text-slate-600 block text-[10px]">Government of India</span>
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
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold shadow-xs transition"
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

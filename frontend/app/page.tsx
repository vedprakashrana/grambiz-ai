'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Coins, 
  FileSpreadsheet, 
  ShieldAlert, 
  Sparkles, 
  Building2, 
  Users, 
  TrendingUp, 
  Languages,
  BookOpenCheck,
  Calculator,
  Compass,
  UserPlus,
  ShieldCheck,
  BarChart3,
  FileCheck2,
  PhoneCall,
  Store,
  FileSearch,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function LandingPage() {
  const router = useRouter();
  const { user, loginAsGuest } = useAuth();
  const { t } = useLanguage();

  const handleGuestDemo = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        
        {/* Glow & Backdrop patterns */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/15 blur-[120px] pointer-events-none rounded-full"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/10 blur-[100px] pointer-events-none rounded-full"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Official MoSJE Ribbon */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-200 text-xs font-bold tracking-wide shadow-lg backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>MoSJE Problem Statement 2609 &bull; Agriculture & Rural Enterprise Advisory</span>
          </div>

          {/* Eye-catching Hero Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none sm:leading-tight">
            Build the Right Rural Business. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
              Structure Bank-Ready Finance.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-emerald-100/90 max-w-3xl mx-auto font-normal leading-relaxed">
            <strong className="text-white font-bold">UDYAM-SETU AI</strong> delivers hyper-local feasibility predictions, 90% concessional scheme structuring, 5km GIS competitor density scans, and downloadable bank dossiers.
          </p>

          {/* Action CTA Buttons Row - Perfectly Aligned */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            {/* Primary Action Button */}
            <Link
              href="/assessment/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-200 group"
            >
              <span>{t('startAssessment')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Instant Demo Judge Button */}
            <button
              onClick={handleGuestDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700/90 text-white font-bold text-sm sm:text-base border border-emerald-500/50 shadow-lg backdrop-blur hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Try Demo as Evaluator</span>
            </button>

            {/* Explore Live Mandi Prices */}
            <Link
              href="/mandi"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 shadow transition"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Live Mandi Feed</span>
            </Link>

          </div>

          {/* Trust Value Badges Grid */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-5xl mx-auto">
            
            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-amber-400/40 transition">
              <span className="text-amber-400 font-black text-xl sm:text-2xl block">₹1 Lakh &rarr; ₹10L</span>
              <span className="text-xs text-emerald-200 font-medium">10% Margin Structuring</span>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-emerald-400/40 transition">
              <span className="text-emerald-300 font-black text-xl sm:text-2xl block">6.5% - 8.0%</span>
              <span className="text-xs text-emerald-200 font-medium">MoSJE Concessional Loans</span>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-teal-400/40 transition">
              <span className="text-teal-300 font-black text-xl sm:text-2xl block">5km / 10km GIS</span>
              <span className="text-xs text-emerald-200 font-medium">OpenStreetMap Competitors</span>
            </div>

            <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-amber-400/40 transition">
              <span className="text-amber-300 font-black text-xl sm:text-2xl block">100% Exact</span>
              <span className="text-xs text-emerald-200 font-medium">Deterministic Decimal Math</span>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Interactive Feature Suite Section */}
      <section className="py-20 bg-slate-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-3 mb-14">
            <h2 className="text-xs font-black uppercase tracking-widest text-emerald-800">End-to-End Enterprise Stack</h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900">Explore UDYAM-SETU AI Modules</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Click any module to test live calculation engines, forecasting models, and document tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: Feasibility Wizard */}
            <Link 
              href="/assessment/new"
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6 text-emerald-700" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Hyper-Local Feasibility Wizard</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter village & margin capital to receive instant success probability, viability class, and SHAP attribution.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900">
                <span>Launch Wizard</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Feature 2: ML Price & Demand Forecast */}
            <Link 
              href="/forecast"
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-teal-700" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Price & Demand Forecasting</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Autoregressive lag momentum + seasonality models for 1, 3, and 6-month commodity price volatility bands.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:text-teal-900">
                <span>View Forecasts</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Feature 3: Live Mandi Feed */}
            <Link 
              href="/mandi"
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Store className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">AGMARKNET Mandi Feed</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Daily arrival volumes, modal price benchmarks, and real-time state cooperative feeds for rural commodities.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-amber-700 group-hover:text-amber-900">
                <span>Check Mandi Rates</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Feature 4: OCR Document Scanner */}
            <Link 
              href="/ocr"
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <FileSearch className="w-6 h-6 text-blue-700" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">OCR Document Extractor</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scan land records, passbooks, and bills to automatically populate loan assessment forms without manual entry.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-blue-700 group-hover:text-blue-900">
                <span>Scan Documents</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Feature 5: Multi-Business Comparison */}
            <Link 
              href="/compare"
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-indigo-700" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Multi-Business Comparison</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Compare Dairy vs Poultry vs Kirana side-by-side on ROI, capital requirement, risk score, and subsidies.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
                <span>Compare Sectors</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Feature 6: Multilingual Voice AI */}
            <Link 
              href="/assistant"
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="w-6 h-6 text-rose-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Multilingual Voice AI</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bhashini-powered speech-to-speech advisor in Hindi, Bengali, Marathi, Tamil, Telugu, and 8+ languages.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-bold text-rose-700 group-hover:text-rose-900">
                <span>Talk with AI</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

          </div>

        </div>
      </section>

      {/* 3. 4-Step Pipeline Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center space-y-3 mb-14">
            <h2 className="text-xs font-black uppercase tracking-widest text-emerald-800">Workflow Pipeline</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">How UDYAM-SETU AI Works in 4 Steps</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center font-black text-xl mb-4 shadow-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Location & Capital</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specify State, District, Village, and your available margin capital (e.g., ₹1,00,000).
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center font-black text-xl mb-4 shadow-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Deterministic Financials</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculates total ₹10L project outlay, 90% MoSJE loan, EMI schedules, and moratorium options.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center font-black text-xl mb-4 shadow-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 mb-2">GIS & Mandi Intelligence</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scans 5km/10km radius for local competitors, mandi price trends, and infrastructure confidence.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-amber-400 flex items-center justify-center font-black text-xl mb-4 shadow-sm">
                4
              </div>
              <h4 className="font-bold text-slate-900 mb-2">AI Strategy & PDF</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive calibrated SWOT analysis, risk matrices, and download a bank-ready feasibility PDF.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Supported 10 Categories Bar */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <h3 className="text-2xl font-black text-slate-900">Supported 10 Core Rural Business Categories</h3>
            <p className="text-xs text-slate-500">Official benchmarks mapped for MoSJE & NBCFDC concessional lending</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              "Dairy & Livestock",
              "Poultry & Egg Production",
              "Fisheries / Aquaculture",
              "Agri-input & Farm Supply",
              "Food Processing",
              "Retail / Kirana",
              "Tailoring & Garment",
              "Repair & Maintenance",
              "Digital / CSC Services",
              "Handicrafts / Artisan"
            ].map((cat, idx) => (
              <Link
                key={idx}
                href="/assessment/new"
                className="p-3.5 bg-white rounded-2xl border border-slate-200 text-center hover:border-emerald-600 hover:shadow-md hover:bg-emerald-50/20 transition-all duration-150"
              >
                <span className="text-xs font-bold text-slate-800">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom Interactive CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Fast, Deterministic, & Bank-Ready</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black">Ready to structure your rural enterprise?</h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl mx-auto">
            Calculate your exact MoSJE loan eligibility, view competitor density, and download a statutory project report.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/assessment/new"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl hover:scale-105 transition transform"
            >
              <span>Launch Business Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleGuestDemo}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-sm border border-emerald-500 shadow transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Try Demo as Evaluator</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

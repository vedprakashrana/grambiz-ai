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
  UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { user, loginAsGuest } = useAuth();

  const handleGuestDemo = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-emerald-200 text-xs font-semibold uppercase tracking-wider shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            MoSJE Problem Statement 2609 &bull; Agriculture & Rural Development
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Build the Right Business. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
              Plan the Right Finance.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-emerald-100/90 max-w-3xl mx-auto font-normal leading-relaxed">
            AI-powered hyper-local business intelligence and deterministic financial structuring for rural micro-entrepreneurs. Instant feasibility scoring, 90% scheme matching, and downloadable dossiers.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Assessment CTA */}
            <Link
              href="/assessment/new"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition transform"
            >
              <span>Start Business Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Quick Guest Demo Button */}
            <button
              onClick={handleGuestDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800/90 hover:bg-emerald-700 text-white font-bold border border-emerald-600 shadow transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Try Instant Demo (Guest)</span>
            </button>

            {/* Register New Account */}
            {!user && (
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-700 shadow transition"
              >
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>Register Account</span>
              </Link>
            )}
          </div>

          {/* Trust badges */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-emerald-800/60 max-w-4xl mx-auto">
            <div className="p-3 bg-emerald-900/40 rounded-lg border border-emerald-700/30">
              <span className="text-amber-400 font-bold text-lg block">₹1,00,000 &rarr; ₹10 Lakh</span>
              <span className="text-xs text-emerald-200">10% Margin Structuring</span>
            </div>
            <div className="p-3 bg-emerald-900/40 rounded-lg border border-emerald-700/30">
              <span className="text-amber-400 font-bold text-lg block">6.5% - 8.0%</span>
              <span className="text-xs text-emerald-200">Subsidized MoSJE Schemes</span>
            </div>
            <div className="p-3 bg-emerald-900/40 rounded-lg border border-emerald-700/30">
              <span className="text-amber-400 font-bold text-lg block">5km / 10km GIS</span>
              <span className="text-xs text-emerald-200">Radius Competitor Scan</span>
            </div>
            <div className="p-3 bg-emerald-900/40 rounded-lg border border-emerald-700/30">
              <span className="text-amber-400 font-bold text-lg block">100% Deterministic</span>
              <span className="text-xs text-emerald-200">Decimal Exact Math</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works Section */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-800">Workflow Pipeline</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">How GramBiz AI Works in 4 Steps</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                1
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Location & Capital</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specify state, district, block, village, and available margin capital (e.g. ₹1,00,000).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                2
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Deterministic Calculations</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Backend computes total ₹10L project cost, 90% financing, EMI schedule, and moratoriums.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                3
              </div>
              <h4 className="font-bold text-slate-900 mb-2">GIS & Market Scan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                PostGIS searches 5km/10km radius for competitor density, mandi benchmarks, and data confidence.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg mb-4">
                4
              </div>
              <h4 className="font-bold text-slate-900 mb-2">AI Strategy & PDF</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive personalized SWOT, risk matrices, and download a complete bank-ready feasibility dossier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Supported Business Categories */}
      <section className="py-16 bg-slate-50 border-t border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Supported Rural & Semi-Urban Categories</h3>
            <p className="text-xs text-slate-500">Comprehensive structuring benchmarks for 15+ livelihood sectors</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              "Dairy & Livestock",
              "Poultry Farming",
              "Fisheries & Aqua",
              "Food Processing",
              "Retail & Groceries",
              "Textiles & Garments",
              "Tailoring & Boutiques",
              "Handicrafts",
              "Repair & EV Services",
              "Rural Transport",
              "Digital Services / CSC",
              "Agriculture Inputs",
              "Beauty & Wellness",
              "Rural Education",
              "Custom Micro-Enterprises"
            ].map((cat, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-center hover:border-emerald-500 transition">
                <span className="text-xs font-semibold text-slate-800">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Call to Action */}
      <section className="py-16 bg-emerald-900 text-white px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-3xl font-extrabold">Ready to evaluate your rural enterprise?</h3>
          <p className="text-sm text-emerald-100">
            Enter your village location and available capital to see your exact MoSJE loan eligibility and feasibility score.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/assessment/new"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg transition"
            >
              <span>Launch Business Wizard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={handleGuestDemo}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold border border-emerald-600 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Explore Demo as Judge</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

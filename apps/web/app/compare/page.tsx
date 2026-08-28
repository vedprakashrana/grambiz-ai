'use client';

import React, { useState } from 'react';
import { Layers, CheckCircle2, TrendingUp, ShieldAlert, Sparkles } from 'lucide-react';

const CANDIDATES = [
  {
    category: 'Dairy & Milk Chilling',
    margin: '₹1,00,000',
    projectCost: '₹10,00,000',
    schemeLoan: '₹9,00,000 (8.0% p.a.)',
    demandScore: 85,
    riskScore: 70,
    profitPotential: 'High (₹25k-35k/mo)',
    workingCapitalNeed: 'Moderate (Fodder Buffer)',
    gestationPeriod: 'Immediate (Daily Cash)',
    feasibilityScore: 82.5,
    recommendation: 'Top Pick for regular daily liquidity and direct MoSJE interest subvention.'
  },
  {
    category: 'Poultry Farm (1000 Birds)',
    margin: '₹1,00,000',
    projectCost: '₹10,00,000',
    schemeLoan: '₹9,00,000 (8.0% p.a.)',
    demandScore: 80,
    riskScore: 55,
    profitPotential: 'Very High (Batch-wise)',
    workingCapitalNeed: 'High (45-day Feed Buffer)',
    gestationPeriod: '45 Days per cycle',
    feasibilityScore: 74.0,
    recommendation: 'High profit potential but vulnerable to feed inflation and summer heat stress.'
  },
  {
    category: 'Rural Tailoring & Boutique Center',
    margin: '₹50,000',
    projectCost: '₹5,00,000',
    schemeLoan: '₹4,50,000 (8.0% p.a.)',
    demandScore: 75,
    riskScore: 80,
    profitPotential: 'Moderate (₹15k-25k/mo)',
    workingCapitalNeed: 'Low (Cloth Inventory)',
    gestationPeriod: 'Immediate',
    feasibilityScore: 79.0,
    recommendation: 'Extremely safe low-risk enterprise suitable for home-based operation.'
  }
];

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Multi-Business Opportunity Comparison</h1>
              <p className="text-xs text-slate-500">Side-by-side data-backed feasibility and capital requirements</p>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CANDIDATES.map((cand, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Option {idx + 1}
                  </span>
                  <span className="text-sm font-black text-amber-600">
                    {cand.feasibilityScore} / 100
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{cand.category}</h3>

                <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex justify-between"><span className="text-slate-500">Margin Equity:</span> <span className="font-bold text-slate-900">{cand.margin}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Project Outlay:</span> <span className="font-extrabold text-emerald-700">{cand.projectCost}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Scheme Loan:</span> <span className="font-semibold text-slate-800">{cand.schemeLoan}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Profit Potential:</span> <span className="font-semibold text-slate-800">{cand.profitPotential}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Working Capital:</span> <span className="font-semibold text-slate-800">{cand.workingCapitalNeed}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Gestation Period:</span> <span className="font-semibold text-slate-800">{cand.gestationPeriod}</span></div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> AI Strategic Assessment
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {cand.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

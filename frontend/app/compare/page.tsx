'use client';

import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, TrendingUp, ShieldAlert, Sparkles, ArrowRight, IndianRupee, RefreshCw } from 'lucide-react';

interface Candidate {
  category: string;
  margin_equity: string;
  project_cost: string;
  scheme_loan: string;
  demand_score: number;
  risk_score: number;
  estimated_monthly_net_profit: string;
  gestation_period: string;
  moratorium: string;
  tenure_years: string;
  suitability_tag: string;
}

export default function ComparePage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComparison = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/pro/compare/all');
      if (res.ok) {
        const data = await res.json();
        setCandidates(data);
      } else {
        throw new Error();
      }
    } catch (e) {
      setCandidates([
        {
          category: '1. Dairy & Livestock (Chilling Unit)',
          margin_equity: '₹1,00,000',
          project_cost: '₹10,00,000',
          scheme_loan: '₹9,00,000 (8.0% p.a.)',
          demand_score: 85,
          risk_score: 72,
          estimated_monthly_net_profit: '₹28,000 - ₹36,000',
          gestation_period: 'Immediate (Daily Cash)',
          moratorium: '6 Months',
          tenure_years: '7 Years',
          suitability_tag: 'High Feasibility & Daily Liquidity'
        },
        {
          category: '2. Poultry & Egg Production',
          margin_equity: '₹1,00,000',
          project_cost: '₹10,00,000',
          scheme_loan: '₹9,00,000 (8.0% p.a.)',
          demand_score: 82,
          risk_score: 58,
          estimated_monthly_net_profit: '₹32,000 - ₹45,000',
          gestation_period: '45-60 Days',
          moratorium: '6 Months',
          tenure_years: '7 Years',
          suitability_tag: 'High Growth Potential'
        },
        {
          category: '3. Fisheries / Aquaculture Pond',
          margin_equity: '₹1,00,000',
          project_cost: '₹10,00,000',
          scheme_loan: '₹9,00,000 (8.0% p.a.)',
          demand_score: 80,
          risk_score: 64,
          estimated_monthly_net_profit: '₹30,000 - ₹42,000',
          gestation_period: '90-120 Days',
          moratorium: '6 Months',
          tenure_years: '7 Years',
          suitability_tag: 'Water-linked High Margin'
        },
        {
          category: '4. Agri-input & Farm Supply Depot',
          margin_equity: '₹1,50,000',
          project_cost: '₹15,00,000',
          scheme_loan: '₹13,50,000 (8.0% p.a.)',
          demand_score: 89,
          risk_score: 84,
          estimated_monthly_net_profit: '₹35,000 - ₹50,000',
          gestation_period: 'Seasonal Peak',
          moratorium: '3 Months',
          tenure_years: '5 Years',
          suitability_tag: 'Essential Village Supply'
        },
        {
          category: '5. Food Processing & Atta Chakki',
          margin_equity: '₹80,000',
          project_cost: '₹8,00,000',
          scheme_loan: '₹7,20,000 (8.0% p.a.)',
          demand_score: 84,
          risk_score: 76,
          estimated_monthly_net_profit: '₹22,000 - ₹34,000',
          gestation_period: '15 Days',
          moratorium: '6 Months',
          tenure_years: '7 Years',
          suitability_tag: 'Steady Year-Round Cashflow'
        },
        {
          category: '6. Retail / Kirana Merchant',
          margin_equity: '₹60,000',
          project_cost: '₹6,00,000',
          scheme_loan: '₹5,40,000 (8.0% p.a.)',
          demand_score: 88,
          risk_score: 81,
          estimated_monthly_net_profit: '₹20,000 - ₹28,000',
          gestation_period: 'Immediate',
          moratorium: '3 Months',
          tenure_years: '5 Years',
          suitability_tag: 'High FMCG Turnover'
        },
        {
          category: '7. Tailoring & Garment Boutique',
          margin_equity: '₹50,000',
          project_cost: '₹5,00,000',
          scheme_loan: '₹4,50,000 (8.0% p.a.)',
          demand_score: 76,
          risk_score: 82,
          estimated_monthly_net_profit: '₹18,000 - ₹25,000',
          gestation_period: 'Immediate',
          moratorium: '6 Months',
          tenure_years: '7 Years',
          suitability_tag: 'Safe Low-Risk Operation'
        },
        {
          category: '8. Repair & Two-Wheeler Workshop',
          margin_equity: '₹70,000',
          project_cost: '₹7,00,000',
          scheme_loan: '₹6,30,000 (8.0% p.a.)',
          demand_score: 79,
          risk_score: 78,
          estimated_monthly_net_profit: '₹24,000 - ₹32,000',
          gestation_period: 'Immediate',
          moratorium: '3 Months',
          tenure_years: '5 Years',
          suitability_tag: 'High Service Profit Margin'
        },
        {
          category: '9. Digital / CSC / Online Kiosk',
          margin_equity: '₹40,000',
          project_cost: '₹4,00,000',
          scheme_loan: '₹3,60,000 (6.5% p.a.)',
          demand_score: 86,
          risk_score: 88,
          estimated_monthly_net_profit: '₹16,000 - ₹24,000',
          gestation_period: 'Immediate',
          moratorium: '3 Months',
          tenure_years: '3 Years',
          suitability_tag: 'MoSJE Micro Finance Fit'
        },
        {
          category: '10. Handicrafts & Artisan Crafts',
          margin_equity: '₹30,000',
          project_cost: '₹3,00,000',
          scheme_loan: '₹2,70,000 (6.5% p.a.)',
          demand_score: 70,
          risk_score: 75,
          estimated_monthly_net_profit: '₹14,000 - ₹20,000',
          gestation_period: '30 Days',
          moratorium: '3 Months',
          tenure_years: '3 Years',
          suitability_tag: 'Artisan Heritage Subsidy'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComparison();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md">
              <Layers className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">Multi-Business Opportunity Comparison Matrix</h1>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded">PRO MATRIX</span>
              </div>
              <p className="text-xs text-slate-500">Side-by-side comparative ROI, break-even period, MoSJE subsidized financing & risk ratings</p>
            </div>
          </div>

          <button
            onClick={fetchComparison}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition border border-slate-200"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Recalculate Matrix</span>
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((cand, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Option {idx + 1}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Demand: {cand.demand_score}/100
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{cand.category}</h3>

                <div className="space-y-2.5 text-xs pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Entrepreneur Margin:</span> 
                    <span className="font-bold text-slate-900">{cand.margin_equity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Project Outlay:</span> 
                    <span className="font-extrabold text-emerald-800">{cand.project_cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">MoSJE Scheme Loan:</span> 
                    <span className="font-bold text-slate-800">{cand.scheme_loan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Moratorium / Tenure:</span> 
                    <span className="font-semibold text-slate-800">{cand.moratorium} / {cand.tenure_years}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monthly Net Profit:</span> 
                    <span className="font-extrabold text-amber-700">{cand.estimated_monthly_net_profit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gestation Period:</span> 
                    <span className="font-semibold text-slate-800">{cand.gestation_period}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> AI Opportunity Rating
                </span>
                <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">
                  {cand.suitability_tag}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

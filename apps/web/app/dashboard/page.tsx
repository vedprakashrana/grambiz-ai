'use client';

import React from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  FileText, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Landmark, 
  ArrowRight,
  Calculator,
  Compass,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  const userName = user?.name || 'Ramesh Kumar';
  const userDistrict = user?.district || 'Meerut';
  const userState = user?.state || 'Uttar Pradesh';

  const recentAssessments = [
    {
      id: 'demo-dairy-assessment-101',
      title: 'Dairy & Milk Chilling Unit',
      location: `${userDistrict} (${userState})`,
      margin_capital: '₹1,00,000',
      project_cost: '₹10,00,000',
      scheme: 'MoSJE Term Loan (8%)',
      score: 82.5,
      date: '28 Aug 2026',
      status: 'Ready'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800 text-[10px] font-bold text-amber-300 border border-emerald-700">
              <UserCheck className="w-3 h-3" />
              {user?.isGuest ? 'Guest Evaluator Mode' : 'Verified Beneficiary Dashboard'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome back, {userName}</h1>
            <p className="text-xs sm:text-sm text-emerald-200">
              District: {userDistrict}, {userState} &bull; Category: Agriculture & Allied Micro-Enterprises
            </p>
          </div>

          <Link
            href="/assessment/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg hover:scale-105 transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start New Assessment</span>
          </Link>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Assessments</span>
            <p className="text-2xl font-black text-slate-900">1</p>
            <span className="text-[11px] text-emerald-700 font-semibold">100% Feasibility Verified</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Matched Scheme</span>
            <p className="text-lg font-extrabold text-emerald-800">MoSJE Term Loan</p>
            <span className="text-[11px] text-slate-500">8.0% Subsidized Interest</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Eligible Loan Amount</span>
            <p className="text-2xl font-black text-slate-900">₹9,00,000</p>
            <span className="text-[11px] text-emerald-700 font-semibold">90% of Total Project Cost</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Latest Feasibility Score</span>
            <p className="text-2xl font-black text-amber-500">82.5 <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
            <span className="text-[11px] text-emerald-700 font-semibold">Strong Opportunity</span>
          </div>
        </div>

        {/* Recent Assessments Table */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Business Feasibility Assessments</h2>
            <Link href="/assessment/new" className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1">
              New Assessment <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-3">Enterprise Title</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Margin Capital</th>
                  <th className="p-3">Project Outlay</th>
                  <th className="p-3">Recommended Scheme</th>
                  <th className="p-3">Feasibility</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentAssessments.map(asm => (
                  <tr key={asm.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      {asm.title}
                    </td>
                    <td className="p-3 text-slate-600">{asm.location}</td>
                    <td className="p-3 font-bold text-slate-900">{asm.margin_capital}</td>
                    <td className="p-3 font-extrabold text-emerald-800">{asm.project_cost}</td>
                    <td className="p-3">{asm.scheme}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] bg-emerald-100 text-emerald-800">
                        {asm.score} - Strong
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <Link
                        href={`/assessment/${asm.id}`}
                        className="font-bold text-emerald-800 hover:underline"
                      >
                        View Dossier
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools & Assist Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-emerald-950 text-sm">Working Capital Estimator</h3>
              <p className="text-xs text-emerald-800">Calculate 3 to 6-month fodder and operating buffer.</p>
            </div>
            <Link
              href="/calculators/working-capital"
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold shadow"
            >
              Open Tool
            </Link>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-amber-950 text-sm">Ask Multilingual AI Advisor</h3>
              <p className="text-xs text-amber-800">RAG conversational guidance for MoSJE policies in Hindi or English.</p>
            </div>
            <Link
              href="/assistant"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold shadow"
            >
              Ask AI
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

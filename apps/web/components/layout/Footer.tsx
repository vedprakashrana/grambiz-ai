import React from 'react';
import Link from 'next/link';
import { Landmark, ShieldCheck, FileText, Phone, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Org Branding */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Landmark className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                GramBiz <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              AI-driven hyper-local business feasibility and financial structuring system for rural micro-entrepreneurs.
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-amber-400 block">MoSJE Hackathon Initiative</span>
              <span className="text-[10px] text-slate-400">Department of Social Justice and Empowerment</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Key Features</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/assessment/new" className="hover:text-emerald-400 transition">Business Feasibility Wizard</Link></li>
              <li><Link href="/calculators/working-capital" className="hover:text-emerald-400 transition">Smart Financial Calculators</Link></li>
              <li><Link href="/compare" className="hover:text-emerald-400 transition">Multi-Business Comparison</Link></li>
              <li><Link href="/assistant" className="hover:text-emerald-400 transition">Multilingual AI Advisor</Link></li>
            </ul>
          </div>

          {/* Col 3: Supported Schemes */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Target Schemes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>MoSJE Micro Finance Scheme (Up to ₹1.40L)</li>
              <li>MoSJE Term Loan Scheme (Up to ₹50L)</li>
              <li>NBCFDC Subsidized Concessional Credit</li>
              <li>State Channelising Agency (SCA) Network</li>
            </ul>
          </div>

          {/* Col 4: Statutory Notice */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Advisory Disclaimer</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              GramBiz AI provides decision support and financial estimates. Loan approval, terms, and subsidies remain subject to official verification by designated state channelising agencies.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 GramBiz AI. Built for MoSJE Problem Statement 2609.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span>Verified PostGIS & pgvector Backend</span>
            <span>Deterministic Decimal Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

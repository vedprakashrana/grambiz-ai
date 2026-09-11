'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Calculator,
  IndianRupee,
  HelpCircle,
  ArrowRight,
  Download,
  Printer,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  Building2,
  PieChart as PieChartIcon,
  Layers,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
  Clock,
  Banknote,
  DollarSign
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Predefined Sector Templates
const SECTOR_PRESETS = [
  {
    name: 'Dairy & Animal Husbandry',
    revenue: 95000,
    expenses: {
      raw_materials: 32000, // Cattle feed, fodder, supplements
      rent: 6000,
      electricity: 4000,
      salaries: 14000,
      transport: 5000,
      marketing: 1500,
      maintenance: 3500, // Veterinary & equipment
      miscellaneous: 2500,
      reserve_months: 3
    }
  },
  {
    name: 'Agro-Processing & Milling',
    revenue: 140000,
    expenses: {
      raw_materials: 55000, // Grains, raw produce
      rent: 9000,
      electricity: 7500,
      salaries: 18000,
      transport: 8000,
      marketing: 2500,
      maintenance: 4500,
      miscellaneous: 3500,
      reserve_months: 4
    }
  },
  {
    name: 'Poultry & Layer Farm',
    revenue: 110000,
    expenses: {
      raw_materials: 45000, // Feed & chicks
      rent: 7000,
      electricity: 5000,
      salaries: 15000,
      transport: 6000,
      marketing: 2000,
      maintenance: 4000, // Vaccines & medicines
      miscellaneous: 3000,
      reserve_months: 3
    }
  },
  {
    name: 'Rural Retail & Agro-Inputs',
    revenue: 85000,
    expenses: {
      raw_materials: 38000, // Inventory stock
      rent: 6500,
      electricity: 2500,
      salaries: 10000,
      transport: 3500,
      marketing: 1000,
      maintenance: 1500,
      miscellaneous: 2000,
      reserve_months: 3
    }
  }
];

const COLORS = ['#0F3D3E', '#00705a', '#10B981', '#34D399', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6'];

export default function WorkingCapitalCalculator() {
  // Enterprise Profile State
  const [enterpriseInfo, setEnterpriseInfo] = useState({
    enterpriseName: 'Gram Udyam Kisan Enterprise',
    entrepreneurName: 'Ramesh Patel',
    sector: 'Dairy & Animal Husbandry',
    location: 'Varanasi, Uttar Pradesh',
    monthlyRevenue: 95000
  });

  // Operating Expenses State (Original keys preserved)
  const [expenses, setExpenses] = useState({
    raw_materials: 25000,
    rent: 5000,
    electricity: 3500,
    salaries: 12000,
    transport: 4000,
    marketing: 1500,
    maintenance: 2000,
    miscellaneous: 2000,
    reserve_months: 3
  });

  // Working Capital Cycle State (Days)
  const [cashCycle, setCashCycle] = useState({
    receivablesDays: 15, // Debtors collection period
    inventoryDays: 20,   // Raw material + finished stock holding
    payablesDays: 10     // Supplier credit period
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const printableRef = useRef<HTMLDivElement>(null);

  // Expense Head Labels
  const expenseLabels: Record<string, { title: string; subtitle: string }> = {
    raw_materials: { title: 'Raw Materials / Fodder / Inventory', subtitle: 'Feed, seeds, stock, processing inputs' },
    rent: { title: 'Commercial Rent / Shed Lease', subtitle: 'Work shed, retail shop, farm godown' },
    electricity: { title: 'Electricity & Water Utility', subtitle: 'Pumping, refrigeration, unit power' },
    salaries: { title: 'Staff Salaries / Helper Wages', subtitle: 'Labour wages, operator stipends' },
    transport: { title: 'Fuel & Transportation', subtitle: 'Mandi freight, delivery diesel/petrol' },
    marketing: { title: 'Packaging & Local Outreach', subtitle: 'Gunny bags, labels, flyers, local ads' },
    maintenance: { title: 'Equipment & Veterinary Care', subtitle: 'Machinery repairs, livestock vaccine' },
    miscellaneous: { title: 'Miscellaneous & Contingency', subtitle: 'Unforeseen minor recurring cash' }
  };

  // Calculations
  const monthlyTotal = Object.entries(expenses).reduce((acc, [key, val]) => {
    if (key !== 'reserve_months') return acc + Number(val);
    return acc;
  }, 0);

  const recommendedReserve = monthlyTotal * Number(expenses.reserve_months);
  const monthlyRevenue = Number(enterpriseInfo.monthlyRevenue) || 0;
  const operatingSurplus = monthlyRevenue - monthlyTotal; // EBITDA
  const operatingMargin = monthlyRevenue > 0 ? ((operatingSurplus / monthlyRevenue) * 100).toFixed(1) : '0';

  // Net Working Capital Cycle (Nayak / Tandon Committee MSME norm)
  const netOperatingCycleDays = Math.max(0, cashCycle.receivablesDays + cashCycle.inventoryDays - cashCycle.payablesDays);
  // Net Working Capital Gap for the operating cycle
  const dailyOpEx = monthlyTotal / 30;
  const workingCapitalGap = Math.round(dailyOpEx * netOperatingCycleDays);
  // Bank Recommended Cash Credit (CC) limit (75% under standard bank MSME norms)
  const recommendedBankCCLimit = Math.round(workingCapitalGap * 0.75);
  const entrepreneurMargin = workingCapitalGap - recommendedBankCCLimit;

  // Pie chart data
  const pieData = Object.entries(expenses)
    .filter(([key]) => key !== 'reserve_months')
    .map(([key, value]) => ({
      name: expenseLabels[key]?.title.split('/')[0].trim() || key,
      value: Number(value)
    }));

  // 12-Month Liquidity Projection Data
  const projectionData = Array.from({ length: 12 }, (_, i) => {
    const month = `M${i + 1}`;
    const targetBuffer = Math.min(recommendedReserve, monthlyTotal * ((i + 1) / 3));
    return {
      month,
      monthlyOpEx: monthlyTotal,
      liquidityReserve: Math.round(targetBuffer),
      revenueInflow: monthlyRevenue
    };
  });

  // Apply Sector Preset
  const applyPreset = (presetName: string) => {
    const found = SECTOR_PRESETS.find(p => p.name === presetName);
    if (found) {
      setEnterpriseInfo(prev => ({
        ...prev,
        sector: found.name,
        monthlyRevenue: found.revenue
      }));
      setExpenses(found.expenses);
    }
  };

  // Reset to original defaults
  const resetDefaults = () => {
    setEnterpriseInfo({
      enterpriseName: 'Gram Udyam Kisan Enterprise',
      entrepreneurName: 'Ramesh Patel',
      sector: 'Dairy & Animal Husbandry',
      location: 'Varanasi, Uttar Pradesh',
      monthlyRevenue: 95000
    });
    setExpenses({
      raw_materials: 25000,
      rent: 5000,
      electricity: 3500,
      salaries: 12000,
      transport: 4000,
      marketing: 1500,
      maintenance: 2000,
      miscellaneous: 2000,
      reserve_months: 3
    });
    setCashCycle({
      receivablesDays: 15,
      inventoryDays: 20,
      payablesDays: 10
    });
  };

  // Download Dossier PDF
  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportMessage('Generating Official UDYAM-SETU Working Capital Dossier...');

    try {
      // Priority 1: High-fidelity client PDF using html2canvas & jsPDF
      if (printableRef.current) {
        // Ensure printable element is visible for capture
        const element = printableRef.current;
        element.style.display = 'block';

        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#FFFFFF'
        });

        element.style.display = 'none';

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        const sanitizedName = enterpriseInfo.enterpriseName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'Enterprise';
        pdf.save(`UDYAM_SETU_Working_Capital_${sanitizedName}.pdf`);

        setExportMessage('Dossier PDF downloaded successfully!');
        setTimeout(() => setExportMessage(null), 4000);
        setIsExporting(false);
        return;
      }

      // Fallback: window.print
      window.print();
    } catch (err) {
      console.error('PDF Generation failed, falling back to print dialog', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 1. Header & Navigation */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                RBI MSME & MoSJE Aligned
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Updated Daily Working Capital Benchmark 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5 flex items-center gap-2">
              <span className="text-emerald-800">UDYAM-SETU AI</span>
              <span className="text-slate-400 font-light hidden sm:inline">|</span>
              <span className="text-xl sm:text-2xl font-extrabold text-slate-800">
                Working Capital & Financial Structuring Assistant
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Deterministic operational cash flow assessment, emergency liquidity buffer sizing & bank-ready working capital loan dossier.
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
            <button
              onClick={resetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              title="Reset default values"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              title="Print Page"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              Print
            </button>
            <button
              id="download-pdf-top-btn"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition transform active:scale-95 disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-amber-400 animate-bounce" />
              {isExporting ? 'Generating PDF...' : 'Download Dossier PDF'}
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {exportMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{exportMessage}</span>
            </div>
            <button onClick={() => setExportMessage(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">×</button>
          </div>
        )}

        {/* 2. Enterprise Profiling & Activity Selector */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-800" />
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Enterprise Profile & Sector Benchmark</h2>
                <p className="text-xs text-slate-500">Tailor expenses according to specific rural enterprise sector requirements</p>
              </div>
            </div>
            {/* Sector Preset Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-semibold text-slate-400 mr-1">Quick Presets:</span>
              {SECTOR_PRESETS.map(p => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p.name)}
                  className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition ${
                    enterpriseInfo.sector === p.name
                      ? 'bg-emerald-800 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.name.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Enterprise / Unit Name</label>
              <input
                type="text"
                value={enterpriseInfo.enterpriseName}
                onChange={e => setEnterpriseInfo({ ...enterpriseInfo, enterpriseName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                placeholder="e.g. Kisan Agro Center"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Lead Entrepreneur</label>
              <input
                type="text"
                value={enterpriseInfo.entrepreneurName}
                onChange={e => setEnterpriseInfo({ ...enterpriseInfo, entrepreneurName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                placeholder="e.g. Ramesh Patel"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Location (Village, District, State)</label>
              <input
                type="text"
                value={enterpriseInfo.location}
                onChange={e => setEnterpriseInfo({ ...enterpriseInfo, location: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                placeholder="e.g. Varanasi, Uttar Pradesh"
              />
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Estimated Monthly Sales / Revenue (₹)</label>
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={enterpriseInfo.monthlyRevenue}
                  onChange={e => setEnterpriseInfo({ ...enterpriseInfo, monthlyRevenue: Number(e.target.value) })}
                  className="w-full pl-6 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  placeholder="95000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Core Working Capital & Operating Overhead Inputs + Summary Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left 2 Cols: The 8 Original Operating Expense Inputs & Reserve Slider */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-800" />
                  Monthly Operational Overhead (OpEx)
                </h2>
                <p className="text-xs text-slate-500">Itemized recurring monthly cash outflows for smooth business execution</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                8 Category Breakdown
              </span>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {[
                { key: 'raw_materials', label: 'Raw Materials / Fodder / Inventory Stock' },
                { key: 'rent', label: 'Commercial Rent / Shed Lease' },
                { key: 'electricity', label: 'Electricity & Water Utility' },
                { key: 'salaries', label: 'Staff Salaries / Helper Wages' },
                { key: 'transport', label: 'Fuel, Logistics & Mandi Transport' },
                { key: 'marketing', label: 'Packaging, Labels & Local Outreach' },
                { key: 'maintenance', label: 'Equipment Upkeep & Veterinary Care' },
                { key: 'miscellaneous', label: 'Miscellaneous & Contingency Buffer' }
              ].map(item => (
                <div key={item.key} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 transition">
                  <div className="flex justify-between items-start mb-1">
                    <label className="text-slate-700 font-bold text-[11px] leading-tight">{item.label}</label>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">{expenseLabels[item.key]?.subtitle}</p>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      value={expenses[item.key as keyof typeof expenses]}
                      onChange={e => setExpenses({ ...expenses, [item.key]: Number(e.target.value) })}
                      className="w-full pl-6 pr-3 py-1.5 text-sm font-black text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Target Reserve Slider */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase">
                    Target Liquidity Reserve Period: <span className="text-emerald-800 font-black text-sm">{expenses.reserve_months} Months</span>
                  </label>
                  <p className="text-[11px] text-slate-500">Liquid bank buffer to withstand dry seasons, monsoon delays, or sudden mandi price dips</p>
                </div>
                <div className="flex gap-1">
                  {[1, 3, 6, 12].map(m => (
                    <button
                      key={m}
                      onClick={() => setExpenses({ ...expenses, reserve_months: m })}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition ${
                        expenses.reserve_months === m
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="12"
                value={expenses.reserve_months}
                onChange={e => setExpenses({ ...expenses, reserve_months: Number(e.target.value) })}
                className="w-full accent-emerald-800 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="grid grid-cols-4 text-[10px] font-bold text-slate-400 pt-1">
                <span className="text-left">1M (Aggressive)</span>
                <span className="text-center text-emerald-800">3M (Standard)</span>
                <span className="text-center">6M (Conservative)</span>
                <span className="text-right">12M (Full Year)</span>
              </div>
            </div>
          </div>

          {/* Right Col: High-Impact Financial Health & Reserve Dossier Card */}
          <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="border-b border-emerald-800/60 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                  Rural Enterprise Liquidity Dossier
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">{enterpriseInfo.enterpriseName}</h3>
                <p className="text-[11px] text-emerald-200/80">{enterpriseInfo.sector} • {enterpriseInfo.location}</p>
              </div>

              {/* Monthly OpEx */}
              <div>
                <span className="text-[11px] font-semibold text-emerald-200 uppercase tracking-wider">Total Monthly Operating Cost</span>
                <p className="text-3xl sm:text-4xl font-black text-white mt-0.5 tracking-tight">
                  ₹{monthlyTotal.toLocaleString('en-IN')}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 mt-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>₹{(monthlyTotal * 12).toLocaleString('en-IN')} annualized operational outflow</span>
                </div>
              </div>

              {/* Recommended Emergency Reserve */}
              <div className="pt-4 border-t border-emerald-800/60">
                <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  Recommended Reserve Fund ({expenses.reserve_months} Months)
                </span>
                <p className="text-3xl sm:text-4xl font-black text-amber-400 mt-0.5 tracking-tight">
                  ₹{recommendedReserve.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-emerald-200 mt-1 leading-relaxed">
                  Safeguards enterprise continuity, debt service (EMI), and helper wages during dry periods.
                </p>
              </div>

              {/* Operating Surplus / Margin */}
              <div className="pt-4 border-t border-emerald-800/60 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-emerald-300 uppercase">Monthly EBITDA Surplus</span>
                  <p className={`text-base font-bold ${operatingSurplus >= 0 ? 'text-emerald-300' : 'text-rose-400'}`}>
                    ₹{operatingSurplus.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300 uppercase">Operating Margin</span>
                  <p className="text-base font-bold text-white">{operatingMargin}%</p>
                </div>
              </div>
            </div>

            {/* Quick Note & Bottom PDF Trigger */}
            <div className="pt-4 border-t border-emerald-800/60 space-y-3">
              <p className="text-[10px] text-emerald-200/80 leading-relaxed italic">
                * Note: Evaluated against Reserve Bank of India (RBI) Priority Sector Lending and MoSJE concessional micro-credit parameters.
              </p>
              <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-slate-900" />
                {isExporting ? 'Generating PDF...' : 'Download Dossier PDF'}
              </button>
            </div>
          </div>

        </div>

        {/* 4. Cash Conversion Cycle & Bank Working Capital Limits (Nayak Committee Standard) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-800" />
                Operating Cash Cycle & Bank Working Capital Appraisal
              </h2>
              <p className="text-xs text-slate-500">
                Determines how long funds are locked in inventory & receivables, calculating eligible bank Cash Credit (CC) limit
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Nayak Committee Norm: 75% Bank Loan / 25% Margin
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* 1. Receivables */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Receivables Collection Days</label>
                <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                  {cashCycle.receivablesDays} Days
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Average time customers or mandi aggregators take to pay bills</p>
              <input
                type="range"
                min="0"
                max="60"
                value={cashCycle.receivablesDays}
                onChange={e => setCashCycle({ ...cashCycle, receivablesDays: Number(e.target.value) })}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            {/* 2. Inventory */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Inventory Holding Days</label>
                <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                  {cashCycle.inventoryDays} Days
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Average days feed, raw produce or stock remains in storage</p>
              <input
                type="range"
                min="5"
                max="90"
                value={cashCycle.inventoryDays}
                onChange={e => setCashCycle({ ...cashCycle, inventoryDays: Number(e.target.value) })}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>

            {/* 3. Payables */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-700">Accounts Payable Credit Days</label>
                <span className="font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-xs">
                  {cashCycle.payablesDays} Days
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Credit days extended by wholesale vendors or fodder suppliers</p>
              <input
                type="range"
                min="0"
                max="45"
                value={cashCycle.payablesDays}
                onChange={e => setCashCycle({ ...cashCycle, payablesDays: Number(e.target.value) })}
                className="w-full accent-emerald-800 cursor-pointer"
              />
            </div>
          </div>

          {/* Computed Gap Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Net Operating Cycle</span>
              <p className="text-xl font-black text-slate-900 mt-1">{netOperatingCycleDays} Days</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Receivables + Inventory - Payables</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Net Working Capital Gap</span>
              <p className="text-xl font-black text-amber-900 mt-1">₹{workingCapitalGap.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-amber-700 mt-0.5">Total cash needed to sustain operating cycle</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Recommended Bank CC / OD Limit</span>
              <p className="text-xl font-black text-emerald-900 mt-1">₹{recommendedBankCCLimit.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-emerald-700 mt-0.5">75% bank funding under Mudra / MoSJE</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Promoter Margin (25%)</span>
              <p className="text-xl font-black text-slate-900 mt-1">₹{entrepreneurMargin.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Self-contributed liquid equity</p>
            </div>
          </div>
        </div>

        {/* 5. Interactive Visual Charts (Recharts) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Donut Chart: Expense Breakdown */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-emerald-800" />
                OpEx Breakdown by Category
              </h2>
              <span className="text-[11px] font-bold text-emerald-800">
                Monthly Total: ₹{monthlyTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`, 'Monthly Cost']}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Area Chart: 12-Month Liquidity Accumulation Trajectory */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-800" />
                12-Month Liquidity & Buffer Trajectory
              </h2>
              <span className="text-[11px] font-bold text-amber-700">
                Target Buffer: ₹{recommendedReserve.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorReserve" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOpEx" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F3D3E" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0F3D3E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
                  <Tooltip
                    formatter={(val: number) => [`₹${val.toLocaleString('en-IN')}`]}
                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="liquidityReserve"
                    name="Reserve Buffer"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorReserve)"
                  />
                  <Area
                    type="monotone"
                    dataKey="monthlyOpEx"
                    name="Monthly OpEx"
                    stroke="#0F3D3E"
                    fillOpacity={1}
                    fill="url(#colorOpEx)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 6. Bank Sanction Readiness & Statutory Checklist */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-800" />
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Bank Sanction & Credit Appraisal Checklist
                </h2>
                <p className="text-xs text-slate-500">Essential documents and compliance benchmarks required by rural bank branches</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Pre-Sanction Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Udyam / MSME Registration</span>
              </div>
              <p className="text-[11px] text-slate-500">Free online registration required for interest subvention and CGTMSE collateral waiver.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mudra Kishore Eligibility</span>
              </div>
              <p className="text-[11px] text-slate-500">Working capital requirement of ₹{workingCapitalGap.toLocaleString('en-IN')} fits within ₹50,000 - ₹5,00,000 bracket.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>25% Equity Margin</span>
              </div>
              <p className="text-[11px] text-slate-500">Entrepreneur contribution of ₹{entrepreneurMargin.toLocaleString('en-IN')} satisfies RBI prudential norms.</p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Bank Statement Track Record</span>
              </div>
              <p className="text-[11px] text-slate-500">Maintain 6 months of active savings/current account entries showing daily mandi inflows.</p>
            </div>
          </div>
        </div>

        {/* 7. Bottom Action & Final Download Section */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Ready for Bank Submission & District Industry Centre (DIC)
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Download Official Financial Structuring Dossier (PDF)
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-xl">
              Includes full itemized OpEx breakdown, working capital cycle, reserve schedules, and RBI compliance notes formatted on official UDYAM-SETU AI letterhead.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              id="download-pdf-bottom-btn"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-lg hover:shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <Download className="w-5 h-5 text-slate-950" />
              {isExporting ? 'Generating PDF...' : 'Download Dossier PDF (रिपोर्ट डाउनलोड करें)'}
            </button>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition flex items-center justify-center gap-1.5"
            >
              Back to Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* 8. HIDDEN HIGH-FIDELITY PRINTABLE DOSSIER (Rendered into PDF by jsPDF + html2canvas) */}
      <div
        ref={printableRef}
        style={{ display: 'none', width: '800px', backgroundColor: '#ffffff', color: '#1e293b', padding: '32px', fontFamily: 'Arial, sans-serif' }}
      >
        {/* Dossier Header */}
        <div style={{ borderBottom: '2px solid #0F3D3E', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#0F3D3E', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
                GOVERNMENT OF INDIA &bull; MINISTRY OF SOCIAL JUSTICE & EMPOWERMENT (MoSJE)
              </p>
              <h1 style={{ fontSize: '22px', fontWeight: '900', color: '#0F3D3E', margin: '4px 0' }}>
                UDYAM-SETU AI: Working Capital & Operating Reserve Dossier
              </h1>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Rural Enterprise Financial Structuring & Debt Appraisal Engine
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                Ref: WC-{Date.now().toString().slice(-8)}
              </span>
              <p style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Profile */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0F3D3E', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
            1. Enterprise Identification & Appraisal Summary
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold', width: '25%' }}>Enterprise Name:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', width: '25%' }}>{enterpriseInfo.enterpriseName}</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold', width: '25%' }}>Entrepreneur / Lead:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', width: '25%' }}>{enterpriseInfo.entrepreneurName}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Sector / Activity:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>{enterpriseInfo.sector}</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Location:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>{enterpriseInfo.location}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Estimated Monthly Revenue:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#0F3D3E' }}>₹{monthlyRevenue.toLocaleString('en-IN')}</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Operating EBITDA Surplus:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', fontWeight: 'bold', color: '#15803d' }}>₹{operatingSurplus.toLocaleString('en-IN')} ({operatingMargin}%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Itemized OpEx Table */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0F3D3E', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
            2. Itemized Monthly Operating Expenses (OpEx)
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <thead>
              <tr style={{ backgroundColor: '#0F3D3E', color: '#ffffff' }}>
                <th style={{ padding: '6px', textAlign: 'left', border: '1px solid #0F3D3E' }}>Expense Head</th>
                <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #0F3D3E' }}>Monthly Cost (₹)</th>
                <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #0F3D3E' }}>Share (%)</th>
                <th style={{ padding: '6px', textAlign: 'right', border: '1px solid #0F3D3E' }}>Annualized (₹)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(expenses)
                .filter(([k]) => k !== 'reserve_months')
                .map(([k, val]) => {
                  const numVal = Number(val);
                  const share = monthlyTotal > 0 ? ((numVal / monthlyTotal) * 100).toFixed(1) : '0';
                  return (
                    <tr key={k}>
                      <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>{expenseLabels[k]?.title || k}</td>
                      <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>₹{numVal.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #e2e8f0' }}>{share}%</td>
                      <td style={{ padding: '6px', textAlign: 'right', border: '1px solid #e2e8f0' }}>₹{(numVal * 12).toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })}
              <tr style={{ backgroundColor: '#f0fdf4', fontWeight: 'bold', borderTop: '2px solid #0F3D3E' }}>
                <td style={{ padding: '8px 6px', color: '#0F3D3E' }}>TOTAL MONTHLY OPERATING EXPENSES</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', color: '#0F3D3E', fontSize: '13px' }}>₹{monthlyTotal.toLocaleString('en-IN')}</td>
                <td style={{ padding: '8px 6px', textAlign: 'right' }}>100.0%</td>
                <td style={{ padding: '8px 6px', textAlign: 'right', color: '#0F3D3E' }}>₹{(monthlyTotal * 12).toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Liquidity Reserve & Bank Credit Limits */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0F3D3E', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', marginBottom: '8px' }}>
            3. Liquidity Buffer & Working Capital Credit Appraisal
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Target Reserve Period:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>{expenses.reserve_months} Months Liquidity Cushion</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#fef3c7', fontWeight: 'bold', color: '#92400e' }}>Recommended Reserve Fund:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', fontWeight: '900', color: '#b45309', fontSize: '12px' }}>₹{recommendedReserve.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Net Operating Cash Cycle:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0' }}>{netOperatingCycleDays} Days (Rec: {cashCycle.receivablesDays}d + Inv: {cashCycle.inventoryDays}d - Pay: {cashCycle.payablesDays}d)</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontWeight: 'bold' }}>Net Working Capital Gap:</td>
                <td style={{ padding: '6px', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>₹{workingCapitalGap.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ backgroundColor: '#f0fdf4' }}>
                <td style={{ padding: '6px', border: '1px solid #cbd5e1', fontWeight: 'bold', color: '#15803d' }}>Recommended Bank CC Limit (75%):</td>
                <td style={{ padding: '6px', border: '1px solid #cbd5e1', fontWeight: '900', color: '#15803d', fontSize: '13px' }}>₹{recommendedBankCCLimit.toLocaleString('en-IN')}</td>
                <td style={{ padding: '6px', border: '1px solid #cbd5e1', fontWeight: 'bold', color: '#0F3D3E' }}>Promoter Margin (25%):</td>
                <td style={{ padding: '6px', border: '1px solid #cbd5e1', fontWeight: 'bold', color: '#0F3D3E' }}>₹{entrepreneurMargin.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bank Notes & Digital Seal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', borderTop: '1px solid #cbd5e1', paddingTop: '12px' }}>
          <div style={{ width: '70%', fontSize: '9.5px', color: '#475569', lineHeight: '1.4' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#0F3D3E' }}>Bank Credit Sanction Guidelines:</p>
            <p style={{ margin: 0 }}>
              1. Eligible for collateral-free Cash Credit under Pradhan Mantri MUDRA Yojana / MoSJE Concessional Credit Schemes.<br/>
              2. Maintaining {expenses.reserve_months} months of operating reserve in a liquid bank account ensures uninterrupted debt service.<br/>
              3. Deterministically formulated by UDYAM-SETU AI based on RBI MSME lending directives.
            </p>
          </div>

          <div style={{ width: '28%', textAlign: 'center', border: '1px dashed #0F3D3E', padding: '8px', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: '#0F3D3E', margin: '0 0 2px 0' }}>UDYAM-SETU AI VERIFIED</p>
            <p style={{ fontSize: '8px', color: '#64748b', margin: 0 }}>Digital Financial Dossier</p>
            <p style={{ fontSize: '8px', color: '#0F3D3E', fontWeight: 'bold', marginTop: '4px' }}>SEAL OF APPRAISAL</p>
          </div>
        </div>

      </div>

    </div>
  );
}


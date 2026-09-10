'use client';

import React, { useState } from 'react';
import { Calculator, IndianRupee, HelpCircle, ArrowRight } from 'lucide-react';

export default function WorkingCapitalCalculator() {
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

  const monthlyTotal = Object.entries(expenses).reduce((acc, [key, val]) => {
    if (key !== 'reserve_months') return acc + Number(val);
    return acc;
  }, 0);

  const recommendedReserve = monthlyTotal * Number(expenses.reserve_months);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white">
              <Calculator className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">Working Capital & Operating Reserve Calculator</h1>
              <p className="text-xs text-slate-500">Calculate exact monthly operational overhead and liquidity buffer</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Inputs */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Monthly Operational Expenses (₹)</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { key: 'raw_materials', label: 'Raw Materials / Fodder / Inventory' },
                { key: 'rent', label: 'Commercial Rent / Shed Lease' },
                { key: 'electricity', label: 'Electricity & Water Utility' },
                { key: 'salaries', label: 'Staff Salaries / Helper Wages' },
                { key: 'transport', label: 'Fuel & Transportation' },
                { key: 'marketing', label: 'Packaging & Local Outreach' },
                { key: 'maintenance', label: 'Equipment & Veterinary Care' },
                { key: 'miscellaneous', label: 'Miscellaneous & Contingency' }
              ].map(item => (
                <div key={item.key}>
                  <label className="block text-slate-600 font-medium mb-1">{item.label}</label>
                  <input
                    type="number"
                    value={expenses[item.key as keyof typeof expenses]}
                    onChange={e => setExpenses({ ...expenses, [item.key]: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                Target Liquidity Reserve Period: <span className="text-emerald-800">{expenses.reserve_months} Months</span>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={expenses.reserve_months}
                onChange={e => setExpenses({ ...expenses, reserve_months: Number(e.target.value) })}
                className="w-full accent-emerald-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>1 Month (Aggressive)</span>
                <span>3 Months (Standard)</span>
                <span>6 Months (Conservative)</span>
                <span>12 Months</span>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider">Monthly Operating Cost</span>
                <p className="text-3xl font-extrabold text-white mt-1">₹{monthlyTotal.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-emerald-300">Sum of monthly recurring outflows</span>
              </div>

              <div className="pt-4 border-t border-emerald-800/80">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Recommended Reserve Fund</span>
                <p className="text-4xl font-black text-amber-400 mt-1">₹{recommendedReserve.toLocaleString('en-IN')}</p>
                <span className="text-[11px] text-emerald-200">For {expenses.reserve_months} Months of emergency liquidity</span>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-[10px] text-emerald-200/80 leading-relaxed italic">
                * Note: Maintaining this reserve ensures uninterrupted debt service (EMI) during seasonal agricultural dry spells.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

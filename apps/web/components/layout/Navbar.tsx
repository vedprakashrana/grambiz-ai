'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Landmark, Languages, User as UserIcon, LogOut, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout, loginAsGuest } = useAuth();
  const router = useRouter();

  const handleGuestDemo = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & MoSJE Endorsement */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-900 transition">
              <Landmark className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                GramBiz <span className="text-emerald-700 font-extrabold">AI</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                Dept of Social Justice & Empowerment (MoSJE)
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-700">
            <Link href="/" className="hover:text-emerald-700 transition">Home</Link>
            <Link href="/assessment/new" className="hover:text-emerald-700 transition">Business Advisor</Link>
            <Link href="/calculators/working-capital" className="hover:text-emerald-700 transition">Calculators</Link>
            <Link href="/compare" className="hover:text-emerald-700 transition">Compare Ideas</Link>
            <Link href="/assistant" className="hover:text-emerald-700 transition flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Advisor
            </Link>
            {user && (
              <Link href="/dashboard" className="text-emerald-800 font-bold hover:text-emerald-900 flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Action Buttons with Dynamic Auth State */}
          <div className="flex items-center space-x-3">
            <button className="hidden sm:flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-700">
              <Languages className="w-3.5 h-3.5" />
              <span>ENG / हिंदी</span>
            </button>

            {user ? (
              /* Logged In State */
              <div className="flex items-center space-x-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 transition"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center text-[10px] font-black">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                  {user.isGuest && (
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-bold">Guest</span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition border border-slate-200"
                >
                  <LogOut className="w-4 h-4" />
                </button>

                <Link
                  href="/assessment/new"
                  className="text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition"
                >
                  New Assessment
                </Link>
              </div>
            ) : (
              /* Logged Out State */
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleGuestDemo}
                  className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Try Demo</span>
                </button>

                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 hover:text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition"
                >
                  Login
                </Link>
                
                <Link
                  href="/register"
                  className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 transition"
                >
                  Register
                </Link>

                <Link
                  href="/assessment/new"
                  className="text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-lg shadow-sm hover:shadow transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

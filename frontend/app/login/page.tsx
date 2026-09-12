'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Landmark, ArrowRight, Lock, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dashboard';
  const { login, loginAsGuest } = useAuth();
  
  const [email, setEmail] = useState('demo@grambiz.in');
  const [password, setPassword] = useState('Demo@123');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate auth / API check
    const verifiedUser = {
      id: 'usr-ramesh-1',
      name: 'Ramesh Kumar',
      email: email,
      mobile: '9876543210',
      role: 'user',
      state: 'Uttar Pradesh',
      district: 'Meerut',
      preferred_language: 'hi',
      isGuest: false
    };

    setTimeout(() => {
      login(verifiedUser);
      router.push(redirectTarget);
    }, 300);
  };

  const handleGuest = () => {
    loginAsGuest();
    router.push(redirectTarget);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <div className="h-14 flex items-center justify-center mx-auto">
          <img src="/logo.png" alt="Udyam-Setu Logo" className="h-14 w-auto object-contain" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Sign in to UDYAM-SETU AI</h2>
        <p className="text-xs text-slate-500">Ministry of Social Justice and Empowerment (MoSJE)</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl border border-slate-200 sm:px-10 space-y-5">
          
          {redirectTarget.includes('assessment') && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Sign In to Continue to Assessment</span>
              </div>
              <p className="text-[11px] text-emerald-900 leading-tight">
                Log in with your credentials or try as a demo guest to open the assessment tool.
              </p>
            </div>
          )}

          {/* Guest Evaluator / Judge Fast Action */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>For Hackathon Judges / Evaluators</span>
            </div>
            <p className="text-[11px] text-amber-900 leading-relaxed">
              Explore the entire AI business feasibility and financial calculation engine instantly without signing up.
            </p>
            <button
              type="button"
              onClick={handleGuest}
              className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-sm cursor-pointer"
            >
              🚀 Try Demo as Guest Judge
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-2 text-[10px] font-bold text-slate-400 uppercase">Or Sign In With Account</span>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="mt-1 w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 border border-slate-200">
              <b>Pre-filled Demo Credentials:</b> <br />
              Email: <code>demo@grambiz.in</code> | Password: <code>Demo@123</code>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow transition cursor-pointer"
            >
              {loading ? 'Authenticating...' : 'Sign In & Continue'}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            Don't have an account?{' '}
            <Link 
              href={`/register${redirectTarget ? `?redirect=${encodeURIComponent(redirectTarget)}` : ''}`} 
              className="font-bold text-emerald-700 hover:underline"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

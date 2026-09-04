import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  UserCheck,
  Building2,
  Vote,
  Sparkles,
  LogIn,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDemoLogin = (roleName, targetPath) => {
    loginAsDemo(roleName);
    navigate(targetPath);
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      if (res.user.role === 'Customer') navigate('/customer/book');
      else if (res.user.role === 'Worker') navigate('/worker/dashboard');
      else if (res.user.role === 'Federation Admin') navigate('/admin/dashboard');
      else if (res.user.role === 'District Council Member') navigate('/council/dashboard');
      else navigate('/');
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-[#C45C3C] bg-[#FFF8F0] border border-[#C45C3C]/30 px-3 py-1 rounded-full">
          SECURE ROLE-BASED ACCESS
        </span>
        <h1 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          Sign In to Sahakar
        </h1>
        <p className="text-xs sm:text-sm text-[#665D56]">
          Experience any of the 4 stakeholder portals with 1-click instant demo access below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1-Click Fast Demo Logins Card */}
        <div className="bg-[#FAF5EE] rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#D4A843]">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-black text-sm text-[#1B4332] uppercase tracking-wide">
                Instant 1-Click Demo Evaluation
              </h3>
            </div>
            <p className="text-xs text-[#665D56] leading-relaxed">
              Test full end-to-end workflows for every role immediately with seeded accounts:
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => handleDemoLogin('Customer', '/customer/book')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FFF8F0] border border-[#E8DFD8] text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <strong className="block text-xs text-[#2B2B2B]">🏡 Customer Portal</strong>
                  <span className="text-[11px] text-[#736B63]">Neha Agarwal • Book, Radar, Invoices & Reviews</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#C45C3C] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleDemoLogin('Worker', '/worker/dashboard')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FFF8F0] border border-[#E8DFD8] text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <strong className="block text-xs text-[#2B2B2B]">👷 Worker-Owner Portal</strong>
                  <span className="text-[11px] text-[#736B63]">Rajesh Kumar • Prosperity Engine, Passport, Equity & Welfare</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2D6A4F] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleDemoLogin('Federation Admin', '/admin/dashboard')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FFF8F0] border border-[#E8DFD8] text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <strong className="block text-xs text-[#2B2B2B]">🏢 Federation Admin Console</strong>
                  <span className="text-[11px] text-[#736B63]">Harish Sharma • KYC Approvals, Disputes, AI Forecasts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4A843] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleDemoLogin('District Council Member', '/council/dashboard')}
                className="w-full p-3 rounded-2xl bg-white hover:bg-[#FFF8F0] border border-[#E8DFD8] text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <strong className="block text-xs text-[#2B2B2B]">🏛️ District Council Governance</strong>
                  <span className="text-[11px] text-[#736B63]">Sunil Patil • Democratic Voting & Policy Rules</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#2D6A4F] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="text-[11px] text-[#8C827A] pt-2 border-t border-[#E8DFD8]">
            Password for all demo accounts: <code className="font-bold text-[#2B2B2B]">demo123</code>
          </div>
        </div>

        {/* Standard Email / Password Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
          <div>
            <h3 className="font-bold text-base text-[#2B2B2B]">Account Credentials Login</h3>
            <p className="text-xs text-[#665D56]">Sign in with your registered email address.</p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleFormLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-[#4A4A4A] block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. worker@sahakar.coop"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-semibold text-[#2B2B2B] focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-[#4A4A4A] block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-semibold text-[#2B2B2B] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#C45C3C] hover:bg-[#A34A2E] text-white font-black text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Credentials</span>
            </button>
          </form>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-[#E8DFD8] w-full" />
            <span className="bg-white px-2 text-[10px] uppercase font-bold text-[#8C827A] absolute">Or</span>
          </div>

          <button
            onClick={() => handleDemoLogin('Customer', '/customer/book')}
            className="w-full py-2.5 rounded-2xl border border-[#E8DFD8] bg-white hover:bg-[#FAF5EE] text-xs font-bold text-[#2B2B2B] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google Sign-In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

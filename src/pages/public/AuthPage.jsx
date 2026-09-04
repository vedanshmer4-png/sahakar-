import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import {
  UserCheck,
  Building2,
  Vote,
  Sparkles,
  LogIn,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Phone
} from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, loginAsDemo, isAuthenticated, role } = useAuth();

  const isRegisterRoute = location.pathname.includes('register') || location.pathname.includes('signup');
  const [activeTab, setActiveTab] = useState(isRegisterRoute ? 'register' : 'login');

  useEffect(() => {
    if (isRegisterRoute) {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);

  // Sign In Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sign Up Form States
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Customer');

  const redirectByRole = (targetRole) => {
    if (targetRole === 'Customer') navigate('/customer/book');
    else if (targetRole === 'Worker') navigate('/worker/dashboard');
    else if (targetRole === 'Federation Admin') navigate('/admin/dashboard');
    else if (targetRole === 'District Council Member') navigate('/council/dashboard');
    else navigate('/');
  };

  const handleDemoLogin = (roleName, targetPath) => {
    loginAsDemo(roleName);
    navigate(targetPath);
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = login(email, password);
    if (res.success) {
      redirectByRole(res.user.role);
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleFormRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = register({
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      password: signupPassword,
      role: signupRole,
    });
    if (res.success) {
      redirectByRole(res.user.role);
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleGoogleSuccess = (googleUser) => {
    if (googleUser) {
      redirectByRole(googleUser.role);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6E8] border border-[#EFE3B5] text-[11px] font-bold text-[#8A7326]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#5C8F57]" />
          <span>MULTI-STATE COOPERATIVE SOCIETIES ACT, 2002</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
          {activeTab === 'login' ? 'Official Sign In to Sahakar' : 'Create Your Sahakar Co-op Account'}
        </h1>
        <p className="text-xs sm:text-sm text-[#555555] max-w-xl mx-auto">
          Access the democratic Digital Public Infrastructure grid with Google OAuth, password credentials, or 1-click evaluation personas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 1-Click Demo Evaluation Personas */}
        <div className="lg:col-span-5 bg-[#FAF9F6] rounded-3xl p-6 border border-[#E6E2D6] space-y-4">
          <div className="space-y-1 border-b border-[#E6E2D6] pb-3">
            <div className="flex items-center gap-2 text-[#8A7326]">
              <Sparkles className="w-4 h-4 text-[#DCC573]" />
              <h3 className="font-black text-xs uppercase tracking-wider text-[#000000]">
                Instant 1-Click Demo Evaluation
              </h3>
            </div>
            <p className="text-[11px] text-[#666666] leading-tight">
              Test full end-to-end workflows for any stakeholder persona immediately:
            </p>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => handleDemoLogin('Customer', '/customer/book')}
              className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF6E8] border border-[#E6E2D6] hover:border-[#DCC573] text-left transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <div>
                <strong className="block text-xs text-[#000000]">🏡 Citizen Customer</strong>
                <span className="text-[10px] text-[#666666] block">Neha Agarwal • Book, Radar, Invoices & Reviews</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#EA7671] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleDemoLogin('Worker', '/worker/dashboard')}
              className="w-full p-3 rounded-2xl bg-white hover:bg-[#EFF6EE] border border-[#E6E2D6] hover:border-[#5C8F57] text-left transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <div>
                <strong className="block text-xs text-[#000000]">👷 Worker-Owner</strong>
                <span className="text-[10px] text-[#666666] block">Rajesh Kumar • Prosperity, Passport & 90% DBT</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#5C8F57] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleDemoLogin('Federation Admin', '/admin/dashboard')}
              className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF9F6] border border-[#E6E2D6] hover:border-[#000000] text-left transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <div>
                <strong className="block text-xs text-[#000000]">🏢 Federation Admin</strong>
                <span className="text-[10px] text-[#666666] block">Harish Sharma • KYC Approvals & AI Grid KPIs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#000000] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            <button
              onClick={() => handleDemoLogin('District Council Member', '/council/dashboard')}
              className="w-full p-3 rounded-2xl bg-white hover:bg-[#FAF6E8] border border-[#E6E2D6] hover:border-[#DCC573] text-left transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
            >
              <div>
                <strong className="block text-xs text-[#000000]">🏛️ District Council Member</strong>
                <span className="text-[10px] text-[#666666] block">Sunil Patil • Democratic Voting & Wage Floors</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8A7326] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          </div>

          <div className="text-[10px] text-[#666666] pt-2 border-t border-[#E6E2D6] flex items-center justify-between">
            <span>Demo accounts password: <strong className="text-[#000000]">demo123</strong></span>
            <span className="text-[#5C8F57] font-bold">✓ Pre-Verified</span>
          </div>
        </div>

        {/* Right Column: Google Auth & Email Forms */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E2D6] shadow-sm space-y-6">
          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="flex rounded-2xl bg-[#FAF9F6] p-1 border border-[#E6E2D6]">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-white text-[#000000] shadow-xs'
                  : 'text-[#666666] hover:text-[#000000]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-white text-[#000000] shadow-xs'
                  : 'text-[#666666] hover:text-[#000000]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up (Register)</span>
            </button>
          </div>

          {/* Google Sign In / Sign Up Component */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase text-[#666666] tracking-wider block">
              Fast Google OAuth 2.0 Access
            </span>
            <GoogleSignInButton
              role={activeTab === 'register' ? signupRole : 'Customer'}
              onSuccess={handleGoogleSuccess}
              text={activeTab === 'login' ? 'Continue with Google Sign In' : 'Sign Up with Google Account'}
            />
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E6E2D6] w-full" />
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#888888] absolute">
              Or Use Email Password
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200 animate-in fade-in duration-100">
              {errorMessage}
            </div>
          )}

          {/* 1. SIGN IN TAB */}
          {activeTab === 'login' && (
            <form onSubmit={handleFormLogin} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#000000] block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. worker@sahakar.coop or customer@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#000000] block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
              </button>
            </form>
          )}

          {/* 2. SIGN UP / REGISTER TAB */}
          {activeTab === 'register' && (
            <form onSubmit={handleFormRegister} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#000000] block mb-1">Account Role / Stakeholder Type</label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-bold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                >
                  <option value="Customer">Citizen Customer (Book Services & Pay via DBT)</option>
                  <option value="Worker">Worker-Owner Craftsman (90% Direct Payouts & Equity)</option>
                  <option value="Federation Admin">Primary Co-op Federation Administrator</option>
                  <option value="District Council Member">District Council Member</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#000000] block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#000000] block mb-1">Mobile Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#000000] block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh.coop@gmail.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#000000] block mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#5C8F57] hover:bg-[#3F693A] text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Cooperative Account</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

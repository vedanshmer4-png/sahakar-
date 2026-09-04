import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  MapPin,
  Wrench
} from 'lucide-react';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useAuth } from '../context/AuthContext';
import { TRADES, DISTRICTS } from '../data/mockData';

export default function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithCredentials, signup, isAuthenticated } = useAuth();

  // Mode: 'signin' or 'signup'
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const initialRole = searchParams.get('role') === 'customer' ? 'customer' : 'worker';

  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    identifier: '', // email or phone
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    trade: 'Electrician',
    district: 'Delhi',
    agreeBylaws: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSuccessRedirect = (userObj) => {
    setSuccessMsg(`Welcome to Sahakar, ${userObj.name}! Redirecting...`);
    setTimeout(() => {
      if (userObj.role === 'customer') {
        navigate('/customer');
      } else {
        navigate('/dashboard');
      }
    }, 1000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (!formData.name) {
        setError('Please enter your full name.');
        return;
      }
      if (!formData.agreeBylaws) {
        setError('You must agree to the Sahakar Cooperative Bylaws to register.');
        return;
      }
      if (formData.password && formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      const user = signup({
        name: formData.name,
        email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@sahakar.coop`,
        phone: formData.phone || '+91 98765 43210',
        role: role,
        trade: formData.trade,
        district: formData.district,
      });

      handleSuccessRedirect(user);
    } else {
      // Sign In
      if (!formData.identifier) {
        setError('Please enter your email or mobile number.');
        return;
      }

      const user = loginWithCredentials({
        identifier: formData.identifier,
        password: formData.password,
        role: role,
      });

      handleSuccessRedirect(user);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in-up">
      {/* Top Banner / Switch Notice */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C45C3C]/10 border border-[#C45C3C]/25 text-[#C45C3C] text-xs font-bold tracking-wide mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SECURE COOPERATIVE AUTHENTICATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          {mode === 'signin' ? 'Welcome Back to Sahakar' : 'Become a Co-op Member'}
        </h1>
        <p className="text-xs sm:text-sm text-[#736B63] mt-1.5">
          {role === 'worker'
            ? 'Access your Worker Prosperity Engine, Reputation Passport & District Council voting.'
            : 'Book services from verified craftsmen with mutual trust & zero exploitation.'}
        </p>
      </div>

      {/* Main Grid: Form (Left/Center) + Cooperative Value Pillar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Auth Box (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-md relative">
          {/* Persona Switcher Tabs: Worker-Owner vs Customer */}
          <div className="flex rounded-2xl bg-[#FAF5EE] p-1.5 border border-[#E8DFD8] mb-6">
            <button
              type="button"
              onClick={() => setRole('worker')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === 'worker'
                  ? 'bg-[#C45C3C] text-white shadow-sm'
                  : 'text-[#665D56] hover:text-[#2B2B2B]'
              }`}
            >
              <span>👷 Worker-Owner</span>
              <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                Equity Stake
              </span>
            </button>
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                role === 'customer'
                  ? 'bg-[#2D6A4F] text-white shadow-sm'
                  : 'text-[#665D56] hover:text-[#2B2B2B]'
              }`}
            >
              <span>🏡 Customer / Client</span>
              <span className="hidden sm:inline-block text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">
                Fair Rates
              </span>
            </button>
          </div>

          {/* Mode Switcher: Sign In vs Sign Up */}
          <div className="flex items-center justify-between border-b border-[#E8DFD8] pb-4 mb-6">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(''); }}
                className={`text-base font-bold pb-1 cursor-pointer transition-colors relative ${
                  mode === 'signin'
                    ? 'text-[#C45C3C]'
                    : 'text-[#736B63] hover:text-[#2B2B2B]'
                }`}
              >
                Sign In
                {mode === 'signin' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C45C3C] -mb-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className={`text-base font-bold pb-1 cursor-pointer transition-colors relative ${
                  mode === 'signup'
                    ? 'text-[#C45C3C]'
                    : 'text-[#736B63] hover:text-[#2B2B2B]'
                }`}
              >
                Create Account
                {mode === 'signup' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C45C3C] -mb-4" />
                )}
              </button>
            </div>

            <span className="text-[11px] text-[#736B63]">
              {mode === 'signin' ? 'New to Sahakar?' : 'Already a member?'}{' '}
              <button
                type="button"
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-[#C45C3C] font-bold hover:underline cursor-pointer"
              >
                {mode === 'signin' ? 'Join here' : 'Sign in'}
              </button>
            </span>
          </div>

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-5 p-4 rounded-2xl bg-[#D1FAE5] border border-[#2D6A4F] text-[#1B4332] text-xs font-semibold flex items-center gap-2 animate-fade-in-up">
              <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-4 rounded-2xl bg-[#FEE2E2] border border-[#D64545] text-[#991B1B] text-xs font-semibold flex items-center gap-2 animate-fade-in-up">
              <span className="font-black text-sm">✕</span>
              <span>{error}</span>
            </div>
          )}

          {/* ============================================================ */}
          {/* PRIMARY AUTH: GOOGLE SIGN-IN                                 */}
          {/* ============================================================ */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#4A4A4A] block mb-2">
                Fast & Verified Authentication:
              </span>
              <GoogleSignInButton
                role={role}
                text={mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
                onSuccess={handleSuccessRedirect}
              />
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-[#E8DFD8] w-full" />
              <span className="bg-white px-3 text-[11px] font-semibold text-[#8C827A] uppercase tracking-wider shrink-0">
                or continue with credentials
              </span>
              <div className="border-t border-[#E8DFD8] w-full" />
            </div>

            {/* Credential Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-[#4A4A4A] block mb-1">
                    Full Legal Name (as per Aadhaar/PAN)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-medium text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Trade & District Selection for Worker-Owners */}
              {mode === 'signup' && role === 'worker' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-[#4A4A4A] block mb-1">
                      Primary Trade / Skill
                    </label>
                    <div className="relative">
                      <Wrench className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                      <select
                        name="trade"
                        value={formData.trade}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-bold text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white cursor-pointer"
                      >
                        {TRADES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#4A4A4A] block mb-1">
                      District Cooperative
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-bold text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white cursor-pointer"
                      >
                        <option value="Delhi">Delhi Cooperative</option>
                        <option value="Mumbai">Mumbai Cooperative</option>
                        <option value="Lucknow">Lucknow Cooperative</option>
                        <option value="Pune">Pune Cooperative</option>
                        <option value="Bengaluru">Bengaluru Cooperative</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Identifier (Email / Phone) */}
              <div>
                <label className="text-xs font-bold text-[#4A4A4A] block mb-1">
                  {mode === 'signup' ? 'Email Address' : 'Email Address or Mobile Number'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name={mode === 'signup' ? 'email' : 'identifier'}
                    required
                    placeholder={mode === 'signup' ? 'name@gmail.com' : 'e.g. rajesh.kumar@gmail.com or 9876543210'}
                    value={mode === 'signup' ? formData.email : formData.identifier}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-medium text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-[#4A4A4A] block mb-1">
                    Mobile Number (for SMS/WhatsApp Job Alerts)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-medium text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#4A4A4A]">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setError('Password reset instructions dispatched to your registered email/phone.')}
                      className="text-[11px] text-[#C45C3C] hover:underline font-semibold cursor-pointer"
                    >
                      Forgot PIN / Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required={mode === 'signup'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-medium text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-[#8C827A] hover:text-[#2B2B2B]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="text-xs font-bold text-[#4A4A4A] block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] text-xs font-medium text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#C45C3C]/30 focus:bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Agreement check for signup */}
              {mode === 'signup' && (
                <div className="pt-1">
                  <label className="flex items-start gap-2 text-xs text-[#665D56] cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeBylaws"
                      checked={formData.agreeBylaws}
                      onChange={handleChange}
                      className="mt-0.5 rounded text-[#C45C3C] focus:ring-[#C45C3C] cursor-pointer"
                    />
                    <span>
                      I pledge allegiance to the <strong>Sahakar Cooperative Bylaws</strong>. I understand that all members have 1 democratic vote and that reputation credentials are self-sovereign.
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#C45C3C] hover:bg-[#A34A2E] text-white font-black text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{mode === 'signin' ? 'Sign In to Sahakar' : 'Create Cooperative Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Cooperative Charter & Benefits (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Democratic Rights */}
          <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#D4A843]">
                <Award className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A843]">
                The Cooperative Advantage
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              "You are an owner here."
            </h3>

            <p className="text-xs text-white/80 leading-relaxed">
              When you join Sahakar with your Google Account or credentials, you are not an 'independent contractor' with no rights. You hold legal member equity in the district cooperative.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4A843] shrink-0 mt-0.5" />
                <span><strong>90% Payout Retention:</strong> No 20-30% platform commissions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4A843] shrink-0 mt-0.5" />
                <span><strong>Portable Reputation:</strong> Your ratings belong to you, not the app.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4A843] shrink-0 mt-0.5" />
                <span><strong>1% Emergency Welfare Pool:</strong> Automatic safety net for hospital care and accidents.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4A843] shrink-0 mt-0.5" />
                <span><strong>Democratic Voice:</strong> 1 Worker = 1 Vote on pricing and rules.</span>
              </div>
            </div>
          </div>

          {/* Card 2: Real Worker Testimonial */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EADECF] flex items-center justify-center text-2xl border border-[#C45C3C]/30 shadow-inner">
                👷
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2B2B2B]">Rajesh Kumar</h4>
                <p className="text-xs text-[#C45C3C] font-semibold">Master Electrician • Delhi District Co-op</p>
              </div>
            </div>

            <p className="text-xs text-[#665D56] italic leading-relaxed">
              "On the other platform, they blocked my account with zero explanation after 4 years of 4.8 stars. On Sahakar, my passport is cryptographically signed and mine forever. I even earn quarterly profit dividends."
            </p>

            <div className="pt-2 border-t border-[#E8DFD8] flex items-center justify-between text-[11px] text-[#736B63]">
              <span>Co-op Equity Stake: <strong>0.12%</strong></span>
              <span className="text-[#2D6A4F] font-bold">Verified Member</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

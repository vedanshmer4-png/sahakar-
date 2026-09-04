import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  TrendingUp,
  DollarSign,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  Target,
  Flame
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function WorkerDashboard() {
  const store = getStore();
  const worker = store.workers[0]; // Rajesh Kumar

  const [dailyTarget, setDailyTarget] = useState(1500);
  const [dailyEarned, setDailyEarned] = useState(1350);

  const seasonalTrendData = [
    { month: 'Sep', demand: 75, earnings: 32500 },
    { month: 'Oct', demand: 90, earnings: 41000 },
    { month: 'Nov', demand: 95, earnings: 45000 },
    { month: 'Dec', demand: 65, earnings: 28000 },
    { month: 'Jan', demand: 60, earnings: 26000 },
    { month: 'Feb', demand: 80, earnings: 36000 },
  ];

  const dailyPercent = Math.min(100, Math.round((dailyEarned / dailyTarget) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner — Worker Prosperity Engine */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>WORKER PROSPERITY ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Welcome back, {worker.name}
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            {worker.trade} ({worker.skillLevel}) • {worker.societyName} • <strong className="text-[#D4A843]">0.12% Legal Cooperative Equity Owner</strong>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold text-white/80 block">Income Stability Score</span>
            <span className="text-2xl font-black text-[#D4A843]">{worker.incomeStability} / 100</span>
          </div>
        </div>
      </div>

      {/* Daily Target Progress & Streak Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center font-black">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#8C827A] uppercase block">Today's Earnings Target</span>
            <strong className="text-xl font-black text-[#2B2B2B]">
              {formatCurrency(dailyEarned)} / {formatCurrency(dailyTarget)}
            </strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 w-full max-w-md space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#2D6A4F]">{dailyPercent}% Target Met</span>
            <span className="text-[#8C827A]">{formatCurrency(dailyTarget - dailyEarned)} remaining to hit bonus</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div className="bg-[#2D6A4F] h-full transition-all duration-300" style={{ width: `${dailyPercent}%` }} />
          </div>
        </div>

        {/* 6-Day Work Streak */}
        <div className="flex items-center gap-2 bg-[#FFF3E6] px-4 py-2.5 rounded-2xl border border-[#F5C79E] shrink-0">
          <Flame className="w-5 h-5 text-[#C45C3C]" />
          <div>
            <span className="text-[10px] text-[#8C827A] uppercase font-bold block">Punctuality Streak</span>
            <strong className="text-xs font-black text-[#C45C3C]">6 Days Active (₹250 Weekly Bonus Unlocked)</strong>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">This Month Payout</span>
            <DollarSign className="w-4 h-4 text-[#2D6A4F]" />
          </div>
          <div className="text-2xl font-black text-[#2B2B2B]">{formatCurrency(worker.monthlyEarnings)}</div>
          <span className="text-[11px] text-[#2D6A4F] font-bold mt-1 block">90% Direct Retention</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Potential Upskill Income</span>
            <TrendingUp className="w-4 h-4 text-[#C45C3C]" />
          </div>
          <div className="text-2xl font-black text-[#C45C3C]">{formatCurrency(worker.potentialEarnings)}</div>
          <span className="text-[11px] text-[#8C827A] font-bold mt-1 block">+₹9,500/mo with Solar Grid</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Reputation Score</span>
            <Award className="w-4 h-4 text-[#D4A843]" />
          </div>
          <div className="text-2xl font-black text-[#2B2B2B]">{worker.rating} ⭐</div>
          <span className="text-[11px] text-[#9C7016] font-bold mt-1 block">{worker.jobsCompleted} Completed Jobs</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Welfare Contribution</span>
            <HeartHandshake className="w-4 h-4 text-[#2D6A4F]" />
          </div>
          <div className="text-2xl font-black text-[#2B2B2B]">{formatCurrency(worker.welfareContributions || 4850)}</div>
          <span className="text-[11px] text-[#2D6A4F] font-bold mt-1 block">100% PMSBY Subsidized</span>
        </div>
      </div>

      {/* Seasonal Curve & AI Upskilling Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 6-Month Predictive Demand Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">AI Seasonal Forecasting</span>
              <h3 className="font-bold text-base text-[#2B2B2B]">Your 6-Month Income & Demand Curve</h3>
            </div>
            <span className="text-xs font-bold text-[#D4A843] bg-[#FEF3C7] px-3 py-1 rounded-full">
              Diwali Surge: +35%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seasonalTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE1" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#8C827A" />
                <YAxis tick={{ fontSize: 11 }} stroke="#8C827A" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFDF9', borderRadius: '12px', border: '1px solid #E8DFD8', fontSize: '11px' }} />
                <Area type="monotone" dataKey="earnings" stroke="#2D6A4F" strokeWidth={2} fillOpacity={1} fill="url(#colorEarnings)" name="Projected Payout (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Upskilling Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-[#2D6A4F]" />
            </div>
            <span className="text-xs font-bold uppercase text-[#C45C3C] tracking-wider block">AI Career Upgrade</span>
            <h3 className="font-bold text-base text-[#2B2B2B]">
              Solar Rooftop & Inverter Maintenance Badge
            </h3>
            <p className="text-xs text-[#665D56] leading-relaxed">
              Winter demand drops by 20% for residential wiring. Complete the 2-week hybrid NSDC solar training to maintain ₹42,000/mo steady earnings.
            </p>
          </div>

          <Link
            to="/worker/skills"
            className="w-full py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enroll in Guild Skill Cohort</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

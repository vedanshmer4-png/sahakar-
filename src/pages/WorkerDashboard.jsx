import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Award,
  Sparkles,
  PieChart,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  ChevronRight,
  BookOpen,
  Briefcase,
  Layers,
  Users
} from 'lucide-react';
import GaugeMeter from '../components/GaugeMeter';
import ProgressBar from '../components/ProgressBar';
import {
  currentWorker,
  workers,
  seasonalDemand,
  skillLadder,
  profitDistribution,
  skillRecommendations,
  formatCurrency
} from '../data/mockData';

export default function WorkerDashboard() {
  const { t } = useTranslation();
  const [activeWorker, setActiveWorker] = useState(currentWorker);

  // Worker's seasonal demand data
  const demandData = seasonalDemand[activeWorker.trade] || seasonalDemand['Electrician'];
  const ladder = skillLadder[activeWorker.trade] || skillLadder['Electrician'];
  const recommendation = skillRecommendations[activeWorker.id] || {
    skill: 'Solar Panel Installation',
    reason: 'Demand rising 40% in Delhi due to rooftop solar subsidies.',
    potentialIncrease: 6500,
  };

  // Avatar-based ownership stake representation:
  // 12 avatars representing the collective cooperative, with active worker highlighted
  const avatarGrid = workers.slice(0, 12);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Top Header / Profile Greeting */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EADECF] flex items-center justify-center text-3xl border-2 border-[#C45C3C]/30 shadow-inner">
            {activeWorker.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                {activeWorker.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#2D6A4F] text-white">
                Co-op Owner
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#736B63] mt-1">
              <span className="font-semibold text-[#C45C3C]">{activeWorker.trade}</span>
              <span>•</span>
              <span className="text-[#2D6A4F] font-semibold">{activeWorker.level}</span>
              <span>•</span>
              <span>{activeWorker.city} District Council</span>
              <span>•</span>
              <span>{activeWorker.jobsCompleted} jobs completed</span>
            </div>
          </div>
        </div>

        {/* Quick Worker Switcher for demo purposes */}
        <div className="flex items-center gap-2 self-stretch md:self-auto bg-[#FFF8F0] p-2 rounded-xl border border-[#E8DFD8]">
          <span className="text-xs font-bold text-[#736B63] pl-1">Demo As:</span>
          <select
            value={activeWorker.id}
            onChange={(e) => {
              const selected = workers.find((w) => w.id === e.target.value);
              if (selected) setActiveWorker(selected);
            }}
            className="text-xs font-semibold bg-white border border-[#E8DFD8] rounded-lg px-2.5 py-1.5 text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
          >
            {workers.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.trade} - {w.level})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ============================================================ */}
      {/* THE CENTERPIECE: WORKER PROSPERITY ENGINE                    */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5ECE0] rounded-3xl p-6 sm:p-8 border-2 border-[#D4A843]/50 shadow-md relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D4A843]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#E8DFD8] pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 text-[#9C7016] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              The Worker Prosperity Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              "You're not just getting matched to jobs. You're growing your income."
            </h2>
            <p className="text-xs sm:text-sm text-[#736B63] mt-1 font-medium">
              Predictive seasonal insights and targeted skill upgrading designed to lift your earnings floor.
            </p>
          </div>
        </div>

        {/* Prosperity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Income Stability Score Gauge (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <GaugeMeter
              value={activeWorker.incomeStability}
              max={100}
              label={t('dashboard.incomeStability')}
            />

            {/* Current vs Potential Income Card */}
            <div className="mt-4 bg-white rounded-2xl p-4 border border-[#E8DFD8] shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#736B63] mb-2 flex items-center justify-between">
                <span>Monthly Income Trajectory</span>
                <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                  +₹{(activeWorker.potentialEarnings - activeWorker.monthlyEarnings).toLocaleString('en-IN')} Upside
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8]">
                  <p className="text-[11px] text-[#736B63] font-medium">{t('dashboard.currentIncome')}</p>
                  <p className="text-xl font-black text-[#2B2B2B] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    ₹{activeWorker.monthlyEarnings.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-[#736B63]">Active base</span>
                </div>
                <div className="p-3 bg-[#2D6A4F]/10 rounded-xl border border-[#2D6A4F]/30">
                  <p className="text-[11px] text-[#2D6A4F] font-semibold">{t('dashboard.potentialIncome')}</p>
                  <p className="text-xl font-black text-[#2D6A4F] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                    ₹{activeWorker.potentialEarnings.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-[#2D6A4F] font-medium flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> With next skill
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Seasonal Demand Forecast Chart (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B2B2B] uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-[#C45C3C]" />
                  <span>{t('dashboard.seasonalDemand')}</span>
                </div>
                <span className="text-[11px] font-bold text-[#C45C3C] bg-[#C45C3C]/10 px-2 py-0.5 rounded-full">
                  {activeWorker.trade}
                </span>
              </div>
              <p className="text-xs text-[#736B63] mb-4">
                Predictive district trends for the next 6 months — plan your availability and tool investments early.
              </p>

              {/* Chart */}
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={demandData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#C45C3C" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#C45C3C" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0E8DD" vertical={false} />
                    <XAxis dataKey="month" stroke="#8C827A" fontSize={11} tickLine={false} />
                    <YAxis stroke="#8C827A" fontSize={11} tickLine={false} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFDF9',
                        borderRadius: '12px',
                        border: '1px solid #E8DFD8',
                        fontSize: '12px',
                      }}
                      formatter={(val) => [`${val}% Demand Index`, 'Demand']}
                    />
                    <Area
                      type="monotone"
                      dataKey="demand"
                      stroke="#C45C3C"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#demandGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-[11px] text-[#736B63]">
              <span>Peak expected: <strong>Oct - Nov (Festival Season)</strong></span>
              <span className="text-[#2D6A4F] font-bold">High Surge Window</span>
            </div>
          </div>

          {/* 3. Recommended Skill to Learn Next (3 cols) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D4A843] mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Next Skill Step</span>
              </div>
              <h3 className="text-xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {recommendation.skill}
              </h3>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                {recommendation.reason}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70">Estimated Earnings Lift:</span>
                <span className="text-[#D4A843] font-bold text-sm">
                  +₹{recommendation.potentialIncrease.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <button className="w-full py-2.5 px-3 rounded-xl bg-[#D4A843] hover:bg-[#E0C068] text-[#2B2B2B] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95">
                <span>Join Co-op Skill Cohort</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COOPERATIVE OWNERSHIP & PROFIT SHARING                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ownership Stake Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C45C3C]/10 text-[#C45C3C] flex items-center justify-center">
                  <PieChart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2B2B2B]">
                    {t('dashboard.ownership')}
                  </h3>
                  <p className="text-xs text-[#736B63]">Direct equity in the platform cooperative</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-[#C45C3C] text-white">
                {activeWorker.ownershipStake}% Equity
              </span>
            </div>

            {/* Warm Avatar-based Co-op Stake Visualization (not cold stock chart) */}
            <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] my-4">
              <p className="text-xs font-bold text-[#4A4A4A] mb-3 flex items-center justify-between">
                <span>Cooperative Member Pool (Equal Democratic Voice)</span>
                <span className="text-[11px] text-[#2D6A4F] font-semibold">1 Member = 1 Vote</span>
              </p>

              {/* Avatar circle representation */}
              <div className="grid grid-cols-6 gap-2 pt-1">
                {avatarGrid.map((w, index) => {
                  const isCurrent = w.id === activeWorker.id;
                  return (
                    <div
                      key={w.id}
                      className={`relative flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-[#C45C3C] text-white border-[#A34A2E] shadow-md scale-105'
                          : 'bg-white border-[#E8DFD8] text-[#2B2B2B]'
                      }`}
                      title={`${w.name} - Co-owner`}
                    >
                      <span className="text-lg">{w.avatar}</span>
                      <span className="text-[9px] font-bold mt-1 truncate max-w-full text-center">
                        {isCurrent ? 'YOU' : w.name.split(' ')[0]}
                      </span>
                      {isCurrent && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4A843] border border-white" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-[#736B63] leading-relaxed">
              Unlike venture-backed gig platforms where founders and VCs take 100% of equity, Sahakar is governed as a multi-stakeholder cooperative registered under the Cooperative Societies Act.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-semibold">
            <span className="text-[#4A4A4A]">Co-op Certificate ID:</span>
            <span className="font-mono text-[#C45C3C]">SHK-2026-DEL-{activeWorker.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Profit Distribution Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2B2B2B]">
                    {t('dashboard.profitDistribution')}
                  </h3>
                  <p className="text-xs text-[#736B63]">Transparent breakdown of platform economics</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#736B63]">Aug 2026</span>
            </div>

            {/* Platform Revenue Flow Breakdown */}
            <div className="p-4 bg-[#F8F4EE] rounded-2xl border border-[#E8DFD8] space-y-3">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E8DFD8]">
                <span className="text-[#736B63]">Total Platform Gross Revenue:</span>
                <span className="font-bold text-[#2B2B2B]">{formatCurrency(profitDistribution.totalRevenue)}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E8DFD8]">
                <span className="text-[#2D6A4F] font-semibold">→ Distributed to Workers (90%):</span>
                <span className="font-bold text-[#2D6A4F]">{formatCurrency(profitDistribution.workerEarnings)}</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E8DFD8]">
                <span className="text-[#736B63]">→ Transferred to Welfare Pool (1%):</span>
                <span className="font-bold text-[#736B63]">{formatCurrency(profitDistribution.welfareFundContribution)}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C45C3C] font-semibold">→ Platform Reserves & Maintenance (9%):</span>
                <span className="font-bold text-[#C45C3C]">{formatCurrency(profitDistribution.platformShare)}</span>
              </div>
            </div>

            {/* Visual Distinction: Salary vs Ownership Dividend */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3.5 bg-[#FFF8F0] rounded-xl border-2 border-[#C45C3C]">
                <span className="text-[10px] uppercase font-bold text-[#C45C3C] tracking-wider block">
                  {t('dashboard.salary')}
                </span>
                <p className="text-xl font-black text-[#2B2B2B] mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  ₹{activeWorker.monthlyEarnings.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-[#736B63] mt-1">Direct job payouts</p>
              </div>

              <div className="p-3.5 bg-[#F0FDF4] rounded-xl border-2 border-[#2D6A4F]">
                <span className="text-[10px] uppercase font-bold text-[#2D6A4F] tracking-wider block">
                  {t('dashboard.dividend')}
                </span>
                <p className="text-xl font-black text-[#2D6A4F] mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  ₹{(profitDistribution.avgWorkerPayout.dividend * (activeWorker.ownershipStake / 0.1)).toFixed(0)}
                </p>
                <p className="text-[11px] text-[#2D6A4F] font-semibold mt-1">From co-op surplus</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs">
            <span className="font-bold text-[#2B2B2B]">Your Total Monthly Payout:</span>
            <span className="text-base font-black text-[#2D6A4F]">
              ₹{(activeWorker.monthlyEarnings + Math.round(profitDistribution.avgWorkerPayout.dividend * (activeWorker.ownershipStake / 0.1))).toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SKILL GROWTH LADDER                                          */}
      {/* ============================================================ */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4A843]/10 text-[#D4A843] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('dashboard.skillLadder')}: {activeWorker.trade}
              </h3>
            </div>
            <p className="text-xs text-[#736B63] mt-1">
              Transparent career progression with certified earnings expectations at each rung.
            </p>
          </div>
          <span className="text-xs font-bold text-[#2D6A4F] bg-[#D1FAE5] px-3 py-1.5 rounded-full self-start sm:self-auto">
            You are at Level: {activeWorker.level}
          </span>
        </div>

        {/* Progression Ladder Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {ladder.map((step, idx) => {
            const isCurrent = step.level === activeWorker.level;
            const isPast = idx < activeWorker.levelNum;
            const isFuture = idx > activeWorker.levelNum;

            return (
              <div
                key={step.level}
                className={`p-4 rounded-2xl border flex flex-col justify-between transition-all relative ${
                  isCurrent
                    ? 'bg-[#FFF8F0] border-2 border-[#C45C3C] shadow-md ring-2 ring-[#C45C3C]/20'
                    : isPast
                    ? 'bg-[#F0FDF4] border-[#2D6A4F]/30'
                    : 'bg-[#FAF5EE] border-[#E8DFD8] opacity-75'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                        isCurrent
                          ? 'bg-[#C45C3C] text-white'
                          : isPast
                          ? 'bg-[#2D6A4F] text-white'
                          : 'bg-[#E8DFD8] text-[#736B63]'
                      }`}
                    >
                      Step {idx + 1}
                    </span>
                    {isPast && <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />}
                    {isCurrent && <span className="text-xs font-bold text-[#C45C3C]">CURRENT</span>}
                  </div>

                  <h4 className="text-base font-bold text-[#2B2B2B]">{step.level}</h4>
                  <p className="text-[11px] text-[#736B63] mt-1 leading-snug">{step.requirements}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DFD8]">
                  <p className="text-[10px] uppercase font-bold text-[#8C827A]">{t('dashboard.avgEarnings')}:</p>
                  <p className="text-base font-black text-[#2D6A4F] mt-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                    ₹{step.avgEarnings.toLocaleString('en-IN')}/mo
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

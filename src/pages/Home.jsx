import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Users,
  ShieldCheck,
  HeartHandshake,
  Vote,
  TrendingUp,
  ShoppingBag,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PieChart,
  XCircle,
  BookOpen,
  Info
} from 'lucide-react';
import { platformStats, formatCurrency } from '../data/mockData';

export default function Home() {
  const { t } = useTranslation();

  const featuresList = [
    {
      id: 'ownership',
      title: t('features.ownership'),
      desc: t('features.ownershipDesc'),
      icon: PieChart,
      color: '#C45C3C',
      route: '/dashboard',
      actionText: 'View Stake & Dividends',
    },
    {
      id: 'welfare',
      title: t('features.welfare'),
      desc: t('features.welfareDesc'),
      icon: HeartHandshake,
      color: '#2D6A4F',
      route: '/welfare',
      actionText: 'Track ₹2.3Cr Ledger',
    },
    {
      id: 'passport',
      title: t('features.passport'),
      desc: t('features.passportDesc'),
      icon: Award,
      color: '#D4A843',
      route: '/passport',
      actionText: 'Inspect Portable Passport',
    },
    {
      id: 'trust',
      title: t('features.trust'),
      desc: t('features.trustDesc'),
      icon: ShieldCheck,
      color: '#40916C',
      route: '/customer',
      actionText: 'Try Mutual Rating',
    },
    {
      id: 'governance',
      title: t('features.governance'),
      desc: t('features.governanceDesc'),
      icon: Vote,
      color: '#C45C3C',
      route: '/governance',
      actionText: 'Enter District Council',
    },
    {
      id: 'skills',
      title: t('features.skills'),
      desc: t('features.skillsDesc'),
      icon: TrendingUp,
      color: '#2D6A4F',
      route: '/dashboard',
      actionText: 'See Skill Ladder',
    },
    {
      id: 'teams',
      title: t('features.teams'),
      desc: t('features.teamsDesc'),
      icon: Users,
      color: '#D4A843',
      route: '/jobs',
      actionText: 'See Auto-Assembled Teams',
    },
    {
      id: 'marketplace',
      title: t('features.marketplace'),
      desc: t('features.marketplaceDesc'),
      icon: ShoppingBag,
      color: '#40916C',
      route: '/community',
      actionText: 'Join Tool Group-Buys',
    },
  ];

  return (
    <div className="flex flex-col gap-12 sm:gap-16 pb-16">
      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#E8DFD8] bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F0] to-[#F7EFE4]">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C45C3C]/10 border border-[#C45C3C]/30 text-[#C45C3C] text-xs font-bold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WORKER-OWNED GIG SERVICES PLATFORM</span>
          </div>

          {/* Headline */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2B2B2B] leading-tight sm:leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            A platform owned by the people
            <br />
            <span className="text-[#C45C3C]">
              who work on it.
            </span>
          </h1>

          {/* Positioning Statement Box */}
          <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm mb-8 text-left sm:text-center">
            <p className="text-base sm:text-lg text-[#3A3A3A] font-medium leading-relaxed">
              <strong className="text-[#C45C3C] font-bold">Traditional gig platforms</strong> maximize platform profit. <strong className="text-[#2D6A4F] font-bold">Sahakar</strong> maximizes worker prosperity through ownership, profit-sharing, welfare funds, portable reputation, and democratic governance.
            </p>
            <div className="mt-4 pt-4 border-t border-[#E8DFD8] flex items-center justify-center gap-2 text-xs font-semibold text-[#665D56]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A843] shrink-0" />
              <span>Fair economics through direct worker ownership, portable reputation, and mutual aid</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-[#C45C3C] text-white font-black text-sm hover:bg-[#A34A2E] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <span>{t('hero.joinWorker')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/customer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-[#2D6A4F] border-2 border-[#2D6A4F] font-black text-sm hover:bg-[#2D6A4F] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>{t('hero.bookService')}</span>
            </Link>
          </div>
        </div>

        {/* Live-looking Stats Strip */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] text-center shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 text-[#C45C3C] mb-2">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('stats.workers')}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2B2B2B] my-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {platformStats.totalWorkers.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-[#2D6A4F] font-bold mt-1">100% Worker-Owners</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#C45C3C]" />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] text-center shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 text-[#2D6A4F] mb-2">
              <HeartHandshake className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('stats.welfare')}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2B2B2B] my-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {formatCurrency(platformStats.welfarePool)}
            </div>
            <p className="text-xs text-[#665D56] font-semibold mt-1">1% from every job, 100% transparent</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D6A4F]" />
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] text-center shadow-sm relative overflow-hidden flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2 text-[#D4A843] mb-2">
              <Vote className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{t('stats.districts')}</span>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-[#2B2B2B] my-1" style={{ fontFamily: 'var(--font-heading)' }}>
              {platformStats.totalDistricts} Councils
            </div>
            <p className="text-xs text-[#665D56] font-semibold mt-1">Delhi, Mumbai, Pune, Lucknow...</p>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4A843]" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPARISON SECTION                                          */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-gradient-to-br from-[#FAF5EE] via-[#FFFDF9] to-[#FAF5EE] rounded-3xl p-6 sm:p-10 border border-[#E8DFD8] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C45C3C]">Structural Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2B2B2B] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
              Why We Are Fundamentally Different
            </h2>
            <p className="text-xs sm:text-sm text-[#736B63] mt-2">
              Every design and financial mechanism is structured for worker equity, not platform rent-seeking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Corporate Gig Platform */}
            <div className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#D64545] font-black text-sm mb-4">
                  <XCircle className="w-5 h-5 text-[#D64545] shrink-0" />
                  <span>Traditional Gig Platforms</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#4A4A4A]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D64545] font-black shrink-0">✕</span>
                    <span><strong>20-30% platform commission</strong> taken from every completed job</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D64545] font-black shrink-0">✕</span>
                    <span><strong>Reputation lock-in:</strong> worker ratings trapped on the platform</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D64545] font-black shrink-0">✕</span>
                    <span><strong>Arbitrary deplatforming:</strong> algorithm can block workers overnight</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D64545] font-black shrink-0">✕</span>
                    <span><strong>Zero safety net:</strong> worker bears all medical/accident risks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D64545] font-black shrink-0">✕</span>
                    <span><strong>One-way ratings:</strong> customer is always right, workers have no voice</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sahakar Cooperative */}
            <div className="bg-white rounded-2xl p-6 border-2 border-[#2D6A4F] shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#2D6A4F] font-black text-sm mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                  <span>Sahakar Platform Model</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-[#2B2B2B]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span><strong>90% direct to worker</strong> + surplus returned as quarterly dividends</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span><strong>Portable Reputation Passport:</strong> verifiable score owned by worker</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span><strong>Democratic Governance:</strong> district councils vote on rules & disputes</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span><strong>1% Welfare Fund:</strong> collective emergency pool for healthcare & accidents</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                    <span><strong>Bidirectional trust:</strong> workers rate customers with constructive flags</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8 PILLARS OF WORKER PROSPERITY SCROLL STORY                  */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C45C3C]">Cooperative Architecture</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2B2B2B] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
            The 8 Pillars of Worker Prosperity
          </h2>
          <p className="text-xs sm:text-sm text-[#736B63] mt-2">
            Every feature has been designed to replace platform exploitation with cooperative solidarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresList.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs shrink-0"
                      style={{ backgroundColor: feat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-[#8C827A] uppercase tracking-wider">
                      Pillar 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2B2B2B] leading-snug">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#665D56] mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <Link
                  to={feat.route}
                  className="mt-6 pt-4 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-bold group-hover:translate-x-1 transition-transform"
                  style={{ color: feat.color }}
                >
                  <span>{feat.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT US & LEARN MORE SECTION                                */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center text-center gap-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A843] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              Cooperative Solidarity
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              Built for Workers. Governed by Workers.
            </h2>
            <p className="text-xs sm:text-base text-white/85 max-w-xl leading-relaxed">
              Sahakar transforms everyday gig labor into dignified, sustainable, and wealth-building careers through direct platform ownership, fair profit sharing, and democratic district councils.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#D4A843] text-[#2B2B2B] font-black text-sm hover:bg-[#E0C068] shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Learn More</span>
              </Link>
              <Link
                to="/governance"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>About Us & Governance</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

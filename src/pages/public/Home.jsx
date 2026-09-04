import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  HeartHandshake,
  Users,
  Vote,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Zap,
  Star,
  MapPin,
  Clock,
  ChevronRight,
  Search,
  Check,
  Radio,
  Building2,
  FileCheck,
  Layers,
  Phone,
  Mail,
  Scale,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const store = getStore();

  const [selectedTrade, setSelectedTrade] = useState('Electrician');
  const [hoursNeeded, setHoursNeeded] = useState(2);
  const [searchTrade, setSearchTrade] = useState('');
  const [searchPincode, setSearchPincode] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const activeWorker = store.workers.find(w => w.trade === selectedTrade) || store.workers[0];
  const totalCost = activeWorker.hourlyRate * hoursNeeded;
  const workerEarning = totalCost * 0.90;
  const welfarePoolCut = totalCost * 0.01;
  const societyOpsCut = totalCost * 0.09;

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchTrade || searchPincode) {
      navigate('/customer/search');
    }
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!searchPincode) return;
    const isDelhiPincode = searchPincode.startsWith('110');
    const isMumbaiPincode = searchPincode.startsWith('400');
    const isPunePincode = searchPincode.startsWith('411');
    const isBlrPincode = searchPincode.startsWith('560');

    if (isDelhiPincode || isMumbaiPincode || isPunePincode || isBlrPincode) {
      setCheckResult({
        available: true,
        district: isDelhiPincode ? 'Delhi Central Labour Co-op Guild (Reg #DL-882)' : isMumbaiPincode ? 'Mumbai Metropolitan Co-op Union (Reg #MH-401)' : isPunePincode ? 'Pune Industrial Co-op Federation (Reg #PN-112)' : 'Bengaluru Guild (Reg #KA-502)',
        activeWorkers: Math.floor(45 + Math.random() * 30),
        avgResponseTime: '12-15 Mins'
      });
    } else {
      setCheckResult({
        available: true,
        district: 'National Federation Registered Primary Society Coverage',
        activeWorkers: 24,
        avgResponseTime: '18-20 Mins'
      });
    }
  };

  const primarySocieties = [
    { name: 'Delhi Central Electrical & Tech Co-op Society', regNo: 'MSCS/ND/2019/412', members: 420, trades: 'Electrical, Technicians', area: 'Delhi NCR' },
    { name: 'Mumbai Precision Plumbing & Sanitation Co-op', regNo: 'MSCS/MH/2021/184', members: 380, trades: 'Plumbing, Pipefitting', area: 'Mumbai, Thane' },
    { name: 'Bengaluru Skilled Carpentry & Guild Union', regNo: 'MSCS/KA/2020/629', members: 310, trades: 'Carpentry, Furniture', area: 'Bengaluru Urban' },
    { name: 'Kolkata Masonry & Structural Finishing Federation', regNo: 'MSCS/WB/2022/305', members: 490, trades: 'Painting, Masonry', area: 'Kolkata, Howrah' }
  ];

  return (
    <div className="space-y-10 py-2">
      {/* 1. INSTITUTIONAL HERO SECTION WITH 5-COLOR PALETTE */}
      <section className="gov-card p-6 sm:p-10 border-l-4 border-l-[#5C8F57]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="gov-badge gov-badge-green">
                <Building2 className="w-3.5 h-3.5 text-[#5C8F57]" />
                <span>NATIONAL COOPERATIVE DIGITAL PUBLIC INFRASTRUCTURE</span>
              </span>
              <span className="gov-badge gov-badge-gold">
                <Scale className="w-3.5 h-3.5 text-[#8A7326]" />
                <span>SMART INDIA HACKATHON INITIATIVE</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#000000] leading-tight tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              A verified gig service grid owned democratically by India’s skilled labour cooperatives.
            </h1>

            <p className="text-sm sm:text-base text-[#444444] leading-relaxed max-w-3xl">
              Commercial gig aggregators extract <strong>30% to 35% in commissions</strong> while workers bear all risks. <strong>Sahakar</strong> is a digital public good that routes <strong className="text-[#3F693A]">90% directly to the working craftsman via UPI/DBT</strong>, allocates 1% into a collective emergency welfare fund, and guarantees 1-Member-1-Vote legal equity.
            </p>

            {/* Hyperlocal Search Bar */}
            <form onSubmit={handleHeroSearch} className="p-2 bg-[#FAF9F6] border border-[#E6E2D6] rounded-2xl flex flex-col sm:flex-row items-center gap-2 max-w-2xl shadow-2xs">
              <div className="flex-1 w-full flex items-center gap-2 bg-white rounded-xl px-3 py-2 text-xs border border-[#E6E2D6]">
                <Search className="w-4 h-4 text-[#888888] shrink-0" />
                <input
                  type="text"
                  value={searchTrade}
                  onChange={(e) => setSearchTrade(e.target.value)}
                  placeholder={t('home.searchPlaceholder', 'Service / Trade (e.g. Electrician, Plumber, Painter)...')}
                  className="w-full bg-transparent font-medium text-[#000000] focus:outline-none"
                />
              </div>

              <div className="w-full sm:w-44 flex items-center gap-2 bg-white rounded-xl px-3 py-2 text-xs border border-[#E6E2D6]">
                <MapPin className="w-4 h-4 text-[#EA7671] shrink-0" />
                <input
                  type="text"
                  value={searchPincode}
                  onChange={(e) => setSearchPincode(e.target.value)}
                  placeholder={t('home.pincodePlaceholder', 'Pincode (e.g. 110001)...')}
                  className="w-full bg-transparent font-medium text-[#000000] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white font-bold text-xs shadow-xs transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{t('home.findNearby', 'Find Nearby Craftsmen')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/customer/book"
                className="px-5 py-2.5 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all active:scale-95"
              >
                <span>{t('home.bookBtn', 'Book a Verified Craftsman')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                to="/onboarding"
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#FAF9F6] text-[#000000] font-bold text-xs border border-[#E6E2D6] shadow-2xs flex items-center gap-2 transition-all"
              >
                <Users className="w-3.5 h-3.5 text-[#5C8F57]" />
                <span>{t('home.joinBtn', 'Worker KYC Onboarding')}</span>
              </Link>

              <Link
                to="/customer/emergency"
                className="px-4 py-2.5 rounded-xl bg-[#FDF1F0] hover:bg-[#FCE8E7] text-[#C24D48] font-bold text-xs border border-[#F9CBC9] flex items-center gap-1.5 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-[#EA7671]" />
                <span>Emergency 15-Min SOS</span>
              </Link>
            </div>
          </div>

          {/* Right Metric Ledger Card */}
          <div className="lg:col-span-4 bg-[#FAF9F6] p-5 rounded-2xl border border-[#E6E2D6] space-y-4">
            <div className="border-b border-[#E6E2D6] pb-2 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-[#000000] tracking-wider">
                DPI METRIC LEDGER
              </span>
              <span className="text-[10px] text-[#3F693A] font-bold bg-[#EFF6EE] border border-[#CDE1CC] px-2 py-0.5 rounded-md">
                Live Audited
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E6E2D6]">
                <span className="text-[#555555] font-medium">Worker Direct Payout:</span>
                <strong className="text-[#3F693A] font-black text-sm">90.0% DBT</strong>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E6E2D6]">
                <span className="text-[#555555] font-medium">Emergency Welfare Levy:</span>
                <strong className="text-[#8A7326] font-black text-sm">1.0% Pool</strong>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E6E2D6]">
                <span className="text-[#555555] font-medium">Affiliated Craftsmen:</span>
                <strong className="text-[#000000] font-black text-sm">14,680+</strong>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E6E2D6]">
                <span className="text-[#555555] font-medium">Democratic Quorum:</span>
                <strong className="text-[#000000] font-black text-sm">1-Member-1-Vote</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6E2D6] text-[11px] text-[#666666] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5C8F57] shrink-0" />
              <span>Multi-State Cooperative Societies Act, 2002 Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATUTORY COMPLIANCE & 4 PILLARS */}
      <section className="space-y-4">
        <div className="border-b border-[#E6E2D6] pb-2">
          <h2 className="text-lg sm:text-xl font-bold text-[#000000] flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <Building2 className="w-5 h-5 text-[#5C8F57]" />
            <span>Four Architectural Pillars of Sahakar Cooperative DPI</span>
          </h2>
          <p className="text-xs text-[#666666]">
            Engineered as an equitable, worker-owned digital public alternative to monopolistic gig platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gov-card p-4 space-y-2 border-t-4 border-t-[#5C8F57]">
            <div className="flex items-center gap-2 text-[#3F693A] font-bold text-xs">
              <DollarSign className="w-4 h-4 text-[#5C8F57]" />
              <span>90/1/9 Financial Routing</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              Every ₹1,000 paid by the consumer routes ₹900 straight to worker UPI, ₹10 to medical welfare, and ₹90 to primary society tool depots.
            </p>
          </div>

          <div className="gov-card p-4 space-y-2 border-t-4 border-t-[#000000]">
            <div className="flex items-center gap-2 text-[#000000] font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-[#000000]" />
              <span>W3C Verifiable Credentials</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              Worker reviews and certifications belong to the craftsman on cryptographic passports—portable across any cooperative without lock-in.
            </p>
          </div>

          <div className="gov-card p-4 space-y-2 border-t-4 border-t-[#DCC573]">
            <div className="flex items-center gap-2 text-[#8A7326] font-bold text-xs">
              <Vote className="w-4 h-4 text-[#DCC573]" />
              <span>Democratic Governance</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              No unilateral algorithm deactivations. Dispute hearings and wage floor policies are voted on by elected District Cooperative Councils.
            </p>
          </div>

          <div className="gov-card p-4 space-y-2 border-t-4 border-t-[#EA7671]">
            <div className="flex items-center gap-2 text-[#C24D48] font-bold text-xs">
              <HeartHandshake className="w-4 h-4 text-[#EA7671]" />
              <span>1% Safety & Welfare Net</span>
            </div>
            <p className="text-xs text-[#555555] leading-relaxed">
              Automated micro-levy funds emergency hospitalization, disability compensation, and guild tool insurance for all verified workers.
            </p>
          </div>
        </div>
      </section>

      {/* 3. COMPARATIVE AUDIT: COMMERCIAL AGGREGATORS VS SAHAKAR */}
      <section className="gov-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E6E2D6] pb-3">
          <div>
            <span className="text-[11px] font-bold uppercase text-[#5C8F57] tracking-wider">
              ECONOMIC COMPARISON MATRIX
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
              Where does the customer's money actually flow?
            </h3>
          </div>
          <span className="gov-badge gov-badge-gold">
            Audited Ledger
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Corporate Platform Ledger */}
          <div className="p-5 rounded-2xl bg-[#FDF1F0] border border-[#F9CBC9] space-y-4">
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-[#9E3632] uppercase tracking-wide">
                Commercial Gig Aggregator Model
              </strong>
              <span className="text-[10px] bg-[#F6A8A4] text-[#7A1E1A] px-2 py-0.5 rounded-md font-bold">
                Profit Maximizing
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#9E3632]">
                <span>Worker Take-Home:</span>
                <span className="text-sm">65% – 70%</span>
              </div>
              <div className="w-full bg-[#F6A8A4]/50 h-2 rounded-full overflow-hidden">
                <div className="bg-[#EA7671] h-full w-[65%]" />
              </div>

              <div className="flex justify-between font-bold text-[#9E3632] pt-2">
                <span>Corporate Commission & Platform Fee:</span>
                <span className="text-sm">30% – 35%</span>
              </div>
              <div className="w-full bg-[#F6A8A4]/50 h-2 rounded-full overflow-hidden">
                <div className="bg-[#C24D48] h-full w-[35%]" />
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-[#9E3632] pt-2 border-t border-[#F9CBC9]">
              <li className="flex items-center gap-1.5">✕ Zero worker equity, voting rights, or ownership shares</li>
              <li className="flex items-center gap-1.5">✕ Algorithmic shadow-banning & unilateral deactivations</li>
              <li className="flex items-center gap-1.5">✕ Walled-garden locked reputation data</li>
            </ul>
          </div>

          {/* Sahakar Co-op Platform Ledger */}
          <div className="p-5 rounded-2xl bg-[#EFF6EE] border border-[#CDE1CC] space-y-4">
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-[#3F693A] uppercase tracking-wide">
                Sahakar Cooperative DPI Model
              </strong>
              <span className="text-[10px] bg-[#8EBA8A] text-[#1E3B1A] px-2 py-0.5 rounded-md font-bold">
                Worker-Owned Good
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-[#3F693A]">
                <span>Direct Worker UPI Settlement:</span>
                <span className="text-sm">90% Direct DBT</span>
              </div>
              <div className="w-full bg-[#CDE1CC] h-2 rounded-full overflow-hidden">
                <div className="bg-[#5C8F57] h-full w-[90%]" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-white border border-[#CDE1CC]">
                  <span className="text-[10px] text-[#666666] block">Emergency Welfare:</span>
                  <strong className="text-xs text-[#8A7326]">1% Micro-Levy</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#CDE1CC]">
                  <span className="text-[10px] text-[#666666] block">Primary Society Fund:</span>
                  <strong className="text-xs text-[#000000]">9% Depot & Ops</strong>
                </div>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-[#444444] pt-2 border-t border-[#CDE1CC]">
              <li className="flex items-center gap-1.5 text-[#3F693A] font-bold">✓ 0.12% Legal Cooperative Equity per active verified craftsman</li>
              <li className="flex items-center gap-1.5 text-[#3F693A] font-bold">✓ Portable W3C Verifiable Credential Passport</li>
              <li className="flex items-center gap-1.5 text-[#3F693A] font-bold">✓ 1-Member-1-Vote Democratic Council Governance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. PINCODE COVERAGE CHECKER & PRIMARY SOCIETIES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pincode Availability Checker */}
        <div className="lg:col-span-5 gov-card p-5 space-y-4">
          <div className="border-b border-[#E6E2D6] pb-2">
            <span className="text-[10px] font-bold uppercase text-[#5C8F57] tracking-wider">
              GIS Coverage Grid
            </span>
            <h3 className="text-base font-bold text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
              Check Pincode Service Availability
            </h3>
          </div>

          <form onSubmit={handlePincodeCheck} className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={searchPincode}
              onChange={(e) => setSearchPincode(e.target.value)}
              placeholder="Enter 6-digit Pincode (e.g. 110001)..."
              className="flex-1 px-3 py-2 bg-[#FAF9F6] border border-[#E6E2D6] rounded-xl text-xs font-semibold text-[#000000] focus:outline-none focus:border-[#5C8F57]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Check
            </button>
          </form>

          {checkResult && (
            <div className="p-3.5 rounded-xl bg-[#EFF6EE] border border-[#CDE1CC] text-xs text-[#3F693A] space-y-1.5 animate-in fade-in duration-150">
              <div className="flex items-center gap-1.5 font-bold text-[#1E3B1A]">
                <CheckCircle2 className="w-4 h-4 text-[#5C8F57] shrink-0" />
                <span>Cooperative Guild Active in Pincode!</span>
              </div>
              <p className="text-[11px] text-[#555555]">{checkResult.district}</p>
              <div className="flex items-center justify-between text-[10px] text-[#666666] pt-1 border-t border-[#CDE1CC]">
                <span>{checkResult.activeWorkers} verified craftsmen on duty</span>
                <span className="font-bold text-[#3F693A]">Avg Response: {checkResult.avgResponseTime}</span>
              </div>
              <Link
                to="/customer/search"
                className="block text-center mt-2 px-3 py-1.5 rounded-lg bg-[#5C8F57] text-white font-bold text-[11px] hover:bg-[#3F693A]"
              >
                Open Live Radar Dispatch
              </Link>
            </div>
          )}
        </div>

        {/* Registered Primary Cooperative Societies Showcase */}
        <div className="lg:col-span-7 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#E6E2D6] pb-2">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#000000] tracking-wider">
                Official Directory
              </span>
              <h3 className="text-base font-bold text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
                Affiliated Primary Labour Cooperatives
              </h3>
            </div>
            <Link to="/for-cooperatives" className="text-xs text-[#5C8F57] font-bold hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {primarySocieties.map((soc) => (
              <div key={soc.regNo} className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6] flex items-center justify-between text-xs">
                <div>
                  <strong className="block text-[#000000] font-bold">{soc.name}</strong>
                  <span className="text-[10px] text-[#666666]">Reg: {soc.regNo} • {soc.area}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#5C8F57] block">{soc.members} Craftsmen</span>
                  <span className="text-[10px] text-[#666666]">{soc.trades}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INSTANT FAIR REVENUE SIMULATOR */}
      <section className="gov-card p-6 sm:p-8 space-y-6">
        <div className="border-b border-[#E6E2D6] pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#5C8F57] tracking-wider">
              TRANSPARENT TARIFF CALCULATOR
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
              Calculate Instant Booking Quote & Payout Distribution
            </h3>
          </div>
          <span className="gov-badge gov-badge-gold">
            Standard Wage Floor
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-[#000000] block mb-1">Select Skill / Trade</label>
            <select
              value={selectedTrade}
              onChange={(e) => setSelectedTrade(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E6E2D6] rounded-xl px-3 py-2 text-xs font-bold text-[#000000] focus:outline-none"
            >
              {store.trades.map(t => (
                <option key={t} value={t}>{t} (₹{store.workers.find(w => w.trade === t)?.hourlyRate || 350}/hr)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#000000] block mb-1">
              Estimated Job Duration: <strong className="text-[#3F693A]">{hoursNeeded} hrs</strong>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={hoursNeeded}
              onChange={(e) => setHoursNeeded(Number(e.target.value))}
              className="w-full mt-2 accent-[#5C8F57]"
            />
          </div>
        </div>

        {/* 4-Pill Revenue Split Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-white border border-[#E6E2D6]">
            <span className="text-[10px] text-[#666666] uppercase font-bold block">Total Fair Price</span>
            <strong className="text-sm sm:text-base font-black text-[#000000]">{formatCurrency(totalCost)}</strong>
          </div>

          <div className="p-3 rounded-xl bg-[#EFF6EE] border border-[#CDE1CC]">
            <span className="text-[10px] text-[#3F693A] uppercase font-bold block">90% Direct Worker Payout</span>
            <strong className="text-sm sm:text-base font-black text-[#1E3B1A]">{formatCurrency(workerEarning)}</strong>
          </div>

          <div className="p-3 rounded-xl bg-[#FAF6E8] border border-[#EFE3B5]">
            <span className="text-[10px] text-[#8A7326] uppercase font-bold block">1% Emergency Welfare</span>
            <strong className="text-sm sm:text-base font-black text-[#66541A]">{formatCurrency(welfarePoolCut)}</strong>
          </div>

          <div className="p-3 rounded-xl bg-white border border-[#E6E2D6]">
            <span className="text-[10px] text-[#666666] uppercase font-bold block">9% Primary Co-op Depot</span>
            <strong className="text-sm sm:text-base font-black text-[#000000]">{formatCurrency(societyOpsCut)}</strong>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E6E2D6]">
          <div className="text-xs text-[#666666]">
            <span>Minimum support hourly floor approved by District Cooperative Council.</span>
          </div>
          <Link
            to="/customer/book"
            className="px-6 py-2.5 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white font-bold text-xs shadow-xs flex items-center gap-2"
          >
            <span>Proceed to Book Verified {selectedTrade}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

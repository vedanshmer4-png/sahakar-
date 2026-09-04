import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  HeartHandshake,
  TrendingUp,
  FileCheck,
  ArrowRight,
  Sparkles,
  Calculator,
  Download
} from 'lucide-react';
import { formatCurrency } from '../../data/mockStore';

export default function ForCooperatives() {
  const [memberCount, setMemberCount] = useState(250);
  const [avgJobsPerMonth, setAvgJobsPerMonth] = useState(20);
  const [avgTicketPrice, setAvgTicketPrice] = useState(650);

  const totalMonthlyGMV = memberCount * avgJobsPerMonth * avgTicketPrice;
  const annualGMV = totalMonthlyGMV * 12;
  const societyOpsAnnual = annualGMV * 0.09; // 9% society fund
  const welfareAnnual = annualGMV * 0.01;   // 1% welfare fund
  const directWagesAnnual = annualGMV * 0.90; // 90% direct to workers

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-wider text-[#2D6A4F] bg-[#D1FAE5] px-3.5 py-1 rounded-full">
          PRIMARY SOCIETIES & LABOUR FEDERATIONS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          Digitize Your Labour Cooperative Roster
        </h1>
        <p className="text-sm sm:text-base text-[#665D56] leading-relaxed">
          Affiliate your Primary Labour Society or State Federation to Sahakar. Provide your members with high-value digital jobs, automated 9% society depot funding, and statutory insurance.
        </p>
      </div>

      {/* Interactive Society Revenue Calculator */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD8] shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-[#F0EAE1] pb-3">
          <Calculator className="w-5 h-5 text-[#C45C3C]" />
          <h3 className="font-bold text-base text-[#2B2B2B]">Interactive Society Fleet & Revenue Calculator</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Affiliated Craftsmen Count: <strong className="text-[#2D6A4F] text-sm">{memberCount} Members</strong></label>
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={memberCount}
              onChange={(e) => setMemberCount(Number(e.target.value))}
              className="w-full mt-2 accent-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Avg Completed Jobs / Member / Month: <strong className="text-[#2D6A4F] text-sm">{avgJobsPerMonth} Jobs</strong></label>
            <input
              type="range"
              min="5"
              max="40"
              value={avgJobsPerMonth}
              onChange={(e) => setAvgJobsPerMonth(Number(e.target.value))}
              className="w-full mt-2 accent-[#2D6A4F]"
            />
          </div>

          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Avg Service Value (₹): <strong className="text-[#2D6A4F] text-sm">₹{avgTicketPrice}</strong></label>
            <input
              type="range"
              min="300"
              max="2500"
              step="50"
              value={avgTicketPrice}
              onChange={(e) => setAvgTicketPrice(Number(e.target.value))}
              className="w-full mt-2 accent-[#2D6A4F]"
            />
          </div>
        </div>

        {/* Output Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center pt-2">
          <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8]">
            <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Annual Gross Service GMV</span>
            <strong className="text-base sm:text-lg font-black text-[#2B2B2B]">{formatCurrency(annualGMV)}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-[#D1FAE5] border border-[#2D6A4F]/20">
            <span className="text-[10px] text-[#2D6A4F] font-bold uppercase block">90% Direct Member Wages</span>
            <strong className="text-base sm:text-lg font-black text-[#1B4332]">{formatCurrency(directWagesAnnual)}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF3C7] border border-[#D4A843]/30">
            <span className="text-[10px] text-[#9C7016] font-bold uppercase block">9% Primary Society Ops Fund</span>
            <strong className="text-base sm:text-lg font-black text-[#9C7016]">{formatCurrency(societyOpsAnnual)}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8]">
            <span className="text-[10px] text-[#C45C3C] font-bold uppercase block">1% Emergency Welfare Pool</span>
            <strong className="text-base sm:text-lg font-black text-[#C45C3C]">{formatCurrency(welfareAnnual)}</strong>
          </div>
        </div>
      </div>

      {/* Federation Charter Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center font-black">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">9% Automated Society Depot Fund</h3>
          <p className="text-xs text-[#665D56] leading-relaxed">
            Every booking automatically routes 9% into the Primary Society account to fund industrial scaffolding, training centers, and local arbitration.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#9C7016] flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">NSDC Accreditation Gateway</h3>
          <p className="text-xs text-[#665D56] leading-relaxed">
            Upgrade your craftsman members to certified Level 3 & Master grades, unlocking commercial institution contracts.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] text-[#C45C3C] flex items-center justify-center font-black">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">Statutory Insurance Automation</h3>
          <p className="text-xs text-[#665D56] leading-relaxed">
            Automated compliance with Pradhan Mantri Suraksha Bima Yojana (PMSBY) and state labour welfare board requirements.
          </p>
        </div>
      </div>
    </div>
  );
}

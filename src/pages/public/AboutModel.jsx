import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  HeartHandshake,
  Vote,
  Award,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '../../data/mockStore';

export default function AboutModel() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-wider text-[#D4A843] bg-[#FEF3C7] px-3 py-1 rounded-full">
          THE SAHAKAR ECONOMIC BLUEPRINT
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          Why Worker Ownership Changes Everything
        </h1>
        <p className="text-sm sm:text-base text-[#665D56] leading-relaxed">
          Rooted in democratic cooperative enterprise principles, Sahakar brings verified worker ownership and collective social security to the urban skilled trades.
        </p>
      </div>

      {/* Visual Money Flow Diagram (₹1,000 Example) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DFD8] shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase text-[#C45C3C]">Transparent Routing</span>
          <h3 className="text-xl font-black text-[#2B2B2B]">How ₹1,000 in Customer Spend is Distributed</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-6 rounded-3xl bg-[#D1FAE5]/60 border-2 border-[#2D6A4F] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#2D6A4F] uppercase">90% Direct Share</span>
                <DollarSign className="w-5 h-5 text-[#2D6A4F]" />
              </div>
              <strong className="text-3xl font-black text-[#1B4332] block">₹900.00</strong>
              <p className="text-xs text-[#2D6A4F] font-semibold">Direct Craftsman Wage</p>
              <p className="text-[11px] text-[#665D56] leading-relaxed">Transferred instantly into worker’s linked bank/UPI account upon customer signoff with zero booking lead cut.</p>
            </div>
            <span className="text-[10px] text-[#2D6A4F] font-bold block pt-2 border-t border-[#2D6A4F]/20">+ 0.12% Annual Dividend Share</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#FEF3C7]/80 border-2 border-[#D4A843] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#9C7016] uppercase">1% Collective Pool</span>
                <HeartHandshake className="w-5 h-5 text-[#9C7016]" />
              </div>
              <strong className="text-3xl font-black text-[#9C7016] block">₹10.00</strong>
              <p className="text-xs text-[#9C7016] font-semibold">Universal Welfare Pool</p>
              <p className="text-[11px] text-[#665D56] leading-relaxed">Builds the ₹2.31Cr emergency buffer that auto-renews PMSBY ₹2L accident insurance and hospital aid.</p>
            </div>
            <span className="text-[10px] text-[#9C7016] font-bold block pt-2 border-t border-[#D4A843]/30">Zero Interest Emergency Relief</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF5EE] border-2 border-[#E8DFD8] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#736B63] uppercase">9% Primary Society</span>
                <Building2 className="w-5 h-5 text-[#736B63]" />
              </div>
              <strong className="text-3xl font-black text-[#2B2B2B] block">₹90.00</strong>
              <p className="text-xs text-[#2B2B2B] font-semibold">Society Tool Depot & Ops</p>
              <p className="text-[11px] text-[#665D56] leading-relaxed">Maintains local industrial tool depots, organizes NSDC skill cohorts, and funds impartial customer dispute mediation.</p>
            </div>
            <span className="text-[10px] text-[#736B63] font-bold block pt-2 border-t border-[#E8DFD8]">Democratic Society Surplus</span>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-[#E8DFD8] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center font-black">
            <DollarSign className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#2B2B2B]">90% Direct Payout & Equity</h3>
          <p className="text-xs text-[#665D56] leading-relaxed">
            Unlike corporate platforms that extract 30%+ in commissions, Sahakar ensures 90% goes straight to the craftsman’s bank account. Additionally, active workers receive legal cooperative equity and annual surplus dividend payouts.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#E8DFD8] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FEE2E2] text-[#C45C3C] flex items-center justify-center font-black">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#2B2B2B]">1% Universal Welfare Pool</h3>
          <p className="text-xs text-[#665D56] leading-relaxed">
            Every booking automatically diverts 1% into a transparent, collective welfare pool (currently ₹2.31 Crore). This pool auto-renews PMSBY ₹2L accident insurance, covers emergency hospitalizations, and provides tool loss relief.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#E8DFD8] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#9C7016] flex items-center justify-center font-black">
            <Vote className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-[#2B2B2B]">1-Member-1-Vote Democracy</h3>
          <p className="text-xs text-[#665D56] leading-relaxed">
            Algorithms don't control workers' destinies. District Cooperative Councils vote on base minimum wage floors, equipment sharing policies, and resolve customer-worker disputes through independent peer mediation.
          </p>
        </div>
      </div>
    </div>
  );
}

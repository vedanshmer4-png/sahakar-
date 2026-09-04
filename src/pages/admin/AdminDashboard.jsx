import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  HeartHandshake,
  DollarSign,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function AdminDashboard() {
  const store = getStore();

  const totalGMV = store.bookings.reduce((sum, b) => sum + b.totalAmount, 0) + 14850000;
  const pendingKYCCount = (store.kycQueue || []).filter(k => k.status === 'Pending Review').length;
  const activeDisputesCount = store.disputes.length;

  const liveActivity = [
    { time: '2m ago', event: 'Job Completed', detail: 'Rajesh Kumar completed Electrical Rewiring in Vasant Vihar. 90% payout (₹630) released.', type: 'payout' },
    { time: '8m ago', event: 'KYC Submitted', detail: 'Santosh Yadav submitted Aadhaar & NSDC Wireman certificate from Delhi Guild.', type: 'kyc' },
    { time: '14m ago', event: 'Welfare Claim Approved', detail: 'CLM-841 (Medical Hospitalization ₹25,000) disbursed from Welfare Pool.', type: 'welfare' },
    { time: '22m ago', event: 'Proposal Quorum Met', detail: 'Mumbai District Proposal #01 reached 72% voting quorum.', type: 'governance' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>NATIONAL LABOUR COOPERATIVE FEDERATION ADMIN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Federation Administration Console
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            Administer 5 primary labour societies, verify worker KYC dossiers, resolve customer-worker disputes, and oversee the ₹2.31Cr collective welfare fund.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-white/80 block">Active Jurisdiction</span>
          <span className="text-base font-black text-[#D4A843]">Delhi & National Federation</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Active Workforce</span>
            <Users className="w-4 h-4 text-[#2D6A4F]" />
          </div>
          <div className="text-2xl font-black text-[#2B2B2B]">14,680</div>
          <span className="text-[11px] text-[#2D6A4F] font-bold mt-1 block">Across 5 Primary Societies</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Monthly Gross GMV</span>
            <DollarSign className="w-4 h-4 text-[#C45C3C]" />
          </div>
          <div className="text-2xl font-black text-[#2B2B2B]">{formatCurrency(totalGMV)}</div>
          <span className="text-[11px] text-[#C45C3C] font-bold mt-1 block">90% Retained by Craftsmen</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Welfare Pool Health</span>
            <HeartHandshake className="w-4 h-4 text-[#D4A843]" />
          </div>
          <div className="text-2xl font-black text-[#2B2B2B]">{formatCurrency(store.welfareFund.totalPool)}</div>
          <span className="text-[11px] text-[#9C7016] font-bold mt-1 block">412 Claims Settled</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
          <div className="flex items-center justify-between text-[#8C827A] mb-1">
            <span className="text-xs font-bold uppercase">Pending KYC Queue</span>
            <FileCheck className="w-4 h-4 text-[#2D6A4F]" />
          </div>
          <div className="text-2xl font-black text-[#C45C3C]">{pendingKYCCount} Dossiers</div>
          <span className="text-[11px] text-[#8C827A] font-bold mt-1 block">Requires Physical/Doc Signoff</span>
        </div>
      </div>

      {/* Real-Time Federation Activity Stream */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#2D6A4F] animate-pulse" />
            <h3 className="font-bold text-sm text-[#2B2B2B]">Live Federation Dispatch & Governance Activity</h3>
          </div>
          <span className="text-[10px] text-[#2D6A4F] font-mono bg-[#D1FAE5] px-2 py-0.5 rounded-full font-bold">
            ● STREAM ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {liveActivity.map((act, i) => (
            <div key={i} className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs space-y-1 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] mt-1.5 shrink-0" />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <strong className="text-[#2B2B2B] font-bold">{act.event}</strong>
                  <span className="text-[10px] text-[#8C827A]">{act.time}</span>
                </div>
                <p className="text-[#665D56] text-[11px] mt-0.5">{act.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/workers"
          className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">Worker KYC Verification Queue</h3>
          <p className="text-xs text-[#665D56]">Inspect applicant Aadhaar, NSDC badges, and grant 0.12% legal cooperative equity.</p>
        </Link>

        <Link
          to="/admin/disputes"
          className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#FEE2E2] text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">Dispute Resolution Center</h3>
          <p className="text-xs text-[#665D56]">Manage active customer-worker arbitration tickets and release protected escrow funds.</p>
        </Link>

        <Link
          to="/admin/forecasting"
          className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#9C7016] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">AI Demand & Workforce Allocation</h3>
          <p className="text-xs text-[#665D56]">Analyze district supply-demand deficits and deploy 1-click workforce rebalancing.</p>
        </Link>
      </div>
    </div>
  );
}

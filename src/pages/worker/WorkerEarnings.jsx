import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  CreditCard,
  X
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function WorkerEarnings() {
  const store = getStore();
  const worker = store.workers[0];
  const [withdrawn, setWithdrawn] = useState(false);
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [upiId, setUpiId] = useState('rajesh.kumar@okhdfcbank');
  const [accountNumber, setAccountNumber] = useState('50100492819382');
  const [ifsc, setIfsc] = useState('HDFC0000128');

  const handleWithdraw = () => {
    setWithdrawn(true);
    setTimeout(() => {
      alert(`Instant UPI payout of ${formatCurrency(worker.monthlyEarnings)} transferred to linked account (${upiId})!`);
      setWithdrawn(false);
    }, 1000);
  };

  const handleSaveBank = (e) => {
    e.preventDefault();
    alert('Bank account & UPI VPA verified and saved with cooperative payroll treasury.');
    setBankModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            <span>COOPERATIVE EQUITY & REVENUE LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Ownership Stake & Earnings
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Track your direct 90% job payouts, 0.12% cooperative dividend share, and instant bank settlements.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setBankModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/25 cursor-pointer"
          >
            Bank & UPI Settings
          </button>

          <button
            onClick={handleWithdraw}
            disabled={withdrawn}
            className="px-6 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>{withdrawn ? 'Transferring...' : 'Withdraw to Bank Account'}</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Available Earnings Balance</span>
          <div className="text-2xl sm:text-3xl font-black text-[#2B2B2B]">{formatCurrency(worker.monthlyEarnings)}</div>
          <span className="text-xs text-[#2D6A4F] font-bold block">Ready for 1-Click UPI Payout to {upiId}</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Cooperative Equity Stake</span>
          <div className="text-2xl sm:text-3xl font-black text-[#2D6A4F]">{worker.ownershipStake}%</div>
          <span className="text-xs text-[#665D56] font-semibold block">Legal Share in Delhi Federation</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-2">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Annual Dividend Accrual</span>
          <div className="text-2xl sm:text-3xl font-black text-[#D4A843]">{formatCurrency(4850)}</div>
          <span className="text-xs text-[#9C7016] font-bold block">Distributed at Annual General Meeting</span>
        </div>
      </div>

      {/* Payout Breakdown Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#2B2B2B] border-b border-[#F0EAE1] pb-3">
          Transparent Earnings Structure (vs Extractive Platforms)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#D1FAE5]/40 border border-[#2D6A4F]/20 space-y-1">
            <strong className="text-[#1B4332] block">90% Direct Job Payout</strong>
            <p className="text-[#665D56]">Directly credited to your account upon customer job completion with zero hidden platform cuts.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FEF3C7]/50 border border-[#D4A843]/30 space-y-1">
            <strong className="text-[#9C7016] block">1% Emergency Welfare Fund</strong>
            <p className="text-[#665D56]">Builds the universal emergency safety net that covers you for accident aid and hospitalization.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
            <strong className="text-[#2B2B2B] block">9% Primary Society Fund</strong>
            <p className="text-[#665D56]">Funds local tool depots, training hubs, and legal dispute mediation for your guild.</p>
          </div>
        </div>
      </div>

      {/* Bank & UPI Settings Modal */}
      {bankModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleSaveBank} className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#2D6A4F]" />
                <h3 className="font-bold text-base text-[#2B2B2B]">Linked Payout Accounts</h3>
              </div>
              <button onClick={() => setBankModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Primary UPI ID (VPA)</label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl font-mono text-xs text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Bank Account Number</label>
                <input
                  type="text"
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl font-mono text-xs text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Bank IFSC Code</label>
                <input
                  type="text"
                  required
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl font-mono text-xs text-[#2B2B2B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBankModalOpen(false)}
                className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#2D6A4F] text-white rounded-xl text-xs font-bold"
              >
                Save Payout Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

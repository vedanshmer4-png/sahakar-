import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from 'recharts';
import {
  HeartHandshake,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  PlusCircle,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Filter,
  DollarSign
} from 'lucide-react';
import { welfareFund, formatCurrency } from '../data/mockData';

export default function WelfareFund() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState(welfareFund.recentTransactions);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [newClaim, setNewClaim] = useState({
    worker: 'Rajesh Kumar (You)',
    category: 'Medical',
    amount: '',
    description: '',
  });
  const [claimSubmitted, setClaimSubmitted] = useState(false);

  const filteredTransactions = transactions.filter(tx => {
    if (selectedCategory === 'All') return true;
    return tx.category === selectedCategory;
  });

  const handleCreateClaim = (e) => {
    e.preventDefault();
    if (!newClaim.amount || !newClaim.description) return;

    const createdTx = {
      id: `t-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      worker: newClaim.worker,
      category: newClaim.category,
      amount: parseInt(newClaim.amount, 10),
      status: 'Under Review',
      description: newClaim.description,
    };

    setTransactions([createdTx, ...transactions]);
    setClaimSubmitted(true);
    setTimeout(() => {
      setClaimSubmitted(false);
      setShowClaimModal(false);
      setNewClaim({
        worker: 'Rajesh Kumar (You)',
        category: 'Medical',
        amount: '',
        description: '',
      });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F]/20 border border-[#2D6A4F]/40 text-[#1B4332] text-xs font-bold uppercase tracking-wider mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#2D6A4F]" />
            Pillar 02 • Auditable Solidarity
          </div>
          <h1 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('welfare.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#736B63] mt-1">
            {t('welfare.subtitle')}
          </p>
        </div>

        <button
          onClick={() => setShowClaimModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C45C3C] text-white font-bold text-xs hover:bg-[#A34A2E] shadow-md transition-all active:scale-95 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('welfare.submitClaim')}</span>
        </button>
      </div>

      {/* Top Running Totals Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-6 border-2 border-[#2D6A4F] shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#736B63] block">
            {t('welfare.totalPool')}
          </span>
          <p className="text-3xl font-black text-[#2D6A4F] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {formatCurrency(welfareFund.totalPool)}
          </p>
          <p className="text-xs text-[#2D6A4F] font-semibold mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Held in worker cooperative trust
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#736B63] block">
            {t('welfare.inflowThisMonth')}
          </span>
          <p className="text-3xl font-black text-[#C45C3C] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {formatCurrency(welfareFund.inflowThisMonth)}
          </p>
          <p className="text-xs text-[#736B63] mt-1">
            From 1% micro-contributions on 4,892 jobs
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-[#736B63] block">
            Disbursed to Date
          </span>
          <p className="text-3xl font-black text-[#2B2B2B] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
            {formatCurrency(welfareFund.totalPayouts)}
          </p>
          <p className="text-xs text-[#2D6A4F] font-semibold mt-1">
            Across {welfareFund.totalClaims} verified emergency claims
          </p>
        </div>
      </div>

      {/* Analytics: Inflow Trend & Categorized Payouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Inflow Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[#2B2B2B]">
                {t('welfare.monthlyInflow')}
              </h3>
              <span className="text-xs font-bold text-[#2D6A4F] bg-[#D1FAE5] px-2.5 py-0.5 rounded-full">
                +18% QoQ Growth
              </span>
            </div>
            <p className="text-xs text-[#736B63] mb-4">
              Autonomous 1% fee automatically pooled from every successful client payout.
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={welfareFund.monthlyInflow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0E8DD" vertical={false} />
                  <XAxis dataKey="month" stroke="#8C827A" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8C827A" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 100000}L`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFDF9',
                      borderRadius: '12px',
                      border: '1px solid #E8DFD8',
                      fontSize: '12px',
                    }}
                    formatter={(val) => [`₹${val.toLocaleString('en-IN')}`, 'Inflow']}
                  />
                  <Bar dataKey="amount" fill="#2D6A4F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-[11px] text-[#736B63] pt-3 border-t border-[#F0EAE1]">
            Independent auditing by <strong>All-India Federation of Workers</strong>
          </div>
        </div>

        {/* Categorized Payouts (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#2B2B2B] mb-1">
              {t('welfare.byCategory')}
            </h3>
            <p className="text-xs text-[#736B63] mb-4">
              Breakdown of emergency relief disbursed to worker families.
            </p>

            <div className="space-y-3.5">
              {welfareFund.categories.map((cat) => {
                const pct = Math.round((cat.amount / welfareFund.totalPayouts) * 100);
                return (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#2B2B2B] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                        {cat.name}
                      </span>
                      <span className="text-[#736B63] font-mono">
                        {formatCurrency(cat.amount)} ({cat.claims} claims)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#FAF5EE] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-[#FFF8F0] rounded-xl border border-[#C45C3C]/20 text-[11px] text-[#C45C3C] font-semibold">
            Emergency claims approved within 4 hours by the District Mutual Aid Council.
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PUBLIC AUDITABLE TRANSACTION LEDGER                          */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              Public Transparency Ledger
            </h2>
            <p className="text-xs text-[#736B63]">
              Every payout is published on this open ledger for full member accountability.
            </p>
          </div>

          {/* Filter by Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#736B63]">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF5EE] border border-[#E8DFD8] text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
            >
              <option value="All">All Categories</option>
              {welfareFund.categories.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto border border-[#E8DFD8] rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF5EE] text-[#736B63] uppercase tracking-wider font-semibold border-b border-[#E8DFD8]">
              <tr>
                <th className="px-4 py-3">Tx ID & Date</th>
                <th className="px-4 py-3">Recipient Worker</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Purpose / Medical Reason</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD8]">
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#FFFDF9] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-mono font-bold text-[#2B2B2B]">{tx.id.toUpperCase()}</div>
                    <div className="text-[10px] text-[#8C827A]">{tx.date}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#2B2B2B]">
                    {tx.worker}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FAF5EE] text-[#4A4A4A] border border-[#E8DFD8]">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#665D56] max-w-xs truncate">
                    {tx.description}
                  </td>
                  <td className="px-4 py-3 text-right font-black text-sm text-[#2B2B2B]">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        tx.status === 'Approved'
                          ? 'bg-[#D1FAE5] text-[#2D6A4F]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {tx.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#E8DFD8] shadow-2xl space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD8]">
              <h3 className="text-lg font-bold text-[#2B2B2B]">
                Submit Emergency Relief Claim
              </h3>
              <button
                onClick={() => setShowClaimModal(false)}
                className="text-[#8C827A] hover:text-[#2B2B2B] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {claimSubmitted ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#2D6A4F] mx-auto" />
                <h4 className="text-base font-bold text-[#2B2B2B]">Claim Submitted to District Council</h4>
                <p className="text-xs text-[#736B63]">
                  Your claim is now visible on the ledger as "Under Review" and will be reviewed by the mutual aid committee today.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateClaim} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Claimant Worker-Member:</label>
                  <input
                    type="text"
                    disabled
                    value={newClaim.worker}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Assistance Category:</label>
                  <select
                    value={newClaim.category}
                    onChange={(e) => setNewClaim({ ...newClaim, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD8] font-semibold text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
                  >
                    <option value="Medical">Medical Hospitalization</option>
                    <option value="Accidents">Workplace Accident</option>
                    <option value="Temporary Unemployment">Seasonal/Monsoon Work Gap</option>
                    <option value="Family Emergency">Family Critical Care</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Amount Requested (₹):</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 15000"
                    value={newClaim.amount}
                    onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD8] text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#4A4A4A] block mb-1">Claim Description & Medical Bill Note:</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Provide incident context and hospital/receipt summary..."
                    value={newClaim.description}
                    onChange={(e) => setNewClaim({ ...newClaim, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD8] text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
                  />
                </div>

                <div className="pt-3 border-t border-[#E8DFD8] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowClaimModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#E8DFD8] font-bold text-[#736B63] hover:bg-[#FAF5EE]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2D6A4F] text-white font-bold hover:bg-[#1B4332]"
                  >
                    Submit Claim Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

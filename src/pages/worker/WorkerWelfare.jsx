import React, { useState } from 'react';
import {
  HeartHandshake,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Upload,
  X
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function WorkerWelfare() {
  const [store, setStore] = useState(getStore());
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimType, setClaimType] = useState('Medical Hospitalization');
  const [claimAmount, setClaimAmount] = useState(20000);
  const [claimReason, setClaimReason] = useState('');
  const [docUploaded, setDocUploaded] = useState(false);

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    const newClaim = {
      id: 'CLM-' + Math.floor(100 + Math.random() * 900),
      workerId: 'w1',
      workerName: 'Rajesh Kumar',
      trade: 'Electrician',
      type: claimType,
      description: claimReason || 'Emergency medical assistance claim',
      amount: Number(claimAmount),
      status: 'Under Review',
      submittedDate: new Date().toISOString().split('T')[0],
      reviewedBy: 'Pending Board Quorum'
    };

    const updated = saveStore((prev) => ({
      ...prev,
      welfareFund: {
        ...prev.welfareFund,
        claims: [newClaim, ...(prev.welfareFund.claims || [])]
      }
    }));

    setStore(updated);
    setShowClaimModal(false);
    setClaimReason('');
    setDocUploaded(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>UNIVERSAL COOPERATIVE SOCIAL SECURITY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Welfare Fund & Support Claims
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Funded automatically by 1% of every completed booking across the federation.
          </p>
        </div>

        <button
          onClick={() => setShowClaimModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply for Emergency Support</span>
        </button>
      </div>

      {/* Welfare Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Total Running Welfare Pool</span>
          <div className="text-2xl sm:text-3xl font-black text-[#2B2B2B]">
            {formatCurrency(store.welfareFund.totalPool)}
          </div>
          <span className="text-xs text-[#2D6A4F] font-bold block">+₹4.85 Lakhs added this month</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Claims Disbursed</span>
          <div className="text-2xl sm:text-3xl font-black text-[#C45C3C]">
            {store.welfareFund.claimsProcessed} Claims
          </div>
          <span className="text-xs text-[#665D56] font-semibold block">0% interest emergency aid</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Accident Insurance Cover</span>
          <div className="text-2xl sm:text-3xl font-black text-[#2D6A4F]">₹2,00,000</div>
          <span className="text-xs text-[#2D6A4F] font-bold block">PMSBY 100% Subsidized</span>
        </div>
      </div>

      {/* My Claims List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#2B2B2B] border-b border-[#F0EAE1] pb-3">
          My Welfare Claims History
        </h3>

        <div className="space-y-3">
          {store.welfareFund.claims.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#2B2B2B]">{c.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white text-[10px] font-bold border border-[#E8DFD8] text-[#C45C3C]">
                    {c.type}
                  </span>
                </div>
                <p className="text-[#2B2B2B] font-semibold">{c.description}</p>
                <span className="text-[10px] text-[#8C827A] block">Reviewed By: {c.reviewedBy}</span>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <strong className="text-sm font-black text-[#2B2B2B] block">{formatCurrency(c.amount)}</strong>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block mt-1 ${
                  c.status === 'Approved' ? 'bg-[#D1FAE5] text-[#2D6A4F]' : 'bg-[#FEF3C7] text-[#9C7016]'
                }`}>
                  ● {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleClaimSubmit} className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-2">
              <h3 className="font-bold text-base text-[#2B2B2B]">Apply for Emergency Welfare Support</h3>
              <button onClick={() => setShowClaimModal(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Claim Category</label>
                <select
                  value={claimType}
                  onChange={(e) => setClaimType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B]"
                >
                  <option value="Medical Hospitalization">Medical Hospitalization</option>
                  <option value="Accidental Injury Aid">Accidental Injury Aid</option>
                  <option value="Tool Loss / Theft Relief">Tool Loss / Theft Relief</option>
                  <option value="Temporary Distress Grant">Temporary Distress Grant</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Requested Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="1000"
                  max="100000"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Reason & Hospital/Incident Details</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe the medical condition, hospital name, or incident..."
                  value={claimReason}
                  onChange={(e) => setClaimReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] text-xs text-[#2B2B2B]"
                />
              </div>

              {/* Hospital Summary Document Upload */}
              <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8] space-y-1.5">
                <label className="font-bold text-[#2B2B2B] block">Attach Hospital Bill / Discharge Summary</label>
                <button
                  type="button"
                  onClick={() => setDocUploaded(!docUploaded)}
                  className="w-full py-2 bg-white border border-[#E8DFD8] rounded-xl font-bold text-[#4A4A4A] flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 text-[#2D6A4F]" />
                  <span>{docUploaded ? '✓ Attached (hospital_discharge_bill.pdf)' : 'Upload Medical Bills / FIR Report'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClaimModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-[#4A4A4A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-black hover:bg-[#1B4332]"
              >
                Submit Claim to Board
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

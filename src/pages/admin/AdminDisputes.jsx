import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  UserCheck,
  Building2,
  SlidersHorizontal
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function AdminDisputes() {
  const [store, setStore] = useState(getStore());
  const [splitPercent, setSplitPercent] = useState(50); // 50% worker, 50% customer

  const handleResolveDispute = (disputeId, actionType) => {
    let resolutionLabel = '';
    if (actionType === 'RELEASE_WORKER') resolutionLabel = 'Resolved (100% Escrow Released to Worker)';
    else if (actionType === 'REFUND_CUSTOMER') resolutionLabel = 'Resolved (100% Escrow Refunded to Customer)';
    else if (actionType === 'CUSTOM_SPLIT') resolutionLabel = `Resolved (${splitPercent}% Worker / ${100 - splitPercent}% Customer Split)`;

    const updated = saveStore((prev) => ({
      ...prev,
      disputes: prev.disputes.map(d =>
        d.id === disputeId ? { ...d, status: resolutionLabel } : d
      )
    }));
    setStore(updated);
    alert(`Dispute ${disputeId} closed: ${resolutionLabel}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>DISTRICT PEER ARBITRATION DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Dispute Resolution & Grievance Hearings
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Impartial peer-mediated settlement of customer-worker disagreements with flexible escrow settlements.
          </p>
        </div>
      </div>

      {/* Disputes List */}
      <div className="space-y-6">
        {store.disputes.map((d) => (
          <div key={d.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#2B2B2B]">{d.id}</span>
                <span className="text-xs text-[#C45C3C] font-bold">Booking Ref: {d.bookingId}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  d.status.includes('Resolved') ? 'bg-[#D1FAE5] text-[#2D6A4F]' : 'bg-[#FEF3C7] text-[#9C7016]'
                }`}>
                  ● {d.status}
                </span>
              </div>
              <span className="text-xs text-[#8C827A]">Mediator: {d.assignedMediator}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <p><strong>Customer:</strong> {d.customerName}</p>
                <p><strong>Craftsman:</strong> {d.workerName}</p>
              </div>
              <p className="text-[#665D56] bg-[#FAF5EE] p-3 rounded-xl border border-[#E8DFD8]">
                <strong>Incident Report:</strong> {d.issue}
              </p>
            </div>

            {d.status === 'In Mediation' && (
              <div className="pt-3 border-t border-[#F0EAE1] space-y-4">
                <div className="flex justify-between text-xs font-bold text-[#2B2B2B]">
                  <span>Frozen Escrow Amount: <strong className="text-[#2D6A4F]">{formatCurrency(d.escrowFrozen)}</strong></span>
                </div>

                {/* Partial Split Settlement Slider */}
                <div className="p-3.5 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#2D6A4F]">Worker Share: {splitPercent}% ({formatCurrency(d.escrowFrozen * (splitPercent / 100))})</span>
                    <span className="text-red-700">Customer Refund: {100 - splitPercent}% ({formatCurrency(d.escrowFrozen * ((100 - splitPercent) / 100))})</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={splitPercent}
                    onChange={(e) => setSplitPercent(Number(e.target.value))}
                    className="w-full accent-[#2D6A4F] cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    onClick={() => handleResolveDispute(d.id, 'CUSTOM_SPLIT')}
                    className="px-4 py-2 rounded-xl bg-[#D4A843] text-[#1B4332] font-black text-xs hover:bg-[#C29633] cursor-pointer"
                  >
                    Execute {splitPercent}/{100 - splitPercent} Split
                  </button>
                  <button
                    onClick={() => handleResolveDispute(d.id, 'RELEASE_WORKER')}
                    className="px-4 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] cursor-pointer"
                  >
                    100% to Worker
                  </button>
                  <button
                    onClick={() => handleResolveDispute(d.id, 'REFUND_CUSTOMER')}
                    className="px-4 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 cursor-pointer"
                  >
                    100% Refund to Customer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

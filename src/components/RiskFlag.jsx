import React from 'react';
import { AlertCircle, Info } from 'lucide-react';

export default function RiskFlag({ flags = [], paymentHistory = 'good' }) {
  if (!flags || flags.length === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#D1FAE5] text-[#2D6A4F] border border-[#2D6A4F]/20">
        <Info className="w-3 h-3" />
        Verified Member Customer
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#FFF3E6] text-[#B85D1B] border border-[#F5C79E]">
      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#C45C3C]" />
      <span>
        <strong className="font-bold">Heads up:</strong> {flags[0]}
      </span>
    </div>
  );
}

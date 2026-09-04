import React from 'react';
import { Star, Shield, Award } from 'lucide-react';

export default function WorkerMiniCard({ worker, role, isHighlighted = false }) {
  if (!worker) return null;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
        isHighlighted
          ? 'bg-[#FFF8F0] border-[#C45C3C] shadow-sm ring-1 ring-[#C45C3C]/30'
          : 'bg-white border-[#E8DFD8] hover:border-[#C45C3C]/40'
      }`}
    >
      <div className="w-11 h-11 rounded-full bg-[#EADECF] flex items-center justify-center text-xl shrink-0 border border-[#C45C3C]/20">
        {worker.avatar || '👷'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <p className="text-sm font-bold text-[#2B2B2B] truncate">{worker.name}</p>
          <div className="flex items-center text-xs font-semibold text-[#D4A843] shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="ml-0.5">{worker.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#736B63] mt-0.5">
          <span className="font-medium text-[#C45C3C]">{role || worker.trade}</span>
          <span>•</span>
          <span className="flex items-center gap-0.5 text-[#2D6A4F] font-semibold">
            <Award className="w-3 h-3" />
            {worker.level}
          </span>
        </div>
      </div>
    </div>
  );
}

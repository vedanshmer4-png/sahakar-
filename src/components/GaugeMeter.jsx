import React from 'react';
import { ShieldCheck, TrendingUp } from 'lucide-react';

export default function GaugeMeter({ value = 78, max = 100, label = "Income Stability Score" }) {
  // Semi-circle gauge calculation
  const percentage = Math.min(Math.max(value / max, 0), 1);
  const strokeWidth = 14;
  const radius = 70;
  const circumference = Math.PI * radius; // half circle perimeter
  const strokeDashoffset = circumference - (percentage * circumference);

  // Status text and color
  let statusText = 'Stable & Growing';
  let statusColor = '#2D6A4F';
  if (value < 50) {
    statusText = 'Needs Skill Diversification';
    statusColor = '#D64545';
  } else if (value < 75) {
    statusText = 'Moderate Resilience';
    statusColor = '#D4A843';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#FFFDF9] to-[#F7F2EB] rounded-2xl border border-[#E8DFD8] shadow-sm relative">
      <div className="text-xs font-semibold uppercase tracking-wider text-[#736B63] mb-1 flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
        {label}
      </div>

      <div className="relative flex items-center justify-center w-[180px] h-[100px] overflow-hidden mt-1">
        <svg className="w-[180px] h-[180px] transform -rotate-180" viewBox="0 0 180 180">
          {/* Background arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="#EADECF"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          {/* Colored progress arc */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="transparent"
            stroke="url(#gauge-gradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A843" />
              <stop offset="50%" stopColor="#C45C3C" />
              <stop offset="100%" stopColor="#2D6A4F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center reading */}
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              {value}
            </span>
            <span className="text-sm font-semibold text-[#8C827A]">/100</span>
          </div>
        </div>
      </div>

      <div className="mt-2 text-center">
        <span
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
          style={{ backgroundColor: `${statusColor}18`, color: statusColor }}
        >
          <TrendingUp className="w-3 h-3" />
          {statusText}
        </span>
        <p className="text-[11px] text-[#736B63] mt-1 max-w-[200px] leading-tight">
          Based on repeat district clients, multi-skill flexibility & safety reserves
        </p>
      </div>
    </div>
  );
}

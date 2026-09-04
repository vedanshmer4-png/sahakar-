import React from 'react';

export default function ProgressBar({ current, max, color = '#C45C3C', showLabel = true, label = '' }) {
  const percentage = Math.min(Math.round((current / max) * 100), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-[#4A4A4A] mb-1.5">
          <span>{label || `${current} of ${max}`}</span>
          <span className="font-bold" style={{ color }}>{percentage}%</span>
        </div>
      )}
      <div className="h-2.5 w-full bg-[#EFE9E2] rounded-full overflow-hidden p-0.5">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

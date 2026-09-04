import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = '#C45C3C' }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E8DFD8] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#736B63] uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold mt-1 text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-[#2D6A4F] font-medium mt-1">{subtitle}</p>}
        </div>
        {Icon && (
          <div
            className="p-2.5 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-80"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

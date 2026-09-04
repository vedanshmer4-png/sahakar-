import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  FileText
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function AdminCertifications() {
  const store = getStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>GUILD CERTIFICATION REPOSITORY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Skill Certifications & Badge Management
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Supervise National Skill Development Corporation (NSDC) accreditation, Red Cross certifications, and trade badges.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {store.workers.map((w) => (
          <div key={w.id} className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{w.avatar}</span>
                <div>
                  <h3 className="font-bold text-sm text-[#2B2B2B]">{w.name}</h3>
                  <span className="text-xs text-[#C45C3C] font-semibold">{w.trade} • {w.skillLevel}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#2D6A4F] bg-[#D1FAE5] px-2.5 py-1 rounded-full">
                {w.certifications.length} Credentials
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {w.certifications.map((c, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-0.5">
                  <div className="font-bold text-[#2B2B2B]">{c.title}</div>
                  <div className="text-[#8C827A]">{c.issuer} ({c.date}) • Ref: {c.certId}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

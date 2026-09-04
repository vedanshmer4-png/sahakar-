import React, { useState } from 'react';
import {
  Award,
  Layers,
  CheckCircle2,
  TrendingUp,
  Upload,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Calendar,
  X
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function WorkerSkills() {
  const store = getStore();
  const worker = store.workers[0];

  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(null);

  const skillLadder = [
    { level: 'Level 1: Basic Apprentice', req: 'Basic Wiring & Fixtures', avgIncome: 18000, current: false },
    { level: 'Level 2: Certified Electrician', req: 'Concealed & DB Wiring', avgIncome: 26000, current: false },
    { level: 'Level 3: Expert / Guild Master', req: 'Solar & 3-Phase Commercial', avgIncome: 35000, current: true },
    { level: 'Level 4: Master Craftsman', req: 'Smart Automation & Audit', avgIncome: 48000, current: false },
  ];

  const upcomingCohorts = [
    { title: 'Solar PV & Rooftop Inverter Grid Certification', dates: 'Sep 15 - Sep 30, 2026', mode: 'Hybrid (Delhi Hub)', stipend: 'Subsidized by Cooperative Fund' },
    { title: 'Smart Home Automation & Industrial IoT Wiring', dates: 'Oct 05 - Oct 20, 2026', mode: 'Weekend Practical Lab', stipend: '100% Free for Member Owners' },
    { title: 'Red Cross First-Aid & High-Voltage Safety Protocol', dates: 'Oct 12 - Oct 14, 2026', mode: 'In-Person Workshop', stipend: 'Safety Kit Included' }
  ];

  const handleConfirmEnroll = (cohort) => {
    alert(`Successfully enrolled in ${cohort.title}! Enrollment confirmation and schedule SMS sent.`);
    setEnrollModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>SKILL LADDER & CERTIFICATIONS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            My Skill Ladder & Verified Badges
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Progress from Apprentice to Master Craftsman to unlock higher wage bands and larger commercial contracts.
          </p>
        </div>

        <button
          onClick={() => setEnrollModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>Upcoming Training Cohorts</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skill Progression Ladder */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
          <h3 className="font-bold text-base text-[#2B2B2B] border-b border-[#F0EAE1] pb-3">
            Guild Progression Ladder (Electrician Guild)
          </h3>

          <div className="space-y-4">
            {skillLadder.map((s, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  s.current
                    ? 'bg-[#D1FAE5]/60 border-[#2D6A4F] shadow-xs'
                    : 'bg-[#FAF5EE] border-[#E8DFD8]'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#2B2B2B]">{s.level}</h4>
                    {s.current && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2D6A4F] text-white text-[10px] font-black">
                        CURRENT LEVEL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#665D56]">Requirements: {s.req}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Avg Monthly Income</span>
                  <strong className="text-sm font-black text-[#2D6A4F]">{formatCurrency(s.avgIncome)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Verified Certifications */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-3">
            Verified Certifications
          </h3>

          <div className="space-y-3">
            {worker.certifications.map((c, i) => (
              <div key={i} className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-[#2B2B2B]">
                  <span>{c.title}</span>
                  <span className="text-[10px] text-[#2D6A4F] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                    ✓ Verified
                  </span>
                </div>
                <div className="text-[#8C827A]">{c.issuer} • {c.date}</div>
                <div className="text-[10px] text-[#736B63] font-mono">Ref: {c.certId}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert('Certificate upload module: Attach your new NSDC or Red Cross certification PDF.')}
            className="w-full py-2.5 rounded-xl border border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#D1FAE5]/40 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Skill Certificate</span>
          </button>
        </div>
      </div>

      {/* Cohort Enrollment Modal */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 shadow-2xl border border-[#E8DFD8]">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2D6A4F]" />
                <h3 className="font-bold text-base text-[#2B2B2B]">Upcoming Guild Skill Cohorts</h3>
              </div>
              <button onClick={() => setEnrollModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {upcomingCohorts.map((c, i) => (
                <div key={i} className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-2 flex flex-col justify-between">
                  <div>
                    <strong className="block text-sm text-[#2B2B2B]">{c.title}</strong>
                    <div className="text-[#8C827A] mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C45C3C]" />
                      <span>{c.dates} • {c.mode}</span>
                    </div>
                    <span className="text-[10px] text-[#2D6A4F] font-bold block mt-1">✓ {c.stipend}</span>
                  </div>

                  <button
                    onClick={() => handleConfirmEnroll(c)}
                    className="w-full py-2 bg-[#2D6A4F] text-white font-bold rounded-xl text-xs hover:bg-[#1B4332] cursor-pointer mt-2"
                  >
                    Enroll in Cohort (1-Click)
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

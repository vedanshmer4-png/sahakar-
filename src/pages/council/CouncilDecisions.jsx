import React from 'react';
import {
  FileText,
  CheckCircle2,
  Calendar,
  Vote,
  ShieldCheck
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function CouncilDecisions() {
  const store = getStore();

  const decisions = [
    {
      id: 'RES-2026-08',
      date: '2026-08-30',
      title: 'Bulk-Procurement of 6 Industrial Scaffolding Sets for Mumbai Guild',
      proposer: 'Mumbai Painting Guild Council',
      votes: '2,450 YES / 85 NO (Passed with 96.6% majority)',
      enactment: '₹12 Lakhs disbursed from annual surplus; equipment stationed at Thane depot for ₹400/day member rental.'
    },
    {
      id: 'RES-2026-07',
      date: '2026-07-15',
      title: '48-Hour Mediation Window Prior to Customer Escrow Penalty',
      proposer: 'Arbitration Committee',
      votes: '1,920 YES / 110 NO (Passed)',
      enactment: 'Incorporated into platform smart escrow contract rules across all 5 federations.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>IMMUTABLE RESOLUTION RECORDS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Decisions & Meeting Minutes Log
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Historical ledger of enacted democratic bylaws and cooperative resource allocation resolutions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {decisions.map((d) => (
          <div key={d.id} className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#2B2B2B]">{d.id}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#2D6A4F] text-[10px] font-bold">
                  ✓ Enacted Resolution
                </span>
              </div>
              <span className="text-xs text-[#8C827A]">{d.date}</span>
            </div>

            <h3 className="font-bold text-base text-[#2B2B2B]">{d.title}</h3>
            <p className="text-xs text-[#665D56]">Sponsor: {d.proposer} • Tally: <strong className="text-[#2D6A4F]">{d.votes}</strong></p>

            <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs text-[#1B4332]">
              <strong>Enactment Record:</strong> {d.enactment}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

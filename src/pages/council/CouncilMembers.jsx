import React from 'react';
import {
  Users,
  ShieldCheck,
  Award,
  Vote,
  Building2
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function CouncilMembers() {
  const store = getStore();

  const delegates = [
    { name: 'Sunil R. Patil', trade: 'Painting Guild', district: 'Mumbai', role: 'Council President', term: '2024–2027', avatar: '🏛️' },
    { name: 'Harish Chandra Sharma', trade: 'Electrical Guild', district: 'Delhi', role: 'Federation Liaison', term: '2023–2026', avatar: '👨‍💼' },
    { name: 'M. Anjanappa', trade: 'Carpentry Guild', district: 'Bengaluru', role: 'Treasurer', term: '2024–2027', avatar: '🪚' },
    { name: 'Ram Vilas Yadav', trade: 'Plumbing Guild', district: 'Lucknow', role: 'Dispute Commissioner', term: '2025–2028', avatar: '👩‍🔧' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>ELECTED BOARD DELEGATES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            District Council Delegates Directory
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Democratic representatives directly elected by primary society craftsmen every 3 years.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {delegates.map((d, i) => (
          <div key={i} className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{d.avatar}</span>
                <div>
                  <h3 className="font-bold text-base text-[#2B2B2B]">{d.name}</h3>
                  <span className="text-xs text-[#C45C3C] font-black">{d.role} • {d.trade}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#2D6A4F] text-[10px] font-bold">
                {d.district} Council
              </span>
            </div>

            <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs flex justify-between">
              <span className="text-[#8C827A]">Elected Term: {d.term}</span>
              <span className="text-[#2D6A4F] font-bold">✓ Active Quorum Seat</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

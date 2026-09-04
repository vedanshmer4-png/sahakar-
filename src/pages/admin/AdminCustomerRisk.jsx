import React from 'react';
import {
  ShieldCheck,
  Star,
  AlertTriangle,
  Users,
  CheckCircle2
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function AdminCustomerRisk() {
  const store = getStore();

  const customerRiskData = [
    { name: 'Neha Agarwal', district: 'Delhi', trustScore: 4.9, completedBookings: 14, riskFlag: 'None (Safe)', notes: 'Consistently courteous; zero dispute history.' },
    { name: 'Vivek Malhotra', district: 'Delhi', trustScore: 4.2, completedBookings: 8, riskFlag: 'Moderate (Scope Creep)', notes: 'Requested out-of-scope alterations without revised quote; under mediation.' },
    { name: 'Ritu Kapoor', district: 'Mumbai', trustScore: 5.0, completedBookings: 22, riskFlag: 'None (Star Customer)', notes: 'Provides excellent working conditions and prompt payment.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Star className="w-3.5 h-3.5" />
            <span>COMMUNITY SAFETY & TRUST MODERATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Customer Risk & Trust Moderation
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Worker feedback creates transparency. Flagged customers are moderated to protect craftsman safety and payment dignity.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#2B2B2B]">Customer Reliability Register</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD8] text-[#736B63] uppercase text-[10px]">
                <th className="py-3 px-4">Customer Name & District</th>
                <th className="py-3 px-4">Trust Score</th>
                <th className="py-3 px-4">Completed Bookings</th>
                <th className="py-3 px-4">Risk Flag</th>
                <th className="py-3 px-4">Moderation Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {customerRiskData.map((c, i) => (
                <tr key={i} className="hover:bg-[#FAF5EE]/60 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#2B2B2B]">
                    {c.name}
                    <span className="text-[10px] text-[#8C827A] block font-normal">{c.district} Cooperative</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-[#D4A843]">{c.trustScore} ★</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#2B2B2B]">{c.completedBookings}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      c.riskFlag.includes('Safe') || c.riskFlag.includes('Star')
                        ? 'bg-[#D1FAE5] text-[#2D6A4F]'
                        : 'bg-[#FEF3C7] text-[#9C7016]'
                    }`}>
                      {c.riskFlag}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#665D56] max-w-xs">{c.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

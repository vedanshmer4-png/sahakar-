import React from 'react';
import { Link } from 'react-router-dom';
import {
  Vote,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  ArrowRight
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function CouncilDashboard() {
  const store = getStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Vote className="w-3.5 h-3.5" />
            <span>DISTRICT COOPERATIVE COUNCIL GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Council Delegate Executive Portal
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            Administer Mumbai & Delhi semi-independent district councils, review legislative proposals, and ratify bylaws.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-white/80 block">Delegate Status</span>
          <span className="text-sm font-black text-[#D4A843]">Elected Council Member</span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Active District Proposals</span>
          <div className="text-3xl font-black text-[#2B2B2B]">{store.proposals.length} Ballots</div>
          <span className="text-xs text-[#2D6A4F] font-bold block">Quorum Active: 72% Voter Turnout</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Council Delegates</span>
          <div className="text-3xl font-black text-[#C45C3C]">12 Board Members</div>
          <span className="text-xs text-[#665D56] font-semibold block">Elected from 10 Trade Guilds</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase text-[#8C827A] block">Enacted Resolutions</span>
          <div className="text-3xl font-black text-[#D4A843]">28 Policies</div>
          <span className="text-xs text-[#9C7016] font-bold block">Binding on District Guilds</span>
        </div>
      </div>

      {/* Action Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/council/proposals"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center font-bold">
              <Vote className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">Review Active Legislative Proposals</h3>
          <p className="text-xs text-[#665D56]">Cast your council delegate vote on wage floors, tool procurement, and dispute bylaw amendments.</p>
        </Link>

        <Link
          to="/council/decisions"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#9C7016] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-[#8C827A] group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-base text-[#2B2B2B]">Decisions & Meeting Minutes Log</h3>
          <p className="text-xs text-[#665D56]">Browse immutable historical records of passed council resolutions and district mandates.</p>
        </Link>
      </div>
    </div>
  );
}

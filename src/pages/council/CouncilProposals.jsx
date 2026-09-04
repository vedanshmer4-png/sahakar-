import React, { useState } from 'react';
import {
  Vote,
  PlusCircle,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  FileCheck,
  Check
} from 'lucide-react';
import { getStore, saveStore } from '../../data/mockStore';

export default function CouncilProposals() {
  const [store, setStore] = useState(getStore());
  const [showNewProposalModal, setShowNewProposalModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDistrict, setNewDistrict] = useState('mumbai');
  const [newPolicyEffect, setNewPolicyEffect] = useState('');

  const handleCastVote = (proposalId, voteType) => {
    const updated = saveStore((prev) => ({
      ...prev,
      proposals: prev.proposals.map(p =>
        p.id === proposalId
          ? {
              ...p,
              yesVotes: voteType === 'YES' ? p.yesVotes + 1 : p.yesVotes,
              noVotes: voteType === 'NO' ? p.noVotes + 1 : p.noVotes
            }
          : p
      )
    }));
    setStore(updated);
    alert(`Delegate vote recorded: ${voteType} on proposal ${proposalId}`);
  };

  const handleCreateProposal = (e) => {
    e.preventDefault();
    const newProp = {
      id: 'prop-' + Math.floor(10 + Math.random() * 90),
      district: newDistrict,
      title: newTitle,
      description: newDesc,
      proposer: 'Elected Council Delegate',
      status: 'Active',
      deadline: '2026-09-30',
      yesVotes: 1,
      noVotes: 0,
      quorumTarget: 1000,
      appliedPolicy: newPolicyEffect || 'Applies statutory guild guideline upon quorum passage.'
    };

    const updated = saveStore((prev) => ({
      ...prev,
      proposals: [newProp, ...(prev.proposals || [])]
    }));

    setStore(updated);
    setShowNewProposalModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewPolicyEffect('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Vote className="w-3.5 h-3.5" />
            <span>DISTRICT LEGISLATIVE COUNCIL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Active Proposals & Bylaw Amendments
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Council delegates review, sponsor, and vote on binding district-specific regulations through the 4-stage legislative cycle.
          </p>
        </div>

        <button
          onClick={() => setShowNewProposalModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Sponsor New Proposal</span>
        </button>
      </div>

      {/* 4-Stage Legislative Lifecycle Stepper Banner */}
      <div className="bg-white p-5 rounded-3xl border border-[#E8DFD8] shadow-xs">
        <span className="text-[10px] text-[#8C827A] font-bold uppercase tracking-wider block mb-2">Statutory Legislative Process</span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8]">
            <strong className="text-[#2B2B2B] block">1. Draft Sponsorship</strong>
            <span className="text-[10px] text-[#2D6A4F]">Primary Society Petition</span>
          </div>
          <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8]">
            <strong className="text-[#2B2B2B] block">2. Committee Hearing</strong>
            <span className="text-[10px] text-[#2D6A4F]">Public Guild Feedback</span>
          </div>
          <div className="p-3 bg-[#D1FAE5] rounded-xl border border-[#2D6A4F]/30">
            <strong className="text-[#1B4332] block">3. Open Delegate Ballot</strong>
            <span className="text-[10px] text-[#2D6A4F] font-bold">● Active 1-Member-1-Vote</span>
          </div>
          <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8]">
            <strong className="text-[#2B2B2B] block">4. Gazette Enactment</strong>
            <span className="text-[10px] text-[#736B63]">Binding Platform Policy</span>
          </div>
        </div>
      </div>

      {/* Proposals List */}
      <div className="space-y-6">
        {store.proposals.map((prop) => {
          const totalVotes = prop.yesVotes + prop.noVotes;
          const yesPercent = Math.round((prop.yesVotes / (totalVotes || 1)) * 100);

          return (
            <div key={prop.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#F0EAE1] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#2B2B2B]">{prop.id}</span>
                  <span className="text-xs font-bold text-[#C45C3C] uppercase">District: {prop.district}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    prop.status === 'Passed' ? 'bg-[#D1FAE5] text-[#2D6A4F]' : 'bg-[#FEF3C7] text-[#9C7016]'
                  }`}>
                    ● {prop.status}
                  </span>
                </div>
                <span className="text-xs text-[#8C827A]">Deadline: {prop.deadline}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#2B2B2B]">{prop.title}</h3>
                <p className="text-xs text-[#665D56] leading-relaxed">{prop.description}</p>
                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8] text-[11px] text-[#2D6A4F] font-bold">
                  ⚡ Statutory Effect: {prop.appliedPolicy}
                </div>
              </div>

              {/* Tally Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#2D6A4F]">YES: {prop.yesVotes} ({yesPercent}%)</span>
                  <span className="text-red-700">NO: {prop.noVotes} ({100 - yesPercent}%)</span>
                </div>
                <div className="w-full bg-red-200 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-[#2D6A4F] h-full" style={{ width: `${yesPercent}%` }} />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleCastVote(prop.id, 'YES')}
                  className="px-5 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] cursor-pointer"
                >
                  Cast Delegate YES
                </button>
                <button
                  onClick={() => handleCastVote(prop.id, 'NO')}
                  className="px-5 py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 cursor-pointer"
                >
                  Cast Delegate NO
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Proposal Modal */}
      {showNewProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleCreateProposal} className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-[#2B2B2B]">Sponsor New District Legislative Proposal</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Target District Jurisdiction</label>
                <select
                  value={newDistrict}
                  onChange={(e) => setNewDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B]"
                >
                  {store.districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mandate Safety Harness Audit for High-Rise Window Cleaners"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Full Legislative Text & Rationale</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Explain the background, benefits, and enforcement mechanism..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] text-xs text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Statutory Effect upon Passage</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. District rate floor updated to ₹420/hr upon passage."
                  value={newPolicyEffect}
                  onChange={(e) => setNewPolicyEffect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNewProposalModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-bold text-[#4A4A4A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-black hover:bg-[#1B4332]"
              >
                Publish Proposal to District
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

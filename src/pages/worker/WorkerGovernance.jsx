import React, { useState } from 'react';
import {
  Vote,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  MessageSquare,
  Send
} from 'lucide-react';
import { getStore, saveStore } from '../../data/mockStore';

export default function WorkerGovernance() {
  const [store, setStore] = useState(getStore());
  const [votedProposals, setVotedProposals] = useState({});
  const [comments, setComments] = useState({
    'prop-01': [
      { author: 'Vikram Singh (Plumber Guild)', text: 'I strongly support this wage floor adjustment. Inflation in diesel and tool bits warrants ₹420/hr minimum.', time: '2h ago' }
    ]
  });
  const [newCommentText, setNewCommentText] = useState({});

  const handleCastVote = (proposalId, voteType) => {
    const updated = saveStore((prev) => ({
      ...prev,
      proposals: prev.proposals.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            yesVotes: voteType === 'YES' ? p.yesVotes + 1 : p.yesVotes,
            noVotes: voteType === 'NO' ? p.noVotes + 1 : p.noVotes
          };
        }
        return p;
      })
    }));

    setStore(updated);
    setVotedProposals({ ...votedProposals, [proposalId]: voteType });
  };

  const handleAddComment = (proposalId, e) => {
    e.preventDefault();
    const text = newCommentText[proposalId];
    if (!text || !text.trim()) return;

    setComments({
      ...comments,
      [proposalId]: [...(comments[proposalId] || []), { author: 'Rajesh Kumar (Electrician)', text: text, time: 'Just now' }]
    });

    setNewCommentText({ ...newCommentText, [proposalId]: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Vote className="w-3.5 h-3.5" />
            <span>DEMOCRATIC DISTRICT GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            District Council Ballots & Voting
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Every verified craftsman holds 1 vote. Decide minimum wage floors, equipment investments, and cooperative bylaws.
          </p>
        </div>
      </div>

      {/* Active Proposals List */}
      <div className="space-y-6">
        {store.proposals.map((prop) => {
          const totalVotes = prop.yesVotes + prop.noVotes;
          const yesPercent = Math.round((prop.yesVotes / (totalVotes || 1)) * 100);
          const hasVoted = votedProposals[prop.id];
          const propComments = comments[prop.id] || [];

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

                <span className="text-xs text-[#8C827A]">Voting Deadline: {prop.deadline}</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-[#2B2B2B]">{prop.title}</h3>
                <p className="text-xs text-[#665D56] leading-relaxed">{prop.description}</p>
                <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8] text-[11px] text-[#2D6A4F] font-bold">
                  ⚡ Policy Effect: {prop.appliedPolicy}
                </div>
              </div>

              {/* Live Tally Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#2D6A4F]">YES: {prop.yesVotes} ({yesPercent}%)</span>
                  <span className="text-red-700">NO: {prop.noVotes} ({100 - yesPercent}%)</span>
                </div>
                <div className="w-full bg-red-200 h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-[#2D6A4F] h-full" style={{ width: `${yesPercent}%` }} />
                </div>
                <div className="text-[10px] text-[#8C827A] flex justify-between">
                  <span>Total Votes Cast: {totalVotes}</span>
                  <span>Quorum Target: {prop.quorumTarget}</span>
                </div>
              </div>

              {/* Voting Action Buttons */}
              <div className="pt-2 flex items-center justify-between border-b border-[#F0EAE1] pb-4">
                {hasVoted ? (
                  <span className="text-xs font-bold text-[#2D6A4F] flex items-center gap-1.5 bg-[#D1FAE5] px-3 py-1.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Your vote ({hasVoted}) has been securely recorded!</span>
                  </span>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCastVote(prop.id, 'YES')}
                      className="px-5 py-2.5 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-black shadow-xs transition-all cursor-pointer"
                    >
                      Vote YES (Approve)
                    </button>
                    <button
                      onClick={() => handleCastVote(prop.id, 'NO')}
                      className="px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black transition-all cursor-pointer"
                    >
                      Vote NO (Reject)
                    </button>
                  </div>
                )}
              </div>

              {/* Member Discussion & Debate Feed */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#C45C3C]" />
                  <span className="font-bold text-xs text-[#2B2B2B]">Guild Member Discussion & Debates ({propComments.length})</span>
                </div>

                <div className="space-y-2">
                  {propComments.map((com, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF5EE] rounded-xl text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <strong className="text-[#2B2B2B] font-bold">{com.author}</strong>
                        <span className="text-[10px] text-[#8C827A]">{com.time}</span>
                      </div>
                      <p className="text-[#665D56]">{com.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => handleAddComment(prop.id, e)} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Share your perspective on this district proposal..."
                    value={newCommentText[prop.id] || ''}
                    onChange={(e) => setNewCommentText({ ...newCommentText, [prop.id]: e.target.value })}
                    className="flex-1 px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none"
                  />
                  <button type="submit" className="p-2.5 bg-[#2D6A4F] text-white rounded-xl cursor-pointer">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Vote,
  Users,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Clock,
  Shield,
  FileText,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { DISTRICTS, governanceVotes } from '../data/mockData';

export default function GovernancePortal() {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState('delhi');
  const [votesState, setVotesState] = useState(governanceVotes);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submittedVotes, setSubmittedVotes] = useState({});

  const currentDistrictInfo = DISTRICTS.find(d => d.id === selectedDistrict) || DISTRICTS[0];
  const activeVotesList = votesState[selectedDistrict] || [];

  const handleSelectOption = (voteId, optionIdx) => {
    if (submittedVotes[voteId]) return;
    setSelectedOptions(prev => ({ ...prev, [voteId]: optionIdx }));
  };

  const handleSubmitVote = (voteId) => {
    const chosenIdx = selectedOptions[voteId];
    if (chosenIdx === undefined) return;

    setVotesState(prev => {
      const updatedList = (prev[selectedDistrict] || []).map(v => {
        if (v.id === voteId) {
          const updatedOptions = [...v.options];
          updatedOptions[chosenIdx] = {
            ...updatedOptions[chosenIdx],
            votes: updatedOptions[chosenIdx].votes + 1,
          };
          return {
            ...v,
            options: updatedOptions,
            totalVotes: v.totalVotes + 1,
          };
        }
        return v;
      });

      return {
        ...prev,
        [selectedDistrict]: updatedList,
      };
    });

    setSubmittedVotes(prev => ({ ...prev, [voteId]: chosenIdx }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 text-[#9C7016] text-xs font-bold uppercase tracking-wider mb-2">
            <Vote className="w-3.5 h-3.5" />
            Pillar 05 • Democratic Decentralization
          </div>
          <h1 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('governance.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#736B63] mt-1">
            No distant tech executives dictate your wages. Each district cooperative operates as an autonomous, self-governing union.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#E8DFD8] shadow-sm text-xs font-bold text-[#2D6A4F]">
          <Shield className="w-4 h-4" />
          <span>Principle: 1 Worker = 1 Vote</span>
        </div>
      </div>

      {/* District Switcher (Core requirement) */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E8DFD8] shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#736B63]">
            Select Autonomous District Cooperative:
          </span>
          <span className="text-xs text-[#2D6A4F] font-bold">
            {currentDistrictInfo.members.toLocaleString('en-IN')} Active Voting Members
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DISTRICTS.map((district) => (
            <button
              key={district.id}
              onClick={() => setSelectedDistrict(district.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDistrict === district.id
                  ? 'bg-[#C45C3C] text-white shadow-md scale-102'
                  : 'bg-[#FAF5EE] text-[#4A4A4A] hover:bg-[#F2ECE4] border border-[#E8DFD8]'
              }`}
            >
              {district.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Votes List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('governance.activeVotes')} — {currentDistrictInfo.name}
          </h2>
          <span className="text-xs font-bold text-[#C45C3C] bg-[#C45C3C]/10 px-2.5 py-1 rounded-full">
            {activeVotesList.length} Ballot Items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeVotesList.map((ballot) => {
            const hasSubmitted = submittedVotes[ballot.id] !== undefined;
            const chosenOption = selectedOptions[ballot.id];
            const quorumMet = ballot.totalVotes >= ballot.quorum;

            return (
              <div
                key={ballot.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF5EE] text-[#C45C3C] border border-[#E8DFD8]">
                      {ballot.category}
                    </span>
                    <span className="text-xs font-semibold text-[#736B63] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Ends: {ballot.endDate}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#2B2B2B]">
                    {ballot.title}
                  </h3>
                  <p className="text-xs text-[#665D56] mt-1 leading-relaxed">
                    {ballot.description}
                  </p>

                  {/* Interactive Voting UI Options */}
                  <div className="space-y-3 my-5">
                    {ballot.options.map((option, idx) => {
                      const voteShare = Math.round((option.votes / ballot.totalVotes) * 100) || 0;
                      const isSelected = chosenOption === idx;
                      const isUserVote = submittedVotes[ballot.id] === idx;

                      return (
                        <div
                          key={idx}
                          onClick={() => handleSelectOption(ballot.id, idx)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                            isUserVote
                              ? 'bg-[#F0FDF4] border-2 border-[#2D6A4F] shadow-sm'
                              : isSelected
                              ? 'bg-[#FFF8F0] border-2 border-[#C45C3C]'
                              : 'bg-[#FAF5EE] border-[#E8DFD8] hover:border-[#C45C3C]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#2B2B2B] mb-1.5">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected || isUserVote
                                    ? 'border-[#C45C3C] bg-[#C45C3C]'
                                    : 'border-[#8C827A] bg-white'
                                }`}
                              >
                                {(isSelected || isUserVote) && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <span>{option.label}</span>
                            </div>
                            <span className="text-[#736B63] font-bold">
                              {voteShare}% ({option.votes.toLocaleString('en-IN')})
                            </span>
                          </div>

                          {/* Live results bar */}
                          <div className="h-2 w-full bg-[#EADECF] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${voteShare}%`,
                                backgroundColor: isUserVote ? '#2D6A4F' : '#C45C3C',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action & Quorum Bar */}
                <div className="pt-4 border-t border-[#F0EAE1] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#736B63]">
                      Quorum: <strong>{ballot.totalVotes.toLocaleString('en-IN')}</strong> / {ballot.quorum.toLocaleString('en-IN')}
                    </span>
                    <span className={quorumMet ? 'text-[#2D6A4F] font-bold' : 'text-[#D4A843] font-bold'}>
                      {quorumMet ? '✓ Quorum Reached' : 'Collecting Votes'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSubmitVote(ballot.id)}
                    disabled={hasSubmitted || chosenOption === undefined}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                      hasSubmitted
                        ? 'bg-[#2D6A4F] text-white cursor-default'
                        : chosenOption === undefined
                        ? 'bg-[#E8DFD8] text-[#8C827A] cursor-not-allowed'
                        : 'bg-[#C45C3C] text-white hover:bg-[#A34A2E] active:scale-95'
                    }`}
                  >
                    {hasSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> {t('governance.voted')}
                      </>
                    ) : (
                      <>
                        <Vote className="w-4 h-4" /> {t('governance.vote')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

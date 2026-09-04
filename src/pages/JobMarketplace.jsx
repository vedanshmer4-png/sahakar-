import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Briefcase,
  Users,
  HeartHandshake,
  Calendar,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import WorkerMiniCard from '../components/WorkerMiniCard';
import RiskFlag from '../components/RiskFlag';
import { jobs, TRADES, formatCurrency, currentWorker } from '../data/mockData';

export default function JobMarketplace() {
  const { t } = useTranslation();
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [teamOnly, setTeamOnly] = useState(false);
  const [acceptedJobs, setAcceptedJobs] = useState({});

  const filteredJobs = jobs.filter((job) => {
    if (teamOnly && !job.isTeamJob) return false;
    if (selectedTrade !== 'All' && !job.tradesNeeded.includes(selectedTrade)) return false;
    return true;
  });

  const handleAcceptJob = (jobId) => {
    setAcceptedJobs(prev => ({
      ...prev,
      [jobId]: true
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 text-[#9C7016] text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            Pillar 07 • Cooperative Team Formation
          </div>
          <h1 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('jobs.title')} & Team Formation
          </h1>
          <p className="text-xs sm:text-sm text-[#736B63] mt-1">
            Complex renovation and multi-domain contracts automatically match complementary worker-owners into high-trust crews.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTeamOnly(!teamOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              teamOnly
                ? 'bg-[#C45C3C] text-white shadow-sm'
                : 'bg-white border border-[#E8DFD8] text-[#4A4A4A] hover:bg-[#FAF5EE]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Multi-Skill Teams Only</span>
          </button>

          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#E8DFD8] text-[#2B2B2B] focus:outline-none focus:ring-1 focus:ring-[#C45C3C]"
          >
            <option value="All">All Trades</option>
            {TRADES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured Auto-Assembled Team Job Highlight Banner */}
      <div className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F5ECE0] rounded-3xl p-6 sm:p-8 border-2 border-[#D4A843] shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#2D6A4F] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-[#2D6A4F]">
              Platform Intelligence: Auto-Assembled Crew
            </span>
          </div>
          <span className="text-xs font-bold text-[#C45C3C] bg-[#C45C3C]/10 px-3 py-1 rounded-full">
            No Customer Negotiation Fatigue
          </span>
        </div>

        <h2 className="text-2xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          Full 3BHK Living Room Renovation — Delhi
        </h2>
        <p className="text-xs text-[#736B63] mt-1 max-w-2xl">
          Instead of forcing customers to search, negotiate, and coordinate 3 separate gig apps, Sahakar assembled a unified cooperative crew with verified peer reputation.
        </p>

        {/* The 3 Team Members Mini-Cards Grid */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <WorkerMiniCard
            worker={{ name: 'Amit Patel', avatar: '🎨', rating: 4.9, trade: 'Painter', level: 'Expert' }}
            role="Lead Painter (Surface & Texture)"
            isHighlighted={true}
          />
          <WorkerMiniCard
            worker={{ name: 'Rajesh Kumar (You)', avatar: '👷', rating: 4.8, trade: 'Electrician', level: 'Expert' }}
            role="Concealed Wiring & Smart Fixtures"
            isHighlighted={true}
          />
          <WorkerMiniCard
            worker={{ name: 'Suresh Yadav', avatar: '🪚', rating: 4.9, trade: 'Carpenter', level: 'Master' }}
            role="Modular Wall Panels & Shelving"
            isHighlighted={true}
          />
        </div>

        {/* Job Financials & Welfare Pool Line */}
        <div className="mt-6 pt-4 border-t border-[#E8DFD8] flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#736B63]">Total Contract Budget:</span>
            <div className="text-2xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              ₹45,000
            </div>
            {/* MANDATORY REQUIREMENT: ₹X job -> ₹0.01X to Welfare Pool */}
            <p className="text-xs font-bold text-[#2D6A4F] mt-0.5">
              ₹45,000 job → ₹450 automatically goes to the Welfare Pool
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#736B63]">Your Crew Share: <strong>₹15,000</strong></span>
            <button
              onClick={() => handleAcceptJob('j1')}
              disabled={acceptedJobs['j1']}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm ${
                acceptedJobs['j1']
                  ? 'bg-[#2D6A4F] text-white cursor-default'
                  : 'bg-[#C45C3C] text-white hover:bg-[#A34A2E] active:scale-95'
              }`}
            >
              {acceptedJobs['j1'] ? '✓ Crew Slot Confirmed!' : 'Accept Team Slot'}
            </button>
          </div>
        </div>
      </div>

      {/* All Available Marketplace Jobs Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          Active Opportunities ({filteredJobs.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const isAccepted = acceptedJobs[job.id];
            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-5 border border-[#E8DFD8] shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C45C3C]">
                        {job.city} District • {job.tradesNeeded.join(' + ')}
                      </span>
                      <h4 className="text-lg font-bold text-[#2B2B2B] mt-0.5">
                        {job.title}
                      </h4>
                    </div>
                    {job.isTeamJob && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#D4A843]/20 text-[#8C6208] shrink-0 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Team Job
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#665D56] leading-relaxed mb-3">
                    {job.description}
                  </p>

                  {/* Customer Info & Mutual Trust Risk Flag */}
                  <div className="p-3 bg-[#FAF5EE] rounded-xl border border-[#E8DFD8] flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#EADECF] flex items-center justify-center text-sm">
                        {job.customer.avatar}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#2B2B2B] block">{job.customer.name}</span>
                        <span className="text-[10px] text-[#736B63]">★ {job.customer.rating} Customer Rating</span>
                      </div>
                    </div>
                    <RiskFlag flags={job.customer.flags} paymentHistory={job.customer.paymentHistory} />
                  </div>
                </div>

                {/* Bottom line with Welfare calculation */}
                <div className="pt-3 border-t border-[#F0EAE1]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-[10px] text-[#8C827A] block">Contract Amount:</span>
                      <span className="text-lg font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {formatCurrency(job.budget)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAcceptJob(job.id)}
                      disabled={isAccepted}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                        isAccepted
                          ? 'bg-[#2D6A4F] text-white'
                          : 'bg-[#C45C3C] text-white hover:bg-[#A34A2E] active:scale-95'
                      }`}
                    >
                      {isAccepted ? '✓ Accepted' : t('jobs.accept')}
                    </button>
                  </div>

                  {/* MANDATORY REQUIREMENT: ₹X job -> ₹0.01X to Welfare Pool */}
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F]">
                    <HeartHandshake className="w-3.5 h-3.5 shrink-0" />
                    <span>₹{job.budget.toLocaleString('en-IN')} job → ₹{job.welfareContribution.toLocaleString('en-IN')} automatically goes to the Welfare Pool</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

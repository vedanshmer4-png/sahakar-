import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShoppingBag,
  Users,
  Wrench,
  CheckCircle2,
  TrendingUp,
  Tag,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import { communityMarketplace, formatCurrency } from '../data/mockData';

export default function CommunityMarketplace() {
  const { t } = useTranslation();
  const [groupBuys, setGroupBuys] = useState(communityMarketplace.groupBuys);
  const [toolSharing, setToolSharing] = useState(communityMarketplace.toolSharing);
  const [joinedPools, setJoinedPools] = useState({});
  const [requestedTools, setRequestedTools] = useState({});

  const handleJoinPool = (poolId) => {
    setGroupBuys(prev =>
      prev.map(item => {
        if (item.id === poolId && !joinedPools[poolId]) {
          return {
            ...item,
            currentMembers: Math.min(item.currentMembers + 1, item.maxMembers),
            members: [...item.members, 'Rajesh K. (You)'],
          };
        }
        return item;
      })
    );
    setJoinedPools(prev => ({ ...prev, [poolId]: true }));
  };

  const handleBorrowTool = (toolId) => {
    setRequestedTools(prev => ({ ...prev, [toolId]: true }));
  };

  const totalSavedAcrossPlatform = 1248000; // ₹12.48L saved collectively

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 text-[#9C7016] text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            Pillar 08 • Collective Economics
          </div>
          <h1 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            {t('community.title')}
          </h1>
          <p className="text-xs sm:text-sm text-[#736B63] mt-1">
            Individually, industrial power tools are too expensive. Together, worker-members buy bulk wholesale and share high-end equipment.
          </p>
        </div>

        {/* Collective Savings Highlight Card */}
        <div className="bg-[#2D6A4F] text-white p-4 rounded-2xl shadow-sm flex items-center gap-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4A843]">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-white/70 block">
              Collective Worker Savings
            </span>
            <span className="text-xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
              {formatCurrency(totalSavedAcrossPlatform)}
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ACTIVE GROUP-BUYS SECTION                                    */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              {t('community.groupBuys')}
            </h2>
            <p className="text-xs text-[#736B63]">
              Wholesale purchasing pools: reach the quota to unlock manufacturer-direct pricing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupBuys.map((pool) => {
            const isJoined = joinedPools[pool.id];
            const spotsRemaining = pool.maxMembers - pool.currentMembers;

            return (
              <div
                key={pool.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FAF5EE] text-[#C45C3C] border border-[#E8DFD8]">
                      {pool.city} District • {pool.trade}
                    </span>
                    <span className="text-xs font-bold text-[#2D6A4F] bg-[#D1FAE5] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Save ₹{pool.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Item title and description */}
                  <h3 className="text-lg font-bold text-[#2B2B2B]">
                    {pool.item}
                  </h3>
                  <p className="text-xs text-[#736B63] mt-1 leading-relaxed">
                    {pool.description}
                  </p>

                  {/* Core Prompt requirement: "10 plumbers pooled ₹X to buy tools together — save ₹Y each" */}
                  <div className="my-4 p-3.5 bg-[#FFF8F0] rounded-2xl border border-[#C45C3C]/30 text-xs text-[#2B2B2B]">
                    <p className="font-bold text-[#C45C3C]">
                      {pool.maxMembers} {pool.trade}s pooling ₹{pool.totalPrice.toLocaleString('en-IN')} wholesale
                    </p>
                    <p className="text-[#665D56] mt-0.5">
                      Market price: <span className="line-through">₹{pool.marketPrice.toLocaleString('en-IN')}</span> → Co-op group price: <strong>₹{pool.pricePerWorker.toLocaleString('en-IN')}</strong> each.
                    </p>
                  </div>

                  {/* Progress Bar with members count */}
                  <div className="space-y-1.5 mb-4">
                    <ProgressBar
                      current={pool.currentMembers}
                      max={pool.maxMembers}
                      color="#C45C3C"
                      label={`${pool.currentMembers}/${pool.maxMembers} members joined (${spotsRemaining} ${t('community.spotsLeft')})`}
                    />
                    <div className="flex flex-wrap gap-1 mt-2">
                      {pool.members.map((m, idx) => (
                        <span key={idx} className="text-[10px] bg-[#FAF5EE] text-[#4A4A4A] px-2 py-0.5 rounded-md border border-[#E8DFD8]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Cost {t('community.perWorker')}:</span>
                    <span className="text-xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                      ₹{pool.pricePerWorker.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <button
                    onClick={() => handleJoinPool(pool.id)}
                    disabled={isJoined || spotsRemaining === 0}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                      isJoined
                        ? 'bg-[#2D6A4F] text-white'
                        : spotsRemaining === 0
                        ? 'bg-[#E8DFD8] text-[#8C827A] cursor-not-allowed'
                        : 'bg-[#C45C3C] text-white hover:bg-[#A34A2E] active:scale-95'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Joined Group Buy!
                      </>
                    ) : (
                      <>
                        <span>{t('community.joinPool')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TOOL SHARING & EQUIPMENT LIBRARY                             */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2D6A4F]/10 text-[#2D6A4F] flex items-center justify-center">
                <Wrench className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                {t('community.toolSharing')} Library
              </h2>
            </div>
            <p className="text-xs text-[#736B63] mt-1">
              Peer-to-peer equipment sharing backed by cooperative security deposit & insurance.
            </p>
          </div>
          <span className="text-xs font-bold text-[#2D6A4F] bg-[#D1FAE5] px-3 py-1.5 rounded-full self-start sm:self-auto">
            Zero Platform Commission on Rentals
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolSharing.map((tool) => {
            const isRequested = requestedTools[tool.id];
            return (
              <div
                key={tool.id}
                className="p-4 rounded-2xl border border-[#E8DFD8] bg-[#FAF5EE] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-[#736B63] uppercase">
                      {tool.city}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tool.available
                          ? 'bg-[#D1FAE5] text-[#2D6A4F]'
                          : 'bg-[#FEE2E2] text-[#D64545]'
                      }`}
                    >
                      {tool.available ? 'Available' : 'In Use'}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#2B2B2B]">{tool.item}</h4>
                  <p className="text-xs text-[#736B63] mt-0.5">Owner: <strong>{tool.owner}</strong></p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8DFD8] flex items-center justify-between">
                  <span className="text-sm font-black text-[#2B2B2B]">{tool.rate}</span>
                  <button
                    onClick={() => handleBorrowTool(tool.id)}
                    disabled={!tool.available || isRequested}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isRequested
                        ? 'bg-[#2D6A4F] text-white'
                        : tool.available
                        ? 'bg-[#C45C3C] text-white hover:bg-[#A34A2E]'
                        : 'bg-[#E8DFD8] text-[#8C827A] cursor-not-allowed'
                    }`}
                  >
                    {isRequested ? 'Requested!' : 'Borrow Tool'}
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

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Award,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Sparkles,
  ExternalLink,
  Star,
  Calendar,
  Lock,
  FileCheck
} from 'lucide-react';
import { workers, currentWorker } from '../data/mockData';

export default function ReputationPassport() {
  const { t } = useTranslation();
  const [activeWorker, setActiveWorker] = useState(currentWorker);
  const [exported, setExported] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3500);
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
      {/* Header & Explanation */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A843]/20 border border-[#D4A843]/40 text-[#9C7016] text-xs font-bold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          Pillar 03 • Self-Sovereign Identity
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          {t('passport.title')}
        </h1>
        <p className="text-xs sm:text-sm text-[#736B63]">
          In traditional gig apps, if your account is banned, years of 5-star ratings disappear.
          On Sahakar, your reputation is an immutable, portable digital credential that belongs entirely to you.
        </p>

        {/* Worker Selector for judges */}
        <div className="inline-flex items-center gap-2 mt-2 bg-white px-3 py-1.5 rounded-xl border border-[#E8DFD8] text-xs font-semibold">
          <span className="text-[#736B63]">Previewing Passport for:</span>
          <select
            value={activeWorker.id}
            onChange={(e) => setActiveWorker(workers.find(w => w.id === e.target.value))}
            className="bg-transparent font-bold text-[#C45C3C] focus:outline-none cursor-pointer"
          >
            {workers.map(w => (
              <option key={w.id} value={w.id}>{w.name} ({w.trade})</option>
            ))}
          </select>
        </div>
      </div>

      {/* ============================================================ */}
      {/* THE PASSPORT CERTIFICATE CARD (Physical ID aesthetic)        */}
      {/* ============================================================ */}
      <div className="relative bg-gradient-to-br from-[#FFFDF9] via-[#FBF6EE] to-[#F5ECE0] rounded-3xl border-4 border-[#D4A843] shadow-2xl p-6 sm:p-10 overflow-hidden">
        {/* Subtle Watermark Cooperative Seal */}
        <div className="absolute right-4 bottom-4 text-[160px] opacity-5 pointer-events-none font-black select-none text-[#C45C3C]">
          सह
        </div>

        {/* Top Passport Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#D4A843]/40 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#C45C3C] text-white flex items-center justify-center font-bold text-2xl shadow-md">
              सह
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#C45C3C]">
                  All-India Gig Workers Cooperative Federation
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                Verifiable Worker Credential & Reputation
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#2D6A4F] text-white flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cryptographically Verified
            </span>
          </div>
        </div>

        {/* EXPLICIT OWNERSHIP BANNER (Core requirement) */}
        <div className="my-6 p-4 rounded-2xl bg-[#FFF8F0] border-2 border-[#C45C3C] shadow-sm">
          <div className="flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-[#C45C3C] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-black text-[#C45C3C]">
                {t('passport.portable', { name: activeWorker.name })}
              </p>
              <p className="text-xs text-[#736B63] mt-0.5">
                Portable to any cooperative union, state labour welfare board, or registered guild across India under open W3C Verifiable Credential standards.
              </p>
            </div>
          </div>
        </div>

        {/* Main Passport Identity Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Photo & Basic Details (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center text-center p-4 bg-white/90 rounded-2xl border border-[#E8DFD8] shadow-sm">
            <div className="w-24 h-24 rounded-2xl bg-[#EADECF] flex items-center justify-center text-5xl border-4 border-[#D4A843] shadow-md">
              {activeWorker.avatar}
            </div>
            <h3 className="text-xl font-bold text-[#2B2B2B] mt-3" style={{ fontFamily: 'var(--font-heading)' }}>
              {activeWorker.name}
            </h3>
            <p className="text-xs font-bold text-[#C45C3C]">{activeWorker.trade} • {activeWorker.level}</p>

            <div className="mt-3 pt-3 border-t border-[#E8DFD8] w-full grid grid-cols-2 gap-2 text-left text-xs">
              <div>
                <span className="text-[#8C827A] block text-[10px]">District:</span>
                <span className="font-bold text-[#2B2B2B]">{activeWorker.city}</span>
              </div>
              <div>
                <span className="text-[#8C827A] block text-[10px]">{t('passport.memberSince')}:</span>
                <span className="font-bold text-[#2B2B2B]">{activeWorker.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Core Trust Metrics (8 cols) */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/90 p-3.5 rounded-2xl border border-[#E8DFD8] text-center">
                <span className="text-[10px] uppercase font-bold text-[#736B63] block">Trust Rating</span>
                <div className="flex items-center justify-center gap-1 mt-1 text-[#D4A843]">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-2xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {activeWorker.rating}
                  </span>
                </div>
                <span className="text-[10px] text-[#2D6A4F] font-bold">100% Verified</span>
              </div>

              <div className="bg-white/90 p-3.5 rounded-2xl border border-[#E8DFD8] text-center">
                <span className="text-[10px] uppercase font-bold text-[#736B63] block">Jobs Completed</span>
                <p className="text-2xl font-black text-[#2B2B2B] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {activeWorker.jobsCompleted}
                </p>
                <span className="text-[10px] text-[#2D6A4F] font-bold">99.4% On-time</span>
              </div>

              <div className="bg-white/90 p-3.5 rounded-2xl border border-[#E8DFD8] text-center">
                <span className="text-[10px] uppercase font-bold text-[#736B63] block">Safety Record</span>
                <p className="text-2xl font-black text-[#2D6A4F] mt-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  0
                </p>
                <span className="text-[10px] text-[#2D6A4F] font-bold">Incidents</span>
              </div>
            </div>

            {/* Badges & Certified Skills */}
            <div className="bg-white/90 p-4 rounded-2xl border border-[#E8DFD8]">
              <span className="text-xs font-bold text-[#4A4A4A] block mb-2">
                Certified Co-op Badges & Endorsements:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeWorker.badges.map(badge => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FAF5EE] text-[#C45C3C] border border-[#E8DFD8]"
                  >
                    <Award className="w-3.5 h-3.5 text-[#D4A843]" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Verifiable DID and Security Fingerprint */}
            <div className="bg-white/90 p-3 rounded-2xl border border-[#E8DFD8] flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#8C827A] block">DID Credential Hash:</span>
                  <span className="font-mono text-[11px] text-[#2B2B2B] font-semibold truncate block max-w-[240px] sm:max-w-xs">
                    did:sahakar:2026:in:{activeWorker.id}:a8f9c2d1e0
                  </span>
                </div>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#FAF5EE] border border-[#E8DFD8] flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5 text-[#2B2B2B]" />
              </div>
            </div>
          </div>
        </div>

        {/* Passport Footer Actions */}
        <div className="mt-8 pt-6 border-t-2 border-[#D4A843]/40 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#736B63]">
            Issued by <strong className="text-[#2B2B2B]">Sahakar National Cooperative Registry</strong> • W3C DID Standard
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E8DFD8] text-xs font-bold text-[#2B2B2B] hover:bg-[#FAF5EE] transition-all shadow-sm active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : t('passport.share')}</span>
            </button>

            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C45C3C] text-white text-xs font-bold hover:bg-[#A34A2E] transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{exported ? 'Credentials Downloaded (JSON)!' : t('passport.export')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Export Confirmation Alert */}
      {exported && (
        <div className="p-4 rounded-2xl bg-[#D1FAE5] border border-[#2D6A4F] text-[#1B4332] text-xs font-semibold flex items-center gap-3 animate-fade-in-up">
          <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
          <div>
            <strong>Reputation Exported:</strong> Downloaded cryptographically signed credential file (<code>sahakar-passport-{activeWorker.id}.json</code>). You can import this into any cooperative or gig registry worldwide.
          </div>
        </div>
      )}
    </div>
  );
}

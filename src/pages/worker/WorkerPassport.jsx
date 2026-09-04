import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  CheckCircle2,
  Lock,
  Globe,
  QrCode,
  X
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function WorkerPassport() {
  const store = getStore();
  const worker = store.workers[0];
  const [showQrModal, setShowQrModal] = useState(false);

  const passportObject = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    id: `urn:sahakar:worker:${worker.id}`,
    type: ['VerifiableCredential', 'ReputationPassport'],
    issuer: 'did:sahakar:delhi-federation',
    issuanceDate: '2026-01-10T00:00:00Z',
    credentialSubject: {
      id: `did:sahakar:${worker.id}`,
      name: worker.name,
      trade: worker.trade,
      skillLevel: worker.skillLevel,
      rating: worker.rating,
      completedJobs: worker.jobsCompleted,
      ownershipEquityStake: `${worker.ownershipStake}%`,
      policeVerificationStatus: 'CLEARED_PCC_2026',
      certifications: worker.certifications.map(c => c.title)
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(passportObject, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `sahakar_passport_${worker.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>PORTABLE W3C DIGITAL CREDENTIAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Worker Reputation Passport
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Your portable, tamper-evident proof of skill and integrity. Survives across state federations and guilds.
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => setShowQrModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/25 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-[#D4A843]" />
            <span>Show QR Code</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Passport Credential Card */}
      <div className="bg-white rounded-3xl p-8 border-2 border-[#2D6A4F] shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8DFD8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF5EE] text-3xl flex items-center justify-center border border-[#E8DFD8]">
              {worker.avatar}
            </div>
            <div>
              <h2 className="text-xl font-black text-[#2B2B2B]">{worker.name}</h2>
              <p className="text-xs text-[#C45C3C] font-black">{worker.trade} • {worker.skillLevel}</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Reputation Score</span>
            <strong className="text-2xl font-black text-[#D4A843]">{worker.rating} ⭐</strong>
            <span className="text-[10px] text-[#2D6A4F] block font-bold">{worker.jobsCompleted} Verified Jobs</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
            <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Cooperative Ownership Stake</span>
            <strong className="text-sm font-black text-[#2D6A4F]">{worker.ownershipStake}% Equity</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
            <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Primary Society Affiliation</span>
            <strong className="text-xs font-bold text-[#2B2B2B]">{worker.societyName}</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
            <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Police Clearance Status</span>
            <strong className="text-xs font-black text-[#2D6A4F]">✓ Cleared & Verified</strong>
          </div>
        </div>

        {/* Verified Badges */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#736B63] block">Verified Guild Badges</span>
          <div className="flex flex-wrap gap-2">
            {worker.badges.map((b, i) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] text-xs font-bold flex items-center gap-1.5 border border-[#2D6A4F]/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{b}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Verifiable Credential JSON Snippet */}
        <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-[11px] font-mono text-[#4A4A4A] overflow-x-auto space-y-1">
          <span className="font-bold text-[#2B2B2B] block">W3C Verifiable Credential Payload:</span>
          <pre>{JSON.stringify(passportObject, null, 2)}</pre>
        </div>
      </div>

      {/* Scannable QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-2">
              <h3 className="font-bold text-sm text-[#2B2B2B]">On-Site Verifier QR Code</h3>
              <button onClick={() => setShowQrModal(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual QR Code Generator Simulation */}
            <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-2 border-black flex flex-col items-center justify-center space-y-2 shadow-inner">
              <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-black/5 rounded-lg">
                {[...Array(36)].map((_, i) => (
                  <div key={i} className={`rounded-xs ${i % 2 === 0 || i % 5 === 0 ? 'bg-black' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <strong className="text-[#2B2B2B] block">{worker.name} (DID: did:sahakar:w1)</strong>
              <p className="text-[11px] text-[#2D6A4F] font-bold">✓ W3C Cryptographic Signature Valid</p>
              <p className="text-[10px] text-[#8C827A]">Customer or inspector can scan this QR to verify 5.0 rating, police clearance & legal guild affiliation.</p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-[#2D6A4F] text-white text-xs font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

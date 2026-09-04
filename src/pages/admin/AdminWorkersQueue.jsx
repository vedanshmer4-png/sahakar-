import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  ShieldCheck,
  Building2,
  Phone,
  HelpCircle,
  X
} from 'lucide-react';
import { getStore, saveStore } from '../../data/mockStore';

export default function AdminWorkersQueue() {
  const [store, setStore] = useState(getStore());
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showClarifyModal, setShowClarifyModal] = useState(false);
  const [clarificationNote, setClarificationNote] = useState('');

  const handleApprove = (kycId) => {
    const updated = saveStore((prev) => ({
      ...prev,
      kycQueue: (prev.kycQueue || []).map(k => k.id === kycId ? { ...k, status: 'Approved' } : k)
    }));
    setStore(updated);
    setSelectedApplicant(null);
    alert('Worker applicant approved! 0.12% Cooperative Equity allocated and Reputation Passport minted.');
  };

  const handleReject = (kycId) => {
    const updated = saveStore((prev) => ({
      ...prev,
      kycQueue: (prev.kycQueue || []).map(k => k.id === kycId ? { ...k, status: 'Rejected' } : k)
    }));
    setStore(updated);
    setSelectedApplicant(null);
  };

  const handleSendClarification = (e) => {
    e.preventDefault();
    if (!clarificationNote.trim()) return;
    const updated = saveStore((prev) => ({
      ...prev,
      kycQueue: (prev.kycQueue || []).map(k => k.id === selectedApplicant.id ? { ...k, status: 'Clarification Requested' } : k)
    }));
    setStore(updated);
    alert(`SMS query dispatched to applicant ${selectedApplicant.name}: "${clarificationNote}"`);
    setShowClarifyModal(false);
    setSelectedApplicant(null);
    setClarificationNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <FileCheck className="w-3.5 h-3.5" />
            <span>KYC VERIFICATION DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Worker Registration & Document Approvals
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Audit Aadhaar IDs, NSDC skill credentials, and Police Clearance Certificates to approve new cooperative worker-owners.
          </p>
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#2B2B2B]">Pending Verification Dossiers</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#E8DFD8] text-[#736B63] uppercase text-[10px]">
                <th className="py-3 px-4">Applicant & Trade</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Document Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {(store.kycQueue || []).map((k) => (
                <tr key={k.id} className="hover:bg-[#FAF5EE]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <strong className="text-[#2B2B2B] block text-sm">{k.name}</strong>
                    <span className="text-[#C45C3C] font-bold">{k.trade} • {k.phone}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#2B2B2B]">{k.experienceYears} Years</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {k.documents.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#FAF5EE] text-[#4A4A4A] text-[10px] font-bold border border-[#E8DFD8]">
                          ✓ {d.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      k.status === 'Approved' ? 'bg-[#D1FAE5] text-[#2D6A4F]' :
                      k.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                      k.status === 'Clarification Requested' ? 'bg-[#FEF3C7] text-[#9C7016]' :
                      'bg-[#E0F2FE] text-[#0369A1]'
                    }`}>
                      {k.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedApplicant(k)}
                        className="px-3 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#E8DFD8] text-xs font-bold text-[#2B2B2B] flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>
                      {k.status === 'Pending Review' && (
                        <>
                          <button
                            onClick={() => handleApprove(k.id)}
                            className="px-3 py-1.5 rounded-lg bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332] cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(k.id)}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 border border-red-200 text-xs font-bold cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Dossier Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8DFD8] pb-3">
              <h3 className="font-bold text-base text-[#2B2B2B]">Applicant Dossier: {selectedApplicant.name}</h3>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="w-7 h-7 rounded-full bg-gray-100 font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p><strong>Trade:</strong> {selectedApplicant.trade} • <strong>Experience:</strong> {selectedApplicant.experienceYears} Years</p>
              <p><strong>Phone:</strong> {selectedApplicant.phone}</p>

              <div className="space-y-2 pt-2">
                <span className="font-bold text-[#4A4A4A] block">Submitted Document Records:</span>
                {selectedApplicant.documents.map((d, i) => (
                  <div key={i} className="p-2.5 rounded-xl border border-[#E8DFD8] bg-[#FAF5EE] flex items-center justify-between">
                    <div>
                      <strong className="block text-[#2B2B2B]">{d.name}</strong>
                      <span className="text-[10px] text-[#8C827A]">Ref: {d.number}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#D1FAE5] text-[#2D6A4F] text-[10px] font-bold">
                      ✓ Document Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <button
                onClick={() => setShowClarifyModal(true)}
                className="px-3.5 py-2 rounded-xl bg-[#FAF5EE] text-[#9C7016] border border-[#E8DFD8] font-bold text-xs hover:bg-[#F0EAE1] cursor-pointer flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Request More Info</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReject(selectedApplicant.id)}
                  className="px-4 py-2 rounded-xl bg-red-50 text-red-700 font-bold text-xs border border-red-200 cursor-pointer"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(selectedApplicant.id)}
                  className="px-5 py-2 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332] cursor-pointer"
                >
                  Approve & Grant 0.12% Cooperative Equity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clarification Request Modal */}
      {showClarifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <form onSubmit={handleSendClarification} className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-2">
              <h3 className="font-bold text-base text-[#2B2B2B]">Request Additional Documents / Info</h3>
              <button type="button" onClick={() => setShowClarifyModal(false)} className="p-1 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-[#665D56]">Send an official query to <strong>{selectedApplicant?.name}</strong> via SMS & portal notification:</p>
              <textarea
                required
                rows={3}
                placeholder="e.g. Please re-upload clearer photo of reverse side of Aadhaar card..."
                value={clarificationNote}
                onChange={(e) => setClarificationNote(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClarifyModal(false)}
                className="px-4 py-2 bg-gray-100 text-xs font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#2D6A4F] text-white text-xs font-bold rounded-xl"
              >
                Dispatch Query
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

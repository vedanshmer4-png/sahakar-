import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles,
  UserPlus,
  X
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function WorkerJobs() {
  const [store, setStore] = useState(getStore());
  const [activeTab, setActiveTab] = useState('All');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedSquadJob, setSelectedSquadJob] = useState(null);
  const [invitedWorker, setInvitedWorker] = useState(null);

  const bookings = store.bookings || [];

  const handleUpdateStatus = (bookingId, newStatus) => {
    const updated = saveStore((prev) => ({
      ...prev,
      bookings: prev.bookings.map(b =>
        b.id === bookingId ? { ...b, status: newStatus } : b
      )
    }));
    setStore(updated);
  };

  const handleInviteCraftsman = (worker) => {
    setInvitedWorker(worker);
    setTimeout(() => {
      alert(`Invitation sent to ${worker.name} (${worker.trade}) to join squad contract ${selectedSquadJob?.id}!`);
      setInviteModalOpen(false);
      setInvitedWorker(null);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>MY ACTIVE JOBS & TURNKEY SQUADS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Assigned Service Jobs & Squad Assembly
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Accept upcoming jobs, coordinate with peer guild craftsmen for multi-skill contracts, and update status in real time.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Requested', 'Accepted', 'In Progress', 'Completed'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === t ? 'bg-[#2D6A4F] text-white shadow-xs' : 'bg-white text-[#5A524C] border border-[#E8DFD8]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-6">
        {bookings
          .filter(b => activeTab === 'All' || b.status === activeTab)
          .map((b) => (
            <div key={b.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F0EAE1] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#8C827A]">{b.id}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      b.status === 'Completed' ? 'bg-[#D1FAE5] text-[#2D6A4F]' :
                      b.status === 'In Progress' ? 'bg-[#FEF3C7] text-[#9C7016]' :
                      'bg-[#E0F2FE] text-[#0369A1]'
                    }`}>
                      ● {b.status}
                    </span>
                    {b.isTeamJob && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#9C7016] text-[10px] font-bold">
                        ⚡ Turnkey Squad Job
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#2B2B2B] mt-1">{b.serviceTitle}</h3>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#8C827A] uppercase font-bold block">Your 90% Direct Pay</span>
                  <strong className="text-lg font-black text-[#2D6A4F]">{formatCurrency(b.breakdown.workerPayout)}</strong>
                </div>
              </div>

              {/* Customer & Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
                  <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Customer Details</span>
                  <strong className="text-[#2B2B2B] block">{b.customerName}</strong>
                  <span className="text-[11px] text-[#2D6A4F] font-bold block">{b.customerRiskFlag}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
                  <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Scheduled Slot</span>
                  <div className="flex items-center gap-1.5 font-bold text-[#2B2B2B]">
                    <Calendar className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>{b.date} • {b.timeSlot}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
                  <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Service Location</span>
                  <p className="text-[#665D56] truncate">{b.address}</p>
                </div>
              </div>

              {/* Actions & Status Switcher */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EAE1]">
                {/* Squad Invite Trigger */}
                <div>
                  {b.isTeamJob && (
                    <button
                      onClick={() => { setSelectedSquadJob(b); setInviteModalOpen(true); }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F0EAE1] text-xs font-bold text-[#2D6A4F] border border-[#E8DFD8] flex items-center gap-1.5 cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Invite Peer Craftsman to Squad</span>
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {b.status === 'Requested' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'Accepted')}
                      className="px-5 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-black shadow-xs cursor-pointer"
                    >
                      Accept Job
                    </button>
                  )}

                  {b.status === 'Accepted' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'In Progress')}
                      className="px-5 py-2 rounded-xl bg-[#C45C3C] hover:bg-[#A34A2E] text-white text-xs font-black shadow-xs cursor-pointer"
                    >
                      Verify Arrival & Start Job
                    </button>
                  )}

                  {b.status === 'In Progress' && (
                    <button
                      onClick={() => handleUpdateStatus(b.id, 'Completed')}
                      className="px-5 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-black shadow-xs cursor-pointer"
                    >
                      Mark Complete & Release Escrow
                    </button>
                  )}

                  {b.status === 'Completed' && (
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Payout Settled to Wallet</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Invite Peer Craftsman Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#2B2B2B]">Invite Peer Craftsman to Turnkey Squad</h3>
                <span className="text-xs text-[#8C827A]">Contract: {selectedSquadJob?.serviceTitle}</span>
              </div>
              <button onClick={() => setInviteModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto p-1 text-xs">
              {store.workers.filter(w => w.id !== 'w1').map((w) => (
                <div key={w.id} className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{w.avatar}</span>
                    <div>
                      <strong className="block text-[#2B2B2B]">{w.name}</strong>
                      <span className="text-[#C45C3C] font-bold">{w.trade} • {w.skillLevel}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInviteCraftsman(w)}
                    className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-xl font-bold text-xs hover:bg-[#1B4332] cursor-pointer"
                  >
                    Invite
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

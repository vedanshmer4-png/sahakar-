import React, { useState } from 'react';
import {
  ShoppingBag,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  ShieldCheck,
  Zap,
  Wrench,
  X
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function WorkerMarketplace() {
  const [store, setStore] = useState(getStore());
  const [listModalOpen, setListModalOpen] = useState(false);
  const [newToolName, setNewToolName] = useState('');
  const [newDailyRate, setNewDailyRate] = useState(300);

  const handleJoinGroupBuy = (groupBuyId) => {
    const updated = saveStore((prev) => ({
      ...prev,
      groupBuys: prev.groupBuys.map(gb =>
        gb.id === groupBuyId
          ? { ...gb, pledgedUnits: Math.min(gb.targetUnits, gb.pledgedUnits + 1) }
          : gb
      )
    }));
    setStore(updated);
    alert('Pledge confirmed! 1 unit added to your cooperative group order.');
  };

  const handleListTool = (e) => {
    e.preventDefault();
    const newTool = {
      id: 'eq-' + Math.floor(100 + Math.random() * 900),
      name: newToolName || 'Industrial Heavy Tool',
      owner: 'Rajesh Kumar',
      dailyRate: Number(newDailyRate),
      status: 'Available'
    };

    const updated = saveStore((prev) => ({
      ...prev,
      equipment: [newTool, ...(prev.equipment || [])]
    }));

    setStore(updated);
    setListModalOpen(false);
    setNewToolName('');
    alert('Tool listed in cooperative peer rental library!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>COLLECTIVE WHOLESALE PURCHASING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Community Marketplace & Tool Sharing
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Pool orders with fellow guild members to buy commercial tools at 40% wholesale discount, or rent specialized equipment.
          </p>
        </div>

        <button
          onClick={() => setListModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List My Tool for Rent</span>
        </button>
      </div>

      {/* Active Wholesale Group-Buys */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          Active Collective Group-Buy Orders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {store.groupBuys.map((gb) => {
            const progress = Math.round((gb.pledgedUnits / gb.targetUnits) * 100);
            return (
              <div key={gb.id} className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C45C3C]">Organized by {gb.organizer}</span>
                    <span className="text-[10px] font-black text-[#2D6A4F] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                      {gb.daysLeft} Days Left
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#2B2B2B]">{gb.item}</h3>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-[#8C827A] block uppercase font-bold">Group Buy Price</span>
                      <strong className="text-base text-[#2D6A4F]">{formatCurrency(gb.groupPrice)}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C827A] block uppercase font-bold">Retail Price</span>
                      <span className="line-through text-[#8C827A]">{formatCurrency(gb.retailPrice)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C827A] block uppercase font-bold">Member Savings</span>
                      <strong className="text-xs text-[#C45C3C]">Save {formatCurrency(gb.savings)}</strong>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs font-bold text-[#4A4A4A]">
                      <span>{gb.pledgedUnits} / {gb.targetUnits} Units Pledged</span>
                      <span>{progress}% Quorum</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-[#2D6A4F] h-full" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinGroupBuy(gb.id)}
                  className="w-full py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Pledge 1 Unit ({formatCurrency(gb.groupPrice)})</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Peer Tool Rental Library */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4">
        <h3 className="font-bold text-base text-[#2B2B2B]">Peer Guild Equipment Rental Library</h3>
        <p className="text-xs text-[#665D56]">Rent specialized industrial equipment from fellow verified guild craftsmen at low cooperative rates.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {store.equipment.map((eq) => (
            <div key={eq.id} className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-2 text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    eq.status === 'Available' ? 'bg-[#D1FAE5] text-[#2D6A4F]' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {eq.status}
                  </span>
                  <strong className="text-sm text-[#2D6A4F]">{formatCurrency(eq.dailyRate)} / day</strong>
                </div>
                <h4 className="font-bold text-[#2B2B2B] text-sm mt-2">{eq.name}</h4>
                <span className="text-[11px] text-[#8C827A] block">Owner: {eq.owner}</span>
              </div>

              <button
                disabled={eq.status !== 'Available'}
                onClick={() => alert(`Rental requested for ${eq.name}. Owner notified.`)}
                className="w-full py-2 rounded-xl bg-[#FAF5EE] hover:bg-white border border-[#E8DFD8] font-bold text-xs text-[#2B2B2B] transition-all disabled:opacity-50 cursor-pointer mt-2"
              >
                {eq.status === 'Available' ? 'Rent Equipment' : 'Currently Rented'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* List Tool Modal */}
      {listModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleListTool} className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="flex justify-between items-center border-b border-[#F0EAE1] pb-2">
              <h3 className="font-bold text-base text-[#2B2B2B]">List Equipment for Peer Rental</h3>
              <button onClick={() => setListModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Equipment Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bosch Rotary Hammer Drill 800W"
                  value={newToolName}
                  onChange={(e) => setNewToolName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl text-xs text-[#2B2B2B]"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">Daily Member Rental Rate (₹ / Day)</label>
                <input
                  type="number"
                  required
                  min="50"
                  max="5000"
                  value={newDailyRate}
                  onChange={(e) => setNewDailyRate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl font-bold text-xs text-[#2B2B2B]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setListModalOpen(false)}
                className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#2D6A4F] text-white rounded-xl text-xs font-bold"
              >
                List on Library
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

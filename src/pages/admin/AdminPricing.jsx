import React, { useState } from 'react';
import {
  DollarSign,
  Building2,
  CheckCircle2,
  Save,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function AdminPricing() {
  const [store, setStore] = useState(getStore());
  const [districts, setDistricts] = useState(store.districts);
  const [saved, setSaved] = useState(false);
  const [tierMultipliers, setTierMultipliers] = useState({
    l1: 1.0,
    l2: 1.25,
    l3: 1.5,
    master: 1.8
  });

  const handleUpdateFloor = (districtId, newFloor) => {
    setDistricts(districts.map(d => d.id === districtId ? { ...d, activeRateFloor: Number(newFloor) } : d));
  };

  const handleSavePolicies = () => {
    const updated = saveStore((prev) => ({
      ...prev,
      districts: districts
    }));
    setStore(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            <span>STATUTORY WAGE FLOOR POLICY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            District Pricing & Minimum Wage Floors
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Prevent exploitative price races to the bottom by maintaining democratic guild minimum wage floors.
          </p>
        </div>
      </div>

      {/* Skill-Tier Multiplier Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#F0EAE1] pb-2">
          <Layers className="w-4 h-4 text-[#2D6A4F]" />
          <h3 className="font-bold text-sm text-[#2B2B2B]">Skill-Tier Base Rate Multiplier Matrix</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-1">
            <strong className="text-[#2B2B2B] block">L1: Apprentice</strong>
            <span className="text-xs text-[#2D6A4F] font-bold">1.0x Base Floor</span>
          </div>
          <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-1">
            <strong className="text-[#2B2B2B] block">L2: Certified</strong>
            <span className="text-xs text-[#2D6A4F] font-bold">1.25x Base Floor</span>
          </div>
          <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-1">
            <strong className="text-[#2B2B2B] block">L3: Expert Guild</strong>
            <span className="text-xs text-[#2D6A4F] font-bold">1.50x Base Floor</span>
          </div>
          <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-1">
            <strong className="text-[#2B2B2B] block">L4: Master Craftsman</strong>
            <span className="text-xs text-[#2D6A4F] font-bold">1.80x Base Floor</span>
          </div>
        </div>
      </div>

      {/* District Minimum Floors */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <h3 className="font-bold text-base text-[#2B2B2B]">District Minimum Hourly Wage Floors</h3>
          {saved && (
            <span className="text-xs font-bold text-[#2D6A4F] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Policy rules updated!
            </span>
          )}
        </div>

        <div className="space-y-4">
          {districts.map((d) => (
            <div key={d.id} className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div>
                <strong className="text-sm text-[#2B2B2B] block">{d.name}</strong>
                <span className="text-[#665D56]">{d.members.toLocaleString('en-IN')} Affiliated Craftsmen • Est. {d.established}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-[#4A4A4A]">Wage Floor:</span>
                <input
                  type="number"
                  min="250"
                  max="1000"
                  value={d.activeRateFloor}
                  onChange={(e) => handleUpdateFloor(d.id, e.target.value)}
                  className="w-24 px-3 py-1.5 rounded-xl bg-white border border-[#E8DFD8] font-black text-[#2D6A4F] text-sm focus:outline-none"
                />
                <span className="font-bold text-[#8C827A]">/ hour</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSavePolicies}
          className="w-full py-3.5 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Federation Wage Policies</span>
        </button>
      </div>
    </div>
  );
}

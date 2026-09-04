import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Radio,
  MapPin,
  ShieldCheck,
  Star,
  ArrowRight,
  Filter,
  Sparkles,
  Layers
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function CustomerSearch() {
  const store = getStore();
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [radiusKm, setRadiusKm] = useState(6);
  const [activePin, setActivePin] = useState(null);

  const filteredWorkers = store.workers.filter(w => {
    const matchesTrade = selectedTrade === 'All' || w.trade === selectedTrade;
    const matchesRadius = w.distanceKm <= radiusKm;
    return matchesTrade && matchesRadius;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Radio className="w-3.5 h-3.5" />
            <span>HYPERLOCAL GEO-RADAR MATCHING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Find Nearby Verified Craftsmen
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Real-time visual radar scanning active guild workers in your neighborhood.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-white/80 block">Active in Radius</span>
          <span className="text-2xl font-black text-[#D4A843]">{filteredWorkers.length} Verified</span>
        </div>
      </div>

      {/* Radar Controls */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex-1 w-full space-y-1">
          <label className="text-xs font-bold text-[#4A4A4A] flex items-center justify-between">
            <span>Radar Scan Radius: <strong className="text-[#2D6A4F] text-sm">{radiusKm} Kilometers</strong></span>
            <span className="text-[#8C827A]">Max: 25 km</span>
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="w-full accent-[#2D6A4F] cursor-pointer"
          />
        </div>

        <div className="w-full sm:w-auto">
          <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Filter Trade</label>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            className="w-full sm:w-48 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl px-3 py-2 text-xs font-bold text-[#2B2B2B] focus:outline-none cursor-pointer"
          >
            <option value="All">All 10 Trades</option>
            {store.trades.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Visual Radar Sweep Screen */}
      <div className="bg-[#1B4332] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-[#2D6A4F] shadow-xl">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#D4A843] animate-pulse" />
            <h3 className="font-bold text-sm text-white">Live Cooperative Radar Screen ({radiusKm}km Coverage)</h3>
          </div>
          <span className="text-[10px] font-mono text-[#D4A843] bg-white/10 px-2 py-0.5 rounded-full">
            ● GPS RADAR ACTIVE
          </span>
        </div>

        {/* Visual Map Canvas Simulation */}
        <div className="relative h-64 sm:h-80 w-full bg-[#122E22] rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center">
          {/* Radar Circles */}
          <div className="absolute w-24 h-24 rounded-full border border-white/15" />
          <div className="absolute w-48 h-48 rounded-full border border-white/15" />
          <div className="absolute w-72 h-72 rounded-full border border-white/10" />
          <div className="absolute w-96 h-96 rounded-full border border-white/5" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/10" />

          {/* Center User Pin */}
          <div className="relative z-20 flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-[#C45C3C] text-white flex items-center justify-center text-[10px] font-black shadow-lg border-2 border-white animate-bounce">
              📍
            </div>
            <span className="text-[9px] font-bold bg-black/60 px-2 py-0.5 rounded-full mt-1">Your Location</span>
          </div>

          {/* Dynamic Craftsman Pins on Radar Screen */}
          {filteredWorkers.map((w, idx) => {
            const angle = (idx * (360 / (filteredWorkers.length || 1))) * (Math.PI / 180);
            const distPercent = Math.min(85, (w.distanceKm / radiusKm) * 80 + 15);
            const x = Math.cos(angle) * distPercent;
            const y = Math.sin(angle) * distPercent;

            return (
              <div
                key={w.id}
                onClick={() => setActivePin(w)}
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
                className="absolute z-20 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs border-2 border-[#D4A843] shadow-md group-hover:scale-125 transition-transform">
                  {w.avatar}
                </div>
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black/80 rounded-lg text-[10px] whitespace-nowrap text-white">
                  <strong>{w.name}</strong> ({w.trade}) • {w.distanceKm}km
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matched Workers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkers.map((w) => (
          <div key={w.id} className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-2xl flex items-center justify-center border border-[#E8DFD8]">
                    {w.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#2B2B2B]">{w.name}</h3>
                    <span className="text-xs text-[#C45C3C] font-black">{w.trade} • {w.skillLevel}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#2D6A4F] text-[10px] font-black">
                  {w.distanceKm} km away
                </span>
              </div>

              <p className="text-xs text-[#665D56] line-clamp-2">{w.bio}</p>

              <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs flex justify-between">
                <span className="text-[#2D6A4F] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{w.societyName}</span>
                </span>
                <span className="font-black text-[#D4A843]">★ {w.rating}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Rate</span>
                <strong className="text-sm text-[#2B2B2B]">{formatCurrency(w.hourlyRate)} / hr</strong>
              </div>

              <Link
                to="/customer/book"
                className="px-4 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332] flex items-center gap-1"
              >
                <span>Book Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

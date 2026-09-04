import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  BrainCircuit,
  MapPin,
  CheckCircle2,
  Zap,
  Building2,
  Sliders
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function AdminForecasting() {
  const [allocationDone, setAllocationDone] = useState(false);
  const [monsoonIndex, setMonsoonIndex] = useState(1.2);
  const [festivalSurge, setFestivalSurge] = useState(1.35);

  const hotspots = [
    { district: 'South Delhi Hub', trade: 'AC Technician', currentSupply: 42, predictedDemand: Math.round(78 * monsoonIndex), gap: Math.round(42 - (78 * monsoonIndex)), risk: 'High', recommendation: 'Reallocate 20 technicians from East Delhi' },
    { district: 'Hinjewadi Corridor, Pune', trade: 'Domestic Helper', currentSupply: 65, predictedDemand: Math.round(95 * festivalSurge), gap: Math.round(65 - (95 * festivalSurge)), risk: 'High', recommendation: 'Dispatch 15 helpers from Kothrud sub-society' },
    { district: 'Indiranagar / Whitefield, BLR', trade: 'Caregiver', currentSupply: 50, predictedDemand: 58, gap: -8, risk: 'Moderate', recommendation: 'Adequate; schedule 10 on standby' },
    { district: 'Bandra / Andheri, Mumbai', trade: 'Plumber', currentSupply: 80, predictedDemand: Math.round(120 * monsoonIndex), gap: Math.round(80 - (120 * monsoonIndex)), risk: 'High', recommendation: 'Pre-allocate monsoon waterproofing squads' },
  ];

  const hourlyCurve = [
    { hour: '07:00', bookings: 45, projectedDemand: 50 },
    { hour: '09:00', bookings: 140, projectedDemand: 165 },
    { hour: '11:00', bookings: 210, projectedDemand: 230 },
    { hour: '13:00', bookings: 110, projectedDemand: 120 },
    { hour: '15:00', bookings: 130, projectedDemand: 145 },
    { hour: '17:00', bookings: 260, projectedDemand: 290 },
    { hour: '19:00', bookings: 310, projectedDemand: 340 },
    { hour: '21:00', bookings: 95, projectedDemand: 110 },
  ];

  const seasonalTrends = [
    { month: 'Jan', cleaning: 60, electrical: 70, acRepair: 20, plumbing: 55 },
    { month: 'Feb', cleaning: 65, electrical: 85, acRepair: 45, plumbing: 68 },
    { month: 'Mar', cleaning: 70, electrical: 90, acRepair: 95, plumbing: 75 },
    { month: 'Apr', cleaning: 75, electrical: 95, acRepair: 100, plumbing: 80 },
    { month: 'May', cleaning: 80, electrical: 90, acRepair: 95, plumbing: 85 },
    { month: 'Jun', cleaning: 85, electrical: 75, acRepair: 70, plumbing: 98 },
  ];

  const handleExecuteAllocation = () => {
    setAllocationDone(true);
    setTimeout(() => {
      alert('AI Workforce Rebalancing Plan executed: 65 standby craftsmen dispatched to surge deficit hotspots via SMS & Cooperative notifications.');
    }, 500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
            <span>PREDICTIVE WORKFORCE INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            AI-Based Demand Forecasting & Workforce Allocation
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-2xl">
            Statistical & machine learning models predict trade deficits and guide federation workforce deployment before peak surges.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
          <span className="text-[10px] uppercase font-bold text-white/80 block">AI Confidence Score</span>
          <span className="text-3xl font-black text-[#D4A843]">94.2%</span>
        </div>
      </div>

      {/* AI Parameter Controls */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#C45C3C]" />
          <h3 className="font-bold text-xs text-[#2B2B2B] uppercase tracking-wider">AI Simulation Multipliers</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="font-bold text-[#4A4A4A] flex justify-between">
              <span>Monsoon Seepage Severity Index</span>
              <strong className="text-[#2D6A4F]">{monsoonIndex}x</strong>
            </label>
            <input
              type="range"
              min="0.8"
              max="2.0"
              step="0.1"
              value={monsoonIndex}
              onChange={(e) => setMonsoonIndex(Number(e.target.value))}
              className="w-full mt-2 accent-[#2D6A4F] cursor-pointer"
            />
          </div>

          <div>
            <label className="font-bold text-[#4A4A4A] flex justify-between">
              <span>Diwali / Festival Cleaning Surge Multiplier</span>
              <strong className="text-[#C45C3C]">{festivalSurge}x</strong>
            </label>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.05"
              value={festivalSurge}
              onChange={(e) => setFestivalSurge(Number(e.target.value))}
              className="w-full mt-2 accent-[#C45C3C] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Hotspots Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C45C3C]">Real-Time Hotspot Analysis</span>
            <h2 className="text-lg font-black text-[#2B2B2B]">14-Day Demand vs Supply Deficit Hotspots</h2>
          </div>

          <button
            onClick={handleExecuteAllocation}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              allocationDone
                ? 'bg-[#D1FAE5] text-[#2D6A4F] border border-[#2D6A4F]/30'
                : 'bg-[#C45C3C] hover:bg-[#A34A2E] text-white shadow-md active:scale-95'
            }`}
          >
            {allocationDone ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Rebalancing Plan Active</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Execute AI Rebalancing Plan</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotspots.map((h, i) => (
            <div key={i} className="p-4 rounded-2xl border border-[#E8DFD8] bg-[#FAF5EE]/70 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#2B2B2B] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#C45C3C]" /> {h.district}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    h.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-[#FEF3C7] text-[#9C7016]'
                  }`}>
                    {h.risk} Risk
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-white rounded-xl border border-[#E8DFD8] text-xs">
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Trade</span>
                    <strong className="text-[#2B2B2B]">{h.trade}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Available</span>
                    <strong className="text-[#2D6A4F]">{h.currentSupply}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#8C827A] block">Predicted</span>
                    <strong className="text-red-600">{h.predictedDemand}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8DFD8] flex items-start gap-2 text-xs text-[#2D6A4F] font-semibold">
                <BrainCircuit className="w-4 h-4 shrink-0 mt-0.5" />
                <span>AI Recommendation: {h.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#2B2B2B]">Intraday Booking Demand vs Capacity</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C45C3C" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C45C3C" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE1" />
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="#8C827A" />
                <YAxis tick={{ fontSize: 11 }} stroke="#8C827A" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFDF9', borderRadius: '12px', border: '1px solid #E8DFD8', fontSize: '11px' }} />
                <Area type="monotone" dataKey="projectedDemand" name="Projected Demand" stroke="#C45C3C" strokeWidth={2} fillOpacity={1} fill="url(#colorProjected)" />
                <Area type="monotone" dataKey="bookings" name="Confirmed Bookings" stroke="#2D6A4F" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#2B2B2B]">6-Month Seasonal Trade Demand Projections</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonalTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EAE1" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#8C827A" />
                <YAxis tick={{ fontSize: 11 }} stroke="#8C827A" />
                <Tooltip contentStyle={{ backgroundColor: '#FFFDF9', borderRadius: '12px', border: '1px solid #E8DFD8', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="acRepair" name="AC Repair" fill="#D4A843" radius={[4, 4, 0, 0]} />
                <Bar dataKey="plumbing" name="Plumbing" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cleaning" name="Cleaning" fill="#C45C3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

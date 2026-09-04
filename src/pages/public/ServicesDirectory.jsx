import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  Award,
  ArrowRight,
  MapPin,
  Sparkles,
  SlidersHorizontal,
  PackageCheck
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function ServicesDirectory() {
  const store = getStore();
  const [selectedTrade, setSelectedTrade] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('hourly'); // 'hourly' or 'package'

  // Turnkey packages data
  const turnkeyPackages = [
    { title: 'Full 2BHK Deep Electrical & Wiring Audit', trade: 'Electrician', price: 2400, duration: '4-5 Hours', includes: ['DB Box Load Balancing', 'Concealed Wire Earth Leakage Test', 'Switchboard Repair', 'Safety Certificate'] },
    { title: 'Monsoon Proofing & Bathroom Plumbing Overhaul', trade: 'Plumber', price: 1800, duration: '3 Hours', includes: ['Drainage Jet Flush', 'Seepage Detection', 'Angle Valve Replacement', 'Pressure Pump Check'] },
    { title: 'Complete House Painting Prep & Anti-Damp Treatment', trade: 'Painter', price: 3800, duration: '1 Day', includes: ['Sanding & Putty Fill', 'Primer Undercoat', 'Anti-Fungal Barrier', 'Eco-Shield Finish'] },
    { title: 'Modular Kitchen Hardware & Hinge Realignment', trade: 'Carpenter', price: 1500, duration: '3 Hours', includes: ['Hydraulic Hinge Tuning', 'Drawer Channel Grease', 'Handle Fitting', 'Level Balancing'] }
  ];

  const filteredWorkers = store.workers
    .filter(w => {
      const matchesTrade = selectedTrade === 'All' || w.trade === selectedTrade;
      const matchesDistrict = selectedDistrict === 'All' || w.district === selectedDistrict;
      const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            w.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            w.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTrade && matchesDistrict && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price_desc') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'experience') return b.jobsCompleted - a.jobsCompleted;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-wider text-[#D4A843] bg-[#FEF3C7] px-3 py-1 rounded-full">
          VERIFIED GUILD CRAFTSMEN
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
          10 Trades. Zero Exploitation.
        </h1>
        <p className="text-sm sm:text-base text-[#665D56] leading-relaxed">
          Connect directly with certified craftsmen from state labour federations. Every service carries statutory minimum wage floors, 90% direct payout, and police verification.
        </p>

        {/* View Mode Toggle */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8]">
          <button
            onClick={() => setViewMode('hourly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'hourly' ? 'bg-[#2D6A4F] text-white shadow-2xs' : 'text-[#665D56] hover:text-[#2B2B2B]'
            }`}
          >
            Hourly Craftsmen Directory
          </button>
          <button
            onClick={() => setViewMode('package')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'package' ? 'bg-[#C45C3C] text-white shadow-2xs' : 'text-[#665D56] hover:text-[#2B2B2B]'
            }`}
          >
            Turnkey Package Solutions
          </button>
        </div>
      </div>

      {viewMode === 'hourly' ? (
        <>
          {/* Search, District & Sort Bar */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8DFD8] shadow-xs space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Keyword Search */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search skills, wiring, leakage, carpentry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF5EE] border border-[#E8DFD8] rounded-2xl text-xs font-semibold text-[#2B2B2B] focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              {/* District Filter */}
              <div>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FAF5EE] border border-[#E8DFD8] rounded-2xl text-xs font-bold text-[#2B2B2B] focus:outline-none cursor-pointer"
                >
                  <option value="All">All District Councils</option>
                  {store.districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#FAF5EE] border border-[#E8DFD8] rounded-2xl text-xs font-bold text-[#2B2B2B] focus:outline-none cursor-pointer"
                >
                  <option value="rating">Sort: Highest Rated (⭐ 5.0 &rarr; 4.0)</option>
                  <option value="price_asc">Sort: Rate (Low to High)</option>
                  <option value="price_desc">Sort: Rate (High to Low)</option>
                  <option value="distance">Sort: Nearest Distance (km)</option>
                  <option value="experience">Sort: Most Jobs Completed</option>
                </select>
              </div>
            </div>

            {/* 10 Trade Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F0EAE1]">
              <button
                onClick={() => setSelectedTrade('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedTrade === 'All'
                    ? 'bg-[#2D6A4F] text-white shadow-xs'
                    : 'bg-[#FAF5EE] text-[#5A524C] hover:bg-[#F0EAE1]'
                }`}
              >
                All 10 Trades ({store.workers.length})
              </button>
              {store.trades.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTrade(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedTrade === t
                      ? 'bg-[#2D6A4F] text-white shadow-xs'
                      : 'bg-[#FAF5EE] text-[#5A524C] hover:bg-[#F0EAE1]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Workers Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((w) => (
              <div
                key={w.id}
                className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
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
                    <span className="flex items-center gap-1 font-black text-xs text-[#D4A843] bg-[#FEF3C7] px-2 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{w.rating}</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#665D56] leading-relaxed line-clamp-2">
                    {w.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {w.skills.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-[#FAF5EE] text-[#4A4A4A] text-[10px] font-bold border border-[#E8DFD8]">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="p-3 rounded-2xl bg-[#FAF5EE] text-[11px] space-y-1">
                    <div className="text-[#2D6A4F] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{w.societyName}</span>
                    </div>
                    <div className="text-[#8C827A]">{w.jobsCompleted} jobs completed • {w.ownershipStake}% Cooperative Equity</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C827A] block font-bold uppercase">Fair Rate</span>
                    <strong className="text-sm text-[#2B2B2B]">{formatCurrency(w.hourlyRate)} / hr</strong>
                  </div>

                  <Link
                    to="/customer/book"
                    className="px-4 py-2 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Turnkey Packages Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {turnkeyPackages.map((pkg, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#D1FAE5] text-[#2D6A4F] text-[10px] font-black uppercase">
                    {pkg.trade} Squad Package
                  </span>
                  <span className="text-xs font-bold text-[#8C827A]">{pkg.duration}</span>
                </div>

                <h3 className="font-bold text-lg text-[#2B2B2B]">{pkg.title}</h3>

                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold text-[#4A4A4A] block">Package Inclusions:</span>
                  {pkg.includes.map((inc, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-[#665D56]">
                      <PackageCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C827A] uppercase font-bold block">Fixed Package Price</span>
                  <strong className="text-lg font-black text-[#2D6A4F]">{formatCurrency(pkg.price)}</strong>
                </div>

                <Link
                  to="/customer/book"
                  className="px-5 py-2.5 rounded-xl bg-[#C45C3C] text-white font-black text-xs hover:bg-[#A34A2E] flex items-center gap-1.5"
                >
                  <span>Book Turnkey Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

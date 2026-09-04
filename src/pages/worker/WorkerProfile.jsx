import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Award,
  Phone,
  Save,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { getStore, saveStore } from '../../data/mockStore';

export default function WorkerProfile() {
  const store = getStore();
  const worker = store.workers[0];

  const [name, setName] = useState(worker.name);
  const [bio, setBio] = useState(worker.bio);
  const [hourlyRate, setHourlyRate] = useState(worker.hourlyRate);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    saveStore((prev) => ({
      ...prev,
      workers: prev.workers.map(w => w.id === worker.id ? { ...w, name, bio, hourlyRate: Number(hourlyRate) } : w)
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 text-3xl flex items-center justify-center">
            {worker.avatar}
          </div>
          <div>
            <h1 className="text-2xl font-black">{name}</h1>
            <p className="text-xs text-white/80">{worker.trade} • {worker.skillLevel} • {worker.societyName}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
          Craftsman Profile & Bio Settings
        </h3>

        {saved && (
          <div className="p-3 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile and rates updated successfully!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Public Bio / Craftsmanship Experience</label>
            <textarea
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] text-xs text-[#2B2B2B] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Base Hourly Rate (₹ / hr)</label>
            <input
              type="number"
              min="200"
              max="2000"
              required
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
}

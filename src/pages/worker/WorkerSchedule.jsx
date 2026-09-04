import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Save,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { getStore, saveStore } from '../../data/mockStore';

export default function WorkerSchedule() {
  const store = getStore();
  const worker = store.workers[0];
  const [isAvailableNow, setIsAvailableNow] = useState(worker.status === 'available');
  const [saved, setSaved] = useState(false);

  const [days, setDays] = useState([
    { day: 'Monday', morning: true, afternoon: true, evening: false },
    { day: 'Tuesday', morning: true, afternoon: true, evening: true },
    { day: 'Wednesday', morning: true, afternoon: true, evening: false },
    { day: 'Thursday', morning: true, afternoon: true, evening: true },
    { day: 'Friday', morning: true, afternoon: true, evening: false },
    { day: 'Saturday', morning: true, afternoon: true, evening: true },
    { day: 'Sunday', morning: false, afternoon: false, evening: false },
  ]);

  const toggleSlot = (index, slot) => {
    const updated = [...days];
    updated[index][slot] = !updated[index][slot];
    setDays(updated);
  };

  const handleSave = () => {
    saveStore((prev) => ({
      ...prev,
      workers: prev.workers.map(w => w.id === worker.id ? { ...w, status: isAvailableNow ? 'available' : 'busy' } : w)
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>AVAILABILITY & ROSTER MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Weekly Working Hours & Live Duty Status
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Toggle your live status for instant 15-minute dispatch or set your recurring weekly time windows.
          </p>
        </div>
      </div>

      {/* Live On-Duty Toggle */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm flex items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-sm text-[#2B2B2B]">Real-Time On-Duty Status</h3>
          <p className="text-xs text-[#665D56]">Turn ON to receive immediate radar matching and 15-minute emergency dispatches.</p>
        </div>

        <button
          onClick={() => setIsAvailableNow(!isAvailableNow)}
          className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            isAvailableNow
              ? 'bg-[#2D6A4F] text-white shadow-md'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isAvailableNow ? '● ACTIVE (ON-DUTY)' : '○ OFF-DUTY'}
        </button>
      </div>

      {/* Weekly Slots Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
          <h3 className="font-bold text-base text-[#2B2B2B]">Weekly Working Slot Schedule</h3>
          {saved && (
            <span className="text-xs font-bold text-[#2D6A4F] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Schedule saved!
            </span>
          )}
        </div>

        <div className="space-y-3">
          {days.map((d, idx) => (
            <div key={d.day} className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="font-bold text-[#2B2B2B] w-28">{d.day}</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleSlot(idx, 'morning')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                    d.morning ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#736B63] border border-[#E8DFD8]'
                  }`}
                >
                  Morning (09-12)
                </button>
                <button
                  type="button"
                  onClick={() => toggleSlot(idx, 'afternoon')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                    d.afternoon ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#736B63] border border-[#E8DFD8]'
                  }`}
                >
                  Afternoon (13-16)
                </button>
                <button
                  type="button"
                  onClick={() => toggleSlot(idx, 'evening')}
                  className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer transition-all ${
                    d.evening ? 'bg-[#2D6A4F] text-white' : 'bg-white text-[#736B63] border border-[#E8DFD8]'
                  }`}
                >
                  Evening (17-20)
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Availability Schedule</span>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Settings,
  Building2,
  Save,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { getStore } from '../../data/mockStore';

export default function CouncilSettings() {
  const store = getStore();
  const [districtName, setDistrictName] = useState('Mumbai Cooperative Council');
  const [quorumTarget, setQuorumTarget] = useState(1500);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <h1 className="text-2xl font-black">District Jurisdiction Settings</h1>
        <p className="text-xs text-white/80">Configure semi-independent district council bylaws and quorum thresholds.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
          Council Governance Configuration
        </h3>

        {saved && (
          <div className="p-3 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>District council settings updated!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Council Jurisdiction Name</label>
            <input
              type="text"
              required
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-[#4A4A4A] block mb-1">Standard Legislative Quorum Threshold (Votes)</label>
            <input
              type="number"
              required
              value={quorumTarget}
              onChange={(e) => setQuorumTarget(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Council Settings</span>
        </button>
      </form>
    </div>
  );
}

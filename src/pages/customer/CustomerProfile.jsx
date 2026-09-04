import React, { useState } from 'react';
import {
  User,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Save,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function CustomerProfile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Neha Agarwal');
  const [phone, setPhone] = useState(user?.phone || '+91 98101 23456');
  const [address, setAddress] = useState(user?.address || 'B-4/12, Vasant Vihar, New Delhi');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] rounded-3xl p-6 sm:p-8 text-white shadow-lg space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-white/20 text-3xl flex items-center justify-center">
            {user?.avatar || '👩'}
          </div>
          <div>
            <h1 className="text-2xl font-black">{name}</h1>
            <p className="text-xs text-white/80">Customer Account • Delhi Cooperative District</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
        <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
          Profile Information & Saved Address
        </h3>

        {saved && (
          <div className="p-3 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile details updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
            <label className="font-bold text-[#4A4A4A] block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-[#4A4A4A] block mb-1">Default Service Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] font-bold text-[#2B2B2B] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Profile Preferences</span>
        </button>
      </form>
    </div>
  );
}

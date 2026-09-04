import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Radio,
  Sparkles,
  CreditCard,
  Camera,
  Mic,
  Plus,
  Check
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function CustomerBook() {
  const navigate = useNavigate();
  const store = getStore();

  const [selectedTrade, setSelectedTrade] = useState('Electrician');
  const [selectedDate, setSelectedDate] = useState('2026-09-04');
  const [selectedSlot, setSelectedSlot] = useState('Morning (09:00 - 12:00)');
  const [address, setAddress] = useState('B-4/12, Vasant Vihar, New Delhi');
  const [paymentMethod, setPaymentMethod] = useState('UPI (Google Pay / PhonePe)');
  const [hours, setHours] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [photoAttached, setPhotoAttached] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);

  const availableAddons = [
    { id: 'plumbing_diag', name: 'Plumbing Seepage & Pipe Inspection', price: 250, trade: 'Plumber' },
    { id: 'carpentry_hinge', name: 'Door / Cabinet Hinge Alignment', price: 200, trade: 'Carpenter' },
    { id: 'anti_damp', name: 'Wall Dampness Moisture Test', price: 150, trade: 'Painter' }
  ];

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const matchedWorker = store.workers.find(w => w.trade === selectedTrade && w.status === 'available') || store.workers[0];
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalAmount = (matchedWorker.hourlyRate * hours) + addonsTotal;
  const workerPayout = totalAmount * 0.90;
  const welfareCut = totalAmount * 0.01;
  const societyCut = totalAmount * 0.09;

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      serviceTitle: `${selectedTrade} Service & Maintenance${selectedAddons.length ? ` (+${selectedAddons.length} Multi-Trade Add-ons)` : ''}`,
      trade: selectedTrade,
      customerId: 'usr-customer-1',
      customerName: 'Neha Agarwal',
      customerPhone: '+91 98101 23456',
      address: address,
      workerId: matchedWorker.id,
      workerName: matchedWorker.name,
      workerAvatar: matchedWorker.avatar,
      date: selectedDate,
      timeSlot: selectedSlot,
      status: 'Requested',
      isEmergency: false,
      isTeamJob: selectedAddons.length > 0,
      totalAmount: totalAmount,
      breakdown: {
        baseLabor: totalAmount,
        emergencySurge: 0,
        welfareContribution: welfareCut,
        societyShare: societyCut,
        workerPayout: workerPayout
      },
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod,
      invoiceId: 'INV-2026-' + Math.floor(10000 + Math.random() * 90000),
      customerRiskFlag: 'None (Trust Score: 4.9⭐)'
    };

    saveStore((prev) => ({
      ...prev,
      bookings: [newBooking, ...(prev.bookings || [])]
    }));

    navigate('/customer/bookings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>CUSTOMER SERVICE BOOKING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Schedule a Verified Cooperative Craftsman
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Choose your trade, add optional multi-skill combos, and confirm with safe escrow protection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Configuration Form */}
        <form onSubmit={handleCreateBooking} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
              1. Choose Trade & Service Duration
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {store.trades.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTrade(t)}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                    selectedTrade === t
                      ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-xs'
                      : 'bg-[#FAF5EE] text-[#4A4A4A] border-[#E8DFD8] hover:bg-[#F2ECE4]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Service Date</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl px-3 py-2 text-xs font-bold text-[#2B2B2B] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl px-3 py-2 text-xs font-bold text-[#2B2B2B] focus:outline-none cursor-pointer"
                >
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon (13:00 - 16:00)">Afternoon (13:00 - 16:00)</option>
                  <option value="Evening (17:00 - 20:00)">Evening (17:00 - 20:00)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Est. Duration: <strong className="text-[#2D6A4F]">{hours} Hours</strong></label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full mt-2 accent-[#2D6A4F]"
                />
              </div>
            </div>
          </div>

          {/* Optional Multi-Trade Combo Add-ons */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2 flex items-center justify-between">
              <span>Optional Multi-Trade Combo Add-ons</span>
              <span className="text-[10px] text-[#2D6A4F] font-bold">Turnkey Multi-Skill Squad</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availableAddons.map((addon) => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-[#D1FAE5] border-[#2D6A4F] text-[#1B4332]'
                        : 'bg-[#FAF5EE] border-[#E8DFD8] text-[#4A4A4A] hover:bg-[#F2ECE4]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-bold">
                        <span>{addon.trade}</span>
                        <span>+{formatCurrency(addon.price)}</span>
                      </div>
                      <p className="text-[11px] text-[#665D56] mt-1">{addon.name}</p>
                    </div>
                    <span className="text-[10px] font-bold flex items-center gap-1">
                      {isSelected ? <Check className="w-3.5 h-3.5 text-[#2D6A4F]" /> : <Plus className="w-3.5 h-3.5 text-[#8C827A]" />}
                      <span>{isSelected ? 'Added to Booking' : 'Add Checkup'}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Photo & Audio Diagnosis Attachment */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
              Optional Issue Diagnosis (Photo / Audio Voice Note)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => setPhotoAttached(!photoAttached)}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  photoAttached ? 'bg-[#D1FAE5] border-[#2D6A4F] text-[#1B4332]' : 'bg-[#FAF5EE] border-[#E8DFD8] text-[#5A524C]'
                }`}
              >
                <Camera className="w-4 h-4 text-[#C45C3C]" />
                <span>{photoAttached ? '✓ Photo Attached (switchboard.jpg)' : 'Attach Issue Photo / Video'}</span>
              </button>

              <button
                type="button"
                onClick={() => setAudioRecorded(!audioRecorded)}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-all ${
                  audioRecorded ? 'bg-[#D1FAE5] border-[#2D6A4F] text-[#1B4332]' : 'bg-[#FAF5EE] border-[#E8DFD8] text-[#5A524C]'
                }`}
              >
                <Mic className="w-4 h-4 text-[#2D6A4F]" />
                <span>{audioRecorded ? '✓ Voice Note Recorded (0:24s)' : 'Record Voice Note in Vernacular'}</span>
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
              2. Service Location & Escrow Payment
            </h3>

            <div>
              <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Service Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl px-3 py-2 text-xs font-bold text-[#2B2B2B] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              {['UPI (Google Pay / PhonePe)', 'Credit / Debit Card', 'Secure Escrow Wallet'].map((m) => (
                <label
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === m
                      ? 'bg-[#D1FAE5] border-[#2D6A4F] text-[#1B4332] font-black'
                      : 'bg-[#FAF5EE] border-[#E8DFD8] text-[#5A524C]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === m}
                    onChange={() => setPaymentMethod(m)}
                    className="accent-[#2D6A4F]"
                  />
                  <span>{m}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-black text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Confirm & Deposit to Escrow ({formatCurrency(totalAmount)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Real-time Order Summary Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
              Transparent Escrow Summary
            </h3>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5EE] text-2xl flex items-center justify-center border border-[#E8DFD8]">
                {matchedWorker.avatar}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#2B2B2B]">{matchedWorker.name}</h4>
                <p className="text-xs text-[#C45C3C] font-bold">{matchedWorker.trade} • {matchedWorker.skillLevel}</p>
                <span className="text-[10px] text-[#2D6A4F] font-bold">{matchedWorker.societyName}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-[#F0EAE1]">
              <div className="flex justify-between text-[#665D56]">
                <span>Base Labor ({hours} hrs @ {formatCurrency(matchedWorker.hourlyRate)}):</span>
                <strong>{formatCurrency(matchedWorker.hourlyRate * hours)}</strong>
              </div>

              {selectedAddons.map(a => (
                <div key={a.id} className="flex justify-between text-[#2D6A4F] font-semibold">
                  <span>+ {a.name}:</span>
                  <strong>{formatCurrency(a.price)}</strong>
                </div>
              ))}

              <div className="flex justify-between text-base font-black text-[#2B2B2B] pt-2 border-t border-[#F0EAE1]">
                <span>Total Escrow Amount:</span>
                <span className="text-[#2D6A4F]">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            {/* Split Breakdown */}
            <div className="p-3.5 bg-[#FAF5EE] rounded-2xl space-y-1.5 text-[11px]">
              <span className="font-bold text-[#2B2B2B] block">Cooperative Revenue Routing:</span>
              <div className="flex justify-between text-[#2D6A4F] font-bold">
                <span>90% Direct Worker Payout:</span>
                <span>{formatCurrency(workerPayout)}</span>
              </div>
              <div className="flex justify-between text-[#C45C3C]">
                <span>1% Universal Welfare Pool:</span>
                <span>{formatCurrency(welfareCut)}</span>
              </div>
              <div className="flex justify-between text-[#736B63]">
                <span>9% Primary Society Fund:</span>
                <span>{formatCurrency(societyCut)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

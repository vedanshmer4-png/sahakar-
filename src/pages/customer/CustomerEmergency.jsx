import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Clock,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Radio,
  PhoneCall,
  Activity
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function CustomerEmergency() {
  const navigate = useNavigate();
  const store = getStore();

  const [selectedHazard, setSelectedHazard] = useState('Electrical Short Circuit / Fire Hazard');
  const [address, setAddress] = useState('B-4/12, Vasant Vihar, New Delhi');
  const [dispatched, setDispatched] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(884); // 14m 44s
  const [showSosModal, setShowSosModal] = useState(false);

  useEffect(() => {
    let timer;
    if (dispatched && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [dispatched, secondsLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const emergencyHazards = [
    { name: 'Electrical Short Circuit / Fire Hazard', trade: 'Electrician', baseRate: 500, surge: 150, eta: '12 Mins' },
    { name: 'Burst Main Pipe / Severe Bathroom Flooding', trade: 'Plumber', baseRate: 450, surge: 150, eta: '14 Mins' },
    { name: 'Emergency Elder Patient Caregiver Assistance', trade: 'Caregiver', baseRate: 600, surge: 100, eta: '15 Mins' },
    { name: 'Lockout / Broken Security Door Mechanism', trade: 'Carpenter', baseRate: 450, surge: 100, eta: '15 Mins' },
  ];

  const currentHazard = emergencyHazards.find(h => h.name === selectedHazard) || emergencyHazards[0];
  const totalAmount = currentHazard.baseRate + currentHazard.surge;

  const handleTriggerDispatch = (e) => {
    e.preventDefault();
    const newEmergencyBooking = {
      id: 'EMG-' + Math.floor(100 + Math.random() * 900),
      serviceTitle: `🚨 15-Min Emergency: ${selectedHazard}`,
      trade: currentHazard.trade,
      customerId: 'usr-customer-1',
      customerName: 'Neha Agarwal',
      customerPhone: '+91 98101 23456',
      address: address,
      workerId: 'w1',
      workerName: 'Rajesh Kumar (Guild Master)',
      workerAvatar: '⚡',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Immediate (15-Min Fast Track)',
      status: 'In Progress',
      isEmergency: true,
      isTeamJob: false,
      totalAmount: totalAmount,
      breakdown: {
        baseLabor: currentHazard.baseRate,
        emergencySurge: currentHazard.surge,
        welfareContribution: totalAmount * 0.01,
        societyShare: totalAmount * 0.09,
        workerPayout: totalAmount * 0.90
      },
      paymentStatus: 'Escrow Frozen',
      paymentMethod: 'Instant UPI Escrow',
      invoiceId: 'INV-EMG-' + Math.floor(1000 + Math.random() * 9000),
      customerRiskFlag: 'Verified Customer (Trust Score: 4.9⭐)'
    };

    saveStore((prev) => ({
      ...prev,
      bookings: [newEmergencyBooking, ...(prev.bookings || [])]
    }));

    setDispatched(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#991B1B] via-red-700 to-[#7F1D1D] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-yellow-300 text-xs font-black mb-2">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>24x7 PRIORITY EMERGENCY DISPATCH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            15-Minute Critical Hazard Fast-Track
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1">
            Immediate dispatch for hazardous electrical sparking, flooding leaks, lockouts, and emergency care.
          </p>
        </div>

        <button
          onClick={() => setShowSosModal(true)}
          className="px-4 py-2 rounded-xl bg-white text-red-700 font-black text-xs hover:bg-gray-100 flex items-center gap-1.5 shrink-0 shadow-lg cursor-pointer"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Call 24x7 SOS Desk</span>
        </button>
      </div>

      {!dispatched ? (
        <form onSubmit={handleTriggerDispatch} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="space-y-4 text-xs">
            <label className="font-bold text-[#2B2B2B] text-sm block">1. Select Emergency Hazard Category</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencyHazards.map((h) => (
                <div
                  key={h.name}
                  onClick={() => setSelectedHazard(h.name)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                    selectedHazard === h.name
                      ? 'bg-red-50 border-red-500 shadow-2xs'
                      : 'bg-[#FAF5EE] border-[#E8DFD8] hover:bg-[#F2ECE4]'
                  }`}
                >
                  <div className="space-y-1">
                    <strong className="block text-[#2B2B2B] font-bold">{h.name}</strong>
                    <span className="text-[10px] text-[#2D6A4F] font-bold">Guaranteed Arrival: {h.eta}</span>
                  </div>
                  <div className="text-right">
                    <strong className="text-sm font-black text-red-700">{formatCurrency(h.baseRate + h.surge)}</strong>
                    <span className="text-[10px] text-[#8C827A] block">(Incl. Hazard Gear)</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="font-bold text-[#4A4A4A] block mb-1">Service Address (Emergency Unit)</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl px-3 py-2 font-bold text-[#2B2B2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>Dispatch Closest Master Craftsman Now ({formatCurrency(totalAmount)})</span>
          </button>
        </form>
      ) : (
        /* Active Live Countdown & GPS Dispatch Progression */
        <div className="bg-white rounded-3xl p-8 border-2 border-red-500 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black animate-pulse">
            <Radio className="w-4 h-4" />
            <span>DISPATCH LIVE: ON THE WAY</span>
          </div>

          {/* Countdown Clock */}
          <div className="space-y-1">
            <span className="text-xs text-[#8C827A] uppercase font-bold">Estimated Arrival Countdown</span>
            <div className="text-5xl sm:text-6xl font-black font-mono text-red-600 tracking-wider">
              {formatTime(secondsLeft)}
            </div>
            <p className="text-xs text-[#2D6A4F] font-bold">Rajesh Kumar (Master Electrician) is 1.2 km away on GPS</p>
          </div>

          {/* Stepper Progression */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] text-xs font-bold text-left">
            <div className="flex items-center gap-2 text-[#2D6A4F]">
              <span>✓ 1. Dispatched</span>
            </div>
            <div className="flex items-center gap-2 text-[#C45C3C]">
              <span>● 2. In Transit (GPS Active)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>3. On-Site Hazard Fix</span>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => navigate('/customer/bookings')}
              className="px-6 py-2.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold hover:bg-[#1B4332]"
            >
              Go to My Bookings Ledger
            </button>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md text-center space-y-4 shadow-2xl border border-red-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xl mx-auto">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#2B2B2B]">24x7 Cooperative SOS Helpline</h3>
            <p className="text-xs text-[#665D56]">Direct link with Delhi & National Federation Emergency Dispatch Central.</p>
            <div className="text-2xl font-black text-red-600 font-mono bg-red-50 p-3 rounded-xl">
              1800-SAHAKAR (1800-724-2527)
            </div>
            <button
              onClick={() => setShowSosModal(false)}
              className="w-full py-2.5 bg-gray-100 rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserCheck,
  Star,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import RiskFlag from '../components/RiskFlag';
import { services, workers, customers, formatCurrency } from '../data/mockData';

export default function CustomerFlow() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('book'); // 'book', 'mutual-rating', 'worker-inbox'
  const [selectedService, setSelectedService] = useState(services[0]);
  const [bookingPlaced, setBookingPlaced] = useState(false);

  // Ratings state for mutual rating demonstration
  const [customerRatingForWorker, setCustomerRatingForWorker] = useState(5);
  const [workerRatingForCustomer, setWorkerRatingForCustomer] = useState(4);
  const [mutualRatingSubmitted, setMutualRatingSubmitted] = useState(false);

  const activeWorker = workers[0]; // Rajesh Kumar
  const demoCustomer = customers[0]; // Neha Agarwal

  const handleBook = () => {
    setBookingPlaced(true);
  };

  const handleMutualSubmit = (e) => {
    e.preventDefault();
    setMutualRatingSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#40916C]/20 border border-[#40916C]/40 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Pillar 04 • Bidirectional Mutual Trust
          </div>
          <h1 className="text-3xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
            Customer Experience & Mutual Trust Flow
          </h1>
          <p className="text-xs sm:text-sm text-[#736B63] mt-1">
            {t('customer.mutualTrust')}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-2xl border border-[#E8DFD8] shadow-sm text-xs font-bold">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'book'
                ? 'bg-[#C45C3C] text-white'
                : 'text-[#736B63] hover:text-[#2B2B2B]'
            }`}
          >
            1. Book Service
          </button>
          <button
            onClick={() => setActiveTab('mutual-rating')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'mutual-rating'
                ? 'bg-[#C45C3C] text-white'
                : 'text-[#736B63] hover:text-[#2B2B2B]'
            }`}
          >
            2. Mutual Rating
          </button>
          <button
            onClick={() => setActiveTab('worker-inbox')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'worker-inbox'
                ? 'bg-[#C45C3C] text-white'
                : 'text-[#736B63] hover:text-[#2B2B2B]'
            }`}
          >
            3. Worker Request Guard
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: SERVICE BOOKING FLOW                                  */}
      {/* ============================================================ */}
      {activeTab === 'book' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm">
            <h2 className="text-xl font-bold text-[#2B2B2B] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Select a Verified Co-op Service
            </h2>
            <p className="text-xs text-[#736B63] mb-6">
              When you hire on Sahakar, 90% goes straight to the craftsman and 1% protects their family via the emergency welfare pool.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => setSelectedService(svc)}
                  className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                    selectedService.id === svc.id
                      ? 'bg-[#FFF8F0] border-2 border-[#C45C3C] shadow-md scale-102'
                      : 'bg-[#FAF5EE] border-[#E8DFD8] hover:border-[#C45C3C]/40'
                  }`}
                >
                  <span className="text-3xl block mb-1">{svc.icon}</span>
                  <span className="text-xs font-bold text-[#2B2B2B] block">{svc.name}</span>
                  <span className="text-[10px] text-[#736B63] mt-1 block">Starts at ₹{svc.startingPrice}</span>
                </div>
              ))}
            </div>

            {/* Selected Service Detail Card */}
            <div className="p-5 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8DFD8] flex items-center justify-center text-2xl shadow-sm">
                  {selectedService.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2B2B2B]">
                    {selectedService.name} (Dispatched from {activeWorker.city} Co-op)
                  </h3>
                  <p className="text-xs text-[#2D6A4F] font-semibold mt-0.5">
                    Assigned Master Craftsman: {activeWorker.name} (★ {activeWorker.rating})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] text-[#8C827A] block">Standard Fixed Quote:</span>
                  <span className="text-xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                    ₹{selectedService.startingPrice}
                  </span>
                </div>

                <button
                  onClick={handleBook}
                  disabled={bookingPlaced}
                  className={`px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    bookingPlaced
                      ? 'bg-[#2D6A4F] text-white'
                      : 'bg-[#C45C3C] text-white hover:bg-[#A34A2E] active:scale-95'
                  }`}
                >
                  {bookingPlaced ? '✓ Booking Dispatched!' : t('customer.book')}
                </button>
              </div>
            </div>

            {bookingPlaced && (
              <div className="mt-4 p-4 rounded-2xl bg-[#D1FAE5] border border-[#2D6A4F] text-[#1B4332] text-xs font-semibold flex items-center justify-between animate-fade-in-up">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                  <span>
                    Booking #SHK-BK-9821 confirmed! ₹{(selectedService.startingPrice * 0.01).toFixed(0)} automatically allocated to the Welfare Emergency Pool.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('mutual-rating')}
                  className="underline font-bold text-[#1B4332] hover:text-[#2D6A4F] shrink-0 ml-2"
                >
                  Jump to Mutual Rating Demo →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: BIDIRECTIONAL MUTUAL RATING FLOW                      */}
      {/* ============================================================ */}
      {activeTab === 'mutual-rating' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-6">
          <div className="border-b border-[#E8DFD8] pb-4">
            <h2 className="text-2xl font-black text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              Completed Job: Mutual Trust Exchange
            </h2>
            <p className="text-xs text-[#736B63] mt-1">
              On traditional platforms, customers hold all rating leverage. On Sahakar, trust is a two-way street.
            </p>
          </div>

          {mutualRatingSubmitted ? (
            <div className="p-8 text-center space-y-3 bg-[#F0FDF4] rounded-3xl border border-[#2D6A4F]">
              <CheckCircle2 className="w-14 h-14 text-[#2D6A4F] mx-auto" />
              <h3 className="text-xl font-bold text-[#2B2B2B]">
                Mutual Ratings Sealed onto Co-op Ledger!
              </h3>
              <p className="text-xs text-[#736B63] max-w-md mx-auto">
                Worker Rajesh Kumar's portable reputation score increased to <strong>4.82</strong>.
                Customer Neha Agarwal's verified trust rating updated to <strong>4.75</strong>.
              </p>
              <button
                onClick={() => setMutualRatingSubmitted(false)}
                className="mt-2 px-4 py-2 rounded-xl bg-[#2D6A4F] text-white text-xs font-bold"
              >
                Reset Rating Demo
              </button>
            </div>
          ) : (
            <form onSubmit={handleMutualSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Customer Rates Worker */}
                <div className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C45C3C]">
                    <span>Step 1: Customer Rates Worker</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activeWorker.avatar}</span>
                    <div>
                      <h4 className="text-base font-bold text-[#2B2B2B]">{activeWorker.name}</h4>
                      <p className="text-xs text-[#736B63]">{activeWorker.trade} • {activeWorker.level}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Quality & Craftsmanship:</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setCustomerRatingForWorker(star)}
                          className="text-[#D4A843] hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= customerRatingForWorker ? 'fill-current' : 'text-[#D5C9BD]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#736B63] ml-2">
                        {customerRatingForWorker} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Customer Feedback Note:</label>
                    <textarea
                      rows="2"
                      defaultValue="Punctual, brought own safety gear, clean wiring without any mess."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD8] text-xs text-[#2B2B2B] focus:outline-none"
                    />
                  </div>
                </div>

                {/* 2. Worker Rates Customer */}
                <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#2D6A4F]/30 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                    <span>Step 2: Worker Rates Customer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{demoCustomer.avatar}</span>
                    <div>
                      <h4 className="text-base font-bold text-[#2B2B2B]">{demoCustomer.name}</h4>
                      <p className="text-xs text-[#2D6A4F] font-semibold">Verified Co-op Client</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Prompt Payment & Respectful Environment:</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setWorkerRatingForCustomer(star)}
                          className="text-[#D4A843] hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= workerRatingForCustomer ? 'fill-current' : 'text-[#D5C9BD]'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#736B63] ml-2">
                        {workerRatingForCustomer} of 5 Stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#4A4A4A] block mb-1">Worker's Private Feedback on Client:</label>
                    <textarea
                      rows="2"
                      defaultValue="Immediate UPI payment upon work completion, offered water, respectful treatment."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E8DFD8] text-xs text-[#2B2B2B] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#2D6A4F] text-white text-xs font-black hover:bg-[#1B4332] shadow-md transition-all active:scale-95"
                >
                  Submit Bidirectional Ratings & Update Scores
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: WORKER REQUEST SCREEN WITH CONSTRUCTIVE RISK FLAGS     */}
      {/* ============================================================ */}
      {activeTab === 'worker-inbox' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
              Worker's Job Request Inbox with Safety & Payment Guard
            </h2>
            <p className="text-xs text-[#736B63] mt-1">
              Workers can review customer history before accepting — constructive risk flags alert you to potential payment delays without punitive blacklisting.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {customers.map((cust) => (
              <div
                key={cust.id}
                className="p-4 rounded-2xl border border-[#E8DFD8] bg-[#FAF5EE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#C45C3C]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EADECF] flex items-center justify-center text-xl shrink-0">
                    {cust.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#2B2B2B]">{cust.name}</span>
                      <span className="text-xs text-[#736B63] font-semibold flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-[#D4A843] fill-current" /> {cust.rating}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#736B63]">
                      {cust.city} • {cust.jobsPosted} jobs booked on Sahakar
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <RiskFlag flags={cust.flags} paymentHistory={cust.paymentHistory} />
                  <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#C45C3C] text-white hover:bg-[#A34A2E] shadow-sm">
                    Accept Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

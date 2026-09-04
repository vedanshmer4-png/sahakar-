import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Star,
  DollarSign,
  Phone,
  MessageSquare,
  Key,
  Send,
  X
} from 'lucide-react';
import { getStore, saveStore, formatCurrency } from '../../data/mockStore';

export default function CustomerBookings() {
  const [store, setStore] = useState(getStore());
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [chatBooking, setChatBooking] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'worker', text: 'Namaste ji! I have packed the DB repair kit and am on my way.', time: '10:14 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [otpBooking, setOtpBooking] = useState(null);

  const bookings = store.bookings || [];

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Active') return ['Requested', 'Accepted', 'In Progress'].includes(b.status);
    if (activeTab === 'Completed') return b.status === 'Completed';
    return true;
  });

  const handleCancelBooking = (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel? 100% of your escrow payment will be refunded immediately.')) return;

    const updated = saveStore((prev) => ({
      ...prev,
      bookings: prev.bookings.map(b =>
        b.id === bookingId
          ? { ...b, status: 'Cancelled (Refunded)', paymentStatus: 'Refunded to Escrow' }
          : b
      )
    }));
    setStore(updated);
  };

  const handleRescheduleSubmit = (e) => {
    e.preventDefault();
    if (!newDate || !newSlot) return;

    const updated = saveStore((prev) => ({
      ...prev,
      bookings: prev.bookings.map(b =>
        b.id === selectedBookingForReschedule.id
          ? { ...b, date: newDate, timeSlot: newSlot, status: 'Accepted' }
          : b
      )
    }));
    setStore(updated);
    setSelectedBookingForReschedule(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: 'customer', text: newMessage, time: 'Just now' }]);
    setNewMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>CUSTOMER BOOKINGS LEDGER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            My Active & Past Service Bookings
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Track real-time craftsman arrival, communicate via masked chat, and view digital GST tax invoices.
          </p>
        </div>

        <Link
          to="/customer/book"
          className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all shrink-0"
        >
          + Book New Service
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Active', 'Completed'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === t ? 'bg-[#2D6A4F] text-white shadow-xs' : 'bg-white text-[#5A524C] border border-[#E8DFD8]'
            }`}
          >
            {t} Bookings
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.map((b) => (
          <div key={b.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD8] shadow-sm space-y-5">
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#F0EAE1] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#8C827A]">{b.id}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    b.status === 'Completed' ? 'bg-[#D1FAE5] text-[#2D6A4F]' :
                    b.status === 'In Progress' ? 'bg-[#FEF3C7] text-[#9C7016]' :
                    b.status.includes('Cancelled') ? 'bg-red-100 text-red-700' :
                    'bg-[#E0F2FE] text-[#0369A1]'
                  }`}>
                    ● {b.status}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-[#2B2B2B] mt-1">{b.serviceTitle}</h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#8C827A] uppercase font-bold block">Escrow Paid</span>
                <strong className="text-lg font-black text-[#2D6A4F]">{formatCurrency(b.totalAmount)}</strong>
              </div>
            </div>

            {/* Worker & Timing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
                <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Assigned Craftsman</span>
                <div className="flex items-center gap-2 font-bold text-[#2B2B2B]">
                  <span>{b.workerAvatar || '👨‍🔧'}</span>
                  <span>{b.workerName} ({b.trade})</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
                <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Scheduled Slot</span>
                <div className="flex items-center gap-1.5 font-bold text-[#2B2B2B]">
                  <Calendar className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>{b.date} • {b.timeSlot}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF5EE] border border-[#E8DFD8] space-y-1">
                <span className="text-[10px] text-[#8C827A] font-bold uppercase block">Service Address</span>
                <p className="text-[#665D56] truncate">{b.address}</p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                {/* Chat & Call Triggers */}
                {['Accepted', 'In Progress'].includes(b.status) && (
                  <>
                    <button
                      onClick={() => setChatBooking(b)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F0EAE1] text-xs font-bold text-[#2B2B2B] flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      <span>Masked Chat</span>
                    </button>

                    <button
                      onClick={() => setOtpBooking(b)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#D1FAE5] text-[#2D6A4F] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>View Start OTP (8921)</span>
                    </button>
                  </>
                )}

                <Link
                  to="/customer/invoices"
                  className="px-3.5 py-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F0EAE1] text-xs font-bold text-[#5A524C] flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>GST Tax Receipt</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                {['Requested', 'Accepted'].includes(b.status) && (
                  <>
                    <button
                      onClick={() => setSelectedBookingForReschedule(b)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#2B2B2B] cursor-pointer"
                    >
                      Reschedule
                    </button>

                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 cursor-pointer"
                    >
                      Cancel & Refund
                    </button>
                  </>
                )}

                {b.status === 'Completed' && (
                  <Link
                    to="/customer/ratings"
                    className="px-4 py-1.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs flex items-center gap-1"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Rate Quality</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Masked Chat Drawer / Modal */}
      {chatBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{chatBooking.workerAvatar || '👨‍🔧'}</span>
                <div>
                  <h3 className="font-bold text-xs text-[#2B2B2B]">{chatBooking.workerName} (Masked Call Active)</h3>
                  <span className="text-[10px] text-[#2D6A4F] font-bold">● On-Duty & Dispatched</span>
                </div>
              </div>
              <button onClick={() => setChatBooking(null)} className="p-1 rounded-lg text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Box */}
            <div className="h-60 overflow-y-auto p-3 bg-[#FAF5EE] rounded-2xl space-y-2 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2.5 rounded-xl max-w-[80%] ${
                    msg.sender === 'customer' ? 'bg-[#2D6A4F] text-white' : 'bg-white border border-[#E8DFD8] text-[#2B2B2B]'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-70 block text-right mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Send Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message (e.g. Landmark, gate code)..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-[#FAF5EE] border border-[#E8DFD8] rounded-xl text-xs focus:outline-none"
              />
              <button type="submit" className="p-2.5 bg-[#2D6A4F] text-white rounded-xl">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Start OTP Dialog */}
      {otpBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm text-center space-y-4 shadow-2xl border border-[#E8DFD8]">
            <div className="w-12 h-12 rounded-full bg-[#D1FAE5] text-[#2D6A4F] flex items-center justify-center text-xl mx-auto">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#2B2B2B]">Service Start OTP</h3>
            <p className="text-xs text-[#665D56]">Share this 4-digit code with {otpBooking.workerName} upon arrival to authorize the job start.</p>
            <div className="text-3xl font-black font-mono tracking-widest text-[#2D6A4F] bg-[#FAF5EE] p-4 rounded-2xl border border-[#E8DFD8]">
              8921
            </div>
            <button
              onClick={() => setOtpBooking(null)}
              className="w-full py-2.5 bg-[#2D6A4F] text-white rounded-xl text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {selectedBookingForReschedule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form onSubmit={handleRescheduleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-md space-y-4 shadow-2xl border border-[#E8DFD8]">
            <h3 className="font-bold text-base text-[#2B2B2B]">Reschedule Booking</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] text-xs font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-[#4A4A4A] block mb-1">New Time Slot</label>
                <select
                  required
                  value={newSlot}
                  onChange={(e) => setNewSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#E8DFD8] text-xs font-bold"
                >
                  <option value="">Select Slot</option>
                  <option value="Morning (09:00 - 12:00)">Morning (09:00 - 12:00)</option>
                  <option value="Afternoon (13:00 - 16:00)">Afternoon (13:00 - 16:00)</option>
                  <option value="Evening (17:00 - 20:00)">Evening (17:00 - 20:00)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBookingForReschedule(null)}
                className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#2D6A4F] text-white rounded-xl text-xs font-bold"
              >
                Confirm Reschedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

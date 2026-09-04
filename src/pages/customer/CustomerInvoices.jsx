import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function CustomerInvoices() {
  const store = getStore();
  const [selectedBooking, setSelectedBooking] = useState(store.bookings[0]);

  const totalAnnualSpend = store.bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  const handleDownloadAnnualReport = () => {
    alert(`Annual Tax & Cooperative Expenditure Statement (Total: ${formatCurrency(totalAnnualSpend)}) generated and downloaded as CSV.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>GST DIGITAL RECEIPTS & STATEMENTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Invoices & Annual Tax Statements
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Download itemized GST tax invoices and consolidated financial statements.
          </p>
        </div>

        <button
          onClick={handleDownloadAnnualReport}
          className="px-5 py-2.5 rounded-xl bg-[#D4A843] hover:bg-[#C29633] text-[#1B4332] font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Annual Statement (CSV)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookings List Selector */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-[#2B2B2B] border-b border-[#F0EAE1] pb-2">
            Completed Service Receipts
          </h3>

          <div className="space-y-2">
            {store.bookings.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBooking(b)}
                className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  selectedBooking?.id === b.id
                    ? 'bg-[#D1FAE5] border-[#2D6A4F] font-bold'
                    : 'bg-[#FAF5EE] border-[#E8DFD8] hover:bg-[#F2ECE4]'
                }`}
              >
                <div className="flex justify-between items-center text-[#2B2B2B]">
                  <span>{b.invoiceId || b.id}</span>
                  <strong className="text-[#2D6A4F]">{formatCurrency(b.totalAmount)}</strong>
                </div>
                <p className="text-[11px] text-[#665D56] mt-1">{b.serviceTitle}</p>
                <span className="text-[10px] text-[#8C827A] block">{b.date} • {b.paymentMethod}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Printable Digital GST Invoice Preview */}
        {selectedBooking && (
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-[#E8DFD8] shadow-sm space-y-6">
            <div className="flex items-start justify-between border-b border-[#E8DFD8] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C45C3C] to-[#2D6A4F] flex items-center justify-center text-white font-black text-sm">
                    सह
                  </div>
                  <span className="font-bold text-lg text-[#2B2B2B]">Sahakar Cooperative Invoice</span>
                </div>
                <p className="text-[10px] text-[#8C827A] mt-1">GSTIN: 07AAACS1234F1Z8 • Tax Invoice pursuant to Sec 31 CGST Act</p>
              </div>

              <div className="text-right text-xs">
                <strong className="text-[#2B2B2B] block">{selectedBooking.invoiceId}</strong>
                <span className="text-[#8C827A]">{selectedBooking.date}</span>
              </div>
            </div>

            {/* Billed To & Service Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-[#8C827A] uppercase font-bold block">Billed To Customer:</span>
                <strong className="text-[#2B2B2B]">{selectedBooking.customerName}</strong>
                <p className="text-[#665D56]">{selectedBooking.address}</p>
              </div>

              <div>
                <span className="text-[10px] text-[#8C827A] uppercase font-bold block">Assigned Verified Craftsman:</span>
                <strong className="text-[#2B2B2B]">{selectedBooking.workerName}</strong>
                <p className="text-[#665D56]">{selectedBooking.trade} (Cooperative Member)</p>
              </div>
            </div>

            {/* Itemized Breakdown Table */}
            <div className="border border-[#E8DFD8] rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#FAF5EE] border-b border-[#E8DFD8] text-[10px] font-bold text-[#736B63] uppercase">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  <tr>
                    <td className="p-3">
                      <strong>{selectedBooking.serviceTitle}</strong>
                      <span className="text-[10px] text-[#8C827A] block">Includes on-site diagnostic & labor</span>
                    </td>
                    <td className="p-3 text-right font-bold text-[#2B2B2B]">
                      {formatCurrency(selectedBooking.totalAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Transparent 90/1/9 Revenue Distribution Box */}
            <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#E8DFD8] space-y-2 text-xs">
              <span className="font-bold text-[#2B2B2B] block">Transparent Cooperative Fund Routing:</span>
              <div className="flex justify-between text-[#2D6A4F] font-semibold">
                <span>90% Direct Craftsman Wage:</span>
                <span>{formatCurrency(selectedBooking.totalAmount * 0.90)}</span>
              </div>
              <div className="flex justify-between text-[#C45C3C]">
                <span>1% Universal Welfare Pool (PMSBY & Medical):</span>
                <span>{formatCurrency(selectedBooking.totalAmount * 0.01)}</span>
              </div>
              <div className="flex justify-between text-[#736B63]">
                <span>9% Primary Society Fund (Tool Depot & Dispute Mediation):</span>
                <span>{formatCurrency(selectedBooking.totalAmount * 0.09)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-[#2B2B2B] flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

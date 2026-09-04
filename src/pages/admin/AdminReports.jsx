import React from 'react';
import {
  FileText,
  Download,
  Printer,
  Building2,
  CheckCircle2,
  DollarSign,
  HeartHandshake
} from 'lucide-react';
import { getStore, formatCurrency } from '../../data/mockStore';

export default function AdminReports() {
  const store = getStore();

  const handleExportCSV = (reportType) => {
    alert(`Exporting ${reportType} CSV statement for audit verification.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4A843] text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>STATUTORY AUDIT & COMPLIANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>
            Financial Statements & Regulatory Exports
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1">
            Generate CA-certified financial balance sheets, welfare fund disbursements, and tax filing logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#2D6A4F] uppercase">Annual Statement</span>
            <h3 className="font-bold text-base text-[#2B2B2B]">Gross GMV & Worker Payouts Ledger</h3>
            <p className="text-xs text-[#665D56]">Full ledger of 90% direct payouts, 1% welfare deductions, and primary society shares.</p>
          </div>
          <button
            onClick={() => handleExportCSV('Gross GMV & Payouts')}
            className="w-full py-2.5 rounded-xl bg-[#2D6A4F] text-white font-bold text-xs hover:bg-[#1B4332] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Download CA Audit CSV
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C45C3C] uppercase">Welfare Fund Audit</span>
            <h3 className="font-bold text-base text-[#2B2B2B]">Welfare Claims & Insurance Statement</h3>
            <p className="text-xs text-[#665D56]">Itemized log of PMSBY subsidized premiums and 412 emergency medical claim disbursements.</p>
          </div>
          <button
            onClick={() => handleExportCSV('Welfare Fund & Insurance')}
            className="w-full py-2.5 rounded-xl bg-[#C45C3C] text-white font-bold text-xs hover:bg-[#A34A2E] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Welfare Log
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD8] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#D4A843] uppercase">Cooperative Registry</span>
            <h3 className="font-bold text-base text-[#2B2B2B]">Worker Equity Registry (0.12%)</h3>
            <p className="text-xs text-[#665D56]">Official shareholder register of active guild craftsmen for annual general meeting (AGM) filings.</p>
          </div>
          <button
            onClick={() => handleExportCSV('Worker Equity Registry')}
            className="w-full py-2.5 rounded-xl bg-[#D4A843] text-[#1B4332] font-black text-xs hover:bg-[#C29633] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export Equity Register
          </button>
        </div>
      </div>
    </div>
  );
}

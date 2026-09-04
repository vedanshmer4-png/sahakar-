import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import LanguageBridge from './LanguageBridge';
import {
  ShieldCheck,
  Building2,
  Vote,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  Radio,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#000000] flex flex-col">
      {/* Global Live Indic DOM Localization Bridge */}
      <LanguageBridge />

      {/* Persistent Left Sidebar (Desktop Fixed, Mobile Drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (Offset by Sidebar width on lg+ screens) */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Live National Federation Notification / Ticker Strip (Black / Gold / Sage / Coral) */}
        <div className="bg-[#000000] text-[#FFFFFF] text-xs py-1.5 px-4 sm:px-8 border-b border-[#262626] flex items-center justify-between overflow-hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="gov-badge gov-badge-gold text-[9px] py-0 px-1.5 font-bold shrink-0">
              NATIONAL NOTICE
            </span>
            <p className="truncate text-[11px] font-medium text-white">
              📢 Multi-State Labour Cooperative Federation Dispatch Active: 14,680+ verified craftsmen deployed across 10 trades • 90% Direct DBT Bank Settlement active.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-3 shrink-0 text-[10px] text-[#DCC573]">
            <span>Uptime: 99.98%</span>
            <span className="text-[#555555]">•</span>
            <span className="flex items-center gap-1 text-[#5C8F57] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-white">GIGW & CERT-In Compliant</span>
            </span>
          </div>
        </div>

        {/* Official Breadcrumbs Navigation */}
        <div className="px-4 sm:px-8 py-2 bg-white border-b border-[#E6E2D6] text-xs text-[#666666] flex items-center gap-1.5 overflow-x-auto">
          <Link to="/" className="hover:text-[#5C8F57] font-semibold text-[#000000]">Home</Link>
          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const formatted = segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            return (
              <React.Fragment key={url}>
                <ChevronRight className="w-3.5 h-3.5 text-[#AAAAAA] shrink-0" />
                {isLast ? (
                  <span className="font-bold text-[#000000] truncate">{formatted}</span>
                ) : (
                  <Link to={url} className="hover:text-[#5C8F57] font-semibold truncate text-[#333333]">
                    {formatted}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Official Institutional Footer (Deep Black / Gold / Coral / Sage / White) */}
        <footer className="border-t-2 border-[#DCC573] bg-[#000000] text-[#FFFFFF] text-xs mt-auto">
          {/* Top Tricolor Footer Stripe */}
          <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

          <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Institutional Overview */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5C8F57] to-[#3F693A] text-white flex items-center justify-center font-black text-sm border border-[#5C8F57]">
                    सह
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                      Sahakar — National Labour Cooperative Federation Grid
                    </h4>
                    <span className="text-[11px] text-[#DCC573]">
                      Digital Public Infrastructure under the Multi-State Cooperative Societies Framework
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#E0E0E0] leading-relaxed max-w-lg">
                  Sahakar connects verified primary labour cooperative societies and registered skilled craftsmen with households and institutions. Governed democratically with 1-Member-1-Vote equity, 90% direct bank DBT payouts, and a collective 1% emergency welfare fund.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-[#142613] text-[#8EBA8A] border border-[#2E592A]">
                    ✓ 100% Worker-Owned DPI
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#2A2412] text-[#DCC573] border border-[#5E5124]">
                    ✓ 1% Emergency Welfare Pool
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#2B1413] text-[#F6A8A4] border border-[#5E2B29]">
                    ✓ Multi-State Co-op Reg. #MSCS/ND/2026/088
                  </span>
                </div>
              </div>

              {/* Statutory & Quick Links */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase text-[#DCC573] tracking-wider block border-b border-[#262626] pb-1">
                  Official Links & Portals
                </span>
                <ul className="space-y-2 text-xs text-[#CCCCCC]">
                  <li><Link to="/how-it-works" className="hover:text-[#DCC573] transition-colors">How Sahakar DPI Works</Link></li>
                  <li><Link to="/services" className="hover:text-[#DCC573] transition-colors">Verified Trades & Rates Directory</Link></li>
                  <li><Link to="/onboarding" className="hover:text-[#DCC573] transition-colors">Worker Aadhaar & Bio Onboarding</Link></li>
                  <li><Link to="/about" className="hover:text-[#DCC573] transition-colors">Cooperative Revenue Model (90/1/9)</Link></li>
                  <li><Link to="/for-cooperatives" className="hover:text-[#DCC573] transition-colors">Primary Society Affiliation Portal</Link></li>
                </ul>
              </div>

              {/* Direct National Contact & Grievance Helpdesk */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase text-[#DCC573] tracking-wider block border-b border-[#262626] pb-1">
                  National Grievance & Helpdesk
                </span>
                <div className="space-y-2">
                  <a
                    href="tel:+919557687953"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#DCC573] text-white text-xs font-bold transition-all shadow-xs group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#262626] text-[#DCC573] flex items-center justify-center shrink-0 group-hover:bg-[#5C8F57] group-hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#AAAAAA] block font-normal">Toll-Free National Helpline:</span>
                      <strong className="text-white">+91 9557687953</strong>
                    </div>
                  </a>

                  <a
                    href="mailto:vedanshmer4@gmail.com"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#DCC573] text-white text-xs font-bold transition-all shadow-xs group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#262626] text-[#DCC573] flex items-center justify-center shrink-0 group-hover:bg-[#EA7671] group-hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] text-[#AAAAAA] block font-normal">Official Support Email:</span>
                      <strong className="text-white truncate">vedanshmer4@gmail.com</strong>
                    </div>
                  </a>

                  <div className="text-[11px] text-[#AAAAAA] pt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#EA7671] shrink-0 mt-0.5" />
                    <span>National Labour Cooperative Federation, Krishi Bhavan Complex, New Delhi 110001</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Institutional Seal & Copyright */}
            <div className="border-t border-[#262626] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#AAAAAA]">
              <div className="flex flex-wrap items-center gap-4">
                <span>© 2026 Sahakar National Cooperative Federation. All rights reserved.</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-[#DCC573] font-bold">Helpline: +91 9557687953</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-[#DCC573] font-bold">Email: vedanshmer4@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#262626] text-[10px] text-[#DCC573] font-semibold">
                  Smart India Hackathon (SIH) Showcase
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#141414] border border-[#262626] text-[10px] text-[#8EBA8A] font-semibold">
                  Designed for Indian Skilled Craftsmen
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

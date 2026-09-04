import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  LogIn,
  ShieldCheck,
  Phone,
  Mail,
  User,
  Sparkles,
  ChevronDown,
  Check,
  Building2,
  Award,
  Vote,
  UserCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageToggle from './LanguageToggle';

export default function TopHeader({ onToggleSidebar }) {
  const { t } = useTranslation();
  const { user, role, isAuthenticated, loginAsDemo, logout } = useAuth();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const demoRoles = [
    { name: 'Public', label: 'Citizen / Guest Portal', desc: 'Browse Verified Directory & DPI Model', route: '/', icon: Globe },
    { name: 'Customer', label: 'Citizen Customer (Neha Agarwal)', desc: 'Bookings, Geo-Radar & Invoices', route: '/customer/book', icon: UserCheck },
    { name: 'Worker', label: 'Worker-Owner (Rajesh Kumar)', desc: 'Prosperity Engine, Teams & Welfare', route: '/worker/dashboard', icon: Award },
    { name: 'Federation Admin', label: 'Federation Officer (Harish)', desc: 'KYC Approvals, Disputes & AI Grid', route: '/admin/dashboard', icon: Building2 },
    { name: 'District Council Member', label: 'Council Member (Sunil)', desc: 'Democratic Governance & Wage Floors', route: '/council/dashboard', icon: Vote },
  ];

  const handleRoleSelect = (targetRole, targetRoute) => {
    setRoleDropdownOpen(false);
    if (targetRole === 'Public') {
      logout();
      navigate('/');
    } else {
      loginAsDemo(targetRole);
      navigate(targetRoute);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E2D6] shadow-xs">
      {/* 1. National Tricolor Line */}
      <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* 2. Top Institutional Utility Strip (Black / Gold / White) */}
      <div className="bg-[#000000] text-[#FFFFFF] text-[11px] py-1 px-4 sm:px-8 flex flex-wrap items-center justify-between border-b border-[#262626]">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DCC573] animate-pulse" />
            <span>भारत सरकार | Ministry of Cooperation — National Digital Public Good</span>
          </span>
          <span className="hidden md:inline text-[#DCC573]/50">|</span>
          <span className="hidden md:inline text-[#DCC573]">SIH Innovation Initiative (Co-op DPI Grid)</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-[#FFFFFF]">
            <a href="tel:+919557687953" className="flex items-center gap-1 hover:text-[#DCC573] transition-colors">
              <Phone className="w-3 h-3 text-[#DCC573]" />
              <span>+91 9557687953</span>
            </a>
            <span className="text-[#666666]">•</span>
            <a href="mailto:vedanshmer4@gmail.com" className="flex items-center gap-1 hover:text-[#DCC573] transition-colors">
              <Mail className="w-3 h-3 text-[#DCC573]" />
              <span>vedanshmer4@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-[#333333] text-[10px] font-bold">
            <button
              onClick={() => { document.documentElement.style.fontSize = '14px'; }}
              className="px-1.5 py-0.5 rounded bg-[#1F1F1F] hover:bg-[#333333] text-[#DCC573] cursor-pointer"
              title="Standard Font Size"
            >
              A
            </button>
            <button
              onClick={() => { document.documentElement.style.fontSize = '16px'; }}
              className="px-1.5 py-0.5 rounded bg-[#1F1F1F] hover:bg-[#333333] text-[#DCC573] font-black cursor-pointer"
              title="Enlarge Font Size"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary Official Masthead */}
      <div className="h-16 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburger Button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-[#000000] hover:bg-[#FAF9F6] border border-[#E6E2D6] cursor-pointer"
            title="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Official Emblem & Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5C8F57] to-[#3F693A] text-white flex flex-col items-center justify-center font-black text-xs shadow-xs border border-[#5C8F57] group-hover:scale-105 transition-transform">
              <span className="text-sm font-black tracking-tighter">सह</span>
              <span className="text-[8px] tracking-widest uppercase font-bold text-[#DCC573]">DPI</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
                  Sahakar
                </span>
                <span className="gov-badge gov-badge-green text-[9px] py-0.5">
                  <ShieldCheck className="w-3 h-3 text-[#5C8F57]" />
                  <span>Verified DPI</span>
                </span>
              </div>
              <span className="text-[10px] text-[#4A4A4A] font-semibold block leading-none">
                National Labour Cooperative Federation Digital Service Grid
              </span>
            </div>
          </Link>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Fast Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF9F6] hover:bg-[#F3EFE6] border border-[#E6E2D6] text-xs font-bold text-[#000000] transition-all cursor-pointer shadow-2xs"
            >
              <div className="w-2 h-2 rounded-full bg-[#5C8F57] animate-pulse" />
              <span className="hidden sm:inline text-[#666666] font-medium">Portal:</span>
              <strong className="text-[#3F693A]">{role === 'Public' ? 'Guest Visitor' : role}</strong>
              <ChevronDown className={`w-3.5 h-3.5 text-[#666666] transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E6E2D6] py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3.5 py-1.5 border-b border-[#FAF6E8] text-[10px] font-black uppercase text-[#8A7326] tracking-wider">
                  Switch Portal Persona (SIH Demo)
                </div>
                <div className="py-1 space-y-0.5">
                  {demoRoles.map((dr) => {
                    const Icon = dr.icon;
                    const isSelected = (role === dr.name) || (dr.name === 'Public' && role === 'Public');
                    return (
                      <button
                        key={dr.name}
                        onClick={() => handleRoleSelect(dr.name, dr.route)}
                        className={`w-full px-3.5 py-2 text-left flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                          isSelected ? 'bg-[#EFF6EE] text-[#3F693A] font-bold' : 'hover:bg-[#FAF9F6] text-[#000000]'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#5C8F57]' : 'text-[#666666]'}`} />
                          <div>
                            <strong className="block text-xs">{dr.label}</strong>
                            <span className="text-[10px] text-[#555555] block leading-tight">{dr.desc}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#5C8F57] shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 21 Indian Languages Switcher */}
          <LanguageToggle />

          {/* User Auth Status */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6]">
              <div className="w-6 h-6 rounded-full bg-[#5C8F57] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {user?.avatar || '👤'}
              </div>
              <span className="text-xs font-bold text-[#000000] hidden sm:block max-w-[110px] truncate">
                {user?.name?.split(' ')[0]}
              </span>
            </div>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t('common.signIn', 'Sign In')}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

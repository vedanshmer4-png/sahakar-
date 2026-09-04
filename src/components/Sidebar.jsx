import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Award,
  Vote,
  ShoppingBag,
  HeartHandshake,
  UserCheck,
  Home,
  LogIn,
  LogOut,
  User,
  Calendar,
  Zap,
  Radio,
  Building2,
  ShieldCheck,
  Sparkles,
  FileText,
  Star,
  Settings,
  DollarSign,
  AlertTriangle,
  Layers,
  BookOpen,
  Briefcase,
  Phone,
  Mail,
  X
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, role, isAuthenticated, logout } = useAuth();

  // 1. Public Portal Links
  const publicLinks = [
    { to: '/', label: t('nav.home', 'Home'), icon: Home },
    { to: '/how-it-works', label: t('nav.howItWorks', 'How Sahakar Works'), icon: Sparkles },
    { to: '/services', label: t('nav.services', 'Services Directory'), icon: Briefcase },
    { to: '/onboarding', label: t('nav.onboarding', 'Worker KYC Onboarding'), icon: ShieldCheck, highlight: true },
    { to: '/for-cooperatives', label: t('nav.forCooperatives', 'For Primary Societies'), icon: Building2 },
    { to: '/about', label: t('nav.about', 'Cooperative Economic Model'), icon: BookOpen },
  ];

  // 2. Customer Portal Links
  const customerLinks = [
    { to: '/customer/book', label: t('nav.book', 'Book a Verified Service'), icon: Calendar, highlight: true },
    { to: '/customer/search', label: t('nav.radar', 'Geo-Radar Dispatch Search'), icon: Radio },
    { to: '/customer/bookings', label: t('nav.myBookings', 'My Service Bookings'), icon: Layers },
    { to: '/customer/emergency', label: t('nav.emergency', 'Emergency 15-Min Response'), icon: Zap, emergency: true },
    { to: '/customer/invoices', label: t('nav.invoices', 'GST Invoices & DBT Receipts'), icon: FileText },
    { to: '/customer/ratings', label: t('nav.ratings', 'Rate & Trust Score'), icon: Star },
    { to: '/customer/profile', label: t('nav.profile', 'Citizen Profile & Settings'), icon: User },
  ];

  // 3. Worker-Owner Portal Links
  const workerLinks = [
    { to: '/worker/dashboard', label: t('nav.prosperity', 'Prosperity & Earnings Dashboard'), icon: Award, highlight: true },
    { to: '/worker/jobs', label: t('nav.myJobs', 'Assigned Jobs & Squads'), icon: Users },
    { to: '/worker/schedule', label: t('nav.availability', 'Availability & Calendar'), icon: Calendar },
    { to: '/worker/skills', label: t('nav.skillLadder', 'Skill Ladder & Badges'), icon: Layers },
    { to: '/worker/passport', label: t('nav.passport', 'W3C Reputation Passport'), icon: ShieldCheck },
    { to: '/worker/earnings', label: t('nav.earnings', 'Cooperative Equity & Payouts'), icon: DollarSign },
    { to: '/worker/welfare', label: t('nav.welfare', '1% Emergency Welfare Pool'), icon: HeartHandshake },
    { to: '/worker/marketplace', label: t('nav.toolGroupBuys', 'Bulk Tool Group-Buys'), icon: ShoppingBag },
    { to: '/worker/governance', label: t('nav.governance', 'District Democratic Ballots'), icon: Vote },
    { to: '/worker/profile', label: t('nav.profile', 'Worker Bio & Wage Rates'), icon: User },
  ];

  // 4. Federation Admin Portal Links
  const adminLinks = [
    { to: '/admin/dashboard', label: t('nav.kpis', 'National Federation KPIs'), icon: Building2, highlight: true },
    { to: '/admin/workers', label: t('nav.workerQueue', 'KYC & Aadhaar Verification Queue'), icon: ShieldCheck },
    { to: '/admin/certifications', label: t('nav.certifications', 'NSDC Skill Certifications'), icon: Award },
    { to: '/admin/disputes', label: t('nav.disputes', 'Grievance & Escrow Disputes'), icon: AlertTriangle },
    { to: '/admin/customer-risk', label: t('nav.trustScore', 'Customer Trust Risk Index'), icon: Star },
    { to: '/admin/forecasting', label: t('nav.forecasting', 'AI Demand & Resource Allocation'), icon: Sparkles },
    { to: '/admin/pricing', label: t('nav.pricingPolicy', 'Wage Floors & Pricing Policy'), icon: DollarSign },
    { to: '/admin/reports', label: t('nav.auditReports', 'Statutory Audit Reports'), icon: FileText },
  ];

  // 5. District Council Portal Links
  const councilLinks = [
    { to: '/council/dashboard', label: t('nav.councilDashboard', 'District Council Console'), icon: Vote, highlight: true },
    { to: '/council/proposals', label: t('nav.proposals', 'Legislative Proposals & Ballots'), icon: Layers },
    { to: '/council/members', label: t('nav.councilMembers', 'Elected Council Directory'), icon: Users },
    { to: '/council/decisions', label: t('nav.decisions', 'Official Gazette Decisions Log'), icon: FileText },
    { to: '/council/settings', label: t('nav.districtSettings', 'District Federation Settings'), icon: Settings },
  ];

  let activeLinks = publicLinks;
  let portalTitle = 'Public Visitor Portal';
  let portalSubtitle = 'Directory & Cooperative Model';

  if (role === 'Customer') {
    activeLinks = customerLinks;
    portalTitle = 'Citizen Customer Portal';
    portalSubtitle = 'Bookings, Invoices & SOS';
  } else if (role === 'Worker') {
    activeLinks = workerLinks;
    portalTitle = 'Worker-Owner Portal';
    portalSubtitle = 'Prosperity Engine & Guilds';
  } else if (role === 'Federation Admin') {
    activeLinks = adminLinks;
    portalTitle = 'Federation Admin Console';
    portalSubtitle = 'Verification, Escrow & Audits';
  } else if (role === 'District Council Member') {
    activeLinks = councilLinks;
    portalTitle = 'District Council Portal';
    portalSubtitle = 'Democracy & Wage Policies';
  }

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#FFFFFF] border-r border-[#E6E2D6] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#E6E2D6] bg-[#FFFFFF] flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#5C8F57] to-[#3F693A] text-white flex items-center justify-center text-xs font-black shadow-xs">
              सह
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-[#000000]" style={{ fontFamily: 'var(--font-heading)' }}>
                Sahakar DPI
              </span>
              <span className="text-[10px] text-[#666666] font-bold block leading-none">
                Labour Co-op Federation
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-[#666666] hover:bg-[#FAF9F6] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Active Portal Header Badge */}
          <div className="p-3 rounded-2xl bg-[#FAF6E8] border border-[#EFE3B5] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-[#8A7326] tracking-wider">Active Workspace</span>
              <span className="w-2 h-2 rounded-full bg-[#5C8F57] animate-pulse" />
            </div>
            <strong className="block text-xs font-black text-[#000000] leading-tight">{portalTitle}</strong>
            <span className="text-[10px] text-[#666666] block">{portalSubtitle}</span>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase text-[#666666] tracking-wider px-2 pb-1">
              Portal Modules
            </div>

            {activeLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? item.emergency
                          ? 'bg-[#EA7671] text-white font-bold shadow-xs'
                          : 'bg-[#000000] text-white font-bold shadow-xs'
                        : item.emergency
                        ? 'text-[#EA7671] bg-rose-50 hover:bg-rose-100 font-bold'
                        : item.highlight
                        ? 'text-[#3F693A] bg-[#EFF6EE] hover:bg-[#E2EFE0] font-bold'
                        : 'text-[#262626] hover:bg-[#FAF9F6] hover:text-[#000000]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Institutional Compliance Card */}
          <div className="p-3 rounded-2xl bg-[#FAF9F6] border border-[#E6E2D6] text-[11px] text-[#000000] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#3F693A]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5C8F57]" />
              <span>MSCS Act 2002 Compliant</span>
            </div>
            <p className="text-[10px] text-[#666666] leading-tight">
              Regulated under the Multi-State Cooperative Societies Framework. 90% direct DBT settlement.
            </p>
          </div>
        </div>

        {/* Footer Profile / Contact Bar */}
        <div className="p-3 border-t border-[#E6E2D6] bg-white space-y-2">
          {isAuthenticated ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#FAF9F6] border border-[#E6E2D6]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#5C8F57] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {user?.avatar || '👤'}
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-[#000000] truncate">
                    {user?.name}
                  </strong>
                  <span className="text-[10px] text-[#5C8F57] font-semibold block truncate">
                    {role}
                  </span>
                </div>
              </div>

              <button
                onClick={() => { logout(); navigate('/'); if (onClose) onClose(); }}
                className="p-1 rounded text-[#EA7671] hover:bg-rose-50 cursor-pointer"
                title={t('nav.signOut', 'Sign Out')}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => { if (onClose) onClose(); navigate('/auth'); }}
              className="w-full py-2 rounded-xl bg-[#EA7671] hover:bg-[#C24D48] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('nav.login', 'Official Login / Onboarding')}</span>
            </button>
          )}

          {/* Quick Helpline */}
          <div className="pt-2 border-t border-[#E6E2D6] flex items-center justify-between text-[10px] text-[#666666]">
            <span>24x7 National Helpdesk:</span>
            <a href="tel:+919557687953" className="font-bold text-[#000000] hover:text-[#5C8F57] transition-colors">
              +91 9557687953
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

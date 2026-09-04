import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Award,
  Vote,
  ShoppingBag,
  HeartHandshake,
  UserCheck,
  Menu,
  X,
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
  ChevronDown,
  FileText,
  Star,
  Settings,
  DollarSign,
  AlertTriangle,
  Layers,
  BookOpen,
  Briefcase,
  Check,
  Globe
} from 'lucide-react';

export default function Navbar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, role, isAuthenticated, loginAsDemo, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  // Switch demo role
  const handleRoleSelect = (targetRole, targetRoute) => {
    setRoleMenuOpen(false);
    if (targetRole === 'Public') {
      logout();
      navigate('/');
    } else {
      loginAsDemo(targetRole);
      navigate(targetRoute);
    }
  };

  // 1. Public Menu Links
  const publicLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/how-it-works', label: 'How Sahakar Works', icon: Sparkles },
    { to: '/services', label: 'Services Directory', icon: Briefcase },
    { to: '/onboarding', label: 'Become a Worker', icon: ShieldCheck, highlight: true },
    { to: '/for-cooperatives', label: 'For Cooperatives', icon: Building2 },
    { to: '/about', label: 'Our Model', icon: BookOpen },
  ];

  // 2. Customer Menu Links
  const customerLinks = [
    { to: '/customer/book', label: 'Book a Service', icon: Calendar, highlight: true },
    { to: '/customer/search', label: 'Geo Radar Search', icon: Radio },
    { to: '/customer/bookings', label: 'My Bookings', icon: Layers },
    { to: '/customer/emergency', label: '🚨 Emergency 15-Min', icon: Zap, emergency: true },
    { to: '/customer/invoices', label: 'Invoices & Payments', icon: FileText },
    { to: '/customer/ratings', label: 'Rate & Reviews', icon: Star },
    { to: '/customer/profile', label: 'Profile', icon: User },
  ];

  // 3. Worker Menu Links
  const workerLinks = [
    { to: '/worker/dashboard', label: 'Prosperity Dashboard', icon: Award, highlight: true },
    { to: '/worker/jobs', label: 'My Jobs & Teams', icon: Users },
    { to: '/worker/schedule', label: 'Availability', icon: Calendar },
    { to: '/worker/skills', label: 'Skill Ladder', icon: Layers },
    { to: '/worker/passport', label: 'Reputation Passport', icon: ShieldCheck },
    { to: '/worker/earnings', label: 'Ownership & Stake', icon: DollarSign },
    { to: '/worker/welfare', label: 'Welfare Fund', icon: HeartHandshake },
    { to: '/worker/marketplace', label: 'Tool Group-Buys', icon: ShoppingBag },
    { to: '/worker/governance', label: 'District Ballots', icon: Vote },
  ];

  // 4. Federation Admin Menu Links
  const adminLinks = [
    { to: '/admin/dashboard', label: 'Federation KPIs', icon: Building2, highlight: true },
    { to: '/admin/workers', label: 'Worker Verification Queue', icon: ShieldCheck },
    { to: '/admin/certifications', label: 'Certifications', icon: Award },
    { to: '/admin/disputes', label: 'Dispute Resolution', icon: AlertTriangle },
    { to: '/admin/customer-risk', label: 'Customer Trust Scores', icon: Star },
    { to: '/admin/forecasting', label: 'AI Demand & Allocation', icon: Sparkles },
    { to: '/admin/pricing', label: 'Pricing Policy', icon: DollarSign },
    { to: '/admin/reports', label: 'Audit Reports', icon: FileText },
  ];

  // 5. District Council Menu Links
  const councilLinks = [
    { to: '/council/dashboard', label: 'Council Dashboard', icon: Vote, highlight: true },
    { to: '/council/proposals', label: 'Active Proposals & Votes', icon: Layers },
    { to: '/council/members', label: 'Council Directory', icon: Users },
    { to: '/council/decisions', label: 'Decisions Log', icon: FileText },
    { to: '/council/settings', label: 'District Settings', icon: Settings },
  ];

  // Select active link group according to role
  let activeLinks = publicLinks;
  if (role === 'Customer') activeLinks = customerLinks;
  if (role === 'Worker') activeLinks = workerLinks;
  if (role === 'Federation Admin') activeLinks = adminLinks;
  if (role === 'District Council Member') activeLinks = councilLinks;

  const demoRoles = [
    { name: 'Public', label: 'Public (Guest View)', desc: 'Landing, Directory & Onboarding', route: '/', icon: Globe },
    { name: 'Customer', label: 'Customer (Neha Agarwal)', desc: 'Book, Radar, Invoices & Reviews', route: '/customer/book', icon: UserCheck },
    { name: 'Worker', label: 'Worker (Rajesh Kumar)', desc: 'Prosperity Engine, Teams & Welfare', route: '/worker/dashboard', icon: Award },
    { name: 'Federation Admin', label: 'Federation Admin (Harish)', desc: 'KYC Approvals, Disputes & AI', route: '/admin/dashboard', icon: Building2 },
    { name: 'District Council Member', label: 'Council Member (Sunil)', desc: 'Democratic Proposals & Wage Floors', route: '/council/dashboard', icon: Vote },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFD8] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Top Left: Logo & Demo Role Switcher Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C45C3C] to-[#2D6A4F] flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                सह
              </div>
              <span className="text-xl font-black tracking-tight text-[#2B2B2B]" style={{ fontFamily: 'var(--font-heading)' }}>
                Sahakar
              </span>
            </Link>

            {/* Top-Left Demo Role Menu Button */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F2ECE4] border border-[#E8DFD8] text-xs font-bold text-[#2B2B2B] shadow-2xs transition-all cursor-pointer"
                title="Switch Demo Role"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" />
                <span className="hidden sm:inline font-extrabold text-[#736B63]">Role:</span>
                <span className="font-black text-[#1B4332] max-w-[120px] truncate">
                  {role === 'Public' ? 'Guest' : role}
                </span>
                <ChevronDown className={`w-3 h-3 text-[#8C827A] transition-transform ${roleMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Role Switcher Popover Dropdown */}
              {roleMenuOpen && (
                <div
                  onMouseLeave={() => setRoleMenuOpen(false)}
                  className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E8DFD8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3.5 py-1.5 border-b border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-[#8C827A] tracking-wider">
                      Switch Demo Role
                    </span>
                    <span className="text-[10px] text-[#2D6A4F] font-bold">1-Click Fast Switch</span>
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
                            isSelected ? 'bg-[#D1FAE5]/60 text-[#1B4332]' : 'hover:bg-[#FAF5EE] text-[#2B2B2B]'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-[#2D6A4F]' : 'text-[#8C827A]'}`} />
                            <div>
                              <strong className="block text-xs font-bold">{dr.label}</strong>
                              <span className="text-[10px] text-[#736B63] block">{dr.desc}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
            {activeLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                      isActive
                        ? item.emergency
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-[#C45C3C] text-white shadow-xs'
                        : item.emergency
                        ? 'text-red-600 bg-red-50 hover:bg-red-100 font-black'
                        : item.highlight
                        ? 'text-[#2D6A4F] bg-[#D1FAE5] hover:bg-[#A7F3D0]'
                        : 'text-[#5A524C] hover:bg-[#F2ECE4] hover:text-[#2B2B2B]'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Medium Screen Nav */}
          <nav className="hidden md:flex xl:hidden items-center gap-1">
            {activeLinks.slice(0, 3).map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive ? 'bg-[#C45C3C] text-white' : 'text-[#5A524C] hover:bg-[#F2ECE4]'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2">
            <LanguageToggle />

            {/* Profile Dropdown / Login */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-[#FAF5EE] border border-[#E8DFD8] hover:bg-[#F0EAE1] transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {user?.avatar || '👤'}
                  </div>
                  <span className="text-xs font-bold text-[#2B2B2B] hidden sm:block max-w-[90px] truncate">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#8C827A]" />
                </button>

                {userDropdownOpen && (
                  <div
                    onMouseLeave={() => setUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8DFD8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2 border-b border-[#F0EAE1]">
                      <p className="text-xs font-bold text-[#2B2B2B]">{user?.name}</p>
                      <p className="text-[10px] text-[#8C827A] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold text-[#2D6A4F] bg-[#D1FAE5] px-2 py-0.5 rounded-md">
                        {role}
                      </span>
                    </div>

                    <div className="py-1">
                      {role === 'Customer' && (
                        <Link
                          to="/customer/bookings"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#2B2B2B] hover:bg-[#FFF8F0]"
                        >
                          <Calendar className="w-4 h-4 text-[#2D6A4F]" />
                          <span>My Bookings</span>
                        </Link>
                      )}

                      {role === 'Worker' && (
                        <Link
                          to="/worker/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#2B2B2B] hover:bg-[#FFF8F0]"
                        >
                          <Award className="w-4 h-4 text-[#C45C3C]" />
                          <span>Prosperity Engine</span>
                        </Link>
                      )}

                      {role === 'Federation Admin' && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#2B2B2B] hover:bg-[#FFF8F0]"
                        >
                          <Building2 className="w-4 h-4 text-[#D4A843]" />
                          <span>Admin Console</span>
                        </Link>
                      )}

                      {role === 'District Council Member' && (
                        <Link
                          to="/council/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#2B2B2B] hover:bg-[#FFF8F0]"
                        >
                          <Vote className="w-4 h-4 text-[#2D6A4F]" />
                          <span>Council Voting</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-[#F0EAE1] my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C45C3C] hover:bg-[#A34A2E] text-white text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Hamburger Drawer Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#5A524C] hover:bg-[#F2ECE4] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FFFDF9] border-b border-[#E8DFD8] px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] uppercase font-bold text-[#8C827A] px-3 py-1">
            {role === 'Public' ? 'Explore Sahakar' : `${role} Menu`}
          </div>

          {activeLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${
                    isActive ? 'bg-[#C45C3C] text-white' : 'text-[#2B2B2B] hover:bg-[#FAF5EE]'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {!isAuthenticated && (
            <div className="pt-3 border-t border-[#F0EAE1]">
              <button
                onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }}
                className="w-full py-2.5 rounded-xl bg-[#C45C3C] text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCheck, Shield, Sparkles, Building2, Vote, LogOut, Globe } from 'lucide-react';

export default function FastRoleSwitcher() {
  const { role, loginAsDemo, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = (targetRole, defaultRoute) => {
    if (targetRole === 'Public') {
      logout();
      navigate('/');
    } else {
      loginAsDemo(targetRole);
      navigate(defaultRoute);
    }
  };

  return (
    <div className="bg-[#1B4332] text-white px-3 py-1.5 text-xs border-b border-[#2D6A4F] select-none sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-extrabold flex items-center gap-1.5 text-[#D4A843] tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A843]" /> Demo Role Switcher:
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <button
            onClick={() => handleSwitch('Public', '/')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'Public'
                ? 'bg-[#D4A843] text-[#1B4332] shadow-sm font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Public (Guest)</span>
          </button>

          <button
            onClick={() => handleSwitch('Customer', '/customer/book')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'Customer'
                ? 'bg-[#D4A843] text-[#1B4332] shadow-sm font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <UserCheck className="w-3 h-3" />
            <span>Customer (Neha)</span>
          </button>

          <button
            onClick={() => handleSwitch('Worker', '/worker/dashboard')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'Worker'
                ? 'bg-[#D4A843] text-[#1B4332] shadow-sm font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <span>👷 Worker (Rajesh)</span>
          </button>

          <button
            onClick={() => handleSwitch('Federation Admin', '/admin/dashboard')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'Federation Admin'
                ? 'bg-[#D4A843] text-[#1B4332] shadow-sm font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Building2 className="w-3 h-3" />
            <span>Federation Admin</span>
          </button>

          <button
            onClick={() => handleSwitch('District Council Member', '/council/dashboard')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
              role === 'District Council Member'
                ? 'bg-[#D4A843] text-[#1B4332] shadow-sm font-black'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Vote className="w-3 h-3" />
            <span>District Council</span>
          </button>
        </div>
      </div>
    </div>
  );
}

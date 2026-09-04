import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Home,
  TrendingUp,
  Award,
  HeartHandshake,
  Vote
} from 'lucide-react';

export default function BottomNav() {
  const { t } = useTranslation();

  const tabs = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/dashboard', label: t('nav.dashboard'), icon: TrendingUp, badge: 'Prosperity' },
    { to: '/passport', label: t('nav.passport'), icon: Award },
    { to: '/welfare', label: t('nav.welfare'), icon: HeartHandshake },
    { to: '/governance', label: t('nav.governance'), icon: Vote },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#E8DFD8] lg:hidden">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
                  isActive
                    ? 'text-[#C45C3C] font-bold'
                    : 'text-[#736B63] hover:text-[#2B2B2B]'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] leading-none tracking-tight">{tab.label}</span>
              {tab.badge && (
                <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-[#2D6A4F]" />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

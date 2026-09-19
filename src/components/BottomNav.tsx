import React from 'react';
import { TabType } from '../types';
import { LayoutGrid, Palette, BarChart3, User } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onChangeTab }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: '首页', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'patterns', label: '图纸', icon: <Palette className="w-5 h-5" /> },
    { id: 'stats', label: '统计', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'profile', label: '我的', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-[#F8F9FF]/90 backdrop-blur-xl border-t border-[#D7E1EE]/50 shadow-[0_-2px_16px_rgba(0,28,57,0.04)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-14 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-[#0057C0] font-bold'
                  : 'text-[#5B6A82] hover:text-[#001C39]'
              }`}
            >
              <div className={`p-1 rounded-full transition-colors ${isActive ? 'bg-[#D8E2FF]/60' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[11px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

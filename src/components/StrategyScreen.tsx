import React, { useState } from 'react';
import { ScreenType, StrategyMode } from '../types';
import {
  ChevronLeft,
  User,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  LayoutGrid,
  AlignJustify,
  Compass,
} from 'lucide-react';

interface StrategyScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

interface StrategyItem {
  id: StrategyMode;
  name: string;
  tag: string;
  desc: string;
  isDefault?: boolean;
}

export const StrategyScreen: React.FC<StrategyScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [selectedMode, setSelectedMode] = useState<StrategyMode>('region_batch');

  const modes: StrategyItem[] = [
    {
      id: 'region',
      name: '区域',
      tag: '适合多色块复杂图',
      desc: '一块一块拼',
    },
    {
      id: 'batch',
      name: '批次',
      tag: '色号集中',
      desc: '一批颜色拼完再换料',
    },
    {
      id: 'region_batch',
      name: '区域+批次',
      tag: '默认推荐',
      desc: '少换料，同时更容易找位置',
      isDefault: true,
    },
    {
      id: 'row',
      name: '逐行',
      tag: '传统十字绣习惯',
      desc: '一行一行拼',
    },
    {
      id: 'free',
      name: '自由',
      tag: '随心拼',
      desc: '自己决定顺序',
    },
  ];

  const getModeIcon = (mode: StrategyMode) => {
    switch (mode) {
      case 'region':
        return <LayoutGrid className="w-5 h-5 text-[#0057C0]" />;
      case 'batch':
        return <Layers className="w-5 h-5 text-[#0057C0]" />;
      case 'region_batch':
        return <SlidersHorizontal className="w-5 h-5 text-[#0057C0]" />;
      case 'row':
        return <AlignJustify className="w-5 h-5 text-[#0057C0]" />;
      case 'free':
        return <Compass className="w-5 h-5 text-[#0057C0]" />;
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen pb-safe bg-[#F8F9FF] select-none">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-30 pt-safe bg-[#F8F9FF]/85 backdrop-blur-xl border-b border-[#D7E1EE]/50">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#001C39] hover:bg-[#E6EEFF]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[17px] font-bold text-[#001C39]">选择拼法</h1>
          <div className="w-8 h-8 rounded-full bg-[#0057C0] text-white flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-between px-4 pt-3 pb-6 max-w-md mx-auto w-full">
        <div className="flex flex-col gap-3">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-bold text-[#001C39]">选择拼装策略</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#0057C0]/10 text-[#0057C0] text-[11px] font-bold">
                中大型推荐
              </span>
            </div>
            <span className="text-[12px] text-[#5B6A82]">模式 3/5</span>
          </div>

          {/* Active Blueprint Capsule */}
          <div className="p-3 rounded-2xl bg-[#EFF4FC] flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5W7S7cNShLw3gP79b_S2rl69vXQUOMlzJd-BEDMuKH0TJe-RJPN4s5l-A7s-mMNRdRld9HXMVuIlsvk_FL2EpDB8mtXFwflSYMFkwGznt5NEjdp-gVYJb6QBh0FwafdYYVyIONyVAkhCzrGlgY1-J6GraETrmsdG2N-KOQHY4MIdv8UgIEn8cw2_BJVlX2QJeIPkfuIdvB3NiDsQn-tI3_X4JW3Xjj3gK64xMgAzuh2sitSwHz2s"
                alt="柴犬团子"
                className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-[#001C39] truncate">
                  柴犬团子 · 挂件
                </span>
                <div className="flex items-center gap-1.5 text-[#5B6A82] text-[11px] font-medium">
                  <span>1008 颗</span>
                  <span>•</span>
                  <span>14 色</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">库存充足</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('preview')}
              className="px-3 py-1 rounded-full bg-white text-[#0057C0] text-[12px] font-bold shadow-xs active:scale-95"
            >
              查看原图
            </button>
          </div>

          {/* Strategy Modes List */}
          <div className="flex flex-col gap-2.5 pt-1">
            {modes.map((mode) => {
              const isSelected = selectedMode === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[#0057C0]/10 border-[#0057C0] shadow-sm'
                      : 'bg-white hover:bg-slate-50 border-slate-100 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0">
                      {getModeIcon(mode.id)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[16px] font-bold ${
                            isSelected ? 'text-[#0057C0]' : 'text-[#001C39]'
                          }`}
                        >
                          {mode.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            mode.isDefault
                              ? 'bg-[#0057C0] text-white'
                              : 'bg-[#EFF4FC] text-[#5B6A82]'
                          }`}
                        >
                          {mode.tag}
                        </span>
                      </div>
                      <span className="text-[12px] text-[#5B6A82] truncate mt-0.5">
                        {mode.desc}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#0057C0] text-white shadow-xs'
                        : 'bg-[#EFF4FC] text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 font-bold" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <div className="p-3 rounded-2xl bg-[#EFF4FC] flex items-start gap-2.5">
            <SlidersHorizontal className="w-4 h-4 text-[#0057C0] mt-0.5 shrink-0" />
            <p className="text-[11px] text-[#5B6A82] leading-relaxed">
              点击后进入「施工参数」配置：可设置当前画板起点、单格提示音与查数倍率。
            </p>
          </div>

          <button
            onClick={() => onNavigate('construction_settings')}
            className="w-full h-12 rounded-full bg-[#0057C0] hover:bg-[#1B70E9] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,87,192,0.25)] active:scale-[0.98] transition-transform"
          >
            <span>下一步：设置施工参数</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

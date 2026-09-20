import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  ChevronLeft,
  Share2,
  MoreHorizontal,
  Volume2,
  VolumeX,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft as ChevronLeftIcon,
  HelpCircle,
} from 'lucide-react';

interface ActiveWorkbenchScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

interface TrayCell {
  slot: number;
  code: string;
  name: string;
  hex: string;
  placed: number;
  total: number;
}

export const ActiveWorkbenchScreen: React.FC<ActiveWorkbenchScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [focusActiveRegion, setFocusActiveRegion] = useState(true);
  const [placedCount, setPlacedCount] = useState(352);
  const totalCount = 1008;

  // Current active slot in tray (1 to 8)
  const [activeSlot, setActiveSlot] = useState(1);
  const [currentRegionIndex, setCurrentRegionIndex] = useState(3); // Region A3

  // 8 Material Tray cells
  const [trayCells, setTrayCells] = useState<TrayCell[]>([
    { slot: 1, code: '#P18', name: '焦糖', hex: '#FE893C', placed: 16, total: 24 },
    { slot: 2, code: '#P01', name: '纯白', hex: '#FFFFFF', placed: 4, total: 18 },
    { slot: 3, code: '#P12', name: '曜黑', hex: '#111C2D', placed: 4, total: 4 },
    { slot: 4, code: '#P34', name: '桃粉', hex: '#FFB68D', placed: 2, total: 6 },
    { slot: 5, code: '#P08', name: '柠檬黄', hex: '#FFD23F', placed: 0, total: 8 },
    { slot: 6, code: '#P15', name: '天蓝', hex: '#3D85FF', placed: 12, total: 12 },
    { slot: 7, code: '#P22', name: '咖啡', hex: '#5C3A21', placed: 0, total: 10 },
    { slot: 8, code: '#P05', name: '奶咖', hex: '#D2B48C', placed: 0, total: 15 },
  ]);

  // Current sub-grid 5x5 for Region A3
  const [subGrid, setSubGrid] = useState<Array<{ id: number; color: string; placed: boolean }>>([
    { id: 1, color: '#FE893C', placed: true },
    { id: 2, color: '#FE893C', placed: true },
    { id: 3, color: '#FE893C', placed: true },
    { id: 4, color: '#FFFFFF', placed: true },
    { id: 5, color: '#FFFFFF', placed: false },

    { id: 6, color: '#FE893C', placed: true },
    { id: 7, color: '#FE893C', placed: true },
    { id: 8, color: '#FE893C', placed: false },
    { id: 9, color: '#FFFFFF', placed: false },
    { id: 10, color: '#FFFFFF', placed: false },

    { id: 11, color: '#FE893C', placed: true },
    { id: 12, color: '#FE893C', placed: false },
    { id: 13, color: '#111C2D', placed: true },
    { id: 14, color: '#FFFFFF', placed: false },
    { id: 15, color: '#FFFFFF', placed: false },

    { id: 16, color: '#FE893C', placed: false },
    { id: 17, color: '#FFB68D', placed: false },
    { id: 18, color: '#FFFFFF', placed: false },
    { id: 19, color: '#FFFFFF', placed: false },
    { id: 20, color: '#FE893C', placed: false },

    { id: 21, color: '#FE893C', placed: false },
    { id: 22, color: '#FFFFFF', placed: false },
    { id: 23, color: '#FFFFFF', placed: false },
    { id: 24, color: '#FFFFFF', placed: false },
    { id: 25, color: '#FE893C', placed: false },
  ]);

  const currentActiveCell = trayCells.find((c) => c.slot === activeSlot) || trayCells[0];

  const handleCellClick = (idx: number) => {
    const targetCell = subGrid[idx];
    if (!targetCell) return;

    const willBePlaced = !targetCell.placed;

    // 1. Update subGrid state purely
    setSubGrid((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], placed: willBePlaced };
      return updated;
    });

    // 2. Update count outside the reducer callback
    if (willBePlaced) {
      setPlacedCount((c) => Math.min(totalCount, c + 1));
      if (soundEnabled) {
        onShowToast(`啪嗒！钉位 ${idx + 1} 拼豆已就位`);
      }
    } else {
      setPlacedCount((c) => Math.max(0, c - 1));
    }
  };

  const handleCompleteBatch = () => {
    onShowToast('第 1 批 (4/8色) 拼装进度已保存！准备进入下一组料盒');
    onNavigate('quality_inspection');
  };

  return (
    <div className="flex flex-col w-full min-h-screen pb-safe bg-[#F8F9FE] select-none">
      {/* 1. Header */}
      <header className="sticky top-0 w-full z-40 pt-safe bg-white/90 backdrop-blur-xl border-b border-[#E2E8F4]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-9 h-9 -ml-1.5 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              title="返回"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-[16px] font-extrabold text-[#0F1D32] tracking-tight">柴犬挂件 #01</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F1FF] text-[#0057C0] text-[10px] font-bold">
                  第 1 批 4/8 色
                </span>
              </div>
              <span className="text-[11px] text-[#5B6A82] font-medium leading-none mt-0.5">标准104板 · 施工工作台</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition active:scale-95 ${
                soundEnabled ? 'text-[#0057C0] bg-[#E8F1FF]' : 'text-slate-400 bg-slate-100/80'
              }`}
              title={soundEnabled ? '提示音：开' : '提示音：关'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onShowToast('分享施工进度')}
              className="w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition active:scale-95"
              title="分享"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => onShowToast('更多工具：补豆登记、局部重置')}
              className="w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition active:scale-95"
              title="更多"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* 2. Progress Strip */}
        <div className="px-4 pb-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-[#111C2D]">
              拼装进度: {Math.round((placedCount / totalCount) * 100)}% ({placedCount}/{totalCount}{' '}
              颗)
            </span>
            <span className="text-[#5B6A82] font-medium">预计剩余 25 分</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#E5ECF6] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0057C0] to-[#3D85FF] transition-all duration-300 shadow-xs"
              style={{ width: `${(placedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* 3. Main Workspace Area */}
      <main className="flex-1 flex flex-col justify-between px-4 py-2 max-w-md mx-auto w-full">
        {/* Active Region & Bead Instruction Banner */}
        <div className="p-3 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EFF4FC] flex items-center justify-center text-[#0057C0] font-bold text-[15px]">
              A{currentRegionIndex}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-bold text-[#111C2D]">
                  当前区域 A{currentRegionIndex} (5×5 单元)
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[11px] text-[#5B6A82]">
                当前取色：
                <span className="font-bold text-[#0057C0]">{currentActiveCell.name} </span>
                (色号 {currentActiveCell.code})
              </span>
            </div>
          </div>

          <button
            onClick={() => setFocusActiveRegion(!focusActiveRegion)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
              focusActiveRegion
                ? 'bg-[#0057C0] text-white shadow-xs'
                : 'bg-[#EFF4FC] text-[#5B6A82]'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{focusActiveRegion ? '对焦中' : '全图'}</span>
          </button>
        </div>

        {/* Pegboard Canvas Visualizer */}
        <div className="relative my-2 w-full aspect-square max-h-[360px] rounded-3xl bg-white border border-[#D7E1EE]/50 shadow-[0_8px_30px_rgba(40,70,120,0.05)] p-4 flex flex-col items-center justify-center overflow-hidden">
          {/* Background dot grid pattern */}
          <div
            className="absolute inset-0 opacity-35 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#0057c0 1.2px, transparent 1.2px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Region Label Tag */}
          <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-[#EFF4FC] text-[#0057C0] text-[10px] font-bold tracking-wider uppercase border border-[#0057C0]/20">
            板块 A{currentRegionIndex} · 25 孔
          </div>

          <div className="absolute top-3 right-3 text-[11px] text-[#5B6A82] font-semibold">
            轻触直接压入豆珠
          </div>

          {/* Interactive 5x5 Pegboard */}
          <div className="relative z-10 grid grid-cols-5 gap-2.5 p-3 rounded-2xl bg-[#EFF4FC] border border-slate-200 shadow-inner">
            {subGrid.map((cell, idx) => (
              <button
                key={cell.id}
                type="button"
                onClick={() => handleCellClick(idx)}
                className={`w-11 h-11 rounded-full transition-all duration-150 flex items-center justify-center relative cursor-pointer active:scale-90 ${
                  cell.placed ? 'bead-item shadow-md' : 'peg-hole'
                }`}
                style={{
                  backgroundColor: cell.placed ? cell.color : 'transparent',
                }}
              >
                {cell.placed ? (
                  <div
                    className="w-3.5 h-3.5 rounded-full bead-hole"
                    style={{
                      backgroundColor: cell.color === '#FFFFFF' ? '#A3C2E8' : 'rgba(0,0,0,0.35)',
                    }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full border border-dashed border-[#0057C0]/50 flex items-center justify-center opacity-70"
                    style={{ borderColor: cell.color }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cell.color }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="absolute bottom-3 inset-x-0 mx-auto w-fit flex items-center gap-1.5 text-[11px] text-[#5B6A82]">
            <Sparkles className="w-3.5 h-3.5 text-[#0057C0]" />
            <span>已放置 {subGrid.filter((c) => c.placed).length} / 25 颗</span>
          </div>
        </div>

        {/* 4. Material Tray Bar (8 Cells) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[12px] font-bold text-[#111C2D]">8 格便携料盒 (第 1 批)</span>
            <span className="text-[11px] text-[#0057C0] font-semibold">点击切换当前取用料格</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {trayCells.map((tray) => {
              const isSelected = activeSlot === tray.slot;
              const isCompleted = tray.placed >= tray.total;
              return (
                <button
                  key={tray.slot}
                  type="button"
                  onClick={() => {
                    setActiveSlot(tray.slot);
                    onShowToast(`已切换至 ${tray.slot} 号料格：${tray.name} (${tray.code})`);
                  }}
                  className={`p-2 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                    isSelected
                      ? 'bg-white border-[#0057C0] ring-2 ring-[#0057C0]/20 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full bead-item flex items-center justify-center"
                        style={{ backgroundColor: tray.hex }}
                      >
                        <div className="w-1 h-1 rounded-full bead-hole bg-black/40" />
                      </div>
                      <span className="text-[11px] font-bold text-[#111C2D] truncate">
                        {tray.name}
                      </span>
                    </div>
                    {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[#5B6A82]">
                    <span>{tray.code}</span>
                    <span className="font-bold text-[#111C2D]">
                      {tray.placed}/{tray.total}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Bottom Navigation & Action Dock */}
        <div className="pt-3 pb-safe flex items-center gap-2.5">
          <button
            onClick={() => {
              setCurrentRegionIndex((i) => Math.max(1, i - 1));
              onShowToast(`已定位至区域 A${Math.max(1, currentRegionIndex - 1)}`);
            }}
            className="h-12 px-3.5 rounded-2xl bg-white border border-slate-200 text-[#111C2D] font-bold text-[13px] flex items-center justify-center gap-1 shadow-xs active:scale-95"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>上一块</span>
          </button>

          <button
            onClick={handleCompleteBatch}
            className="flex-1 h-12 rounded-2xl bg-[#0057C0] hover:bg-[#1B70E9] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,87,192,0.3)] active:scale-[0.98] transition-transform"
          >
            <span>完成本批次 · 质检</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentRegionIndex((i) => Math.min(43, i + 1));
              onShowToast(`已切换至下一区域 A${Math.min(43, currentRegionIndex + 1)}`);
            }}
            className="h-12 px-3.5 rounded-2xl bg-white border border-slate-200 text-[#111C2D] font-bold text-[13px] flex items-center justify-center gap-1 shadow-xs active:scale-95"
          >
            <span>下一块</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};

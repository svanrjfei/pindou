import React, { useState } from 'react';
import { PatternItem, ScreenType } from '../types';
import {
  Search,
  UploadCloud,
  User,
  ArrowUpDown,
  MoreHorizontal,
  Hand,
  Grid2X2,
  PlusCircle,
  FolderPlus,
  Edit2,
  Copy,
  FileSpreadsheet,
  Trash2,
  X,
  Check,
} from 'lucide-react';

interface PatternsScreenProps {
  patterns: PatternItem[];
  onNavigate: (screen: ScreenType, patternId?: string) => void;
  onShowToast: (msg: string) => void;
}

export const PatternsScreen: React.FC<PatternsScreenProps> = ({
  patterns,
  onNavigate,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'recent' | 'classic' | 'favorite'
  >('all');
  const [activePattern, setActivePattern] = useState<PatternItem | null>(null);
  const [isApplyDrawerOpen, setIsApplyDrawerOpen] = useState(false);
  const [contextMenuPattern, setContextMenuPattern] = useState<PatternItem | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const categories = [
    { id: 'all', label: `全部 (${patterns.length})` },
    { id: 'recent', label: '最近导入' },
    { id: 'classic', label: '经典像素' },
    { id: 'favorite', label: '星标收藏' },
  ];

  const filteredPatterns = patterns.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handleOpenApply = (pat: PatternItem) => {
    setActivePattern(pat);
    setIsApplyDrawerOpen(true);
  };

  const handleOpenMenu = (e: React.MouseEvent, pat: PatternItem) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + 6,
      left: Math.max(12, rect.right - 180),
    });
    setContextMenuPattern(pat);
  };

  const handleMenuAction = (action: string) => {
    if (!contextMenuPattern) return;
    const name = contextMenuPattern.name;
    setContextMenuPattern(null);

    if (action === 'rename') {
      onShowToast(`准备重命名: ${name}`);
    } else if (action === 'copy') {
      onShowToast(`已制作「${name}」的副本`);
    } else if (action === 'export') {
      onShowToast(`正在导出「${name}」的 DMC/拼豆色卡表...`);
    } else if (action === 'delete') {
      onShowToast(`已将「${name}」移入回收站`);
    }
  };

  return (
    <div
      className="flex flex-col w-full min-h-screen pb-24 bg-[#F8F9FF]"
      onClick={() => setContextMenuPattern(null)}
    >
      {/* Top Header */}
      <header className="sticky top-0 w-full z-30 pt-safe bg-[#F8F9FF]/85 backdrop-blur-xl border-b border-[#D7E1EE]/50">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1VEn8u9OtQP_yC_AstAlvnfXnl6zBj_TGgn3oll8pnwUywZALy_TyU47URaWzKvpRV0D3lXt_cFZh4NGHmxRxpsHnYUF9t1uck8FFKUOc8os-tezM6cuP8koPqgqg28o7onv1FhqXBoQFfVCO585dhEZX3DqlpyFgsxzvV4M2gnIebv6o8kSJccSOIl7_BnKiueq2YmAx7j7gobCdDKcRVp6fmkmNqhTutKlcn-fIgdhJJAUy51kHabEYo"
              alt="Logo"
              className="h-8 w-auto object-contain rounded-md"
            />
            <h1 className="text-[20px] font-bold text-[#001C39] tracking-tight">我的图纸</h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onShowToast('搜索图纸')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#001C39] hover:bg-[#E6EEFF]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => onShowToast('上传自定义像素或网格图纸')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#001C39] hover:bg-[#E6EEFF]"
            >
              <UploadCloud className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-8 h-8 rounded-full bg-[#0057C0] text-white flex items-center justify-center ml-1"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="px-4 pt-3 pb-1 max-w-md mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(cat.id as 'all' | 'recent' | 'classic' | 'favorite')
              }
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all whitespace-nowrap active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#0057C0] text-white shadow-xs'
                  : 'bg-[#EFF4FC] text-[#5B6A82] hover:bg-[#E6EEFF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => onShowToast('已按最近修改时间排序')}
          className="w-8 h-8 rounded-full bg-[#EFF4FC] text-[#5B6A82] flex items-center justify-center shrink-0 ml-1.5"
        >
          <ArrowUpDown className="w-4 h-4" />
        </button>
      </div>

      {/* 2-Column Pattern Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 py-2 max-w-md mx-auto w-full">
        {filteredPatterns.map((pat) => (
          <div
            key={pat.id}
            onClick={() => handleOpenApply(pat)}
            className="group relative flex flex-col rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer border border-slate-100"
          >
            {/* Bead Grid Preview */}
            <div className="relative w-full aspect-square bg-[#EFF4FC] p-2 flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#0057c0 1.2px, transparent 1.2px)',
                  backgroundSize: '10px 10px',
                }}
              />
              <img
                src={pat.image}
                alt={pat.name}
                className="relative w-full h-full object-cover rounded-xl shadow-inner z-10"
              />

              {/* More button */}
              <button
                onClick={(e) => handleOpenMenu(e, pat)}
                className="absolute top-2 right-2 z-20 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#5B6A82] hover:text-[#0057C0] active:scale-90 shadow-sm"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {/* Color Count Badge */}
              <div className="absolute bottom-2 left-2 z-20 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0057C0]" />
                <span className="text-[10px] font-bold text-[#5B6A82]">{pat.colorCount}色</span>
              </div>
            </div>

            {/* Meta */}
            <div className="p-3 flex flex-col">
              <h3 className="text-[15px] font-bold text-[#001C39] truncate">{pat.name}</h3>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-[#5B6A82]">{pat.dimensions}</span>
                <span className="text-[11px] text-[#0057C0] font-bold flex items-center gap-0.5">
                  <Hand className="w-3 h-3" />
                  <span>添加</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5 py-4 text-[#5B6A82] text-[12px] opacity-75">
        <Grid2X2 className="w-4 h-4" />
        <span>轻触任意图纸，一键铺设到拼豆工作板</span>
      </div>

      {/* Context Menu Dropdown */}
      {contextMenuPattern && (
        <div
          style={{ top: menuPos.top, left: menuPos.left }}
          className="fixed z-50 w-44 rounded-2xl bg-white shadow-2xl py-1.5 border border-slate-100 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-3.5 py-1.5 border-b border-slate-100">
            <span className="text-[12px] text-[#5B6A82] font-semibold truncate block">
              {contextMenuPattern.name}
            </span>
          </div>
          <button
            onClick={() => handleMenuAction('rename')}
            className="w-full px-3.5 py-2 flex items-center gap-2 text-left text-[13px] text-[#001C39] hover:bg-[#EFF4FC] transition-colors"
          >
            <Edit2 className="w-4 h-4 text-[#5B6A82]" />
            <span>重命名</span>
          </button>
          <button
            onClick={() => handleMenuAction('copy')}
            className="w-full px-3.5 py-2 flex items-center gap-2 text-left text-[13px] text-[#001C39] hover:bg-[#EFF4FC] transition-colors"
          >
            <Copy className="w-4 h-4 text-[#5B6A82]" />
            <span>制作副本</span>
          </button>
          <button
            onClick={() => handleMenuAction('export')}
            className="w-full px-3.5 py-2 flex items-center gap-2 text-left text-[13px] text-[#001C39] hover:bg-[#EFF4FC] transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#5B6A82]" />
            <span>导出色卡表</span>
          </button>
          <div className="my-1 h-px bg-slate-100" />
          <button
            onClick={() => handleMenuAction('delete')}
            className="w-full px-3.5 py-2 flex items-center gap-2 text-left text-[13px] text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
            <span>删除图纸</span>
          </button>
        </div>
      )}

      {/* Apply to Canvas Bottom Sheet */}
      {isApplyDrawerOpen && activePattern && (
        <div
          className="fixed inset-0 z-50 bg-[#001C39]/30 backdrop-blur-xs flex flex-col justify-end transition-opacity"
          onClick={() => setIsApplyDrawerOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl shadow-2xl p-5 flex flex-col gap-4 border-t border-slate-100 max-w-md mx-auto w-full pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto" />

            {/* Pattern info */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={activePattern.image}
                  alt={activePattern.name}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#0057C0]">添加到画布工作台</span>
                  <h4 className="text-[17px] font-bold text-[#001C39]">{activePattern.name}</h4>
                  <span className="text-[11px] text-[#5B6A82]">
                    {activePattern.dimensions} · {activePattern.colorCount} 色 · {activePattern.beadsCount} 颗
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsApplyDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Option 1: Existing Active Canvas */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#5B6A82] px-1">
                推荐：置入当前正在制作的画布
              </span>
              <button
                onClick={() => {
                  setIsApplyDrawerOpen(false);
                  onShowToast(`已将「${activePattern.name}」添加至画布：橘子面包`);
                  onNavigate('editor');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#EFF4FC] hover:bg-[#E6EEFF] text-left flex items-center justify-between active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0057C0]/10 flex items-center justify-center text-[#0057C0]">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#001C39]">橘子面包 #01</span>
                    <span className="text-[12px] text-[#5B6A82]">
                      标准 104 孔中号拼板 · 尚有剩余空隙
                    </span>
                  </div>
                </div>
                <Check className="w-5 h-5 text-[#0057C0]" />
              </button>
            </div>

            {/* Option 2: Create New Canvas */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-[#5B6A82] px-1">
                或者创建独立专属工作台
              </span>
              <button
                onClick={() => {
                  setIsApplyDrawerOpen(false);
                  onShowToast(`正在为「${activePattern.name}」初始化自适应画板...`);
                  onNavigate('editor');
                }}
                className="w-full p-3.5 rounded-2xl bg-[#0057C0] text-white hover:bg-[#1B70E9] text-left flex items-center justify-between shadow-md shadow-[#0057C0]/25 active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <FolderPlus className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-white">创建新画布并导入</span>
                    <span className="text-[12px] text-white/80">根据图纸尺寸自动自适应板形</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

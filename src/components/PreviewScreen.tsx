import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  ChevronLeft,
  Share2,
  MoreHorizontal,
  ZoomIn,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';

interface PreviewScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [viewMode, setViewMode] = useState<'bead' | 'pixel' | 'clean'>('bead');
  const [showCheckToast, setShowCheckToast] = useState(false);

  const handleInspect = () => {
    setShowCheckToast(true);
    setTimeout(() => {
      setShowCheckToast(false);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-[#F8F9FE] select-none">
      {/* Top Header */}
      <header className="w-full pt-safe bg-white/90 backdrop-blur-xl z-40 flex-shrink-0 border-b border-[#E2E8F4]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-9 h-9 -ml-1.5 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              title="返回"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-[17px] font-extrabold text-[#0F1D32] tracking-tight">作品全景预览</h1>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F1FF] text-[#0057C0] text-[11px] font-bold">
                柴犬 #01
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onShowToast('已生成高清作品分享图卡')}
              className="w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition active:scale-95"
              title="分享"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={() => onShowToast('更多选项：导出 PDF 图纸、色号采购清单')}
              className="w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition active:scale-95"
              title="更多"
            >
              <MoreHorizontal className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-h-0 w-full px-4 pt-2 pb-2 justify-between max-w-md mx-auto">
        {/* Segmented Control */}
        <div className="w-full flex justify-center flex-shrink-0">
          <div className="w-full max-w-[280px] p-1 rounded-full bg-[#E5ECF6] flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setViewMode('bead')}
              className={`flex-1 py-1 px-3 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === 'bead'
                  ? 'bg-white text-[#3D85FF] shadow-xs'
                  : 'text-[#5B6A82] hover:text-[#111C2D]'
              }`}
            >
              {viewMode === 'bead' && (
                <span className="w-2 h-2 rounded-full bg-[#3D85FF] inline-block shadow-xs" />
              )}
              <span>豆子</span>
            </button>
            <button
              onClick={() => setViewMode('pixel')}
              className={`flex-1 py-1 px-3 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === 'pixel'
                  ? 'bg-white text-[#3D85FF] shadow-xs'
                  : 'text-[#5B6A82] hover:text-[#111C2D]'
              }`}
            >
              {viewMode === 'pixel' && (
                <span className="w-2 h-2 rounded-full bg-[#3D85FF] inline-block shadow-xs" />
              )}
              <span>像素</span>
            </button>
            <button
              onClick={() => setViewMode('clean')}
              className={`flex-1 py-1 px-3 rounded-full text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                viewMode === 'clean'
                  ? 'bg-white text-[#3D85FF] shadow-xs'
                  : 'text-[#5B6A82] hover:text-[#111C2D]'
              }`}
            >
              {viewMode === 'clean' && (
                <span className="w-2 h-2 rounded-full bg-[#3D85FF] inline-block shadow-xs" />
              )}
              <span>简洁</span>
            </button>
          </div>
        </div>

        {/* Hero Artwork Preview Zone */}
        <div className="flex-1 w-full my-2 min-h-0 flex items-center justify-center relative">
          <div className="relative w-full h-full rounded-3xl bg-white shadow-[0_8px_30px_rgba(40,70,120,0.06)] border border-white/80 overflow-hidden flex items-center justify-center p-4">
            {/* Pegboard radial dot background */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                viewMode === 'clean'
                  ? 'opacity-0'
                  : viewMode === 'pixel'
                  ? 'opacity-60'
                  : 'opacity-40'
              }`}
              style={{
                backgroundImage: 'radial-gradient(#3D85FF 1.3px, transparent 1.3px)',
                backgroundSize: '14px 14px',
              }}
            />

            {/* Coordinates tag */}
            {viewMode !== 'clean' && (
              <div className="absolute top-3 left-3.5 flex items-center gap-1.5 text-[11px] font-bold text-[#8B98AD] tracking-wider">
                <span>X: 32</span>
                <span className="text-[8px] opacity-60">●</span>
                <span>Y: 32</span>
              </div>
            )}

            {/* Zoom pill */}
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 shadow-xs flex items-center gap-1 z-20">
              <ZoomIn className="w-3.5 h-3.5 text-[#3D85FF]" />
              <span className="text-[11px] font-bold text-[#111C2D]">100%</span>
            </div>

            {/* Shiba Inu Perler Artwork SVG */}
            <div
              className={`relative z-10 w-full h-full max-h-[340px] flex items-center justify-center transition-all duration-300 ${
                viewMode === 'clean' ? 'scale-105' : 'scale-100'
              }`}
            >
              <svg
                viewBox="0 0 240 240"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(254,137,60,0.18)]"
              >
                <defs>
                  <radialGradient id="previewBeadGloss" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                    <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
                  </radialGradient>
                </defs>

                <g id="preview-artwork-main">
                  {/* Ears */}
                  <path d="M 62 44 L 92 44 L 82 82 L 52 72 Z" fill="#FE893C" />
                  <path d="M 178 44 L 148 44 L 158 82 L 188 72 Z" fill="#FE893C" />
                  <path d="M 68 52 L 84 52 L 76 74 L 60 68 Z" fill="#FFDAD6" />
                  <path d="M 172 52 L 156 52 L 164 74 L 180 68 Z" fill="#FFDAD6" />

                  {/* Head Contour */}
                  <rect x="52" y="72" width="136" height="98" rx="28" fill="#FE893C" />
                  <rect x="42" y="90" width="156" height="72" rx="20" fill="#FE893C" />

                  {/* White Muzzle */}
                  <ellipse cx="82" cy="130" rx="34" ry="26" fill="#FFFFFF" />
                  <ellipse cx="158" cy="130" rx="34" ry="26" fill="#FFFFFF" />
                  <rect x="80" y="112" width="80" height="42" rx="14" fill="#FFFFFF" />

                  {/* Eyebrows */}
                  <circle cx="86" cy="86" r="7" fill="#FFFFFF" />
                  <circle cx="154" cy="86" r="7" fill="#FFFFFF" />

                  {/* Eyes */}
                  <circle cx="82" cy="112" r="6.5" fill="#111C2D" />
                  <circle cx="80" cy="110" r="2" fill="#FFFFFF" />
                  <circle cx="158" cy="112" r="6.5" fill="#111C2D" />
                  <circle cx="156" cy="110" r="2" fill="#FFFFFF" />

                  {/* Nose & Smile */}
                  <ellipse cx="120" cy="123" rx="8" ry="6" fill="#111C2D" />
                  <path
                    d="M 112 135 Q 120 143 128 135"
                    fill="none"
                    stroke="#111C2D"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  {/* Blush */}
                  <circle cx="64" cy="126" r="8" fill="#FFB68D" opacity="0.85" />
                  <circle cx="176" cy="126" r="8" fill="#FFB68D" opacity="0.85" />

                  {/* Collar & Bell */}
                  <rect x="75" y="174" width="90" height="15" rx="7.5" fill="#3D85FF" />
                  <circle cx="120" cy="186" r="10" fill="#FE893C" />
                  <circle cx="120" cy="186" r="6.5" fill="#FFDBC9" />
                  <circle cx="120" cy="187" r="2" fill="#763300" />

                  {/* Bead center hole overlay in bead mode */}
                  {viewMode === 'bead' && (
                    <g fill="#001C39" opacity="0.32" className="transition-opacity duration-300">
                      <circle cx="72" cy="62" r="2.2" />
                      <circle cx="168" cy="62" r="2.2" />
                      <circle cx="76" cy="86" r="2.2" />
                      <circle cx="86" cy="86" r="2.2" />
                      <circle cx="96" cy="86" r="2.2" />
                      <circle cx="144" cy="86" r="2.2" />
                      <circle cx="154" cy="86" r="2.2" />
                      <circle cx="164" cy="86" r="2.2" />
                      <circle cx="110" cy="78" r="2.2" />
                      <circle cx="120" cy="78" r="2.2" />
                      <circle cx="130" cy="78" r="2.2" />
                      <circle cx="106" cy="90" r="2.2" />
                      <circle cx="120" cy="90" r="2.2" />
                      <circle cx="134" cy="90" r="2.2" />
                      <circle cx="120" cy="102" r="2.2" />
                      <circle cx="64" cy="112" r="2.2" />
                      <circle cx="176" cy="112" r="2.2" />
                      <circle cx="64" cy="126" r="2.2" />
                      <circle cx="176" cy="126" r="2.2" />
                      <circle cx="100" cy="124" r="2.2" />
                      <circle cx="140" cy="124" r="2.2" />
                      <circle cx="102" cy="138" r="2.2" />
                      <circle cx="138" cy="138" r="2.2" />
                      <circle cx="112" cy="154" r="2.2" />
                      <circle cx="120" cy="155" r="2.2" />
                      <circle cx="128" cy="154" r="2.2" />
                      <circle cx="88" cy="181" r="2.2" />
                      <circle cx="102" cy="181" r="2.2" />
                      <circle cx="138" cy="181" r="2.2" />
                      <circle cx="152" cy="181" r="2.2" />
                      <circle cx="120" cy="186" r="2.6" />
                    </g>
                  )}

                  {/* Bead Sheen Reflection */}
                  {viewMode === 'bead' && (
                    <rect
                      x="42"
                      y="44"
                      width="156"
                      height="150"
                      rx="24"
                      fill="url(#previewBeadGloss)"
                      pointerEvents="none"
                      className="transition-opacity duration-300"
                    />
                  )}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* 3 Stats Columns & Color Pills */}
        <div className="w-full flex-shrink-0 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-bold text-[#111C2D]">柴犬团子 · 挂件</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#E5ECF6] text-[#28599E] text-[10px] font-bold tracking-wide">
                MIDI 2.6MM
              </span>
            </div>
            <span className="text-[12px] text-[#5B6A82] font-semibold">耗时约 45分</span>
          </div>

          {/* 3 Columns */}
          <div className="w-full rounded-2xl bg-white border border-[#D7E1EE]/40 py-2.5 px-3 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] text-[#5B6A82] mb-0.5 font-medium">画板规格</span>
              <span className="text-[16px] font-bold text-[#111C2D]">标准104板</span>
            </div>
            <div className="w-px h-6 bg-[#E3EAF4]" />
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] text-[#5B6A82] mb-0.5 font-medium">总颗数</span>
              <span className="text-[16px] font-bold text-[#3D85FF]">1008颗</span>
            </div>
            <div className="w-px h-6 bg-[#E3EAF4]" />
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] text-[#5B6A82] mb-0.5 font-medium">颜色数</span>
              <span className="text-[16px] font-bold text-[#111C2D]">14色</span>
            </div>
          </div>

          {/* Color Pills Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            <div className="px-2.5 py-1 rounded-full bg-white border border-[#D7E1EE]/60 flex items-center gap-1.5 shrink-0 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FE893C] shadow-xs" />
              <span className="text-[11px] font-semibold text-[#111C2D]">#P18 焦糖 420颗</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-white border border-[#D7E1EE]/60 flex items-center gap-1.5 shrink-0 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-300 shadow-xs" />
              <span className="text-[11px] font-semibold text-[#111C2D]">#P01 纯白 312颗</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-white border border-[#D7E1EE]/60 flex items-center gap-1.5 shrink-0 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111C2D] shadow-xs" />
              <span className="text-[11px] font-semibold text-[#111C2D]">#P12 曜黑 68颗</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-white border border-[#D7E1EE]/60 flex items-center gap-1.5 shrink-0 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFB68D] shadow-xs" />
              <span className="text-[11px] font-semibold text-[#111C2D]">#P34 桃粉 42颗</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA Actions */}
        <div className="w-full pb-safe pt-2 flex-shrink-0 flex items-center gap-3">
          <button
            onClick={handleInspect}
            className="h-12 px-5 rounded-2xl bg-white border border-[#D7E1EE] text-[#111C2D] font-bold text-[15px] flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
          >
            <ClipboardCheck className="w-5 h-5 text-[#3D85FF]" />
            <span>检查</span>
          </button>
          <button
            onClick={() => onNavigate('strategy')}
            className="flex-1 h-12 rounded-2xl bg-[#3D85FF] hover:bg-[#2B74F0] text-white font-bold text-[16px] flex items-center justify-center gap-1.5 shadow-[0_6px_20px_rgba(61,133,255,0.38)] active:scale-[0.98] transition-all"
          >
            <span>开始拼</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Quality Check Toast */}
      {showCheckToast && (
        <div className="fixed bottom-24 left-5 right-5 p-3.5 rounded-2xl bg-[#111C2D]/95 backdrop-blur-xl text-white shadow-2xl z-50 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="text-[13px] font-bold">校验完成：图纸状态完美</span>
              <span className="text-[11px] text-white/70">
                14 色库存齐备，无漏拼空孔与孤立悬空豆
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowCheckToast(false)}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

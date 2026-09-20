import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  ChevronLeft,
  User,
  Grid,
  Sparkles,
  Check,
  Calculator,
  Sliders,
  Minus,
  Plus,
  ArrowRight,
  Pencil,
} from 'lucide-react';

interface CreateCanvasScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType, canvasId?: string) => void;
  onShowToast: (msg: string) => void;
}

export const CreateCanvasScreen: React.FC<CreateCanvasScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [boardType, setBoardType] = useState<'std104' | 'mini' | 'stitch' | 'custom'>('std104');
  const [miniPins, setMiniPins] = useState<'52' | '78'>('52');
  const [stitchLayout, setStitchLayout] = useState<'2x1' | '1x2' | '2x2' | '3x2' | '3x3' | 'custom'>('2x2');
  const [customW, setCustomW] = useState(60);
  const [customH, setCustomH] = useState(60);
  const [canvasName, setCanvasName] = useState('未命名拼豆画布 #05');

  const stitchDetails: Record<string, { plates: number; desc: string }> = {
    '2x1': { plates: 2, desc: '2块标准104板 · 约 52cm × 20cm · 4160 钉位' },
    '1x2': { plates: 2, desc: '2块标准104板 · 约 26cm × 40cm · 4160 钉位' },
    '2x2': { plates: 4, desc: '4块标准104板 · 约 52cm × 40cm · 8320 钉位' },
    '3x2': { plates: 6, desc: '6块标准104板 · 约 78cm × 40cm · 12480 钉位' },
    '3x3': { plates: 9, desc: '9块标准104板 · 约 78cm × 60cm · 18720 钉位' },
    custom: { plates: 0, desc: '自定义点阵组合 · 动态自由无缝扩展' },
  };

  const handleCreate = () => {
    onShowToast(`已创建画布「${canvasName}」！已自动载入精准网格`);
    onNavigate('editor');
  };

  return (
    <div className="flex flex-col w-full min-h-screen pb-32 bg-[#F8F9FF]">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-30 pt-safe bg-white/90 backdrop-blur-xl border-b border-[#E2E8F4]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-9 h-9 -ml-1.5 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              title="返回"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-[17px] font-extrabold text-[#0F1D32] tracking-tight">新建拼豆画板</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#0057C0] bg-[#E8F1FF] px-2.5 py-1 rounded-full">
              规格设定
            </span>
          </div>
        </div>
      </header>

      {/* Body container */}
      <div className="px-4 pt-3 max-w-md mx-auto w-full flex flex-col gap-4">
        {/* Intro */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-[#001C39]">选择画布规格</h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#D8E2FF] text-[#004397]">
              4种模板
            </span>
          </div>
          <p className="text-[12px] text-[#5B6A82]">
            轻触直接选定画板，系统已预置精准网格与珠位计算
          </p>
        </div>

        {/* 4 Cards */}
        <div className="flex flex-col gap-3">
          {/* Card 1: 标准104板 */}
          <div
            onClick={() => setBoardType('std104')}
            className={`rounded-2xl p-4 bg-white cursor-pointer transition-all duration-200 border ${
              boardType === 'std104'
                ? 'border-[#0057C0] ring-2 ring-[#0057C0]/30 shadow-md'
                : 'border-slate-100 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0057C0] text-white flex items-center justify-center shadow-sm">
                  <Grid className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[16px] font-bold text-[#001C39]">标准104板</h3>
                    <span className="text-[10px] font-bold bg-[#FE893C] text-white px-2 py-0.5 rounded-full">
                      最常用规格
                    </span>
                  </div>
                  <p className="text-[12px] text-[#0057C0] font-semibold mt-0.5">
                    尺寸约 26cm × 20cm
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  boardType === 'std104'
                    ? 'bg-[#0057C0] text-white'
                    : 'bg-slate-100 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#EFF4FC] flex items-center justify-center">
                  <div className="grid grid-cols-6 gap-0.5 w-10 opacity-75">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <span key={i} className="w-1 h-1 rounded-full bg-[#0057C0] block" />
                    ))}
                  </div>
                </div>
                <span className="text-[12px] text-[#5B6A82]">
                  标准 104格点阵 (约 2080 钉位)
                </span>
              </div>
              <span className="text-[11px] text-[#0057C0] font-bold">推荐首选</span>
            </div>
          </div>

          {/* Card 2: 小号 / 微型板 */}
          <div
            onClick={() => setBoardType('mini')}
            className={`rounded-2xl p-4 bg-white cursor-pointer transition-all duration-200 border ${
              boardType === 'mini'
                ? 'border-[#0057C0] ring-2 ring-[#0057C0]/30 shadow-md'
                : 'border-slate-100 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#001C39]">小号 / 微型板</h3>
                  <p className="text-[12px] text-[#5B6A82] mt-0.5">
                    适合小挂件、胸针、耳钉、小型作品
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  boardType === 'mini'
                    ? 'bg-[#0057C0] text-white'
                    : 'bg-slate-100 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setBoardType('mini');
                  setMiniPins('52');
                }}
                className={`p-2.5 rounded-xl border flex flex-col gap-0.5 transition-all ${
                  miniPins === '52' && boardType === 'mini'
                    ? 'bg-[#EFF4FC] border-[#0057C0]'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#001C39]">52 钉</span>
                  {miniPins === '52' && boardType === 'mini' && (
                    <span className="w-2 h-2 rounded-full bg-[#0057C0]" />
                  )}
                </div>
                <span className="text-[11px] text-[#5B6A82]">
                  适合：胸针、耳钉等迷你配饰
                </span>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setBoardType('mini');
                  setMiniPins('78');
                }}
                className={`p-2.5 rounded-xl border flex flex-col gap-0.5 transition-all ${
                  miniPins === '78' && boardType === 'mini'
                    ? 'bg-[#EFF4FC] border-[#0057C0]'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#001C39]">78 钉</span>
                  {miniPins === '78' && boardType === 'mini' && (
                    <span className="w-2 h-2 rounded-full bg-[#0057C0]" />
                  )}
                </div>
                <span className="text-[11px] text-[#5B6A82]">
                  适合：小挂件、钥匙扣、小徽章
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: 标准板拼接 */}
          <div
            onClick={() => setBoardType('stitch')}
            className={`rounded-2xl p-4 bg-white cursor-pointer transition-all duration-200 border ${
              boardType === 'stitch'
                ? 'border-[#0057C0] ring-2 ring-[#0057C0]/30 shadow-md'
                : 'border-slate-100 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#001C39]">标准板拼接</h3>
                  <p className="text-[12px] text-[#5B6A82] mt-0.5">
                    多块组合绘制大幅面图腾
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  boardType === 'stitch'
                    ? 'bg-[#0057C0] text-white'
                    : 'bg-slate-100 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Layout buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 mt-2">
              {(['2x1', '1x2', '2x2', '3x2', '3x3', 'custom'] as const).map((layout) => (
                <button
                  key={layout}
                  onClick={(e) => {
                    e.stopPropagation();
                    setBoardType('stitch');
                    setStitchLayout(layout);
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                    stitchLayout === layout && boardType === 'stitch'
                      ? 'bg-[#0057C0] text-white shadow-xs'
                      : 'bg-[#EFF4FC] text-[#5B6A82] hover:bg-[#E6EEFF]'
                  }`}
                >
                  {layout === 'custom' ? '自定义' : layout}
                </button>
              ))}
            </div>

            {/* Auto calc info */}
            <div className="mt-2 p-2.5 rounded-xl bg-[#EFF4FC] flex items-start gap-2">
              <Calculator className="w-4 h-4 text-[#0057C0] mt-0.5 shrink-0" />
              <p className="text-[12px] text-[#5B6A82] leading-snug">
                系统已自动计算整板画布：
                <span className="font-bold text-[#001C39]">
                  {' '}
                  {stitchDetails[stitchLayout].desc}
                </span>{' '}
                (无需手动换算)
              </p>
            </div>
          </div>

          {/* Card 4: 自定义画板 */}
          <div
            onClick={() => setBoardType('custom')}
            className={`rounded-2xl p-4 bg-white cursor-pointer transition-all duration-200 border ${
              boardType === 'custom'
                ? 'border-[#0057C0] ring-2 ring-[#0057C0]/30 shadow-md'
                : 'border-slate-100 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#001C39]">自定义画板</h3>
                  <p className="text-[12px] text-[#5B6A82] mt-0.5">
                    按需设定非标钉位尺寸
                  </p>
                </div>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  boardType === 'custom'
                    ? 'bg-[#0057C0] text-white'
                    : 'bg-slate-100 text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Steppers */}
            <div
              className="grid grid-cols-2 gap-3 mt-3 pt-2 border-t border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#5B6A82]">横向钉数</span>
                <div className="flex items-center justify-between h-9 px-2 bg-[#EFF4FC] rounded-xl">
                  <button
                    onClick={() => setCustomW((w) => Math.max(10, w - 5))}
                    className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#001C39]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[13px] font-bold text-[#001C39]">{customW} 钉</span>
                  <button
                    onClick={() => setCustomW((w) => Math.min(200, w + 5))}
                    className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#001C39]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#5B6A82]">纵向钉数</span>
                <div className="flex items-center justify-between h-9 px-2 bg-[#EFF4FC] rounded-xl">
                  <button
                    onClick={() => setCustomH((h) => Math.max(10, h - 5))}
                    className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#001C39]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[13px] font-bold text-[#001C39]">{customH} 钉</span>
                  <button
                    onClick={() => setCustomH((h) => Math.min(200, h + 5))}
                    className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#001C39]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Floating Creation Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe pt-3 bg-white/90 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] flex flex-col gap-2.5 max-w-md mx-auto">
        <div className="flex items-center gap-2 px-3 h-11 bg-[#EFF4FC] rounded-xl">
          <Pencil className="w-4 h-4 text-[#0057C0]" />
          <input
            type="text"
            value={canvasName}
            onChange={(e) => setCanvasName(e.target.value)}
            className="flex-1 bg-transparent text-[13px] text-[#001C39] font-medium focus:outline-none"
            placeholder="输入画布名称"
          />
          <span className="text-[11px] text-[#5B6A82] font-semibold">标清像素</span>
        </div>

        <button
          onClick={handleCreate}
          className="w-full h-12 bg-[#0057C0] hover:bg-[#1B70E9] text-white rounded-full text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_6px_20px_-2px_rgba(0,87,192,0.35)] active:scale-[0.98] transition-transform"
        >
          <span>创建画布</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

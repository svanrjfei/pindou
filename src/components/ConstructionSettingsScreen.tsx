import React, { useState } from 'react';
import { ScreenType } from '../types';
import {
  ChevronLeft,
  MoreHorizontal,
  LayoutGrid,
  Check,
  Inbox,
  Minus,
  Plus,
  Zap,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  X,
  Sliders,
  RotateCcw,
} from 'lucide-react';

interface ConstructionSettingsScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const ConstructionSettingsScreen: React.FC<ConstructionSettingsScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const [regionSize, setRegionSize] = useState<'5x5' | '10x10'>('5x5');
  const [trayCount, setTrayCount] = useState<number>(8);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [avoidMishapLock, setAvoidMishapLock] = useState(true);
  const [centerOutwardOrder, setCenterOutwardOrder] = useState(true);

  // Dynamic calculations based on parameters
  const batches = trayCount >= 8 ? 2 : 3;
  const regions = regionSize === '5x5' ? 43 : 12;

  const handleStart = () => {
    onShowToast('施工参数已就绪，正在准备第 1 批料盒与网格...');
    onNavigate('workbench');
  };

  return (
    <div className="flex flex-col w-full min-h-screen pb-safe bg-[#F8F9FF] select-none">
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
            <h1 className="text-[17px] font-extrabold text-[#0F1D32] tracking-tight">施工参数规划</h1>
          </div>
          <button
            onClick={() => {
              setRegionSize('5x5');
              setTrayCount(8);
              setAvoidMishapLock(true);
              setCenterOutwardOrder(true);
              onShowToast('已恢复推荐施工默认参数 (5×5 单元 / 8色格)');
            }}
            className="w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition active:scale-95"
            title="恢复默认"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-between px-4 pt-3 pb-6 max-w-md mx-auto w-full">
        <div className="flex flex-col gap-3.5">
          {/* Active Mode Context Banner */}
          <div className="p-3.5 rounded-2xl bg-[#EFF4FC] flex items-center justify-between border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0057C0]/10 flex items-center justify-center text-[#0057C0]">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#5B6A82]">已选拼法策略</span>
                <span className="text-[15px] font-bold text-[#001C39]">区域 + 批次拼装</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#D8E2FF] text-[#004397] text-[11px] font-bold">
              推荐方案
            </span>
          </div>

          {/* Parameter 1: 区域大小 */}
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-[#0057C0]" />
                <h3 className="text-[15px] font-bold text-[#001C39]">区域大小</h3>
              </div>
              <span className="text-[11px] text-[#5B6A82]">单位：格点</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* 5x5 Option */}
              <button
                type="button"
                onClick={() => setRegionSize('5x5')}
                className={`p-3.5 rounded-xl text-left flex flex-col transition-all border ${
                  regionSize === '5x5'
                    ? 'bg-[#EFF4FC] border-[#0057C0] shadow-xs'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-[18px] font-bold text-[#0057C0]">5 × 5</span>
                  {regionSize === '5x5' && (
                    <span className="w-5 h-5 rounded-full bg-[#0057C0] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#5B6A82] mt-1">适合中小型作品分块拼装</span>
              </button>

              {/* 10x10 Option */}
              <button
                type="button"
                onClick={() => setRegionSize('10x10')}
                className={`p-3.5 rounded-xl text-left flex flex-col transition-all border ${
                  regionSize === '10x10'
                    ? 'bg-[#EFF4FC] border-[#0057C0] shadow-xs'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-[18px] font-bold text-[#001C39]">10 × 10</span>
                  {regionSize === '10x10' && (
                    <span className="w-5 h-5 rounded-full bg-[#0057C0] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#5B6A82] mt-1">适合大幅面快速平铺铺色</span>
              </button>
            </div>
          </div>

          {/* Parameter 2: 料盒数量 */}
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-[#0057C0]" />
                <h3 className="text-[15px] font-bold text-[#001C39]">料盒数量</h3>
              </div>
              <span className="text-[11px] text-[#5B6A82]">单次取用颜色数</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-[#EFF4FC] rounded-xl">
              <div className="flex flex-col pl-1">
                <span className="text-[17px] font-bold text-[#001C39]">
                  {trayCount} <span className="text-[13px] font-medium text-[#5B6A82]">格料盒</span>
                </span>
                <span className="text-[11px] text-[#5B6A82]">常见便携分装盒规格</span>
              </div>

              {/* Stepper */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs border border-slate-100">
                <button
                  type="button"
                  onClick={() => setTrayCount((c) => Math.max(4, c - 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#001C39] hover:bg-[#EFF4FC] active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-8 text-center text-[16px] font-bold text-[#0057C0]">
                  {trayCount}
                </div>
                <button
                  type="button"
                  onClick={() => setTrayCount((c) => Math.min(24, c + 1))}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#001C39] hover:bg-[#EFF4FC] active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="p-4 rounded-2xl bg-[#EFF4FC] border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#001C39]">施工计划摘要</span>
              <div className="inline-flex items-center text-emerald-600 text-[11px] font-bold gap-0.5">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>高效流转</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white flex flex-col border border-slate-100">
                <span className="text-[11px] text-[#5B6A82]">备料批次</span>
                <span className="text-[28px] font-bold text-[#0057C0] leading-none my-1">
                  {batches}
                </span>
                <span className="text-[11px] text-[#5B6A82]">批颜色</span>
              </div>

              <div className="p-3 rounded-xl bg-white flex flex-col border border-slate-100">
                <span className="text-[11px] text-[#5B6A82]">规划单元</span>
                <span className="text-[28px] font-bold text-[#001C39] leading-none my-1">
                  {regions}
                </span>
                <span className="text-[11px] text-[#5B6A82]">个区域</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pt-1 text-[#5B6A82]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-[12px]">预计单批换料仅需 1 次，低错漏率</span>
            </div>
          </div>

          {/* More Settings Accessor */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsAdvancedOpen(true)}
              className="inline-flex items-center gap-1 text-[#0057C0] text-[13px] font-bold py-1 px-3 rounded-full hover:bg-[#E6EEFF]"
            >
              <Sliders className="w-4 h-4" />
              <span>更多偏好设置</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-6">
          <button
            onClick={handleStart}
            className="w-full h-12 rounded-full bg-[#0057C0] hover:bg-[#1B70E9] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,87,192,0.3)] active:scale-[0.98] transition-transform"
          >
            <span>开始拼</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Advanced Settings Drawer Modal */}
      {isAdvancedOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#001C39]/30 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setIsAdvancedOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl shadow-2xl p-5 flex flex-col gap-4 border-t border-slate-100 max-w-md mx-auto w-full pb-safe"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 bg-slate-300 rounded-full mx-auto" />

            <div className="flex items-center justify-between pb-1">
              <h3 className="text-[17px] font-bold text-[#001C39]">高级施工选项</h3>
              <button
                onClick={() => setIsAdvancedOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
              <div className="flex items-center justify-between py-3">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#001C39]">防误触完成锁定</span>
                  <span className="text-[12px] text-[#5B6A82]">点按两秒方可标记区块完成</span>
                </div>
                <button
                  onClick={() => setAvoidMishapLock(!avoidMishapLock)}
                  className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                    avoidMishapLock ? 'bg-[#0057C0]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                      avoidMishapLock ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-[#001C39]">拼合顺序引导</span>
                  <span className="text-[12px] text-[#5B6A82]">从中心发散优先保证平整度</span>
                </div>
                <button
                  onClick={() => setCenterOutwardOrder(!centerOutwardOrder)}
                  className={`w-12 h-7 rounded-full p-0.5 transition-colors ${
                    centerOutwardOrder ? 'bg-[#0057C0]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                      centerOutwardOrder ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setIsAdvancedOpen(false);
                onShowToast('偏好选项已更新保存');
              }}
              className="w-full py-3 rounded-full bg-[#EFF4FC] text-[#0057C0] text-[14px] font-bold mt-2 active:scale-98"
            >
              保存并返回
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

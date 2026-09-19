import React from 'react';
import { ScreenType } from '../types';
import {
  ChevronLeft,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
} from 'lucide-react';

interface QualityInspectionScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const QualityInspectionScreen: React.FC<QualityInspectionScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-safe bg-[#F8F9FE] select-none">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-40 pt-safe bg-[#F8F9FE]/90 backdrop-blur-md border-b border-[#D7E1EE]/50">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onBack}
              className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#111C2D] hover:bg-[#E7EEF8]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-[16px] font-bold text-[#111C2D]">批次质检与验收</h1>
          </div>
          <button
            onClick={() => onShowToast('分享当前拼豆质检报告')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#111C2D] hover:bg-[#E7EEF8]"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-between px-4 pt-3 pb-6 max-w-md mx-auto w-full">
        <div className="flex flex-col gap-4">
          {/* Status Hero Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0057C0] to-[#1B70E9] text-white shadow-lg shadow-[#0057C0]/25 flex flex-col items-center text-center gap-2 relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white my-1 shadow-inner">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-[20px] font-bold">第 1 批料盒拼装验收通过！</h2>
            <p className="text-[12px] text-white/85 max-w-xs">
              系统已完成对 25 个区域、528 颗钉位的智能防呆核验，色号与孔位精准无误。
            </p>

            <div className="flex items-center gap-3 mt-2 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium backdrop-blur-xs">
              <span>已放置 528 / 1008 颗</span>
              <span>·</span>
              <span>完成度 52%</span>
            </div>
          </div>

          {/* 3 Inspection Metrics */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[13px] font-bold text-[#111C2D] px-1">智能核验明细</span>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#111C2D]">漏拼排查</span>
                <span className="text-[12px] text-[#5B6A82]">
                  当前批次无遗漏空孔，各钉位拼豆均已紧密卡位。
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#111C2D]">色号复验</span>
                <span className="text-[12px] text-[#5B6A82]">
                  8 组料格色号对比完全吻合，无误放临近色情况。
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#111C2D]">结构防脱落预警</span>
                <span className="text-[12px] text-[#5B6A82]">
                  顶部耳朵边缘有 2 颗悬空挂接豆，熨烫时建议延长 5 秒温压。
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 mt-6">
          <button
            onClick={() => {
              onShowToast('正在载入第 2 批料盒配置...');
              onNavigate('workbench');
            }}
            className="w-full h-12 rounded-full bg-[#0057C0] hover:bg-[#1B70E9] text-white text-[15px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,87,192,0.3)] active:scale-[0.98] transition-transform"
          >
            <Layers className="w-4 h-4" />
            <span>继续第 2 批料盒拼装 (剩余 480 颗)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onShowToast('正在生成熨烫温度与垫纸指南...');
              onNavigate('stats');
            }}
            className="w-full h-11 rounded-full bg-[#EFF4FC] hover:bg-[#E6EEFF] text-[#0057C0] text-[14px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <Flame className="w-4 h-4 text-[#FE893C]" />
            <span>查看熨烫温控指南 & 数据统计</span>
          </button>

          <button
            onClick={() => onNavigate('home')}
            className="w-full py-2 text-[#5B6A82] hover:text-[#111C2D] text-[13px] font-medium text-center"
          >
            保存进度并返回首页
          </button>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { ScreenType } from '../types';
import {
  User,
  Palette,
  PackageCheck,
  Camera,
  FolderArchive,
  Volume2,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Settings,
} from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigate,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-24 bg-[#F8F9FF] select-none">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-30 pt-safe bg-white/90 backdrop-blur-xl border-b border-[#E2E8F4]/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
        <div className="h-14 px-4 flex items-center justify-between">
          <h1 className="text-[17px] font-extrabold text-[#0F1D32] tracking-tight">个人手作中心</h1>
          <button
            onClick={() => onShowToast('系统与偏好设置')}
            className="w-9 h-9 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 flex items-center justify-center transition active:scale-95"
            title="设置"
          >
            <Settings className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="px-4 pt-3 max-w-md mx-auto w-full flex flex-col gap-4">
        {/* User Card */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0057C0] to-[#3D85FF] p-0.5 shadow-md shadow-[#0057C0]/20 flex items-center justify-center text-white">
              <div className="w-full h-full rounded-[14px] bg-[#0057C0] flex items-center justify-center">
                <User className="w-7 h-7" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-bold text-[#001C39]">拼豆手作师 · 豆豆酱</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#D8E2FF] text-[#004397] text-[10px] font-bold">
                  PRO
                </span>
              </div>
              <span className="text-[12px] text-[#5B6A82] mt-0.5">
                累计完成 18 件作品 · 36 小时手作沉浸
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Quick Overview */}
        <div className="grid grid-cols-3 gap-2.5">
          <div
            onClick={() => onShowToast('豆仓管理：86 种色号库存均已同步')}
            className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
          >
            <Palette className="w-5 h-5 text-[#0057C0] mb-1" />
            <span className="text-[16px] font-bold text-[#001C39]">86 色</span>
            <span className="text-[10px] text-[#5B6A82]">豆仓色号</span>
          </div>

          <div
            onClick={() => onShowToast('拼板库：包含标准104板、微型52板与组合拼接板')}
            className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
          >
            <PackageCheck className="w-5 h-5 text-emerald-600 mb-1" />
            <span className="text-[16px] font-bold text-[#001C39]">6 块</span>
            <span className="text-[10px] text-[#5B6A82]">拥有拼板</span>
          </div>

          <div
            onClick={() => onNavigate('patterns')}
            className="p-3 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform"
          >
            <Sparkles className="w-5 h-5 text-[#FE893C] mb-1" />
            <span className="text-[16px] font-bold text-[#001C39]">42 份</span>
            <span className="text-[10px] text-[#5B6A82]">收藏图纸</span>
          </div>
        </div>

        {/* Utility Menu List */}
        <div className="rounded-3xl bg-white border border-slate-100 shadow-xs overflow-hidden divide-y divide-slate-100">
          <div
            onClick={() => onShowToast('品牌色卡对照已开启：支持 Artkal / Perler / 漫漫色号互转')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#001C39]">品牌色号智能对照表</span>
                <span className="text-[11px] text-[#5B6A82]">Artkal / Perler / DMC 色卡精准转换</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div
            onClick={() => onShowToast('拍照取色识别功能已就绪')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#001C39]">拍照识豆与自动配板</span>
                <span className="text-[11px] text-[#5B6A82]">拍摄任意像素图或实物生成专属画布</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div
            onClick={() => onShowToast('已导出本地拼豆作品全量备份 JSON')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                <FolderArchive className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#001C39]">画布备份与多端同步</span>
                <span className="text-[11px] text-[#5B6A82]">云端自动备份，杜绝手作进度丢失</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div
            onClick={() => onShowToast('已开启敲击物理按键提示音')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#001C39]">沉浸按压音效与触感</span>
                <span className="text-[11px] text-[#5B6A82]">仿真「啪嗒」拼豆入孔触感反馈</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>

          <div
            onClick={() => onShowToast('拼豆常见问题答疑与新手入门已开启')}
            className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EFF4FC] text-[#0057C0] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-[#001C39]">新手拼豆 & 熨烫避坑宝典</span>
                <span className="text-[11px] text-[#5B6A82]">防止弯翘、掉豆、压焦全攻略</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </main>
    </div>
  );
};

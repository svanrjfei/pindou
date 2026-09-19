import React from 'react';
import { ScreenType } from '../types';
import {
  BarChart3,
  Flame,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
  Calendar,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface StatsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ onShowToast }) => {
  const topColors = [
    { code: '#P18', name: '焦糖色', hex: '#FE893C', count: 2420, percent: 28 },
    { code: '#P01', name: '纯白色', hex: '#FFFFFF', count: 1980, percent: 23 },
    { code: '#P15', name: '天蓝色', hex: '#3D85FF', count: 1450, percent: 17 },
    { code: '#P12', name: '曜石黑', hex: '#111C2D', count: 1120, percent: 13 },
    { code: '#P34', name: '蜜桃粉', hex: '#FFB68D', count: 890, percent: 10 },
  ];

  const weeklyData = [
    { day: '周一', count: 420 },
    { day: '周二', count: 680 },
    { day: '周三', count: 910 },
    { day: '周四', count: 540 },
    { day: '周五', count: 1200 },
    { day: '周六', count: 1850 },
    { day: '周日', count: 1430 },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen pb-24 bg-[#F8F9FF] select-none">
      {/* Top Header */}
      <header className="sticky top-0 w-full z-30 pt-safe bg-[#F8F9FF]/85 backdrop-blur-xl border-b border-[#D7E1EE]/50">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#0057C0]" />
            <h1 className="text-[18px] font-bold text-[#001C39]">拼豆统计与分析</h1>
          </div>
          <button
            onClick={() => onShowToast('已导出本月色号补货清单与报表')}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#001C39] hover:bg-[#E6EEFF]"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pt-3 max-w-md mx-auto w-full flex flex-col gap-4">
        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col">
            <span className="text-[11px] text-[#5B6A82]">累计消耗拼豆</span>
            <span className="text-[24px] font-bold text-[#0057C0] my-0.5">12,840</span>
            <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>较上周 +14.2%</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col">
            <span className="text-[11px] text-[#5B6A82]">完成作品</span>
            <span className="text-[24px] font-bold text-[#001C39] my-0.5">18 件</span>
            <span className="text-[10px] text-[#5B6A82]">中大版幅 6 件</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col">
            <span className="text-[11px] text-[#5B6A82]">专注拼装时长</span>
            <span className="text-[24px] font-bold text-[#001C39] my-0.5">36.5 小时</span>
            <div className="flex items-center gap-1 text-[#0057C0] text-[10px] font-bold">
              <Clock className="w-3 h-3" />
              <span>场均 55 分钟</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-100 shadow-xs flex flex-col">
            <span className="text-[11px] text-[#5B6A82]">零错漏返工率</span>
            <span className="text-[24px] font-bold text-emerald-600 my-0.5">98.6%</span>
            <div className="flex items-center gap-1 text-[#5B6A82] text-[10px]">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>分批策略加持</span>
            </div>
          </div>
        </div>

        {/* Weekly Trend Bar Chart */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0057C0]" />
              <h3 className="text-[15px] font-bold text-[#001C39]">本周颗粒产出趋势</h3>
            </div>
            <span className="text-[11px] text-[#5B6A82]">单位：颗</span>
          </div>

          <div className="h-32 flex items-end justify-between gap-2 pt-4 px-1">
            {weeklyData.map((d) => {
              const heightPct = Math.max(15, Math.round((d.count / 1850) * 100));
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[9px] font-bold text-[#0057C0]">{d.count}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#0057C0] to-[#3D85FF] transition-all duration-500 shadow-xs"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="text-[10px] text-[#5B6A82] font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Consumption Leaderboard */}
        <div className="p-4 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#001C39]">高频色号消耗统计</h3>
            <span className="text-[11px] text-[#0057C0] font-bold">补货建议</span>
          </div>

          <div className="flex flex-col gap-3">
            {topColors.map((color) => (
              <div key={color.code} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full bead-item flex items-center justify-center border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className="w-1 h-1 rounded-full bead-hole bg-black/40" />
                    </div>
                    <span className="font-bold text-[#001C39]">{color.name}</span>
                    <span className="text-[#5B6A82] text-[11px]">{color.code}</span>
                  </div>
                  <span className="font-bold text-[#0057C0]">{color.count} 颗</span>
                </div>
                <div className="w-full h-1.5 bg-[#EFF4FC] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${color.percent * 2.5}%`,
                      backgroundColor: color.hex === '#FFFFFF' ? '#A3C2E8' : color.hex,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ironing & Thermal Guide Card */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[#FFF5ED] to-[#FFF0E2] border border-[#FFD9BA] flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-[#FE893C]">
            <Flame className="w-5 h-5 fill-current" />
            <h3 className="text-[15px] font-bold text-[#7A3600]">专业拼豆熨烫指引</h3>
          </div>
          <p className="text-[12px] text-[#7A3600]/80 leading-relaxed">
            建议使用专业助烫特氟龙纸，家用电熨斗调至中温挡（棉麻档稍低，约 140°C ~ 160°C）。以圆周画圈均匀加压 15~20 秒，待珠孔缩小至微圆即可脱板。
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2.5 py-1 rounded-full bg-white text-[#7A3600] text-[11px] font-bold shadow-xs">
              单面微融（留孔透气）
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white text-[#7A3600] text-[11px] font-bold shadow-xs">
              双面全融（钥匙扣防断）
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

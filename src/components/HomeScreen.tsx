import React, { useState } from 'react';
import { CanvasProject, ScreenType } from '../types';
import {
  Search,
  User,
  Grid,
  Plus,
  Upload,
  Play,
  Edit3,
  Flag,
  Lightbulb,
} from 'lucide-react';

interface HomeScreenProps {
  projects: CanvasProject[];
  onNavigate: (screen: ScreenType, projectId?: string) => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  projects,
  onNavigate,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'building' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'building') return p.status === 'building';
    if (filter === 'draft') return p.status === 'draft' || p.status === 'ready';
    if (searchQuery) return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return true;
  });

  return (
    <div className="flex flex-col w-full min-h-screen pb-24 bg-[#F8F9FF]">
      {/* Top Fixed Header */}
      <header className="sticky top-0 w-full z-30 pt-safe bg-[#F8F9FF]/85 backdrop-blur-xl border-b border-[#D7E1EE]/50">
        <div className="h-14 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1VEn8u9OtQP_yC_AstAlvnfXnl6zBj_TGgn3oll8pnwUywZALy_TyU47URaWzKvpRV0D3lXt_cFZh4NGHmxRxpsHnYUF9t1uck8FFKUOc8os-tezM6cuP8koPqgqg28o7onv1FhqXBoQFfVCO585dhEZX3DqlpyFgsxzvV4M2gnIebv6o8kSJccSOIl7_BnKiueq2YmAx7j7gobCdDKcRVp6fmkmNqhTutKlcn-fIgdhJJAUy51kHabEYo"
              alt="拼豆助手 Logo"
              className="h-8 w-auto object-contain rounded-md"
            />
            <div className="flex flex-col">
              <span className="font-bold text-[17px] text-[#001C39] leading-tight">
                拼豆助手
              </span>
              <span className="text-[10px] text-[#5B6A82] tracking-wider">首页</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              aria-label="搜索画布"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#001C39] hover:bg-[#E6EEFF] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              aria-label="个人中心"
              onClick={() => onNavigate('profile')}
              className="w-8 h-8 rounded-full bg-[#0057C0] text-white flex items-center justify-center ml-1 shadow-sm"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="px-4 pb-2">
            <input
              type="text"
              placeholder="搜索图纸或画布名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 px-3 text-[13px] bg-white rounded-xl border border-[#D7E1EE] focus:outline-none focus:border-[#0057C0]"
              autoFocus
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="px-4 pt-3 flex flex-col gap-4 max-w-md mx-auto w-full">
        {/* Creation Hero Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-white p-4 shadow-[0_4px_24px_-4px_rgba(0,28,57,0.06)] border border-white flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0057C0]/10 flex items-center justify-center text-[#0057C0]">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#001C39] leading-snug">
                开启你的像素创作
              </h2>
              <p className="text-[12px] text-[#5B6A82] mt-0.5">
                高精度网格点对点放豆，支持自由设计与实景放样
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => onNavigate('create_canvas')}
              className="h-11 bg-[#0057C0] hover:bg-[#1B70E9] text-white rounded-full text-[14px] font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(0,87,192,0.25)] active:scale-[0.98] transition-transform"
            >
              <Plus className="w-4 h-4" />
              <span>新建画布</span>
            </button>
            <button
              onClick={() => onNavigate('patterns')}
              className="h-11 bg-[#EFF4FC] hover:bg-[#E6EEFF] text-[#0057C0] rounded-full text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
            >
              <Upload className="w-4 h-4" />
              <span>导入图纸</span>
            </button>
          </div>
        </section>

        {/* Section Header & Filters */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[17px] font-bold text-[#001C39]">最近画布</h3>
              <span className="inline-flex items-center justify-center h-5 px-2 rounded-full bg-[#DDE9FF] text-[#004397] text-[11px] font-bold">
                {filteredProjects.length}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-[#EFF4FC] p-1 rounded-full text-[12px] font-medium text-[#5B6A82]">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-0.5 rounded-full transition-all ${
                  filter === 'all'
                    ? 'bg-white text-[#0057C0] font-bold shadow-xs'
                    : 'hover:text-[#001C39]'
                }`}
              >
                全部
              </button>
              <button
                onClick={() => setFilter('building')}
                className={`px-3 py-0.5 rounded-full transition-all ${
                  filter === 'building'
                    ? 'bg-white text-[#0057C0] font-bold shadow-xs'
                    : 'hover:text-[#001C39]'
                }`}
              >
                拼豆中
              </button>
              <button
                onClick={() => setFilter('draft')}
                className={`px-3 py-0.5 rounded-full transition-all ${
                  filter === 'draft'
                    ? 'bg-white text-[#0057C0] font-bold shadow-xs'
                    : 'hover:text-[#001C39]'
                }`}
              >
                设计中
              </button>
            </div>
          </div>

          {/* Canvas Project Cards */}
          <div className="flex flex-col gap-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl p-3.5 shadow-[0_4px_20px_-2px_rgba(22,51,85,0.05)] border border-slate-100 flex flex-col gap-3"
              >
                <div className="flex gap-3 items-start">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#EFF4FC] shrink-0 border border-slate-100">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
                      {project.boardType.includes('104')
                        ? '104板'
                        : project.boardType.includes('六角')
                        ? '六角板'
                        : '方板'}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[16px] font-bold text-[#001C39] truncate">
                        {project.name}
                      </h4>
                      <span className="text-[11px] text-[#5B6A82] shrink-0">
                        {project.updatedAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#EFF4FC] text-[#5B6A82] text-[11px]">
                        {project.boardType} · {project.beadSpec}
                      </span>
                    </div>

                    {project.status === 'draft' ? (
                      <p className="text-[12px] text-[#5B6A82] mt-0.5">
                        状态：编辑中 <span className="text-[#001C39] font-medium">(草稿 · 调色中)</span>
                      </p>
                    ) : project.status === 'ready' ? (
                      <div className="mt-0.5 flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
                        <span>● 备料已齐 100% · 待开拼</span>
                      </div>
                    ) : (
                      <>
                        <div className="mt-0.5 flex items-center justify-between text-[11px]">
                          <span className="text-[#0057C0] font-bold">
                            已拼 {project.placedBeads} / {project.totalBeads} 颗
                          </span>
                          <span className="text-[#5B6A82] font-semibold">{project.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#EFF4FC] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0057C0] rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[12px]">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        project.status === 'building'
                          ? 'bg-emerald-500'
                          : project.status === 'ready'
                          ? 'bg-amber-400'
                          : 'bg-[#FE893C]'
                      }`}
                    />
                    <span className="text-[#5B6A82] font-medium">
                      {project.status === 'building'
                        ? '拼装中'
                        : project.status === 'ready'
                        ? '待开始'
                        : '设计草稿'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.status === 'draft' ? (
                      <button
                        onClick={() => onNavigate('editor', project.id)}
                        className="h-8 px-4 rounded-full bg-[#EFF4FC] hover:bg-[#E6EEFF] text-[#0057C0] text-[13px] font-bold flex items-center gap-1 active:scale-95 transition-all"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>继续编辑</span>
                      </button>
                    ) : project.status === 'ready' ? (
                      <button
                        onClick={() => onNavigate('strategy', project.id)}
                        className="h-8 px-4 rounded-full bg-[#0057C0] text-white text-[13px] font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>开始拼豆</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onNavigate('preview', project.id)}
                          className="h-8 px-3 rounded-full bg-slate-100 text-[#5B6A82] text-[12px] font-medium hover:bg-slate-200 transition-colors"
                        >
                          预览
                        </button>
                        <button
                          onClick={() => onNavigate('workbench', project.id)}
                          className="h-8 px-4 rounded-full bg-[#0057C0] text-white text-[13px] font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>继续拼</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Helpful Crafting Tip Capsule */}
        <section className="rounded-xl bg-[#EFF4FC] p-3 flex items-center gap-3 border border-[#D7E1EE]/60">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#0057C0] shrink-0 shadow-xs">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-bold text-[#001C39]">拼豆小贴士</p>
            <p className="text-[11px] text-[#5B6A82] truncate">
              在拼装模式下开启「坐标高亮」，找孔位速度提升一倍哦！
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

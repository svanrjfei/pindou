import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ScreenType } from '../types';
import {
  ChevronLeft,
  Undo2,
  Redo2,
  Focus,
  Grid3X3,
  Layers,
  Eye,
  EyeOff,
  Check,
  X,
  Play,
  Pencil,
  Eraser,
  Pipette,
  PaintBucket,
  MousePointer,
  Sparkles,
} from 'lucide-react';

interface CanvasEditorScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

interface LayerItem {
  id: string;
  name: string;
  colorName: string;
  colorCode: string;
  beadsCount: number;
  image: string;
  visible: boolean;
  selected: boolean;
}

const SWATCH_COLORS = [
  { code: 'A17', name: '湛蓝', hex: '#3D85FF' },
  { code: 'A06', name: '柴犬橘', hex: '#FE893C' },
  { code: 'F18', name: '明黄', hex: '#FFD23F' },
  { code: 'H02', name: '珊瑚红', hex: '#FF5E5B' },
  { code: 'B01', name: '松树绿', hex: '#00873B' },
  { code: 'C05', name: '纯白', hex: '#FFFFFF' },
  { code: 'K01', name: '曜石黑', hex: '#163355' },
  { code: 'M09', name: '薄荷青', hex: '#2EC4B6' },
];

export const CanvasEditorScreen: React.FC<CanvasEditorScreenProps> = ({
  onBack,
  onNavigate,
  onShowToast,
}) => {
  const size = 28;
  const [currentTool, setCurrentTool] = useState<
    'brush' | 'eraser' | 'picker' | 'bucket' | 'select'
  >('brush');
  const [selectedColor, setSelectedColor] = useState('#3D85FF');
  const [zoomLevel, setZoomLevel] = useState<100 | 150 | 180>(150);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number }>({ x: 14, y: 12 });
  const [showGrid, setShowGrid] = useState(true);
  const [isPaletteFolded, setIsPaletteFolded] = useState(false);
  const [isMinimapVisible, setIsMinimapVisible] = useState(true);
  const [isLayersOpen, setIsLayersOpen] = useState(false);

  // Layers list
  const [layers, setLayers] = useState<LayerItem[]>([
    {
      id: 'kitty',
      name: 'Kitty',
      colorName: '白色主色',
      colorCode: '#P01',
      beadsCount: 34,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCpE0WtpKxWO_ikQ0UhxwFub-24QXTv8Rt22SNjbtV_tuWCKJ9_xftCIjpGt1zUyTFBYdMMoHc4kLH9m3CHnll0Sj0fhNy95mo8GcXyf3ko9rkx25lkQ_OBtpIhZw9n-U0ule_AKl5Vh5mLsgZVA01PelzAz0Abmpm_bYcwOQncaz0kZ285CiiMzvrlvtlO2ad7tSr5plUr4iUexJaOuTuVExcFVfpwyUZuZoHbDz8',
      visible: true,
      selected: true,
    },
    {
      id: 'happy',
      name: '英文字母 Happy',
      colorName: '湛蓝色',
      colorCode: '#P18',
      beadsCount: 28,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB8OxqI_nLVzLIDCbMUYx5fnW9iq-xxf4dEg2LiAidpwqDhtEdaVKxvdMWcYXXBJoJKRAl2U7swyDzgH8FTv6ewLmZOxJqZDelVk18whznSobL9zTZpCsF51qbjGnZxYkcKnG4e2C9l-V8w-HsIolnn7i0f-2HXWj2cKQH9236-jFCdmbnloFPuVgbLYtHmOiy4xj6WTHEN_78xOOtRngWfxOFGOU5im-UuMerRILg',
      visible: true,
      selected: false,
    },
    {
      id: 'heart',
      name: '像素爱心',
      colorName: '经典红',
      colorCode: '#P05',
      beadsCount: 16,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDlFb-i46yJkt6Wj_072TSN122KP77tdcKDmi_4tgygAeGAOxqxBhL2pE30aMQ8eHaKCOVT7DX6_GQiMCnwB5OdTKnkkxWkszjiGquhfbV3LMo67J4-yYA-DWsVJkP3Gxg2Sp4KqPgiKnuM_7mfyl7dxcM41JHppXbmy2Iohj52Ufz5ERgw8VWpZJFu8Bk3w0ag6cnSeQ-6A6RoEjLXwiFPI_FNbmlqMTV_aNuMRYo',
      visible: true,
      selected: false,
    },
  ]);

  // Matrix 28x28 state
  const [matrix, setMatrix] = useState<(string | null)[][]>(() => {
    const arr: (string | null)[][] = Array.from({ length: 28 }, () => Array(28).fill(null));
    // Pre-fill Shiba Inu Pixel Pattern
    const O = '#FE893C';
    const W = '#FFFFFF';
    const B = '#163355';
    const P = '#FF5E5B';
    const L = '#3D85FF';

    const shiba = [
      { r: 5, c: 9, v: O }, { r: 5, c: 10, v: O }, { r: 5, c: 17, v: O }, { r: 5, c: 18, v: O },
      { r: 6, c: 8, v: O }, { r: 6, c: 9, v: W }, { r: 6, c: 10, v: O }, { r: 6, c: 17, v: O }, { r: 6, c: 18, v: W }, { r: 6, c: 19, v: O },
      { r: 7, c: 8, v: O }, { r: 7, c: 9, v: W }, { r: 7, c: 10, v: W }, { r: 7, c: 11, v: O }, { r: 7, c: 16, v: O }, { r: 7, c: 17, v: W }, { r: 7, c: 18, v: W }, { r: 7, c: 19, v: O },
      { r: 8, c: 7, v: O }, { r: 8, c: 8, v: O }, { r: 8, c: 9, v: W }, { r: 8, c: 10, v: W }, { r: 8, c: 11, v: O }, { r: 8, c: 12, v: O }, { r: 8, c: 13, v: O }, { r: 8, c: 14, v: O }, { r: 8, c: 15, v: O }, { r: 8, c: 16, v: O }, { r: 8, c: 17, v: W }, { r: 8, c: 18, v: W }, { r: 8, c: 19, v: O }, { r: 8, c: 20, v: O },
      { r: 9, c: 6, v: O }, { r: 9, c: 7, v: O }, { r: 9, c: 8, v: O }, { r: 9, c: 9, v: O }, { r: 9, c: 10, v: W }, { r: 9, c: 11, v: O }, { r: 9, c: 12, v: O }, { r: 9, c: 13, v: O }, { r: 9, c: 14, v: O }, { r: 9, c: 15, v: O }, { r: 9, c: 16, v: O }, { r: 9, c: 17, v: W }, { r: 9, c: 18, v: O }, { r: 9, c: 19, v: O }, { r: 9, c: 20, v: O }, { r: 9, c: 21, v: O },
      { r: 10, c: 6, v: O }, { r: 10, c: 7, v: O }, { r: 10, c: 8, v: O }, { r: 10, c: 9, v: O }, { r: 10, c: 10, v: O }, { r: 10, c: 11, v: O }, { r: 10, c: 12, v: O }, { r: 10, c: 13, v: O }, { r: 10, c: 14, v: O }, { r: 10, c: 15, v: O }, { r: 10, c: 16, v: O }, { r: 10, c: 17, v: O }, { r: 10, c: 18, v: O }, { r: 10, c: 19, v: O }, { r: 10, c: 20, v: O }, { r: 10, c: 21, v: O },
      { r: 11, c: 6, v: O }, { r: 11, c: 7, v: O }, { r: 11, c: 8, v: O }, { r: 11, c: 9, v: B }, { r: 11, c: 10, v: B }, { r: 11, c: 11, v: O }, { r: 11, c: 12, v: O }, { r: 11, c: 13, v: O }, { r: 11, c: 14, v: O }, { r: 11, c: 15, v: O }, { r: 11, c: 16, v: O }, { r: 11, c: 17, v: B }, { r: 11, c: 18, v: B }, { r: 11, c: 19, v: O }, { r: 11, c: 20, v: O }, { r: 11, c: 21, v: O },
      { r: 12, c: 6, v: O }, { r: 12, c: 7, v: O }, { r: 12, c: 8, v: O }, { r: 12, c: 9, v: B }, { r: 12, c: 10, v: B }, { r: 12, c: 11, v: W }, { r: 12, c: 12, v: W }, { r: 12, c: 13, v: W }, { r: 12, c: 14, v: W }, { r: 12, c: 15, v: W }, { r: 12, c: 16, v: W }, { r: 12, c: 17, v: B }, { r: 12, c: 18, v: B }, { r: 12, c: 19, v: O }, { r: 12, c: 20, v: O }, { r: 12, c: 21, v: O },
      { r: 13, c: 6, v: O }, { r: 13, c: 7, v: P }, { r: 13, c: 8, v: W }, { r: 13, c: 9, v: W }, { r: 13, c: 10, v: W }, { r: 13, c: 11, v: W }, { r: 13, c: 12, v: W }, { r: 13, c: 13, v: B }, { r: 13, c: 14, v: B }, { r: 13, c: 15, v: W }, { r: 13, c: 16, v: W }, { r: 13, c: 17, v: W }, { r: 13, c: 18, v: W }, { r: 13, c: 19, v: W }, { r: 13, c: 20, v: P }, { r: 13, c: 21, v: O },
      { r: 14, c: 7, v: O }, { r: 14, c: 8, v: W }, { r: 14, c: 9, v: W }, { r: 14, c: 10, v: W }, { r: 14, c: 11, v: W }, { r: 14, c: 12, v: W }, { r: 14, c: 13, v: B }, { r: 14, c: 14, v: B }, { r: 14, c: 15, v: W }, { r: 14, c: 16, v: W }, { r: 14, c: 17, v: W }, { r: 14, c: 18, v: W }, { r: 14, c: 19, v: W }, { r: 14, c: 20, v: O },
      { r: 15, c: 7, v: O }, { r: 15, c: 8, v: W }, { r: 15, c: 9, v: W }, { r: 15, c: 10, v: W }, { r: 15, c: 11, v: W }, { r: 15, c: 12, v: W }, { r: 15, c: 13, v: W }, { r: 15, c: 14, v: W }, { r: 15, c: 15, v: W }, { r: 15, c: 16, v: W }, { r: 15, c: 17, v: W }, { r: 15, c: 18, v: W }, { r: 15, c: 19, v: W }, { r: 15, c: 20, v: O },
      { r: 16, c: 8, v: O }, { r: 16, c: 9, v: W }, { r: 16, c: 10, v: W }, { r: 16, c: 11, v: W }, { r: 16, c: 12, v: W }, { r: 16, c: 13, v: W }, { r: 16, c: 14, v: W }, { r: 16, c: 15, v: W }, { r: 16, c: 16, v: W }, { r: 16, c: 17, v: W }, { r: 16, c: 18, v: W }, { r: 16, c: 19, v: O },
      { r: 17, c: 8, v: L }, { r: 17, c: 9, v: L }, { r: 17, c: 10, v: L }, { r: 17, c: 11, v: L }, { r: 17, c: 12, v: L }, { r: 17, c: 13, v: L }, { r: 17, c: 14, v: L }, { r: 17, c: 15, v: L }, { r: 17, c: 16, v: L }, { r: 17, c: 17, v: L }, { r: 17, c: 18, v: L }, { r: 17, c: 19, v: L },
      { r: 18, c: 9, v: L }, { r: 18, c: 10, v: L }, { r: 18, c: 11, v: L }, { r: 18, c: 12, v: W }, { r: 18, c: 13, v: W }, { r: 18, c: 14, v: L }, { r: 18, c: 15, v: L }, { r: 18, c: 16, v: L }, { r: 18, c: 17, v: L }, { r: 18, c: 18, v: L },
      { r: 19, c: 10, v: O }, { r: 19, c: 11, v: O }, { r: 19, c: 12, v: W }, { r: 19, c: 13, v: W }, { r: 19, c: 14, v: W }, { r: 19, c: 15, v: W }, { r: 19, c: 16, v: O }, { r: 19, c: 17, v: O },
      { r: 20, c: 10, v: O }, { r: 20, c: 11, v: O }, { r: 20, c: 12, v: W }, { r: 20, c: 13, v: W }, { r: 20, c: 14, v: W }, { r: 20, c: 15, v: W }, { r: 20, c: 16, v: O }, { r: 20, c: 17, v: O },
      { r: 21, c: 10, v: W }, { r: 21, c: 11, v: W }, { r: 21, c: 12, v: O }, { r: 21, c: 13, v: W }, { r: 21, c: 14, v: W }, { r: 21, c: 15, v: O }, { r: 21, c: 16, v: W }, { r: 21, c: 17, v: W },
    ];

    shiba.forEach((pt) => {
      if (pt.r < 28 && pt.c < 28) {
        arr[pt.r][pt.c] = pt.v;
      }
    });
    return arr;
  });

  // History for undo/redo
  const historyRef = useRef<(string | null)[][][]>([]);
  const historyIdxRef = useRef<number>(-1);
  const isPointerDownRef = useRef(false);

  // Total beads count
  const placedBeadsCount = useMemo(() => {
    let count = 0;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c]) count++;
      }
    }
    return count;
  }, [matrix]);

  // Apply cell changes with history snapshot
  const updateCell = useCallback((r: number, c: number) => {
    setMatrix((prev) => {
      const newM = prev.map((row) => [...row]);
      if (currentTool === 'brush') {
        newM[r][c] = selectedColor;
      } else if (currentTool === 'eraser') {
        newM[r][c] = null;
      } else if (currentTool === 'picker') {
        if (newM[r][c]) {
          setSelectedColor(newM[r][c]!);
          setCurrentTool('brush');
          onShowToast(`已吸取颜色: ${newM[r][c]}`);
        }
        return prev;
      } else if (currentTool === 'bucket') {
        const target = newM[r][c];
        if (target === selectedColor) return prev;
        const queue: [number, number][] = [[r, c]];
        const visited = new Set<string>();

        while (queue.length > 0) {
          const [cr, cc] = queue.pop()!;
          const key = `${cr},${cc}`;
          if (visited.has(key)) continue;
          visited.add(key);

          if (cr < 0 || cr >= size || cc < 0 || cc >= size) continue;
          if (newM[cr][cc] !== target) continue;

          newM[cr][cc] = selectedColor;
          queue.push([cr + 1, cc], [cr - 1, cc], [cr, cc + 1], [cr, cc - 1]);
        }
      }
      return newM;
    });
  }, [currentTool, selectedColor, onShowToast]);

  const handlePointerDown = (r: number, c: number) => {
    isPointerDownRef.current = true;
    setHoverCoord({ x: c + 1, y: r + 1 });
    updateCell(r, c);
  };

  const handlePointerEnter = (r: number, c: number) => {
    setHoverCoord({ x: c + 1, y: r + 1 });
    if (isPointerDownRef.current && (currentTool === 'brush' || currentTool === 'eraser')) {
      updateCell(r, c);
    }
  };

  useEffect(() => {
    const handleUp = () => {
      isPointerDownRef.current = false;
    };
    window.addEventListener('pointerup', handleUp);
    return () => window.removeEventListener('pointerup', handleUp);
  }, []);

  const handleUndo = () => {
    onShowToast('撤销一步');
  };

  const handleRedo = () => {
    onShowToast('重做一步');
  };

  const toggleLayerVisible = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const selectLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => ({ ...l, selected: l.id === id }))
    );
    onShowToast(`已选中图层：${layers.find((l) => l.id === id)?.name}`);
    setTimeout(() => setIsLayersOpen(false), 200);
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-[#F5F9FF] select-none">
      {/* 1. Top Navbar */}
      <header className="w-full pt-safe bg-[#F5F9FF]/95 backdrop-blur-md z-40 border-b border-[#D8E5F8]/60 flex-shrink-0">
        <div className="h-12 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onBack}
              className="w-9 h-9 -ml-1.5 rounded-full flex items-center justify-center text-[#163355] active:bg-[#E5EFFE]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-[17px] text-[#163355]">编辑</h1>
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#E5EFFE] text-[#0057C0] text-[11px] font-semibold border border-[#0057C0]/20">
              28×28 标板
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#163355] hover:bg-[#E5EFFE] active:scale-90"
              title="撤销"
            >
              <Undo2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#829ab1] hover:bg-[#E5EFFE] active:scale-90"
              title="重做"
            >
              <Redo2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('preview')}
              className="h-7 px-3.5 ml-1 rounded-full bg-[#0057C0] hover:bg-[#004397] text-white font-semibold text-[13px] shadow-[0_2px_8px_rgba(0,87,192,0.35)] active:scale-95 transition-all flex items-center gap-0.5"
            >
              <span>完成</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Canvas Workspace Area */}
      <main className="relative flex-1 w-full overflow-hidden flex items-center justify-center bg-[#F5F9FF]">
        {/* Top coordinate & zoom pill */}
        <div className="absolute top-2.5 inset-x-0 mx-auto w-fit z-20 pointer-events-none flex items-center gap-1.5">
          <div className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#163355] text-[11px] font-semibold shadow-xs border border-[#D8E5F8] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0057C0] animate-pulse" />
            <span>
              X: {hoverCoord.x} Y: {hoverCoord.y}
            </span>
            <span className="text-[#829ab1]">·</span>
            <span className="text-[#0057C0]">
              {placedBeadsCount} 颗 (28×28)
            </span>
          </div>
          <div className="px-2 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#627D98] text-[11px] font-medium shadow-xs border border-[#D8E5F8]">
            缩放 {zoomLevel}%
          </div>
        </div>

        {/* Pegboard Canvas Matrix Container */}
        <div
          className="relative p-2.5 sm:p-3 rounded-2xl bg-white/90 shadow-[0_8px_32px_rgba(22,51,85,0.08)] border border-[#D8E5F8] flex flex-col items-center justify-center max-h-[92%] aspect-square"
          id="pegboard-wrapper"
        >
          <div
            className="grid rounded-xl bg-[#EBF3FC] shadow-inner p-1"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
              gap: showGrid ? '1px' : '0px',
              width: 'min(78vw, calc(100vh - 240px))',
              height: 'min(78vw, calc(100vh - 240px))',
            }}
          >
            {matrix.map((row, r) =>
              row.map((color, c) => (
                <div
                  key={`${r}-${c}`}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handlePointerDown(r, c);
                  }}
                  onPointerEnter={() => handlePointerEnter(r, c)}
                  className={`w-full h-full aspect-square rounded-full flex items-center justify-center cursor-pointer transition-transform duration-75 relative select-none ${
                    color ? 'bead-item' : 'peg-hole'
                  }`}
                  style={{
                    backgroundColor: color || undefined,
                  }}
                >
                  {color ? (
                    <div
                      className="w-[32%] h-[32%] rounded-full bead-hole"
                      style={{
                        backgroundColor: color === '#FFFFFF' ? '#9cb6d8' : 'rgba(0,0,0,0.35)',
                      }}
                    />
                  ) : (
                    <div className="w-[20%] h-[20%] rounded-full bg-[#0057C0]/25" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right floating helper dock (Center focus, Toggle grid, Toggle Zoom) */}
        <div className="absolute right-3 top-14 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              setZoomLevel((z) => (z === 100 ? 150 : z === 150 ? 180 : 100));
              onShowToast(`缩放已调整为 ${zoomLevel === 100 ? '150%' : zoomLevel === 150 ? '180%' : '100%'}`);
            }}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-[#D8E5F8] text-[#163355] flex items-center justify-center active:scale-95"
            title="缩放切换"
          >
            <Focus className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setShowGrid(!showGrid);
              onShowToast(showGrid ? '已关闭网格间距' : '已开启网格间距');
            }}
            className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-xs border border-[#D8E5F8] flex items-center justify-center active:scale-95 ${
              showGrid ? 'text-[#0057C0]' : 'text-slate-400'
            }`}
            title="网格线切换"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>

        {/* Mini-map (Bottom Right Floating Anchor) */}
        <div className="absolute right-3.5 bottom-2 z-20 flex flex-col items-end">
          {isMinimapVisible && (
            <div className="w-[76px] h-[76px] p-1.5 rounded-xl bg-white/95 backdrop-blur-lg border border-[#0057C0] shadow-[0_4px_16px_rgba(0,87,192,0.18)] flex flex-col relative overflow-hidden">
              <div className="w-full h-full rounded-lg bg-[#EBF3FC] relative overflow-hidden flex items-center justify-center">
                {/* Micro sprite preview */}
                <div className="w-8 h-8 relative flex flex-col items-center justify-center">
                  <div className="w-7 h-6 rounded-xs bg-[#FE893C] relative shadow-xs">
                    <div className="absolute -top-1 left-0 w-2 h-2 bg-[#FE893C] rotate-45 rounded-xs" />
                    <div className="absolute -top-1 right-0 w-2 h-2 bg-[#FE893C] rotate-45 rounded-xs" />
                    <div className="absolute bottom-0 inset-x-1 h-2.5 bg-white rounded-b-xs" />
                    <div className="absolute top-1.5 left-1 w-1 h-1 bg-[#163355] rounded-full" />
                    <div className="absolute top-1.5 right-1 w-1 h-1 bg-[#163355] rounded-full" />
                  </div>
                </div>
                {/* Viewport frame indicator */}
                <div className="absolute inset-1 rounded border border-[#0057C0] bg-[#0057C0]/15 pointer-events-none" />
              </div>
            </div>
          )}
          <button
            onClick={() => setIsMinimapVisible(!isMinimapVisible)}
            className="mt-1 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur border border-[#D8E5F8] text-[#0057C0] text-[10px] font-semibold active:scale-95"
          >
            {isMinimapVisible ? '缩略图' : '展开小图'}
          </button>
        </div>
      </main>

      {/* 3. Color Bar (Above Bottom Tools) */}
      <section className="w-full bg-white/95 backdrop-blur-md border-t border-[#D8E5F8] px-3 pt-2 pb-1 z-30 flex-shrink-0">
        <div className="max-w-md mx-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-[#163355]">豆色板</span>
              <span className="text-[10px] text-[#829ab1]">轻触选择 · 双击设为背景</span>
            </div>
            <button
              onClick={() => setIsPaletteFolded(!isPaletteFolded)}
              className="flex items-center gap-0.5 text-[#0057C0] text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E5EFFE] active:scale-95"
            >
              <span>{isPaletteFolded ? '展开' : '收起'}</span>
            </button>
          </div>

          {!isPaletteFolded && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5">
              {SWATCH_COLORS.map((swatch) => {
                const isSelected = selectedColor === swatch.hex;
                return (
                  <button
                    key={swatch.code}
                    onClick={() => {
                      setSelectedColor(swatch.hex);
                      if (currentTool !== 'brush' && currentTool !== 'bucket') {
                        setCurrentTool('brush');
                      }
                    }}
                    className="flex flex-col items-center gap-1 flex-shrink-0 focus:outline-none"
                  >
                    <div
                      className={`w-8 h-8 rounded-full bead-item flex items-center justify-center relative transition-all ${
                        isSelected
                          ? 'ring-2 ring-[#0057C0] ring-offset-2 ring-offset-white shadow-[0_0_8px_rgba(0,87,192,0.45)]'
                          : ''
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bead-hole bg-black/40 flex items-center justify-center">
                        {isSelected && <Check className="w-3 h-3 text-white font-bold" />}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'font-bold text-[#0057C0]' : 'text-[#627D98] font-medium'
                      }`}
                    >
                      {swatch.code}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom 5 Core Tools Dock */}
      <footer className="w-full px-4 pb-safe pt-1 bg-[#F5F9FF] border-t border-[#D8E5F8]/70 z-30 flex-shrink-0">
        <div className="max-w-md mx-auto flex items-center justify-around h-13 py-1">
          {/* 1. 画笔 */}
          <button
            onClick={() => setCurrentTool('brush')}
            className={`flex-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
              currentTool === 'brush'
                ? 'bg-[#E5EFFE] text-[#0057C0] font-bold shadow-xs'
                : 'text-[#627D98] hover:text-[#163355]'
            }`}
          >
            <Pencil className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">画笔</span>
          </button>

          {/* 2. 橡皮 */}
          <button
            onClick={() => setCurrentTool('eraser')}
            className={`flex-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
              currentTool === 'eraser'
                ? 'bg-[#E5EFFE] text-[#0057C0] font-bold shadow-xs'
                : 'text-[#627D98] hover:text-[#163355]'
            }`}
          >
            <Eraser className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">橡皮</span>
          </button>

          {/* 3. 吸管 */}
          <button
            onClick={() => setCurrentTool('picker')}
            className={`flex-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
              currentTool === 'picker'
                ? 'bg-[#E5EFFE] text-[#0057C0] font-bold shadow-xs'
                : 'text-[#627D98] hover:text-[#163355]'
            }`}
          >
            <Pipette className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">吸管</span>
          </button>

          {/* 4. 填充 */}
          <button
            onClick={() => setCurrentTool('bucket')}
            className={`flex-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
              currentTool === 'bucket'
                ? 'bg-[#E5EFFE] text-[#0057C0] font-bold shadow-xs'
                : 'text-[#627D98] hover:text-[#163355]'
            }`}
          >
            <PaintBucket className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">填充</span>
          </button>

          {/* 5. 图案/图层 */}
          <button
            onClick={() => setIsLayersOpen(true)}
            className="flex-1 py-1 rounded-2xl flex flex-col items-center justify-center transition-all text-[#627D98] hover:text-[#163355]"
          >
            <Layers className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">图案</span>
          </button>

          {/* 6. 直达开拼按钮 */}
          <button
            onClick={() => onNavigate('workbench')}
            className="px-3 py-1.5 rounded-full bg-[#0057C0] hover:bg-[#004397] text-white flex items-center gap-1 shadow-sm active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] font-bold">开拼</span>
          </button>
        </div>
      </footer>

      {/* Layer / Pattern Bottom Sheet Modal */}
      {isLayersOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#163355]/20 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setIsLayersOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl shadow-2xl p-5 flex flex-col gap-3 max-w-md mx-auto w-full pb-safe border-t border-slate-100 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-9 h-1 rounded-full bg-slate-300 mx-auto" />

            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-bold text-[#163355]">图案列表</h3>
                <span className="text-[11px] font-bold text-[#0057C0] bg-[#EAF2FF] px-2 py-0.5 rounded-full">
                  {layers.length} 个图层
                </span>
              </div>
              <button
                onClick={() => setIsLayersOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 max-h-[45vh] overflow-y-auto no-scrollbar">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => selectLayer(layer.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl cursor-pointer transition-colors border ${
                    layer.selected
                      ? 'bg-[#EAF2FF]/80 border-[#0057C0]/30'
                      : 'bg-white hover:bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={layer.image}
                      alt={layer.name}
                      className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[14px] font-bold text-[#163355] truncate">
                          {layer.name}
                        </span>
                        {layer.selected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0057C0]" />
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 truncate mt-0.5">
                        {layer.beadsCount} 颗拼豆 · {layer.colorCode} {layer.colorName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleLayerVisible(layer.id, e)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        layer.visible ? 'text-[#0057C0]' : 'text-slate-300'
                      }`}
                    >
                      {layer.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        layer.selected
                          ? 'bg-[#0057C0] text-white shadow-xs'
                          : 'text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-slate-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#0057C0]" />
              <span>点击快速定位，支持多图层叠放与显示切换</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

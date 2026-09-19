export type TabType = 'home' | 'patterns' | 'stats' | 'profile';

export type ScreenType =
  | 'home'
  | 'patterns'
  | 'stats'
  | 'profile'
  | 'create_canvas'
  | 'editor'
  | 'preview'
  | 'strategy'
  | 'construction_settings'
  | 'workbench'
  | 'quality_inspection';

export type StrategyMode = 'region' | 'batch' | 'region_batch' | 'row' | 'free';

export interface CanvasProject {
  id: string;
  name: string;
  boardType: string;
  beadSpec: string;
  gridWidth: number;
  gridHeight: number;
  totalBeads: number;
  placedBeads: number;
  progress: number;
  status: 'building' | 'draft' | 'ready';
  updatedAt: string;
  thumbnail: string;
  colorCount: number;
  estimatedMinutes: number;
}

export interface PatternItem {
  id: string;
  name: string;
  dimensions: string;
  gridWidth: number;
  gridHeight: number;
  colorCount: number;
  mainColorCode: string;
  mainColorName: string;
  beadsCount: number;
  image: string;
  category: 'all' | 'recent' | 'classic' | 'favorite';
  visible?: boolean;
}

export interface BeadColor {
  code: string;
  name: string;
  hex: string;
  count: number;
}

export interface ConstructionSettings {
  strategy: StrategyMode;
  regionSize: '5x5' | '10x10';
  trayCount: number;
  batchesCount: number;
  regionsCount: number;
  avoidMishapLock: boolean;
  centerOutwardOrder: boolean;
}

export interface ActiveWorkbenchState {
  projectName: string;
  dimensions: string;
  progressPercent: number;
  timeElapsed: string;
  speed: string;
  estimatedCompletion: string;
  currentBatch: number;
  totalBatches: number;
  currentRegionIndex: number;
  totalRegions: number;
  skipEmptyHint: string;
  activeTray: {
    boxNumber: number;
    code: string;
    name: string;
    colorHex: string;
    targetCount: number;
  };
  trays: Array<{
    boxNumber: number;
    code: string;
    name: string;
    colorHex: string;
    count: number;
    completed?: boolean;
  }>;
}

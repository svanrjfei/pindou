import React from 'react';

interface BeadLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  subtitle?: string;
}

export const BeadLogo: React.FC<BeadLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }[size];

  const beadSize = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  }[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* 3D Stylized Perler Bead Cluster Icon */}
      <div
        className={`${iconDimensions} rounded-xl bg-gradient-to-br from-[#0057C0] to-[#1E3A8A] p-1.5 shadow-[0_2px_8px_rgba(0,87,192,0.25)] flex items-center justify-center relative overflow-hidden shrink-0`}
      >
        {/* Subtle glass reflection */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20 rounded-t-xl" />

        {/* 2x2 Bead Cluster */}
        <div className="grid grid-cols-2 gap-0.5 relative z-10">
          {/* Bead 1: Coral Red */}
          <div
            className={`${beadSize} rounded-full bg-[#FF4D4D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center`}
          >
            <div className="w-[3px] h-[3px] rounded-full bg-[#8A0000]" />
          </div>
          {/* Bead 2: Perler Blue */}
          <div
            className={`${beadSize} rounded-full bg-[#3D85FF] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center`}
          >
            <div className="w-[3px] h-[3px] rounded-full bg-[#002D80]" />
          </div>
          {/* Bead 3: Tangerine Orange */}
          <div
            className={`${beadSize} rounded-full bg-[#FE893C] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center`}
          >
            <div className="w-[3px] h-[3px] rounded-full bg-[#8A3800]" />
          </div>
          {/* Bead 4: Emerald Mint */}
          <div
            className={`${beadSize} rounded-full bg-[#2EC4B6] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.3)] flex items-center justify-center`}
          >
            <div className="w-[3px] h-[3px] rounded-full bg-[#00544C]" />
          </div>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[17px] text-[#0F1D32] tracking-tight leading-none">
              拼豆助手
            </span>
            <span className="px-1.5 py-[1px] rounded-md bg-[#E8F1FF] text-[#0057C0] text-[10px] font-bold tracking-wide">
              工坊
            </span>
          </div>
          {subtitle && (
            <span className="text-[11px] text-[#5B6A82] font-medium mt-0.5 leading-none">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

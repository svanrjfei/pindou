import React, { useEffect } from 'react';
import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'warning';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message || !onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform flex items-center gap-2 bg-[#111C2D]/95 text-white px-4 py-2.5 rounded-2xl shadow-xl backdrop-blur-md max-w-[90vw] animate-in fade-in slide-in-from-top-2">
      {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {type === 'info' && <Info className="w-4 h-4 text-[#3D85FF] shrink-0" />}
      {type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />}
      <span className="text-[13px] font-medium leading-tight">{message}</span>
    </div>
  );
};


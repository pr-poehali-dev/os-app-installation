import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  isActive: boolean;
  onClick: () => void;
}

export default function Window({ id, title, icon, children, onClose, onMinimize, isActive, onClick }: WindowProps) {
  const [position, setPosition] = useState({ x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 });
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    onClick();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
    if (isResizing) {
      setSize({
        width: Math.max(400, e.clientX - position.x),
        height: Math.max(300, e.clientY - position.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useState(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });

  return (
    <div
      className={`absolute transition-all ${isActive ? 'z-50' : 'z-10'}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
    >
      <Card className="h-full flex flex-col overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl animate-scale-in">
        <div
          className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10 cursor-move select-none"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <Icon name={icon} size={20} className="text-primary" />
            <span className="font-medium text-sm">{title}</span>
          </div>
          <div className="flex items-center gap-2 window-controls">
            <button
              onClick={onMinimize}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Icon name="Minus" size={16} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-black/20">
          {children}
        </div>
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={(e) => {
            e.stopPropagation();
            onClick();
            setIsResizing(true);
          }}
        />
      </Card>
    </div>
  );
}

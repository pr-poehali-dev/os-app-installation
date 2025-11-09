import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface TaskbarApp {
  id: string;
  icon: string;
  title: string;
  isMinimized?: boolean;
}

interface TaskbarProps {
  apps: TaskbarApp[];
  onAppClick: (id: string) => void;
}

export default function Taskbar({ apps, onAppClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(timer);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-16 backdrop-blur-2xl bg-white/10 border-t border-white/20 shadow-2xl z-[100] flex items-center justify-around px-2">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className={`flex-1 h-12 max-w-[80px] rounded-xl backdrop-blur-xl transition-all active:scale-95 flex flex-col items-center justify-center gap-1 ${
              app.isMinimized ? 'bg-white/10' : 'bg-white/5'
            }`}
          >
            <Icon name={app.icon} size={20} />
            <span className="text-[10px] font-medium truncate max-w-full px-1">{app.title}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 backdrop-blur-2xl bg-white/10 border-t border-white/20 shadow-2xl z-[100] flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon name="Boxes" size={24} className="text-white" />
        </div>
        <span className="font-semibold text-lg">GlassOS</span>
      </div>

      <div className="flex items-center gap-2">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppClick(app.id)}
            className={`h-12 px-4 rounded-xl backdrop-blur-xl transition-all hover:bg-white/20 flex items-center gap-2 ${
              app.isMinimized ? 'bg-white/10' : 'bg-white/5'
            }`}
          >
            <Icon name={app.icon} size={20} />
            <span className="text-sm font-medium">{app.title}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5">
          <Icon name="Wifi" size={18} />
          <Icon name="Volume2" size={18} />
        </div>
        <div className="text-sm font-medium">{time}</div>
      </div>
    </div>
  );
}
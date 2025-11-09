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
  const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

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

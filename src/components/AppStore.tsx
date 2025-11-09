import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  size: string;
  installed: boolean;
}

interface AppStoreProps {
  onInstall: (app: App) => void;
  onUninstall: (appId: string) => void;
  installedApps: string[];
}

const AVAILABLE_APPS: App[] = [
  { id: 'calc', name: 'Калькулятор', icon: 'Calculator', description: 'Простой калькулятор для вычислений', size: '2.4 MB', installed: false },
  { id: 'notes', name: 'Заметки', icon: 'FileText', description: 'Создавайте и редактируйте заметки', size: '5.1 MB', installed: false },
  { id: 'music', name: 'Музыка', icon: 'Music', description: 'Музыкальный плеер', size: '12.8 MB', installed: false },
  { id: 'photos', name: 'Фото', icon: 'Image', description: 'Просмотр и редактирование фотографий', size: '8.3 MB', installed: false },
  { id: 'browser', name: 'Браузер', icon: 'Globe', description: 'Веб-браузер для интернета', size: '45.2 MB', installed: false },
  { id: 'settings', name: 'Настройки', icon: 'Settings', description: 'Настройки системы', size: '3.7 MB', installed: false },
];

export default function AppStore({ onInstall, onUninstall, installedApps }: AppStoreProps) {
  const [search, setSearch] = useState('');

  const apps = AVAILABLE_APPS.map(app => ({
    ...app,
    installed: installedApps.includes(app.id)
  }));

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск приложений..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-2 md:space-y-3">
        {filteredApps.map((app) => (
          <Card key={app.id} className="p-3 md:p-4 bg-white/5 border-white/10 hover:bg-white/10 active:bg-white/15 transition-colors">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Icon name={app.icon} size={24} className="md:w-7 md:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base md:text-lg">{app.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1 line-clamp-2">{app.description}</p>
                <p className="text-xs text-muted-foreground mt-1 md:mt-2">{app.size}</p>
              </div>
              {app.installed ? (
                <Button
                  onClick={() => onUninstall(app.id)}
                  variant="outline"
                  size="sm"
                  className="bg-white/5 border-white/10 hover:bg-red-500/20 active:scale-95 flex-shrink-0 text-xs md:text-sm"
                >
                  Удалить
                </Button>
              ) : (
                <Button
                  onClick={() => onInstall(app)}
                  size="sm"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 active:scale-95 flex-shrink-0 text-xs md:text-sm"
                >
                  Установить
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
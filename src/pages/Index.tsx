import { useState } from 'react';
import Window from '@/components/Window';
import Taskbar from '@/components/Taskbar';
import AppStore from '@/components/AppStore';
import Icon from '@/components/ui/icon';

interface OpenWindow {
  id: string;
  title: string;
  icon: string;
  content: string;
  isMinimized: boolean;
}

interface DesktopApp {
  id: string;
  name: string;
  icon: string;
}

export default function Index() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
    { id: 'store', title: 'Магазин приложений', icon: 'ShoppingBag', content: 'store', isMinimized: false }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string>('store');
  const [installedApps, setInstalledApps] = useState<string[]>(['store']);
  const [desktopApps, setDesktopApps] = useState<DesktopApp[]>([
    { id: 'store', name: 'Магазин', icon: 'ShoppingBag' }
  ]);

  const handleOpenWindow = (id: string, title: string, icon: string, content: string) => {
    const existingWindow = openWindows.find(w => w.id === id);
    if (existingWindow) {
      setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      setActiveWindowId(id);
    } else {
      setOpenWindows(prev => [...prev, { id, title, icon, content, isMinimized: false }]);
      setActiveWindowId(id);
    }
  };

  const handleCloseWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(openWindows[0]?.id || '');
    }
  };

  const handleMinimizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const handleTaskbarAppClick = (id: string) => {
    const window = openWindows.find(w => w.id === id);
    if (window?.isMinimized) {
      setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      setActiveWindowId(id);
    } else if (activeWindowId === id) {
      handleMinimizeWindow(id);
    } else {
      setActiveWindowId(id);
    }
  };

  const handleInstallApp = (app: { id: string; name: string; icon: string }) => {
    if (!installedApps.includes(app.id)) {
      setInstalledApps(prev => [...prev, app.id]);
      setDesktopApps(prev => [...prev, app]);
    }
  };

  const handleUninstallApp = (appId: string) => {
    setInstalledApps(prev => prev.filter(id => id !== appId));
    setDesktopApps(prev => prev.filter(app => app.id !== appId));
    handleCloseWindow(appId);
  };

  const renderWindowContent = (content: string) => {
    switch (content) {
      case 'store':
        return (
          <AppStore
            onInstall={handleInstallApp}
            onUninstall={handleUninstallApp}
            installedApps={installedApps}
          />
        );
      case 'calc':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Calculator" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Калькулятор</h2>
              <p className="text-muted-foreground mt-2">Приложение калькулятора</p>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="FileText" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Заметки</h2>
              <p className="text-muted-foreground mt-2">Создавайте и редактируйте заметки</p>
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Music" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Музыка</h2>
              <p className="text-muted-foreground mt-2">Музыкальный плеер</p>
            </div>
          </div>
        );
      case 'photos':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Image" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Фото</h2>
              <p className="text-muted-foreground mt-2">Просмотр и редактирование фотографий</p>
            </div>
          </div>
        );
      case 'browser':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Globe" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Браузер</h2>
              <p className="text-muted-foreground mt-2">Веб-браузер для интернета</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Settings" size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold">Настройки</h2>
              <p className="text-muted-foreground mt-2">Настройки системы</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-[#1A1F2C] via-[#2D1B4E] to-[#1A1F2C]">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="absolute top-8 left-8 grid grid-cols-4 gap-6">
        {desktopApps.map((app) => (
          <button
            key={app.id}
            onClick={() => handleOpenWindow(app.id, app.name, app.icon, app.id)}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/10 transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
              <Icon name={app.icon} size={32} className="text-white" />
            </div>
            <span className="text-sm font-medium text-center">{app.name}</span>
          </button>
        ))}
      </div>

      {openWindows.filter(w => !w.isMinimized).map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          onClose={() => handleCloseWindow(window.id)}
          onMinimize={() => handleMinimizeWindow(window.id)}
          isActive={activeWindowId === window.id}
          onClick={() => setActiveWindowId(window.id)}
        >
          {renderWindowContent(window.content)}
        </Window>
      ))}

      <Taskbar
        apps={openWindows.map(w => ({ id: w.id, icon: w.icon, title: w.title, isMinimized: w.isMinimized }))}
        onAppClick={handleTaskbarAppClick}
      />
    </div>
  );
}

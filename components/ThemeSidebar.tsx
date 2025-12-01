 'use client';

 import type { ReactNode } from 'react';
 import { X, Sun, Moon, Monitor } from 'lucide-react';
 import clsx from 'clsx';

type ThemeId = 'light' | 'dark' | 'sepia';

interface ThemeSidebarProps {
  open: boolean;
  theme: ThemeId;
  onClose: () => void;
  onChangeTheme: (theme: ThemeId) => void;
}

export default function ThemeSidebar({ open, theme, onClose, onChangeTheme }: ThemeSidebarProps) {
  if (!open) return null;

  const themes: { id: ThemeId; label: string; description: string; icon: ReactNode }[] = [
    {
      id: 'light',
      label: '白天模式',
      description: '明亮背景，接近原始 Gmail 界面，适合日间阅读。',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
    },
    {
      id: 'dark',
      label: '夜间模式',
      description: '深色背景，减少眩光，适合暗光环境浏览。',
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: 'sepia',
      label: '护眼模式',
      description: '略带书页感的暖色背景，适合长时间阅读。',
      icon: <Monitor className="w-4 h-4 text-emerald-500" />,
    },
  ];

  return (
    <div className="absolute top-16 right-0 bottom-0 z-[80] flex">
      <aside className="w-72 h-full bg-surface border-l border-subtle shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-subtle">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-main">外观设置</span>
            <span className="text-xs text-muted">选择主题：白天 / 夜间 / 护眼模式</span>
          </div>
          <button
            className="icon-btn p-1 text-muted hover:text-main"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm text-main">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTheme(item.id)}
              className={clsx(
                'w-full flex items-start gap-3 rounded-lg border px-3 py-2 text-left transition-colors',
                theme === item.id
                  ? 'border-accent bg-accent-soft'
                  : 'border-transparent hover-surface-soft'
              )}
            >
              <div className="mt-0.5">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate">{item.label}</span>
                  <span
                    className={clsx(
                      'ml-2 h-2.5 w-2.5 rounded-full border',
                      theme === item.id
                        ? 'border-accent bg-accent'
                        : 'border-subtle bg-surface'
                    )}
                  />
                </div>
                <p className="mt-0.5 text-xs text-muted leading-snug truncate">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

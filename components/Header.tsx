 'use client';

 import { useState } from 'react';
 import { Menu, Search, SlidersHorizontal, CircleHelp, Settings, Grid } from 'lucide-react';

 interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenThemeSidebar?: () => void;
 }

 export default function Header({ onToggleSidebar, onOpenThemeSidebar }: HeaderProps) {
  const [showApps, setShowApps] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const apps = [
    { name: '账号', href: 'https://accounts.google.com/', initial: 'A', bg: 'bg-amber-500' },
    { name: '搜索', href: 'https://www.google.com/', initial: 'G', bg: 'bg-blue-500' },
    { name: '地图', href: 'https://maps.google.com/', initial: 'M', bg: 'bg-green-500' },
    { name: 'Play', href: 'https://play.google.com/', initial: 'P', bg: 'bg-emerald-500' },
    { name: '云端硬盘', href: 'https://drive.google.com/', initial: 'D', bg: 'bg-sky-500' },
    { name: '日历', href: 'https://calendar.google.com/', initial: 'C', bg: 'bg-indigo-500' },
    { name: '翻译', href: 'https://translate.google.com/', initial: 'T', bg: 'bg-teal-500' },
    { name: '相册', href: 'https://photos.google.com/', initial: 'P', bg: 'bg-pink-500' },
    { name: 'YouTube', href: 'https://www.youtube.com/', initial: 'Y', bg: 'bg-red-500' },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-surface border-b border-subtle sticky top-0 z-50 h-16">
      <div className="flex items-center gap-4 w-64">
        <button className="icon-btn" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-semibold flex">
            <span className="text-blue-500">J</span>
            <span className="text-red-500">m</span>
            <span className="text-yellow-500">a</span>
            <span className="text-blue-500">i</span>
            <span className="text-green-500">l</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search mail"
            className="w-full py-3 pl-12 pr-10 bg-gray-100 rounded-lg focus:bg-white focus:shadow-md outline-none transition-all placeholder:text-gray-600 text-gray-800"
          />
          <button className="absolute right-3 icon-btn p-1">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 w-64 justify-end">
        <div className="relative">
          <button
            className="icon-btn"
            onClick={() => setShowAbout((open) => !open)}
          >
            <CircleHelp className="w-6 h-6" />
          </button>

          {showAbout && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-surface shadow-2xl border border-subtle p-4 text-sm text-main">
              <div className="font-semibold text-main mb-1">关于本站</div>
              <p className="mb-2">
                这是一个以 Gmail 界面为灵感的博客与阅读空间，用“收件箱”的方式整理名人相关内容。
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted">
                <li>左侧标签可以在不同人物、文件夹之间切换。</li>
                <li>点击中间列表中的条目可查看全文，上方按钮支持全屏预览。</li>
                <li>右上角九宫格按钮可作为快速入口，跳转到常用站点或工具。</li>
              </ul>
            </div>
          )}
        </div>
        <button
          className="icon-btn"
          onClick={onOpenThemeSidebar}
          title="主题设置"
        >
          <Settings className="w-6 h-6" />
        </button>
        <div className="relative">
          <button
            className="icon-btn"
            onClick={() => setShowApps((open) => !open)}
          >
            <Grid className="w-6 h-6" />
          </button>

          {showApps && (
            <div className="absolute right-0 mt-3 w-80 max-h-[480px] overflow-y-auto rounded-2xl bg-surface shadow-2xl border border-subtle p-4">
              <div className="grid grid-cols-3 gap-4">
                {apps.map((app) => (
                  <a
                    key={app.name}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-xl p-2 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${app.bg}`}
                    >
                      {app.initial}
                    </div>
                    <span className="text-xs text-main text-center truncate w-16">
                      {app.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ml-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg cursor-pointer">
          J
        </div>
      </div>
    </header>
  );
}

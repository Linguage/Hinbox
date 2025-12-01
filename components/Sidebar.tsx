 'use client';

 import { Pencil, Inbox, Star, Send, Users, CircleHelp, Settings, X } from 'lucide-react';
import { people } from '@/lib/data';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

interface SidebarProps {
  collapsed?: boolean;
  onOpenThemeSidebar?: () => void;
}

function SidebarContent({ collapsed = false, onOpenThemeSidebar }: SidebarProps) {
  const [showMobileAbout, setShowMobileAbout] = useState(false);
  const searchParams = useSearchParams();
  const selectedPersonId = searchParams.get('person');
  const selectedLabel = searchParams.get('label') || 'Inbox'; // Default to Inbox if no params

  // Determine active state logic
  const isInboxActive = !selectedPersonId && selectedLabel === 'Inbox';
  const isStarredActive = !selectedPersonId && selectedLabel === 'Starred';
  const isSentActive = !selectedPersonId && selectedLabel === 'Sent';
  const isContactsActive = !selectedPersonId && selectedLabel === 'Contacts';

  return (
    <aside
      className={clsx(
        "h-[calc(100vh-64px)] flex flex-col overflow-y-auto pb-4 shrink-0 bg-surface-soft border-r border-subtle",
        collapsed ? "w-16 items-center pr-0" : "w-64 pr-2"
      )}
    >
      <div className={collapsed ? "p-2" : "p-4"}>
        {collapsed ? (
          <button className="flex items-center justify-center w-10 h-10 bg-accent-soft hover:shadow-md transition-shadow text-main rounded-full">
            <Pencil className="w-5 h-5" />
          </button>
        ) : (
          <button className="flex items-center gap-3 bg-accent-soft hover:shadow-md transition-shadow text-main px-6 py-4 rounded-2xl font-medium text-sm">
            <Pencil className="w-5 h-5" />
            Compose
          </button>
        )}
      </div>

      {/* Main navigation */}
      {!collapsed ? (
        <nav className="flex-1">
          <div className="mb-4">
            <Link href="/?label=Inbox">
              <SidebarItem
                icon={<Inbox className="w-4 h-4" />}
                label="Inbox"
                count={2233}
                isActive={isInboxActive}
              />
            </Link>
            <Link href="/?label=Starred">
              <SidebarItem
                icon={<Star className="w-4 h-4" />}
                label="Starred"
                isActive={isStarredActive}
              />
            </Link>
            <Link href="/?label=Sent">
              <SidebarItem
                icon={<Send className="w-4 h-4" />}
                label="Sent"
                count={1495}
                isActive={isSentActive}
              />
            </Link>
          </div>

          <div className="mt-6">
            <div className="px-6 pb-2 text-xs font-medium text-muted uppercase tracking-wider flex items-center justify-between group cursor-pointer">
              PEOPLE
            </div>
            
            <Link href="/?label=Contacts">
              <SidebarItem
                icon={<Users className="w-4 h-4" />}
                label="All Contacts"
                isActive={isContactsActive}
              />
            </Link>

            {people.map((person) => (
              <Link key={person.id} href={`/?person=${person.id}`}>
                <div
                  className={clsx(
                    "flex items-center px-6 py-1 cursor-pointer text-sm",
                    selectedPersonId === person.id
                      ? "bg-accent-soft text-main font-semibold rounded-r-full"
                      : "text-muted hover-surface-soft rounded-r-full"
                  )}
                >
                  <span className="truncate">{person.name}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile-only settings section */}
          <div className="mt-6 md:hidden">
            <div className="px-6 pb-2 text-xs font-medium text-muted uppercase tracking-wider">
              SETTINGS
            </div>
            <button
              type="button"
              onClick={() => setShowMobileAbout((prev) => !prev)}
              className="w-full text-left"
            >
              <SidebarItem
                icon={<CircleHelp className="w-4 h-4" />}
                label="关于"
                isActive={false}
              />
            </button>
            <button
              type="button"
              onClick={() => onOpenThemeSidebar?.()}
              className="w-full text-left mt-1"
            >
              <SidebarItem
                icon={<Settings className="w-4 h-4" />}
                label="主题设置"
                isActive={false}
              />
            </button>
          </div>
        </nav>
      ) : (
        // Collapsed icon-only navigation
        <nav className="flex-1 flex flex-col items-center gap-2 mt-2 w-full">
          <Link href="/?label=Inbox">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover-surface-soft text-main",
                isInboxActive && "bg-accent-soft text-main"
              )}
            >
              <Inbox className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/?label=Starred">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover-surface-soft text-main",
                isStarredActive && "bg-accent-soft text-main"
              )}
            >
              <Star className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/?label=Sent">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover-surface-soft text-main",
                isSentActive && "bg-accent-soft text-main"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/?label=Contacts">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover-surface-soft text-main",
                isContactsActive && "bg-accent-soft text-main"
              )}
            >
              <Users className="w-5 h-5" />
            </button>
          </Link>
          {/* Mobile-only icons for About & Theme */}
          <button
            type="button"
            onClick={() => setShowMobileAbout((prev) => !prev)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover-surface-soft text-main md:hidden"
          >
            <CircleHelp className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => onOpenThemeSidebar?.()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover-surface-soft text-main md:hidden"
          >
            <Settings className="w-5 h-5" />
          </button>
        </nav>
      )}

      {showMobileAbout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 md:hidden"
          onClick={() => setShowMobileAbout(false)}
        >
          <div
            className="mx-6 rounded-2xl bg-surface border border-subtle p-4 text-xs text-main max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">关于本站</span>
              <button
                type="button"
                className="icon-btn p-1 text-muted hover:text-main"
                onClick={() => setShowMobileAbout(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mb-2">
              这是一个以 Gmail 界面为灵感的博客与阅读空间，用“收件箱”的方式整理名人相关内容。
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-muted">
              <li>左侧标签可以在不同人物、文件夹之间切换。</li>
              <li>点击中间列表中的条目可查看全文，上方按钮支持全屏预览。</li>
              <li>右上角九宫格按钮可作为快速入口，跳转到常用站点或工具。</li>
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}

export default function Sidebar({ collapsed = false, onOpenThemeSidebar }: SidebarProps) {
  return (
    <Suspense fallback={<div className={collapsed ? "w-16" : "w-64"} />}>
      <SidebarContent collapsed={collapsed} onOpenThemeSidebar={onOpenThemeSidebar} />
    </Suspense>
  );
}

function SidebarItem({ icon, label, count, isActive }: { icon: React.ReactNode, label: string, count?: number, isActive: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between px-6 py-1 cursor-pointer text-sm rounded-r-full mr-2",
        isActive ? "bg-accent-soft text-main font-bold" : "text-muted hover-surface-soft"
      )}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span>{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-xs font-medium">{count}</span>
      )}
    </div>
  );
}

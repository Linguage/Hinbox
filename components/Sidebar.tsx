 'use client';

import { Pencil, Inbox, Star, Send, Users, CircleHelp, Settings, X, Menu } from 'lucide-react';
import { people, emails } from '@/lib/data';
import { aboutSite } from '@/ui/assets/ui';
import { Logo } from '@/ui/logo';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import GiscusComments from '@/components/GiscusComments';

interface SidebarProps {
  collapsed?: boolean;
  onOpenThemeSidebar?: () => void;
  onToggleSidebar?: () => void;
}

function SidebarContent({ collapsed = false, onOpenThemeSidebar, onToggleSidebar }: SidebarProps) {
  const [showMobileAbout, setShowMobileAbout] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const searchParams = useSearchParams();
  const selectedPersonId = searchParams.get('person');
  const selectedLabel = searchParams.get('label') || 'Inbox'; // Default to Inbox if no params

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const isWithinLastWeek = (dateString: string) => {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return false;
    return d >= weekAgo && d <= now;
  };

  const inboxWeeklyCount = emails.filter(
    (email) => email.labels.includes('Inbox') && isWithinLastWeek(email.date)
  ).length;

  const sentWeeklyCount = emails.filter(
    (email) => email.labels.includes('Sent') && isWithinLastWeek(email.date)
  ).length;

  const starredWeeklyCount = emails.filter(
    (email) => email.isStarred && isWithinLastWeek(email.date)
  ).length;

  // Determine active state logic
  const isInboxActive = !selectedPersonId && selectedLabel === 'Inbox';
  const isStarredActive = !selectedPersonId && selectedLabel === 'Starred';
  const isSentActive = !selectedPersonId && selectedLabel === 'Sent';
  const isContactsActive = !selectedPersonId && selectedLabel === 'Contacts';

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 bottom-0 z-[60] w-64 flex flex-col overflow-y-auto pb-4 bg-surface-soft border-r border-subtle md:relative md:h-[calc(100vh-64px)] md:shrink-0",
        collapsed ? "md:w-16 md:items-center md:pr-0" : "md:w-64 md:pr-2"
      )}
    >
      <div className="px-4 pt-3 pb-1 md:hidden">
        <Logo variant="full" className="h-8 w-auto" />
      </div>
      <div className={collapsed ? "p-2" : "p-4"}>
        {collapsed ? (
          <button
            className="flex items-center justify-center w-10 h-10 bg-accent-soft hover:shadow-md transition-shadow text-main rounded-full"
            onClick={() => setShowCompose(true)}
          >
            <Pencil className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="flex items-center gap-3 bg-accent-soft hover:shadow-md transition-shadow text-main px-6 py-4 rounded-2xl font-medium text-sm"
            onClick={() => setShowCompose(true)}
          >
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
                count={inboxWeeklyCount}
                isActive={isInboxActive}
              />
            </Link>
            <Link href="/?label=Starred">
              <SidebarItem
                icon={<Star className="w-4 h-4" />}
                label="Starred"
                count={starredWeeklyCount}
                isActive={isStarredActive}
              />
            </Link>
            <Link href="/?label=Sent">
              <SidebarItem
                icon={<Send className="w-4 h-4" />}
                label="Sent"
                count={sentWeeklyCount}
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

      {showCompose && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowCompose(false)}
        >
          <div
            className="mx-4 rounded-2xl bg-surface border border-subtle p-4 text-xs text-main max-w-xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">给博客留言</span>
              <button
                type="button"
                className="icon-btn p-1 text-muted hover:text-main"
                onClick={() => setShowCompose(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-muted mb-3">
              使用 GitHub 账号登录后，可以通过 Giscus 向博客作者留言或提问。
            </p>
            <GiscusComments term="guestbook" />
          </div>
        </div>
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
              <span className="font-semibold">{aboutSite.title}</span>
              <button
                type="button"
                className="icon-btn p-1 text-muted hover:text-main"
                onClick={() => setShowMobileAbout(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mb-2">
              {aboutSite.intro}
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-muted">
              {aboutSite.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
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

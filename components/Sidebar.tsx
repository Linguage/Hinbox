'use client';

import { Pencil, Inbox, Star, Send, Users } from 'lucide-react';
import { people } from '@/lib/data';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface SidebarProps {
  collapsed?: boolean;
}

function SidebarContent({ collapsed = false }: SidebarProps) {
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
        "h-[calc(100vh-64px)] flex flex-col overflow-y-auto pb-4 shrink-0",
        collapsed ? "w-16 items-center pr-0" : "w-64 pr-2"
      )}
    >
      <div className={collapsed ? "p-2" : "p-4"}>
        {collapsed ? (
          <button className="flex items-center justify-center w-10 h-10 bg-[#c2e7ff] hover:shadow-md transition-shadow text-[#001d35] rounded-full">
            <Pencil className="w-5 h-5" />
          </button>
        ) : (
          <button className="flex items-center gap-3 bg-[#c2e7ff] hover:shadow-md transition-shadow text-[#001d35] px-6 py-4 rounded-2xl font-medium text-sm">
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
            <div className="px-6 pb-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-between group cursor-pointer">
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
                      ? "bg-[#d3e3fd] text-[#001d35] font-semibold rounded-r-full"
                      : "text-gray-700 hover:bg-gray-100 rounded-r-full"
                  )}
                >
                  <span className="truncate">{person.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      ) : (
        // Collapsed icon-only navigation
        <nav className="flex-1 flex flex-col items-center gap-2 mt-2 w-full">
          <Link href="/?label=Inbox">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700",
                isInboxActive && "bg-[#d3e3fd] text-[#001d35]"
              )}
            >
              <Inbox className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/?label=Starred">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700",
                isStarredActive && "bg-[#d3e3fd] text-[#001d35]"
              )}
            >
              <Star className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/?label=Sent">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700",
                isSentActive && "bg-[#d3e3fd] text-[#001d35]"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </Link>
          <Link href="/?label=Contacts">
            <button
              className={clsx(
                "w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-700",
                isContactsActive && "bg-[#d3e3fd] text-[#001d35]"
              )}
            >
              <Users className="w-5 h-5" />
            </button>
          </Link>
        </nav>
      )}
    </aside>
  );
}

export default function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <Suspense fallback={<div className={collapsed ? "w-16" : "w-64"} />}>
      <SidebarContent collapsed={collapsed} />
    </Suspense>
  );
}

function SidebarItem({ icon, label, count, isActive }: { icon: React.ReactNode, label: string, count?: number, isActive: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between px-6 py-1 cursor-pointer text-sm rounded-r-full mr-2",
        isActive ? "bg-[#d3e3fd] text-[#001d35] font-bold" : "text-gray-700 hover:bg-gray-100"
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

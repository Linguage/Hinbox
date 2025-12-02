  'use client';

 import { useEffect, useState } from 'react';
 import { Star, Paperclip, Archive, Trash2, Mail, Clock } from 'lucide-react';
 import { Email, people } from '@/lib/data';
 import clsx from 'clsx';
 import Link from 'next/link';

interface EmailRowProps {
  email: Email;
  selected: boolean;
}

export default function EmailRow({ email, selected }: EmailRowProps) {
  const person = people.find((p) => p.name === email.sender);

  const [effectiveIsRead, setEffectiveIsRead] = useState<boolean>(email.isRead);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 仅最近一周的内容才允许显示为“未读”
    const emailDate = new Date(email.date);
    const now = Date.now();
    const diffMs = now - (isNaN(emailDate.getTime()) ? now : emailDate.getTime());
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    const isOlderThanWeek = diffMs > weekMs;

    let locallyMarkedRead = false;
    try {
      const raw = window.localStorage.getItem('hinbox:readEmails');
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          locallyMarkedRead = list.includes(email.id);
        }
      }
    } catch {
      // 本地存储解析失败时，忽略并退回到默认逻辑
    }

    // 基础 isRead + 本地标记 + 超过一周都视为“已读”（不再加粗）
    setEffectiveIsRead(email.isRead || locallyMarkedRead || isOlderThanWeek);
  }, [email]);

  return (
    <Link href={`/mail/${email.id}`} className="block">
      <div
        className={clsx(
          "group flex items-center px-4 py-2 border-b border-subtle hover:shadow-md hover:z-10 relative cursor-pointer transition-shadow bg-surface",
          selected && "bg-accent-soft",
          !effectiveIsRead && "font-bold"
        )}
      >
        {/* Controls (desktop only) */}
        <div className="hidden sm:flex items-center gap-3 min-w-[120px]">
          <div className="p-2 rounded-full hover:bg-gray-200 text-gray-400" onClick={(e) => e.preventDefault()}>
            <div className="w-4 h-4 border-2 border-gray-400 rounded-sm" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 text-gray-400" onClick={(e) => e.preventDefault()}>
            <Star className={clsx("w-5 h-5", email.isStarred ? "fill-yellow-400 text-yellow-400" : "")} />
          </div>
        </div>

        {/* Sender */}
        <div
          className={clsx(
            "relative w-32 sm:w-48 pr-3 sm:pr-4 text-sm flex-shrink-0",
            !effectiveIsRead ? "font-bold text-main" : "text-main"
          )}
        >
          <span className="block max-w-full truncate peer">{email.sender}</span>
          {person?.bio && (
            <div className="pointer-events-none absolute left-0 top-full mt-1 z-30 hidden w-72 rounded-xl bg-gray-900 text-white text-xs p-3 shadow-lg peer-hover:block">
              <div className="font-semibold mb-1">{person.name}</div>
              <div className="text-gray-100 leading-snug">{person.bio}</div>
            </div>
          )}
        </div>

        {/* Subject & Snippet */}
        <div className="flex-1 min-w-0 text-sm text-muted">
          <div className="relative flex items-center gap-2 min-w-0">
            <span
              className={clsx(
                "truncate peer",
                !effectiveIsRead ? "font-bold text-black" : ""
              )}
            >
              {email.subject}
            </span>
            {email.snippet && (
              <div className="pointer-events-none absolute left-0 top-full mt-1 z-20 hidden w-80 rounded-xl bg-gray-900 text-white text-xs p-3 shadow-lg peer-hover:block">
                <div className="font-semibold mb-1">{email.subject}</div>
                <div className="text-gray-100 leading-snug">{email.snippet}</div>
              </div>
            )}
          </div>
          {email.snippet && (
            <div className="mt-0.5 text-xs text-muted truncate">
              {email.snippet}
            </div>
          )}
        </div>

        {/* End Meta */}
        <div className="flex items-center justify-end w-[80px] sm:min-w-[100px] pl-2 gap-2 shrink-0">
          {email.hasAttachment && (
            <div className="px-2">
               <Paperclip className="w-4 h-4 text-gray-500" />
            </div>
          )}
          
          {/* Date or Hover Actions */}
          <div className="group-hover:hidden text-xs font-bold text-muted text-right w-[80px]">
            {email.date}
          </div>

          <div
            className="hidden group-hover:flex items-center gap-1 text-muted bg-surface-soft border border-subtle rounded-full px-1.5 py-0.5 shadow-sm z-20"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
             <button className="icon-btn p-2" title="Archive">
               <Archive className="w-4 h-4" />
             </button>
             <button className="icon-btn p-2" title="Delete">
               <Trash2 className="w-4 h-4" />
             </button>
             <button className="icon-btn p-2" title="Mark as unread">
               <Mail className="w-4 h-4" />
             </button>
             <button className="icon-btn p-2" title="Snooze">
               <Clock className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

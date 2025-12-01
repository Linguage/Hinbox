 'use client';

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

  return (
    <Link href={`/mail/${email.id}`} className="block">
      <div
        className={clsx(
          "group flex items-center px-4 py-2 border-b border-gray-200 hover:shadow-md hover:z-10 relative cursor-pointer transition-shadow",
          selected ? "bg-blue-50" : "bg-white hover:bg-gray-50",
          !email.isRead && "bg-white font-bold"
        )}
      >
        {/* Controls */}
        <div className="flex items-center gap-3 min-w-[120px]">
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
            "relative w-48 pr-4 text-sm",
            !email.isRead ? "font-bold text-black" : "text-gray-700"
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
        <div className="flex-1 flex items-center gap-2 text-sm text-gray-600">
          <div className="relative flex items-center gap-2 min-w-0">
            <span
              className={clsx("truncate peer", !email.isRead ? "font-bold text-black" : "")}
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
          <span className="text-gray-400">-</span>
          <span className="truncate text-gray-500">
            {email.snippet}
          </span>
        </div>

        {/* End Meta */}
        <div className="flex items-center justify-end min-w-[100px] pl-2 gap-2">
          {email.hasAttachment && (
            <div className="px-2">
               <Paperclip className="w-4 h-4 text-gray-500" />
            </div>
          )}
          
          {/* Date or Hover Actions */}
          <div className="group-hover:hidden text-xs font-bold text-gray-500 text-right w-[80px]">
            {email.date}
          </div>

          <div className="hidden group-hover:flex items-center gap-1 text-gray-500" onClick={(e) => e.preventDefault()}>
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

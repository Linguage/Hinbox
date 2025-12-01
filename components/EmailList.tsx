'use client';

import { Email } from '@/lib/data';
import EmailRow from './EmailRow';

interface EmailListProps {
  emails: Email[];
}

export default function EmailList({ emails }: EmailListProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-surface rounded-tl-2xl shadow-sm mr-2 mb-2">
      {emails.map((email) => (
        <EmailRow
          key={email.id}
          email={email}
          selected={false}
        />
      ))}
      
      {emails.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          No emails found
        </div>
      )}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Person } from '@/lib/data';

interface ContactsListProps {
  people: Person[];
}

export default function ContactsList({ people }: ContactsListProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-surface rounded-tl-2xl shadow-sm mr-2 mb-2">
      <div className="border-b border-subtle px-5 py-3 text-sm font-medium text-main">
        Contacts
      </div>
      {people.map((person) => (
        <Link key={person.id} href={`/?person=${person.id}`}>
          <div className="flex items-center justify-between px-5 py-2 text-sm text-main hover-surface-soft cursor-pointer">
            <div className="flex flex-col">
              <span className="font-medium truncate max-w-xs">{person.name}</span>
              <span className="text-xs text-muted truncate max-w-xs">{person.email}</span>
            </div>
            <span className="text-xs text-blue-600 font-medium">View mail</span>
          </div>
        </Link>
      ))}
      {people.length === 0 && (
        <div className="flex items-center justify-center h-full text-muted text-sm">
          No contacts found
        </div>
      )}
    </div>
  );
}

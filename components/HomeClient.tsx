'use client';

import { useSearchParams } from 'next/navigation';
import EmailList from '@/components/EmailList';
import ContactsList from '@/components/ContactsList';
import { Person, Email } from '@/lib/data';
import { ChevronLeft, ChevronRight, RefreshCcw, MoreVertical } from 'lucide-react';
import { Suspense } from 'react';
import OverviewBar from '@/components/OverviewBar';

interface HomeClientProps {
  allEmails: Email[];
  people: Person[];
}

function HomeContent({ allEmails, people }: HomeClientProps) {
  const searchParams = useSearchParams();
  const selectedPersonId = searchParams.get('person');
  const selectedLabel = searchParams.get('label') || 'Inbox';

  // Filter Logic
  const currentPerson = selectedPersonId ? people.find(p => p.id === selectedPersonId) : null;
  const isContactsView = !currentPerson && selectedLabel === 'Contacts';
  
  const filteredEmails = allEmails.filter(email => {
    if (currentPerson) {
      return email.labels.includes(currentPerson.name) || email.sender === currentPerson.name;
    }
    if (isContactsView) {
      return false;
    }
    return email.labels.includes(selectedLabel);
  });

  // Overview 文案
  let overviewText = '';
  if (currentPerson) {
    overviewText = `Overview of emails related to ${currentPerson.name}. Showing ${filteredEmails.length} conversations labeled with or sent by this person.`;
  } else if (isContactsView) {
    overviewText = `Overview of all contacts. Click a contact to see messages related to that person.`;
  } else if (selectedLabel === 'Inbox') {
    overviewText = `Overview of your Inbox. You have ${filteredEmails.length} items currently visible in this folder.`;
  } else if (selectedLabel === 'Starred') {
    overviewText = `Overview of Starred items. These are messages you've marked as important.`;
  } else if (selectedLabel === 'Sent') {
    overviewText = `Overview of Sent mail. Showing ${filteredEmails.length} messages you've sent.`;
  } else {
    overviewText = `Overview of messages filtered by label "${selectedLabel}".`;
  }

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <OverviewBar description={overviewText} />

      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
             <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
           </div>
           <button className="icon-btn p-1" title="Refresh">
             <RefreshCcw className="w-4 h-4 text-gray-600" />
           </button>
           <button className="icon-btn p-1" title="More">
             <MoreVertical className="w-4 h-4 text-gray-600" />
           </button>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>
            {isContactsView ? `${people.length} contacts` : `1-25 of ${filteredEmails.length}`}
          </span>
          <div className="flex items-center">
            <button className="p-1 hover:bg-gray-200 rounded-full disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-200 rounded-full">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Section Title (if Person) */}
      {currentPerson && (
        <div className="px-5 py-2 text-xl font-normal text-gray-800">
          {currentPerson.name}
        </div>
      )}

      {isContactsView ? (
        <ContactsList people={people} />
      ) : (
        <EmailList emails={filteredEmails} />
      )}
    </main>
  );
}

export default function HomeClient(props: HomeClientProps) {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <HomeContent {...props} />
    </Suspense>
  );
}

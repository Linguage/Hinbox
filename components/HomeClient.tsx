 'use client';

import { useSearchParams } from 'next/navigation';
import EmailList from '@/components/EmailList';
import ContactsList from '@/components/ContactsList';
import { Person, Email } from '@/lib/data';
import { ChevronLeft, ChevronRight, RefreshCcw, MoreVertical } from 'lucide-react';
import { Suspense } from 'react';
import OverviewBar from '@/components/OverviewBar';
import GiscusComments from '@/components/GiscusComments';

interface HomeClientProps {
  allEmails: Email[];
  people: Person[];
}

function HomeContent({ allEmails, people }: HomeClientProps) {
  const searchParams = useSearchParams();
  const selectedPersonId = searchParams.get('person');
  const selectedLabel = searchParams.get('label') || 'Inbox';
  const rawQuery = (searchParams.get('q') || '').trim().toLowerCase();
  const searchMode: 'meta' | 'full' = searchParams.get('searchMode') === 'full' ? 'full' : 'meta';

  // Filter Logic
  const currentPerson = selectedPersonId ? people.find(p => p.id === selectedPersonId) : null;
  const isContactsView = !currentPerson && selectedLabel === 'Contacts';
  const isGuestbookView = !currentPerson && !isContactsView && selectedLabel === 'Sent';
  
  const filteredEmails = allEmails.filter(email => {
    // 1. 先按人物 / 标签过滤
    if (currentPerson) {
      if (!(email.labels.includes(currentPerson.name) || email.sender === currentPerson.name)) {
        return false;
      }
    } else if (isContactsView) {
      return false;
    } else {
      if (!email.labels.includes(selectedLabel)) {
        return false;
      }
    }

    // 2. 再按站内搜索关键字过滤
    if (!rawQuery) return true;

    const metaText = [
      email.subject,
      email.snippet,
      email.sender,
      (email.labels || []).join(' '),
    ]
      .filter(Boolean)
      .join(' ') // 合并为一个字符串
      .toLowerCase();

    const inMeta = metaText.includes(rawQuery);
    if (searchMode === 'meta') {
      return inMeta;
    }

    // 全文搜索：在 meta 匹配基础上，额外检查正文 HTML 内容
    if (inMeta) return true;
    const bodyText = (email.body || '').toLowerCase();
    return bodyText.includes(rawQuery);
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
    overviewText = `Guestbook for your blog, powered by Giscus. Visitors can leave public messages using their GitHub accounts.`;
  } else {
    overviewText = `Overview of messages filtered by label "${selectedLabel}".`;
  }

  const listSummaryText = isContactsView
    ? `${people.length} contacts`
    : isGuestbookView
      ? 'Guestbook (Giscus)'
      : `1-25 of ${filteredEmails.length}`;

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
          <span>{listSummaryText}</span>
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
      ) : isGuestbookView ? (
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          <div className="max-w-3xl">
            <h2 className="text-lg font-medium text-main mb-2">留言板</h2>
            <p className="text-xs text-muted mb-4">
              这里是博客的公开留言板。使用 GitHub 账号登录后，可以通过 Giscus 发表留言或回复他人评论。
            </p>
            <GiscusComments term="guestbook" />
          </div>
        </div>
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

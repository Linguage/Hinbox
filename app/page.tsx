import { emails as staticEmails, people } from '@/lib/data';
import { getEmailsFromPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  // 1. Fetch posts from markdown files (at build time)
  const markdownEmails = await getEmailsFromPosts();
  
  // 2. Merge with static example data
  const allEmails = [...markdownEmails, ...staticEmails];

  // 3. Pass data to Client Component for interactive filtering
  return <HomeClient allEmails={allEmails} people={people} />;
}

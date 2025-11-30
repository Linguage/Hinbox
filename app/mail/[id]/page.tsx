import { emails as staticEmails } from '@/lib/data';
import { getEmailsFromPosts } from '@/lib/posts';
import MailContent from '@/components/MailContent';

interface MailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MailPage({ params }: MailPageProps) {
  const { id } = await params;
  
  // 1. Try to find in markdown posts
  const markdownEmails = await getEmailsFromPosts();
  let email = markdownEmails.find(e => e.id === id);

  // 2. If not found, try static data
  if (!email) {
      email = staticEmails.find(e => e.id === id);
  }

  if (!email) {
    return <div className="p-8">Email not found</div>;
  }

  return <MailContent email={email} />;
}

export async function generateStaticParams() {
  const markdownEmails = await getEmailsFromPosts();
  const allEmails = [...markdownEmails, ...staticEmails];

  return allEmails.map((email) => ({
    id: email.id,
  }));
}

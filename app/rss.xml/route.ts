import { getEmailsFromPosts } from '@/lib/posts';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function GET() {
  const siteUrl = 'https://linguage.github.io/Hinbox';
  const emails = await getEmailsFromPosts();

  const items = emails
    .map((email) => {
      const title = escapeXml(email.subject || '');
      const description = escapeXml(email.snippet || '');
      const link = `${siteUrl}/mail/${email.id}`;
      const pubDate = email.date ? new Date(email.date).toUTCString() : '';

      return [
        '<item>',
        `<title>${title}</title>`,
        `<link>${link}</link>`,
        `<guid>${link}</guid>`,
        pubDate ? `<pubDate>${pubDate}</pubDate>` : '',
        `<description>${description}</description>`,
        '</item>',
      ]
        .filter(Boolean)
        .join('');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0">\n` +
    `<channel>\n` +
    `<title>Hinbox</title>\n` +
    `<link>${siteUrl}</link>\n` +
    `<description>Hinbox 邮件风格博客的文章更新</description>\n` +
    `<language>zh-CN</language>\n` +
    `${items}\n` +
    `</channel>\n` +
    `</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}

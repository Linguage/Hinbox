import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Email } from './data';

const contentsDirectory = path.join(process.cwd(), 'contents');
const postsDirectory = path.join(contentsDirectory, 'posts');
const staticDirectory = path.join(contentsDirectory, 'static');

async function processFile(filePath: string, id: string, isMarkdown: boolean) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const matterResult = matter(fileContents);

  let contentHtml = matterResult.content;

  if (isMarkdown) {
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    contentHtml = processedContent.toString();
  }

  const relativePath = path.relative(contentsDirectory, filePath);

  return {
    id,
    contentHtml,
    sourcePath: relativePath,
    ...(matterResult.data as { 
        sender: string; 
        subject: string; 
        snippet: string; 
        date: string;
        labels: string[];
        isStarred?: boolean;
        isRead?: boolean;
        mdTheme?: 'default' | 'amp';
        sourcePath?: string;
    }),
  };
}

export async function getEmailsFromPosts(): Promise<Email[]> {
  let allPosts: any[] = [];

  // 1. Process Markdown Posts
  if (fs.existsSync(postsDirectory)) {
    const postFiles = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'));
    const postsData = await Promise.all(postFiles.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      return processFile(path.join(postsDirectory, fileName), id, true);
    }));
    allPosts = [...allPosts, ...postsData];
  }

  // 2. Process Static HTML Posts
  if (fs.existsSync(staticDirectory)) {
    const staticFiles = fs.readdirSync(staticDirectory).filter(f => f.endsWith('.html'));
    const staticData = await Promise.all(staticFiles.map(async (fileName) => {
      const id = fileName.replace(/\.html$/, '');
      return processFile(path.join(staticDirectory, fileName), id, false);
    }));
    allPosts = [...allPosts, ...staticData];
  }

  // Map to Email interface and sort by date (optional, straightforward string sort for now)
  return allPosts.map(post => ({
    id: post.id,
    sender: post.sender || 'Unknown',
    subject: post.subject || 'No Subject',
    snippet: post.snippet || '',
    date: post.date || '',
    isRead: post.isRead ?? true,
    isStarred: post.isStarred ?? false,
    hasAttachment: false,
    labels: post.labels || [],
    body: post.contentHtml,
    mdTheme: post.mdTheme || 'default',
    sourcePath: post.sourcePath,
  }));
}

export async function getPostData(id: string): Promise<Email | null> {
    const emails = await getEmailsFromPosts();
    return emails.find(e => e.id === id) || null;
}

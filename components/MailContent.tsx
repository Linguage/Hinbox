 'use client';

 import { useState, useEffect, useRef } from 'react';
 import { Email } from '@/lib/data';
 import { ArrowLeft, Printer, ExternalLink, Star, Reply, MoreVertical, Maximize2, Minimize2, Sparkles, X } from 'lucide-react';
 import Link from 'next/link';
 import clsx from 'clsx';
 import OverviewBar from '@/components/OverviewBar';
 import GiscusComments from '@/components/GiscusComments';

interface MailContentProps {
  email: Email;
}

// 专用的 HTML 渲染组件，用于隔离可能包含全局样式的 HTML
function SafeHtmlViewer({ content, isFullScreen }: { content: string, isFullScreen: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // 简单的启发式检查：如果包含 <html 或 <!DOCTYPE，或者是 HTML 文件生成的，通常认为是完整页面
  const isComplexHtml = content.includes('<html') || content.includes('<!DOCTYPE') || content.includes('<head>');

  useEffect(() => {
    if (!isComplexHtml || !iframeRef.current) return;

    const iframe = iframeRef.current;
    
    const updateHeight = () => {
      if (iframe.contentWindow) {
        // 获取内部文档的高度并添加一点缓冲
        const height = iframe.contentWindow.document.documentElement.scrollHeight;
        iframe.style.height = `${height + 20}px`;
      }
    };

    // 监听 iframe 加载完成
    iframe.addEventListener('load', updateHeight);
    
    // 也可以设置一个定时器以防图片加载较慢
    const timer = setTimeout(updateHeight, 500);
    const timer2 = setTimeout(updateHeight, 1500);

    return () => {
      iframe.removeEventListener('load', updateHeight);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [content, isComplexHtml, isFullScreen]);

  if (isComplexHtml) {
    return (
      <iframe
        ref={iframeRef}
        srcDoc={content}
        className="w-full border-0 block"
        style={{ minHeight: '600px' }}
        sandbox="allow-scripts allow-same-origin allow-popups"
        title="Email Content"
      />
    );
  }

  // 普通内容（如 Markdown 转换的片段）继续使用 div 渲染
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

function extractHeadingsFromHtml(html?: string) {
  if (!html) return [] as { level: number; text: string }[];

  const regex = /<(h[1-3])[^>]*>(.*?)<\/\1>/gi;
  const headings: { level: number; text: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const tag = match[1];
    const level = parseInt(tag[1] || '1', 10);
    const rawText = match[2]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .trim();

    if (rawText) {
      headings.push({ level, text: rawText });
    }
  }

  return headings;
}

export default function MailContent({ email }: MailContentProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPreviewSidebar, setShowPreviewSidebar] = useState(false);

  const overviewText = `Overview of this page. "${email.subject}" from ${email.sender} on ${email.date}. Labels: ${email.labels.join(', ')}.`;
  const headings = extractHeadingsFromHtml(email.body);

  return (
    <main 
      className={clsx(
        "flex flex-col bg-surface overflow-hidden transition-all duration-300",
        isFullScreen 
          ? "fixed inset-0 z-[100]" 
          : "flex-1 m-2 rounded-2xl shadow-sm min-w-0"
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-subtle bg-surface shrink-0">
        <div className="flex items-center gap-4">
          {!isFullScreen && (
            <Link href="/" className="icon-btn p-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
          )}
          <div className="flex items-center gap-2">
             <button className="icon-btn p-2" title="Archive">
               <div className="w-5 h-5 bg-gray-600 mask-icon" /> 
               <span className="sr-only">Archive</span>
             </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted">
          <button
            className="icon-btn p-2 hover-surface-soft hover:text-accent"
            onClick={() => setShowPreviewSidebar((open) => !open)}
            title={showPreviewSidebar ? '隐藏预览侧边栏' : '显示预览侧边栏'}
          >
            <Sparkles className="w-5 h-5" />
          </button>
          <button 
            className="icon-btn p-2 hover-surface-soft hover:text-accent" 
            onClick={() => setIsFullScreen(!isFullScreen)}
            title={isFullScreen ? "Exit Full Screen" : "Full Screen View"}
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <span className="text-xs ml-2">1 of 161</span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-hidden bg-surface">
        <div className="flex h-full">
          {/* 主内容区域 */}
          <div
            className={clsx(
              "flex-1 overflow-y-auto px-8 py-6 bg-surface",
              showPreviewSidebar && "border-r border-subtle"
            )}
          >
            {/* Subject Header */}
            <div className="flex items-start justify-between mb-6">
              <h1 className="text-2xl font-normal text-main">{email.subject}</h1>
              <div className="flex items-center gap-2">
                <button className="icon-btn">
                  <Printer className="w-5 h-5" />
                </button>
                <button className="icon-btn">
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sender Info Row */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-lg shrink-0">
                {email.sender[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-main">{email.sender}</span>
                    <span className="text-sm text-muted">&lt;{email.sender.toLowerCase().replace(/\s+/g, '.')}@example.com&gt;</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span>{email.date}</span>
                    <div className="flex items-center gap-2">
                      <button className="icon-btn p-1">
                        <Star className="w-4 h-4" />
                      </button>
                      <button className="icon-btn p-1">
                        <Reply className="w-4 h-4" />
                      </button>
                      <button className="icon-btn p-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted mt-0.5">to me</div>
              </div>
            </div>

            {/* Email Body (Blog Content) */}
            <div
              className={clsx(
                "prose max-w-none text-main text-sm leading-relaxed",
                isFullScreen && "max-w-4xl mx-auto text-base"
              )}
            >
              {email.body ? (
                <SafeHtmlViewer content={email.body} isFullScreen={isFullScreen} />
              ) : (
                <div>
                  <p>{email.snippet}</p>
                  <p className="mt-4 text-muted italic">[This is a placeholder for the full blog content. Add 'body' to data.ts to see more.]</p>
                </div>
              )}
            </div>

            {/* Reply Box Area */}
            <div className={clsx("mt-12 flex items-start gap-4", isFullScreen && "max-w-4xl mx-auto")}>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg shrink-0">
                J
              </div>
              <div className="flex-1 border border-subtle rounded-lg shadow-sm p-4 cursor-text text-muted text-sm hover:shadow-md transition-shadow bg-surface">
                Reply to {email.sender}...
              </div>
            </div>

            {/* Comments Section (Giscus) */}
            <div className={clsx("mt-10", isFullScreen && "max-w-4xl mx-auto")}>
              <h2 className="text-sm font-medium text-main mb-2">评论</h2>
              <p className="text-xs text-muted mb-3">
                使用 GitHub 账号登录后，可以在这里对当前文章进行评论（由 Giscus 提供支持）。
              </p>
              <GiscusComments term={`post-${email.id}`} />
            </div>
          </div>

          {/* 右侧预览侧边栏 */}
          {showPreviewSidebar && (
            <aside className="w-80 border-l border-subtle bg-surface-soft flex flex-col shrink-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-subtle">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-main">预览</span>
                </div>
                <button
                  className="icon-btn p-1 text-muted hover:text-main"
                  onClick={() => setShowPreviewSidebar(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pb-4">
                <div className="pt-3">
                  <OverviewBar description={overviewText} />
                </div>
                <div className="mt-2 px-4">
                  <div className="text-xs font-semibold text-muted mb-2">目录</div>
                  {headings.length === 0 ? (
                    <p className="text-xs text-muted">当前内容暂无可提取的标题。</p>
                  ) : (
                    <ul className="space-y-1 text-xs text-main">
                      {headings.map((h, index) => (
                        <li
                          key={`${h.level}-${index}`}
                          className={clsx(
                            "truncate",
                            h.level === 1 && "font-medium",
                            h.level === 2 && "pl-3",
                            h.level === 3 && "pl-5 text-muted"
                          )}
                        >
                          {h.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

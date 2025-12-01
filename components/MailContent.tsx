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

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;(#x[0-9a-fA-F]+;)/g, '$1')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
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

    const decoded = decodeHtmlEntities(rawText);
    if (decoded) {
      headings.push({ level, text: decoded });
    }
  }

  return headings;
}

export default function MailContent({ email }: MailContentProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPreviewSidebar, setShowPreviewSidebar] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // 打开文章时，将该邮件标记为“已读”（写入本地存储）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const key = 'hinbox:readEmails';
      const raw = window.localStorage.getItem(key);
      let list: string[] = [];
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          list = parsed;
        }
      }
      if (!list.includes(email.id)) {
        list.push(email.id);
        window.localStorage.setItem(key, JSON.stringify(list));
      }
    } catch {
      // 失败时忽略，不影响页面展示
    }
  }, [email.id]);

  const overviewText = `Overview of this page. "${email.subject}" from ${email.sender} on ${email.date}. Labels: ${email.labels.join(', ')}.`;
  const headings = extractHeadingsFromHtml(email.body);
  const mdTheme = email.mdTheme || 'default';
  const isAmpTheme = mdTheme === 'amp';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handler = () => {
      const anyWindow = window as any;
      if (!anyWindow.MathJax || typeof anyWindow.MathJax.typesetPromise !== 'function') {
        return;
      }
      if (!contentRef.current) return;
      try {
        if (typeof anyWindow.MathJax.typesetClear === 'function') {
          anyWindow.MathJax.typesetClear([contentRef.current]);
        }
        anyWindow.MathJax.typesetPromise([contentRef.current]);
      } catch {
      }
    };

    handler();
    window.addEventListener('MathJaxReady', handler);
    return () => {
      window.removeEventListener('MathJaxReady', handler);
    };
  }, [email.id, email.body, mdTheme, isAmpTheme, isFullScreen, showPreviewSidebar]);

  const handleHeadingClick = (index: number) => {
    if (!contentRef.current) return;
    const headingNodes = contentRef.current.querySelectorAll('h1, h2, h3');
    if (!headingNodes.length || index < 0 || index >= headingNodes.length) return;

    const target = headingNodes[index] as HTMLElement | undefined;
    if (!target) return;

    const container = scrollContainerRef.current;
    if (!container) {
      try {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch {
      }
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const offset = targetRect.top - containerRect.top + container.scrollTop - 16;

    container.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  };

  const previewSidebarContent = (
    <>
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
                    "truncate cursor-pointer hover:text-accent",
                    h.level === 1 && "font-medium",
                    h.level === 2 && "pl-3",
                    h.level === 3 && "pl-5 text-muted"
                  )}
                  onClick={() => handleHeadingClick(index)}
                >
                  {h.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );

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
            ref={scrollContainerRef}
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
                isAmpTheme && "md-theme-amp-outer",
                isFullScreen && !isAmpTheme && "max-w-4xl mx-auto"
              )}
            >
              <div
                ref={contentRef}
                className={clsx(
                  "prose max-w-none text-main text-sm leading-relaxed",
                  mdTheme === 'default' && "md-theme-default",
                  isAmpTheme && "md-theme-amp",
                  isFullScreen && !isAmpTheme && "text-base"
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
            </div>

            {/* Reply & Comments Area (Giscus) */}
            <div className={clsx("mt-12", isFullScreen && "max-w-4xl mx-auto")}>              
              <GiscusComments term={`post-${email.id}`} />
            </div>
          </div>

          {/* 右侧预览侧边栏 */}
          {showPreviewSidebar && (
            <>
              {/* 桌面端：右侧并排显示 */}
              <aside className="hidden md:flex w-80 border-l border-subtle bg-surface-soft flex-col shrink-0">
                {previewSidebarContent}
              </aside>

              {/* 移动端：覆盖在主内容上方 */}
              <div
                className="fixed inset-0 z-40 bg-black/40 flex justify-end md:hidden"
                onClick={() => setShowPreviewSidebar(false)}
              >
                <aside
                  className="h-full w-[calc(100%-3.5rem)] max-w-xs border-l border-subtle bg-surface-soft flex flex-col shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {previewSidebarContent}
                </aside>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

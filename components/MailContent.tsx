'use client';

import { useState, useEffect, useRef } from 'react';
import { Email } from '@/lib/data';
import { ArrowLeft, Printer, ExternalLink, Star, Reply, MoreVertical, Maximize2, Minimize2 } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import OverviewBar from '@/components/OverviewBar';

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

export default function MailContent({ email }: MailContentProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const overviewText = `Overview of this page. "${email.subject}" from ${email.sender} on ${email.date}. Labels: ${email.labels.join(', ')}.`;

  return (
    <main 
      className={clsx(
        "flex flex-col bg-white overflow-hidden transition-all duration-300",
        isFullScreen 
          ? "fixed inset-0 z-[100]" 
          : "flex-1 m-2 rounded-2xl shadow-sm min-w-0"
      )}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white shrink-0">
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
        
        <div className="flex items-center gap-2 text-gray-500">
           <button 
             className="icon-btn p-2 hover:bg-blue-50 hover:text-blue-600" 
             onClick={() => setIsFullScreen(!isFullScreen)}
             title={isFullScreen ? "Exit Full Screen" : "Full Screen View"}
           >
             {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
           </button>
           <span className="text-xs ml-2">1 of 161</span>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 bg-white">
        <OverviewBar description={overviewText} />

        {/* Subject Header */}
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-2xl font-normal text-gray-900">{email.subject}</h1>
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
                <span className="font-bold text-gray-900">{email.sender}</span>
                <span className="text-sm text-gray-500">&lt;{email.sender.toLowerCase().replace(/\s+/g, '.')}@example.com&gt;</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
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
            <div className="text-xs text-gray-500 mt-0.5">to me</div>
          </div>
        </div>

        {/* Email Body (Blog Content) */}
        <div className={clsx(
          "prose max-w-none text-gray-800 text-sm leading-relaxed",
          isFullScreen && "max-w-4xl mx-auto text-base"
        )}>
          {email.body ? (
            <SafeHtmlViewer content={email.body} isFullScreen={isFullScreen} />
          ) : (
            <div>
              <p>{email.snippet}</p>
              <p className="mt-4 text-gray-400 italic">[This is a placeholder for the full blog content. Add 'body' to data.ts to see more.]</p>
            </div>
          )}
        </div>
        
        {/* Reply Box Area */}
        <div className={clsx("mt-12 flex items-start gap-4", isFullScreen && "max-w-4xl mx-auto")}>
           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg shrink-0">
             J
           </div>
           <div className="flex-1 border border-gray-300 rounded-lg shadow-sm p-4 cursor-text text-gray-500 text-sm hover:shadow-md transition-shadow">
             Reply to {email.sender}...
           </div>
        </div>

      </div>
    </main>
  );
}

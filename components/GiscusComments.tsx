'use client';

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

interface GiscusCommentsProps {
  term: string;
}

// 提示：请在环境变量中配置实际的 Giscus 仓库信息：
// NEXT_PUBLIC_GISCUS_REPO, NEXT_PUBLIC_GISCUS_REPO_ID,
// NEXT_PUBLIC_GISCUS_CATEGORY, NEXT_PUBLIC_GISCUS_CATEGORY_ID
// 下面的默认值只是占位符，需根据你的 Giscus 配置页面填写。
const GISCUS_REPO = process.env.NEXT_PUBLIC_GISCUS_REPO ?? 'OWNER/REPO';
const GISCUS_REPO_ID = process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? 'REPO_ID';
const GISCUS_CATEGORY = process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? 'General';
const GISCUS_CATEGORY_ID = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? 'CATEGORY_ID';

const isConfigured =
  GISCUS_REPO !== 'OWNER/REPO' &&
  GISCUS_REPO_ID !== 'REPO_ID' &&
  GISCUS_CATEGORY_ID !== 'CATEGORY_ID';

export default function GiscusComments({ term }: GiscusCommentsProps) {
  const [giscusTheme, setGiscusTheme] = useState('light');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const applyTheme = () => {
      const siteTheme = document.body.dataset.theme;
      if (siteTheme === 'dark') {
        setGiscusTheme('transparent_dark');
      } else {
        // light 与 sepia 统一使用浅色主题
        setGiscusTheme('light');
      }
    };

    applyTheme();

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isConfigured) {
    // 本地占位模式：尚未配置 Giscus 仓库信息，仅渲染一个预览卡片用于调试样式
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-subtle bg-surface-soft p-4 text-xs text-muted">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-main text-sm">Giscus 评论区预览</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface text-muted border border-subtle">
            本地占位
          </span>
        </div>
        <p className="text-[11px] mb-3">
          当前尚未配置 Giscus 仓库信息（.env.local 中的 NEXT_PUBLIC_GISCUS_*）。
          此处仅渲染一个本地占位区域，方便你在不连接 GitHub 的情况下调试布局和主题样式。
        </p>
        <div className="space-y-3 text-[11px]">
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
              U
            </div>
            <div className="flex-1 rounded-xl bg-surface border border-subtle p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-main text-[11px]">demo-user</span>
                <span className="text-[10px] text-muted">刚刚</span>
              </div>
              <p className="text-[11px] text-main">
                这里是示例评论内容。你可以通过修改容器和文字的 Tailwind 类名来调整 Giscus 周围的主题样式。
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
              A
            </div>
            <div className="flex-1 rounded-xl bg-surface border border-subtle p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-main text-[11px]">another-user</span>
                <span className="text-[10px] text-muted">1 小时前</span>
              </div>
              <p className="text-[11px] text-main">
                Giscus 真正加载后，这里会被替换成 GitHub Discussions 的实际评论列表。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <Giscus
        repo={GISCUS_REPO as `${string}/${string}`}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="specific"
        term={term}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={giscusTheme}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}

'use client';

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

export default function GiscusComments({ term }: GiscusCommentsProps) {
  return (
    <div className="mt-6">
      <Giscus
        repo={GISCUS_REPO}
        repoId={GISCUS_REPO_ID}
        category={GISCUS_CATEGORY}
        categoryId={GISCUS_CATEGORY_ID}
        mapping="specific"
        term={term}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}

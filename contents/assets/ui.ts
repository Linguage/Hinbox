export interface AppShortcut {
  name: string;
  href: string;
  initial: string;
  bg: string; // Tailwind 背景色类名
}

export const appShortcuts: AppShortcut[] = [
  { name: '账号', href: 'https://accounts.google.com/', initial: 'A', bg: 'bg-amber-500' },
  { name: '搜索', href: 'https://www.google.com/', initial: 'G', bg: 'bg-blue-500' },
  { name: '地图', href: 'https://maps.google.com/', initial: 'M', bg: 'bg-green-500' },
  { name: 'Play', href: 'https://play.google.com/', initial: 'P', bg: 'bg-emerald-500' },
  { name: '云端硬盘', href: 'https://drive.google.com/', initial: 'D', bg: 'bg-sky-500' },
  { name: '日历', href: 'https://calendar.google.com/', initial: 'C', bg: 'bg-indigo-500' },
  { name: '翻译', href: 'https://translate.google.com/', initial: 'T', bg: 'bg-teal-500' },
  { name: '相册', href: 'https://photos.google.com/', initial: 'P', bg: 'bg-pink-500' },
  { name: 'YouTube', href: 'https://www.youtube.com/', initial: 'Y', bg: 'bg-red-500' },
];

export interface SiteLogoLetter {
  char: string;
  colorClass: string;
}

export const siteLogoLetters: SiteLogoLetter[] = [
  { char: 'J', colorClass: 'text-blue-500' },
  { char: 'm', colorClass: 'text-red-500' },
  { char: 'a', colorClass: 'text-yellow-500' },
  { char: 'i', colorClass: 'text-blue-500' },
  { char: 'l', colorClass: 'text-green-500' },
];

export const siteSearchPlaceholder = '站内搜索（标题、摘要、发件人、标签）';

export interface AboutSite {
  title: string;
  intro: string;
  tips: string[];
}

export const aboutSite: AboutSite = {
  title: '关于本站',
  intro: '这是一个以 Gmail 界面为灵感的博客与阅读空间，用“收件箱”的方式整理名人相关内容。',
  tips: [
    '左侧标签可以在不同人物、文件夹之间切换。',
    '点击中间列表中的条目可查看全文，上方按钮支持全屏预览。',
    '右上角九宫格按钮可作为快速入口，跳转到常用站点或工具。',
  ],
};

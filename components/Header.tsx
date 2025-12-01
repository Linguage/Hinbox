 'use client';

 import { Suspense, useState } from 'react';
 import { Menu, Search, SlidersHorizontal, CircleHelp, Settings, Grid } from 'lucide-react';
 import { usePathname, useRouter, useSearchParams } from 'next/navigation';
 import clsx from 'clsx';
 import { appShortcuts, siteLogoLetters, siteSearchPlaceholder, aboutSite } from '@/ui/assets/ui';

 interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenThemeSidebar?: () => void;
 }

 function HeaderContent({ onToggleSidebar, onOpenThemeSidebar }: HeaderProps) {
  const [showApps, setShowApps] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchText, setSearchText] = useState(() => searchParams.get('q') ?? '');
  const [showSearchOptions, setShowSearchOptions] = useState(false);

  const currentSearchMode: 'meta' | 'full' = searchParams.get('searchMode') === 'full' ? 'full' : 'meta';

  const updateSearchParams = (next: { q?: string; searchMode?: 'meta' | 'full' }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (next.q !== undefined) {
      const value = next.q.trim();
      if (value) {
        params.set('q', value);
      } else {
        params.delete('q');
      }
    }

    if (next.searchMode !== undefined) {
      if (next.searchMode === 'meta') {
        params.delete('searchMode');
      } else {
        params.set('searchMode', next.searchMode);
      }
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url);
  };

  const apps = appShortcuts;

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-surface border-b border-subtle sticky top-0 z-50 h-16">
      <div
        className={clsx(
          "items-center gap-4 w-auto md:w-64",
          isMobileSearchActive ? "hidden md:flex" : "flex"
        )}
      >
        <button className="icon-btn" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-semibold flex">
            {siteLogoLetters.map((item, index) => (
              <span
                key={index}
                className={clsx(
                  item.colorClass,
                  index === 0 ? 'inline-block' : 'hidden md:inline-block'
                )}
              >
                {item.char}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={clsx("flex-1 mx-4", isMobileSearchActive ? "max-w-none" : "max-w-2xl")}>
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder={siteSearchPlaceholder}
            className="w-full py-3 pl-12 pr-10 bg-gray-100 rounded-lg focus:bg-white focus:shadow-md outline-none transition-all placeholder:text-gray-600 text-gray-800"
            value={searchText}
            onChange={(e) => {
              const value = e.target.value;
              setSearchText(value);
              updateSearchParams({ q: value });
            }}
            onFocus={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                setIsMobileSearchActive(true);
              }
            }}
            onBlur={() => {
              if (typeof window !== "undefined" && window.innerWidth < 768) {
                setIsMobileSearchActive(false);
              }
            }}
          />
          <div className="absolute right-3 flex items-center">
            <button
              type="button"
              className="icon-btn p-1"
              onClick={() => setShowSearchOptions((open) => !open)}
            >
              <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            </button>
            {showSearchOptions && (
              <div className="absolute right-0 top-9 mt-1 w-64 rounded-2xl bg-surface border border-subtle shadow-2xl p-3 text-xs text-main z-50">
                <div className="font-medium mb-2">搜索模式</div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      updateSearchParams({ searchMode: 'meta' });
                      setShowSearchOptions(false);
                    }}
                    className={clsx(
                      'w-full flex items-start gap-2 rounded-lg px-2 py-1.5 text-left',
                      currentSearchMode === 'meta' ? 'bg-accent-soft' : 'hover-surface-soft'
                    )}
                  >
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full border border-subtle bg-surface" />
                    <div>
                      <div className="text-xs font-medium">关键内容（frontmatter）</div>
                      <div className="text-[11px] text-muted">按标题、摘要、发件人、标签搜索</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateSearchParams({ searchMode: 'full' });
                      setShowSearchOptions(false);
                    }}
                    className={clsx(
                      'w-full flex items-start gap-2 rounded-lg px-2 py-1.5 text-left',
                      currentSearchMode === 'full' ? 'bg-accent-soft' : 'hover-surface-soft'
                    )}
                  >
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full border border-subtle bg-surface" />
                    <div>
                      <div className="text-xs font-medium">全文搜索（可能较慢）</div>
                      <div className="text-[11px] text-muted">在关键内容的基础上，同时搜索正文内容</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "items-center gap-2 w-auto md:w-64 justify-end",
          isMobileSearchActive ? "hidden md:flex" : "flex"
        )}
      >
        <div className="relative hidden md:block">
          <button
            className="icon-btn"
            onClick={() => setShowAbout((open) => !open)}
          >
            <CircleHelp className="w-6 h-6" />
          </button>

          {showAbout && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-surface shadow-2xl border border-subtle p-4 text-sm text-main">
              <div className="font-semibold text-main mb-1">{aboutSite.title}</div>
              <p className="mb-2">
                {aboutSite.intro}
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-muted">
                {aboutSite.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className="icon-btn hidden md:inline-flex"
          onClick={onOpenThemeSidebar}
          title="主题设置"
        >
          <Settings className="w-6 h-6" />
        </button>
        <div className="relative">
          <button
            className="icon-btn"
            onClick={() => setShowApps((open) => !open)}
          >
            <Grid className="w-6 h-6" />
          </button>

          {showApps && (
            <div className="absolute right-0 mt-3 w-80 max-h-[480px] overflow-y-auto rounded-2xl bg-surface shadow-2xl border border-subtle p-4">
              <div className="grid grid-cols-3 gap-4">
                {apps.map((app) => (
                  <a
                    key={app.name}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-xl p-2 hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white ${app.bg}`}
                    >
                      {app.initial}
                    </div>
                    <span className="text-xs text-main text-center truncate w-16">
                      {app.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ml-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg cursor-pointer">
          J
        </div>
      </div>
    </header>
  );
 }

 export default function Header(props: HeaderProps) {
  return (
    <Suspense
      fallback={
        <header className="flex items-center justify-between px-4 py-2 bg-surface border-b border-subtle sticky top-0 z-50 h-16">
          <div className="flex items-center gap-4 w-auto md:w-64">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="w-24 h-6 rounded bg-gray-200" />
          </div>
          <div className="flex-1 mx-4 max-w-2xl">
            <div className="w-full h-10 rounded-lg bg-gray-200" />
          </div>
          <div className="items-center gap-2 w-auto md:w-64 justify-end hidden md:flex">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="w-8 h-8 rounded-full bg-gray-200" />
          </div>
        </header>
      }
    >
      <HeaderContent {...props} />
    </Suspense>
  );
 }

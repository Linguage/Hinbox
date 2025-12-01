 'use client';

 import { useState, useEffect, ReactNode } from 'react';
 import Header from '@/components/Header';
 import Sidebar from '@/components/Sidebar';
 import ThemeSidebar from '@/components/ThemeSidebar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [showThemeSidebar, setShowThemeSidebar] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <Header
        onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
        onOpenThemeSidebar={() => setShowThemeSidebar((prev) => !prev)}
      />
      <div className="flex flex-1 overflow-hidden pt-2">
        <Sidebar collapsed={sidebarCollapsed} />
        {children}
      </div>

      <ThemeSidebar
        open={showThemeSidebar}
        theme={theme}
        onClose={() => setShowThemeSidebar(false)}
        onChangeTheme={(next) => setTheme(next)}
      />
    </div>
  );
}

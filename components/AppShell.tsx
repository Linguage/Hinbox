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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarCollapsed(mobile ? true : false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <Header
        onToggleSidebar={toggleSidebar}
        onOpenThemeSidebar={() => setShowThemeSidebar((prev) => !prev)}
      />
      <div className="flex flex-1 overflow-hidden pt-2">
        {isMobile && !sidebarCollapsed && (
          <div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
        {(!isMobile || !sidebarCollapsed) && (
          <Sidebar
            collapsed={isMobile ? false : sidebarCollapsed}
            onOpenThemeSidebar={() => setShowThemeSidebar((prev) => !prev)}
            onToggleSidebar={toggleSidebar}
          />
        )}
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

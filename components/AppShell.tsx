'use client';

import { useState, ReactNode } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)} />
      <div className="flex flex-1 overflow-hidden pt-2">
        <Sidebar collapsed={sidebarCollapsed} />
        {children}
      </div>
    </div>
  );
}

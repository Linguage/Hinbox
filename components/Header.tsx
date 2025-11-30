'use client';

import { Menu, Search, SlidersHorizontal, CircleHelp, Settings, Grid } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 sticky top-0 z-50 h-16">
      <div className="flex items-center gap-4 w-64">
        <button className="icon-btn" onClick={onToggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-semibold flex">
            <span className="text-blue-500">J</span>
            <span className="text-red-500">m</span>
            <span className="text-yellow-500">a</span>
            <span className="text-blue-500">i</span>
            <span className="text-green-500">l</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search mail"
            className="w-full py-3 pl-12 pr-10 bg-gray-100 rounded-lg focus:bg-white focus:shadow-md outline-none transition-all placeholder:text-gray-600 text-gray-800"
          />
          <button className="absolute right-3 icon-btn p-1">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 w-64 justify-end">
        <button className="icon-btn">
          <CircleHelp className="w-6 h-6" />
        </button>
        <button className="icon-btn">
          <Settings className="w-6 h-6" />
        </button>
        <button className="icon-btn">
          <Grid className="w-6 h-6" />
        </button>
        <div className="ml-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg cursor-pointer">
          J
        </div>
      </div>
    </header>
  );
}

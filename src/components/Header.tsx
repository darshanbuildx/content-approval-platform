import React, { useState } from 'react';
import { Search, Filter, Bell, LogOut, Sparkles, Moon, Sun, Menu } from 'lucide-react';
import { Platform } from '../types';
import { NotificationPanel } from './NotificationPanel';
import { FilterPanel } from './FilterPanel';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onSignOut: () => void;
  onFilterChange: (platform: Platform | null) => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onSignOut, 
  onFilterChange, 
  onToggleSidebar,
  isSidebarOpen 
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-[100] bg-gradient-to-r from-blue-900 to-indigo-900 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg text-gray-300 hover:text-white transition-colors hover:bg-gray-800"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col -space-y-1">
                  <h1 className="text-lg sm:text-xl font-bold text-white">
                    Hamza's Content Flow
                  </h1>
                  <span className="text-xs text-blue-200">by Scale360X</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="block w-48 sm:w-64 pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-300 hover:text-white transition-colors hover:bg-gray-800"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Moon className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </button>

              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2 rounded-lg text-gray-300 hover:text-white transition-colors ${
                  isFilterOpen ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
                }`}
              >
                <Filter className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2 rounded-lg text-gray-300 hover:text-white transition-colors ${
                  isNotificationsOpen ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'
                }`}
              >
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <img
                  className="h-8 w-8 rounded-lg object-cover ring-2 ring-blue-500"
                  src="https://i.postimg.cc/htgmDFkK/c7ee1aca55d54077a481c582c94f61cf13730bf99d914867ad3a829fefaa765f-sm.jpg"
                  alt="Hamza"
                />
                <span className="hidden sm:block text-sm font-medium text-white">Hamza</span>
                <button
                  onClick={onSignOut}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown panels with proper z-index */}
      <div className="absolute right-0 z-[110]">
        {isFilterOpen && (
          <div className="mt-2 mr-4">
            <FilterPanel onClose={() => setIsFilterOpen(false)} onFilterChange={onFilterChange} />
          </div>
        )}

        {isNotificationsOpen && (
          <div className="mt-2 mr-4">
            <NotificationPanel onClose={() => setIsNotificationsOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
};

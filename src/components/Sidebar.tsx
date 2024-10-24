import React from 'react';
import { LayoutDashboard, Kanban, ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  onViewChange,
  isOpen,
  onToggle
}) => {
  return (
    <div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 flex flex-col transition-all duration-300 z-40 ${
        isOpen ? 'w-48' : 'w-16'
      }`}
    >
      <div className="flex flex-col w-full py-4">
        <button
          onClick={() => onViewChange('list')}
          className={`flex items-center justify-${isOpen ? 'start' : 'center'} px-4 py-3 mx-2 rounded-lg transition-colors ${
            currentView === 'list'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Dashboard View"
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="ml-3 text-sm">Dashboard</span>}
        </button>

        <button
          onClick={() => onViewChange('kanban')}
          className={`flex items-center justify-${isOpen ? 'start' : 'center'} px-4 py-3 mx-2 mt-2 rounded-lg transition-colors ${
            currentView === 'kanban'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          title="Kanban Board"
        >
          <Kanban className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="ml-3 text-sm">Kanban Board</span>}
        </button>
      </div>

      <button
        onClick={onToggle}
        className="absolute -right-3 top-8 transform bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md dark:shadow-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
};

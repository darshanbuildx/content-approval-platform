import React from 'react';
import { Platform } from '../types';
import { X, Filter as FilterIcon } from 'lucide-react';

interface FilterPanelProps {
  onClose: () => void;
  onFilterChange: (platform: Platform | null) => void;
}

const platforms: Platform[] = ['Twitter', 'Instagram', 'LinkedIn', 'Reddit', 'Skool'];

export const FilterPanel: React.FC<FilterPanelProps> = ({ onClose, onFilterChange }) => {
  const [selectedPlatform, setSelectedPlatform] = React.useState<Platform | null>(null);

  const handlePlatformSelect = (platform: Platform | null) => {
    setSelectedPlatform(platform);
    onFilterChange(platform);
    onClose();
  };

  return (
    <div className="w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <FilterIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filter Content</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          <button
            onClick={() => handlePlatformSelect(null)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedPlatform === null
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            All Platforms
          </button>
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => handlePlatformSelect(platform)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedPlatform === platform
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

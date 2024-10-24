import React from 'react';
import { Platform, Status, FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
}) => {
  const platforms: Platform[] = ['Twitter', 'Instagram', 'LinkedIn', 'Reddit', 'Skool'];
  const statuses: Status[] = ['Draft', 'In Review', 'Changes Requested', 'Approved', 'Published'];

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900 rounded-lg p-4 mb-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Platform</label>
        <select
          value={filters.platform || ''}
          onChange={(e) => onFilterChange({ ...filters, platform: (e.target.value || undefined) as Platform })}
          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">All Platforms</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
        <select
          value={filters.status || ''}
          onChange={(e) => onFilterChange({ ...filters, status: (e.target.value || undefined) as Status })}
          className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

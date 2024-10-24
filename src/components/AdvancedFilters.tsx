import React, { useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { Filter, X, Calendar, AlertCircle } from 'lucide-react';
import { Platform, Status } from '../types';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';

interface FilterOptions {
  platform?: Platform;
  status?: Status;
  dateRange?: {
    start: Date;
    end: Date;
  };
  topic?: string;
  searchQuery?: string;
}

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localFilters, setLocalFilters] = React.useState(filters);
  const [dateError, setDateError] = React.useState('');
  const filterRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDateError('');
  }, [localFilters.dateRange]);

  const validateDateRange = (start?: Date, end?: Date): boolean => {
    if (!start || !end) return true;
    const startDate = startOfDay(start);
    const endDate = startOfDay(end);
    return !isAfter(startDate, endDate);
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const date = value ? new Date(value) : undefined;
    let newDateRange;

    if (type === 'start') {
      newDateRange = {
        start: date!,
        end: localFilters.dateRange?.end || date!
      };
    } else {
      newDateRange = {
        start: localFilters.dateRange?.start || date!,
        end: date!
      };
    }

    if (!validateDateRange(newDateRange.start, newDateRange.end)) {
      setDateError('End date cannot be before start date');
      return;
    }

    setDateError('');
    setLocalFilters({
      ...localFilters,
      dateRange: newDateRange
    });
  };

  const handleApplyFilters = () => {
    if (dateError) return;
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = {};
    setLocalFilters(emptyFilters);
    setDateError('');
    onFilterChange(emptyFilters);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors"
      >
        <Filter className="h-4 w-4 mr-2" />
        Advanced Filters
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          
          <div className="flex min-h-full items-center justify-center p-4" onClick={e => e.stopPropagation()}>
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Advanced Filters</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
                  <input
                    type="text"
                    value={localFilters.topic || ''}
                    onChange={(e) => setLocalFilters({ ...localFilters, topic: e.target.value })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors"
                    placeholder="Filter by topic..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type="date"
                        value={localFilters.dateRange?.start ? format(localFilters.dateRange.start, 'yyyy-MM-dd') : ''}
                        onChange={(e) => handleDateChange('start', e.target.value)}
                        max={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors"
                      />
                    </div>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type="date"
                        value={localFilters.dateRange?.end ? format(localFilters.dateRange.end, 'yyyy-MM-dd') : ''}
                        onChange={(e) => handleDateChange('end', e.target.value)}
                        max={format(new Date(), 'yyyy-MM-dd')}
                        className="w-full pl-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm transition-colors"
                      />
                    </div>
                  </div>
                  {dateError && (
                    <div className="mt-2 flex items-center text-sm text-red-500 dark:text-red-400">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {dateError}
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    disabled={!!dateError}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(filters.topic || filters.dateRange) && (
        <div className="mt-2 flex flex-wrap gap-2">
          {filters.topic && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
              Topic: {filters.topic}
              <button
                onClick={() => onFilterChange({ ...filters, topic: undefined })}
                className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          {filters.dateRange && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
              Date: {format(filters.dateRange.start, 'MMM d')} - {format(filters.dateRange.end, 'MMM d')}
              <button
                onClick={() => onFilterChange({ ...filters, dateRange: undefined })}
                className="ml-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

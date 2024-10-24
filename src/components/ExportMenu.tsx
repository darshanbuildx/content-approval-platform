import React from 'react';
import { Menu } from '@headlessui/react';
import { Download, Table, FileText } from 'lucide-react';
import { ContentItem } from '../types';
import { exportToExcel } from '../utils/excelExport';
import { exportToPDF } from '../utils/pdfExport';

interface ExportMenuProps {
  items: ContentItem[];
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ items }) => {
  const handleExportToExcel = () => {
    exportToExcel(items);
  };

  const handleExportToPDF = () => {
    exportToPDF(items);
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-[70]">
      <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700">
        <div className="py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleExportToExcel}
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition-colors`}
              >
                <Table className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                Export to Excel
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleExportToPDF}
                className={`${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 transition-colors`}
              >
                <FileText className="h-4 w-4 mr-2 text-red-600 dark:text-red-400" />
                Export to PDF
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

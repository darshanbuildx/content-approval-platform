import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PlatformPreview } from './PlatformPreview';
import { ContentItem } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  item?: ContentItem;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, item }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/90 backdrop-blur-sm transition-opacity z-[99998]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[99999] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div 
            className="relative transform rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
              {item && (
                <div className="mb-6">
                  <PlatformPreview
                    platform={item.platform}
                    content={item.content}
                    author="Hamza"
                  />
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

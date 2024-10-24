import React, { useState } from 'react';
import { ContentItem } from '../types';
import { ContentList } from './ContentList';
import { Analytics } from './Analytics';
import { Modal } from './Modal';
import { ChevronDown, ChevronUp, BarChart2, Calendar, Clock, AlertCircle } from 'lucide-react';

interface DashboardProps {
  items: ContentItem[];
  onApprove: (id: string) => void;
  onRequestChanges: (id: string, feedback: string) => void;
  onUpdateStatus: (id: string, status: ContentItem['status']) => void;
  selectedItem: ContentItem | null;
  isViewModalOpen: boolean;
  onCloseModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  items,
  onApprove,
  onRequestChanges,
  onUpdateStatus,
  selectedItem,
  isViewModalOpen,
  onCloseModal,
}) => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Filter items by status
  const needsAttentionItems = items.filter(
    item => item.status === 'Draft' || item.status === 'Changes Requested'
  );

  const inReviewItems = items.filter(
    item => item.status === 'In Review'
  );

  const approvedItems = items.filter(
    item => item.status === 'Approved' || item.status === 'Published'
  );

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-4 flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Needs Attention</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{needsAttentionItems.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-4 flex items-center space-x-4">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
            <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">In Review</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{inReviewItems.length}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-4 flex items-center space-x-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{approvedItems.length}</p>
          </div>
        </div>
      </div>

      {/* Analytics Toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-4">
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="w-full flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5" />
            <span className="font-medium">Analytics Overview</span>
          </div>
          {showAnalytics ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        
        {showAnalytics && (
          <div className="mt-4">
            <Analytics items={items} />
          </div>
        )}
      </div>

      {/* Needs Attention Section */}
      {needsAttentionItems.length > 0 && (
        <section data-status="Changes Requested">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
            Needs Your Attention ({needsAttentionItems.length})
          </h2>
          <ContentList
            items={needsAttentionItems}
            onApprove={onApprove}
            onRequestChanges={onRequestChanges}
            onUpdateStatus={onUpdateStatus}
          />
        </section>
      )}

      {/* In Review Section */}
      {inReviewItems.length > 0 && (
        <section data-status="In Review">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400 mr-2" />
            In Review ({inReviewItems.length})
          </h2>
          <ContentList
            items={inReviewItems}
            onApprove={onApprove}
            onRequestChanges={onRequestChanges}
            onUpdateStatus={onUpdateStatus}
          />
        </section>
      )}

      {/* Approved Section */}
      {approvedItems.length > 0 && (
        <section data-status="Approved">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Calendar className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
            Approved ({approvedItems.length})
          </h2>
          <ContentList
            items={approvedItems}
            onApprove={onApprove}
            onRequestChanges={onRequestChanges}
            onUpdateStatus={onUpdateStatus}
          />
        </section>
      )}

      {/* Modal */}
      {selectedItem && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={onCloseModal}
          title={`${selectedItem.platform} Content - ${selectedItem.id}`}
          item={selectedItem}
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {selectedItem.content}
                </p>
              </div>

              {selectedItem.lastFeedback && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300">Latest Feedback:</h4>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 text-sm text-gray-700 dark:text-gray-300">
                    {selectedItem.lastFeedback}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => onRequestChanges(selectedItem.id, '')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => onApprove(selectedItem.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

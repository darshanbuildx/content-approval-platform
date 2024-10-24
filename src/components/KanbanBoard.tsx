import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column, ContentItem, Status } from '../types';
import { KanbanColumn } from './KanbanColumn';
import { ContentCard } from './ContentCard';
import { Modal } from './Modal';

interface KanbanBoardProps {
  items: ContentItem[];
  onUpdateStatus: (itemId: string, newStatus: Status) => void;
  onApprove: (id: string) => void;
  onRequestChanges: (id: string, feedback: string) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  items,
  onUpdateStatus,
  onApprove,
  onRequestChanges,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns: Column[] = [
    { id: 'Draft', title: '📝 Draft', items: [] },
    { id: 'In Review', title: '👀 In Review', items: [] },
    { id: 'Changes Requested', title: '✏️ Changes Requested', items: [] },
    { id: 'Approved', title: '✅ Approved', items: [] },
    { id: 'Published', title: '🚀 Published', items: [] },
  ];

  // Distribute items into columns
  items.forEach(item => {
    const column = columns.find(col => col.id === item.status);
    if (column) {
      column.items.push(item);
    }
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedItem = items.find(item => item.id === active.id);
    setActiveId(active.id as string);
    setActiveItem(draggedItem || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const newStatus = over.id as Status;
      onUpdateStatus(active.id as string, newStatus);
    }
    
    setActiveId(null);
    setActiveItem(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  const handleViewItem = (item: ContentItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleRequestChanges = () => {
    if (feedback.trim() && selectedItem) {
      onRequestChanges(selectedItem.id, feedback);
      setFeedback('');
      setIsChangeModalOpen(false);
      setSelectedItem(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 px-4 min-h-[calc(100vh-12rem)]">
        {columns.map(column => (
          <KanbanColumn
            key={column.id}
            column={column}
            onViewItem={handleViewItem}
          />
        ))}
      </div>

      <DragOverlay>
        {activeItem ? (
          <div className="transform rotate-3 w-80">
            <ContentCard
              item={activeItem}
              onApprove={onApprove}
              onRequestChanges={onRequestChanges}
              showButtons={false}
              disableModal={true}
              className="opacity-90 shadow-2xl"
            />
          </div>
        ) : null}
      </DragOverlay>

      {/* Modals */}
      {selectedItem && (
        <>
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => {
              setIsViewModalOpen(false);
              setSelectedItem(null);
            }}
            title={`${selectedItem.platform} Content - ${selectedItem.id}`}
            item={selectedItem}
          >
            <div className="space-y-6">
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsViewModalOpen(false);
                    setIsChangeModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Request Changes
                </button>
                <button
                  onClick={() => {
                    onApprove(selectedItem.id);
                    setIsViewModalOpen(false);
                    setSelectedItem(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={isChangeModalOpen}
            onClose={() => {
              setIsChangeModalOpen(false);
              setSelectedItem(null);
            }}
            title="Request Changes"
            item={selectedItem}
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  className="block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe the changes needed..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsChangeModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestChanges}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg"
                  disabled={!feedback.trim()}
                >
                  Submit Changes
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </DndContext>
  );
};

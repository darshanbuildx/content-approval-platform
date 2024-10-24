import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column, ContentItem } from '../types';
import { ContentCard } from './ContentCard';

interface KanbanColumnProps {
  column: Column;
  onViewItem: (item: ContentItem) => void;
}

interface SortableItemProps {
  item: ContentItem;
  onViewItem: (item: ContentItem) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ item, onViewItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-manipulation transition-shadow hover:shadow-lg ${
        isDragging ? 'z-50' : ''
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onViewItem(item);
      }}
    >
      <ContentCard
        item={item}
        onApprove={() => {}}
        onRequestChanges={() => {}}
        showButtons={false}
        disableModal={true}
      />
    </div>
  );
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onViewItem,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-80 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border-2 transition-all duration-200 ${
        isOver 
          ? 'border-blue-500 dark:border-blue-400 shadow-lg scale-[1.02]' 
          : 'border-gray-200/50 dark:border-gray-700/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{column.title}</h3>
        <span className="px-3 py-1 bg-gray-200/50 dark:bg-gray-700/50 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 backdrop-blur-sm">
          {column.items.length}
        </span>
      </div>
      
      <div className="space-y-4 min-h-[100px] max-h-[calc(100vh-16rem)] overflow-y-auto">
        {column.items.map((item: ContentItem) => (
          <SortableItem key={item.id} item={item} onViewItem={onViewItem} />
        ))}

        {column.items.length === 0 && isOver && (
          <div className="h-24 border-2 border-blue-500 dark:border-blue-400 border-dashed rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
            <p className="text-sm text-blue-600 dark:text-blue-400">Drop here</p>
          </div>
        )}

        {column.items.length === 0 && !isOver && (
          <div className="h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">No items</p>
          </div>
        )}
      </div>
    </div>
  );
};

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
  defaultDropAnimationSideEffects,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Column, ContentItem, Status } from '../types';
import { KanbanColumn } from './KanbanColumn';
import { ContentCard } from './ContentCard';
import { Modal } from './Modal';
import { PencilLine, CheckCircle } from 'lucide-react';

interface KanbanBoardProps {
  items: ContentItem[];
  onUpdateStatus: (itemId: string, newStatus: Status) => void;
  onApprove: (id: string) => void;
  onRequestChanges: (id: string, feedback: string) => void;
}

const dropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  items,
  onUpdateStatus,
  onApprove,
  onRequestChanges,
}) => {
  // ... rest of the imports and initial setup remain the same ...

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
        tolerance: 5,
        delay: 0,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const draggedItem = items.find(item => item.id === active.id);
    if (draggedItem) {
      setActiveId(active.id as string);
      setActiveItem(draggedItem);
      setCurrentStatus(draggedItem.status);
      document.body.style.cursor = 'grabbing';
      // Add overflow hidden to prevent page scroll during drag
      document.body.style.overflow = 'hidden';
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const newStatus = over.id as Status;
      onUpdateStatus(active.id as string, newStatus);
    }
    
    setActiveId(null);
    setActiveItem(null);
    setCurrentStatus(null);
    document.body.style.cursor = '';
    // Restore page scroll
    document.body.style.overflow = '';
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
    setCurrentStatus(null);
    document.body.style.cursor = '';
    document.body.style.overflow = '';
  };

  retu

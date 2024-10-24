import React from 'react';
import { ContentItem } from '../types';
import { ContentCard } from './ContentCard';

interface ContentListProps {
  items: ContentItem[];
  onApprove: (id: string) => void;
  onRequestChanges: (id: string, feedback: string) => void;
  onUpdateStatus: (id: string, status: ContentItem['status']) => void;
}

export const ContentList: React.FC<ContentListProps> = ({
  items,
  onApprove,
  onRequestChanges,
  onUpdateStatus,
}) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <ContentCard
          key={item.id}
          item={item}
          onApprove={onApprove}
          onRequestChanges={onRequestChanges}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
};

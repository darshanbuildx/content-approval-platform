import React from 'react';
import { Status } from '../types';

interface StatusBadgeProps {
  status: Status;
}

const statusStyles = {
  'Draft': 'bg-gray-100 text-gray-800',
  'In Review': 'bg-yellow-100 text-yellow-800',
  'Changes Requested': 'bg-red-100 text-red-800',
  'Approved': 'bg-green-100 text-green-800',
  'Published': 'bg-purple-100 text-purple-800'
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

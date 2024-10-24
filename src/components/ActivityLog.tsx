import React from 'react';
import { ActivityLog as ActivityLogType } from '../types';
import { format } from 'date-fns';
import { Clock, User, FileText } from 'lucide-react';

interface ActivityLogProps {
  activities: ActivityLogType[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                    {activity.action === 'created' && <FileText className="h-5 w-5 text-white" />}
                    {activity.action === 'updated' && <Clock className="h-5 w-5 text-white" />}
                    {(activity.action === 'approved' || activity.action === 'changes_requested') && (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {activity.action === 'created' && 'Created content'}
                      {activity.action === 'updated' && 'Updated content'}
                      {activity.action === 'approved' && 'Approved content'}
                      {activity.action === 'changes_requested' && 'Requested changes'}
                      {activity.action === 'published' && 'Published content'}
                      <span className="font-medium text-gray-900"> by {activity.user}</span>
                    </p>
                    {activity.details && (
                      <p className="mt-1 text-sm text-gray-600">{activity.details}</p>
                    )}
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={activity.timestamp.toISOString()}>
                      {format(activity.timestamp, 'MMM d, h:mm a')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

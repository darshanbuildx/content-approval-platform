import React from 'react';
import { X, CheckCircle, AlertCircle, Clock, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ContentItem } from '../types';

interface Notification {
  id: string;
  type: 'approval' | 'changes' | 'reminder' | 'comment';
  message: string;
  timestamp: Date;
  read: boolean;
  contentId?: string;
}

interface NotificationPanelProps {
  onClose: () => void;
  onNotificationClick?: (contentId: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  onClose,
  onNotificationClick 
}) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      type: 'approval',
      message: 'Content #1X1 has been approved by Hamza',
      timestamp: new Date(),
      read: false,
      contentId: '1X1'
    },
    {
      id: '2',
      type: 'changes',
      message: 'Changes requested for content #1R1: "Add more specific examples"',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      contentId: '1R1'
    },
    {
      id: '3',
      type: 'reminder',
      message: 'Content #1S1 is pending review for 24 hours',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      contentId: '1S1'
    },
    {
      id: '4',
      type: 'comment',
      message: 'New comment on content #1L1: "Great insights!"',
      timestamp: new Date(Date.now() - 10800000),
      read: true,
      contentId: '1L1'
    }
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'changes':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.contentId && onNotificationClick) {
      // Mark as read
      setNotifications(prev => 
        prev.map(n => 
          n.id === notification.id ? { ...n, read: true } : n
        )
      );
      onNotificationClick(notification.contentId);
      onClose();
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {notifications.filter(n => !n.read).length} unread
          </span>
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full flex items-start space-x-3 p-3 rounded-lg transition-colors text-left ${
                notification.read 
                  ? 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700' 
                  : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
              }`}
            >
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${
                  notification.read 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-900 dark:text-white font-medium'
                }`}>
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format(notification.timestamp, 'MMM d, h:mm a')}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

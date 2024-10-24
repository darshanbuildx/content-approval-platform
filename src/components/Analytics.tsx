import React from 'react';
import { ContentItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface AnalyticsProps {
  items: ContentItem[];
}

export const Analytics: React.FC<AnalyticsProps> = ({ items }) => {
  // Calculate approval metrics
  const totalItems = items.length;
  const approvedItems = items.filter(item => item.status === 'Approved').length;
  const pendingItems = items.filter(item => item.status === 'In Review').length;
  const changesRequested = items.filter(item => item.status === 'Changes Requested').length;
  const draftItems = items.filter(item => item.status === 'Draft').length;

  const approvalRate = totalItems > 0 ? (approvedItems / totalItems) * 100 : 0;
  
  // Calculate platform distribution
  const platformData = items.reduce((acc: Record<string, number>, item) => {
    acc[item.platform] = (acc[item.platform] || 0) + 1;
    return acc;
  }, {});

  // Calculate daily activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return format(date, 'MMM d');
  }).reverse();

  const dailyActivity = last7Days.map(date => {
    const count = items.filter(item => 
      format(new Date(item.createdAt), 'MMM d') === date
    ).length;
    return { date, count };
  });

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4 backdrop-blur-sm border border-blue-100/50 dark:border-blue-800/50">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Approval Rate</h3>
          <p className="mt-2 text-2xl font-semibold text-blue-900 dark:text-blue-100">
            {approvalRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-green-50/50 dark:bg-green-900/20 rounded-xl p-4 backdrop-blur-sm border border-green-100/50 dark:border-green-800/50">
          <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Approved Content</h3>
          <p className="mt-2 text-2xl font-semibold text-green-900 dark:text-green-100">
            {approvedItems}
          </p>
        </div>

        <div className="bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl p-4 backdrop-blur-sm border border-yellow-100/50 dark:border-yellow-800/50">
          <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Pending Review</h3>
          <p className="mt-2 text-2xl font-semibold text-yellow-900 dark:text-yellow-100">
            {pendingItems}
          </p>
        </div>

        <div className="bg-red-50/50 dark:bg-red-900/20 rounded-xl p-4 backdrop-blur-sm border border-red-100/50 dark:border-red-800/50">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Changes Requested</h3>
          <p className="mt-2 text-2xl font-semibold text-red-900 dark:text-red-100">
            {changesRequested}
          </p>
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Daily Activity</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Distribution */}
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Content Distribution by Platform</h3>
        <div className="space-y-3">
          {Object.entries(platformData).map(([platform, count]) => (
            <div key={platform} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">{platform}</span>
                <span className="text-gray-600 dark:text-gray-400">{count}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(count / totalItems) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-6 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-4">Content Status Overview</h3>
        <div className="relative pt-1">
          <div className="flex h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="bg-green-500 dark:bg-green-600 transition-all duration-300"
              style={{ width: `${(approvedItems / totalItems) * 100}%` }}
              title={`Approved: ${approvedItems}`}
            />
            <div
              className="bg-yellow-500 dark:bg-yellow-600 transition-all duration-300"
              style={{ width: `${(pendingItems / totalItems) * 100}%` }}
              title={`In Review: ${pendingItems}`}
            />
            <div
              className="bg-red-500 dark:bg-red-600 transition-all duration-300"
              style={{ width: `${(changesRequested / totalItems) * 100}%` }}
              title={`Changes Requested: ${changesRequested}`}
            />
            <div
              className="bg-gray-400 dark:bg-gray-500 transition-all duration-300"
              style={{ width: `${(draftItems / totalItems) * 100}%` }}
              title={`Draft: ${draftItems}`}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>{`${((approvedItems / totalItems) * 100).toFixed(1)}% Approved`}</span>
            <span>{`${((pendingItems / totalItems) * 100).toFixed(1)}% In Review`}</span>
            <span>{`${((changesRequested / totalItems) * 100).toFixed(1)}% Changes`}</span>
            <span>{`${((draftItems / totalItems) * 100).toFixed(1)}% Draft`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { MessageCircle, Share2, Bookmark, ArrowUp, ArrowDown } from 'lucide-react';

interface RedditPreviewProps {
  content: string;
  author: string;
}

export const RedditPreview: React.FC<RedditPreviewProps> = ({ content, author }) => (
  <div className="bg-white dark:bg-[#1A1A1B] rounded-xl border border-gray-200 dark:border-gray-800 max-w-[700px] font-[IBM Plex Sans,sans-serif]">
    <div className="p-4">
      <div className="flex-1">
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <span className="text-[#1A1A1B] dark:text-[#D7DADC]">r/AIautomation</span>
          <span className="mx-1">•</span>
          <span>Posted by u/{author}</span>
          <span className="mx-1">•</span>
          <span>4 hours ago</span>
        </div>
        <h3 className="text-xl font-medium text-[#222222] dark:text-[#D7DADC] mb-3">
          {content.split('\n')[0]}
        </h3>
        <div className="text-[#1A1A1B] dark:text-[#D7DADC] whitespace-pre-wrap text-sm">
          {content.split('\n').slice(1).join('\n')}
        </div>
        <div className="mt-4 flex items-center space-x-4 text-[#878A8C] dark:text-[#818384] text-sm">
          <div className="flex items-center space-x-1">
            <button className="hover:bg-[#F6F7F8] dark:hover:bg-[#29292B] p-2 rounded">
              <ArrowUp className="h-6 w-6" />
            </button>
            <span className="font-bold text-[#1A1A1B] dark:text-[#D7DADC]">42</span>
            <button className="hover:bg-[#F6F7F8] dark:hover:bg-[#29292B] p-2 rounded">
              <ArrowDown className="h-6 w-6" />
            </button>
          </div>
          <button className="flex items-center space-x-2 hover:bg-[#F6F7F8] dark:hover:bg-[#29292B] p-2 rounded">
            <MessageCircle className="h-5 w-5" />
            <span>128 Comments</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-[#F6F7F8] dark:hover:bg-[#29292B] p-2 rounded">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center space-x-2 hover:bg-[#F6F7F8] dark:hover:bg-[#29292B] p-2 rounded">
            <Bookmark className="h-5 w-5" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

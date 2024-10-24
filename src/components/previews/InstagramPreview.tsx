import React from 'react';
import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';

interface InstagramPreviewProps {
  content: string;
  author: string;
}

export const InstagramPreview: React.FC<InstagramPreviewProps> = ({ content, author }) => (
  <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 max-w-[470px] font-['-apple-system',BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif]">
    <div className="flex items-center p-3">
      <img
        src="https://i.postimg.cc/htgmDFkK/c7ee1aca55d54077a481c582c94f61cf13730bf99d914867ad3a829fefaa765f-sm.jpg"
        alt={author}
        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
      />
      <div className="ml-3 flex-1">
        <span className="font-semibold text-[14px] text-gray-900 dark:text-white">{author}</span>
      </div>
      <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
        <svg aria-label="More options" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="6" cy="12" r="1.5" />
          <circle cx="18" cy="12" r="1.5" />
        </svg>
      </button>
    </div>

    <div className="aspect-square bg-gray-100 dark:bg-gray-900">
      <img
        src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800"
        alt="Post"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-3">
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-4">
          <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            <Heart className="w-6 h-6" />
          </button>
          <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
            <Share className="w-6 h-6" />
          </button>
        </div>
        <button className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
          <Bookmark className="w-6 h-6" />
        </button>
      </div>

      <div className="text-[14px]">
        <span className="font-semibold text-gray-900 dark:text-white">{author}</span>
        <span className="ml-1 text-gray-900 dark:text-white whitespace-pre-wrap">{content}</span>
      </div>

      <div className="mt-2 text-[12px] text-gray-500 dark:text-gray-400">
        View all 128 comments
      </div>

      <div className="mt-1 text-[10px] text-gray-500 dark:text-gray-400 uppercase">
        2 hours ago
      </div>
    </div>
  </div>
);

import React from 'react';
import { MessageCircle, Repeat2, Heart, Share } from 'lucide-react';

interface TwitterPreviewProps {
  content: string;
  author: string;
}

export const TwitterPreview: React.FC<TwitterPreviewProps> = ({ content, author }) => (
  <div className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-800 max-w-[598px] font-[chirp,'Segoe UI',sans-serif]">
    <div className="p-4">
      <div className="flex space-x-3">
        <img
          src="https://i.postimg.cc/htgmDFkK/c7ee1aca55d54077a481c582c94f61cf13730bf99d914867ad3a829fefaa765f-sm.jpg"
          alt={author}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-[15px]">
            <span className="font-bold text-gray-900 dark:text-white">{author}</span>
            <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-5 h-5 ml-1 text-[#1d9bf0]" fill="currentColor">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z" />
            </svg>
            <span className="text-gray-500 dark:text-gray-400 ml-1">@{author.toLowerCase()}</span>
            <span className="mx-1 text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400">2h</span>
          </div>
          <div className="mt-2 text-[15px] text-gray-900 dark:text-white whitespace-pre-wrap">
            {content}
          </div>
          <div className="mt-3 flex items-center justify-between text-gray-500 dark:text-gray-400 max-w-[425px]">
            <button className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 group-hover:text-blue-500">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="ml-1 text-sm group-hover:text-blue-500">482</span>
            </button>
            <button className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/10 group-hover:text-green-500">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="ml-1 text-sm group-hover:text-green-500">2,047</span>
            </button>
            <button className="flex items-center group">
              <div className="p-2 rounded-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/10 group-hover:text-pink-500">
                <Heart className="w-5 h-5" />
              </div>
              <span className="ml-1 text-sm group-hover:text-pink-500">12.3K</span>
            </button>
            <button className="p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-500">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

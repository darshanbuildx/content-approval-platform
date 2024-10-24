import React from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send } from 'lucide-react';

interface LinkedInPreviewProps {
  content: string;
  author: string;
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({ content, author }) => (
  <div className="bg-white dark:bg-[#1B1F23] rounded-xl border border-gray-200 dark:border-gray-800 max-w-[552px] font-[-apple-system,system-ui,BlinkMacSystemFont,'Segoe UI',sans-serif]">
    <div className="p-4">
      <div className="flex items-start space-x-3">
        <img
          src="https://i.postimg.cc/htgmDFkK/c7ee1aca55d54077a481c582c94f61cf13730bf99d914867ad3a829fefaa765f-sm.jpg"
          alt={author}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <div className="flex items-center">
            <span className="font-semibold text-[14px] text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
              {author}
            </span>
            <span className="ml-1">
              <svg className="w-4 h-4 text-[#0A66C2]" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.63 2.37a1.37 1.37 0 0 0-2 0L6 8l-1.63-1.63a1.37 1.37 0 0 0-2 0 1.37 1.37 0 0 0 0 2L6 12l7.63-7.63a1.37 1.37 0 0 0 0-2Z" />
              </svg>
            </span>
          </div>
          <div className="text-[12px] text-gray-600 dark:text-gray-400">
            AI Automation Consultant | Helping Local Businesses Scale with AI
          </div>
          <div className="flex items-center text-[12px] text-gray-600 dark:text-gray-400 mt-1">
            <span>2h</span>
            <span className="mx-1">·</span>
            <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm0-10.5a1 1 0 0 0-1 1v3.59L5.29 7.38a1 1 0 0 0-1.41 1.41l2.12 2.12a1 1 0 0 0 .71.29h.71a1 1 0 0 0 .71-.29l2.12-2.12a1 1 0 0 0-1.41-1.41L7 9.09V5.5a1 1 0 0 0-1-1z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[14px] text-gray-900 dark:text-white whitespace-pre-wrap">
        {content}
      </div>

      <div className="mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-center">
          <button className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors group">
            <ThumbsUp className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]" />
            <span className="ml-2 text-[13px] text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]">Like</span>
          </button>
          <button className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors group">
            <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]" />
            <span className="ml-2 text-[13px] text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]">Comment</span>
          </button>
          <button className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors group">
            <Repeat className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]" />
            <span className="ml-2 text-[13px] text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]">Repost</span>
          </button>
          <button className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors group">
            <Send className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]" />
            <span className="ml-2 text-[13px] text-gray-600 dark:text-gray-400 group-hover:text-[#0A66C2]">Send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

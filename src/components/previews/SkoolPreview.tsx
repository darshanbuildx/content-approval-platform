import React, { useState } from 'react';
import { MessageCircle, Bell, ThumbsUp, MoreHorizontal } from 'lucide-react';

interface SkoolPreviewProps {
  content: string;
  author: string;
}

export const SkoolPreview: React.FC<SkoolPreviewProps> = ({ content, author }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(404);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#141517] rounded-[16px] border border-[#E5E7EB] dark:border-[#2C2E33] max-w-[700px] font-['Inter',system-ui,-apple-system,sans-serif] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] transition-colors">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="relative group">
              <img
                src="https://i.postimg.cc/htgmDFkK/c7ee1aca55d54077a481c582c94f61cf13730bf99d914867ad3a829fefaa765f-sm.jpg"
                alt={author}
                className="w-[52px] h-[52px] rounded-full border-[3px] border-[#FFFFFF] dark:border-[#2C2E33] transition-transform group-hover:scale-105"
              />
              <div className="absolute -bottom-1 -right-1 bg-[#4F46E5] text-white text-[11px] font-bold rounded-full w-[22px] h-[22px] flex items-center justify-center border-[2px] border-[#FFFFFF] dark:border-[#2C2E33]">
                7
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[#111827] dark:text-[#FFFFFF] text-[15px] leading-[18px] hover:text-[#4F46E5] dark:hover:text-[#818CF8] cursor-pointer transition-colors">
                {author}
              </h3>
              <div className="flex items-center text-[13px] text-[#6B7280] dark:text-[#A1A1AA] mt-[2px]">
                <span>Jan 23 (edited)</span>
                <span className="mx-[6px]">in</span>
                <span className="text-[#4F46E5] dark:text-[#818CF8] font-medium hover:underline cursor-pointer">
                  General discussion
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-2 rounded-lg text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[#2C2E33] transition-all hover:text-[#4F46E5] dark:hover:text-[#818CF8] active:scale-95">
              <Bell className="w-[18px] h-[18px]" />
            </button>
            <button className="p-2 rounded-lg text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[#2C2E33] transition-all hover:text-[#4F46E5] dark:hover:text-[#818CF8] active:scale-95">
              <MoreHorizontal className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 text-[#111827] dark:text-[#E5E7EB] text-[15px] leading-[24px] space-y-4">
          <div className="text-[24px] font-bold leading-[28.8px] flex items-center space-x-2">
            <span className="animate-wave inline-block">👋</span>
            <span>Welcome New Members...Start Here!</span>
            <span className="animate-wave inline-block delay-100">👋</span>
          </div>
          
          <p className="text-[15px] leading-[24px]">
            As our community continues to grow at this exponential rate, I want to make sure everyone is getting the most out of the platform and what we have available.
          </p>
          
          <p className="text-[15px] leading-[24px]">
            There is a course in the Classroom called <a href="#" className="text-[#4F46E5] dark:text-[#818CF8] hover:underline transition-colors">'Start Here'</a> & that is designed to serve as an introduction for you.
          </p>
          
          <p className="text-[15px] leading-[24px]">
            Please go through that fully so you know how to maximize your experience here!
          </p>
          
          <p className="text-[15px] leading-[24px]">
            You can also access that <a href="#" className="text-[#4F46E5] dark:text-[#818CF8] hover:underline transition-colors">course through this link here</a>
          </p>
          
          <p className="text-[15px] leading-[24px]">
            So glad you're here, let's build great things together <span className="animate-pulse inline-block">🔥</span><span className="animate-pulse inline-block delay-100">🔥</span><span className="animate-pulse inline-block delay-200">🔥</span>
          </p>

          {/* Image */}
          <div className="mt-4 rounded-[12px] overflow-hidden border border-[#E5E7EB] dark:border-[#2C2E33] group cursor-pointer hover:border-[#4F46E5] dark:hover:border-[#818CF8] transition-colors">
            <img
              src="https://i.postimg.cc/L8Q1L0xZ/skool-course-preview.jpg"
              alt="Course Preview"
              className="w-full transition-transform group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#2C2E33] flex items-center space-x-6">
          <button 
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked 
                ? 'text-[#4F46E5] dark:text-[#818CF8]' 
                : 'text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#4F46E5] dark:hover:text-[#818CF8]'
            }`}
          >
            <ThumbsUp className={`w-[18px] h-[18px] transition-transform ${isLiked ? 'scale-110' : ''}`} />
            <span className="text-[13px] font-medium">{likeCount}</span>
          </button>
          <button className="flex items-center space-x-2 text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#4F46E5] dark:hover:text-[#818CF8] transition-colors">
            <MessageCircle className="w-[18px] h-[18px]" />
            <span className="text-[13px] font-medium">453 comments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

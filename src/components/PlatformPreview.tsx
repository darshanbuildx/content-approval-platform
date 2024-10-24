import React from 'react';
import { Platform } from '../types';
import { TwitterPreview } from './previews/TwitterPreview';
import { InstagramPreview } from './previews/InstagramPreview';
import { LinkedInPreview } from './previews/LinkedInPreview';
import { RedditPreview } from './previews/RedditPreview';
import { SkoolPreview } from './previews/SkoolPreview';

interface PlatformPreviewProps {
  platform: Platform;
  content: string;
  author: string;
}

export const PlatformPreview: React.FC<PlatformPreviewProps> = ({ platform, content, author }) => {
  switch (platform) {
    case 'Twitter':
      return <TwitterPreview content={content} author={author} />;
    case 'Instagram':
      return <InstagramPreview content={content} author={author} />;
    case 'LinkedIn':
      return <LinkedInPreview content={content} author={author} />;
    case 'Reddit':
      return <RedditPreview content={content} author={author} />;
    case 'Skool':
      return <SkoolPreview content={content} author={author} />;
    default:
      return null;
  }
};

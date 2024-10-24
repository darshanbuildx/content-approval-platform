export type Platform = 'Twitter' | 'Instagram' | 'LinkedIn' | 'Reddit' | 'Skool';

export type Status = 'Draft' | 'In Review' | 'Changes Requested' | 'Approved' | 'Published';

export type ViewMode = 'list' | 'kanban';

export interface FilterOptions {
  platform?: Platform;
  status?: Status;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
  topic?: string;
}

export interface ActivityLog {
  id: string;
  contentId: string;
  action: 'created' | 'updated' | 'approved' | 'changes_requested' | 'published';
  timestamp: Date;
  user: string;
  details?: string;
}

export interface ContentItem {
  id: string;
  platform: Platform;
  topic: string;
  content: string;
  status: Status;
  createdAt: Date;
  updatedAt?: Date;
  lastFeedback?: string;
  lastFeedbackDate?: string;
  dateApproved?: string;
  approvedBy?: string;
  finalApprovalDate?: string;
  postScheduledDate?: string;
  postedBy?: string;
  postLink?: string;
  aiSuggestions?: string[];
  makeWorkflowId?: string;
  makeStatus?: string;
  lastSync?: Date;
  activityLog?: ActivityLog[];
}

export interface Column {
  id: Status;
  title: string;
  items: ContentItem[];
}

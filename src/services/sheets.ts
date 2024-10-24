import { ContentItem, Status } from '../types';
import { mockData } from '../mocks/data';

// In development, use mock data if API is not available
const isDevelopment = import.meta.env.MODE === 'development';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const loadFromSheets = async (): Promise<ContentItem[]> => {
  try {
    if (isDevelopment) {
      // Simulate API delay in development
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockData;
    }

    const response = await fetch(`${API_URL}/api/content`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.id,
      platform: item.platform,
      topic: item.topic,
      content: item.content,
      status: item.status,
      createdAt: new Date(item.createdAt),
      lastFeedback: item.lastFeedback || undefined,
      lastFeedbackDate: item.lastFeedbackDate ? new Date(item.lastFeedbackDate) : undefined,
      dateApproved: item.dateApproved ? new Date(item.dateApproved) : undefined,
      approvedBy: item.approvedBy || undefined,
      finalApprovalDate: item.finalApprovalDate ? new Date(item.finalApprovalDate) : undefined,
      postScheduledDate: item.postScheduledDate ? new Date(item.postScheduledDate) : undefined,
      postedBy: item.postedBy || undefined,
      postLink: item.postLink || undefined,
      aiSuggestions: item.aiSuggestions || [],
      makeWorkflowId: item.makeWorkflowId || undefined,
      makeStatus: item.makeStatus || undefined,
      lastSync: item.lastSync ? new Date(item.lastSync) : undefined,
      activityLog: item.activityLog || []
    }));
  } catch (error) {
    console.error('Error loading from sheets:', error);
    
    if (isDevelopment) {
      console.log('Falling back to mock data in development');
      return mockData;
    }
    
    throw error;
  }
};

export const updateStatus = async (id: string, status: Status, feedback?: string): Promise<void> => {
  try {
    if (isDevelopment) {
      // Simulate API delay in development
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Development mode: Status update simulated', { id, status, feedback });
      return;
    }

    const response = await fetch(`${API_URL}/api/content/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id,
        status,
        feedback,
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Status updated successfully:', result);
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
};

export const syncWithSheets = async (items: ContentItem[]): Promise<void> => {
  try {
    if (isDevelopment) {
      // Simulate API delay in development
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Development mode: Sheet sync simulated', items.length);
      return;
    }

    const response = await fetch(`${API_URL}/api/content/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    console.log('Sheet sync completed successfully');
  } catch (error) {
    console.error('Error syncing with sheets:', error);
    throw error;
  }
};

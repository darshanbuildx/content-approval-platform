import { useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { ContentItem, Status } from '../types';
import { mockData } from '../mocks/data';

const isDevelopment = import.meta.env.MODE === 'development';

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (isDevelopment) {
        await new Promise(resolve => setTimeout(resolve, 800));
        return mockData;
      }
      
      const isHealthy = await apiService.healthCheck();
      if (!isHealthy && isDevelopment) {
        console.warn('API is not available, using mock data');
        return mockData;
      }
      
      const data = await apiService.getContent();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load content';
      setError(errorMessage);
      if (isDevelopment) {
        console.warn('Error loading content, using mock data:', err);
        return mockData;
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = useCallback(async (id: string, status: Status, feedback?: string) => {
    setError(null);
    try {
      if (isDevelopment) {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Development mode: Status update simulated', { id, status, feedback });
        return;
      }
      await apiService.updateContentStatus(id, status, feedback);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update status';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const syncContent = useCallback(async (items: ContentItem[]) => {
    setError(null);
    try {
      if (isDevelopment) {
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('Development mode: Content sync simulated', items.length);
        return;
      }
      await apiService.syncContent(items);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sync content';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    isLoading,
    error,
    loadContent,
    updateStatus,
    syncContent
  };
}

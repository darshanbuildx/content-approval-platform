import { ContentItem, Status } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private async fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getContent(): Promise<ContentItem[]> {
    try {
      const response = await this.fetchWithTimeout(`${API_URL}/api/content`);
      return this.handleResponse<ContentItem[]>(response);
    } catch (error) {
      console.error('API Error - getContent:', error);
      throw error;
    }
  }

  async updateContentStatus(id: string, status: Status, feedback?: string): Promise<void> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_URL}/api/content/status`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id, status, feedback })
        }
      );
      await this.handleResponse<{ message: string }>(response);
    } catch (error) {
      console.error('API Error - updateContentStatus:', error);
      throw error;
    }
  }

  async syncContent(items: ContentItem[]): Promise<void> {
    try {
      const response = await this.fetchWithTimeout(
        `${API_URL}/api/content/sync`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ items })
        }
      );
      await this.handleResponse<{ message: string }>(response);
    } catch (error) {
      console.error('API Error - syncContent:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.fetchWithTimeout(`${API_URL}/health`, { method: 'GET' });
      return response.ok;
    } catch (error) {
      console.error('API Error - healthCheck:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();

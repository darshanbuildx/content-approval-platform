import { google } from 'googleapis';
import { ContentItem, Status } from '../types';

// Sheet column mappings
const COLUMNS = {
  POST_ID: 'A',
  PLATFORM: 'B',
  TOPIC: 'C',
  CONTENT: 'D',
  STATUS: 'E',
  LAST_FEEDBACK: 'F',
  LAST_FEEDBACK_DATE: 'G',
  DATE_CREATED: 'H',
  DATE_APPROVED: 'I',
  APPROVED_BY: 'J',
  FINAL_APPROVAL_DATE: 'K',
  POST_SCHEDULED_DATE: 'L',
  POSTED_BY: 'M',
  POST_LINK: 'N'
};

class GoogleSheetsService {
  private sheets;
  private spreadsheetId;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
        private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = import.meta.env.VITE_GOOGLE_SHEET_ID;
  }

  private async getSheetData() {
    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: 'Sheet1!A2:N', // Assuming headers are in row 1
    });

    return response.data.values;
  }

  async loadContent(): Promise<ContentItem[]> {
    try {
      const rows = await this.getSheetData();
      
      return rows.map(row => ({
        id: row[0],
        platform: row[1] as ContentItem['platform'],
        topic: row[2],
        content: row[3],
        status: row[4] as Status,
        lastFeedback: row[5] || undefined,
        lastFeedbackDate: row[6] ? new Date(row[6]) : undefined,
        createdAt: new Date(row[7]),
        dateApproved: row[8],
        approvedBy: row[9],
        finalApprovalDate: row[10],
        postScheduledDate: row[11],
        postedBy: row[12],
        postLink: row[13]
      }));
    } catch (error) {
      console.error('Error loading from Google Sheets:', error);
      throw error;
    }
  }

  async updateContent(item: ContentItem): Promise<void> {
    try {
      const range = `Sheet1!A${this.findRowByPostId(item.id)}`;
      
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[
            item.id,
            item.platform,
            item.topic,
            item.content,
            item.status,
            item.lastFeedback || '',
            item.lastFeedbackDate ? item.lastFeedbackDate.toISOString() : '',
            item.createdAt.toISOString(),
            item.dateApproved || '',
            item.approvedBy || '',
            item.finalApprovalDate || '',
            item.postScheduledDate || '',
            item.postedBy || '',
            item.postLink || ''
          ]]
        }
      });
    } catch (error) {
      console.error('Error updating Google Sheets:', error);
      throw error;
    }
  }

  private async findRowByPostId(postId: string): Promise<number> {
    const rows = await this.getSheetData();
    const rowIndex = rows.findIndex(row => row[0] === postId);
    if (rowIndex === -1) throw new Error(`Post ID ${postId} not found`);
    return rowIndex + 2; // Add 2 to account for header row and 0-based index
  }
}

export const googleSheetsService = new GoogleSheetsService();

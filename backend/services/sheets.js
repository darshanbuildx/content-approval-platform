import { google } from 'googleapis';
import { logger } from '../utils/logger.js';

class GoogleSheetsService {
  constructor() {
    this.auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID;
  }

  async initializeSheet() {
    try {
      // Check if headers exist, if not create them
      const headers = [
        'ID',
        'Platform',
        'Topic',
        'Content',
        'Status',
        'Last Feedback',
        'Last Feedback Date',
        'Created At',
        'Date Approved',
        'Approved By',
        'Final Approval Date',
        'Post Scheduled Date',
        'Posted By',
        'Post Link',
        'Last Sync'
      ];

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A1:O1',
        valueInputOption: 'RAW',
        resource: {
          values: [headers]
        }
      });

      // Format headers
      await this.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        resource: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.2, green: 0.2, blue: 0.2 },
                    textFormat: {
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                      bold: true
                    }
                  }
                },
                fields: 'userEnteredFormat(backgroundColor,textFormat)'
              }
            }
          ]
        }
      });

      logger.info('Sheet initialized successfully');
    } catch (error) {
      logger.error('Error initializing sheet:', error);
      throw error;
    }
  }

  async getContent() {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A2:O'
      });

      const rows = response.data.values || [];
      return rows.map(row => ({
        id: row[0],
        platform: row[1],
        topic: row[2],
        content: row[3],
        status: row[4],
        lastFeedback: row[5] || null,
        lastFeedbackDate: row[6] || null,
        createdAt: row[7],
        dateApproved: row[8] || null,
        approvedBy: row[9] || null,
        finalApprovalDate: row[10] || null,
        postScheduledDate: row[11] || null,
        postedBy: row[12] || null,
        postLink: row[13] || null,
        lastSync: row[14] || null
      }));
    } catch (error) {
      logger.error('Error fetching content:', error);
      throw error;
    }
  }

  async updateStatus(id, status, feedback) {
    try {
      const timestamp = new Date().toISOString();
      
      // Find row by ID
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: 'Sheet1!A:A'
      });

      const rows = response.data.values || [];
      const rowIndex = rows.findIndex(row => row[0] === id);

      if (rowIndex === -1) {
        throw new Error('Content not found');
      }

      // Update status, feedback, and timestamps
      const rowNum = rowIndex + 2; // Add 2 to account for header and 0-based index
      const updates = [
        {
          range: `Sheet1!E${rowNum}:G${rowNum}`,
          values: [[
            status,
            feedback || '',
            feedback ? timestamp : ''
          ]]
        },
        {
          range: `Sheet1!O${rowNum}`,
          values: [[timestamp]]
        }
      ];

      // If status is 'Approved', update approval fields
      if (status === 'Approved') {
        updates.push({
          range: `Sheet1!I${rowNum}:J${rowNum}`,
          values: [[timestamp, process.env.DEFAULT_APPROVER || 'System']]
        });
      }

      // Batch update all changes
      await this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        resource: {
          valueInputOption: 'USER_ENTERED',
          data: updates
        }
      });

      logger.info(`Status updated for content ${id} to ${status}`);
      return true;
    } catch (error) {
      logger.error('Error updating status:', error);
      throw error;
    }
  }

  async syncContent(items) {
    try {
      const timestamp = new Date().toISOString();
      const updates = items.map(item => ({
        range: `Sheet1!A${item.rowIndex}:O${item.rowIndex}`,
        values: [[
          item.id,
          item.platform,
          item.topic,
          item.content,
          item.status,
          item.lastFeedback || '',
          item.lastFeedbackDate || '',
          item.createdAt,
          item.dateApproved || '',
          item.approvedBy || '',
          item.finalApprovalDate || '',
          item.postScheduledDate || '',
          item.postedBy || '',
          item.postLink || '',
          timestamp
        ]]
      }));

      await this.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        resource: {
          valueInputOption: 'USER_ENTERED',
          data: updates
        }
      });

      logger.info(`Synced ${items.length} items successfully`);
      return true;
    } catch (error) {
      logger.error('Error syncing content:', error);
      throw error;
    }
  }

  async validateSheet() {
    try {
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId
      });
      
      if (!response.data.sheets.length) {
        throw new Error('No sheets found in the spreadsheet');
      }

      logger.info('Sheet validation successful');
      return true;
    } catch (error) {
      logger.error('Sheet validation failed:', error);
      throw error;
    }
  }
}

export const sheetsService = new GoogleSheetsService();

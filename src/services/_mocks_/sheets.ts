import { ContentItem, Status } from '../../types';
import { mockData } from '../../mocks/data';

// Simulate sheet data storage
let sheetData = [...mockData];
let changeLog: Array<{
  timestamp: string;
  id: string;
  status: Status;
  feedback: string;
  approvedBy: string;
}> = [];

// Simulate sheet operations with console logs for testing
export const syncWithSheets = async (items: ContentItem[]): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  sheetData = items;
  console.log('📝 Sheet Sync:', {
    updatedRows: items.length,
    timestamp: new Date().toISOString(),
    items: items.map(({ id, status, lastFeedback }) => ({ id, status, lastFeedback }))
  });
};

export const loadFromSheets = async (): Promise<ContentItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('📊 Loading from sheets:', {
    totalRows: sheetData.length,
    timestamp: new Date().toISOString()
  });
  return sheetData;
};

export const updateStatus = async (id: string, status: Status, feedback?: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const timestamp = new Date().toISOString();
  const rowIndex = sheetData.findIndex(item => item.id === id);
  
  if (rowIndex === -1) {
    throw new Error(`Content with ID ${id} not found`);
  }

  // Update sheet data
  sheetData[rowIndex] = {
    ...sheetData[rowIndex],
    status,
    lastFeedback: feedback || sheetData[rowIndex].lastFeedback,
    lastFeedbackDate: feedback ? timestamp : sheetData[rowIndex].lastFeedbackDate,
    updatedAt: timestamp
  };

  // Add to change log
  changeLog.push({
    timestamp,
    id,
    status,
    feedback: feedback || '',
    approvedBy: status === 'Approved' ? 'Test User' : ''
  });

  console.log('🔄 Status Update:', {
    id,
    status,
    feedback,
    timestamp,
    changeLogEntries: changeLog.length
  });
};

// Helper function to view current sheet state
export const debugSheetState = () => {
  console.log('📑 Current Sheet State:', {
    content: sheetData.map(({ id, status, lastFeedback }) => ({
      id,
      status,
      lastFeedback
    })),
    changeLog: changeLog.slice(-5) // Show last 5 changes
  });
};

// Function to simulate make.com updates
export const simulateMakeUpdate = async (id: string, aiSuggestions: string[]): Promise<void> => {
  const rowIndex = sheetData.findIndex(item => item.id === id);
  if (rowIndex === -1) return;

  sheetData[rowIndex] = {
    ...sheetData[rowIndex],
    aiSuggestions,
    makeStatus: 'updated',
    lastSync: new Date()
  };

  console.log('🤖 Make.com Update:', {
    id,
    aiSuggestions,
    timestamp: new Date().toISOString()
  });
};

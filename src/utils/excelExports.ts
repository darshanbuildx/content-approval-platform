import * as XLSX from 'xlsx';
import { ContentItem } from '../types';
import { format } from 'date-fns';

export const exportToExcel = (items: ContentItem[]) => {
  const data = items.map(item => ({
    'Post ID': item.id,
    'Platform': item.platform,
    'Topic': item.topic,
    'Content': item.content,
    'Status': item.status,
    'Created Date': format(new Date(item.createdAt), 'MMM d, yyyy HH:mm'),
    'Last Updated': item.updatedAt ? format(new Date(item.updatedAt), 'MMM d, yyyy HH:mm') : '',
    'Last Feedback': item.lastFeedback || '',
    'Feedback Date': item.lastFeedbackDate ? format(new Date(item.lastFeedbackDate), 'MMM d, yyyy HH:mm') : '',
    'Approved By': item.approvedBy || '',
    'Date Approved': item.dateApproved ? format(new Date(item.dateApproved), 'MMM d, yyyy HH:mm') : '',
    'Final Approval Date': item.finalApprovalDate ? format(new Date(item.finalApprovalDate), 'MMM d, yyyy HH:mm') : '',
    'Scheduled Date': item.postScheduledDate ? format(new Date(item.postScheduledDate), 'MMM d, yyyy HH:mm') : '',
    'Posted By': item.postedBy || '',
    'Post Link': item.postLink || ''
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Content');

  // Auto-size columns
  const colWidths = Object.keys(data[0]).map(key => ({
    wch: Math.max(key.length, ...data.map(item => String(item[key]).length))
  }));
  ws['!cols'] = colWidths;

  // Generate filename with current date
  const fileName = `content_export_${format(new Date(), 'yyyy-MM-dd_HHmm')}.xlsx`;
  
  // Save file
  XLSX.writeFile(wb, fileName);
};

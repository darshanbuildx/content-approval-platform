import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ContentItem } from '../types';
import { format } from 'date-fns';

export const exportToPDF = (items: ContentItem[]) => {
  const doc = new jsPDF();

  // Add title and metadata
  doc.setFontSize(16);
  doc.text("Content Approval Report", 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on ${format(new Date(), 'MMM d, yyyy HH:mm')}`, 14, 22);
  doc.text(`Total Items: ${items.length}`, 14, 28);

  // Prepare data for table
  const tableData = items.map(item => [
    item.id,
    item.platform,
    item.topic,
    item.status,
    format(new Date(item.createdAt), 'MMM d, yyyy HH:mm'),
    item.approvedBy || '-',
    item.lastFeedback || '-',
    item.lastFeedbackDate ? format(new Date(item.lastFeedbackDate), 'MMM d, yyyy HH:mm') : '-'
  ]);

  // Generate table
  autoTable(doc, {
    head: [['ID', 'Platform', 'Topic', 'Status', 'Created', 'Approved By', 'Last Feedback', 'Feedback Date']],
    body: tableData,
    startY: 35,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { top: 35 },
    didDrawPage: (data) => {
      // Add page number at the bottom
      const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
      doc.setFontSize(8);
      doc.text(
        `Page ${pageNumber}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
  });

  // Save file
  const fileName = `content_report_${format(new Date(), 'yyyy-MM-dd_HHmm')}.pdf`;
  doc.save(fileName);
};

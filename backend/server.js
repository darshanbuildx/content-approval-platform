import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sheetsService } from './services/sheets.js';
import { logger } from './utils/logger.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Initialize sheets on startup
(async () => {
  try {
    await sheetsService.validateSheet();
    await sheetsService.initializeSheet();
    logger.info('Google Sheets initialization complete');
  } catch (error) {
    logger.error('Failed to initialize Google Sheets:', error);
    process.exit(1);
  }
})();

// Routes
app.get('/api/content', async (req, res) => {
  try {
    const content = await sheetsService.getContent();
    res.json(content);
  } catch (error) {
    logger.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

app.post('/api/content/status', async (req, res) => {
  const { id, status, feedback } = req.body;

  if (!id || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sheetsService.updateStatus(id, status, feedback);
    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    logger.error('Error updating status:', error);
    res.status(error.message === 'Content not found' ? 404 : 500)
      .json({ error: error.message || 'Failed to update status' });
  }
});

app.post('/api/content/sync', async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid items format' });
  }

  try {
    await sheetsService.syncContent(items);
    res.json({ message: 'Content synced successfully' });
  } catch (error) {
    logger.error('Error syncing content:', error);
    res.status(500).json({ error: 'Failed to sync content' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

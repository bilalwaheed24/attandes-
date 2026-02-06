import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { initializeDatabase } from './config/database.js';
import { routes } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { auditMiddleware } from './middleware/audit.js';
import { logger } from './utils/logger.js';
import { runMigrations } from './scripts/migrate.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());
app.use(auditMiddleware);

// Routes
app.use('/api/v1', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Initialize
async function start() {
  try {
    logger.info('Starting SAMS Backend...');
    
    await initializeDatabase();
    await runMigrations();
    
    app.listen(config.port, () => {
      logger.info(`✓ Server running on port ${config.port}`);
      logger.info(`✓ Environment: ${config.env}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;

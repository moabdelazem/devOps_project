import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import compression from 'compression';
import morgan from 'morgan';
import config from './config/config';
import logger from './utils/logger';

const app = express();

app.use(express.json());
app.use(compression());

// Use morgan for HTTP request logging in development, winston stream in production
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  // In production, use winston to log HTTP requests
  app.use(
    morgan('combined', {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    }),
  );
}

// Routes
app.use('/api/items', itemRoutes);

// 404 handler
app.use((req, res) => {
  logger.warn(`Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;

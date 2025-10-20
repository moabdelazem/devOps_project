import express from 'express';
import itemRoutes from './routes/itemRoutes';
import { errorHandler } from './middlewares/errorHandler';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import logger from './utils/logger'; // Prometheus metrics
import client from 'prom-client';

// Create a custom counter metric for HTTP requests
const httpRequestCounter = new client.Counter({
  name: 'http_request_counter',
  help: 'Total number of HTTP requests received by the application',
});

// Create a histogram metric for HTTP request duration
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_milliseconds',
  help: 'Duration of HTTP requests in milliseconds',
  labelNames: ['method', 'route', 'status_code'],
  // Define buckets for response time from 0.1ms to 5000ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 2000, 5000],
});

const app = express();

// Enable CORS
app.use(
  cors({
    origin:
      config.nodeEnv === 'production'
        ? process.env.ALLOWED_ORIGINS?.split(',') || []
        : '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

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

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Middleware to track request duration and count
app.use((req, res, next) => {
  const start = Date.now();

  // Increment request counter
  httpRequestCounter.inc();

  // Capture response to record duration
  res.on('finish', () => {
    const duration = Date.now() - start;
    httpRequestDuration.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        status_code: res.statusCode.toString(),
      },
      duration,
    );
  });

  next();
});

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

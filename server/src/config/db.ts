import { Pool } from 'pg';
import logger from '../utils/logger';

let pool: Pool | null = null;

export const dbConnect = async (): Promise<Pool> => {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'itemuser',
    password: process.env.DB_PASSWORD || 'itemuser_pass',
    database: process.env.DB_NAME || 'items',
  });

  // Test the connection
  pool.on('connect', () => {
    logger.info('Connected to PostgreSQL database');
  });

  pool.on('error', (err) => {
    logger.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

  try {
    // Test the connection
    await pool.query('SELECT NOW()');
    logger.info('Database connection established successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }

  return pool;
};

export const getPool = (): Pool => {
  if (!pool) {
    throw new Error('Database not initialized. Call dbConnect() first.');
  }
  return pool;
};

export default getPool;

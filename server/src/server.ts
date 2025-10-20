import app from './app';
import config from './config/config';
import { dbConnect } from './config/db';
import logger from './utils/logger';

const startServer = async () => {
  try {
    // Connect to database
    await dbConnect();

    // Start the server
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

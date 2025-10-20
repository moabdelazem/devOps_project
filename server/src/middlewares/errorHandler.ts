import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';
import config from '../config/config';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let isOperational = false;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    isOperational = err.isOperational;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  }

  // Log error details
  if (!isOperational || statusCode >= 500) {
    logger.error('Error occurred:', {
      statusCode,
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
  } else {
    logger.warn('Operational error:', {
      statusCode,
      message: err.message,
      path: req.path,
      method: req.method,
    });
  }

  // Send response
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(config.nodeEnv === 'development' && { stack: err.stack }),
  });
};

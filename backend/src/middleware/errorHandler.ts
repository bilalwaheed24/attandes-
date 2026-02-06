import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error('Error:', err);

  if (err.message.includes('duplicate key')) {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Email or phone already exists'
    });
  }

  if (err.message.includes('Attendance already submitted')) {
    return res.status(409).json({
      error: 'Duplicate Submission',
      message: 'Attendance already submitted for today'
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.message
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: 'Not Found',
    message: 'Endpoint not found'
  });
}

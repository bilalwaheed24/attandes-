import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt.js';
import { logger } from '../utils/logger.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'Admin' | 'Employee';
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Missing token' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
  }
}

export function adminOnlyMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden', message: 'Only admins can access this endpoint' });
  }
  next();
}

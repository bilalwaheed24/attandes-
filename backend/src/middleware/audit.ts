import { Request, Response, NextFunction } from 'express';
import { AuditLogModel } from '../models/AuditLog.js';
import { AuthRequest } from './auth.js';

export async function auditMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', async () => {
    const duration = Date.now() - start;
    
    // Only log state-changing requests
    if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
      try {
        await AuditLogModel.create(
          req.user?.id || null,
          `${req.method} ${req.path}`,
          {
            status: res.statusCode,
            duration: `${duration}ms`,
            body: req.body
          },
          req.ip
        );
      } catch (error) {
        console.error('Audit logging error:', error);
      }
    }
  });

  next();
}

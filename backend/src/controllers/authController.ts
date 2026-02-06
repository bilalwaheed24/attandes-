import { Response } from 'express';
import { AuthService } from '../services/authService.js';
import { AuthRequest } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

export class AuthController {
  static async signup(req: AuthRequest, res: Response) {
    try {
      const { name, email, phone, password } = req.body;

      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Name, email, phone, and password are required'
        });
      }

      const result = await AuthService.signup(name, email, phone, password);
      logger.info('User registered:', email);

      res.status(201).json(result);
    } catch (error: any) {
      logger.error('Signup error:', error);
      res.status(400).json({
        error: 'Bad Request',
        message: error.message || 'Failed to register'
      });
    }
  }

  static async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'Email and password are required'
        });
      }

      const result = await AuthService.login(email, password);
      logger.info('User logged in:', email);

      res.json(result);
    } catch (error: any) {
      logger.error('Login error:', error);
      res.status(401).json({
        error: 'Unauthorized',
        message: error.message || 'Invalid credentials'
      });
    }
  }
}

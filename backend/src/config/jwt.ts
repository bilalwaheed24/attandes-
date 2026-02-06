import jwt from 'jsonwebtoken';
import { config } from './env.js';

export interface TokenPayload {
  id: string;
  email: string;
  role: 'Admin' | 'Employee';
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: parseInt(config.jwt.expiry),
    algorithm: 'HS256',
  });
}

export function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}

import { pool } from '../config/database.js';

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  details?: any;
  ip_address?: string;
  timestamp: string;
}

export class AuditLogModel {
  static async create(user_id: string | null, action: string, details?: any, ip_address?: string): Promise<AuditLog> {
    const query = `
      INSERT INTO audit_logs (user_id, action, details, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [user_id || null, action, details ? JSON.stringify(details) : null, ip_address || null]);
    return result.rows[0];
  }

  static async findAll(limit: number = 100): Promise<AuditLog[]> {
    const query = `
      SELECT * FROM audit_logs
      ORDER BY timestamp DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  static async findByUser(user_id: string, limit: number = 50): Promise<AuditLog[]> {
    const query = `
      SELECT * FROM audit_logs
      WHERE user_id = $1
      ORDER BY timestamp DESC
      LIMIT $2
    `;
    const result = await pool.query(query, [user_id, limit]);
    return result.rows;
  }
}

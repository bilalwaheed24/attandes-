import { pool } from '../config/database.js';

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  password_hash: string;
  role: 'Admin' | 'Employee';
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export class UserModel {
  static async create(name: string, email: string, phone: string, password_hash: string, role: string = 'Employee'): Promise<User> {
    const query = `
      INSERT INTO users (name, email, phone, password_hash, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [name, email, phone, password_hash, role]);
    return result.rows[0];
  }

  static async findById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  static async findByPhone(phone: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE phone = $1';
    const result = await pool.query(query, [phone]);
    return result.rows[0] || null;
  }

  static async findAll(status?: string): Promise<User[]> {
    let query = 'SELECT * FROM users';
    const params: any[] = [];
    
    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async update(id: string, updates: Partial<User>): Promise<User | null> {
    const allowedFields = ['name', 'phone', 'email', 'status'];
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key) && value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    }

    if (fields.length === 0) return this.findById(id);

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'UPDATE users SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2';
    const result = await pool.query(query, ['Inactive', id]);
    return result.rowCount! > 0;
  }
}

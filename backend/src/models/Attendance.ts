import { pool } from '../config/database.js';

export interface Attendance {
  id: string;
  user_id: string;
  status: 'Reached' | 'Late' | 'Off';
  extra_hours: number;
  remarks?: string;
  attendance_date: string;
  created_at: string;
  updated_at: string;
}

export class AttendanceModel {
  static async create(user_id: string, status: string, extra_hours: number = 0, remarks?: string): Promise<Attendance> {
    const query = `
      INSERT INTO attendance (user_id, status, extra_hours, remarks, attendance_date)
      VALUES ($1, $2, $3, $4, CURRENT_DATE)
      RETURNING *
    `;
    const result = await pool.query(query, [user_id, status, extra_hours, remarks || null]);
    return result.rows[0];
  }

  static async findById(id: string): Promise<Attendance | null> {
    const query = 'SELECT * FROM attendance WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findTodayByUser(user_id: string): Promise<Attendance | null> {
    const query = 'SELECT * FROM attendance WHERE user_id = $1 AND attendance_date = CURRENT_DATE';
    const result = await pool.query(query, [user_id]);
    return result.rows[0] || null;
  }

  static async findByUserAndDate(user_id: string, date: string): Promise<Attendance | null> {
    const query = 'SELECT * FROM attendance WHERE user_id = $1 AND attendance_date = $2';
    const result = await pool.query(query, [user_id, date]);
    return result.rows[0] || null;
  }

  static async findUserHistory(user_id: string, limit: number = 30): Promise<Attendance[]> {
    const query = `
      SELECT * FROM attendance
      WHERE user_id = $1
      ORDER BY attendance_date DESC
      LIMIT $2
    `;
    const result = await pool.query(query, [user_id, limit]);
    return result.rows;
  }

  static async findMonthSummary(user_id: string, month: string): Promise<any> {
    const query = `
      SELECT
        COUNT(CASE WHEN status = 'Reached' THEN 1 END) as reached_days,
        COUNT(CASE WHEN status = 'Late' THEN 1 END) as late_days,
        COUNT(CASE WHEN status = 'Off' THEN 1 END) as off_days,
        SUM(extra_hours) as total_extra_hours
      FROM attendance
      WHERE user_id = $1 
        AND TO_CHAR(attendance_date, 'YYYY-MM') = $2
    `;
    const result = await pool.query(query, [user_id, month]);
    return result.rows[0];
  }

  static async findAllMonthSummary(month: string): Promise<any[]> {
    const query = `
      SELECT
        u.id,
        u.name,
        u.email,
        COUNT(CASE WHEN a.status = 'Reached' THEN 1 END) as reached_days,
        COUNT(CASE WHEN a.status = 'Late' THEN 1 END) as late_days,
        COUNT(CASE WHEN a.status = 'Off' THEN 1 END) as off_days,
        COALESCE(SUM(a.extra_hours), 0) as total_extra_hours
      FROM users u
      LEFT JOIN attendance a ON u.id = a.user_id
        AND TO_CHAR(a.attendance_date, 'YYYY-MM') = $1
      WHERE u.status = 'Active'
      GROUP BY u.id, u.name, u.email
      ORDER BY u.name
    `;
    const result = await pool.query(query, [month]);
    return result.rows;
  }

  static async update(id: string, updates: Partial<Attendance>): Promise<Attendance | null> {
    const allowedFields = ['status', 'extra_hours', 'remarks'];
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
      UPDATE attendance
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM attendance WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rowCount! > 0;
  }
}

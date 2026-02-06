import { pool } from '../config/database.js';

export async function runMigrations() {
  try {
    console.log('Running database migrations...');

    // Create ENUM types
    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('Admin', 'Employee');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);

    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE user_status AS ENUM ('Active', 'Inactive');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);

    await pool.query(`
      DO $$ BEGIN
        CREATE TYPE attendance_status AS ENUM ('Reached', 'Late', 'Off');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$;
    `);

    // Users Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role user_role NOT NULL DEFAULT 'Employee',
        status user_status NOT NULL DEFAULT 'Active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Attendance Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status attendance_status NOT NULL,
        extra_hours INTEGER DEFAULT 0,
        remarks TEXT,
        attendance_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, attendance_date)
      );
    `);

    // Audit Log Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        action VARCHAR(255) NOT NULL,
        details JSONB,
        ip_address VARCHAR(45),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create Indexes
    await pool.query('CREATE INDEX IF NOT EXISTS idx_attendance_user_id ON attendance(user_id);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(attendance_date);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);');

    console.log('✓ Migrations completed successfully');
  } catch (error) {
    console.error('✗ Migration failed:', error);
    throw error;
  }
}

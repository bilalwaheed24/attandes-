import pkg from 'pg';
import { config } from './env.js';

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: config.database.url,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function initializeDatabase() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✓ Database connected:', result.rows[0]);
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    process.exit(1);
  }
}

export async function closeDatabase() {
  await pool.end();
}

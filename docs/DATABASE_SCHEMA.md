# SAMS Database Schema (Simplified - 20 Employees)

## PostgreSQL Schema Definition

```sql
-- Create ENUM types
CREATE TYPE user_role AS ENUM ('Admin', 'Employee');
CREATE TYPE user_status AS ENUM ('Active', 'Inactive');
CREATE TYPE attendance_status AS ENUM ('Reached', 'Late', 'Off');

-- Users Table
CREATE TABLE users (
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

-- Attendance Table
CREATE TABLE attendance (
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

-- Audit Log Table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  details JSONB,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_attendance_user_id ON attendance(user_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- Create View for Monthly Summary
CREATE VIEW monthly_attendance_summary AS
SELECT 
  u.id as user_id,
  u.name,
  DATE_TRUNC('month', a.attendance_date)::DATE as month,
  COUNT(CASE WHEN a.status = 'Reached' THEN 1 END) as reached_days,
  COUNT(CASE WHEN a.status = 'Late' THEN 1 END) as late_days,
  COUNT(CASE WHEN a.status = 'Off' THEN 1 END) as off_days,
  SUM(a.extra_hours) as total_extra_hours
FROM users u
LEFT JOIN attendance a ON u.id = a.user_id
GROUP BY u.id, u.name, DATE_TRUNC('month', a.attendance_date);

-- Create View for Daily Dashboard
CREATE VIEW daily_attendance_status AS
SELECT 
  u.id,
  u.name,
  u.email,
  COALESCE(a.status, 'Not Submitted') as today_status,
  a.created_at as submitted_at
FROM users u
LEFT JOIN attendance a ON u.id = a.user_id 
  AND a.attendance_date = CURRENT_DATE
WHERE u.status = 'Active';
```

## Supabase Setup Instructions

1. Create Supabase project at https://supabase.com
2. Copy PostgreSQL connection string
3. Run above SQL in Supabase SQL editor
4. Enable Row Level Security (RLS) on tables
5. Set up RLS policies:

### RLS Policy Examples

```sql
-- Users can only view their own data
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attendance"
  ON attendance FOR SELECT
  USING (auth.uid()::text = user_id::text OR 
         (SELECT role FROM users WHERE id = auth.uid()::text) = 'Admin');

CREATE POLICY "Users can insert own attendance"
  ON attendance FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);
```

## Data Retention Policy

- Attendance records: Keep for 3 years
- Audit logs: Keep for 2 years
- Fine logs: Keep for 2 years
- Deleted users: Soft delete (set status to Inactive)

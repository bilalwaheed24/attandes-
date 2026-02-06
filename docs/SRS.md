# Smart Attendance Management System (SAMS)
## Software Requirements & Project Documentation

## 1. Executive Summary

Smart Attendance Management System (SAMS) is a centralized web-based attendance platform designed to replace informal WhatsApp-based attendance tracking.

The system will standardize attendance reporting, automate fine calculation, track extra hours, and provide administrative reporting for management oversight.

## 2. Business Problem

Current attendance process relies on unstructured WhatsApp messages such as:

- Off
- OFF
- Reached
- off 1 hour extra
- Manual fine notes

### Issues:

- No centralized record
- No data consistency
- Manual fine tracking
- No reporting or analytics
- Risk of disputes
- No audit trail

## 3. Business Objectives

- Digitize attendance process
- Standardize status reporting
- Automate fine and extra-hour calculations
- Provide monthly summaries
- Reduce administrative workload
- Improve transparency and accountability

## 4. System Scope

### In Scope

- Employee login system (20 users)
- Daily attendance submission
- Role-based access (Admin / Employee)
- Extra hour tracking
- Monthly reporting
- Data export (CSV/Excel)
- Audit logging

### Out of Scope

- Fine calculation system
- Biometric integration
- WhatsApp API integration
- Mobile native app
- Payroll integration

## 5. User Roles

### 5.1 Admin

- View all attendance records
- Manage fine rules
- Generate reports
- Export data
- Add/remove employees

### 5.2 Employee

- Submit daily attendance
- View own attendance history
- View fine summary

## 6. Functional Requirements

### 6.1 Authentication

- Secure login (email/phone + password)
- JWT-based session management
- Role-based authorization

### 6.2 Attendance Submission

Each employee can submit:

- Reached
- Late
- Off
- Extra Hours (numeric input, optional)

System must:

- Normalize status input
- Prevent duplicate submission per day
- Automatically attach date/time
- Store submission history

### 6.3 Reporting

Admin dashboard must display:

- Total employees (20)
- Today's attendance breakdown
- Monthly attendance summary
- Extra hours summary
- CSV export

## 7. Non-Functional Requirements

- Responsive UI (desktop + mobile)
- Secure password hashing (bcrypt)
- Data validation
- Role-based access enforcement
- Daily database backup
- Error logging
- Performance: < 2 sec response time

## 8. Database Design (Lightweight for 20 Employees)

### Users Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| name | String | Employee name |
| phone | String | Contact number |
| email | String | Email address |
| password_hash | String | Hashed password |
| role | Enum | Admin / Employee |
| status | Enum | Active / Inactive |
| created_at | Timestamp | Creation date |

### Attendance Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to Users |
| status | Enum | Reached / Late / Off |
| extra_hours | Integer | Extra hours worked |
| remarks | String | Optional comments |
| attendance_date | Date | Date of attendance |
| created_at | Timestamp | Submission time |

### Audit_Log Table

| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to Users |
| action | String | Action performed |
| timestamp | Timestamp | When action occurred |
| ip_address | String | IP address |

## 9. Security Considerations

- HTTPS required
- Password hashing (bcrypt)
- JWT token expiry
- Role-based API protection
- Input validation to prevent SQL injection
- Daily automated database backup
- Access logs maintained

## 10. Deployment Plan

### Frontend:
- Vercel

### Backend:
- Render / Railway

### Database:
- Supabase PostgreSQL

### CI/CD:
- GitHub Actions

### Backup:
- Weekly manual export + automated snapshot

## 11. Risks & Mitigation

| Risk | Mitigation |
|------|-----------|
| Employee misuse | Role validation |
| Data loss | Regular backups |
| Unauthorized access | Strong authentication |
| System downtime | Cloud hosting with uptime guarantee |

## 12. Implementation Phases

### Phase 1:
- Authentication
- Attendance submission
- Basic dashboard

### Phase 2:
- Fine automation
- Reporting system
- CSV export

### Phase 3:
- Advanced rules
- Audit logging
- Optimization

## 13. Future Enhancements

- WhatsApp Bot integration
- Fine calculation system (Phase 2)
- Biometric sync
- Mobile app
- Advanced analytics

---

## Project Parameters

- **Employee Count**: 20 employees
- **Fine System**: Excluded from Phase 1
- **Payroll Integration**: Not required
- **System Type**: Lightweight, single-location attendance tracking

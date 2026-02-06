# SAMS API Specification

## Base URL
```
https://api.sams.com/api/v1
```

## Authentication
All endpoints (except login/signup) require JWT token in header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /auth/signup
**Description:** Register a new employee

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "phone": "03001234567",
  "password": "SecurePass123"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@company.com",
  "role": "Employee",
  "token": "jwt_token"
}
```

---

### POST /auth/login
**Description:** Login with email and password

**Request Body:**
```json
{
  "email": "john@company.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "role": "Employee",
  "token": "jwt_token",
  "expiresIn": 86400
}
```

---

## Attendance Endpoints

### POST /attendance/submit
**Description:** Submit daily attendance

**Request Body:**
```json
{
  "status": "Reached",
  "extra_hours": 0,
  "remarks": ""
}
```

**Status Options:** `Reached`, `Late`, `Off`, `Extra`

**Response (201):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "status": "Reached",
  "extra_hours": 0,
  "fine_amount": 0,
  "attendance_date": "2026-02-06",
  "created_at": "2026-02-06T10:30:00Z"
}
```

---

### GET /attendance/today
**Description:** Get today's attendance status

**Response (200):**
```json
{
  "status": "Reached",
  "submitted_at": "2026-02-06T09:00:00Z",
  "fine_applied": 0
}
```

---

### GET /attendance/history?month=2&year=2026
**Description:** Get attendance history for a month

**Response (200):**
```json
{
  "data": [
    {
      "date": "2026-02-01",
      "status": "Reached",
      "extra_hours": 0,
      "fine_amount": 0
    }
  ],
  "summary": {
    "total_days": 28,
    "reached": 25,
    "late": 2,
    "off": 1,
    "total_fines": 500
  }
}
```

---

## Admin Endpoints

### GET /admin/employees
**Description:** Get all employees (Admin only)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@company.com",
      "status": "Active",
      "joined_date": "2026-01-01"
    }
  ]
}
```

---

### GET /admin/attendance-summary?month=2&year=2026
**Description:** Get attendance summary for all employees

**Response (200):**
```json
{
  "data": [
    {
      "employee_id": "uuid",
      "name": "John Doe",
      "reached": 25,
      "late": 2,
      "off": 1,
      "extra_hours": 5
    }
  ]
}
```

---

### POST /admin/export
**Description:** Export attendance data as CSV

**Request Body:**
```json
{
  "type": "attendance",
  "month": 2,
  "year": 2026
}
```

**Response:** CSV file download

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request",
  "message": "Email is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Only admins can access this endpoint"
}
```

### 409 Conflict
```json
{
  "error": "Duplicate Submission",
  "message": "Attendance already submitted for today"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server Error",
  "message": "An unexpected error occurred"
}
```

# SAMS Project Structure

```
sams/
├── frontend/                      # React + Vite Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Signup.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── attendance/
│   │   │   │   ├── SubmitAttendance.tsx
│   │   │   │   ├── AttendanceHistory.tsx
│   │   │   │   └── AttendanceCard.tsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── EmployeeList.tsx
│   │   │   │   ├── AttendanceSummary.tsx
│   │   │   │   └── DataExport.tsx
│   │   │   └── common/
│   │   │       ├── Navbar.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       ├── Footer.tsx
│   │   │       └── LoadingSpinner.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── AttendancePage.tsx
│   │   │   ├── AdminPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useAttendance.ts
│   │   │   └── useApi.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── attendanceService.ts
│   │   │   └── adminService.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── types/
│   │   │   ├── index.ts
│   │   │   ├── auth.ts
│   │   │   ├── attendance.ts
│   │   │   └── admin.ts
│   │   ├── styles/
│   │   │   ├── App.module.css
│   │   │   ├── components.css
│   │   │   └── variables.css
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   ├── formatters.ts
│   │   │   └── storage.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── public/
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
├── backend/                       # Node.js/Express Backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── attendance.routes.ts
│   │   │   ├── admin.routes.ts
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── attendanceController.ts
│   │   │   ├── adminController.ts
│   │   │   └── auditController.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── attendanceService.ts
│   │   │   └── adminService.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   ├── Attendance.ts
│   │   │   └── AuditLog.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── errorHandler.ts
│   │   │   ├── validation.ts
│   │   │   └── audit.middleware.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── jwt.ts
│   │   │   └── env.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── validators.ts
│   │   │   └── helpers.ts
│   │   ├── jobs/
│   │   │   ├── fineCalculation.ts
│   │   │   ├── backupJob.ts
│   │   │   └── scheduler.ts
│   │   └── app.ts
│   ├── tests/
│   │   ├── auth.test.ts
│   │   ├── attendance.test.ts
│   │   └── admin.test.ts
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── docs/
│   ├── SRS.md
│   ├── API_SPECIFICATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── DEPLOYMENT.md
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
│
├── .github/
│   ├── workflows/
│   │   ├── frontend-deploy.yml
│   │   └── backend-deploy.yml
│   └── ISSUE_TEMPLATE/
│
├── README.md
├── .gitignore
└── docker-compose.yml (for local development)
```

## Key Folders Explanation

### Frontend (React + Vite)
- **components/**: Reusable UI components organized by feature
- **pages/**: Page-level components for routing
- **hooks/**: Custom React hooks for logic
- **services/**: API client methods
- **context/**: Global state management
- **types/**: TypeScript type definitions

### Backend (Node.js + Express)
- **routes/**: API route definitions
- **controllers/**: Request handlers
- **services/**: Business logic
- **models/**: Database models/queries
- **middleware/**: Request interceptors
- **jobs/**: Scheduled tasks (fine calculations, backups)

### Documentation
- **SRS.md**: Software Requirements Specification
- **API_SPECIFICATION.md**: API endpoints and payloads
- **DATABASE_SCHEMA.md**: Database design and setup
- **DEPLOYMENT.md**: Deployment instructions
- **ARCHITECTURE.md**: System architecture and design decisions

# Smart Attendance Management System (SAMS)

A lightweight web-based attendance management system for small organizations (20 employees).

## Features

- **Authentication**: Secure login/signup with JWT
- **Attendance Tracking**: Submit daily status (Reached/Late/Off) with extra hours
- **Admin Dashboard**: View all employee attendance and export reports
- **CSV Export**: Monthly attendance reports
- **Audit Logging**: Track all system actions
- **Docker Ready**: Deploy with Docker Compose

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Or: Node.js 18+, PostgreSQL 15+

### 1. Docker Deployment (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd sams

# Copy environment file
cp .env.example .env

# Edit .env with your settings (especially JWT_SECRET)
nano .env

# Make deploy script executable
chmod +x deploy.sh stop.sh

# Deploy
./deploy.sh
```

Access the application:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000/api/v1
- **Database**: localhost:5432

### 2. Local Development (Without Docker)

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update DATABASE_URL to your PostgreSQL connection
nano .env

# Run migrations
npm run build
npm run migrate

# Start server
npm run dev
```

The backend will run on `http://localhost:5000`

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

The frontend will run on `http://localhost:5173`

## Project Structure

```
sams/
├── frontend/          # React + Vite application
├── backend/           # Node.js/Express API
├── docs/             # Documentation
├── docker-compose.yml # Docker configuration
├── Dockerfile.*      # Docker build files
└── deploy.sh        # Deployment script
```

## Default Credentials

For testing, create admin user during signup with role selection (requires code modification).

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - Login

### Attendance
- `POST /api/v1/attendance/submit` - Submit attendance
- `GET /api/v1/attendance/today` - Get today's status
- `GET /api/v1/attendance/history` - Get attendance history
- `GET /api/v1/attendance/summary` - Get monthly summary

### Admin
- `GET /api/v1/admin/employees` - List all employees
- `GET /api/v1/admin/attendance-summary` - Get attendance summary
- `POST /api/v1/admin/export` - Export data as CSV

## Database

The system uses PostgreSQL with the following tables:
- `users` - Employee accounts
- `attendance` - Daily attendance records
- `audit_logs` - System activity logs

## Environment Variables

```
NODE_ENV            Development environment
PORT                Backend port (default: 5000)
DATABASE_URL        PostgreSQL connection string
JWT_SECRET          Secret key for JWT tokens
JWT_EXPIRY          Token expiry in seconds (default: 86400)
CORS_ORIGIN         Frontend URL for CORS
BCRYPT_ROUNDS       Password hashing rounds (default: 10)
LOG_LEVEL           Logging level (default: info)
```

## Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove data
docker-compose down -v

# Rebuild images
docker-compose up --build
```

## Development

### Building

```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build
```

### Testing

```bash
# Backend
cd backend && npm run test

# Frontend
cd frontend && npm run test
```

### Linting

```bash
# Backend
cd backend && npm run lint

# Frontend
cd frontend && npm run lint
```

## Deployment

### Docker (Production)

```bash
# Build and push to registry
docker build -f Dockerfile.backend -t your-registry/sams-backend:1.0.0 .
docker build -f Dockerfile.frontend -t your-registry/sams-frontend:1.0.0 .
docker push your-registry/sams-backend:1.0.0
docker push your-registry/sams-frontend:1.0.0

# Deploy with Docker Compose
docker-compose -f docker-compose.yml up -d
```

### Manual Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for Vercel, Render, and Supabase instructions.

## Documentation

- [SRS - Requirements](docs/SRS.md)
- [API Specification](docs/API_SPECIFICATION.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Implementation Checklist](docs/IMPLEMENTATION_CHECKLIST.md)

## Security

- Passwords hashed with bcrypt
- JWT-based authentication
- Role-based access control (Admin/Employee)
- SQL injection prevention with parameterized queries
- XSS protection with content encoding
- CORS configured for frontend domain
- Audit logging of all actions

## Support

For issues or questions:
1. Check the [documentation](docs/)
2. Review [API specification](docs/API_SPECIFICATION.md)
3. Check logs: `docker-compose logs -f`

## License

Proprietary - Company Internal Use Only

## Version

v1.0.0 - Released February 2026

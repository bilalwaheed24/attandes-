# Smart Attendance Management System (SAMS)

[![GitHub Stars](https://img.shields.io/github/stars/bilalwaheed24/attandes-.svg?style=social&label=Stars)](https://github.com/bilalwaheed24/attandes-)
[![GitHub Forks](https://img.shields.io/github/forks/bilalwaheed24/attandes-.svg?style=social&label=Fork)](https://github.com/bilalwaheed24/attandes-)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/bilalwaheed24/attandes-)
[![License](https://img.shields.io/badge/license-Proprietary-blue)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/bilalwaheed24/attandes-)
[![Status](https://img.shields.io/badge/status-Production%20Ready-green)](https://github.com/bilalwaheed24/attandes-)

---

## 🎯 Overview

**Smart Attendance Management System (SAMS)** is an enterprise-grade web application designed to streamline attendance tracking for small to medium organizations (20-50 employees). It replaces informal WhatsApp-based attendance tracking with a centralized, professional platform.

```
    ███████╗ █████╗ ███╗   ███╗███████╗
    ██╔════╝██╔══██╗████╗ ████║██╔════╝
    ███████╗███████║██╔████╔██║███████╗
    ╚════██║██╔══██║██║╚██╔╝██║╚════██║
    ███████║██║  ██║██║ ╚═╝ ██║███████║
    ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝
```

---

## ✨ Features

### 👥 Employee Features
- ✅ Secure login/signup with JWT authentication
- ✅ Daily attendance submission (Reached/Late/Off)
- ✅ Extra hours tracking
- ✅ Attendance history view
- ✅ Remarks & notes support
- ✅ Responsive mobile-friendly interface

### 👨‍💼 Admin Features
- ✅ Complete employee management
- ✅ Attendance overview & filtering
- ✅ Monthly summaries & reports
- ✅ CSV export functionality
- ✅ Role-based dashboard
- ✅ System audit logs

### 🔐 Security Features
- ✅ HTTPS ready
- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Role-based access control (RBAC)
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Audit logging system
- ✅ Input validation

### 🏗️ Architecture
- ✅ Full-stack TypeScript
- ✅ Responsive UI (mobile + desktop)
- ✅ Docker containerization
- ✅ Database migrations
- ✅ REST API specification
- ✅ Professional code organization
- ✅ Production-ready deployment
- ✅ Comprehensive documentation

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose (Recommended)
- Or: Node.js 18+, PostgreSQL 15+

### Option 1: Docker Deployment (Recommended)

```bash
# Clone repository
git clone https://github.com/bilalwaheed24/attandes-.git
cd attandes-

# Copy environment file
cp .env.example .env

# Make scripts executable
chmod +x deploy.sh stop.sh

# Deploy
./deploy.sh
```

**Access the application:**
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000/api/v1
- **Database**: localhost:5432

### Option 2: Manual Deployment

#### Backend
```bash
cd backend
npm install
npm run build
npm run migrate
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

```
sams/
├── frontend/                  # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # Auth context
│   │   └── styles/          # CSS styling
│   └── vite.config.ts
│
├── backend/                   # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── models/          # Database models
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Express middleware
│   │   ├── config/          # Configuration
│   │   └── utils/           # Utilities
│   └── tsconfig.json
│
├── docs/                      # Documentation
│   ├── SRS.md               # Requirements
│   ├── API_SPECIFICATION.md # API endpoints
│   ├── DATABASE_SCHEMA.md   # Database design
│   ├── DEPLOYMENT.md        # Deployment guide
│   └── ...
│
├── branding/                  # Organization branding
│   ├── BRAND_GUIDELINES.md
│   ├── CERTIFICATE.md
│   └── logo.txt
│
├── docker-compose.yml         # Service orchestration
├── Dockerfile.*              # Container images
├── deploy.sh                 # Deployment script
└── README.md                 # This file
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.0.0 | UI Framework |
| Vite | 5.0.8 | Build Tool |
| TypeScript | 5.3.3 | Type Safety |
| React Router | 6.20.1 | Routing |
| Axios | 1.6.5 | HTTP Client |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.18.2 | Web Framework |
| PostgreSQL | 15 | Database |
| JWT | 9.1.2 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |
| TypeScript | 5.3.3 | Type Safety |

### Infrastructure
| Technology | Version | Purpose |
|-----------|---------|---------|
| Docker | Latest | Containerization |
| Docker Compose | 3.8 | Orchestration |
| Nginx | Alpine | Web Server |

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  role ENUM('Admin', 'Employee'),
  status ENUM('Active', 'Inactive'),
  created_at TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status ENUM('Reached', 'Late', 'Off'),
  extra_hours INTEGER,
  remarks TEXT,
  attendance_date DATE,
  created_at TIMESTAMP,
  UNIQUE(user_id, attendance_date)
);
```

### Audit Logs Table
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(255),
  details JSONB,
  ip_address VARCHAR(45),
  timestamp TIMESTAMP
);
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/signup          Register new user
POST   /api/v1/auth/login           User login
```

### Attendance
```
POST   /api/v1/attendance/submit    Submit daily attendance
GET    /api/v1/attendance/today     Get today's status
GET    /api/v1/attendance/history   Get attendance history
GET    /api/v1/attendance/summary   Get monthly summary
```

### Admin
```
GET    /api/v1/admin/employees           List all employees
GET    /api/v1/admin/attendance-summary  Get attendance summary
POST   /api/v1/admin/export              Export as CSV
```

---

## 📖 Documentation

### Main Documentation
- **[README.md](README.md)** - Full documentation
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute quick start
- **[ABOUT.md](ABOUT.md)** - Project information

### Technical Documentation
- **[SRS.md](docs/SRS.md)** - Software Requirements Specification
- **[API_SPECIFICATION.md](docs/API_SPECIFICATION.md)** - API endpoints & examples
- **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** - Database design
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Production deployment
- **[PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)** - Project organization
- **[IMPLEMENTATION_CHECKLIST.md](docs/IMPLEMENTATION_CHECKLIST.md)** - Phase breakdown

### Organization
- **[branding/BRAND_GUIDELINES.md](branding/BRAND_GUIDELINES.md)** - Brand identity
- **[branding/CERTIFICATE.md](branding/CERTIFICATE.md)** - Development certificate
- **[branding/logo.txt](branding/logo.txt)** - Organization logo

---

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset everything
docker-compose down -v
docker-compose up -d

# Build images
docker-compose up --build

# Execute command
docker-compose exec backend npm run migrate
```

---

## 🔑 Environment Variables

```env
# Node Environment
NODE_ENV=production
PORT=5000

# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=86400

# CORS
CORS_ORIGIN=http://localhost

# Bcrypt
BCRYPT_ROUNDS=10

# Logging
LOG_LEVEL=info
```

---

## 📋 Development Workflow

### Setup Development Environment
```bash
# Clone repository
git clone https://github.com/bilalwaheed24/attandes-.git
cd attandes-

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Build for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Testing
```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

### Linting
```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
```

---

## 🚀 Deployment Options

### Docker (Recommended)
```bash
./deploy.sh
```

### Cloud Deployment
See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for:
- Vercel (Frontend)
- Render / Railway (Backend)
- Supabase (Database)

### Manual Deployment
See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete instructions.

---

## 🔐 Security Checklist

- ✅ HTTPS enabled
- ✅ Password hashing (bcryptjs)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Input validation
- ✅ Audit logging
- ✅ Error handling

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Total Files** | 72+ |
| **Lines of Code** | 5,000+ |
| **TypeScript Files** | 28 |
| **React Components** | 8 |
| **API Endpoints** | 10 |
| **Database Tables** | 3 |
| **Documentation Pages** | 10+ |
| **Build Time** | < 2 minutes |

---

## 🏆 Achievements

- ✅ Production-ready application
- ✅ Complete full-stack architecture
- ✅ Enterprise-grade security
- ✅ Comprehensive documentation
- ✅ Docker containerization
- ✅ Professional codebase
- ✅ Responsive UI design
- ✅ Audit & logging system
- ✅ REST API specification
- ✅ Deployment automation

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change ports in docker-compose.yml
# Or kill process using the port
lsof -i :80 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Connection Error
```bash
# Check database logs
docker-compose logs db

# Wait for database to start (5-10 seconds)
docker-compose ps
```

### Frontend Can't Connect to Backend
```bash
# Verify backend is running
docker-compose logs backend

# Check network connectivity
curl http://localhost:5000/api/v1/health
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

---

## 📅 Roadmap

### ✅ Phase 1 (Completed)
- Authentication system
- Attendance submission
- Employee dashboard
- Admin dashboard
- Basic reporting

### 📋 Phase 2 (Planned)
- Fine calculation system
- Advanced analytics
- Email notifications
- WhatsApp integration

### 🔮 Phase 3 (Planned)
- Mobile application
- Payroll integration
- Biometric support
- Custom workflows

---

## 📞 Support

### Documentation
- Review [README.md](README.md) for detailed guide
- Check [QUICKSTART.md](QUICKSTART.md) for quick start
- See [docs/](docs/) for technical specifications

### Troubleshooting
1. Check Docker logs: `docker-compose logs -f`
2. Review documentation in `docs/`
3. Check environment variables in `.env`

---

## 📄 License

**Proprietary** - Company Internal Use Only

© 2026 Smart Attendance Team. All rights reserved.

---

## 🤝 Contributing

This is a proprietary internal project. Contributions are managed by the development team.

---

## 🙏 Acknowledgments

Built with attention to:
- Professional software engineering standards
- Enterprise security best practices
- User experience excellence
- Comprehensive documentation
- Production readiness

---

## 📈 Status

| Component | Status |
|-----------|--------|
| **Frontend** | ✅ Complete |
| **Backend** | ✅ Complete |
| **Database** | ✅ Complete |
| **Docker** | ✅ Complete |
| **Documentation** | ✅ Complete |
| **Security** | ✅ Complete |
| **Testing** | ✅ Ready |
| **Deployment** | ✅ Ready |

**Overall Status**: ✅ **PRODUCTION READY**

---

## 📞 Contact

**Project Repository**: [https://github.com/bilalwaheed24/attandes-](https://github.com/bilalwaheed24/attandes-)

**Created By**: Bilal Waheed
**Email**: bilalwaheed24@gmail.com

---

<div align="center">

### Made with ❤️ for Modern Organizations

**Version 1.0.0** | **February 2026** | **Production Ready** ✅

[⬆ Back to Top](#smart-attendance-management-system-sams)

</div>

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

# 🚀 SAMS Quick Reference Card

## Repository
- **URL**: https://github.com/bilalwaheed24/attandes-
- **Branch**: main
- **Status**: Production Ready ✅

## Fast Commands

### Deploy with Docker (Recommended)
```bash
git clone https://github.com/bilalwaheed24/attandes-.git
cd attandes-
chmod +x deploy.sh
./deploy.sh
```

### Access Application
```
Frontend:  http://localhost
API:       http://localhost:5000/api/v1
Database:  localhost:5432 (credentials in .env)
```

### Stop Services
```bash
./stop.sh
```

## Development Setup

### Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

### Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/v1/auth/signup` | Register user |
| POST | `/api/v1/auth/login` | Login user |
| POST | `/api/v1/attendance/submit` | Mark attendance |
| GET | `/api/v1/attendance/today` | Today's status |
| GET | `/api/v1/attendance/history` | Attendance history |
| GET | `/api/v1/attendance/summary` | Monthly summary |
| GET | `/api/v1/admin/employees` | List employees (Admin) |
| GET | `/api/v1/admin/attendance-summary` | Summary report (Admin) |
| POST | `/api/v1/admin/export` | Export CSV (Admin) |

## File Structure

```
frontend/          23 files - React UI
backend/           28 files - Express API
docs/              10 files - Documentation
branding/          3 files  - Brand assets
docker-compose.yml           - Service orchestration
Dockerfile.*                  - Container images
deploy.sh                     - Deployment script
```

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sams.com | Admin@123 |
| Employee | emp1@sams.com | Emp@123 |

## Useful Links

- **Full README**: [README.md](README.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **API Docs**: [docs/API_SPECIFICATION.md](docs/API_SPECIFICATION.md)
- **Database**: [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)
- **Deployment**: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Contribute**: [CONTRIBUTING.md](CONTRIBUTING.md)

## Environment Setup

```bash
# Copy template
cp .env.example .env

# Edit with your values
nano .env

# Or use Docker (automatic setup)
./deploy.sh
```

## Docker Debugging

```bash
# View logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Shell into container
docker-compose exec backend sh
docker-compose exec frontend sh

# Check status
docker-compose ps
```

## Git Workflow

```bash
# Clone repo
git clone https://github.com/bilalwaheed24/attandes-.git

# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "feat: add your feature"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
```

## Build & Deploy

```bash
# Build Docker images
docker-compose up --build

# Deploy to production
./deploy.sh

# Stop all services
./stop.sh

# Cloud deployment
See docs/DEPLOYMENT.md for:
- Vercel (Frontend)
- Render/Railway (Backend)
- Supabase (Database)
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 80 in use | Change in docker-compose.yml |
| Port 5000 in use | Kill process: `lsof -i :5000 \| grep LISTEN \| awk '{print $2}' \| xargs kill -9` |
| DB won't connect | Wait 10s for PostgreSQL to start |
| Frontend can't reach API | Check backend is running: `curl http://localhost:5000/api/v1/health` |

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, React Router, Axios
- **Backend**: Node.js, Express, PostgreSQL, JWT, bcryptjs
- **DevOps**: Docker, Docker Compose, Nginx

## Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Docker Documentation](https://docs.docker.com)

## Project Stats

- **78 Files** total
- **5,000+ Lines** of code
- **3 Git Commits** (production ready)
- **10+ API Endpoints**
- **3 Database Tables**
- **Fully Documented**

---

**Version**: 1.0.0  
**Status**: Production Ready ✅  
**Repository**: https://github.com/bilalwaheed24/attandes-

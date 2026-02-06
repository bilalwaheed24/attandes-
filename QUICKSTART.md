# SAMS - Quick Start Guide

## 🚀 Start SAMS in 5 Minutes with Docker

### Step 1: Prerequisites
Make sure you have Docker and Docker Compose installed:

```bash
docker --version
docker-compose --version
```

If not installed, visit https://www.docker.com/products/docker-desktop

### Step 2: Clone & Setup

```bash
cd /home/bilal/app

# Copy environment configuration
cp .env.example .env
```

### Step 3: Deploy

```bash
# Make scripts executable
chmod +x deploy.sh stop.sh

# Start all services (database, backend, frontend)
./deploy.sh
```

This will:
✓ Build Docker images
✓ Start PostgreSQL database
✓ Start Node.js backend API
✓ Start React frontend
✓ Run database migrations

### Step 4: Access the Application

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost |
| **Backend API** | http://localhost:5000/api/v1 |
| **Database** | localhost:5432 |

---

## 📝 Test the System

### Create Test Account

1. Go to http://localhost
2. Click "Sign up"
3. Fill in details:
   - Name: `John Doe`
   - Email: `john@company.com`
   - Phone: `03001234567`
   - Password: `password123`
4. Click "Sign Up"

### Submit Attendance

1. You'll be redirected to dashboard
2. Select status: "Reached" (or Late/Off)
3. Click "Submit Attendance"
4. You'll see confirmation message

### View as Admin

To test admin features, create another account with email `admin@company.com`.

Then manually update role in database:
```bash
# Connect to database
docker-compose exec db psql -U sams_user -d sams_db

# Update user role
UPDATE users SET role = 'Admin' WHERE email = 'admin@company.com';
```

---

## 🛑 Stop the System

```bash
./stop.sh
```

This will stop all services and remove containers.

---

## 📊 View Logs

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

---

## 🔧 Troubleshooting

### Port Already in Use
If you get "port already in use" error:

```bash
# Change ports in docker-compose.yml
# Or stop other services using those ports
lsof -i :80
lsof -i :5000
lsof -i :5432
```

### Database Connection Error
Wait a few seconds - the database takes time to start:
```bash
docker-compose logs db
```

### Frontend Can't Connect to Backend
Check that containers are running:
```bash
docker-compose ps
```

All should show "Up". If not, check logs:
```bash
docker-compose logs backend
```

---

## 📁 Project Structure

```
/home/bilal/app/
├── frontend/              # React + Vite UI
├── backend/               # Node.js + Express API
├── docker-compose.yml     # Docker orchestration
├── Dockerfile.backend     # Backend image
├── Dockerfile.frontend    # Frontend image
├── nginx.conf            # Web server config
├── deploy.sh             # Start script
├── stop.sh              # Stop script
└── docs/                # Documentation
```

---

## 🔐 Security Notes

**Important**: Change these in `.env` for production:

1. **JWT_SECRET** - Generate a strong secret:
   ```bash
   openssl rand -base64 32
   ```

2. **Database password** - Change `sams_pass` in docker-compose.yml

3. **CORS_ORIGIN** - Update to your frontend domain

---

## 📚 Full Documentation

See `/home/bilal/app/docs/` for:
- [SRS.md](docs/SRS.md) - Requirements
- [API_SPECIFICATION.md](docs/API_SPECIFICATION.md) - API endpoints
- [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) - Database design
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Production deployment
- [README.md](README.md) - Full documentation

---

## 🆘 Need Help?

1. Check [README.md](README.md) for detailed docs
2. View logs: `docker-compose logs -f`
3. Reset everything: `./stop.sh` then `./deploy.sh`

---

## ✅ Deployment Checklist

Before going to production:

- [ ] Change JWT_SECRET in .env
- [ ] Change database password
- [ ] Update CORS_ORIGIN to your domain
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS on your web server
- [ ] Set up database backups
- [ ] Configure email notifications
- [ ] Test with real users
- [ ] Monitor logs and errors
- [ ] Have a disaster recovery plan

---

**Version**: v1.0.0
**Last Updated**: February 2026

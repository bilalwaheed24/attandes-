# SAMS Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Git
- Docker (optional)

## Frontend Deployment (Vercel)

### 1. Prepare Frontend
```bash
cd frontend
npm install
npm run build
```

### 2. Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### 3. Environment Variables (Vercel Dashboard)
```
VITE_API_URL=https://api.sams.com
VITE_JWT_STORAGE_KEY=sams_token
```

### 4. Configure Domain
- Add custom domain in Vercel dashboard
- Update DNS records

---

## Backend Deployment (Render or Railway)

### Option A: Render

#### 1. Connect GitHub Repository
- Go to https://render.com
- Create new Web Service
- Connect GitHub repo
- Select `backend` directory

#### 2. Configure Build & Start Commands
```
Build Command: npm install && npm run build
Start Command: npm start
```

#### 3. Environment Variables in Render Dashboard
```
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=86400
BCRYPT_ROUNDS=10
CORS_ORIGIN=https://sams.com
EMAIL_SERVICE=gmail
EMAIL_USER=noreply@sams.com
EMAIL_PASS=app_password
LOG_LEVEL=info
BACKUP_SCHEDULE=0 2 * * * (2 AM daily)
```

#### 4. Configure Disk (for logs & backups)
- Mount path: `/var/sams`

---

### Option B: Railway

#### 1. Connect GitHub
- Import project from GitHub
- Select `backend` directory

#### 2. Add PostgreSQL Service
- Add service → PostgreSQL
- Copy connection string to `DATABASE_URL`

#### 3. Environment Variables
Same as Render (see above)

#### 4. Deploy
```bash
railway up
```

---

## Database Setup (Supabase)

### 1. Create Supabase Project
- Go to https://supabase.com
- Create new project
- Copy connection string

### 2. Initialize Database
```bash
# Using psql
psql "postgresql://user:pass@host:port/db" < docs/DATABASE_SCHEMA.md

# Or use Supabase SQL Editor to run SQL from DATABASE_SCHEMA.md
```

### 3. Enable Row Level Security
See DATABASE_SCHEMA.md for RLS policies

### 4. Set Up Backups
- Supabase automatically backs up daily
- Manual export: Database → Backups → Export

---

## CI/CD Setup (GitHub Actions)

### Frontend Workflow (.github/workflows/frontend-deploy.yml)
```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd frontend && npm install
      
      - name: Run tests
        run: cd frontend && npm run test
      
      - name: Build
        run: cd frontend && npm run build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          cd frontend
          vercel deploy --prod --token $VERCEL_TOKEN
```

### Backend Workflow (.github/workflows/backend-deploy.yml)
```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: cd backend && npm install
      
      - name: Run linter
        run: cd backend && npm run lint
      
      - name: Run tests
        run: cd backend && npm run test
      
      - name: Deploy to Render
        env:
          RENDER_DEPLOY_HOOK: ${{ secrets.RENDER_DEPLOY_HOOK }}
        run: curl $RENDER_DEPLOY_HOOK
```

---

## Docker Deployment (Optional)

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist
COPY .env.production ./

EXPOSE 5000
CMD ["npm", "start"]
```

### docker-compose.yml (Local Development)
```yaml
version: '3.8'

services:
  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_USER: sams_user
      POSTGRES_PASSWORD: sams_pass
      POSTGRES_DB: sams_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://sams_user:sams_pass@db:5432/sams_db
      NODE_ENV: development
    depends_on:
      - db

volumes:
  postgres_data:
```

---

## Monitoring & Logging

### Setup Logging
- Backend logs to `/var/sams/logs/app.log`
- Use service dashboards for monitoring:
  - Render: Metrics tab
  - Railway: Observability tab
  - Vercel: Analytics tab

### Error Tracking
Integrate Sentry:
```bash
npm install @sentry/node
```

### Health Checks
- Backend: `GET /api/v1/health`
- Response: `{ status: "ok", timestamp: "..." }`

---

## Backup & Recovery

### Automated Backups
- Database: Supabase handles daily snapshots
- Application: GitHub repo contains code
- Logs: Stored in `/var/sams/logs/`

### Manual Backup
```bash
# Backup database
pg_dump "postgresql://user:pass@host/db" > backup.sql

# Export attendance data
curl -H "Authorization: Bearer admin_token" \
  https://api.sams.com/api/v1/admin/export \
  -d '{"type": "attendance", "month": 2, "year": 2026}' \
  > attendance_export.csv
```

### Recovery
```bash
# Restore database
psql "postgresql://user:pass@host/db" < backup.sql
```

---

## Security Checklist

- [ ] Enable HTTPS (automatic on Vercel & Render)
- [ ] Set strong JWT_SECRET (min 32 chars)
- [ ] Enable CORS only for frontend domain
- [ ] Use environment variables for secrets
- [ ] Enable database encryption at rest
- [ ] Set up regular backups
- [ ] Enable audit logging
- [ ] Configure rate limiting
- [ ] Use bcrypt for passwords
- [ ] Enable 2FA for admin access

---

## Performance Optimization

### Frontend
- Code splitting: Automatic with Vite
- Image optimization: Use next-gen formats
- Caching: Set cache headers in Vercel

### Backend
- Database indexing: See DATABASE_SCHEMA.md
- Connection pooling: Configure in DATABASE_URL
- Response caching: Use Redis (future phase)
- API rate limiting: Implement middleware

---

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"
```

### Backend Not Responding
```bash
# Check logs in Render/Railway dashboard
# Restart service
```

### Frontend Build Failures
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Cost Estimation (Monthly)

- **Vercel**: Free tier or ~$20/month (Pro)
- **Render**: ~$7/month (basic dyno)
- **Supabase**: Free tier or ~$25/month (Pro with backups)
- **Total**: ~$50-70/month for production

---

## Maintenance Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Security updates | As released | DevOps |
| Database backup | Daily (Auto) | Supabase |
| Log review | Weekly | Admin |
| Performance review | Monthly | DevOps |
| Security audit | Quarterly | Security |

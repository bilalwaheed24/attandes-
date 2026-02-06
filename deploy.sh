#!/bin/bash

set -e

echo "🚀 Starting SAMS Deployment..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}✗ Docker is not installed${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}✗ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Docker and Docker Compose are installed${NC}"

# Check .env file
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠ .env file not found. Creating from example...${NC}"
    cp .env.example .env 2>/dev/null || echo "JWT_SECRET=$(openssl rand -base64 32)" > .env
fi

# Build images
echo -e "${YELLOW}Building Docker images...${NC}"
docker-compose build

# Start services
echo -e "${YELLOW}Starting services...${NC}"
docker-compose up -d

# Wait for database
echo -e "${YELLOW}Waiting for database to be ready...${NC}"
sleep 5

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
docker-compose exec -T backend npm run build && docker-compose exec -T backend node dist/scripts/migrate.js

echo -e "${GREEN}✓ SAMS is ready!${NC}"
echo ""
echo -e "Access the application:"
echo -e "  Frontend: ${GREEN}http://localhost${NC}"
echo -e "  Backend API: ${GREEN}http://localhost:5000/api/v1${NC}"
echo -e "  Database: ${GREEN}localhost:5432${NC}"
echo ""
echo -e "Stop services: ${YELLOW}docker-compose down${NC}"
echo -e "View logs: ${YELLOW}docker-compose logs -f${NC}"

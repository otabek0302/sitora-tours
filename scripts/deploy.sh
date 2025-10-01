#!/bin/bash

# Sitora Tours - Production Deployment Script

set -e

echo "🚀 Starting Sitora Tours Production Deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found${NC}"
    echo -e "${YELLOW}💡 Copy .env.example to .env and fill in your production values${NC}"
    exit 1
fi

# Check if required env vars are set
echo -e "${YELLOW}🔍 Checking environment variables...${NC}"
if ! grep -q "DATABASE_URI=postgresql" .env; then
    echo -e "${RED}❌ DATABASE_URI not configured${NC}"
    exit 1
fi

if ! grep -q "PAYLOAD_SECRET=" .env | grep -v "your-secret"; then
    echo -e "${YELLOW}⚠️  Warning: PAYLOAD_SECRET may not be set${NC}"
fi

echo -e "${GREEN}✅ Environment variables OK${NC}"

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
pnpm test:unit || {
    echo -e "${RED}❌ Tests failed. Fix errors before deploying.${NC}"
    exit 1
}
echo -e "${GREEN}✅ Tests passed${NC}"

# Build the application
echo -e "${YELLOW}🏗️  Building application...${NC}"
pnpm build || {
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Build successful${NC}"

# Build Docker image
echo -e "${YELLOW}🐳 Building Docker image...${NC}"
docker build -t sitora-tour:latest . || {
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
}
echo -e "${GREEN}✅ Docker image built${NC}"

# Stop existing containers
echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down || true

# Start production containers
echo -e "${YELLOW}🚀 Starting production containers...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check if app is running
if docker ps | grep -q sitora-tour-prod; then
    echo -e "${GREEN}✅ Application is running!${NC}"
    echo -e "${GREEN}🌐 Frontend: http://localhost:3000${NC}"
    echo -e "${GREEN}🔧 Admin: http://localhost:3000/admin${NC}"
else
    echo -e "${RED}❌ Application failed to start${NC}"
    echo -e "${YELLOW}💡 Check logs with: docker-compose -f docker-compose.prod.yml logs${NC}"
    exit 1
fi

echo -e "${GREEN}🎉 Deployment complete!${NC}"


#!/bin/bash

# Sitora Tours - One-Click Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Sitora Tours - Automated Deployment"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Environment Check
echo -e "\n${YELLOW}[1/6] Checking environment...${NC}"
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env from .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}⚠️  Please edit .env with your values, then run again!${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Environment file found${NC}"

# 2. Install Dependencies
echo -e "\n${YELLOW}[2/6] Installing dependencies...${NC}"
pnpm install --frozen-lockfile
echo -e "${GREEN}✅ Dependencies installed${NC}"

# 3. Run Tests
echo -e "\n${YELLOW}[3/6] Running tests...${NC}"
pnpm test:unit
echo -e "${GREEN}✅ All tests passed${NC}"

# 4. Build Application
echo -e "\n${YELLOW}[4/6] Building production bundle...${NC}"
pnpm build
echo -e "${GREEN}✅ Build completed${NC}"

# 5. Build & Start Docker
echo -e "\n${YELLOW}[5/6] Setting up Docker containers...${NC}"
docker-compose down 2>/dev/null || true
docker-compose up -d --build
echo -e "${GREEN}✅ Containers started${NC}"

# 6. Wait & Verify
echo -e "\n${YELLOW}[6/6] Verifying deployment...${NC}"
echo -e "${YELLOW}Waiting 15 seconds for services to initialize...${NC}"
sleep 15

if docker ps | grep -q sitora-tour-app; then
    echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  🎉 DEPLOYMENT SUCCESSFUL! 🎉         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo -e "\n${GREEN}🌐 Frontend:    http://localhost:3000${NC}"
    echo -e "${GREEN}🔧 Admin Panel: http://localhost:3000/admin${NC}"
    echo -e "${GREEN}🗄️  Database:    postgresql://localhost:5432/sitora_tour${NC}"
    echo -e "${GREEN}📊 PgAdmin:     http://localhost:5050 (run: docker-compose --profile tools up pgadmin)${NC}"
    echo -e "\n${YELLOW}📝 Next Steps:${NC}"
    echo -e "   1. Visit http://localhost:3000/admin"
    echo -e "   2. Create your admin account"
    echo -e "   3. Start adding content!"
    echo -e "\n${YELLOW}📋 Useful Commands:${NC}"
    echo -e "   • View logs:    docker-compose logs -f"
    echo -e "   • Stop:         docker-compose down"
    echo -e "   • Restart:      docker-compose restart"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo -e "${YELLOW}Check logs: docker-compose logs${NC}"
    exit 1
fi


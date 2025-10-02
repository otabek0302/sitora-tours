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
echo -e "\n${YELLOW}[5/7] Setting up Docker containers...${NC}"
# Support both docker-compose (v1) and docker compose (v2)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    DOCKER_COMPOSE="docker compose"
fi

$DOCKER_COMPOSE down 2>/dev/null || true
$DOCKER_COMPOSE up -d --build
echo -e "${GREEN}✅ Containers started${NC}"

# 6. Run Database Migrations
echo -e "\n${YELLOW}[6/7] Running database migrations...${NC}"
echo -e "${YELLOW}Waiting for PostgreSQL to be ready...${NC}"
sleep 10

# Check if database needs migration
echo -e "${YELLOW}Checking database status...${NC}"
TABLE_COUNT=$(docker exec sitora-tour-db psql -U postgres -d sitora_tour -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name NOT LIKE 'payload_%';" 2>/dev/null || echo "0")

if [ "$TABLE_COUNT" -lt 5 ]; then
    echo -e "${YELLOW}📦 Database is empty or incomplete. Running migrations...${NC}"
    pnpm payload migrate || {
        echo -e "${RED}❌ Migration failed! Trying to recreate schema...${NC}"
        docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" 2>/dev/null || true
        sleep 2
        pnpm payload migrate
    }
    echo -e "${GREEN}✅ Migrations completed${NC}"
    
    # Restart app to pick up new tables
    echo -e "${YELLOW}Restarting application...${NC}"
    $DOCKER_COMPOSE restart app
    sleep 5
else
    echo -e "${GREEN}✅ Database already migrated (${TABLE_COUNT} tables)${NC}"
fi

# 7. Wait & Verify
echo -e "\n${YELLOW}[7/7] Verifying deployment...${NC}"
echo -e "${YELLOW}Waiting for services to initialize...${NC}"
sleep 10

if docker ps | grep -q sitora-tour-app; then
    echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║  🎉 DEPLOYMENT SUCCESSFUL! 🎉         ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
    echo -e "\n${GREEN}🌐 Frontend:    http://localhost:3000${NC}"
    echo -e "${GREEN}🔧 Admin Panel: http://localhost:3000/admin${NC}"
    echo -e "${GREEN}🗄️  Database:    postgresql://localhost:5432/sitora_tour${NC}"
    echo -e "${GREEN}📊 PgAdmin:     http://localhost:5050 (run: $DOCKER_COMPOSE --profile tools up pgadmin)${NC}"
    echo -e "\n${YELLOW}📝 Next Steps:${NC}"
    echo -e "   1. Visit http://localhost:3000/admin"
    echo -e "   2. Create your admin account"
    echo -e "   3. Start adding content!"
    echo -e "\n${YELLOW}📋 Useful Commands:${NC}"
    echo -e "   • View logs:    $DOCKER_COMPOSE logs -f"
    echo -e "   • Stop:         $DOCKER_COMPOSE down"
    echo -e "   • Restart:      $DOCKER_COMPOSE restart"
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo -e "${YELLOW}Check logs: $DOCKER_COMPOSE logs${NC}"
    exit 1
fi


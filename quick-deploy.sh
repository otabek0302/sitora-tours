#!/bin/bash

# Sitora Tours - Quick Deploy (Skip Tests & Build Optimizations)
# For VPS with limited resources

set -e

echo "🚀 Sitora Tours - Quick Deploy (VPS Optimized)"
echo "=============================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Environment Check
echo -e "\n${YELLOW}[1/6] Checking environment...${NC}"
if [ ! -f .env ]; then
    if [ -f env.example ]; then
        echo -e "${YELLOW}📝 Creating .env from env.example...${NC}"
        cp env.example .env
        echo -e "${GREEN}✅ .env file created${NC}"
    else
        echo -e "${RED}❌ No env.example found!${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Environment file found${NC}"
fi

# 2. Install Dependencies
echo -e "\n${YELLOW}[2/6] Installing dependencies...${NC}"
pnpm install --frozen-lockfile
echo -e "${GREEN}✅ Dependencies installed${NC}"

# 3. Skip Tests (for faster deployment)
echo -e "\n${YELLOW}[3/6] Skipping tests (VPS optimized)...${NC}"
echo -e "${GREEN}✅ Tests skipped${NC}"

# 4. Quick Build (no optimization)
echo -e "\n${YELLOW}[4/6] Quick build (no optimization)...${NC}"
rm -rf .next
echo -e "${YELLOW}Building without optimization...${NC}"

SKIP_ENV_VALIDATION=true NODE_ENV=production npx next build --no-lint || {
    echo -e "${RED}❌ Build failed! Trying with more memory...${NC}"
    NODE_OPTIONS="--max-old-space-size=6144" SKIP_ENV_VALIDATION=true npx next build --no-lint
}

echo -e "${GREEN}✅ Build completed${NC}"

# 5. Start Docker
echo -e "\n${YELLOW}[5/6] Starting Docker containers...${NC}"
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
else
    DOCKER_COMPOSE="docker compose"
fi

$DOCKER_COMPOSE down 2>/dev/null || true
$DOCKER_COMPOSE up -d --build
echo -e "${GREEN}✅ Containers started${NC}"

# 6. Setup & Verify
echo -e "\n${YELLOW}[6/6] Final setup...${NC}"
sleep 15

# Run migration
echo -e "${YELLOW}Running database migration...${NC}"
pnpm payload migrate 2>/dev/null || {
    echo -e "${YELLOW}Migration failed, resetting database...${NC}"
    $DOCKER_COMPOSE stop app
    docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" 2>/dev/null || true
    sleep 3
    pnpm payload migrate
    $DOCKER_COMPOSE start app
    sleep 5
}

# Setup Nginx
if [ -f setup-nginx.sh ]; then
    echo -e "${YELLOW}Setting up Nginx...${NC}"
    chmod +x setup-nginx.sh
    ./setup-nginx.sh 2>/dev/null || true
fi

echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  🎉 QUICK DEPLOY COMPLETE! 🎉        ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo -e "\n${GREEN}🌐 Frontend:    http://45.144.178.238${NC}"
echo -e "${GREEN}🔧 Admin Panel: http://45.144.178.238/admin${NC}"
echo -e "\n${YELLOW}📋 Commands:${NC}"
echo -e "   • View logs:    $DOCKER_COMPOSE logs -f"
echo -e "   • Stop:         $DOCKER_COMPOSE down"
echo -e "   • Restart:      $DOCKER_COMPOSE restart"

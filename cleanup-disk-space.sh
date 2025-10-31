#!/bin/bash

# Cleanup Disk Space Script
# This script helps free up disk space on the VPS by cleaning Docker resources

echo "🧹 Cleaning up disk space..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check current disk usage
echo -e "${YELLOW}📊 Current disk usage:${NC}"
df -h

echo ""
echo -e "${YELLOW}[1/5] Stopping containers...${NC}"
docker compose down

echo -e "${YELLOW}[2/5] Removing unused Docker images...${NC}"
docker image prune -a -f

echo -e "${YELLOW}[3/5] Removing unused Docker volumes...${NC}"
docker volume prune -f

echo -e "${YELLOW}[4/5] Removing unused Docker containers...${NC}"
docker container prune -f

echo -e "${YELLOW}[5/5] Removing build cache...${NC}"
docker builder prune -a -f

# Clean Next.js cache if exists
if [ -d ".next" ]; then
  echo -e "${YELLOW}[6/6] Removing .next build cache...${NC}"
  rm -rf .next
fi

# Clean node_modules if exists (optional - be careful)
# Uncomment if you really need space
# if [ -d "node_modules" ]; then
#   echo -e "${YELLOW}[7/7] Removing node_modules (will be reinstalled)...${NC}"
#   rm -rf node_modules
# fi

echo ""
echo -e "${GREEN}✅ Cleanup completed!${NC}"
echo ""
echo -e "${YELLOW}📊 Disk usage after cleanup:${NC}"
df -h

echo ""
echo -e "${GREEN}🚀 You can now try building again:${NC}"
echo "   docker compose build --no-cache app"
echo "   docker compose up -d"


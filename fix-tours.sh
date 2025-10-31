#!/bin/bash

# Fix Tours Booking Pricing Database Schema
# This script updates the tours_booking_pricing table to match the new schema:
# - Makes date_start and date_end nullable
# - Adds number_of_persons field (nullable)

echo "🔧 Fixing Tours Booking Pricing Database Schema..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get PostgreSQL container name
POSTGRES_CONTAINER="sitora-tour-db"

# Check if container exists
if ! docker ps -a --format '{{.Names}}' | grep -q "^${POSTGRES_CONTAINER}$"; then
  echo -e "${RED}❌ PostgreSQL container '${POSTGRES_CONTAINER}' not found!${NC}"
  exit 1
fi

echo -e "${YELLOW}📋 Checking current schema...${NC}"

# Check if tours_booking_pricing table exists
TABLE_EXISTS=$(docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'tours_booking_pricing');" | tr -d ' ')

if [ "$TABLE_EXISTS" != "t" ]; then
  echo -e "${YELLOW}⚠️  Table 'tours_booking_pricing' does not exist yet. It will be created by Payload on first save.${NC}"
  echo -e "${GREEN}✅ No migration needed - Payload will handle table creation${NC}"
  exit 0
fi

# Check and make date_start nullable
if docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -t -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'tours_booking_pricing' AND column_name = 'date_start';" | grep -q "date_start"; then
  echo -e "${YELLOW}🔄 Making 'date_start' nullable in 'tours_booking_pricing'...${NC}"
  docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -c "
    ALTER TABLE tours_booking_pricing 
    ALTER COLUMN date_start DROP NOT NULL;
  " 2>/dev/null || echo -e "${YELLOW}⚠️  'date_start' is already nullable or doesn't exist${NC}"
fi

# Check and make date_end nullable
if docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -t -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'tours_booking_pricing' AND column_name = 'date_end';" | grep -q "date_end"; then
  echo -e "${YELLOW}🔄 Making 'date_end' nullable in 'tours_booking_pricing'...${NC}"
  docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -c "
    ALTER TABLE tours_booking_pricing 
    ALTER COLUMN date_end DROP NOT NULL;
  " 2>/dev/null || echo -e "${YELLOW}⚠️  'date_end' is already nullable or doesn't exist${NC}"
fi

# Check if number_of_persons column already exists
if docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -t -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'tours_booking_pricing' AND column_name = 'number_of_persons';" | grep -q "number_of_persons"; then
  echo -e "${YELLOW}⚠️  Column 'number_of_persons' already exists in 'tours_booking_pricing' table${NC}"
else
  echo -e "${GREEN}➕ Adding 'number_of_persons' column to 'tours_booking_pricing' table...${NC}"
  docker exec $POSTGRES_CONTAINER psql -U postgres -d sitora_tour -c "
    ALTER TABLE tours_booking_pricing 
    ADD COLUMN IF NOT EXISTS number_of_persons INTEGER;
  " 2>/dev/null || echo -e "${YELLOW}⚠️  Could not add column - Payload may handle this automatically${NC}"
fi

echo ""
echo -e "${GREEN}✅ Database schema update completed!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo "1. Restart the app container: docker compose restart app"
echo "2. Check logs: docker logs -f sitora-tour-app"
echo ""


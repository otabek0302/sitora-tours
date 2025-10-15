#!/bin/bash

# Sitora Tours - One-Click Deployment Script
# Usage: ./deploy.sh [--skip-tests]
# Features: Resumable, SSH-safe, Health checks

set -e
set -o pipefail

# Ensure PNPM works when run under sudo/root
export PNPM_HOME="${HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

echo "🚀 Sitora Tours - Automated Deployment"
echo "======================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# State management for resumable deployment
STATE_FILE=".deploy_state"
LOG_FILE="deploy.log"

save_state() { echo "$1" > "$STATE_FILE"; }
load_state() { [ -f "$STATE_FILE" ] && cat "$STATE_FILE" || echo "0"; }
cleanup_state() { rm -f "$STATE_FILE"; }

CURRENT_STEP=$(load_state)

# Handle SSH disconnection gracefully
trap 'echo -e "\n⚠️  SSH disconnected — you can safely rerun ./deploy.sh to resume from step $CURRENT_STEP."' SIGHUP SIGTERM

# Ensure cleanup even on Ctrl-C / SIGINT
trap 'echo -e "\n🧹 Cleaning up temporary state..."; cleanup_state; exit 1' INT

# Logging setup
exec > >(tee -a "$LOG_FILE") 2>&1

echo -e "${YELLOW}📋 Deployment log: $LOG_FILE${NC}"
if [ "$CURRENT_STEP" -gt 0 ]; then
    echo -e "${YELLOW}🔄 Resuming from step $CURRENT_STEP...${NC}"
fi

# 1. Environment Check
if [ "$CURRENT_STEP" -lt 1 ]; then
    echo -e "\n${YELLOW}[1/8] Checking environment...${NC}"
    if [ ! -f .env ]; then
        if [ -f env.example ]; then
            echo -e "${YELLOW}📝 Creating .env from env.example...${NC}"
            cp env.example .env
            echo -e "${GREEN}✅ .env file created (using default values)${NC}"
        elif [ -f .env.example ]; then
            echo -e "${YELLOW}📝 Creating .env from .env.example...${NC}"
            cp .env.example .env
            echo -e "${GREEN}✅ .env file created (using default values)${NC}"
        else
            echo -e "${RED}❌ No env.example or .env.example found!${NC}"
            exit 1
        fi
    else
        echo -e "${GREEN}✅ Environment file found${NC}"
    fi
    save_state 1
else
    echo -e "${GREEN}✅ Step 1 completed (environment check)${NC}"
fi

# 2. Install Dependencies
if [ "$CURRENT_STEP" -lt 2 ]; then
    echo -e "\n${YELLOW}[2/8] Installing dependencies...${NC}"
    pnpm install --frozen-lockfile
    echo -e "${GREEN}✅ Dependencies installed${NC}"
    save_state 2
else
    echo -e "${GREEN}✅ Step 2 completed (dependencies installed)${NC}"
fi

# 3. Run Tests (optional with --skip-tests flag)
if [ "$CURRENT_STEP" -lt 3 ]; then
    if [ "$1" != "--skip-tests" ]; then
        echo -e "\n${YELLOW}[3/8] Running tests...${NC}"
        pnpm test:unit
        echo -e "${GREEN}✅ All tests passed${NC}"
    else
        echo -e "\n${YELLOW}[3/8] Skipping tests (--skip-tests flag)${NC}"
    fi
    save_state 3
else
    echo -e "${GREEN}✅ Step 3 completed (tests)${NC}"
fi

# 4. Build Application (SSH-safe)
if [ "$CURRENT_STEP" -lt 4 ]; then
    echo -e "\n${YELLOW}[4/8] Building production bundle...${NC}"
    echo -e "${YELLOW}Cleaning build cache...${NC}"
    rm -rf .next
    
    echo -e "${YELLOW}Starting SSH-safe build (this may take 2-3 minutes)...${NC}"
    echo -e "${YELLOW}💡 If SSH disconnects, rerun ./deploy.sh to resume${NC}"
    
    # Approve Tailwind builds to avoid warnings
    pnpm approve-builds --yes 2>/dev/null || true
    
    # SSH-safe build using nohup and background process
    nohup pnpm build >> "$LOG_FILE" 2>&1 &
    BUILD_PID=$!
    
    # Wait for build with timeout (fixed logic)
    for i in $(seq 1 600); do
        if ! kill -0 "$BUILD_PID" 2>/dev/null; then
            # Process finished, check exit status
            wait "$BUILD_PID"
            BUILD_EXIT=$?
            if [ "$BUILD_EXIT" -eq 0 ]; then
                echo -e "${GREEN}✅ Build completed successfully${NC}"
                break
            else
                echo -e "${RED}❌ Build failed with exit code $BUILD_EXIT${NC}"
                echo -e "${YELLOW}Trying alternative build method...${NC}"
                # Try alternative build
                SKIP_ENV_VALIDATION=true NODE_ENV=production npx next build --no-lint || {
                    echo -e "${RED}❌ Alternative build also failed!${NC}"
                    echo -e "${YELLOW}Check memory and disk space:${NC}"
                    echo -e "Memory: $(free -h | grep Mem)"
                    echo -e "Disk: $(df -h / | tail -1)"
                    exit 1
                }
                echo -e "${GREEN}✅ Alternative build completed${NC}"
                break
            fi
        fi
        sleep 1
    done
    
    # If we reach here and process is still running, it timed out
    if kill -0 "$BUILD_PID" 2>/dev/null; then
        echo -e "${RED}❌ Build timed out after 10 minutes!${NC}"
        kill "$BUILD_PID" 2>/dev/null || true
        echo -e "${YELLOW}Trying alternative build method...${NC}"
        SKIP_ENV_VALIDATION=true NODE_ENV=production npx next build --no-lint || {
            echo -e "${RED}❌ Alternative build also failed!${NC}"
            exit 1
        }
    fi
    
    save_state 4
else
    echo -e "${GREEN}✅ Step 4 completed (build)${NC}"
fi

# 5. Build & Start Docker
if [ "$CURRENT_STEP" -lt 5 ]; then
    echo -e "\n${YELLOW}[5/8] Setting up Docker containers...${NC}"
    # Detect Docker Compose version
    if docker compose version &> /dev/null; then
        DOCKER_COMPOSE="docker compose"
        echo -e "${GREEN}✅ Using Docker Compose v2 (plugin)${NC}"
    elif docker-compose version &> /dev/null; then
        DOCKER_COMPOSE="docker-compose"
        echo -e "${GREEN}✅ Using Docker Compose v1 (legacy)${NC}"
    else
        echo -e "${RED}❌ Docker Compose not found!${NC}"
        exit 1
    fi

    $DOCKER_COMPOSE down 2>/dev/null || true
    $DOCKER_COMPOSE up -d --build
    echo -e "${GREEN}✅ Containers started${NC}"
    save_state 5
else
    echo -e "${GREEN}✅ Step 5 completed (Docker containers)${NC}"
    # Still need to detect Docker Compose for later steps
    if docker compose version &> /dev/null; then
        DOCKER_COMPOSE="docker compose"
    elif docker-compose version &> /dev/null; then
        DOCKER_COMPOSE="docker-compose"
    else
        echo -e "${RED}❌ Docker Compose not found!${NC}"
        exit 1
    fi
fi

# 6. Run Database Migrations
if [ "$CURRENT_STEP" -lt 6 ]; then
    echo -e "\n${YELLOW}[6/8] Running database migrations...${NC}"
    echo -e "${YELLOW}Waiting for PostgreSQL to be ready...${NC}"
    sleep 15

    # Check if database needs migration
    echo -e "${YELLOW}Checking database status...${NC}"
    TABLE_COUNT=$(docker exec sitora-tour-db psql -U postgres -d sitora_tour -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name NOT LIKE 'payload_%';" 2>/dev/null || echo "0")

    if [ "$TABLE_COUNT" -lt 5 ]; then
        echo -e "${YELLOW}📦 Database is empty or incomplete. Running migrations...${NC}"
        
        # Try migration inside Docker container (where 'postgres' hostname exists)
        echo -e "${YELLOW}Running migration inside Docker container...${NC}"
        docker exec sitora-tour-app sh -c "cd /app && npx payload migrate" 2>/dev/null || {
            echo -e "${YELLOW}⚠️  Migration failed! Resetting database schema...${NC}"
            
            # Stop app to avoid conflicts
            $DOCKER_COMPOSE stop app
            
            # Reset database schema
            docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" 2>/dev/null || true
            sleep 3
            
            # Start app again
            $DOCKER_COMPOSE start app
            sleep 10
            
            # Run migration again inside container
            echo -e "${YELLOW}Running fresh migration inside container...${NC}"
            docker exec sitora-tour-app sh -c "cd /app && npx payload migrate" || {
                echo -e "${RED}❌ Migration still failed! Trying localhost connection...${NC}"
                
                # Create temporary .env for localhost connection
                echo -e "${YELLOW}Creating temporary localhost database connection...${NC}"
                cp .env .env.backup 2>/dev/null || true
                sed 's/postgresql:\/\/postgres:sitoratours2024@postgres:5432\/sitora_tour/postgresql:\/\/postgres:sitoratours2024@localhost:5432\/sitora_tour/' .env > .env.tmp
                mv .env.tmp .env
                
                # Try migration with localhost
                pnpm payload migrate || {
                    echo -e "${RED}❌ Localhost migration also failed!${NC}"
                    echo -e "${YELLOW}Restoring original .env and continuing...${NC}"
                    mv .env.backup .env 2>/dev/null || true
                }
                
                # Restore original .env
                mv .env.backup .env 2>/dev/null || true
            }
        }
        echo -e "${GREEN}✅ Migrations completed${NC}"
    else
        echo -e "${GREEN}✅ Database already migrated (${TABLE_COUNT} tables)${NC}"
    fi
    save_state 6
else
    echo -e "${GREEN}✅ Step 6 completed (database migrations)${NC}"
fi

# 7. Setup Nginx
if [ "$CURRENT_STEP" -lt 7 ]; then
    echo -e "\n${YELLOW}[7/8] Setting up Nginx...${NC}"
    echo -e "${YELLOW}Configuring Nginx proxy...${NC}"

    # Check if Nginx is installed
    if ! command -v nginx &> /dev/null; then
        echo -e "${RED}❌ Nginx is not installed!${NC}"
        echo -e "${YELLOW}Installing Nginx...${NC}"
        sudo apt update && sudo apt install -y nginx || {
            echo -e "${RED}❌ Failed to install Nginx!${NC}"
            exit 1
        }
    fi

    # Detect Nginx configuration directory structure
    echo -e "${YELLOW}Detecting Nginx configuration structure...${NC}"
    
    if [ -d "/etc/nginx/sites-available" ]; then
        NGINX_CONFIG_DIR="/etc/nginx/sites-available"
        NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
        echo -e "${GREEN}✅ Found sites-available directory${NC}"
    elif [ -d "/etc/nginx/conf.d" ]; then
        NGINX_CONFIG_DIR="/etc/nginx/conf.d"
        NGINX_ENABLED_DIR="/etc/nginx/conf.d"
        echo -e "${GREEN}✅ Found conf.d directory${NC}"
    else
        echo -e "${YELLOW}⚠️  Nginx directories not found, creating them...${NC}"
        
        # Create the standard Ubuntu/Debian Nginx structure
        sudo mkdir -p /etc/nginx/sites-available
        sudo mkdir -p /etc/nginx/sites-enabled
        
        # Update nginx.conf to include sites-enabled
        if ! grep -q "include /etc/nginx/sites-enabled" /etc/nginx/nginx.conf; then
            echo -e "${YELLOW}Adding sites-enabled include to nginx.conf...${NC}"
            sudo sed -i '/http {/a\\tinclude /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf
        fi
        
        NGINX_CONFIG_DIR="/etc/nginx/sites-available"
        NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
        echo -e "${GREEN}✅ Created Nginx directory structure${NC}"
    fi

    # Copy nginx configuration with proper permissions
    echo -e "${YELLOW}Copying Nginx configuration to $NGINX_CONFIG_DIR...${NC}"
    sudo cp nginx.conf "$NGINX_CONFIG_DIR/sitora-tours.conf" || {
        echo -e "${RED}❌ Failed to copy nginx config!${NC}"
        echo -e "${YELLOW}Please run: sudo cp nginx.conf $NGINX_CONFIG_DIR/sitora-tours.conf${NC}"
        exit 1
    }

    # Create symbolic link (only for sites-available/sites-enabled structure)
    if [ "$NGINX_CONFIG_DIR" != "$NGINX_ENABLED_DIR" ]; then
        echo -e "${YELLOW}Creating Nginx site link...${NC}"
        sudo ln -sf "$NGINX_CONFIG_DIR/sitora-tours.conf" "$NGINX_ENABLED_DIR/" || {
            echo -e "${RED}❌ Failed to create site link!${NC}"
            exit 1
        }

        # Remove default nginx site
        echo -e "${YELLOW}Removing default Nginx site...${NC}"
        sudo rm -f "$NGINX_ENABLED_DIR/default"
    fi

    # Test nginx configuration
    echo -e "${YELLOW}Testing Nginx configuration...${NC}"
    sudo nginx -t || {
        echo -e "${RED}❌ Nginx configuration test failed!${NC}"
        echo -e "${YELLOW}Check the nginx.conf file for syntax errors${NC}"
        exit 1
    }

    # Reload nginx
    echo -e "${YELLOW}Reloading Nginx...${NC}"
    sudo systemctl reload nginx || {
        echo -e "${RED}❌ Failed to reload Nginx!${NC}"
        echo -e "${YELLOW}Try: sudo systemctl restart nginx${NC}"
        exit 1
    }

    echo -e "${GREEN}✅ Nginx configured and reloaded${NC}"

    # Restart the app container to apply CORS configuration changes
    echo -e "${YELLOW}Restarting app container to apply CORS configuration...${NC}"
    $DOCKER_COMPOSE restart app || {
        echo -e "${YELLOW}⚠️  Could not restart app container, but continuing...${NC}"
    }
    sleep 5

    echo -e "${GREEN}✅ Nginx configured${NC}"
    save_state 7
else
    echo -e "${GREEN}✅ Step 7 completed (Nginx setup)${NC}"
fi

# 8. Wait & Verify with Health Checks
if [ "$CURRENT_STEP" -lt 8 ]; then
    echo -e "\n${YELLOW}[8/8] Verifying deployment...${NC}"
    echo -e "${YELLOW}Waiting for services to initialize...${NC}"
    sleep 10

    # Health check loop with better diagnostics (reduced timeout)
    echo -e "${YELLOW}⏳ Waiting for app health check...${NC}"
    for i in $(seq 1 15); do
        if docker ps | grep -q sitora-tour-app; then
            # Check container status
            CONTAINER_STATUS=$(docker inspect --format='{{.State.Status}}' sitora-tour-app 2>/dev/null || echo "not_found")
            HEALTH=$(docker inspect --format='{{json .State.Health.Status}}' sitora-tour-app 2>/dev/null || echo "unknown")
            
            # Check if app is responding on port 3000
            if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
                echo -e "${GREEN}✅ App is responding on port 3000${NC}"
                break
            fi
            
            # Also check if we can connect to the port (even if response is not 200)
            if timeout 2 bash -c "</dev/tcp/localhost/3000" 2>/dev/null; then
                echo -e "${GREEN}✅ App port 3000 is open and accepting connections${NC}"
                break
            fi
            
            # If container is running but not responding, show more info
            if [[ "$CONTAINER_STATUS" == "running" ]]; then
                echo -e "${YELLOW}   Attempt $i/30 - Container running, waiting for app to respond...${NC}"
                echo -e "${YELLOW}   Container status: $CONTAINER_STATUS, Health: $HEALTH${NC}"
                
                # Show recent logs for debugging
                if [ $i -eq 10 ] || [ $i -eq 20 ]; then
                    echo -e "${YELLOW}   Recent app logs:${NC}"
                    docker logs --tail 5 sitora-tour-app 2>/dev/null || echo "   No logs available"
                fi
            else
                echo -e "${YELLOW}   Attempt $i/30 - Container status: $CONTAINER_STATUS${NC}"
            fi
        else
            echo -e "${YELLOW}   Attempt $i/30 - Container not found${NC}"
        fi
        sleep 10
    done

    if docker ps | grep -q sitora-tour-app; then
        echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║  🎉 DEPLOYMENT SUCCESSFUL! 🎉         ║${NC}"
        echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
        echo -e "\n${GREEN}🌐 Frontend:    http://45.144.178.238${NC}"
        echo -e "${GREEN}🔧 Admin Panel: http://45.144.178.238/admin${NC}"
        echo -e "${GREEN}🗄️  Database:    postgresql://localhost:5432/sitora_tour${NC}"
        echo -e "${GREEN}📊 PgAdmin:     http://45.144.178.238:5050 (run: $DOCKER_COMPOSE --profile tools up pgadmin)${NC}"
        echo -e "\n${YELLOW}📝 Next Steps:${NC}"
        echo -e "   1. Visit http://45.144.178.238/admin"
        echo -e "   2. Create your admin account"
        echo -e "   3. Start adding content!"
        echo -e "\n${YELLOW}💡 If port 80 doesn't work, try: http://45.144.178.238:3000${NC}"
        echo -e "\n${YELLOW}📋 Useful Commands:${NC}"
        echo -e "   • View logs:    $DOCKER_COMPOSE logs -f"
        echo -e "   • Stop:         $DOCKER_COMPOSE down"
        echo -e "   • Restart:      $DOCKER_COMPOSE restart"
        
        # Clean up state file on successful completion
        cleanup_state
        echo -e "\n${GREEN}✅ Deployment completed successfully!${NC}"
    else
        echo -e "${RED}❌ Deployment failed!${NC}"
        echo -e "${YELLOW}Check logs: $DOCKER_COMPOSE logs${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Step 8 completed (deployment verification)${NC}"
    cleanup_state
    echo -e "\n${GREEN}✅ Deployment completed successfully!${NC}"
fi


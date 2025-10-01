# 🚀 Quick Deployment Guide

## ⚡ TL;DR - 3 Steps to Production

### 1️⃣ Set Environment Variables
```bash
cp .env.example .env
# Edit .env with your production values
```

### 2️⃣ Deploy with Docker
```bash
make deploy
# OR manually:
# bash scripts/deploy.sh
```

### 3️⃣ Access Your Site
- **Frontend**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 🐳 Docker Commands

```bash
# Development
docker-compose up -d              # Start dev environment
docker-compose down               # Stop containers

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down

# Or use Makefile:
make docker-up         # Development
make docker-prod       # Production
make logs              # View logs
make backup            # Backup database
```

---

## 📋 Environment Variables (Required)

### Minimum Configuration:
```env
DATABASE_URI=postgresql://postgres:password@postgres:5432/sitora_tour
PAYLOAD_SECRET=generate-random-32-char-string
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
```

### With Telegram (Recommended):
```env
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
NEXT_PUBLIC_TELEGRAM_CHAT_ID=123456789
```

**Generate Secret:**
```bash
openssl rand -base64 32
```

---

## 🌐 Deployment Options

### Option 1: Vercel (Easiest) ⭐
1. Push code to GitHub ✅ (Already done!)
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy! 🚀

**Pros:**
- ✅ One-click deployment
- ✅ Auto SSL
- ✅ Global CDN
- ✅ Free tier available

### Option 2: Docker (Full Control)
```bash
# Quick deploy
make deploy

# Or step by step:
docker build -t sitora-tour:latest .
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: Traditional VPS
```bash
git clone your-repo
pnpm install
pnpm build
pm2 start "pnpm start" --name sitora-tour
```

---

## ✅ Post-Deployment Checklist

- [ ] Create admin user at `/admin`
- [ ] Upload media files
- [ ] Add categories, cities
- [ ] Create tours, cars, hotels
- [ ] Test booking forms
- [ ] Test Telegram notifications
- [ ] Verify all pages load
- [ ] Test mobile responsiveness

---

## 🔧 Makefile Commands

```bash
make help           # Show all commands
make install        # Install dependencies
make dev            # Start development
make build          # Build for production
make test           # Run all tests
make deploy         # Full production deployment
make backup         # Backup database
make logs           # View logs
make clean          # Clean build files
```

---

## 📱 Telegram Bot Setup (5 minutes)

1. **Create Bot:**
   - Message [@BotFather](https://t.me/botfather)
   - Send `/newbot`
   - Copy the token

2. **Get Chat ID:**
   - Start chat with your bot
   - Send any message
   - Visit: `https://api.telegram.org/bot{TOKEN}/getUpdates`
   - Copy the chat ID from response

3. **Add to .env:**
   ```env
   NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_token_here
   NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id_here
   ```

---

## 🚨 Troubleshooting

### Container won't start:
```bash
docker-compose logs app
```

### Database connection failed:
```bash
# Check if postgres is healthy
docker-compose ps
# Should show "healthy" status
```

### Port 3000 already in use:
```bash
# Find process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Reset everything:
```bash
docker-compose down -v  # Remove volumes
docker system prune -a  # Clean Docker
make clean             # Clean local files
```

---

## 📊 Monitoring

### Check application health:
```bash
curl http://localhost:3000/api/health
```

### View logs:
```bash
make logs           # Development
make logs-prod      # Production
```

### Database access:
```bash
# Start PgAdmin
make pgadmin
# Then visit: http://localhost:5050
# Login: admin@sitoratours.com / admin
```

---

## 🎉 That's It!

Your Sitora Tours platform is now deployed and ready to use!

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.


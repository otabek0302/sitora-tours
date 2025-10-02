# 🌍 Sitora Tours - Travel Agency Platform

A modern, full-stack travel booking platform built with Next.js 15, Payload CMS, and TypeScript.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Payload CMS](https://img.shields.io/badge/Payload%20CMS-3.56-red)](https://payloadcms.com/)

## ✨ Features

### 🎨 Frontend Features
- 🌐 **Multi-language Support** (English, Russian, Uzbek)
- 🎨 **Modern UI/UX** with custom Sitora design system
- 📱 **Fully Responsive** (Mobile, Tablet, Desktop)
- 🌓 **Dark/Light Mode** support
- ⚡ **Optimized Performance** (Image optimization, code splitting)
- ♿ **Accessible** (WCAG compliant components)

### 🏗️ Core Functionality
- 🗺️ **Tour Management** - Browse, filter, and book tours
- 🚗 **Car Rentals** - Reserve vehicles with detailed specs
- 🏨 **Hotel Bookings** - Discover accommodations
- 🌆 **City Guides** - Explore destinations
- ⭐ **Review System** - Auto-calculated ratings from customer feedback
- 📧 **Contact Forms** - Telegram integration for inquiries
- 🎯 **Smart Filtering** - By category, price, duration, capacity

### 🔧 Admin Panel (Payload CMS)
- 👥 **User Management** - Role-based access control
- 📝 **Content Management** - Tours, cars, hotels, cities
- 🖼️ **Media Library** - Image/video upload (jpg, png, mp4 only)
- 🌍 **Localization** - Manage content in 3 languages
- 📊 **Reviews Management** - Moderate customer feedback
- 🎛️ **Page Builder** - Configure homepage sections

### 🤖 Automation
- ⭐ **Auto-Rating Calculation** - Reviews automatically update tour ratings
- 📱 **Telegram Notifications** - For bookings and contact forms
- 🔄 **Real-time Updates** - Live preview of changes

## 🚀 Quick Start

### Prerequisites
- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- PostgreSQL 14+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/otabek0302/sitora-tours.git
   cd sitora-tours
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

That's it! 🎉

## 📚 Documentation

- **[Deployment Guide](./DEPLOYMENT.md)** - Complete deployment instructions
- **[Test Documentation](./tests/README.md)** - Testing guide and coverage

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run integration tests
pnpm test:int

# Run E2E tests
pnpm test:e2e

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

**Test Coverage:** 140 tests across E2E, Integration, and Unit tests

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.4** - React framework
- **React 19** - UI library
- **TypeScript 5.7** - Type safety
- **Tailwind CSS 4** - Styling
- **next-intl** - Internationalization
- **Zustand** - State management
- **Radix UI** - Accessible components

### Backend
- **Payload CMS 3.56** - Headless CMS
- **PostgreSQL** - Database
- **Zod** - Schema validation
- **Sharp** - Image processing

### Developer Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Playwright** - E2E testing
- **Vitest** - Unit/Integration testing
- **Docker** - Containerization

## 📁 Project Structure

```
sitora-tour/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── (frontend)/        # Public pages
│   │   └── (payload)/         # Admin panel
│   ├── collections/           # Payload CMS collections
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer
│   │   ├── pages/            # Page-specific components
│   │   └── ui/               # Reusable UI components
│   ├── lib/                   # Core logic
│   │   ├── api/              # API clients
│   │   ├── schemas/          # Zod schemas
│   │   ├── stores/           # Zustand stores
│   │   └── utils/            # Utility functions
│   ├── locales/              # Translation files
│   └── globals/              # Global configurations
├── tests/                     # Test suites
├── media/                     # Uploaded media files
└── public/                    # Static assets
```

## 🎨 Design System

The application uses a custom "Sitora" design system:
- **Primary Color**: #ff0000 (Red)
- **Gold Accents**: #d4af37
- **Border Radius**: 32px (main), 26px (nested), rounded-full (icons)
- **Typography**: Custom scale with responsive sizes
- **Spacing**: Consistent padding/margins
- **100% Design Consistency** across all pages

## 🔑 Environment Variables

See [.env.example](./.env.example) for all required variables.

**Required:**
- `DATABASE_URI` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Secret key for Payload CMS

**Optional:**
- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` - For notifications
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID` - For notifications

## 🐳 Docker Development

If you prefer Docker for local development:

```bash
docker-compose up
```

This will start:
- Next.js app on port 3000
- PostgreSQL on port 5432
- PgAdmin on port 5050 (optional)

### Docker Setup Steps:

1. Ensure `.env` file exists with correct values
2. Start containers: `docker-compose up -d`
3. Access the application at http://localhost:3000
4. Access PgAdmin at http://localhost:5050 (if using `--profile tools`)

---

## 🌐 VPS Deployment (Subpath)

Deploy Sitora Tours on a VPS alongside other projects using Nginx reverse proxy.

### Quick Deploy to VPS with Subpath

**Example:** Deploy to `http://5.35.86.229/sitora/`

**Port Allocation:**
- Pay Verify: Port 8000 → `/`
- Sitora Tours: Port 3000 → `/sitora/`

**Steps:**

1. **Set environment variables** in `.env` on VPS:
   ```env
   NEXT_PUBLIC_BASE_PATH=/sitora
   NEXT_PUBLIC_SERVER_URL=http://5.35.86.229/sitora
   NEXT_PUBLIC_API_URL=http://5.35.86.229/sitora
   ```

2. **Upload and build**:
   ```bash
   # On VPS
   cd /var/www/sitora-tour
   git pull origin master
   docker compose up -d --build
   pnpm payload migrate
   ```

3. **Configure Nginx** (copy from `nginx-vps.conf`):
   ```bash
   sudo nano /etc/nginx/sites-available/sitora-tour
   # Paste content from nginx-vps.conf
   sudo ln -s /etc/nginx/sites-available/sitora-tour /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   ```

4. **Access**: http://5.35.86.229/sitora/

📌 **Note:** Sitora Tours runs on port 3000, proxied through Nginx to `/sitora/` path.

```bash
# Start with PgAdmin
docker-compose --profile tools up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

## 🗄️ Database Setup (PostgreSQL)

### Local PostgreSQL

1. **Install PostgreSQL** (if not already installed)
   ```bash
   # macOS
   brew install postgresql@16
   
   # Ubuntu/Debian
   sudo apt-get install postgresql-16
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database**
   ```bash
   createdb sitora_tour
   ```

3. **Update .env**
   ```env
   DATABASE_URI=postgresql://postgres:password@localhost:5432/sitora_tour
   ```

4. **Run Migrations** (if any)
   ```bash
   pnpm payload migrate
   ```

### Using Docker

Alternatively, you can use [Docker](https://www.docker.com) to run PostgreSQL:

1. Ensure `.env` file exists with correct database connection string
2. Start Docker containers: `docker-compose up -d`
3. Access application at http://localhost:3000
4. Create your first admin user at http://localhost:3000/admin

That's it! The Docker instance will help you get up and running quickly while also standardizing the development environment across your teams.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).

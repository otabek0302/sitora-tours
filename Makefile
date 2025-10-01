.PHONY: help install dev build start test docker-up docker-down docker-prod deploy backup clean

help: ## Show this help message
	@echo "Sitora Tours - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

dev: ## Start development server
	pnpm dev

build: ## Build for production
	pnpm build

start: ## Start production server
	pnpm start

test: ## Run all tests
	pnpm test

test-unit: ## Run unit tests only
	pnpm test:unit

test-int: ## Run integration tests only
	pnpm test:int

test-e2e: ## Run E2E tests only
	pnpm test:e2e

lint: ## Run linter
	pnpm lint

format: ## Format code
	pnpm format

docker-up: ## Start development with Docker
	docker-compose up -d

docker-down: ## Stop Docker containers
	docker-compose down

docker-prod: ## Start production with Docker
	docker-compose -f docker-compose.prod.yml up -d

docker-build: ## Build production Docker image
	docker build -t sitora-tour:latest .

deploy: ## Deploy to production (runs tests, build, and starts containers)
	@bash scripts/deploy.sh

backup: ## Backup database
	@bash scripts/backup-db.sh

logs: ## Show Docker logs
	docker-compose logs -f

logs-prod: ## Show production Docker logs
	docker-compose -f docker-compose.prod.yml logs -f

clean: ## Clean build artifacts
	rm -rf .next
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage

pgadmin: ## Start PgAdmin (database management tool)
	docker-compose --profile tools up pgadmin -d

generate-types: ## Generate Payload types
	pnpm generate:types

generate-importmap: ## Generate import map
	pnpm generate:importmap


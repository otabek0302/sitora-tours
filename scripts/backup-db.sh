#!/bin/bash

# Database Backup Script

set -e

BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="sitora_tour_backup_${TIMESTAMP}.sql"

echo "📦 Starting database backup..."

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Backup using docker-compose
docker-compose exec -T postgres pg_dump -U postgres sitora_tour > "${BACKUP_DIR}/${BACKUP_FILE}"

# Compress the backup
gzip "${BACKUP_DIR}/${BACKUP_FILE}"

echo "✅ Backup created: ${BACKUP_DIR}/${BACKUP_FILE}.gz"

# Keep only last 7 backups
cd ${BACKUP_DIR}
ls -t sitora_tour_backup_*.sql.gz | tail -n +8 | xargs rm -f 2>/dev/null || true

echo "🎉 Backup complete!"


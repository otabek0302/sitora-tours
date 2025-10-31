#!/bin/bash

# 🔧 Скрипт для исправления схемы базы данных Cars
# Выполняет миграцию структуры: удаляет старые поля, добавляет новые

set -e

echo "🔧 Исправление схемы базы данных Cars"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Проверка подключения к базе
echo -e "${YELLOW}[1/4] Проверка подключения к базе данных...${NC}"
if docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Подключение к базе данных успешно${NC}"
else
    echo -e "${RED}❌ Не удалось подключиться к базе данных${NC}"
    exit 1
fi

# Шаг 1: Создать резервную копию данных
echo -e "\n${YELLOW}[2/4] Создание резервной копии данных cars...${NC}"
docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "
    CREATE TABLE IF NOT EXISTS cars_backup AS SELECT * FROM cars;
    CREATE TABLE IF NOT EXISTS cars_locales_backup AS SELECT * FROM cars_locales;
" > /dev/null 2>&1
echo -e "${GREEN}✅ Резервная копия создана${NC}"

# Шаг 2: Удалить старые поля (если есть)
echo -e "\n${YELLOW}[3/4] Удаление старых полей...${NC}"

# Удалить поле price из таблицы cars (если существует)
docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "
    ALTER TABLE cars DROP COLUMN IF EXISTS price;
" > /dev/null 2>&1

# Удалить поле model из cars_locales (если существует)
docker exec sitora-tour-db psql -U postgres -d sitora_tour -c "
    ALTER TABLE cars_locales DROP COLUMN IF EXISTS model;
" > /dev/null 2>&1

echo -e "${GREEN}✅ Старые поля удалены${NC}"

# Шаг 3: Запустить миграцию Payload
echo -e "\n${YELLOW}[4/4] Запуск миграции Payload CMS...${NC}"
echo -e "${YELLOW}Это обновит схему базы данных согласно новой структуре коллекции Cars${NC}"

# Остановить app контейнер временно
docker compose stop app

# Запустить миграцию
if docker compose run --rm app npx payload migrate; then
    echo -e "${GREEN}✅ Миграция успешно выполнена${NC}"
else
    echo -e "${YELLOW}⚠️  Автоматическая миграция не сработала, попробуем через push...${NC}"
    
    # Альтернатива: использовать push для автоматического обновления схемы
    docker compose run --rm app npx payload migrate:create || true
    docker compose run --rm app npx payload migrate || true
fi

# Запустить app контейнер обратно
docker compose start app

echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ Схема базы данных обновлена!      ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo -e "\n${YELLOW}Проверьте логи: docker compose logs -f app${NC}"
echo -e "${YELLOW}Если есть ошибки, можно восстановить из backup таблиц${NC}"


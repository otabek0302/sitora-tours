-- Миграция схемы таблицы cars
-- Обновляет структуру: удаляет старые поля и добавляет новые для pricing

-- 1. Удалить старое поле price из таблицы cars (если существует)
ALTER TABLE cars DROP COLUMN IF EXISTS price;

-- 2. Удалить поле model из cars_locales (если существует)  
ALTER TABLE cars_locales DROP COLUMN IF EXISTS model;

-- 3. Добавить новые поля для pricing в таблицу cars
ALTER TABLE cars ADD COLUMN IF NOT EXISTS pricing_price_per_day_in_city numeric;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS pricing_transfer_airport_hotel_airport numeric;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS pricing_transfer_hotel_dinner_hotel numeric;
ALTER TABLE cars ADD COLUMN IF NOT EXISTS pricing_long_route_from7_days numeric;


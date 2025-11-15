import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tours_tour_type" AS ENUM('local', 'abroad');
  CREATE TABLE "countries_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "countries_cities_locales" (
  	"city" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_statistics_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_recommended_local_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_recommended_abroad_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_recommended_tours" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_recommended_tours" CASCADE;
  ALTER TABLE "users_sessions" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "media" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "media" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "categories_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "cities" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "cities" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "cities" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "cities_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_locations" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_locations" ALTER COLUMN "from_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_locations" ALTER COLUMN "to_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_locations" ALTER COLUMN "from_time" DROP NOT NULL;
  ALTER TABLE "tours_locations" ALTER COLUMN "to_time" DROP NOT NULL;
  ALTER TABLE "tours_locations" ALTER COLUMN "duration" DROP NOT NULL;
  ALTER TABLE "tours_accommodation" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_accommodation" ALTER COLUMN "city_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_itinerary" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_services_included" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_services_not_included" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_booking_pricing" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_booking_pricing" ALTER COLUMN "date_start" DROP NOT NULL;
  ALTER TABLE "tours_booking_pricing" ALTER COLUMN "date_end" DROP NOT NULL;
  ALTER TABLE "tours_images" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_images" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "tours" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "tours" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "tours" ALTER COLUMN "category_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_rels" ALTER COLUMN "cities_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_rels" ALTER COLUMN "hotels_id" SET DATA TYPE uuid;
  ALTER TABLE "hotels_features" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hotels_images" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "hotels_images" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "hotels" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "hotels" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "hotels" ALTER COLUMN "city_id" SET DATA TYPE uuid;
  ALTER TABLE "hotels" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "hotels_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "cars_images" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "cars_images" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "cars" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "cars" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "cars" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "cars_locales" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "reviews" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "reviews" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "reviews" ALTER COLUMN "tour_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "users_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "media_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "categories_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "cities_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "tours_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hotels_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "cars_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "reviews_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "users_id" SET DATA TYPE uuid;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "pages_blocks_hero_posts" ALTER COLUMN "review_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_hero_posts" ALTER COLUMN "video_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "image_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_special_offers" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_special_offers" ALTER COLUMN "tours_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_special_offers" ALTER COLUMN "tours_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_recommended_cities" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_blocks_recommended_cars" ALTER COLUMN "_parent_id" SET DATA TYPE uuid;
  ALTER TABLE "pages" ALTER COLUMN "id" SET DATA TYPE uuid;
  ALTER TABLE "pages" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
  ALTER TABLE "pages_rels" ALTER COLUMN "parent_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_rels" ALTER COLUMN "tours_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_rels" ALTER COLUMN "cities_id" SET DATA TYPE uuid;
  ALTER TABLE "pages_rels" ALTER COLUMN "cars_id" SET DATA TYPE uuid;
  ALTER TABLE "tours_booking_pricing" ADD COLUMN "number_of_persons" numeric;
  ALTER TABLE "tours" ADD COLUMN "tour_type" "enum_tours_tour_type" DEFAULT 'local' NOT NULL;
  ALTER TABLE "tours_rels" ADD COLUMN "countries_id" uuid;
  ALTER TABLE "hotels" ADD COLUMN "website" varchar;
  ALTER TABLE "hotels" ADD COLUMN "email" varchar;
  ALTER TABLE "cars" ADD COLUMN "pricing_price_per_day_in_city" numeric NOT NULL;
  ALTER TABLE "cars" ADD COLUMN "pricing_transfer_airport_hotel_airport" numeric;
  ALTER TABLE "cars" ADD COLUMN "pricing_transfer_hotel_dinner_hotel" numeric;
  ALTER TABLE "cars" ADD COLUMN "pricing_long_route_from7_days" numeric;
  ALTER TABLE "cars_locales" ADD COLUMN "description" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_price_per_day_in_city_label" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_price_per_day_in_city_suffix" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_transfer_airport_hotel_airport_label" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_transfer_airport_hotel_airport_suffix" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_transfer_hotel_dinner_hotel_label" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_transfer_hotel_dinner_hotel_suffix" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_long_route_from7_days_label" varchar;
  ALTER TABLE "cars_locales" ADD COLUMN "pricing_long_route_from7_days_suffix" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "countries_id" uuid;
  ALTER TABLE "countries_cities" ADD CONSTRAINT "countries_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_cities_locales" ADD CONSTRAINT "countries_cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_statistics" ADD CONSTRAINT "pages_blocks_stats_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_statistics_locales" ADD CONSTRAINT "pages_blocks_stats_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recommended_local_tours" ADD CONSTRAINT "pages_blocks_recommended_local_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recommended_abroad_tours" ADD CONSTRAINT "pages_blocks_recommended_abroad_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "countries_cities_order_idx" ON "countries_cities" USING btree ("_order");
  CREATE INDEX "countries_cities_parent_id_idx" ON "countries_cities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "countries_cities_locales_locale_parent_id_unique" ON "countries_cities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "countries_name_idx" ON "countries_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "countries_locales_locale_parent_id_unique" ON "countries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_statistics_order_idx" ON "pages_blocks_stats_statistics" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_statistics_parent_id_idx" ON "pages_blocks_stats_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_stats_statistics_locales_locale_parent_id_unique" ON "pages_blocks_stats_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_recommended_local_tours_order_idx" ON "pages_blocks_recommended_local_tours" USING btree ("_order");
  CREATE INDEX "pages_blocks_recommended_local_tours_parent_id_idx" ON "pages_blocks_recommended_local_tours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recommended_local_tours_path_idx" ON "pages_blocks_recommended_local_tours" USING btree ("_path");
  CREATE INDEX "pages_blocks_recommended_abroad_tours_order_idx" ON "pages_blocks_recommended_abroad_tours" USING btree ("_order");
  CREATE INDEX "pages_blocks_recommended_abroad_tours_parent_id_idx" ON "pages_blocks_recommended_abroad_tours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recommended_abroad_tours_path_idx" ON "pages_blocks_recommended_abroad_tours" USING btree ("_path");
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "tours_rels_countries_id_idx" ON "tours_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  ALTER TABLE "cars" DROP COLUMN "price";
  ALTER TABLE "cars_locales" DROP COLUMN "model";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_recommended_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "countries_cities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "countries_cities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "countries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "countries_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_statistics" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_statistics_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_recommended_local_tours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_recommended_abroad_tours" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "countries_cities" CASCADE;
  DROP TABLE "countries_cities_locales" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "countries_locales" CASCADE;
  DROP TABLE "pages_blocks_stats_statistics" CASCADE;
  DROP TABLE "pages_blocks_stats_statistics_locales" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_recommended_local_tours" CASCADE;
  DROP TABLE "pages_blocks_recommended_abroad_tours" CASCADE;
  ALTER TABLE "tours_rels" DROP CONSTRAINT "tours_rels_countries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_countries_fk";
  
  DROP INDEX "tours_rels_countries_id_idx";
  DROP INDEX "payload_locked_documents_rels_countries_id_idx";
  ALTER TABLE "users_sessions" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "media" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "media" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "categories" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "categories" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "categories_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "cities" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "cities" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "cities" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "cities_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_locations" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_locations" ALTER COLUMN "from_id" SET DATA TYPE integer;
  ALTER TABLE "tours_locations" ALTER COLUMN "to_id" SET DATA TYPE integer;
  ALTER TABLE "tours_locations" ALTER COLUMN "from_time" SET NOT NULL;
  ALTER TABLE "tours_locations" ALTER COLUMN "to_time" SET NOT NULL;
  ALTER TABLE "tours_locations" ALTER COLUMN "duration" SET NOT NULL;
  ALTER TABLE "tours_accommodation" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_accommodation" ALTER COLUMN "city_id" SET DATA TYPE integer;
  ALTER TABLE "tours_itinerary" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_services_included" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_services_not_included" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_booking_pricing" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_booking_pricing" ALTER COLUMN "date_start" SET NOT NULL;
  ALTER TABLE "tours_booking_pricing" ALTER COLUMN "date_end" SET NOT NULL;
  ALTER TABLE "tours_images" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_images" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "tours" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "tours" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "tours" ALTER COLUMN "category_id" SET DATA TYPE integer;
  ALTER TABLE "tours_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "tours_rels" ALTER COLUMN "cities_id" SET DATA TYPE integer;
  ALTER TABLE "tours_rels" ALTER COLUMN "hotels_id" SET DATA TYPE integer;
  ALTER TABLE "hotels_features" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "hotels_images" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "hotels_images" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "hotels" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "hotels" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "hotels" ALTER COLUMN "city_id" SET DATA TYPE integer;
  ALTER TABLE "hotels" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "hotels_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "cars_images" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "cars_images" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "cars" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "cars" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "cars" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "cars_locales" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "reviews" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "reviews" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "reviews" ALTER COLUMN "tour_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_locked_documents" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "users_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "media_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "categories_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "cities_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "tours_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "hotels_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "cars_id" SET DATA TYPE integer;
  ALTER TABLE "payload_locked_documents_rels" ALTER COLUMN "reviews_id" SET DATA TYPE integer;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_preferences" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "payload_preferences_rels" ALTER COLUMN "users_id" SET DATA TYPE integer;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "payload_migrations" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero_posts" ALTER COLUMN "review_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_hero_posts" ALTER COLUMN "video_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "image_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_faq" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_special_offers" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_special_offers" ALTER COLUMN "tours_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_special_offers" ALTER COLUMN "tours_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_recommended_cities" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages_blocks_recommended_cars" ALTER COLUMN "_parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages" ALTER COLUMN "id" SET DATA TYPE serial;
  ALTER TABLE "pages" ALTER COLUMN "id" DROP DEFAULT;
  ALTER TABLE "pages_rels" ALTER COLUMN "parent_id" SET DATA TYPE integer;
  ALTER TABLE "pages_rels" ALTER COLUMN "tours_id" SET DATA TYPE integer;
  ALTER TABLE "pages_rels" ALTER COLUMN "cities_id" SET DATA TYPE integer;
  ALTER TABLE "pages_rels" ALTER COLUMN "cars_id" SET DATA TYPE integer;
  ALTER TABLE "cars" ADD COLUMN "price" numeric NOT NULL;
  ALTER TABLE "cars_locales" ADD COLUMN "model" varchar NOT NULL;
  ALTER TABLE "pages_blocks_recommended_tours" ADD CONSTRAINT "pages_blocks_recommended_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_recommended_tours_order_idx" ON "pages_blocks_recommended_tours" USING btree ("_order");
  CREATE INDEX "pages_blocks_recommended_tours_parent_id_idx" ON "pages_blocks_recommended_tours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recommended_tours_path_idx" ON "pages_blocks_recommended_tours" USING btree ("_path");
  ALTER TABLE "tours_booking_pricing" DROP COLUMN "number_of_persons";
  ALTER TABLE "tours" DROP COLUMN "tour_type";
  ALTER TABLE "tours_rels" DROP COLUMN "countries_id";
  ALTER TABLE "hotels" DROP COLUMN "website";
  ALTER TABLE "hotels" DROP COLUMN "email";
  ALTER TABLE "cars" DROP COLUMN "pricing_price_per_day_in_city";
  ALTER TABLE "cars" DROP COLUMN "pricing_transfer_airport_hotel_airport";
  ALTER TABLE "cars" DROP COLUMN "pricing_transfer_hotel_dinner_hotel";
  ALTER TABLE "cars" DROP COLUMN "pricing_long_route_from7_days";
  ALTER TABLE "cars_locales" DROP COLUMN "description";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_price_per_day_in_city_label";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_price_per_day_in_city_suffix";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_transfer_airport_hotel_airport_label";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_transfer_airport_hotel_airport_suffix";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_transfer_hotel_dinner_hotel_label";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_transfer_hotel_dinner_hotel_suffix";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_long_route_from7_days_label";
  ALTER TABLE "cars_locales" DROP COLUMN "pricing_long_route_from7_days_suffix";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "countries_id";
  DROP TYPE "public"."enum_tours_tour_type";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('uz', 'ru', 'en');
  CREATE TYPE "public"."enum_hotels_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cities_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries_locales" (
  	"name" varchar NOT NULL,
  	"description" text,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "countries_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "countries_cities_locales" (
  	"city" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tours_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from_id" integer NOT NULL,
  	"to_id" integer NOT NULL,
  	"from_time" varchar NOT NULL,
  	"to_time" varchar NOT NULL,
  	"duration" varchar NOT NULL
  );
  
  CREATE TABLE "tours_locations_locales" (
  	"transport" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tours_accommodation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"city_id" integer NOT NULL
  );
  
  CREATE TABLE "tours_itinerary_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tours_itinerary_activities_locales" (
  	"activity" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tours_itinerary" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tours_itinerary_locales" (
  	"day" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tours_services_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tours_services_included_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tours_services_not_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tours_services_not_included_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tours_booking_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date_start" timestamp(3) with time zone NOT NULL,
  	"date_end" timestamp(3) with time zone NOT NULL,
  	"price_per_person" numeric NOT NULL
  );
  
  CREATE TABLE "tours_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "tours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"duration_days" numeric NOT NULL,
  	"duration_nights" numeric NOT NULL,
  	"price" numeric NOT NULL,
  	"category_id" integer NOT NULL,
  	"rating" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tours_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tours_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"cities_id" integer,
  	"countries_id" integer,
  	"hotels_id" integer
  );
  
  CREATE TABLE "hotels_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "hotels_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "hotels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"city_id" integer NOT NULL,
  	"phone" varchar NOT NULL,
  	"rating" "enum_hotels_rating",
  	"image_id" integer NOT NULL,
  	"policies_check_in" varchar NOT NULL,
  	"policies_check_out" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "hotels_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"address" varchar,
  	"policies_cancellation" varchar,
  	"policies_pet" varchar,
  	"policies_children" varchar,
  	"policies_payment" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cars_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "cars" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"brand" varchar NOT NULL,
  	"capacity" numeric NOT NULL,
  	"pricing_price_per_day_in_city" numeric NOT NULL,
  	"pricing_transfer_airport_hotel_airport" numeric,
  	"pricing_transfer_hotel_dinner_hotel" numeric,
  	"pricing_long_route_from7_days" numeric,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cars_locales" (
  	"name" varchar NOT NULL,
  	"type" varchar NOT NULL,
  	"description" text,
  	"pricing_price_per_day_in_city_label" varchar,
  	"pricing_price_per_day_in_city_suffix" varchar,
  	"pricing_transfer_airport_hotel_airport_label" varchar,
  	"pricing_transfer_airport_hotel_airport_suffix" varchar,
  	"pricing_transfer_hotel_dinner_hotel_label" varchar,
  	"pricing_transfer_hotel_dinner_hotel_suffix" varchar,
  	"pricing_long_route_from7_days_label" varchar,
  	"pricing_long_route_from7_days_suffix" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"first_name" varchar NOT NULL,
  	"last_name" varchar,
  	"comment" varchar NOT NULL,
  	"rating" numeric NOT NULL,
  	"tour_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"cities_id" integer,
  	"countries_id" integer,
  	"tours_id" integer,
  	"hotels_id" integer,
  	"cars_id" integer,
  	"reviews_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"review_id" integer,
  	"video_id" integer
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"button" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_special_offers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tours_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_recommended_tours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_recommended_cities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_recommended_cars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tours_id" integer,
  	"cities_id" integer,
  	"cars_id" integer
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cities" ADD CONSTRAINT "cities_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cities_locales" ADD CONSTRAINT "cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_cities" ADD CONSTRAINT "countries_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_cities_locales" ADD CONSTRAINT "countries_cities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries_cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_locations" ADD CONSTRAINT "tours_locations_from_id_cities_id_fk" FOREIGN KEY ("from_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locations" ADD CONSTRAINT "tours_locations_to_id_cities_id_fk" FOREIGN KEY ("to_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locations" ADD CONSTRAINT "tours_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_locations_locales" ADD CONSTRAINT "tours_locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_accommodation" ADD CONSTRAINT "tours_accommodation_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_accommodation" ADD CONSTRAINT "tours_accommodation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary_activities" ADD CONSTRAINT "tours_itinerary_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary_activities_locales" ADD CONSTRAINT "tours_itinerary_activities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_itinerary_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary" ADD CONSTRAINT "tours_itinerary_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_itinerary_locales" ADD CONSTRAINT "tours_itinerary_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_itinerary"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_services_included" ADD CONSTRAINT "tours_services_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_services_included_locales" ADD CONSTRAINT "tours_services_included_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_services_included"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_services_not_included" ADD CONSTRAINT "tours_services_not_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_services_not_included_locales" ADD CONSTRAINT "tours_services_not_included_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours_services_not_included"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_booking_pricing" ADD CONSTRAINT "tours_booking_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_images" ADD CONSTRAINT "tours_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_images" ADD CONSTRAINT "tours_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours" ADD CONSTRAINT "tours_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tours_locales" ADD CONSTRAINT "tours_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tours_rels" ADD CONSTRAINT "tours_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_features" ADD CONSTRAINT "hotels_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels_images" ADD CONSTRAINT "hotels_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_images" ADD CONSTRAINT "hotels_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels" ADD CONSTRAINT "hotels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "hotels_locales" ADD CONSTRAINT "hotels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_images" ADD CONSTRAINT "cars_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars_images" ADD CONSTRAINT "cars_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars_locales" ADD CONSTRAINT "cars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tour_id_tours_id_fk" FOREIGN KEY ("tour_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_hotels_fk" FOREIGN KEY ("hotels_id") REFERENCES "public"."hotels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_posts" ADD CONSTRAINT "pages_blocks_hero_posts_review_id_reviews_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."reviews"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_posts" ADD CONSTRAINT "pages_blocks_hero_posts_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_posts" ADD CONSTRAINT "pages_blocks_hero_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_faqs" ADD CONSTRAINT "pages_blocks_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_faqs_locales" ADD CONSTRAINT "pages_blocks_faq_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_special_offers" ADD CONSTRAINT "pages_blocks_special_offers_tours_id_tours_id_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_special_offers" ADD CONSTRAINT "pages_blocks_special_offers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recommended_tours" ADD CONSTRAINT "pages_blocks_recommended_tours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recommended_cities" ADD CONSTRAINT "pages_blocks_recommended_cities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recommended_cars" ADD CONSTRAINT "pages_blocks_recommended_cars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tours_fk" FOREIGN KEY ("tours_id") REFERENCES "public"."tours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_cities_fk" FOREIGN KEY ("cities_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_alt_idx" ON "media" USING btree ("alt");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_name_idx" ON "categories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "cities_slug_idx" ON "cities" USING btree ("slug");
  CREATE INDEX "cities_image_idx" ON "cities" USING btree ("image_id");
  CREATE INDEX "cities_updated_at_idx" ON "cities" USING btree ("updated_at");
  CREATE INDEX "cities_created_at_idx" ON "cities" USING btree ("created_at");
  CREATE INDEX "cities_name_idx" ON "cities_locales" USING btree ("name","_locale");
  CREATE INDEX "cities_description_idx" ON "cities_locales" USING btree ("description","_locale");
  CREATE UNIQUE INDEX "cities_locales_locale_parent_id_unique" ON "cities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "countries_name_idx" ON "countries_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "countries_locales_locale_parent_id_unique" ON "countries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "countries_cities_order_idx" ON "countries_cities" USING btree ("_order");
  CREATE INDEX "countries_cities_parent_id_idx" ON "countries_cities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "countries_cities_locales_locale_parent_id_unique" ON "countries_cities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_locations_order_idx" ON "tours_locations" USING btree ("_order");
  CREATE INDEX "tours_locations_parent_id_idx" ON "tours_locations" USING btree ("_parent_id");
  CREATE INDEX "tours_locations_from_idx" ON "tours_locations" USING btree ("from_id");
  CREATE INDEX "tours_locations_to_idx" ON "tours_locations" USING btree ("to_id");
  CREATE UNIQUE INDEX "tours_locations_locales_locale_parent_id_unique" ON "tours_locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_accommodation_order_idx" ON "tours_accommodation" USING btree ("_order");
  CREATE INDEX "tours_accommodation_parent_id_idx" ON "tours_accommodation" USING btree ("_parent_id");
  CREATE INDEX "tours_accommodation_city_idx" ON "tours_accommodation" USING btree ("city_id");
  CREATE INDEX "tours_itinerary_activities_order_idx" ON "tours_itinerary_activities" USING btree ("_order");
  CREATE INDEX "tours_itinerary_activities_parent_id_idx" ON "tours_itinerary_activities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tours_itinerary_activities_locales_locale_parent_id_unique" ON "tours_itinerary_activities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_itinerary_order_idx" ON "tours_itinerary" USING btree ("_order");
  CREATE INDEX "tours_itinerary_parent_id_idx" ON "tours_itinerary" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tours_itinerary_locales_locale_parent_id_unique" ON "tours_itinerary_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_services_included_order_idx" ON "tours_services_included" USING btree ("_order");
  CREATE INDEX "tours_services_included_parent_id_idx" ON "tours_services_included" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tours_services_included_locales_locale_parent_id_unique" ON "tours_services_included_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_services_not_included_order_idx" ON "tours_services_not_included" USING btree ("_order");
  CREATE INDEX "tours_services_not_included_parent_id_idx" ON "tours_services_not_included" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tours_services_not_included_locales_locale_parent_id_unique" ON "tours_services_not_included_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_booking_pricing_order_idx" ON "tours_booking_pricing" USING btree ("_order");
  CREATE INDEX "tours_booking_pricing_parent_id_idx" ON "tours_booking_pricing" USING btree ("_parent_id");
  CREATE INDEX "tours_images_order_idx" ON "tours_images" USING btree ("_order");
  CREATE INDEX "tours_images_parent_id_idx" ON "tours_images" USING btree ("_parent_id");
  CREATE INDEX "tours_images_image_idx" ON "tours_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "tours_slug_idx" ON "tours" USING btree ("slug");
  CREATE INDEX "tours_category_idx" ON "tours" USING btree ("category_id");
  CREATE INDEX "tours_updated_at_idx" ON "tours" USING btree ("updated_at");
  CREATE INDEX "tours_created_at_idx" ON "tours" USING btree ("created_at");
  CREATE INDEX "tours_name_idx" ON "tours_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "tours_locales_locale_parent_id_unique" ON "tours_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tours_rels_order_idx" ON "tours_rels" USING btree ("order");
  CREATE INDEX "tours_rels_parent_idx" ON "tours_rels" USING btree ("parent_id");
  CREATE INDEX "tours_rels_path_idx" ON "tours_rels" USING btree ("path");
  CREATE INDEX "tours_rels_cities_id_idx" ON "tours_rels" USING btree ("cities_id");
  CREATE INDEX "tours_rels_countries_id_idx" ON "tours_rels" USING btree ("countries_id");
  CREATE INDEX "tours_rels_hotels_id_idx" ON "tours_rels" USING btree ("hotels_id");
  CREATE INDEX "hotels_features_order_idx" ON "hotels_features" USING btree ("_order");
  CREATE INDEX "hotels_features_parent_id_idx" ON "hotels_features" USING btree ("_parent_id");
  CREATE INDEX "hotels_features_locale_idx" ON "hotels_features" USING btree ("_locale");
  CREATE INDEX "hotels_images_order_idx" ON "hotels_images" USING btree ("_order");
  CREATE INDEX "hotels_images_parent_id_idx" ON "hotels_images" USING btree ("_parent_id");
  CREATE INDEX "hotels_images_image_idx" ON "hotels_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "hotels_slug_idx" ON "hotels" USING btree ("slug");
  CREATE INDEX "hotels_city_idx" ON "hotels" USING btree ("city_id");
  CREATE INDEX "hotels_image_idx" ON "hotels" USING btree ("image_id");
  CREATE INDEX "hotels_updated_at_idx" ON "hotels" USING btree ("updated_at");
  CREATE INDEX "hotels_created_at_idx" ON "hotels" USING btree ("created_at");
  CREATE INDEX "hotels_name_idx" ON "hotels_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "hotels_locales_locale_parent_id_unique" ON "hotels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cars_images_order_idx" ON "cars_images" USING btree ("_order");
  CREATE INDEX "cars_images_parent_id_idx" ON "cars_images" USING btree ("_parent_id");
  CREATE INDEX "cars_images_image_idx" ON "cars_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "cars_slug_idx" ON "cars" USING btree ("slug");
  CREATE INDEX "cars_image_idx" ON "cars" USING btree ("image_id");
  CREATE INDEX "cars_updated_at_idx" ON "cars" USING btree ("updated_at");
  CREATE INDEX "cars_created_at_idx" ON "cars" USING btree ("created_at");
  CREATE INDEX "cars_name_idx" ON "cars_locales" USING btree ("name","_locale");
  CREATE INDEX "cars_type_idx" ON "cars_locales" USING btree ("type","_locale");
  CREATE UNIQUE INDEX "cars_locales_locale_parent_id_unique" ON "cars_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "reviews_slug_idx" ON "reviews" USING btree ("slug");
  CREATE INDEX "reviews_tour_idx" ON "reviews" USING btree ("tour_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_cities_id_idx" ON "payload_locked_documents_rels" USING btree ("cities_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_tours_id_idx" ON "payload_locked_documents_rels" USING btree ("tours_id");
  CREATE INDEX "payload_locked_documents_rels_hotels_id_idx" ON "payload_locked_documents_rels" USING btree ("hotels_id");
  CREATE INDEX "payload_locked_documents_rels_cars_id_idx" ON "payload_locked_documents_rels" USING btree ("cars_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_posts_order_idx" ON "pages_blocks_hero_posts" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_posts_parent_id_idx" ON "pages_blocks_hero_posts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_posts_review_idx" ON "pages_blocks_hero_posts" USING btree ("review_id");
  CREATE INDEX "pages_blocks_hero_posts_video_idx" ON "pages_blocks_hero_posts" USING btree ("video_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_faqs_order_idx" ON "pages_blocks_faq_faqs" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_faqs_parent_id_idx" ON "pages_blocks_faq_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_faqs_locales_locale_parent_id_unique" ON "pages_blocks_faq_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_special_offers_order_idx" ON "pages_blocks_special_offers" USING btree ("_order");
  CREATE INDEX "pages_blocks_special_offers_parent_id_idx" ON "pages_blocks_special_offers" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_special_offers_path_idx" ON "pages_blocks_special_offers" USING btree ("_path");
  CREATE INDEX "pages_blocks_special_offers_tours_idx" ON "pages_blocks_special_offers" USING btree ("tours_id");
  CREATE INDEX "pages_blocks_recommended_tours_order_idx" ON "pages_blocks_recommended_tours" USING btree ("_order");
  CREATE INDEX "pages_blocks_recommended_tours_parent_id_idx" ON "pages_blocks_recommended_tours" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recommended_tours_path_idx" ON "pages_blocks_recommended_tours" USING btree ("_path");
  CREATE INDEX "pages_blocks_recommended_cities_order_idx" ON "pages_blocks_recommended_cities" USING btree ("_order");
  CREATE INDEX "pages_blocks_recommended_cities_parent_id_idx" ON "pages_blocks_recommended_cities" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recommended_cities_path_idx" ON "pages_blocks_recommended_cities" USING btree ("_path");
  CREATE INDEX "pages_blocks_recommended_cars_order_idx" ON "pages_blocks_recommended_cars" USING btree ("_order");
  CREATE INDEX "pages_blocks_recommended_cars_parent_id_idx" ON "pages_blocks_recommended_cars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_recommended_cars_path_idx" ON "pages_blocks_recommended_cars" USING btree ("_path");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_tours_id_idx" ON "pages_rels" USING btree ("tours_id");
  CREATE INDEX "pages_rels_cities_id_idx" ON "pages_rels" USING btree ("cities_id");
  CREATE INDEX "pages_rels_cars_id_idx" ON "pages_rels" USING btree ("cars_id");`)
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "cities" CASCADE;
  DROP TABLE "cities_locales" CASCADE;
  DROP TABLE "countries_cities_locales" CASCADE;
  DROP TABLE "countries_cities" CASCADE;
  DROP TABLE "countries_locales" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "tours_locations" CASCADE;
  DROP TABLE "tours_locations_locales" CASCADE;
  DROP TABLE "tours_accommodation" CASCADE;
  DROP TABLE "tours_itinerary_activities" CASCADE;
  DROP TABLE "tours_itinerary_activities_locales" CASCADE;
  DROP TABLE "tours_itinerary" CASCADE;
  DROP TABLE "tours_itinerary_locales" CASCADE;
  DROP TABLE "tours_services_included" CASCADE;
  DROP TABLE "tours_services_included_locales" CASCADE;
  DROP TABLE "tours_services_not_included" CASCADE;
  DROP TABLE "tours_services_not_included_locales" CASCADE;
  DROP TABLE "tours_booking_pricing" CASCADE;
  DROP TABLE "tours_images" CASCADE;
  DROP TABLE "tours" CASCADE;
  DROP TABLE "tours_locales" CASCADE;
  DROP TABLE "tours_rels" CASCADE;
  DROP TABLE "hotels_features" CASCADE;
  DROP TABLE "hotels_images" CASCADE;
  DROP TABLE "hotels" CASCADE;
  DROP TABLE "hotels_locales" CASCADE;
  DROP TABLE "cars_images" CASCADE;
  DROP TABLE "cars" CASCADE;
  DROP TABLE "cars_locales" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "pages_blocks_hero_posts" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs" CASCADE;
  DROP TABLE "pages_blocks_faq_faqs_locales" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_special_offers" CASCADE;
  DROP TABLE "pages_blocks_recommended_tours" CASCADE;
  DROP TABLE "pages_blocks_recommended_cities" CASCADE;
  DROP TABLE "pages_blocks_recommended_cars" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_hotels_rating";`)
}

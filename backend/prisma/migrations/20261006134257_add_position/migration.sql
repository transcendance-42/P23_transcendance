-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch";
CREATE EXTENSION IF NOT EXISTS "postgis_tiger_geocoder";
CREATE EXTENSION IF NOT EXISTS "postgis_topology";


-- AlterTable
ALTER TABLE "users" ADD COLUMN     "position" geography(Point, 4326);

-- CreateIndex
CREATE INDEX "recipient_position_idx" ON "users" USING GIST ("position");

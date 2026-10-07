-- AlterTable
ALTER TABLE "matches" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "unmatched_by" BIGINT;

/*
  Warnings:

  - Added the required column `mime_type` to the `dog_pics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dog_pics" ADD COLUMN     "mime_type" VARCHAR(100) NOT NULL;

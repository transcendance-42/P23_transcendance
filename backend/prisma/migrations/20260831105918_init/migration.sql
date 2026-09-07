/*
  Warnings:

  - The `gender` column on the `dogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `size` column on the `dogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('Small', 'Medium', 'Large');

-- AlterTable
ALTER TABLE "dogs" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender",
DROP COLUMN "size",
ADD COLUMN     "size" "Size";

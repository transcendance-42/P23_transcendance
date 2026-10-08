/*
  Warnings:

  - A unique constraint covering the columns `[owner_id]` on the table `dogs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dogs_owner_id_key" ON "dogs"("owner_id");

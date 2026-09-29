/*
  Warnings:

  - A unique constraint covering the columns `[dog_id,position]` on the table `dog_pics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dog_pics_dog_id_position_key" ON "dog_pics"("dog_id", "position");

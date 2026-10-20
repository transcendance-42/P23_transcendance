/*
  Warnings:

  - A unique constraint covering the columns `[swiper_id,target_id]` on the table `swipes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_swipe_per_pair" ON "swipes"("swiper_id", "target_id");

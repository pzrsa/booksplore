/*
  Warnings:

  - A unique constraint covering the columns `[creator_id]` on the table `saves` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[book_id]` on the table `saves` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "saves_creator_id_key" ON "saves"("creator_id");

-- CreateIndex
CREATE UNIQUE INDEX "saves_book_id_key" ON "saves"("book_id");

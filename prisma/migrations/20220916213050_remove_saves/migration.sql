/*
  Warnings:

  - You are about to drop the `saves` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "saves" DROP CONSTRAINT "saves_book_id_fkey";

-- DropForeignKey
ALTER TABLE "saves" DROP CONSTRAINT "saves_creator_id_fkey";

-- DropTable
DROP TABLE "saves";

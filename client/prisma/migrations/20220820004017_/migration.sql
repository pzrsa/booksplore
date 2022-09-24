/*
  Warnings:

  - You are about to drop the column `genreId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the `genres` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `genre` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_genreId_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "genreId",
ADD COLUMN     "genre" TEXT NOT NULL;

-- DropTable
DROP TABLE "genres";

/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `authors` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "authors" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "updatedAt";

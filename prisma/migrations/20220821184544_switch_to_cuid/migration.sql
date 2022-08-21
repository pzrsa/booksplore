/*
  Warnings:

  - The primary key for the `authors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `books` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_fkey";

-- DropForeignKey
ALTER TABLE "saves" DROP CONSTRAINT "saves_book_id_fkey";

-- AlterTable
ALTER TABLE "authors" DROP CONSTRAINT "authors_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "authors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "authors_id_seq";

-- AlterTable
ALTER TABLE "books" DROP CONSTRAINT "books_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "author_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "books_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "books_id_seq";

-- AlterTable
ALTER TABLE "saves" ALTER COLUMN "book_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saves" ADD CONSTRAINT "saves_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

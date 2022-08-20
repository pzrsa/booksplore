import { Prisma } from "@prisma/client";

export const defaultBookSelect = Prisma.validator<Prisma.BookSelect>()({
  id: true,
  title: true,
  genre: true,
  authorId: true,
  author: {
    select: {
      id: true,
      name: true,
      books: false,
      createdAt: false,
    },
  },
  asin: true,
  isbn13: true,
  createdAt: false,
});

export type Book = {
  title: string;
  author: string;
  genre: string;
  isbn13: string;
  asin: string;
};

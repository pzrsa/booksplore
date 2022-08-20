import { Prisma } from "@prisma/client";

export const defaultBookSelect = Prisma.validator<Prisma.BookSelect>()({
  id: true,
  title: true,
  authorId: true,
  author: {
    select: {
      id: true,
      name: true,
      books: false,
      createdAt: false,
      updatedAt: false,
    },
  },
  asin: true,
  isbn13: true,
  createdAt: false,
  updatedAt: false,
});

export type Book = {
  title: string;
  author: string;
  genre: string;
  isbn13: string;
  asin: string;
};

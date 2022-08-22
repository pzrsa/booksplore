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
  saves: {
    select: {
      id: true,
      creatorId: false,
      creator: false,
      bookId: false,
      createdAt: false,
    },
  },
  asin: true,
  isbn13: true,
  createdAt: false,
});

export const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  email: true,
  saves: {
    select: {
      id: false,
      creatorId: false,
      creator: false,
      bookId: false,
      createdAt: false,
      book: {
        select: {
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
          saves: {
            select: {
              id: true,
              creatorId: false,
              creator: false,
              bookId: false,
              createdAt: false,
            },
          },
          asin: true,
          isbn13: true,
          createdAt: false,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  },
});

export type Book = {
  title: string;
  author: string;
  genre: string;
  isbn13: string;
  asin: string;
};

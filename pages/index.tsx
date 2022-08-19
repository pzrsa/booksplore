import { Prisma } from "@prisma/client";
import Image from "next/image";
import type { InferGetStaticPropsType } from "next/types";
import { prisma } from "../utils/prisma";

const defaultBookSelect = Prisma.validator<Prisma.BookSelect>()({
  id: true,
  title: true,
  authorId: true,
  genreId: true,
  asin: true,
  isbn13: true,
  createdAt: false,
  updatedAt: false,
});

const IndexPage = ({
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Booksplore</h1>
      <p>Explore your next read.</p>

      <h2>Books</h2>
      {books.map((book) => (
        <div key={book.id}>
          <Image
            src={`https://images-eu.ssl-images-amazon.com/images/P/${book.asin}._LZZZZZZZ_.jpg`}
            width={400}
            height={600}
            alt={`${book.title} Cover`}
          />
          <p>{book.title}</p>
        </div>
      ))}
    </>
  );
};

export const getStaticProps = async () => {
  // try {
  //   await populateDatabase();
  // } catch (err) {
  //   console.error(err);
  // }

  const books = await prisma.book.findMany({ select: defaultBookSelect });

  return {
    props: { books },
  };
};

export default IndexPage;

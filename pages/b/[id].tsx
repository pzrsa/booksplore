import { GetStaticPaths, GetStaticProps } from "next";
import { prisma } from "utils/prisma";
import { Book, defaultBookSelect } from "utils/types";

type BookProps = {
  book: Book;
};

const Book: React.FC<BookProps> = ({ book }) => {
  return <>{JSON.stringify(book, null, 2)}</>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({ select: defaultBookSelect });
  const paths = books.map((book) => ({ params: { id: book.isbn13 } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const book = await prisma.book.findFirst({
    select: defaultBookSelect,
    where: { isbn13: params?.id as string },
  });

  return {
    props: { book },
  };
};

export default Book;

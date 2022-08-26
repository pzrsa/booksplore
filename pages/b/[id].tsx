import { prisma } from "lib/prisma";
import { defaultBookSelect } from "lib/types";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import BookCard from "../../components/BookCard";

const Book = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={"max-w-2xl mx-auto"}>
      <BookCard book={book!} />
      <a
        href={`http://amazon.co.uk/dp/${book!.asin}`}
        rel="prefetch noreferrer"
        target="_blank"
        className={"hover:underline"}
      >
        buy on amazon uk
      </a>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({ select: defaultBookSelect });
  const paths = books.map((book) => ({ params: { id: book.isbn13 } }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const book = await prisma.book.findUnique({
    select: defaultBookSelect,
    where: { isbn13: params?.id as string },
  });

  return {
    props: { book },
  };
};

export default Book;

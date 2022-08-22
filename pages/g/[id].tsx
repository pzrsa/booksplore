import BookCard from "components/BookCard";
import { prisma } from "lib/prisma";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";
import { defaultBookSelect } from "../../lib/types";

const Genre = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="gap-y-10 xl:gap-x-6 gap-x-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {books.map((book) => (
          <BookCard key={book.id} book={book} hideGenre />
        ))}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({ select: defaultBookSelect });
  const paths = books.map((book) => ({ params: { id: book.genre } }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const books = await prisma.book.findMany({
    select: defaultBookSelect,
    where: { genre: params?.id as string },
  });

  return {
    props: { books },
  };
};

export default Genre;

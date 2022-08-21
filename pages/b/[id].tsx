import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { prisma } from "utils/prisma";
import { defaultBookSelect } from "utils/types";

const Book = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Image
        src={`https://images-eu.ssl-images-amazon.com/images/P/${book?.asin}._LZZZZZZZ_.jpg`}
        width={400}
        height={600}
        alt={`${book?.title} Cover`}
      />
      <h1>{book?.title}</h1>
      <h2>by {book?.author.name}</h2>
      <h3>{book?.genre}</h3>
      <button>save</button>
      <a
        href={`http://amazon.co.uk/dp/${book?.asin}`}
        rel="prefetch noreferrer"
        target="_blank"
      >
        <p>buy on amazon uk</p>
      </a>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await prisma.book.findMany({ select: defaultBookSelect });
  const paths = books.map((book) => ({ params: { id: book.isbn13 } }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const book = await prisma.book.findFirst({
    select: defaultBookSelect,
    where: { isbn13: params?.id as string },
  });

  return {
    props: { book },
  };
};

export default Book;

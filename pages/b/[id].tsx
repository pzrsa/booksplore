import { prisma } from "lib/prisma";
import { defaultBookSelect } from "lib/types";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Link from "next/link";

const Book = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className={"max-w-2xl mx-auto"}>
      <div>
        <div className="aspect-w-4 aspect-h-6 rounded-md overflow-hidden">
          <div>
            <Image
              src={`https://images-eu.ssl-images-amazon.com/images/P/${
                book!.asin
              }._LZZZZZZZ_.jpg`}
              alt={`${book!.title} cover`}
              layout={"fill"}
              className={"object-cover"}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <h3 className="text-xl">
            {book!.title} • {book!.author.name}
          </h3>
        </div>
        <p className="mt-1 text-lg capitalize">
          <Link href={`/g/${book!.genre}`}>
            <a className={"hover:underline"}>{book!.genre}</a>
          </Link>
        </p>
        <p className="mt-1 text-md font-bold">
          <a
            href={`http://amazon.co.uk/dp/${book!.asin}`}
            rel="prefetch noreferrer"
            target="_blank"
            className={"hover:underline"}
          >
            Buy on Amazon
          </a>
        </p>
      </div>
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
    revalidate: 60,
  };
};

export default Book;

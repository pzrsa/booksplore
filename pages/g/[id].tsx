import { prisma } from "lib/prisma";
import Image from "next/image";
import Link from "next/link";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";
import { defaultBookSelect } from "../../lib/types";

const Genre = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {books.map((book) => (
          <div key={book.id}>
            <div className="aspect-w-4 aspect-h-6">
              <Link href={`/b/${book.isbn13}`}>
                <a>
                  <Image
                    src={`https://images-eu.ssl-images-amazon.com/images/P/${book.asin}._LZZZZZZZ_.jpg`}
                    alt={`${book.title} cover`}
                    layout={"fill"}
                  />
                </a>
              </Link>
            </div>
            <h1 className={"text-xl"}>
              {book.title} • {book.author.name}
            </h1>
          </div>
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

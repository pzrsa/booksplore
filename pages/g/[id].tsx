import Link from "next/link";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next/types";
import { prisma } from "utils/prisma";
import { defaultBookSelect } from "../../utils/types";
import Image from "next/image";

const Genre = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {books.map((book) => (
          <div key={book.id}>
            <Link href={`/b/${book.isbn13}`}>
              <a>
                <div className="aspect-w-4 aspect-h-6">
                  <Image
                    src={`https://images-eu.ssl-images-amazon.com/images/P/${book.asin}._LZZZZZZZ_.jpg`}
                    alt={`${book.title} cover`}
                    layout={"fill"}
                  />
                </div>
                <h1 className={"text-xl"}>
                  {book.title} • {book.author.name}
                </h1>
              </a>
            </Link>
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

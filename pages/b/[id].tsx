import { prisma } from "lib/prisma";
import { defaultBookSelect } from "lib/types";
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { createSave, deleteSave } from "../../lib/save";

const Book = ({ book }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, mutate, error } = useSWR(`/api/save/${book!.id}`, fetcher);
  let saveStatus;

  if (error) {
    saveStatus = <p>failed to load</p>;
  }

  if (!data) {
    saveStatus = <p>loading...</p>;
  }

  if (data?.message) {
    saveStatus = (
      <button
        onClick={async () => {
          await deleteSave(book!.id);
          await mutate(null);
        }}
      >
        unsave
      </button>
    );
  }

  if (data?.error) {
    saveStatus = (
      <button
        onClick={async () => {
          await createSave(book!.id);
          await mutate(null);
        }}
      >
        save
      </button>
    );
  }

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
      {saveStatus}
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
  const book = await prisma.book.findUnique({
    select: defaultBookSelect,
    where: { isbn13: params?.id as string },
  });

  return {
    props: { book },
  };
};

export default Book;

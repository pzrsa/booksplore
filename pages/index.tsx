import { Prisma } from "@prisma/client";
import csvParser from "csv-parser";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import type { InferGetStaticPropsType } from "next/types";
import { prisma } from "utils/prisma";

const IndexPage = ({
  books,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session, status } = useSession();

  let authStatus;

  if (status === "loading") {
    authStatus = <p>loading...</p>;
  }

  if (status === "unauthenticated") {
    authStatus = (
      <div>
        <button onClick={async () => await signIn("google")}>
          sign in with google
        </button>
        <button onClick={async () => await signIn("twitter")}>
          sign in with twitter
        </button>
      </div>
    );
  }

  if (status === "authenticated") {
    authStatus = (
      <div>
        <Image
          src={`${session.user?.image}`}
          width={100}
          height={100}
          alt={`${session.user} image`}
        />
        <p>
          welcome back, {session.user?.name} ({session.user?.email})
        </p>
        <button onClick={async () => await signOut({ redirect: false })}>
          sign out
        </button>
      </div>
    );
  }

  return (
    <>
      <h1>Booksplore</h1>
      <p>Explore your next read.</p>
      {authStatus}
      <h2>Books</h2>
      {books.map((book) => (
        <div key={book.id}>
          <Image
            src={`https://images-eu.ssl-images-amazon.com/images/P/${book.asin}._LZZZZZZZ_.jpg`}
            width={400}
            height={600}
            alt={`${book.title} Cover`}
          />
          <h1>{book.title}</h1>
        </div>
      ))}
    </>
  );
};

type Book = {
  title: string;
  author: string;
  genre: string;
  isbn13: string;
  asin: string;
};

const defaultBookSelect = Prisma.validator<Prisma.BookSelect>()({
  id: true,
  title: true,
  authorId: true,
  author: {
    select: {
      id: true,
      name: true,
      books: false,
      createdAt: false,
      updatedAt: false,
    },
  },
  asin: true,
  isbn13: true,
  createdAt: false,
  updatedAt: false,
});

export const getStaticProps = async () => {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${process.env.SHEETS_ID}/gviz/tq?tqx=out:csv&sheet=sheet1`
  );

  const allBooks: Book[] = [];
  const data = (await res.blob()).stream();
  data
    .pipe(csvParser())
    .on("data", (data) => allBooks.push(data))
    .on("end", () => {
      allBooks.map(async (book) => {
        const author = await prisma.author.upsert({
          where: { name: book.author },
          create: { name: book.author },
          update: {},
        });
        await prisma.book.upsert({
          where: {
            isbn13: book.isbn13,
          },
          create: {
            title: book.title,
            authorId: author.id,
            genre: book.genre,
            isbn13: book.isbn13,
            asin: book.asin,
          },
          update: {},
        });
      });
    });

  const books = await prisma.book.findMany({ select: defaultBookSelect });

  return {
    props: { books },
  };
};

export default IndexPage;

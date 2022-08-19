import { Prisma } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  let authStatus;

  if (status === "loading") {
    authStatus = <p>loading...</p>;
  }

  if (status === "unauthenticated") {
    authStatus = (
      <button onClick={async () => await signIn("google")}>
        sign in with google
      </button>
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
        <p>welcome back, {session.user?.name}</p>
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

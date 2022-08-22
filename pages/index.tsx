import csvParser from "csv-parser";
import { prisma } from "lib/prisma";
import { defaultBookSelect, SheetBook } from "lib/types";
import type { InferGetStaticPropsType } from "next/types";
import BookCard from "../components/BookCard";

const Index = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div className="gap-y-10 xl:gap-x-6 gap-x-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${process.env.SHEETS_ID}/gviz/tq?tqx=out:csv&sheet=sheet1`
  );

  const allBooks: SheetBook[] = [];
  (await res.blob())
    .stream()
    .pipe(csvParser())
    .on("data", (data) => allBooks.push(data))
    .on("end", () => {
      allBooks.map(async (book) => {
        const author = await prisma.author.upsert({
          where: { name: book.author },
          update: {},
          create: { name: book.author },
        });
        await prisma.book.upsert({
          where: {
            isbn13: book.isbn13,
          },
          update: {},
          create: {
            title: book.title,
            authorId: author.id,
            genre: book.genre,
            isbn13: book.isbn13,
            asin: book.asin,
          },
        });
      });
    });

  const books = await prisma.book.findMany({ select: defaultBookSelect });

  return {
    props: { books },
  };
};

export default Index;

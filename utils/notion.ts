import { Client } from "@notionhq/client";
import {
  NOTION_ASIN_ID,
  NOTION_AUTHOR_ID,
  NOTION_GENRE_ID,
  NOTION_ISBN13_ID,
  NOTION_TITLE_ID,
} from "./constants";
import { prisma } from "./prisma";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const getPages = async () =>
  await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string,
    sorts: [{ timestamp: "created_time", direction: "ascending" }],
  });

export const populateDatabase = async () => {
  const pages = await getPages();
  pages.results.map(async (page: any) => {
    const titlesRes = await notion.pages.properties.retrieve({
      page_id: page.id,
      property_id: NOTION_TITLE_ID,
    });
    const bookTitle =
      titlesRes.type === "property_item"
        ? titlesRes.results.map((title) =>
            title.type === "title" ? title.title.plain_text : ""
          )[0]
        : null;

    const authorsRes = await notion.pages.properties.retrieve({
      page_id: page.id,
      property_id: NOTION_AUTHOR_ID,
    });
    const bookAuthor =
      authorsRes.type === "property_item"
        ? authorsRes.results.map((author) =>
            author.type === "rich_text" ? author.rich_text.plain_text : ""
          )[0]
        : null;

    const genreRes = await notion.pages.properties.retrieve({
      page_id: page.id,
      property_id: NOTION_GENRE_ID,
    });
    const bookGenre = genreRes.type === "select" ? genreRes.select!.name : null;

    const isbnRes = await notion.pages.properties.retrieve({
      page_id: page.id,
      property_id: NOTION_ISBN13_ID,
    });
    const bookIsbn =
      isbnRes.type === "number"
        ? isbnRes.number !== null
          ? isbnRes.number
          : null
        : null;

    const asinRes = await notion.pages.properties.retrieve({
      page_id: page.id,
      property_id: NOTION_ASIN_ID,
    });
    const bookAsin =
      asinRes.type === "property_item"
        ? asinRes.results.map((asin) =>
            asin.type === "rich_text" ? asin.rich_text.plain_text : ""
          )[0]
        : null;

    const existingBook = await prisma.book.findFirst({
      where: {
        title: bookTitle as string,
        isbn13: bookIsbn as number,
        asin: bookAsin as string,
      },
    });
    const genre = await prisma.genre.findFirst({
      where: { name: bookGenre as string },
    });

    if (!existingBook) {
      const existingAuthor = await prisma.author.findFirst({
        where: { name: bookAuthor as string },
      });
      if (!existingAuthor) {
        const author = await prisma.author.create({
          data: { name: bookAuthor as string },
        });

        await prisma.book.create({
          data: {
            title: bookTitle as string,
            asin: bookAsin as string,
            isbn13: bookIsbn as number,
            authorId: author.id,
            genreId: genre!.id,
          },
        });
      } else {
        await prisma.book.create({
          data: {
            title: bookTitle as string,
            asin: bookAsin as string,
            isbn13: bookIsbn as number,
            authorId: existingAuthor.id,
            genreId: genre!.id,
          },
        });
      }
    }
  });
};

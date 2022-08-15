/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const genres = [
    "Biography",
    "Business",
    "Careers",
    "Fiction",
    "Finance",
    "History",
    "Lifestyle",
    "Philosophy",
    "Tech",
  ];
  genres.map(
    async (genre) =>
      await prisma.genre.upsert({
        where: { name: genre },
        create: { name: genre },
        update: {},
      })
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

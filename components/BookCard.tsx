import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import SaveStatus from "./SaveStatus";

type BookCardProps = {
  book: Omit<Book, "createdAt">;
  hideGenre?: boolean;
};

const BookCard: React.FC<BookCardProps> = ({ book, hideGenre }) => {
  return (
    <div>
      <div className={"group relative"}>
        <div className="aspect-w-4 aspect-h-6 rounded-md overflow-hidden group-hover:opacity-75 transition-all">
          <div>
            <span className="absolute inset-0" />
            <Link href={`/b/${book.isbn13}`}>
              <a>
                <Image
                  src={`https://images-eu.ssl-images-amazon.com/images/P/${book.asin}._LZZZZZZZ_.jpg`}
                  alt={`${book.title} cover`}
                  layout={"fill"}
                  className={"object-cover"}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <h3 className="text-md hover:underline">
          <Link href={`/b/${book.isbn13}`}>
            <a>{book.title}</a>
          </Link>
        </h3>
        <SaveStatus id={book.id} />
      </div>
      {!hideGenre ? (
        <p className="mt-1 text-sm capitalize">
          <Link href={`/g/${book.genre}`}>
            <a className={"hover:underline"}>{book.genre}</a>
          </Link>
        </p>
      ) : null}
    </div>
  );
};
export default BookCard;

import useSWR from "swr";
import fetcher from "../lib/fetcher";
import BookCard from "./BookCard";

const SavedBooks = () => {
  const { data, error, isValidating } = useSWR("/api/me", fetcher);

  console.log(data);

  if (error) {
    return <p>failed to load</p>;
  }

  if (!data && isValidating) {
    return <p>loading...</p>;
  }

  let url = "https://www.amazon.co.uk/gp/aws/cart/add.html?";
  data.saves.forEach((save: any, index: number) => {
    url = url.concat(`ASIN.${index + 1}=${save.book.asin}&`);
  });
  return (
    <div>
      {data.saves.length > 0 ? (
        <div>
          <h1 className={"text-3xl mb-2"}>
            <a
              href={url}
              rel="prefetch noreferrer"
              target="_blank"
              className="hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-all text-3xl sm:text-4xl font-bold"
            >
              add to amazon cart
            </a>
          </h1>
          <div className="gap-y-10 xl:gap-x-6 gap-x-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {data.saves.map((save: any) => (
              <BookCard key={save.book.id} book={save.book} />
            ))}
          </div>
        </div>
      ) : (
        <p>no books saved</p>
      )}
    </div>
  );
};
export default SavedBooks;

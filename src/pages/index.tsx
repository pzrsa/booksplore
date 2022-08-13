import Link from "next/link";
import { trpc } from "../utils/trpc";
import { NextPageWithLayout } from "./_app";

const IndexPage: NextPageWithLayout = () => {
  const postsQuery = trpc.useQuery(["post.all"]);

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   for (const { id } of postsQuery.data ?? []) {
  //     utils.prefetchQuery(["post.byId", { id }]);
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      <h1>Booksplore</h1>
      <p>Explore your next read.</p>

      <h2>
        Books
        {postsQuery.status === "loading" && "(loading)"}
      </h2>
      {postsQuery.data?.map((item) => (
        <article key={item.id}>
          <h3>{item.title}</h3>
          <Link href={`/post/${item.id}`}>
            <a>View more</a>
          </Link>
        </article>
      ))}

      <hr />
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };

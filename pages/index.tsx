import type { GetStaticProps } from "next/types";
import { NextPageWithLayout } from "./_app";

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>Booksplore</h1>
      <p>Explore your next read.</p>

      <h2>Books</h2>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default IndexPage;

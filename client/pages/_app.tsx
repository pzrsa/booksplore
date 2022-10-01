import { AppType } from "next/dist/shared/lib/utils";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

const MyApp = (({ Component, pageProps: { session, ...pageProps } }: any) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}) as AppType;

export default MyApp;

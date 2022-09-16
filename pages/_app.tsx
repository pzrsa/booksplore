import { SessionProvider } from "next-auth/react";
import { AppType } from "next/dist/shared/lib/utils";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

const MyApp = (({ Component, pageProps: { session, ...pageProps } }: any) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}) as AppType;

export default MyApp;

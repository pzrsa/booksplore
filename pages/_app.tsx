import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { AppType } from "next/dist/shared/lib/utils";
import { ReactElement, ReactNode } from "react";
import { Layout } from "../components/Layout";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <SessionProvider session={session}>
        <Layout>{page}</Layout>
      </SessionProvider>
    ));

  return getLayout(<Component {...pageProps} />);
}) as AppType;

export default MyApp;

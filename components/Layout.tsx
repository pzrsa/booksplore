import Head from "next/head";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";

type NavItem = {
  href: string;
  text: string;
};

const NavItem: React.FC<NavItem> = ({ href, text }) => {
  const isActive = useRouter().asPath === href;

  return (
    <Link href={href}>
      <a className={cn(isActive ? "font-semibold italic" : "font-normal")}>
        {text}
      </a>
    </Link>
  );
};

type LayoutProps = { children: ReactNode };

export const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  let authStatus;
  if (status === "loading") {
    authStatus = (
      <>
        <p>loading...</p>
      </>
    );
  }

  if (status === "unauthenticated") {
    authStatus = (
      <>
        <a
          className={"cursor-pointer"}
          onClick={async () => await signIn("google")}
        >
          sign in with google
        </a>
        <a
          className={"cursor-pointer"}
          onClick={async () => await signIn("twitter")}
        >
          sign in with twitter
        </a>
      </>
    );
  }

  if (status === "authenticated") {
    authStatus = (
      <>
        <p className={"font-semibold"}>{session.user?.name}</p>
        <span>•</span>
        <a
          className={"cursor-pointer"}
          onClick={async () => await signOut({ redirect: false })}
        >
          sign out
        </a>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Booksplore</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
        />
      </Head>

      <nav className={"flex flex-wrap gap-4 mb-6 items-center"}>
        <NavItem href={"/"} text={"everything"} />
        <div className={"ml-auto flex flex-wrap gap-2"}>{authStatus}</div>
      </nav>
      <main>{children}</main>
    </>
  );
};

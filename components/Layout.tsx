import Head from "next/head";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiBookmark } from "react-icons/fi";
import type { IconType } from "react-icons";

type NavItem = {
  href: string;
  text: string;
  Icon?: IconType;
};

const NavItem: React.FC<NavItem> = ({ href, text, Icon }) => {
  const isActive = useRouter().asPath === href;

  return (
    <Link href={href}>
      <a className={cn(isActive ? "font-semibold italic" : "font-normal")}>
        {Icon ? (
          <span className={"flex items-center gap-x-1"}>
            <Icon />
            {text}
          </span>
        ) : (
          text
        )}
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
      <div className={"flex flex-col lg:flex-row gap-2"}>
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
      </div>
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
        <title>Booksplore - Explore your next read</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
        />
      </Head>

      <nav className={"mb-6 flex"}>
        <div className={"grid grid-cols-2 lg:flex gap-2"}>
          <NavItem href={"/"} text={"Everything"} />
          <NavItem href={"/g/biography"} text={"Biography"} />
          <NavItem href={"/g/business"} text={"Business"} />
          <NavItem href={"/g/careers"} text={"Careers"} />
          <NavItem href={"/g/fiction"} text={"Fiction"} />
          <NavItem href={"/g/finance"} text={"Finance"} />
          <NavItem href={"/g/history"} text={"History"} />
          <NavItem href={"/g/lifestyle"} text={"Lifestyle"} />
          <NavItem href={"/g/philosophy"} text={"Philosophy"} />
          <NavItem href={"/g/tech"} text={"Tech"} />
          <span className={"hidden lg:contents"}>•</span>
          <NavItem href={"/"} text={"Saved"} Icon={FiBookmark} />
        </div>

        <div className={"flex flex-1 justify-end gap-2"}>{authStatus}</div>
      </nav>
      <main>{children}</main>
    </>
  );
};

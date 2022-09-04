import cn from "classnames";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiBookmark } from "react-icons/fi";

type NavItem = {
  href: string;
  text: string;
  Icon?: IconType;
};

const NavItem: React.FC<NavItem> = ({ href, text, Icon }) => {
  const isActive = useRouter().asPath === href;

  return (
    <p>
      <Link href={href}>
        <a
          className={cn(
            isActive ? "font-semibold italic" : "font-normal hover:underline"
          )}
        >
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
    </p>
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
        <p>
          <a
            className={"cursor-pointer hover:underline"}
            onClick={async () => await signIn("google")}
          >
            sign in with google
          </a>
        </p>
        <p>
          <a
            className={"cursor-pointer hover:underline"}
            onClick={async () => await signIn("twitter")}
          >
            sign in with twitter
          </a>
        </p>
      </div>
    );
  }

  if (status === "authenticated") {
    authStatus = (
      <>
        <p>{session.user?.name}</p>
        <span>•</span>
        <p>
          <a
            className={"cursor-pointer hover:underline"}
            onClick={async () => await signOut()}
          >
            sign out
          </a>
        </p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Booksplore - Explore your next read</title>
      </Head>

      <div className={"px-4 py-2"}>
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
            <div
              className={cn(status === "authenticated" ? "contents" : "hidden")}
            >
              <span className={"hidden lg:contents"}>•</span>
              <NavItem href={"/saved"} text={"Saved"} Icon={FiBookmark} />
            </div>
          </div>

          <div className={"flex flex-1 justify-end gap-2"}>{authStatus}</div>
        </nav>
        <main className="mx-auto max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
          {children}
        </main>
      </div>
    </>
  );
};

import cn from "classnames";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import type { IconType } from "react-icons";

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
  return (
    <>
      <Head>
        <title>Booksplore - Explore your next read</title>
      </Head>

      <div className={"px-4 py-2"}>
        <nav className={"mb-6 flex"}>
          <div className={"grid grid-cols-2 lg:flex gap-2"}>
            <NavItem href={"/"} text={"home"} />
          </div>
        </nav>
        <main className="mx-auto xl:max-w-5xl">{children}</main>
      </div>
    </>
  );
};

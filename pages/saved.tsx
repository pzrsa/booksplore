import { unstable_getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { prisma } from "../lib/prisma";
import { defaultUserSelect } from "../lib/types";
import { authOptions } from "./api/auth/[...nextauth]";

const Saved = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // https://www.amazon.co.uk/gp/aws/cart/add.html?ASIN.1=1988575117&ASIN.2=0241453577 is valid
  let url = "https://www.amazon.co.uk/gp/aws/cart/add.html?";
  user?.saves.forEach((save, index) => {
    url = url.concat(`ASIN.${index + 1}=${save.book.asin}&`);
  });

  return (
    <>
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
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {user?.saves.map((save) => (
          <div key={save.book.id}>
            <div className="aspect-w-4 aspect-h-6">
              <Link href={`/b/${save.book.isbn13}`}>
                <a>
                  <Image
                    src={`https://images-eu.ssl-images-amazon.com/images/P/${save.book.asin}._LZZZZZZZ_.jpg`}
                    alt={`${save.book.title} cover`}
                    layout={"fill"}
                  />
                </a>
              </Link>
            </div>
            <h1 className={"text-xl"}>
              {save.book.title} • {save.book.author.name}
            </h1>
            <h3 className={"text-lg capitalize"}>
              <Link href={`/g/${save.book.genre}`}>
                <a>{save.book.genre}</a>
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: defaultUserSelect,
  });

  return {
    props: {
      user,
    },
  };
};

export default Saved;

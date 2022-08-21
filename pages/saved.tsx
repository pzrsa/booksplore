import { unstable_getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { prisma } from "../utils/prisma";
import { defaultUserSelect } from "../utils/types";
import { authOptions } from "./api/auth/[...nextauth]";

const Saved = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {user?.saves.map((save) => (
          <div key={save.book.id}>
            <Link href={`/b/${save.book.isbn13}`}>
              <a>
                <div className="aspect-w-4 aspect-h-6">
                  <Image
                    src={`https://images-eu.ssl-images-amazon.com/images/P/${save.book.asin}._LZZZZZZZ_.jpg`}
                    alt={`${save.book.title} cover`}
                    layout={"fill"}
                  />
                </div>
                <h1 className={"text-xl"}>
                  {save.book.title} • {save.book.author.name}
                </h1>
              </a>
            </Link>
            <Link href={`/g/${save.book.genre}`}>
              <a>
                <h3 className={"text-lg capitalize"}>{save.book.genre}</h3>
              </a>
            </Link>
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

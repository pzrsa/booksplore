import { unstable_getServerSession } from "next-auth/next";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next/types";
import { prisma } from "../utils/prisma";
import { defaultUserSelect } from "../utils/types";
import { authOptions } from "./api/auth/[...nextauth]";

const Saved = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <>{JSON.stringify(user, null, 2)}</>;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
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

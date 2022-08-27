import { prisma } from "lib/prisma";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth/next";
import SavedBooks from "../components/SavedBooks";
import { defaultUserSelect } from "../lib/types";
import { authOptions } from "./api/auth/[...nextauth]";

const Saved = ({}) => {
  return (
    <div>
      <SavedBooks />
    </div>
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
      fallback: {
        "/api/me": user,
      },
    },
  };
};

export default Saved;

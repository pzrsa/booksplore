import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { prisma } from "../../../utils/prisma";
import { defaultUserSelect } from "../../../utils/types";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id: bookId },
    method,
  } = req;
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    select: defaultUserSelect,
  });
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  const save = await prisma.save.findFirst({
    where: { creatorId: user.id, bookId: bookId as string },
  });

  switch (req.method) {
    case "GET":
      if (!save) {
        res.status(404).json({ error: "Save not found." });
        return;
      }
      res.status(200).json({ message: "Save exists." });
      return;
    case "PUT":
      await prisma.save.create({
        data: { creatorId: user.id, bookId: bookId as string },
      });
      res.status(200).json({ message: `Book saved.` });
      return;
    case "DELETE":
      if (!save) {
        res.status(404).json({ error: "Save not found." });
        return;
      }
      await prisma.save.delete({
        where: { id: save.id },
      });
      res.status(200).json({ message: `Save removed.` });
      return;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  res.status(200).json({
    message: "User data retrieved",
    data: {
      id: 1,
      name: "parsa",
      username: "parsa",
      links: [
        { name: "website", url: "https://parsam.io" },
        { name: "github", url: "https://github.com/pzrsa" },
        { name: "twitter", url: "https://twitter.com/pzrsaa" },
      ],
    },
  });
});

export default router;

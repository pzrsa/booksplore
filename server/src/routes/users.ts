import { Router } from "express";

const router = Router();

router.get("/", async (_, res) => {
  return res.json({ message: "User received", data: { name: "parsa" } });
});

export default router;

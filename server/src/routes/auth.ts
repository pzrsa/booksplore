import { Router } from "express";
import passport from "passport";

const router = Router();
router.get("/twitter", passport.authenticate("twitter"));
router.get("/twitter/callback", passport.authenticate("twitter"), (_, res) => {
  res.redirect("back");
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport.authenticate("google"), (_, res) => {
  res.redirect("back");
});

export default router;

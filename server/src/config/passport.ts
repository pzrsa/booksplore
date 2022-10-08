import { Application } from "express";
import passport from "passport";
import passportTwitter from "passport-twitter";

const mountPassport = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  const twitterStrategy = passportTwitter.Strategy;
  passport.use(
    new twitterStrategy(
      {
        consumerKey: process.env.TWITTER_KEY as string,
        consumerSecret: process.env.TWITTER_SECRET as string,
        callbackURL: "/users/auth/twitter/callback",
      },
      (_, __, ___, done) => {
        return done(null, null);
      }
    )
  );

  return app;
};

export default mountPassport;

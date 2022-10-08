import { Application } from "express";
import passport from "passport";
import passportTwitter from "passport-twitter";

const mountPassport = (app: Application) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser<any, any>((_, user, done) => {
    done(null, user);
  });

  passport.deserializeUser((_, done) => {
    done(null, null);
  });

  const twitterStrategy = passportTwitter.Strategy;
  passport.use(
    new twitterStrategy(
      {
        consumerKey: process.env.TWITTER_KEY as string,
        consumerSecret: process.env.TWITTER_SECRET as string,
        callbackURL: "/users/auth/twitter/callback",
      },
      (_, __, profile, done) => {
        done(null, profile);
      }
    )
  );

  return app;
};

export default mountPassport;

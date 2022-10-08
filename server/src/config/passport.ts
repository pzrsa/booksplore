import { Application } from "express";
import passport from "passport";
import passportGoogle from "passport-google-oauth";
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
  const googleStrategy = passportGoogle.OAuth2Strategy;

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

  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_KEY as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        callbackURL: "/users/auth/google/callback",
      },
      (_, __, profile, done) => {
        done(null, profile);
      }
    )
  );

  return app;
};

export default mountPassport;

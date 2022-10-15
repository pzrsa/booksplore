import { Application } from "express";
import passport from "passport";
import passportGoogle from "passport-google-oauth";
import passportTwitter from "passport-twitter";
import { Account } from "../entities/Account";

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
        callbackURL: "/auth/twitter/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        await Account.create({
          user: {
            username: profile.username,
            name: profile.displayName,
            image: profile.photos?.at(0)?.value,
          },
          provider: profile.provider,
          providerAccountId: profile.id,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }).save();

        done(null, profile);
      }
    )
  );

  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_KEY as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, _, profile, done) => {
        await Account.create({
          user: {
            name: profile.displayName,
            image: profile.photos?.at(0)?.value,
          },
          provider: profile.provider,
          providerAccountId: profile.id,
          accessToken: accessToken,
        }).save();

        done(null, profile);
      }
    )
  );

  return app;
};

export default mountPassport;

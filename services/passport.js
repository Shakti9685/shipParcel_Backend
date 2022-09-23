const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const createError = require("http-errors");
const { app, google } = require("../config/keys");

const User = require("../models/User.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: google.clientID,
      clientSecret: google.clientSecret,
      // callbackURL: "/api/auth/google/callback",
      callbackURL: `${app.serverURL}/${app.apiURL}/${google.callbackURL}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const data = profile._json;
        const fetchedUser = await User.findOne({ email: data.email });
        if (fetchedUser) return done(null, fetchedUser);
        const user = new User({
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          provider: "google",
          providerId: data.sub,
          verified: true,
        });
        const newUser = await user.save();
        if (!newUser)
          throw createError.InternalServerError("failed to save user");
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/* TODO
** Se já tem facebookId -> apenas logar;
** Não tem facebookId mas name === profile.displayName -> acicionar facebookId e logar;
** facebookId e name === profile.displayName não existem ->
** gerar account, criar novo cadastro, criar singup_credit
*/
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/api/v1/auth/facebook/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        facebookId: profile.id,
        name: profile.displayName,
        account: "test-account"
      }).save();
      done(null, user);
    }
  )
);

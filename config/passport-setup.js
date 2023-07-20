const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../models');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000',
    },
    async (accessToken, refreshToken, profile, done) => {
      // google profile에서 얻은 정보로 유저를 찾거나 새로운 유저를 생성합니다.
      const existingUser = await Users.findOne({
        where: { googleId: profile.id },
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await Users.create({
          googleId: profile.id,
          nickname: profile.displayName,
        });
        done(null, newUser);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Users.findByPk(id);
  done(null, user);
});
